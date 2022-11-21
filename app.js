const express = require("express")
const app = express()
const path = require("path")
const sharp = require('sharp')
const fs = require('fs')
// https://noonestaysthesame.tistory.com/entry/multer%EB%A1%9C-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C-%ED%95%98%EA%B3%A0-sharp%EB%A1%9C-%EB%A6%AC%EC%82%AC%EC%9D%B4%EC%A7%95-%ED%95%B4%EC%A3%BC%EA%B8%B0

//setting/multer 설정
const upload = require("./setting/multer")

const nunjucks = require('nunjucks')
app.set('view engine', 'html')
nunjucks.configure('views/', {
    express : app,
    watch : true,
})

app.use(express.static(path.join(__dirname, 'views')))

const dotenv = require('dotenv')
dotenv.config();


// bodypaser
const bodyParser =  require('body-parser')
app.use(bodyParser.urlencoded({ extended : false}))
app.use(bodyParser.json());


app.set("port", 8083)

//multer 설정
app.get("/multer", (req, res ,next) => {
    res.render("multer")
})

/**
 * 요청이 들어오면 이미지를 /res/img.jpg로 저장하고 파이썬 스크립트 실행
 */
app.post("/multer/upload", upload.single('img'), async (req, res ,next) => {

    // try{
    //     sharp("./res/img.jpg")	// 리사이징할 파일의 경로
    //         .resize({height:831})	// 원본 비율 유지하면서 width 크기만 설정
    //         .withMetadata()
    //         .toFile('./res/img_resize.jpg', (err, info)=>{
    //             if(err) throw err               
    //             // console.log(`info : ${info}`)               
    //         })
    //   }catch(err){
    //     res.json( `{"result" : "Error "}` )
    //     return
    //   }
    // console.log(req)
      

    const result = require('child_process').spawn('python3',  ['./MNIST_with_Sequential.py'])
    return await result.stdout.on('data', (data) => {
        // console.log(data.toString())
        res.json( `{"result" : "${data }"}` )
    }).on("clsoe", (code) =>{
        console.log("에러")
        res.json( `{"result" : "Error : ${code }"}` )
        
    })

})





app.get("/" , (req, res, next) =>{
        res.render("multer.html")
})



app.listen(app.get('port'), () => {
    console.log(app.get('port') , "번 포트에서 안드로이드서 서버 시작.")
})


