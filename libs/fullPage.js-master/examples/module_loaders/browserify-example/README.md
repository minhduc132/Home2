# Browserify example for fullPage.js

### Creating the bundle file

In order to create the bundle file `main.js` run the following command inside the root folder:

```sh
npm run build
```

Then run:
```sh
npm run build
```

Which runs the comand specified in `package.json`:

```sh
browserify src/index.js > dist/main.js
```

### Importing files

```javascript
// Optional. When using fullPage extensions
//require('./fullpage.scrollHorizontally.min');

// Optional. When using scrollOverflow:true
//require('fullpage.js/vendors/scrolloverflow');

var fullpage = require('fullpage.js');

// When using fullPage extensions replace the previos require
// of fullpage.js for this file
//var fullpage = require('fullpage.js/dist/fullpage.extensions.min');

// Initializing it
var fullPageInstance = new fullpage('#myFullpage', {
    navigation: true,
    sectionsColor:['#ff5f45', '#0798ec', '#fc6c7c', 'grey']
});
```
const express = require("express");
const app = express();
// start hosting nodejs port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT,function () {
console.log("server is running....");
});
// ket noi db de lam viec voi du lieu
const mssql = require("mssql");
const config = {
server:"118.70.125.210",
user:"sa",
password:"z@GH7ytQ",
database:"QuangHoa"
};
mssql.connect(config,function (err) {
if(err) console.log(err);
else console.log("ket noi DB thanh cong!");
});
// tao 1 bien de lam viec voi db
const sql = new mssql.Request();
// tao 1 routing
app.get("/",function (req,res) {
res.send("xin chao");
var txt_sql = "select * from KhachHang;" +
"select * from DonHang;select * from HangHoa;";
sql.query(txt_sql,function (err,rows) {
if(err){
res.render("home",{
dskh:[],
dsdh:[],
dshh:[]
})
}else{
res.render("home",{
dskh:rows.recordsets[0],
dsdh:rows.recordsets[1],
dshh:rows.recordsets[2],
})
}
})
//res.send("xin chao");
});
// khai bao web se dung view engine la ejs
app.set("view engine","ejs");
// cap quyen truy cap cac file static trong public
app.use(express.static("public"));
// tao 1 routing chuyen dua ra danh sach khach hang
app.get("/danh-sach-khach-hang",function (req,res) {
var ds = [];
var txt_sql = "select * from KhachHang";
sql.query(txt_sql,function (err,rows) {
if(err) ds = ["Khong co khach hang nao ca"];
else ds = rows.recordset;
res.render("danhsachkhachhang",{
ds:ds
});
});
// res.send(ds);
});
// tao 1 routing chuyen dua ra danh sach hang hoa
app.get("/danh-sach-hang-hoa",function (req,res) {
var ds = [];
var txt_sql = "select * from HangHoa";
sql.query(txt_sql,function (err,rows) {
if(err) ds = ["Khong co hang hoa nao ca"];
else ds = rows.recordset;
res.send(ds);
});
// res.send(ds);
});
// tao 1 routing chuyen dua ra danh sach hang hoa
app.get("/tim-kiem-hang-hoa",function (req,res) {
var thamsoxyz = req.query.tentimkiem;
var ds = [];
var txt_sql = "select * from HangHoa where Ten like N'%"+
thamsoxyz+"%' OR MoTa like N'%"+thamsoxyz+"%'";
sql.query(txt_sql,function (err,rows) {
if(err) ds = ["Khong co hang hoa nao ca"];
else ds = rows.recordset;
res.send(ds);
});
// res.send(ds);
});
if(thamsoxyz == undefined){
res.render("timkiem",{ds:[]});
}else{
var ds = [];
var txt_sql = "select * from HangHoa where Ten like N'%"+
thamsoxyz+"%' OR MoTa like N'%"+thamsoxyz+"%'";
sql.query(txt_sql,function (err,rows) {
if(err) ds = ["Khong co hang hoa nao ca"];
else ds = rows.recordset;
res.render("timkiem",{
ds:ds
});
});
}
});