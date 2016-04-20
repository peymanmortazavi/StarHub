from pymongo import MongoClient
import json

client = MongoClient("mongodb://hackcave.dynu.com:27017/github")
collection = client['github']['repositories']

cursor = collection.find({},{"size":1, "stargazers_count":1, "_id":0})

for doc in cursor:
    json.loads(str(doc))
    print str(doc).decode("utf-8")
    # json.loads('{\"RepositorySize\": \"%d\", \"StarGazersCount\":\"%d\"},',len,doc.stargazers_count')

