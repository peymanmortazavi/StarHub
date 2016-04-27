import os
import subprocess
import pandas as pd
from pymongo import MongoClient
import numpy as np
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor, export_graphviz
from sklearn.metrics import confusion_matrix, mean_squared_error
from sklearn import cross_validation

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
	#print df_mod
	return (df_mod, targets)
	
def visualize_tree(tree, feature_names, targets):
	with open("starhub.dot", 'w') as f:
		f = export_graphviz(tree, out_file=f, feature_names = feature_names, class_names = ["1","0"], filled = "true")
	
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
	y = df["starGazersCount"]
	X = df[features]
	
	#starhub = DecisionTreeClassifier(min_samples_split=15000, random_state=99)
	#starhub.fit(X, y)
	
	X_train, X_test, Y_train, Y_test = cross_validation.train_test_split(X, y, test_size=0.2)
	
	starhub = DecisionTreeClassifier(max_depth=6, min_samples_split=15000)
	starhub.fit(X, y)
	
	print "\n -- Random Split --"
	starhub1 = DecisionTreeClassifier()
	starhub1.fit(X_train, Y_train)
	print starhub1.score(X_test, Y_test)

	print "\n -- Cross validation "
	
	scores = cross_validation.cross_val_score(starhub, X, y, cv = 25)
	print scores.mean()
	
	visualize_tree(starhub, features, targets)
