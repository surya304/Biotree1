$(function () {
  



    $('.droppingtracking').on('click', '.hello', function () {

        // console.log("hello");
        // let img = $(this).find('.image1').attr("src");
        let img = $(this).find('.image1').html();
        let id = $(this).find('.first').html();
        let name = $(this).find('.naming').html();
        console.log(img)
        console.log(id);
        console.log(name);

        //////////////
        let listItemToAdda = makelist(img, id, name);
        $("#sortable").append(listItemToAdda);







    });

    function makelist(add, troop, name) {

        let $allData = `<div class="sortableitem u-mt-custom" ><li>

  <div class="row justify-content-left nolo r0">
  <div class="col-md-10 col-9 r2" >
  <div class="c-field has-addon-left">
  <span class="c-field__addon"><i class="` + add + `" style="font-size:22px;color:#fff"></i></span>
  <label class="c-field__label u-hidden-visually" for="input9">Disabled Input</label>
  <input class="c-input ip "  id="input1" type="text" placeholder="Place Your Link Here">
  </div>
  </div>
  <div class="col-md-1 col-1 text-center r4 " style="padding-top:8px;">
  <div class="pull-right">

  <i class="fa fa-question" aria-hidden="true" style="font-size:15px;"></i>
  <span class="naming" style="display:none">` + name + `</span>
    </div>
  </div>
  <div class="col-md-1 col-1 r3">
  <div class="pull-right">
  <span class="naming" style="display:none">` + name + `</span>
  <span class="findp" style="display:none">` + troop + `</span>
  <span class="image1" style="display:none">` + add + `</span>
  <a class="btn deli"> <i class="fa fa-trash-o" aria-hidden="true"></i></a>

  </div>
  </div>

  </li></div>`;

        return $allData;

    }
    $('.sort').on("click", ".deli", function () {

        let bolo = $(this).parentsUntil('.sortableitem').parent().remove();

    });



    // ################################

    $('.inditracking').on('click', '.hello', function () {

        console.log("helloasdasd");
        // let img = $(this).find('.image1').attr("src");
        let img = $(this).find('.image1').html();

        let id = $(this).find('.first').html();
        let name = $(this).find('.naming').html();
        console.log(img)
        console.log(id);
        console.log(name);

        //////////////
        let listItemToAdda = makelist(img, id, name);
        $("#sortable1").append(listItemToAdda);





    });

    function makelist(add, troop, name) {

        let $allData = `<div class="sortableitem u-mt-custom" ><li>

  <div class="row justify-content-left nolo r0">
  <div class="col-md-10 col-9 r2" >
  <div class="c-field has-addon-left">
  <span class="c-field__addon"><i class="` + add + `" style="font-size:22px;color:#fff"></i></span>
  <label class="c-field__label u-hidden-visually" for="input9">Disabled Input</label>
  <input class="c-input ip "  id="input1" type="text" placeholder="Enter Your tracking pixels id">
  </div>
  </div>
  <div class="col-md-1 col-1 text-center r4 " style="padding-top:8px;">
  <div class="pull-right">

  <i class="fa fa-question" aria-hidden="true" style="font-size:15px;"></i>
  <span class="naming" style="display:none">` + name + `</span>
    </div>
  </div>
  <div class="col-md-1 col-1 r3">
  <div class="pull-right">
  <span class="naming" style="display:none">` + name + `</span>

  <span class="findp" style="display:none">` + troop + `</span>
  <span class="image1" style="display:none">` + add + `</span>
  <a class="btn deli"> <i class="fa fa-trash-o" aria-hidden="true"></i></a>

  </div>
  </div>

  </li></div>`;

        return $allData;

    }
    $('.sort').on("click", ".deli", function () {

        let bolo = $(this).parentsUntil('.sortableitem').parent().remove();

    });




    // ######################################################################
    // ###################################################################### copy short url

    $('.copyshort').on("click", function () {
        console.log("hello");
        // let value = $()

    });

    // let thaturl = "1?utm_source=2&utm_medium=3&utm_campaign=4&utm_term=5&utm_content=6";
    // $.urlParam = function (name) {
    //     let results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(thaturl);
    //     if (results == null) {
    //         return null;
    //     }
    //     return decodeURI(results[1]) || 0;
    // }
    // let website = thaturl.split("?");
    // console.log(website[0]);
    // let n1 = $.urlParam('utm_source');
    // // console.log(none);
    // let n2 = $.urlParam('utm_medium');
    // let n3 = $.urlParam('utm_campaign');
    // let n4 = $.urlParam('utm_term');
    // let n5$.urlParam('utm_content');







    // ######################################################################


    // $('.hoverdynamically').on("mouseover", ".hov", function () {
    //     if ($(window).width() > 700) {
    //         $('.calender').hide();
    //         $('.centerthis').show();

    //     }

    // });

    // $('.hoverdynamically').on("mouseleave", ".hov", function () {
    //     if ($(window).width() > 700) {
    //         $('.centerthis').hide();
    //         $('.calender').show();
    //     }

    // });

    // $('.hov').on("mouseover", function () {
    //     if ($(window).width() > 700) {
    //         $('.calender').hide();
    //         $('.centerthis').show();

    //     }

    // });

    // $('.hov').on("mouseleave", function () {
    //     if ($(window).width() > 700) {

    //         $('.centerthis').hide();
    //         $('.calender').show();

    //     }

    // });


    //
    // $(".slideit").click(function () {
    //   $(".paneli").slideToggle("fast");
    // });

    // ************************************************** short url dynamic*****************************************************************************************//
    // $('.inputing').on("keyup", function () {
    //     let f1 = $(this).val();
    //     console.log(f1);
    //     $('.v0').val(f1);
    // });
    $('.shorturl').on("click", function () {

        $(this).val("");
        let h1 = $('.inputing').val();

        if (h1 === "") {
            alert("please enter the Url");
        } else {
            gowithit();
        }

        function gowithit() {
            let obj = {

            }
            obj.input = h1;
            // $.ajax({
            //     type: 'POST',
            //     data: obj,
            //     url: '/dashboard-input-url',
            //     success: function (data) {

            //         alert(JSON.stringify(data));

            //     },
            //     error: function (XMLHttpRequest, textStatus, errorThrown) {
            //         alert(textStatus + errorThrown);
            //     }
            // });
            console.log(obj);
        }

    })


    // *******************************************************  short url dynamic*****************************************************************************************************//


    // ************************************************************check url exists************************************************************************************************//
    // $('.correct').hide();
    // $('.checkshort').on("keyup", function () {

    //     if ($(this).val() === "surya") {
    //         $('.wrong').hide();
    //         $('.correct').show();

    //     } else {
    //         $('.correct').hide();

    //         $('.wrong').show();

    //     }




    // })

    // ************************************************************check url exists************************************************************************************************//


    // ************************************************************new project client************************************************************************************************//
    let obj = {
        "client": {},
        "tracking": []
    };

    // $('.newproject1').on("click", function () {
    //
    //     let valuething = $(this).parent().parentsUntil('.c-modal__body').find('.q0').val();
    //     // console.log(valuething);
    //     // let clientEmail = $(this).parent().parentsUntil('.c-modal__body').find('.q1').val();
    //     obj.client.name = valuething;
    //     // obj.client.email = clientEmail;
    //     if (valuething === "") {
    //         let $p1 = $(this).parent().parentsUntil('.c-modal__body').find('.d1');
    //         let $p2 = $(this).parent().parentsUntil('.c-modal__body').find('.d2');
    //         $p1.append('<span class="alert-danger disit">please Enter the URL here</span>');
    //         $p2.append('<span class="alert-danger disit">please Enter the URL here</span>');
    //     } else {
    //         let $p1 = $(this).parent().parentsUntil('.c-modal__body').find('.d1');
    //         let $p2 = $(this).parent().parentsUntil('.c-modal__body').find('.d2');
    //         $p1.find('.disit').remove();
    //         $p2.find('.disit').remove();
    //         sendobj();
    //
    //
    //
    //     }
    //     // ////////////////////////////////////////
    //     function sendobj() {
    //
    //
    //         let $appendData1 = $("#sortable").children();
    //
    //         for (let index = 0; index < $appendData1.length; index++) {
    //
    //             let $dynamic = $appendData1.eq(index);
    //
    //             let icon = $dynamic.find('.image1').html();
    //             const href = $dynamic.children().find('.ip').val();
    //             const iconnumber = $dynamic.children().find('.findp').html();
    //
    //             console.log(icon);
    //             console.log(href);
    //             console.log(iconnumber);
    //
    //             let k = {};
    //             k.name = href;
    //             k.icon = icon;
    //             k.id = iconnumber;
    //             obj.tracking.push(k);
    //         }
    //         console.log(obj);
    //         // $.ajax({
    //         //     type: 'POST',
    //         //     data: obj,
    //         //     url: '/create-client',
    //         //     success: function (data) {
    //
    //         //         alert(JSON.stringify(data));
    //
    //         //     },
    //         //     error: function (XMLHttpRequest, textStatus, errorThrown) {
    //         //         alert(textStatus + errorThrown);
    //         //     }
    //         // });
    //     }
    // });

    // ************************************************************new client project************************************************************************************************//
    // ************************************************************edit short url in links************************************************************************************************//

    // $('.saveshort').on("click", function () {
    //     let a1 = $(this).parentsUntil('.e1').find('.fullip').val();
    //     let a2 = $(this).parentsUntil('.e3').find('.checkshort').val();
    //     if (a1 === '' && a2 === "") {
    //         alert('please enter something');
    //     } else {
    //         sendit();
    //     }

    //     function sendit() {
    //         let obj = {

    //         };

    //         obj.input = a1;
    //         obj.short = a2;
    //         console.log(obj);

    //         $.ajax({
    //             type: 'POST',
    //             data: obj,
    //             url: '/dashboard-individual-url-edit',
    //             success: function (data) {

    //                 alert(JSON.stringify(data));

    //             },
    //             error: function (XMLHttpRequest, textStatus, errorThrown) {
    //                 alert(textStatus + errorThrown);
    //             }
    //         });
    //     }

    // });



    $('.checkshort').on('keydown', function () {
        let p1 = $(this).val();
        console.log(p1);
        $.ajax({
            type: 'GET',
            url: '/short-url-onEnter/' + p1,
            success: function (data) {

                alert(JSON.stringify(data));

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(textStatus + errorThrown);
            }
        });
    })
    // ************************************************************edit short url in links************************************************************************************************//

    // ************************************************************tracking pixels in links************************************************************************************************//
    let obj1 = {
        "tracking": []
    }

    $('.getdata').on("click", function () {

        let $appendData1 = $("#sortable1").children();

        for (let index = 0; index < $appendData1.length; index++) {

            let $dynamic = $appendData1.eq(index);

            let icon = $dynamic.find('.image1').html();
            const href = $dynamic.children().find('.ip').val();
            const iconnumber = $dynamic.children().find('.findp').html();

            console.log(icon);
            console.log(href);
            console.log(iconnumber);

            let k = {};
            k.name = href;
            k.icon = icon;
            k.id = iconnumber;
            obj1.tracking.push(k);


        }
        console.log(obj1);
        // $.ajax({
        //   type: 'POST',
        //   data: obj1,
        //   url: '/dashboard-individual-url-tracking',
        //   success: function (data) {

        //     alert(JSON.stringify(data));

        //   },
        //   error: function (XMLHttpRequest, textStatus, errorThrown) {
        //     alert(textStatus + errorThrown);
        //   }
        // });

    });
    // ############################################################## utm

    $('.ifull').on('click', '.getinput', function () {
        let oyy = $(this).parentsUntil('.i1').find('.a1');
        console.log(oyy);
        let oyy1 = $(this).parentsUntil('.i1').find('.a2').html();
        console.log(oyy1);
        let $a1 = $('.saveshort').parentsUntil('.e1').find('.fullip');
        let $a2 = $('.saveshort').parentsUntil('.e3').find('.checkshort');
        console.log($a1);
        console.log($a2);
        $a1.val(oyy1);
        $a2.val(oyy);

        let thaturl = "1?utm_source=2&utm_medium=3&utm_campaign=4&utm_term=5&utm_content=6";
        $.urlParam = function (name) {
            let results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(thaturl);
            if (results == null) {
                return null;
            }
            return decodeURI(results[1]) || 0;
        }
        let website = thaturl.split("?");
        console.log(website[0]);
        let n1 = $.urlParam('utm_source');
        console.log(n1);
        let n2 = $.urlParam('utm_medium');
        console.log(n2);
        let n3 = $.urlParam('utm_campaign');
        console.log(n3);
        let n4 = $.urlParam('utm_term');
        console.log(n4);
        let n5 = $.urlParam('utm_content');
        console.log(n5);


    });




    // $('.getutm').on('click', function () {
    //     let z1 = $(this).parentsUntil('.p0').find('.v0').val();
    //     let z2 = $(this).parentsUntil('.p1').find('.v1').val();
    //     let z3 = $(this).parentsUntil('.p2').find('.v2').val();
    //     let z4 = $(this).parentsUntil('.p3').find('.v3').val();
    //     let z5 = $(this).parentsUntil('.p4').find('.v4').val();
    //     let z6 = $(this).parentsUntil('.p5').find('.v5').val();
    //
    //     let obj = {
    //
    //     };
    //     let newobj = {
    //
    //     };
    //
    //     if (z1 === "") {
    //         alert("please enter the url");
    //     } else {
    //         all();
    //     }
    //
    //     function all() {
    //
    //         if (z2 === "") {
    //         } else {
    //             obj.utm_source = z2;
    //         }
    //         if (z3 === "") {
    //         } else {
    //             obj.utm_medium = z3;
    //         }
    //         if (z4 === "") {
    //         } else {
    //             obj.utm_campaign = z4;
    //         }
    //         if (z5 === "") {
    //         } else {
    //             obj.utm_term = z5;
    //         }
    //         if (z6 === "") {
    //         } else {
    //             obj.utm_content = z6;
    //         }
    //
    //         let str = jQuery.param(obj);
    //         let fullurl = z1 + '?' + str;
    //         console.log(fullurl);
    //         $('.inputing').val("");
    //         newobj.fullutmurl = fullurl;
    //
    //         $.ajax({
    //             type: 'POST',
    //             data: newobj,
    //             url: '/dashboard-input-url',
    //             success: function (data) {
    //
    //                 alert(JSON.stringify(data));
    //
    //             },
    //             error: function (XMLHttpRequest, textStatus, errorThrown) {
    //                 alert(textStatus + errorThrown);
    //             }
    //         });
    //     }
    //
    //
    // });


    // ############################################################## utm



});