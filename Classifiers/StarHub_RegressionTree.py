import os
import subprocess
import pandas as pd
import matplotlib.pyplot as plt
from pymongo import MongoClient
import numpy as np
import graphviz
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
	return (df_mod, targets)
	
if __name__ == '__main__':
	print "\n -- get data: "
	df = get_github_data()
	
	print "\n -- df.head():"
	#print df
	features = ["RepositorySize", "RepositoryDescriptionLength", "ReadmeFileSize", "NumberOfImagesinReadme", "NumberOfSectionsInReadme", "OwnerNameLength", "RepoNameLength"]
	df, targets = encode_target(df, "StarGazersCount")
	y = df.StarGazersCount
	X = df.drop("StarGazersCount", axis=1)
	
	X_train, X_test, Y_train, Y_test = cross_validation.train_test_split(X, y, test_size=0.2, random_state=99)
	
	regressionTree = DecisionTreeRegressor(max_depth=3)
	regressionTree.fit(X_train, Y_train)
	
	export_graphviz(regressionTree, out_file="mytree.dot", feature_names=X_train.columns)
	with open("mytree.dot") as f:
		dot_graph = f.read()
	graphviz.Source(dot_graph)
	
	print "\n -- Evaluating the tree performance"
	pred = regressionTree.predict(X_test)
	plt.scatter(pred, Y_test, label='StarGazersCount')
	plt.plot([0,1],[0,1], '--k', transform=plt.gca().transAxes)
	plt.xlabel('pred')
	plt.ylabel('Y_test')
	
	print mean_squared_error(Y_test, pred)
