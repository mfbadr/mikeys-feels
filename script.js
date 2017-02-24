'use strict'

var Twit = require('twit');
var feelings = require('./feelings.js').feels;

var http = require('http');
http.createServer(function (request, response) {
 console.log('server started')
}).listen(process.env.PORT || 5000);

var T = new Twit({
  consumer_key:         'ZFfvMVGPDRJITaPGFBr5wcb1k',
  consumer_secret:      process.env.CONSUMER_SECRET,
  access_token:         '751476497244971009-n92sCrtlAFYMcgOLN12XUQLQsrME7u3',
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});

Array.prototype.sample = function(){
  return this[Math.floor(Math.random()*this.length)];
}

var adverbs = ['a little', 'extremely', 'somewhat', 'somehow', 'very', 'exceptionally', 'uncharacterisically', 'weirdly', 'oddly', 'way too'];
var conjunctions = ['but also', 'and', 'yet is also', 'but isn\'t', 'but wants to be', 'yet wants to be'];
var verbs = ["feels", "is", "wants to be", "wishes he could be"]

function concat(toString){
  return toString.join(' ');
}

function generate(){
  //var template = templates.sample();
  var template = ['Mikey'];

  function buildTemplate(i){
    if ( i == 1){
      template.push(conjunctions.sample());
      if(Math.random() > 0.5){
        template.push(adverbs.sample());
      }
      template.push(feelings.sample());
      return;
    }else if (i == 0) {
      template.push(verbs.sample());
      if(Math.random() > 0.5){
        template.push(adverbs.sample());
      }
      template.push(feelings.sample());

      if(Math.random() > 0.5){
        buildTemplate(1);
      }
      return;
    }
  }

  buildTemplate(0);
  return concat(template);
}

function tweet(){
  var newFeel = generate();
  T.post('statuses/update', { status: newFeel }, function(err, data, response) {
    console.log(data)
  });
}
// console.log('Posted: ', newFeel)
//1000 * 60 * 60 * 5 = every 5 hours
var tweetTimer = setInterval(tweet(), 18000000);



