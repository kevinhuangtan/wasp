var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

const localhost = 3000;
app.set('port', (process.env.PORT || localhost));
app.use(express.static('public')); // you can get files in public folder, i.e src="css/main.css"

if(app.get('port') == localhost){ // local
  var webpack = require('webpack');
  var config = require('./webpack.config.dev');
  var compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
  app.use('/src', express.static('src'));

}
else{
  app.use('/static', express.static(__dirname + '/dist'));
}

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.listen(app.get('port'), function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${app.get('port')}`);
});
