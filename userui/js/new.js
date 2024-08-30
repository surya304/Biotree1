$(function() {

    // $('.droppingtracking').on('click', '.hello', function() {


    //     let img = $(this).find('.image1').html();
    //     let id = $(this).find('.first').html();
    //     let name = $(this).find('.naming').html();
    //     img = img.trim()
    //     id = id.trim();
    //     name = name.trim();
    //     console.log(img)
    //     console.log(id);
    //     console.log(name);

    //     //////////////
    //     let listItemToAdda = makelist(img, id, name);
    //     $("#sortable").append(listItemToAdda);







    // });

    // function makelist(add, troop, name) {

    //     let $allData = `<div class="sortableitem u-mt-custom" ><li>
    // <div class="row justify-content-left nolo r0">
    // <div class="col-md-10 col-9 r2" >
    // <div class="c-field has-addon-left">
    // <span class="c-field__addon"><i class="` + add + `" style="font-size:22px;color:#fff"></i></span>
    // <label class="c-field__label u-hidden-visually" for="input9">Disabled Input</label>
    // <input class="c-input ip "  id="input1" type="text" placeholder="Place Your Link Here">
    // </div>
    // </div>
    // <div class="col-md-1 col-1 text-center r4 " style="padding-top:8px;">
    // <div class="pull-right">

    // <i class="fa fa-question" aria-hidden="true" style="font-size:15px;"></i>
    // <span class="naming" style="display:none">` + name + `</span>
    //     </div>
    // </div>
    // <div class="col-md-1 col-1 r3">
    // <div class="pull-right">
    // <span class="naming" style="display:none">` + name + `</span>
    // <span class="findp" style="display:none">` + troop + `</span>
    // <span class="image1" style="display:none">` + add + `</span>
    // <a class="btn deli"> <i class="fa fa-trash-o" aria-hidden="true"></i></a>

    // </div>
    // </div>

    // </li></div>`;

    //     return $allData;

    // }
    // $('.sort').on("click", ".deli", function() {

    //     let bolo = $(this).parentsUntil('.sortableitem').parent().remove();

    // });

    ////////////////////////////////////////////////////////////////////////





    // ###################################send id on create short url link 
    // $(".sendparameter").on("click", function () {
    //     console.log("hello");
    //     // href="create-shorturl"
    //     let value = $('#clientid').val();
    //     console.log(value);
    //     window.location = '/create-shorturl?clientid=' + value;
    // });
    // ###################################send id on create short url link 


    // let fullData = JSON.parse(socialmediaList);
    // nba1
    $('.utmbtn').on("click", function() {
            let website = $('.inputing').val();
            $('.v0').val(website);
        })
        // ////////////////////////////// copy to clipboard button









});