#!/usr/bin/env python
from pymongo import MongoClient

def get_collection:
  client = MongoClient("mongodb://hackcave.dynu.com:27017/github")
  collection = client['github']['repositories']

  return collection
