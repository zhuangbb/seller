var express = require('express');
var config = require('./config/index');

var port = process.env.PORT || config.build.port;
var app = express();

var router = express.Router();

router.get('/', function (req, res, next) {
  req.url = '/index.html';
  next();
});

app.use(router);

var appData = require('./data.json')
var seller = appData.seller
var goods = appData.goods
var ratings = appData.ratings

 //设置路由信息
 var apiRoutes = express.Router()
 //通过路由获取不同的页面数据
apiRoutes.get('/seller',function (req,res) {
  res.json({
    errno:0,
    data:seller
  })
}) 
apiRoutes.get('/goods',function (req,res) {
  res.json({
    errno:0,
    data:goods
  })
}) 
apiRoutes.get('/ratings',function (req,res) {
  res.json({
    errno:0,
    data:ratings
  })
}) 
// 调用app路由规则
app.use('/api',apiRoutes)

app.use(express.static('./dist'));

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
});
