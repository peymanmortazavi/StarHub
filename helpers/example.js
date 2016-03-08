'use strict';
var linkArray = require('./link-array.js');

var source = "Hello www.example.com,\n"
+ "http://google.com is a search engine, like http://www.bing.com\n"
+ "http://exämple.org/foo.html?baz=la#bumm is an IDN URL,\n"
+ "http://123.123.123.123/foo.html is IPv4 and "
+ "http://fe80:0000:0000:0000:0204:61ff:fe9d:f156/foobar.html is IPv6.\n"
+ "links can also be in parens (http://example.org) "
+ "or quotes »http://example.org«.";

var myLinkArray = linkArray(source);
console.log('link-array.js output: ' + myLinkArray);
console.log('link-array length: ' + myLinkArray.length);
