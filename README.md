# StarHub

### Correlation commands to run
```shell
node Correlation/repoSize.js

node Correlation/repoNameLength.js



```

### Installation
```js
npm install
```

# What we're looking for in Read-me files:

The Github returned content is base64 decode it first.

  * Number of sections
  - [x] readme file type (markdown, txt, etc)

  - [x] Length (you can get it from Github API: /api/ response.size)
  - [x] Not currently functioning Number of images used [image-array.js](image-array.js)
  - [x] Links [link-array.js](link-array.js)
    - [x] array of links
    - [x] number of links
  - [x] Word count (frequency): https://tonicdev.com/56c24183e3023b0d005535b1/56e1031073f4dc1100edbd3a
  - [x] Section Count [sectionCount.js](sectionCount.js)

  * [Stretch] is there a code sample? How many bytes of code samples are there?
  * [Stretch] Badge count (extension of Links finding above)
  * [Stretch] Links to other Github users


# Example output:

```js
node helpers/example.js
```

```
link-array.js output: https://img.shields.io/npm/v/to-type.svg,https://www.npmjs.com/package/to-type,http://img.shields.io/npm/dm/to-type.svg?style=flat,http://npmjs.org/to-type,https://img.shields.io/badge/code_style-XO-5ed9c7.svg,https://github.com/sindresorhus/xo,https://travis-ci.org/dawsonbotsford/to-type,https://api.travis-ci.org/dawsonbotsford/to-type.svg?branch=master,https://ci.appveyor.com/project/dawsonbotsford/to-type,https://ci.appveyor.com/api/projects/status/xnen769jka939d6t/branch/master?svg=true,https://github.com/angus-c,https://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/,http://www.ecma-international.org/publications/files/ECMA-ST-ARCH/ECMA-262,%201st%20edition,%20June%201997.pdf#sec-11.4.3,http://dawsonbotsford.com
link-array length: 14

image-array.js output: .svg,.svg,.svg,.svg,?svg
image-array length: 5

frequency: [{"word":"travis","count":1},
{"word":"//=>","count":24},
{"word":"typeof","count":13},
{"word":"<br>","count":13},
{"word":"type","count":12},
{"word":"new","count":12},
{"word":"object","count":11},
{"word":"https","count":10},
{"word":"```","count":7},
{"word":"to","count":6},
{"word":"[","count":6},
{"word":"]","count":6},
{"word":"##","count":6},
{"word":"the","count":5},
{"word":"```js","count":5},
{"word":"number","count":5},
{"word":"string","count":5},
{"word":"you","count":5},
{"word":"svg","count":4},
{"word":"http","count":4},
{"word":">","count":3},
{"word":"//img","count":3},
{"word":"shields","count":3},
{"word":"javascript","count":3},
{"word":"abc","count":3},
{"word":"it","count":3},
{"word":"me","count":3},
{"word":"date","count":3},
{"word":"json","count":3},
{"word":"boolean","count":3},
{"word":"math","count":3},
{"word":"be","count":2},
{"word":"[npm","count":2},
{"word":"//www","count":2},
{"word":"c","count":2},
{"word":"//github","count":2},
{"word":"<tr>","count":2},
{"word":"</tr>","count":2},
{"word":"<td","count":2},
{"word":"align=","count":2},
{"word":"center","count":2},
{"word":"<a","count":2},
{"word":"href=","count":2},
{"word":"ci","count":2},
{"word":"org/dawsonbotsford/to","count":2},
{"word":"><img","count":2},
{"word":"src=","count":2},
{"word":"></a>","count":2},
{"word":"</td>","count":2},
{"word":"//ci","count":2},
{"word":"appveyor","count":2},
{"word":"this","count":2},
{"word":"is","count":2},
{"word":"s","count":2},
{"word":"/","count":2},
{"word":"install","count":2},
{"word":"/a","count":2},
{"word":"z/","count":2},
{"word":"function","count":2},
{"word":"vague","count":2},
{"word":"%","count":2},
{"word":"and","count":2},
{"word":"always","count":2},
{"word":"like","count":2},
{"word":"returns","count":2},
{"word":"
{a","count":2},
{"word":"}","count":2},
{"word":"referenceerror","count":2},
{"word":"not","count":2},
{"word":"true","count":2},
{"word":"target","count":2},
{"word":"#####","count":2},
{"word":"symbol","count":2},
{"word":"if","count":2},
{"word":"follow","count":2},
{"word":"#","count":1},
{"word":"way","count":1},
{"word":"should","count":1},
{"word":"version]","count":1},
{"word":"io/npm/v/to","count":1},
{"word":"npmjs","count":1},
{"word":"com/package/to","count":1},
{"word":"download","count":1},
{"word":"count]","count":1},
{"word":"io/npm/dm/to","count":1},
{"word":"style=flat","count":1},
{"word":"//npmjs","count":1},
{"word":"org/to","count":1},
{"word":"[xo","count":1},
{"word":"code","count":1},
{"word":"style]","count":1},
{"word":"io/badge/code_style","count":1},
{"word":"xo","count":1},
{"word":"ed","count":1},
{"word":"com/sindresorhus/xo","count":1},
{"word":"<table>","count":1},
{"word":"<thead>","count":1},
{"word":"<th>linux","count":1},
{"word":"&","count":1},
{"word":"osx</th>","count":1},
{"word":"<th>windows</th>","count":1},
{"word":"</thead>","count":1},
{"word":"<tbody>","count":1},
{"word":"//travis","count":1},
{"word":"//api","count":1},
{"word":"totype","count":16},
{"word":"branch=master","count":1},
{"word":"com/project/dawsonbotsford/to","count":1},
{"word":"com/api/projects/status/xnen","count":1},
{"word":"jka","count":1},
{"word":"d","count":1},
{"word":"t/branch/master","count":1},
{"word":"svg=true","count":1},
{"word":"</tbody>","count":1},
{"word":"</table>","count":1},
{"word":"a","count":1},
{"word":"node","count":1},
{"word":"implementation","count":1},
{"word":"of","count":1},
{"word":"[angus","count":1},
{"word":"c]","count":1},
{"word":"com/angus","count":1},
{"word":"[fixing","count":1},
{"word":"operator]","count":1},
{"word":"//javascriptweblog","count":1},
{"word":"wordpress","count":1},
{"word":"com/","count":1},
{"word":"/fixing","count":1},
{"word":"operator/","count":1},
{"word":"npm","count":1},
{"word":"save","count":1},
{"word":"usage","count":1},
{"word":"const","count":1},
{"word":"=","count":1},
{"word":"require","count":1},
{"word":"array","count":1},
{"word":"regexp","count":1},
{"word":"about","count":1},
{"word":"`typeof`","count":1},
{"word":"sucks","count":1},
{"word":"has","count":1},
{"word":"returned","count":1},
{"word":"values","count":1},
{"word":"since","count":1},
{"word":"ecma","count":1},
{"word":"international","count":1},
{"word":"org/publications/files/ecma","count":1},
{"word":"st","count":1},
{"word":"arch/ecma","count":1},
{"word":"st%","count":1},
{"word":"edition","count":1},
{"word":"june%","count":1},
{"word":"pdf#sec","count":1},
{"word":"will","count":1},
{"word":"due","count":1},
{"word":"backwards","count":1},
{"word":"compatibility","count":1},
{"word":"seems","count":1},
{"word":"nearly","count":1},
{"word":"every","count":1},
{"word":"call","count":1},
{"word":"`object`","count":1},
{"word":"don","count":1},
{"word":"t","count":1},
{"word":"believe","count":1},
{"word":"did","count":1},
{"word":"i","count":1},
{"word":"hear","count":1},
{"word":"say","count":1},
{"word":"that","count":1},
{"word":"was","count":1},
{"word":"enough","count":1},
{"word":"proof","count":1},
{"word":"wait","count":1},
{"word":"re","count":1},
{"word":"still","count":1},
{"word":"convinced","count":1},
{"word":"`to","count":1},
{"word":"type`","count":1},
{"word":"fixes","count":1},
{"word":"these","count":1},
{"word":"outputs","count":1},
{"word":"by","count":1},
{"word":"returning","count":1},
{"word":"types","count":1},
{"word":"expect","count":1},
{"word":"see","count":1},
{"word":"api","count":1},
{"word":"###","count":1},
{"word":"`all","count":1},
{"word":"types`","count":1},
{"word":"`string`","count":1},
{"word":"description","count":1},
{"word":"return","count":1},
{"word":"value","count":1},
{"word":"**lowercased**","count":1},
{"word":"more","count":1},
{"word":"examples","count":1},
{"word":"error","count":1},
{"word":"//es","count":1},
{"word":"newer","count":1},
{"word":"promise","count":1},
{"word":"license","count":1},
{"word":"mit","count":1},
{"word":"©","count":1},
{"word":"[dawson","count":1},
{"word":"botsford]","count":1},
{"word":"//dawsonbotsford","count":1},
{"word":"com","count":1},
{"word":"star","count":1},
{"word":"want","count":1}]

count: { '##': 6, '###': 1, '####': 0, '#####': 2 }
```
