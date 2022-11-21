<script src="http://code.jquery.com/jquery-1.11.2.min.js"></script>
<script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>

    $(function(){
 
        $('#uploadBtn').on('click', function(){
            uploadFile();
        });
     
    });
     
    const  uploadFile = async() =>{
        
        var form = $('#uploadForm')[0];
        var formData = new FormData(form);
        var result;
        $(function() {
            $("#spinner").css(
                "visibility" , "visible"
            )
        })

        $('#result').css(
            "color", "black"
        )

        await $.ajax({
            url : './multer/upload',
            type : 'POST',
            data : formData,
            timeout: 10000,
            contentType : false,
            processData : false ,       
            success: (res) => {
                result = JSON.parse(res)
                $('#result').text("저정완료 >> "  +result.result + "")
            },
            error : (res) => {
                $('#result').text("has error")

                $(function() {
                    $("#spinner").css(
                        "visibility" , "hidden"
                    )
                })
            }
        });

        $(function() {
            $("#spinner").css(
                "visibility" , "hidden"
            )
        })

    }
