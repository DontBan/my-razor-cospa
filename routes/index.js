var express = require('express');
var router = express.Router();

const moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ヒゲソリの替刃コスパ計算' });
});

router.post('/', function (req, res, next) {
  console.log(req.body);
  // 入力をチェックして、使いやすいように変数に代入
  const price = req.body.razorPrice;
  const start_year = req.body.start_year;
  const start_month = req.body.start_month;
  const start_day = req.body.start_day;

  // コスパ計算する
  const from = moment([start_year, start_month - 1, start_day]);
  const to = moment();
  const diff = to.diff(from, 'day');
  let cospa = price / diff;

  // console.log('diff:' + diff);
  // console.log('cospa:' + cospa);

  const answer = `${diff}日間使って、コストパフォーマンスは${cospa}円です。`;

  // 計算結果を返す、表示するための処理はpugで行う
  res.render('index', {
    title: 'ヒゲソリの替刃コスパ計算：結果',
    answer: answer
  });
});

module.exports = router;
