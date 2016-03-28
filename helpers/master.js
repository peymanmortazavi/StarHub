'use strict';
const clientId = process.env.GH_TOKEN;
const github = require('octonode');
const inf = require('inf');
const base64 = require('js-base64').Base64;
const arrify = require('arrify');

const fileExtension = require('file-extension');
const linkArray = require('./link-array.js');
const imageArray = require('./image-array.js');
const frequency = require('./frequency.js');
const sectionCount = require('./sectionCount.js');
const regs = require('regs');

module.exports = function(url, cb) {
  if (!clientId) {
    console.error('You need to export an environmental token called \"GH_TOKEN\"');
    process.exit(1);
  }
  if (typeof url !== 'string') {
    console.error('arg1 must be a string, ' + typeof url + ' found');
    process.exit(1);
  }

  const client = github.client(clientId);

  // get github repo name and username from inputted url
  const reg = /([^\/]*)\/([^\/]*)$/g;
  // console.log(inf(reg));
  const response = reg.exec(url);
  const owner = response[1];
  const repo = response[2];

  client.get(`/repos/${owner}/${repo}/readme`, {}, function (err, status, body, headers) {
    const decoded = base64.decode(body.content);
    // console.log(inf(decoded));
    body.decodedContent = decoded;
    // delete body.content;
    // console.log(inf(body.decodedContent));
    let myExtension = fileExtension(body.name).trim();
    let markdownReg = /markdown|mdown|mkdn|mkd|md/gi;
    if (markdownReg.test(myExtension)) {
      myExtension = 'markdown';
    }

    body.helpers = {
      fileExtension: myExtension,
      linkArray: linkArray(decoded),
      // wordFrequency: frequency(decoded),
      sectionCount: {
        h1: arrify(decoded.match(regs.markdownHeader(1, 'gm'))),
        h2: arrify(decoded.match(regs.markdownHeader(2, 'gm'))),
        h3: arrify(decoded.match(regs.markdownHeader(3, 'gm'))),
        h4: arrify(decoded.match(regs.markdownHeader(4, 'gm'))),
        h5: arrify(decoded.match(regs.markdownHeader(5), 'gm'))
      }

    };
    cb({
      headers: headers,
      body: body
    });
  });
};
