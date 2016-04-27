import os
import subprocess
import pandas as pd
import matplotlib.pyplot as plt
from pymongo import MongoClient
import numpy as np
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor, export_graphviz
from sklearn.metrics import confusion_matrix, mean_squared_error
from sklearn import cross_validation
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor

def get_github_data():
	if os.path.exists("sample.csv"):
		print("-- csv found locally")
		df = pd.read_csv("sample.csv")
	else:
		print("--couldn't read the .csv file")
		
	return df

def encode_target(df, target_column):
	df_mod = df.copy()
	targets = df_mod[target_column].unique()
	map_to_int = {name: n for n, name in enumerate(targets)}
	df_mod["starGazersCount"] = df_mod[target_column].replace(map_to_int)
	return (df_mod, targets)
	
def visualize_tree(tree, feature_names, targets):
	with open("starhub.dot", 'w') as f:
		f = export_graphviz(tree, out_file=f, feature_names = feature_names, class_names = ["1","0"]) 
	
	command = ["dot", "-Tpng", "starhub.dot", "-o", "starhub.png"]
	try:
		subprocess.check_call(command)
	except:
		exit("could not run dot, ie graphviz, to produce visualization")
	
if __name__ == '__main__':
	print "\n -- get data: "
	df = get_github_data()
	
	print "\n -- df.head():"
	#print df
	features = ["RepositorySize", "RepositoryDescriptionLength", "ReadmeFileSize", "NumberOfImagesinReadme", "NumberOfSectionsInReadme", "OwnerNameLength", "RepoNameLength"]
	df, targets = encode_target(df, "StarGazersCount")
	y = df.starGazersCount
	X = df.drop('StarGazersCount', axis=1)
	
	X_train, X_test, Y_train, Y_test = cross_validation.train_test_split(X, y, test_size=0.5, random_state=0)
	
	regr1 = RandomForestRegressor(max_features=7, random_state=1)
	regr1.fit(X_train, Y_train)
	
	print "\n -- Evaluating the tree performance"
	pred = regr1.predict(X_test)
	plt.scatter(pred, Y_test, label='StarGazersCount')
	plt.plot([0,1],[0,1], '--k', transform=plt.gca().transAxes)
	plt.xlabel('pred')
	plt.ylabel('Y_test')
	
	print mean_squared_error(Y_test, pred)
	
	#visualize_tree(regr1, features, targets)
