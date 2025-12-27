const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

let station2 = [
  { id:1, code:"JE01", name:"東京駅", change:"総武本線，中央線，etc", passengers:403831, distance:0 },
  { id:2, code:"JE02", name:"八丁堀駅", change:"日比谷線", passengers:31071, distance:1.2 },
  { id:3, code:"JE05", name:"新木場駅", change:"有楽町線，りんかい線", passengers:67206, distance:7.4 },
  { id:4, code:"JE07", name:"舞浜駅", change:"舞浜リゾートライン", passengers:76156,distance:12.7 },
  { id:5, code:"JE12", name:"新習志野駅", change:"", passengers:11655, distance:28.3 },
  { id:6, code:"JE17", name:"千葉みなと駅", change:"千葉都市モノレール", passengers:16602, distance:39.0 },
  { id:7, code:"JE18", name:"蘇我駅", change:"内房線，外房線", passengers:31328, distance:43.0 },
];

// 一覧
app.get("/keiyo2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('keiyo2', {data: station2} );
});

// Create
app.get("/keiyo2/create", (req, res) => {
  res.redirect('/public/keiyo2_new.html');
});

// Read
app.get("/keiyo2/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[ number ];
  res.render('keiyo2_detail', {id: number, data: detail} );
});

// Delete
app.get("/keiyo2/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  station2.splice( req.params.number, 1 );
  res.redirect('/keiyo2' );
});

// Create
app.post("/keiyo2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = station2.length + 1;
  const code = req.body.code;
  const name = req.body.name;
  const change = req.body.change;
  const passengers = req.body.passengers;
  const distance = req.body.distance;
  station2.push( { id: id, code: code, name: name, change: change, passengers: passengers, distance: distance } );
  console.log( station2 );
  res.render('keiyo2', {data: station2} );
});

// Edit
app.get("/keiyo2/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[ number ];
  res.render('keiyo2_edit', {id: number, data: detail} );
});

// Update
app.post("/keiyo2/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  station2[req.params.number].code = req.body.code;
  station2[req.params.number].name = req.body.name;
  station2[req.params.number].change = req.body.change;
  station2[req.params.number].passengers = req.body.passengers;
  station2[req.params.number].distance = req.body.distance;
  console.log( station2 );
  res.redirect('/keiyo2' );
});



app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/omikuji1", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.send( '今日の運勢は' + luck + 'です' );
});

