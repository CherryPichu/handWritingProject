const express = require("express")
const app = express()
const path = require("path")

const nunjucks = require('nunjucks')
app.set('view engine', 'html')
nunjucks.configure('views/', {
    express : app,
    watch : true,
})

const dotenv = require('dotenv')
dotenv.config();


app.set("port", 8083)

//multer 설정
app.get("/multer", (req, res ,next) => {
    res.render("multer")
})
app.post("/multer/upload", upload.single('img'), (req, res ,next) => {
    // console.log(req.file);

    res.json(`{"url" : "/res/${req.file.filename }"}`)
})

app.get("/start", async (req,res, next)=> {
    // 파이썬 스크립트 실행

    const result = require('child_process').spawn('python')
    await result.stdout.on('data', (data) => {
        res.send( data.toString() )
    })
    
})


app.get("/" , (req, res, next) =>{
        res.render("index.html")
})



app.listen(app.get('port'), () => {
    console.log(app.get('port') , "번 포트에서 안드로이드서 서버 시작.")
})


