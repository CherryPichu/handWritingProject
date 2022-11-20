const readline = require("readline");



/**
 * 각 세션의 고유 색상을 저장해줌. 
 * @param {*} app 
 * 
 */
module.exports = async (app) => {
    
    /**
     * color-hash 모듈이 없을경우 사용자로부터 color-hash 모듈 설치를 허락받아
     * 모듈을 설치한다.
     */
    var ColorHash;
    try {
        ColorHash = require('color-hash').default;;
    }catch(err){ // ColorHash 모듈이 설치가 안되었으면, 모듈 설치
        console.error(err.message)
    
    
        const rl = await readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    
        
        console.log("color-hash 가 없습니다.\n설치하시겠습니까? (y/n)");
        //사용자로부터 입력 받기
        await rl.on("line", (line) => {
            switch(line){
                case "y" :

                case "Y" :
                case "Yes" :
                case "yes" :
                case "YES" :
                case "" :
                    var exec = require('child_process').exec, child;
                    exec("npm i color-hash", (error, stdout, stderr) => {
                        console.log('stdout: ' + stdout);
                        console.log('stderr: ' + stderr);
                        if (error !== null) {
                            console.log('exec error: ' + error);
                        }
                    })
                    break;
                case "n":
                case "N":
                case "no" :
                case "No" :
                case "NO" :
                    console.error(err)
            }
            rl.close();
        });
         

    }
    

    app.use((req, res, next) => {
        if (!req.session.color) {
            const colorHash = new ColorHash();
            req.session.color = colorHash.hex(req.sessionID); // 각 세션의 고유한 색상을 가짐.
        }
        next();
    })
}