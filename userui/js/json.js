// import Swal from "sweetalert2";

$(function() {
    check1()
    check2()

    $style1 = $('.flex-name')
    $('#alert').hide()
     
    $('.checkshort').on("keyup", function() {
        let value = $(this).val();
        // console.log(value);
        if (value.length = 0) {
            alert("please enter only 5 letters");
        } else {
            console.log("you can update");
            length = true;
        }
        console.log(length);
        $.ajax({
            type: 'GET',
            url: '/check-shorturl/' + value,
            success: function(data) {

                // console.log(data.data);
                let urlavailable = data.data;
                senderror(urlavailable);



            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                let x = JSON.parse(XMLHttpRequest.responseText);
                let urlexists = x.error;
                // console.log(urlexists);

                senderror(urlexists);


                // console.log(textStatus + errorThrown + JSON.stringify(XMLHttpRequest.responseText));
            }
        });
    });

    function senderror(urlexists, urlavailable) {
        console.log(urlexists);
        // console.log(urlavailable);
        if (urlexists === "Short URL exists") {
            console.log("show cross mark");
            $('.wrong').show();
            $('.correct').hide();


        } else {
            console.log("show tick mark");
            $('.correct').show();
            $('.wrong').hide();


        }
    }




    $('.bioname').on('keyup', function(e) {
        // let a1 = $(this).val()

        // if (a1.length < 20) {
        //     check1()

        //     $('#alert').hide()
        //         // name = true;
        // } else {
        //     $('#alert').show()

        //     name = false
        // }
        checkbioname();
        check1();
    })

    function checkbioname() {
        let name = $(".bioname").val().length;
        if (name > 20) {
            $("#name-err").html("Max allowed For Name - 20 characters");
            $("#name-err").show();
            errorname = true;
        } else {
            $("#name-err").hide();

        }

    }
    $('.bio').on('keyup', function(e) {

        checkbio();
        check2();

    })

    function checkbio() {
        let name = $(".bio").val().length;
        if (name > 140) {
            $("#bio-err").html("Max allowed For Bio- 140 characters");
            $("#bio-err").show();
            errorname = true;
        } else {
            $("#bio-err").hide();

        }

    }


    function check1() {
        $('.flex-name').empty()

        let val = $('.bioname').val()

        let a2 = foo(val)
        $('.flex-name').append(a2)
    }

    function check2() {
        $('.flex-bio').empty()
        let val = $('.bio').val()

        let a2 = foo1(val)
        $('.flex-bio').append(a2)
    }
    function foo(params) {
        let data = `<div class="title">` + params + `</div>`
        return data
    }
    function foo1(params) {
        let data = `<div>` + params + `</div>`
        return data
    }

   
    // console.log(name)
    /// ////////////////////////////////////////////////////////////////////

    $style2 = $('.flex-bio')
    $('#alert1').hide()
    let bio = false
     




    console.log(bio)

    $('.creating').on('click', function(e) {
        console.log('creating')

        // ###########################################social validation
        e.preventDefault()
        let socialboolean = false
        let $appendData1 = $('#sortable').children()

        for (let index = 0; index < $appendData1.length; index++) {
            let $dynamic = $appendData1.eq(index)
                // console.log($dynamic.children().html());
            const href = $dynamic.children().find('.ip').val();
            if (href === '') {
                $dynamic.children().find('.disit').remove();

                $dynamic.children().append('<span class="alert-danger disit">please Enter the URL here</span>');
                socialboolean = true;
            } else {
                $dynamic.children().find('.disit').remove();

            }
        }

        // ###########################################social validation complete end
        // ###########################################links validation#############################################################//
        let oyy = $('#sortable1').children()
        let hrefboolean = false;
        let linkboolean = false;

        for (let index = 0; index < oyy.length; index++) {
            let $dynamic = oyy.eq(index)
            const href = $dynamic.children().find('.link').val()
            const title = $dynamic.children().find('.title').val()
                // console.log($dynamic.append('<span class="alert-danger disit">please Enter the URL here</span>'));

            if (href === '') {
                $dynamic.children().eq(0).find('.disit').remove();

                $dynamic.children().eq(0).append('<span class="alert-danger disit">please Enter the URL here</span>')
                hrefboolean = true;
            } else {
                // $dynamic.children().eq(0).remove('.disit');
                $dynamic.children().eq(0).find('.disit').remove()
            }

            if (title === '') {
                $dynamic.children().eq(1).find('.disit').remove();

                $dynamic.children().eq(1).append('<span class="alert-danger disit">please Enter the Title here</span>')
                linkboolean = true;

            } else {
                // $dynamic.children().eq(1).remove('.disit');
                $dynamic.children().eq(1).find('.disit').remove()
            }
        }
        // ////////////////////////////


        // check name and bio length

        let bioname = $('.bioname').val();
        let bio = $('.bio').val();
        let nameandbio = false;
        if (bioname.length < 20 && bio.length < 140) {} else {
            swal("Oops...",
                "Oops! Please check name and bio length",
                "error");
            nameandbio = true;

        }







        let shortlength = false
        let shortUrlCode = $('.checkshort').val()

        if (shortUrlCode.length = 0) {
            swal("Oops...",
                "Please Enter Atleast 5 ShortURL characters",
                "error");
            shortlength = true

        } else {

        }


        let $appendData10 = $('#sortable').children()




        console.log(socialboolean, "socialboolean");
        console.log(hrefboolean, "hrefboolean");
        console.log(linkboolean, "linkboolean");
        console.log(name, "name");
        console.log(bio, "bio");
        console.log(shortlength, "shortlength");



        let childrencount = $("#checktrack").children();

     
        if (childrencount.length > 0) {
            swal("Oops...",
                "Please Fill the Tracking details to continue",
                "error");

            // if (socialbool === true && alertd1 === true && name === true && bio === true && shortlength === true) {
        } else {
            if (socialboolean == false && hrefboolean == false && linkboolean == false && nameandbio == false && shortlength == false) {
                // alert("success");

                validate();
            }
        }
   
    })

    function validate() {
        // alert("true");
        let obj = {
            'socialmedia': [],
            'links': [],
            'trackingList': []

        }
        let personName = $(".bioname").val();
        let personBio = $(".bio").val();
        console.log(personName);
        let shortUrlCode = $('.checkshort').val();
        let clientidval = $('#getclientid').val();
        let getImage = $('#item-img-output').prop('src');
        let tapLogo = $('.e1').prop('src');
        let description = ['app-icon1.png', 'app-icon2.png', 'app-icon3.png', 'app-icon4.png', 'app-icon5.png',
            'app-icon6.png', 'app-icon7.png'
        ]
        let size = description.length
        let x = Math.floor(size * Math.random())
        let imaged = '/userui/img/' + description[x];
        let dashimage = imaged;
        // let personName = $('.flex-name').children().html()
        // let personBio = $('.flex-bio').children().html()



        // let k = new Object();
        // k.img = pic;
        // k.name = personName;
        // k.bio = personBio;
        obj.shortcode = shortUrlCode;
        obj.type = 'instabio';
        obj.client = clientidval;
        obj.img = getImage;
        obj.dashimg = dashimage;

        obj.title = personName;
        obj.bio = personBio;
        // obj.profile.logo = tapLogo;

        let getColor = $('.phonebody-internal').attr('id')

        /// //////////////////////////////////////////////if anything is checked it will be true (if button contains rounded corner then rounded is true)

        let rounded = false

        /// ////////////
        let $a3 = $('.button-area')
        let $a4 = $('.button-area1')

        if ($a3.hasClass('rounded')) {
            // obj.style.rounded_border = "is-active";
            rounded = true
        } else {
            // obj.style.rounded_border = "is";
            rounded = false
        }
        // let k = new Object();
        // k.rectangle_border = rectangle;
        // k.rounded_border = rounded;
        // k.bg_color = getColor;
        obj.rounded_border = rounded
        obj.bg_color = getColor
        obj.clicks = 0;


        /// ////////////////////// social media

        let $appendData54 = $('#sortable').children()

        for (let index = 0; index < $appendData54.length; index++) {
            let $dynamic = $appendData54.eq(index)
            let name = $dynamic.find('.naming').html()
            name = name.trim()
            let icon = $dynamic.find('.image1').html()
            icon = icon.trim()
            let href = $dynamic.children().find('.ip').val()
            href = href.trim()
            let iconnumber = $dynamic.children().find('.findp').html()
            let url = $dynamic.children().find('.url').html()
            url = url.trim();

            iconnumber = iconnumber.trim();

            // console.log(icon, href);

            let k = {}
            k.name = name;
            k.username = href
            k.icon = icon;
            // k.id = iconnumber;
            k.url = url;
            k.name = name;
            let uniqueid = generateGuid();
            k.id = uniqueid;
            k.clicks = 0;

            obj.socialmedia.push(k);

        }

        /// //////////////////////////////////////////////////////// links to json object
        let oyy = $('#sortable1ble1').children()

        for (let index = 0; index < oyy.length; index++) {
            let $dynamic = oyy.eq(index);
            const href = $dynamic.children().find('.link').val();
            const title = $dynamic.children().find('.title').val();
            let k = {};
            k.link = href;
            k.title = title;
            let uniqueid = generateGuid();
            k.id = uniqueid;
            k.clicks = 0;

            obj.links.push(k)
        }

        function generateGuid() {
            let result, i, j;
            result = '';
            for (j = 0; j < 32; j++) {
                if (j == 8 || j == 12 || j == 16 || j == 20)
                    result = result + '-';
                i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
                result = result + i;
            }
            return result;
        }

        let $appendData1 = $('#update-client-list').children()
        for (let index = 0; index < $appendData1.length; index++) {
            let $dynamic = $appendData1.eq(index);
            console.log($dynamic);
            let href = $dynamic.children().find('.ip').val();
            let img = $dynamic.children().find('.img').html();
            let name = $dynamic.children().find('.name').html();

            let k = {};
            // k.id = trackingid;
            k.tracking_code = href;
            k.icon = img;
            k.name = name;
            obj.trackingList.push(k);




        }
        console.log(obj)
        console.log('creating');
        //////////////////////////////////////////
        $.ajax({
                type: 'POST',
                data: obj,
                url: '/create-instabio',
                success: function(data) {


                

                    $("#success-url").text("biotree.one/link/" + shortUrlCode);
                    $("#success-url2").val("biotree.one/link/" + shortUrlCode);


                    $("#success-modal").trigger("click");

                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    alert(textStatus + errorThrown);
                }

            })
            // ////////////////////////////////////////

    }

    $('.updating').on('click', function(e) {
        // ###########################################social validation



        e.preventDefault()
        let socialboolean1 = false
        let $appendData1 = $('#sortable').children()

        for (let index = 0; index < $appendData1.length; index++) {
            let $dynamic = $appendData1.eq(index)
                // console.log($dynamic.children().html());
            const href = $dynamic.children().find('.ip').val();
            if (href === '') {
                $dynamic.children().find('.disit').remove();

                $dynamic.children().append('<span class="alert-danger disit">please Enter the URL here</span>');
                socialboolean1 = true;
            } else {
                $dynamic.children().find('.disit').remove();

            }
        }

        // ###########################################social validation complete end
        // ###########################################links validation#############################################################//
        let oyy = $('#sortable1').children()
        let hrefboolean1 = false;
        let linkboolean1 = false;

        for (let index = 0; index < oyy.length; index++) {
            let $dynamic = oyy.eq(index)
            const href = $dynamic.children().find('.link').val()
            const title = $dynamic.children().find('.title').val()


            if (href === '') {
                $dynamic.children().eq(1).find('.disit').remove();

                $dynamic.children().eq(0).append('<span class="alert-danger disit">please Enter the URL here</span>')
                hrefboolean1 = true;
            } else {
                // $dynamic.children().eq(0).remove('.disit');
                $dynamic.children().eq(0).find('.disit').remove()
            }

            if (title === '') {
                $dynamic.children().eq(1).find('.disit').remove();

                $dynamic.children().eq(1).append('<span class="alert-danger disit">please Enter the Title here</span>')
                linkboolean1 = true;

            } else {
                // $dynamic.children().eq(1).remove('.disit');
                $dynamic.children().eq(1).find('.disit').remove()
            }
        }
        // ////////////////////////////



        // check name and bio length

        let bioname = $('.bioname').val();
        let bio = $('.bio').val();
        let nameandbio1 = false;
        if (bioname.length < 20 && bio.length < 140) {} else {
            swal("Oops...",
                "Oops! Please check name and bio length",
                "error");
            nameandbio1 = true;

        }





        let shortlength = false
        let shortUrlCode = $('.checkshort').val()

        if (shortUrlCode.length = 0) {
            swal("Oops...",
                "Please Enter atleast 5 shortUrl characters",
                "error");
            shortlength = true


        }
        let childrencount = $("#checktrack").children();

        // console.log(childrencount, "childrencount");
        // console.log();
        if (childrencount.length > 0) {
            swal("Oops...",
                "Please Fill the Tracking details to continue",
                "error");
            // if (socialbool === true && alertd1 === true && name === true && bio === true && shortlength === true) {
        } else {
            if (socialboolean1 == false && hrefboolean1 == false && linkboolean1 == false && nameandbio1 == false && shortlength == false) {

                validate1();
            }
        }

    })

    function validate1() {
        let obj = {
            'socialmedia': [],
            'links': [],
            'trackingList': []



        }
        let shortUrlCode = $('.checkshort').val()
        let clientidval = $('#getclientid').val()
        let getImage = $('#item-img-output').prop('src')
        let tapLogo = $('.e1').prop('src')
        let personName = $('.flex-name').children().html()
        let personBio = $('.flex-bio').children().html()
        console.log(getImage)
       
        obj.shortcode = shortUrlCode
        obj.type = 'instabio'
        obj.client = clientidval
        obj.img = getImage
        obj.title = personName
        obj.bio = personBio
            // obj.profile.logo = tapLogo;

        let getColor = $('.phonebody-internal').attr('id')

        /// //////////////////////////////////////////////if anything is checked it will be true (if button contains rounded corner then rounded is true)

        let rounded = false

        /// ////////////
        let $a3 = $('.button-area')
        let $a4 = $('.button-area1')
        if ($a3.hasClass('rounded')) {
            // obj.style.rounded_border = "is-active";
            rounded = true
        } else {
            // obj.style.rounded_border = "is";
            rounded = false
        }
        // let k = new Object();
        // k.rectangle_border = rectangle;
        // k.rounded_border = rounded;
        // k.bg_color = getColor;
        obj.rounded_border = rounded
        obj.bg_color = getColor

        /// ////////////////////// social media
        // FIXME kanye
        let $appendData1111 = $('#sortable').children()
        for (let index = 0; index < $appendData1111.length; index++) {
            let $dynamic = $appendData1111.eq(index)
            let name = $dynamic.find('.naming').html()
            name = name.trim()
            let icon = $dynamic.find('.image1').html()
            icon = icon.trim()
            let href = $dynamic.children().find('.ip').val()
            href = href.trim()
            let iconnumber = $dynamic.children().find('.findp').html()
            let url = $dynamic.children().find('.url').html()
            url = url.trim();

            iconnumber = iconnumber.trim();

            // console.log(icon, href);

            let k = {}
                // k.name = name;
            k.username = href
            k.icon = icon;
            k.id = iconnumber;
            k.url = url;
            k.name = name;


            obj.socialmedia.push(k)
        }
        /// //////////////////////////////////////////////////////// links to json object
        let oyy = $('#sortable1').children()

        for (let index = 0; index < oyy.length; index++) {
            let $dynamic = oyy.eq(index)
            const href = $dynamic.children().find('.link').val()
            const title = $dynamic.children().find('.title').val()
            let k = {}
            k.link = href
            k.title = title
            obj.links.push(k)
        }

        let updateid = $('#gettingid').val()
        console.log(updateid)
        obj.id = updateid;


        let $appendData1 = $('#update-client-list').children()
        for (let index = 0; index < $appendData1.length; index++) {
            let $dynamic = $appendData1.eq(index);
            console.log($dynamic);
            // let trackingid = $dynamic.children().find('.id').html();
            let href = $dynamic.children().find('.ip').val();
            let img = $dynamic.children().find('.img').html();
            let name = $dynamic.children().find('.name').html();

            let k = {}
                // k.id = trackingid;
            k.tracking_code = href;
            k.icon = img;
            k.name = name;


            obj.trackingList.push(k)

        }
        console.log(obj);

        $.ajax({
            type: 'PUT',
            data: obj,
            url: '/update-instabio',
            success: function(data) {
          

                $("#success-url").text("biotree.one/link/" + shortUrlCode);
                $("#success-url2").val("biotree.one/link/" + shortUrlCode);


                $("#success-modal").trigger("click");


            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert(textStatus + errorThrown)
            }

        })
    }
})