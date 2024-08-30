alert("a")
$(document).ready(function() {
    if ($("#email").val().length > 0) {
        // console.log("empty email");
        $("#checkemail").hide();


    }
    if ($("#password").val().length > 0) {
        // console.log("empty password");
        $("#checkpass").hide();



    }
    $("#login").click(function(e) {
        console.log('askdisadasinm');
        e.preventDefault();

        let data = {};
        data.email = $("#email").val();
        data.password = $("#password").val();

        if ($("#email").val().length == 0) {
            // console.log("empty email");
            $("#checkemail").show();


        }
        if ($("#password").val().length == 0) {
            // console.log("empty password");
            $("#checkpass").show();


        }

        if ($("#email").val().length > 0 && $("#password").val().length > 0) {
            $("#checkemail").hide();
            $("#checkemail").hide();


            $.ajax({
                type: 'POST',
                data: data,
                url: '/login',
                success: function(data) {

                    console.log(data, "aaa")

                    // $.ajax({
                    //     type: 'POST',
                    //     url: '/getclientcount',
                    //     success: function(data) {

                    //         let count = data.id;
                    //         if (count == 0) {
                    //             window.location.href = "/steps";
                    //         } else {
                    //             window.location.href = "/dashboard/" + count + "";
                    //         }
                    //     },
                    //     error: function(XMLHttpRequest, textStatus, errorThrown) {
                    //         alert(textStatus + errorThrown);
                    //     }
                    // });



                    window.location.href = "/dashboard";

                    // let error = data.error;
                    // let success = data.success;
                    // if (error != undefined) {
                    //     alert(error + "asidaisd");
                    // } else {
                    //     window.location.href = "/dashboard";
                    // }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    // alert(textStatus + errorThrown);
                    let x = JSON.parse(XMLHttpRequest.responseText);
                    let urlexists = x.error;
                    console.log(urlexists);

                    senderror(urlexists);
                }
            });

            function senderror(urlexists, urlavailable) {
                console.log(urlexists);
                // console.log(urlavailable);
                if (urlexists === "invalid credentials") {
                    // console.log("show cross mark");
                    $('#verifyemail').show();
                    $('#verifypass').show();

                    // $('.correct').hide();


                }
            }



        }

    });

});