const express = require('express');
var Request = require("request");
const moment = require('moment');
var _ = require('underscore');
var app = express();

app.get('/currency', (req, res, next) => {
  var date = moment().format('YYYY MM DD').replace(/\s+/g, '-')
  var base = "EUR"
  var targetCur = "USD"
  Request.get(`https://api.exchangeratesapi.io/history?start_at=2019-07-01&end_at=${date}&base=${base}`, (error, response, body) => {
      if(error) {
          return console.dir(error);
      }
      var data = JSON.parse(body).rates
      var keys = Object.keys(data)
      var arr = []
      _.map(keys, (key) => {
        var result = []
        result.push(key)
        var changes = _.values(_.pick(data[key], targetCur));
        result.push(changes[0])
        arr.push(result)
      })
      console.log(arr)
      res.send(arr)
      // return arr
  });
  // console.log('ending scene')
  // res.send('hiii')
  // return 'hiii';
});




var port = 5000;
app.listen(port, () => {
  console.log('listening')
})
