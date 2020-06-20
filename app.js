const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname))
const urlencodedParser = bodyParser.urlencoded({extended: false});
var Crypto = require('crypto-js')
ObjectId = require("mongodb").ObjectID;

var port = process.env.PORT||3000;
app.listen(process.env.PORT ||port, () => {
  console.log(`Listening on port ${port}`)
})

var error_message="None";

const mongoClient = require("mongodb").MongoClient;
const url = process.env.MONGODB_URI || "mongodb://user:user2ndpass@ds159546.mlab.com:59546/smart-contracts";

app.use(session({
      secret: 'mylittlesecret',
      store: new MongoStore({url: process.env.MONGODB_URI || "mongodb://user:user2ndpass@ds159546.mlab.com:59546/smart-contracts"}),
      cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60 * 1000 * 30
      },
      resave: false,
      saveUninitialized: false
    })
);


app.post("/login", urlencodedParser, function (req, res) {
      if ((req.body.password === "secretnyingredient")&&(req.body.login === "iro4kka")) {
        req.session.authorized = true;
        res.redirect('/approve');
      }
      else if (req.body.password !== "secretnyingredient"){
        error_message = "Неверный пароль";
        res.redirect('/');
      }
      else {
        error_message="Неверное имя";
        res.redirect('/');
      }
});

app.get("/geterror", (request, result)=>{
  result.send(error_message);
  error_message="None";
});

app.get("/logout", (req, res) => {
    delete req.session.authorized;
    delete req.session.username;
    res.redirect('/')
});


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/login.html')
});


app.get('/success', (req, res) => {
    res.sendFile(__dirname + '/success.html')
});

app.get('/approve', (req, res) => {
  if (req.session.authorized)
      res.sendFile(__dirname + '/approve.html')
  else
    res.redirect('/')
});

app.post('/answers', (req, res) => {
    let ans1 = req.body.ans1; let ans2 = req.body.ans2; let ans3 = req.body.ans3; let ans4 = req.body.ans4; let ans5 = req.body.ans5;
    let cnt = 0;
    if (ans1 === "179" || ans1 === "242") cnt+=1;
    if (ans2 === "улицы" || ans2 === "Улицы") cnt+=1;
    if (ans3 === "sushicity" || ans3 === "Sushicity" || ans3 === "sushi-city" || ans3 === "Sushi-city" ||
        ans3 === "сушисити" || ans3 === "Сушисити" || ans3 === "суши-сити" || ans3 === "Суши-сити") cnt+=1;
    if (ans4 === "майонез" || ans4 === "Майонез") cnt+=1;
    if (ans5 === "бгвад" || ans5 === "БГВАД" || ans5 === "б, г, в, а, д" || ans5 === "Б, Г, В, А, Д" ||
        ans5 === "б,г,в,а,д" || ans5 === "Б,Г,В,А,Д") cnt+=1;
    if (cnt === 5){
        error_message="OK";
    }
    else {
        let tmp = 'Личность не подтверждена. ' + cnt + '/5.';
        error_message = tmp;
    }
})

app.post('/code', (req, res) => {
    let code = req.body.code;
    if (code === "givememypresent") {
        error_message="Give"
    }
    else {
        error_message = 'Код неверный. Для получения доступа пройдите проверку.';
    }
});