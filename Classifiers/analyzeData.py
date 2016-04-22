import os
import subprocess
import pandas as pd
from pymongo import MongoClient
import numpy as np
from sklearn.tree import DecisionTreeClassifier, export_graphviz

def get_github_data():
	if os.path.exists("GitHubsample.csv"):
		print("-- csv found locally")
		df = pd.read_csv("GitHubsample.csv")
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
	
def visualize_tree(tree, feature_names):
	with open("GitHub.dot", 'w') as f:
		f = export_graphviz(tree, out_file=f, feature_names = feature_names, filled = True) 
	
	command = ["dot", "-Tpng", "GitHub.dot", "-o", "GitHub.png"]
	try:
		subprocess.check_call(command)
	except:
		exit("could not run dot, ie graphviz, to produce visualization, please run the command again separately")
	
if __name__ == '__main__':
	print "\n -- get data: "
	df = get_github_data()
	
	print "\n -- df.head():"
	#print df
	features = ["RepositorySize", "RepositoryDescriptionLength", "ReadmeFileSize", "NumberOfImagesinReadme", "RepoNamehasNumbers", "OwnerNameHasNumbers", "isReadmeMarkdown", "NumberOfSectionsInReadme", "OwnerNameLength", "RepoNameLength"]
	df, targets = encode_target(df, "StarGazersCount")
	y = df["starGazersCount"]
	X = df[features]
	
	dt = DecisionTreeClassifier(min_samples_split=5, random_state=9)
	dt.fit(X, y)
	
	print dt
	print "\n -- Done "
	
	visualize_tree(dt, features)
