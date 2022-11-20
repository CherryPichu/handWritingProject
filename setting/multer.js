const express = require('express');
const multer = require('multer')
const path = require('path')
const fs = require('fs');




try {
    fs.readdirSync('res')
}catch(err){
    console.log('uploads 폴더가 없어')
    fs.mkdirSync('res')
}

module.exports = multer({
        storage : multer.diskStorage({
            destination(req, file, cb){
                cb(null, 'res/') // 저장할 폴더 위치
            },
            filename(req, file, cb){
                cb(null, "img.jpg"); // 저장할 파일 명
            },
        }),
        limits : {fileSize : 5 * 1024 * 1024},
    });
    




