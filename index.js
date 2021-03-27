const express=require("express");
const app=express();

// start hosting nodejs port 5000
const PORT = process.env.PORT || 5000;
app.listen(port,function () {
    console.log("sever is running....");
});

// tạo 1 routing
app.get("/",function (req,res) {
    res.send("xin chao");
});