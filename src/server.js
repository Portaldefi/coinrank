var express = require('express');
var cors = require('cors');
var app = express();

let getLists = require('../public/tokenlists')

let port = process.env.PORT || 3344;

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));
app.use('/', express.static('public'));

app.get('/lists', function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  let chainId = req.query.chainId;
  console.log("chain id", chainId);
  getLists(chainId, function(data){
    res.send({
      count: data.length,
      chainId: chainId,
      tokens: data
    });
  });
})

app.listen(port);
