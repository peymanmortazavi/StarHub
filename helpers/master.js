const clientId = process.env.GH_TOKEN;
const github = require('octonode');
const inf = require('inf')
const base64 = require('js-base64').Base64;

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
  const reg = /([^\/]*)\/([^\/]*)$/g;
  console.log(inf(reg));
  const response = reg.exec(url);
  const owner = response[1];
  const repo = response[2];

  client.get(`/repos/${owner}/${repo}/readme`, {}, function (err, status, body, headers) {
    const decodedBodyContent = base64.decode(body.content);

    cb({
      headers: headers,
      body: body,
      decodedBodyContent: decodedBodyContent
    });
  });
};