app.get("/omikuji2", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.render( 'omikuji2', {result:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 以下の数行は人間の勝ちの場合の処理なので，
  // 判定に沿ってあいこと負けの処理を追加する
  judgement = '勝ち';
  win += 1;
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

// ===== 千葉県のスーパー（DBもどき）=====
let super_chiba = [
  { id: 1, name: "イオンモール幕張新都心", city: "千葉市美浜区", category: "総合スーパー", hours: "10:00-22:00", note: "大型・週末混みやすい" },
  { id: 2, name: "イトーヨーカドー 幕張店", city: "千葉市花見川区", category: "総合スーパー", hours: "10:00-21:00", note: "駅から徒歩圏" },
  { id: 3, name: "カスミ 津田沼店", city: "習志野市", category: "食品スーパー", hours: "9:00-21:00", note: "普段使い向き" },
  { id: 4, name: "ベイシア ちば古市場店", city: "千葉市緑区", category: "食品・日用品", hours: "9:00-20:00", note: "駐車場広め" },
  { id: 5, name: "業務スーパー 市川店", city: "市川市", category: "ディスカウント", hours: "9:00-20:00", note: "まとめ買い向き" }
];

// 一覧
app.get("/super_chiba", (req, res) => {
  res.render("super_chiba", { data: super_chiba });
});

// Create（フォーム表示）
app.get("/super_chiba/create", (req, res) => {
  res.redirect("/public/super_chiba_new.html");
});

// Read（詳細）
app.get("/super_chiba/:number", (req, res) => {
  const number = req.params.number;
  const detail = super_chiba[number];
  res.render("super_chiba_detail", { id: number, data: detail });
});

// Delete
app.get("/super_chiba/delete/:number", (req, res) => {
  super_chiba.splice(req.params.number, 1);
  res.redirect("/super_chiba");
});

// Create（追加実行）
app.post("/super_chiba", (req, res) => {
  const id = super_chiba.length + 1;
  super_chiba.push({
    id: id,
    name: req.body.name,
    city: req.body.city,
    category: req.body.category,
    hours: req.body.hours,
    note: req.body.note
  });
  res.render("super_chiba", { data: super_chiba });
});

// Edit（編集フォーム）
app.get("/super_chiba/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = super_chiba[number];
  res.render("super_chiba_edit", { id: number, data: detail });
});

// Update（更新実行）
app.post("/super_chiba/update/:number", (req, res) => {
  super_chiba[req.params.number].name = req.body.name;
  super_chiba[req.params.number].city = req.body.city;
  super_chiba[req.params.number].category = req.body.category;
  super_chiba[req.params.number].hours = req.body.hours;
  super_chiba[req.params.number].note = req.body.note;
  res.redirect("/super_chiba");
});

// ===== 千葉県の道の駅 =====
let michinoeki_chiba = [
  { id: 1, name: "道の駅 ちくら・潮風王国", city: "南房総市", specialty: "海産物・お土産", hours: "9:00-17:00", note: "海が近い" },
  { id: 2, name: "道の駅 とみうら 枇杷倶楽部", city: "南房総市", specialty: "びわ・スイーツ", hours: "9:00-17:00", note: "季節商品あり" },
  { id: 3, name: "道の駅 木更津うまくたの里", city: "木更津市", specialty: "地元野菜・加工品", hours: "9:00-17:00", note: "品ぞろえ豊富" },
  { id: 4, name: "道の駅 しょうなん", city: "柏市", specialty: "地産地消・直売", hours: "9:00-18:00", note: "週末にぎわう" },
  { id: 5, name: "道の駅 いちかわ", city: "市川市", specialty: "産直・軽食", hours: "9:00-18:00", note: "都心から近い" }
];

// 一覧
app.get("/michinoeki_chiba", (req, res) => {
  res.render("michinoeki_chiba", { data: michinoeki_chiba });
});

// Create（フォーム表示）
app.get("/michinoeki_chiba/create", (req, res) => {
  res.redirect("/public/michinoeki_chiba_new.html");
});

// Read（詳細）
app.get("/michinoeki_chiba/:number", (req, res) => {
  const number = req.params.number;
  const detail = michinoeki_chiba[number];
  res.render("michinoeki_chiba_detail", { id: number, data: detail });
});

// Delete
app.get("/michinoeki_chiba/delete/:number", (req, res) => {
  michinoeki_chiba.splice(req.params.number, 1);
  res.redirect("/michinoeki_chiba");
});

// Create（追加実行）
app.post("/michinoeki_chiba", (req, res) => {
  const id = michinoeki_chiba.length + 1;
  michinoeki_chiba.push({
    id: id,
    name: req.body.name,
    city: req.body.city,
    specialty: req.body.specialty,
    hours: req.body.hours,
    note: req.body.note
  });
  res.render("michinoeki_chiba", { data: michinoeki_chiba });
});

// Edit（編集フォーム）
app.get("/michinoeki_chiba/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = michinoeki_chiba[number];
  res.render("michinoeki_chiba_edit", { id: number, data: detail });
});

// Update（更新実行）
app.post("/michinoeki_chiba/update/:number", (req, res) => {
  michinoeki_chiba[req.params.number].name = req.body.name;
  michinoeki_chiba[req.params.number].city = req.body.city;
  michinoeki_chiba[req.params.number].specialty = req.body.specialty;
  michinoeki_chiba[req.params.number].hours = req.body.hours;
  michinoeki_chiba[req.params.number].note = req.body.note;
  res.redirect("/michinoeki_chiba");
});


// ===== 千葉県の温泉（DBもどき：例データ）=====
let onsen_chiba = [
  { id: 1, name: "浦安万華郷", city: "浦安市", fee: "平日 2,000円前後", hours: "11:00-翌9:00", closed: "年中無休", note: "岩盤浴あり" },
  { id: 2, name: "龍宮城スパホテル三日月", city: "木更津市", fee: "日帰り 2,000円前後", hours: "10:00-21:00", closed: "不定休", note: "大型スパ" },
  { id: 3, name: "極楽湯 柏店", city: "柏市", fee: "900円前後", hours: "9:00-翌2:00", closed: "年中無休", note: "炭酸泉" },
  { id: 4, name: "法典の湯", city: "市川市", fee: "1,000円前後", hours: "10:00-翌1:00", closed: "不定休", note: "露天風呂" },
  { id: 5, name: "かりんの湯", city: "香取市", fee: "700円前後", hours: "10:00-21:00", closed: "火曜（例）", note: "地元向け" }
];

// 一覧
app.get("/onsen_chiba", (req, res) => {
  res.render("onsen_chiba", { data: onsen_chiba });
});

// Create（フォーム表示）
app.get("/onsen_chiba/create", (req, res) => {
  res.redirect("/public/onsen_chiba_new.html");
});

// Read（詳細）
app.get("/onsen_chiba/:number", (req, res) => {
  const number = req.params.number;
  const detail = onsen_chiba[number];
  res.render("onsen_chiba_detail", { id: number, data: detail });
});

// Delete
app.get("/onsen_chiba/delete/:number", (req, res) => {
  onsen_chiba.splice(req.params.number, 1);
  res.redirect("/onsen_chiba");
});

// Create（追加実行）
app.post("/onsen_chiba", (req, res) => {
  const id = onsen_chiba.length + 1;
  onsen_chiba.push({
    id: id,
    name: req.body.name,
    city: req.body.city,
    fee: req.body.fee,
    hours: req.body.hours,
    closed: req.body.closed,
    note: req.body.note
  });
  res.render("onsen_chiba", { data: onsen_chiba });
});

// Edit（編集フォーム）
app.get("/onsen_chiba/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = onsen_chiba[number];
  res.render("onsen_chiba_edit", { id: number, data: detail });
});

// Update（更新実行）
app.post("/onsen_chiba/update/:number", (req, res) => {
  onsen_chiba[req.params.number].name = req.body.name;
  onsen_chiba[req.params.number].city = req.body.city;
  onsen_chiba[req.params.number].fee = req.body.fee;
  onsen_chiba[req.params.number].hours = req.body.hours;
  onsen_chiba[req.params.number].closed = req.body.closed;
  onsen_chiba[req.params.number].note = req.body.note;
  res.redirect("/onsen_chiba");
});


app.listen(8080, () => console.log("Example app listening on port 8080!"));
