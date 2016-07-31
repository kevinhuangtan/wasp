var path = require('path');
var express = require('express');
var webpack = require('webpack');
var app = express();
app.set('port', (process.env.PORT || 3000));

if(app.get('port') == 3000){ // local
  var config = require('./webpack.config.dev');
  var compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));

}
else{
  app.use(express.static(__dirname + '/dist'));
}


app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/src', express.static('src'));

app.listen(app.get('port'), function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${app.get('port')}`);
});
