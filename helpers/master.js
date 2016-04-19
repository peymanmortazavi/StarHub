'use strict';
const clientId = require('../config.json').tokens.github;  // refactor this
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
    var error = new Error("Could not retrieve github token from config.json");
    cb(error, null);
    return;
  }
  if (typeof url !== 'string') {
    var error = new Error('arg1 must be a string, ' + typeof url + ' found');
    cb(error, null);
    return;
  }

  const client = github.client(clientId);

  // get github repo name and username from inputted url
  const reg = /([^\/]*)\/([^\/]*)$/g;
  // console.log(inf(reg));
  const response = reg.exec(url);
  const owner = response[1];
  const repo = response[2];

  client.get(`/repos/${owner}/${repo}/readme`, {}, function (err, status, body, headers) {

    if (err != null) {
        cb(err, null);
        return;
    }
    if (body == null) {
        cb(new Error('HTTP Call did not return a body. Statusi code was: ' + status), null);
        return;
    }

    try {
        const decoded = base64.decode(body.content);
        delete body.content;
        let myExtension = fileExtension(body.name).trim();
        let markdownReg = /markdown|mdown|mkdn|mkd|md/gi;
        const isMarkdown = markdownReg.test(myExtension);

        const h1 = arrify(decoded.match(regs.markdownHeader(1, 'gm')));
        const h2 = arrify(decoded.match(regs.markdownHeader(2, 'gm')));
        const h3 = arrify(decoded.match(regs.markdownHeader(3, 'gm')));
        const h4 = arrify(decoded.match(regs.markdownHeader(4, 'gm')));
        const h5 = arrify(decoded.match(regs.markdownHeader(5), 'gm'));

        let headerSum = h1.length + h2.length + h3.length + h4.length + h5.length;
        body.helpers = {
            readmeIsMarkdown: isMarkdown,
            linkArray: arrify(linkArray(decoded)),
            imageArray: arrify(imageArray(decoded)),
            wordFrequency: frequency(decoded),
            ownerInfo: {
                           owner: owner,
                           length: owner.length,
                           hasNumbers: /\d/gim.test(owner)
                       },
            repoInfo: {
                          repo: repo,
                          length: repo.length,
                          hasNumbers: /\d/gim.test(repo)
                      },
            sectionCount: {
                              h1: h1,
                              h2: h2,
                              h3: h3,
                              h4: h4,
                              h5: h5,
                              headerSum: headerSum
                          }

        };

        cb(null, {
            headers: headers,
            body: body
        });

    } catch (error) {
        cb(error, null);
    }

  });
};
