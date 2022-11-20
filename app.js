const express = require("express")
const app = express()
const path = require("path")

//setting/multer 설정
const upload = require("./setting/multer")

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

/**
 * 요청이 들어오면 이미지를 /res/img.jpg로 저장하고 파이썬 스크립트 실행
 */
app.post("/multer/upload", upload.single('img'), async (req, res ,next) => {
    // console.log(req.file);

    // res.json(`{"url" : "/res/${req.file.filename }"}`)

    const result = require('child_process').spawn('python',  ['./modelLogic.py'])
    await result.stdout.on('data', (data) => {
        res.json( `{"result" : "${data.string() }"}` )
    })

})





app.get("/" , (req, res, next) =>{
        res.render("multer.html")
})



app.listen(app.get('port'), () => {
    console.log(app.get('port') , "번 포트에서 안드로이드서 서버 시작.")
})


