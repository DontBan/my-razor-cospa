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
  let answer = {};
  const price = req.body.razorPrice;
  const start_year = req.body.start_year;
  const start_month = req.body.start_month;
  const start_day = req.body.start_day;

  // コスパ計算する
  const from = moment([start_year, start_month - 1, start_day]);
  // console.log('存在する日付か:' + from.isValid());
  if (!from.isValid()) {
    answer.dateError = '申し訳ありませんが、存在する日を入力して下さい。';
  }
  const to = moment();
  const days = Math.floor(moment.duration(to.diff(from)).asDays());
  
  let cospa = Math.round(price / days);

  console.log(days);
  // console.log('cospa:' + cospa);

  if (price <= 0) {
    answer.priceError = '替刃一つあたりの値段は1円以上で入力して下さい。';
  }
  if (days == 0) {
    answer.message = '今日、使い始めたばかりですね。';
  } else if (days > 0) {
    answer.message = `${days}日間使って、コストパフォーマンスは約 ${cospa} 円です。`;
  } else {
    answer.dateError = '今日より前の日時を選択してください。';
  }
  // 計算結果を返す、表示するための処理はpugで行う
  res.render('index', {
    title: 'ヒゲソリの替刃コスパ計算：結果',
    price: price,
    start_year: start_year,
    start_month: start_month,
    start_day: start_day,
    answer: answer
  });
});

module.exports = router;
