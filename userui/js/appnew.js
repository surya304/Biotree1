$(function() {

    // console.log("aksndkasdnsandinbsid");
    // createpreview();
    createpreview1();
   
    // ######################################################### image preview################################################################################
    $("#gallery-photo-add").on("click", function() {
        $('.flex-image').empty();
        // $('.flex-image').append(`<div><img src="" class="roundimage mx-auto d-block" id="item-img-output" /></div>`);

    });
   
    // ************************************************************check url exists************************************************************************************************//
    // $('.correct').hide();
    $('.linkit').on("keyup", function() {
        // $('.wrong').hide();

        if ($(this).val() === "surya") {
            $('.wrong').hide();
            $('.correct').show();

        } else {
            $('.correct').hide();

            $('.wrong').show();

        }




    });
    $('.linkit').on("keydown", function() {
            // $('.wrong').hide();


            if (!$(this).val()) {
                $('.wrong').hide();
            }





        })
        // ************************************************************check url exists************************************************************************************************//

    // 

    // $('#gallery-photo-add').on('change', function () {
    //     imagesPreview(this, 'div.gallery');
    // });

    // /////////////////////////////////////////////
    $('.deleteimage').css("opacity", 0);
    $(".upload").on("mouseover", function() {
        $('.deleteimage').css("opacity", 1);

    });
    $(".upload").on("mouseout", function() {
        $('.deleteimage').css("opacity", 0);


    });
    // ############################################################## image preview end#################################################################################

    //////////////////////////////

    let $appendData = $('#sortable');
    $('.dropping').on('click', '.hello', function() {

        // console.log("hello");
        // let img = $(this).find('.image1').attr("src");
        let name = $(this).data("name");
        let prefixurl = $(this).data("prefixurl");
        let id = $(this).data("id");
        let img = $(this).data("icon");





        // let img = $(this).find('.image1').html();
        // let id = $(this).find('.first').html();
        // let name = $(this).find('.naming').html();
        img = img.trim();
        id = id.trim();
        name = name.trim();
        console.log(img);
        console.log(name);
        console.log(id);
        console.log(prefixurl);


        //////////////
        let listItemToAdda = makelist(img, id, name, prefixurl);
        $appendData.append(listItemToAdda);
        createpreview();
        // /////////////////
        let $putDisable = $(this);
        $putDisable.remove();




    });

    function createpreview() {
        // console.log("haisdisaihdih");
        $('.button-area').empty();
        let $appendData1 = $('#sortable').children();

        for (let index = 0; index < $appendData1.length; index++) {

            let $dynamic = $appendData1.eq(index);

            let element = $dynamic.find('.image1').html();


            // const number = $dynamic.children().children().find('.findp').html();
            const href = $dynamic.children().find('.ip').val();

            let listItemToAdda1 = makeNewListItema1(element, href);
            $('.button-area').append(listItemToAdda1);

        }
    }
    function makeNewListItema1(add, link) {



        let $allData = `<a  href="` + link + `"><i class="` + add + `" class="rounded-circle image1" id="previewicon" ></i></a>`;
        return $allData;

    }

    // function makelist(add, troop, name, url) {
    function makelist(img, id, name, prefixurl) {
        let $allData = `<div class="sortableitem u-mt-custom" ><li>
    
    <div class="row justify-content-left nolo r0">
    <div class="col-md-10 col-9 r2" >
    <div class="c-field has-addon-left">
    <span class="c-field__addon"><i class="` + img + `" style="font-size:22px;color:#fff"></i></span>
    <label class="c-field__label u-hidden-visually" for="input9">Disabled Input</label>
    <input class="c-input ip "  id="input1" type="text" placeholder="Place Your Link Here">
    </div>
    </div>
     <div class="col-md-1 col-1 r3"> 
     <div class="pull-right">
    <span class="url" style="display:none">` + prefixurl + `</span>

    <span class="naming" style="display:none">` + name + `</span>
     <span class="findp" style="display:none">` + id + `</span>
     <span class="image1" style="display:none">` + img + `</span>
    <a class="btn del"> <i class="fa fa-trash-o" aria-hidden="true"></i></a>
    <span class="find" style="display:none">` + img + `</span>
    </div></div>
    <div class="col-md-1 col-1 text-center r4" style="padding-top:5px;">
 <div class="pull-left">

    <i class="fa fa-bars" aria-hidden="true" style="font-size:15px;"></i>
    <span class="naming" style="display:none">` + name + `</span>
        </div>

    </div></li></div>`;

        return $allData;

    }
    $appendData.on("click", ".del", function() {
        //////////////////////////////

        console.log($(this).parent().find(".url").html(), "$(this).parent()")
        let icon = $(this).parent().find(".image1").html();
        let id = $(this).parent().find('.findp').html();
        let name = $(this).parent().find('.naming').html();
        let prefixurl = $(this).parent().find('.url').html();


        icon = icon.trim();
        prefixurl = prefixurl.trim();

        icon = icon.trim();

        id = id.trim();
        name = name.trim();
        console.log(name);
        console.log(id);
        console.log(icon);



        let prin = '';
        prin +=
            '<a class="c-dropdown__item dropdown-item form-check form-check-inline hello"  style="padding:4px 5px 0 5px;"  data-name="' + name + '" data-prefixurl="' + prefixurl + '" data-icon="' + icon + '" data-id="' + id + '">' +
            '        <label class="iconbox1">' +
            '            <i class="' + icon + '" id="dropdownicon" ></i>' +
            '            </label>' +
            '    <span class="naming" style="display:none">' + name + '</span>' +
            '            <label class="form-check-label mx-auto" for="inlineCheckbox1" style="margin-left:8px;font-size:13px;font-weight: 100;position: relative;color:black">' +
            name + '</label>' +
            '            <label style="display: none" class="first ">' + id + '</label>' +
            '            <span style="display:none" class="icon image1">' + icon + '</span>' +
            '            <i class="fa fa-plus-square-o fa-2x pull-right" style="font-size:15px;padding-top:6px"></i>' +
            '        </a>';



        //////////////////////////////////////////////////////



        $('.dropping').append(prin);



        createpreview();
        let bolo = $(this).parentsUntil('.sortableitem').parent().remove();




    });
    $appendData.on("keyup", ".ip", function(e) {

        createpreview();



    });
    ///////////////////////sortable
    $("#sortable")
        .sortable({
            revert: true,
            connectWith: ".sortable",
            stop: function(event, ui) {



                createpreview();

            }


        });

    ///////////////////////////
    // ########################################################################################################################################################################
    //////////////////////////////////////second Links///////////////////////////////////////////////////////////////////////////////////////
    $("#sortable1")
        .sortable({
            revert: true,
            connectWith: ".sortable",
            stop: function(event, ui) {



                createpreview1();

            }


        });
    let $data = $('#sortable1');

    $('.linkbtn').on('click', function() {


        let $data1 = ` <div class="row sortableitem u-mt-custom">

  
   <div class="col-md-5 l0">
      <div class="c-field ">
         <label class="c-field__label u-hidden-visually" for="input1">Label</label>
         <input class="c-input link resip" id="input1" type="text" placeholder="place your link here">
     
      </div>
   </div>
   <div class="col-md-5 l1">
      <div class="c-field ">
         <label class="c-field__label u-hidden-visually" for="input1">Label</label>
         <input class="c-input title resipdown" id="input1" type="text" placeholder="place your title here" >

      </div>
   </div>
  
   <div class="col-md-1 l2">
   <div class="pull-right">
      <a class="btn del3" ;padding-bottom: 10px;">
         <i class="fa fa-trash-o" aria-hidden="true"></i>
      </a>
      </div>
   </div>
   <div class="col-md-1 l3" >

   <i class="fa fa-bars" aria-hidden="true" style="font-size:15px;padding-top:10px;"></i>

   </div>
</div>`;

        $data.append($data1);
        createpreview1();

    });
    ////////////////

    //////////////
    // let createpreview1 = function () {
    function createpreview1() {
        $('.button-area1').empty();

        let oyy = $('#sortable1').children();


        for (let index = 0; index < oyy.length; index++) {

            let $dynamic = oyy.eq(index);

            const href = $dynamic.children().find('.link').val();
            const title = $dynamic.children().find('.title').val();

            let listItemToAdda1 = makeNewListItemLink(href, title);
            $('.button-area1').append(listItemToAdda1);


        }

    }
    $data.on("click", ".del3", function() {
        // let bolo = $(this).parent().parent().remove();
        let bolo = $(this).parentsUntil('.sortableitem').parent().remove();



        createpreview1();

    });

    function makeNewListItemLink(href, title) {

        let $allData = `<a href="` + href + `" >` + title + `</a>`;
        return $allData;

    }




    $data.on("keyup", ".link", function(e) {

        console.log(".link1 link1");

        createpreview1();


    });
    $data.on("keyup", ".title", function(e) {

        console.log(".title title");

        createpreview1();


    });

    $data.on("keydown", ".title", function() {

        // $('.button-area1').children().remove();
        // createpreview1();

    });


    $data.on("keydown", ".link", function(e) {
        // $('.button-area1').children().remove();
        // createpreview1();

    });



    $('.deleteimage').on("click", function() {
        $(".flex-image").empty();
    });


    /////////////////////////////////////////////////////////////////////responsive

    // createpreview();

    ///////////////////////////////////////////////////////////////////

    let short = {
        "data": [{
                "is_del": false,
                "is_active": true,
                "_id": "5c2b5c0c47b7cf95ef1248d1",
                "name": "Facebook",
                "prefixname": "Facebook",
                "prefixurl": "https://www.facebook.com/",
                "icon": "fa fa-facebook fa-2x",
                "v": 0
            },
            {
                "is_del": false,
                "is_active": true,
                "_id": "5c2b5c0c47b7cf95ef1248d2",
                "name": "Instagram",
                "prefixname": "Instagram",
                "prefixurl": "https://www.instagram.com/",
                "icon": "fa fa-instagram fa-2x",
                "v": 0
            },
            {
                "is_del": false,
                "is_active": true,
                "_id": "5c2b5c0c47b7cf95ef1248d3",
                "name": "Pinterest",
                "prefixname": "Pinterest",
                "prefixurl": "https://www.pinterest.com/",
                "icon": "fa fa-pinterest fa-2x",
                "v": 0
            },
            {
                "is_del": false,
                "is_active": true,
                "_id": "5c2b5c0c47b7cf95ef1248d4",
                "name": "Twitter",
                "prefixname": "Twitter",
                "prefixurl": "https://www.twitter.com/",
                "icon": "fa fa-twitter fa-2x",
                "v": 0
            },
            {
                "is_del": false,
                "is_active": true,
                "_id": "5c2b5c0c47b7cf95ef1248d5",
                "name": "Whatsapp",
                "prefixname": "Whatsapp",
                "prefixurl": "https://www.whatsapp.com/",
                "icon": "fa fa-whatsapp fa-2x",
                "v": 0
            },
            {
                "is_del": false,
                "is_active": true,
                "_id": "5c2b5c0c47b7cf95ef1248d6",
                "name": "WeChat",
                "prefixname": "Wechat",
                "prefixurl": "https://www.wechat.com/",
                "icon": "fa fa-wechat fa-2x",
                "v": 0
            }
        ]
    };


    let ramp = short.data;
    let prin = '';

    for (let index = 3; index < ramp.length; index++) {
        const element = ramp[index];
        // console.log(short.data[index].icon);
        // console.log(element.icon);

        prin += ` <a class="c-dropdown__item dropdown-item form-check form-check-inline hello" href="#" style="padding:4px 5px 0 5px;">
        <label class="iconbox1">
            <i class="` + element.icon + `" id="dropdownicon" ></i>
            </label>
    <span class="naming" style="display:none">` + element.prefixname + `</span>
            <label class="form-check-label mx-auto" for="inlineCheckbox1" style="margin-left:8px;font-size:15px;font-weight: 100;position: relative;color:black">` + element.prefixname + `</label>
            <label style="display: none" class="first ">` + element._id + `</label>
            <span style="display:none" class="icon image1">` + element.icon + `</span>
            <i class="fa fa-plus-square-o fa-2x pull-right" style="font-size:20px;padding-top:6px"></i>
        </a>`;
        //////////////////////////////////////////////////////


    }
    // $('.dropping').append(prin);
    //////////////////////////////////////////////
    let defaultPrin = '';
    for (let index = 0; index <= 1; index++) {
        const element = ramp[index];

        defaultPrin += `<div class="sortableitem u-mb-custom u-mt-custom"  ><li>
       

<div class="row justify-content-left nolo r0">
<div class="col-md-10 col-9 r2">
<div class="c-field has-addon-left hey">
<span class="c-field__addon" id="sizing-addon1"><i class="` + element.icon + `" style="font-size:20px;color:#fff"></i></span>
<label class="c-field__label u-hidden-visually" for="input9">Disabled Input</label>
<input class="c-input ip inputborder"  id="input1" type="text" placeholder="place Your link Here">
</div>
</div>
 <div class="col-md-1 col-1 r3"> 
 <div class="pull-right">
 <span class="naming" style="display:none">` + element.prefixname + `</span>
 <span class="findp" style="display:none">` + element._id + `</span>
 <span class="image1" style="display:none">` + element.icon + `</span>
<a class="btn del"> <i class="fa fa-trash-o" aria-hidden="true"></i></a>
</div>
</div>
<div class="col-md-1 col-1 text-left r4" style="padding-top:5px;">
 <div class="pull-left">
<i class="fa fa-bars" aria-hidden="true" style="font-size:15px;padding-top:5px;"></i>
</div>


</div></li></div>


`;
    }
    /////////////////////


    // $('.sort').append(defaultPrin);
    ////////////////////////////////

    //////////////////////////
    $('#someButton').click(function() {
        createpreview();

    });

    $('#someButton').click();


























    //////////////////////////////////////////////////





    $('.hello1').on('click', function() {

        let img = $(this).find('.image1').html();
        let id = $(this).find('.first').html();
        let name = $(this).find('.naming').html();
        console.log(img);
        console.log(id);
        console.log(name);

        //////////////
        let listItemToAdda = makelist(img, id, name);
        $('.sorttracking').append(listItemToAdda);

        // /////////////////





    });


    $('.sorttracking').on("click", ".del", function() {
        let bolo = $(this).parentsUntil('.sortableitem').parent().remove();
    });

    // ###########################################################################################
    // short link

    // $('.updateshort').hide();
    // $('.shortlink').on("click", function () {
    //     let value = $(this).html();
    //     $(this).hide();
    //     $('.updateshort').show();
    //     $('.linkit').val(value);


    // });


    // $('.linkit').on("keyup", function (e) {
    //     e.preventDefault();
    //     if (e.keyCode == 13) {
    //         let value = $(this).val();
    //         $(this).hide();
    //         $('.shortlink').show();
    //         $('.shortlink').html(value);

    //     }

    // })

    // /////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////









});