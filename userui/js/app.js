   //   function readURL(input) {
   //      if (input.files && input.files[0]) {
   //         let reader = new FileReader();

   //         reader.onload = function (e) {
   //            $('#blah')
   //               .attr('src', e.target.result);
   //         };

   //         reader.readAsDataURL(input.files[0]);
   //      }
   //   }
   // file upload preview
   // $("#upfile1").click(function () {
   //    $("#file1").trigger('click');
   // });
   /////////// to do type
   // let $appendData = $('.bron');
   let $appendData = $('#sortable');
   let $appendData1 = $('.bron1');
   let $appendData2 = $('.bron2');




   // ////////////
   $('.hello').on('click', function() {
   	let melo = $(this).find('.image1').attr("src");
   	let melo1 = $(this).find('.first').html();
   	// console.log(melo1);
   	/////////////////////////////////////////////////////

   	/////////////////////////////////////
   	let listItemToAdda = makeNewListItema(melo, melo1);
   	// let listItemToAdda1 = makeNewListItema1(melo, melo1);
   	/////////////////

   	//////////////////////////////
   	$appendData.append(listItemToAdda);
   	let number = $appendData.children().html();

   	// console.log(number);
   	let dumb1 = createpreview();









   	// $('.button-area').append(listItemToAdda1);



   });
   let createpreview = function() {
   	// console.log(number);
   	// $number.each(function (index, element) {

   	//    let eachProductContent = $(this).find(".image1").clone();
   	//    console.log(eachProductContent);
   	// });
   	$('#button-area').empty();



   	let $appendData = $('#sortable').children();

   	for (let index = 0; index < $appendData.length; index++) {



   		let $dynamic = $appendData.eq(index);

   		const element = $dynamic.find('.image1').attr('src');

   		const element1 = $dynamic.find('.sortableitem').attr('id');

   		let listItemToAdda1 = makeNewListItema1(element, element1);

   		$('#button-area').append(listItemToAdda1);
   		console.log(element);
   		console.log(element1);





   	}



   }




   // $('.hello').on('click', function () {
   //    let melo = $(this).find('.image1').attr("src");
   //    let listItemToAdda1 = makeNewListItema1(melo);
   //    $('.button-area').append(listItemToAdda1);
   // });
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////anirudh
   let makeNewListItema = function(add, troop) {

   	let $allData = `<div><li class="sortableitem" id="` + troop + `">

      <div class="row justify-content-left u-mb-small nolo"><div class="col-md-2 u-mb-small  text-center">

      <img src="` + add + `" class="rounded-circle image1" style="height: 35px;">
      </div><div class="col-md-5 u-mb-small "><label class="c-field__label u-hidden-visually " for="input1">Label</label>
      <input class="c-input ip" id="input1" type="text" placeholder="place your Link here">

      </div>
      <div class="col-md-1 text-center">
       <a class="btn sav" style="border:1px dotted #00B4DB;padding-bottom: 10px;"> <i class="fa fa-save" aria-hidden="true"></i></a>
       <span class="find" style="display:none">` + troop + `</span>
       </div>
       <div class="col-md-1 text-center">
      <a class="btn del" style="border:1px dotted #00B4DB;padding-bottom: 10px;"> <i class="fa fa-trash-o" aria-hidden="true"></i></a>
      <span class="find" style="display:none">` + troop + `</span></div>

      </div></li></div>`;

   	return $allData;

   }
   let makeNewListItema1 = function(add, troop) {

   	let $allData = `<a  class="previewbutton" href="#" id="` + troop + `"><img src="` + add + `" class="rounded-circle image1" style="height: 25px;"></a>`;
   	return $allData;

   }



   let $flex = $('.button-area');
   $appendData.on("click", ".del", function() {
   	let bolo = $(this).parent().parent().remove();
   	let bolo1 = $(this).next().html();

   	let foo = $flex.children();

   	// console.log(bolo1);
   	console.log(foo);

   	for (let index = 0; index < foo.length; index++) {


   		const $element = foo[index].getAttribute('id');
   		const $element1 = foo[index];
   		// console.log($element1);

   		// console.log($element1);
   		if (bolo1 === $element) {

   			$element1.remove();

   		} else {

   		}

   	}
   	createpreview();
   });
   $appendData.on("click", ".sav", function() {
   	let $list = $(this).parent().parent();
   	console.log($list);
   	let bolo1 = $(this).next().html();
   	console.log(bolo1);

   	let $input = $list.find('.ip').val();
   	console.log($input);
   	let foo = $flex.children();

   	for (let index = 0; index < foo.length; index++) {
   		const $element = foo[index].setAttribute('href', $input);
   		// const $element = foo[index].getAttribute('id');
   		const $element1 = foo[index];


   		if (bolo1 === $element) {
   			$element1.setAttribute('href', $input);



   		} else {

   		}

   	}
   	// editTask($list, $input);

   });






   // ////////////////////////// social media

   $('.hellomedia').on('click', function() {
   	let melo = $(this).find('.image1').attr("src");
   	let melo1 = $(this).find('.first1').html();

   	let listItemToAddb = makeNewListItemb(melo, melo1);
   	let listItemToAdda1 = makeNewListItemsocial(melo, melo1);



   	$appedndData1.append(listItemToAddb);

   	$('.button-area2').append(listItemToAdda1);

   });
   let makeNewListItemb = function(add, troop) {

   	let $allData = `<div class="row justify-content-left u-mb-small nolo"><div class="col-md-2 u-mb-small  text-center">
      <img src="` + add + `" class="rounded-circle image1" style="height: 35px;"> <input style="display:none" id="">
      </div><div class="col-md-5 u-mb-small "><label class="c-field__label u-hidden-visually " for="input1">Label</label>
      <input class="c-input ip" id="input1" type="text" placeholder="place your Link here">
      </div>
      <div class="col-md-1 text-center">
       <a class="btn sav" style="border:1px dotted #00B4DB;padding-bottom: 10px;"> <i class="fa fa-save" aria-hidden="true"></i></a>
       <span class="find" style="display:none">` + troop + `</span>
       </div>
       <div class="col-md-1 text-center">
      <a class="btn del1" style="border:1px dotted #00B4DB;padding-bottom: 10px;"> <i class="fa fa-trash-o" aria-hidden="true"></i></a>
      <span class="find" style="display:none">` + troop + `</span></div>
      </div>`;
   	// console.log(add);
   	return $allData;

   }
   let makeNewListItemsocial = function(add, troop) {

   	let $allData = `<a  href="#" id="` + troop + `"><img src="` + add + `" class="rounded-circle image1" style="height: 25px;"><p class="what" style="display:none" id=` + troop + ` >` + troop + `</p></a>`;

   	return $allData;

   }
   // $appedndData1.on("click", ".del1", function () {

   //    $(this).parent().parent().remove();
   // })
   $appendData1.on("keyup", ".ip1", function() {
   	let polo = $(this).val();
   	console.log(polo);

   });

   let $flex2 = $('.button-area2');

   $appendData1.on("click", ".del1", function() {
   	let bolo = $(this).parent().parent().remove();
   	let bolo1 = $(this).next().html();
   	console.log(bolo);
   	console.log(bolo1);


   	let foo = $flex2.children();

   	// console.log(bolo1);
   	console.log(foo);

   	for (let index = 0; index < foo.length; index++) {

   		const $element = foo[index].getAttribute('id');
   		const $element1 = foo[index];
   		// console.log($element1);

   		// console.log($element1);
   		if (bolo1 === $element) {

   			$element1.remove();

   		} else {

   		}

   	}
   });
   $appendData1.on("click", ".sav", function() {
   	let $list = $(this).parent().parent();
   	console.log($list);
   	let bolo1 = $(this).next().html();
   	console.log(bolo1);

   	let $input = $list.find('.ip').val();
   	console.log($input);
   	let foo = $flex2.children();
   	// console.log(foo);
   	for (let index = 0; index < foo.length; index++) {
   		// const $element = foo[index].setAttribute('href', $input);
   		const $element = foo[index].getAttribute('id');
   		const $element1 = foo[index];


   		if (bolo1 === $element) {
   			$element1.setAttribute('href', $input);



   		} else {

   		}

   	}
   	// editTask($list, $input);

   });









   //////////////////////////////////////// add pixels
   $('.helloaddpixels').on('click', function() {
   	let melo = $(this).find('.image1').attr("src");

   	let listItemToAddc = makeNewListItemc(melo);

   	$appendData2.append(listItemToAddc);

   });
   let makeNewListItemc = function(add) {

   	let $allData = ` < div class = "row justify-content-left u-mb-small " > < div class = "col-md-2 u-mb-small  text-center" >
      <
      img src = "` + add + `"
   class = "rounded-circle image1"
   style = "height: 35px;" > < /div><div class="col-md-5 u-mb-small "> <
      label class = "c-field__label u-hidden-visually"
   for = "input1" > Label < /label><input class="c-input ip2" id="input1" type="text" placeholder="place your title here"> </div > < div class = "col-md-1 text-center" >
      <
      a class = "btn del2"
   style = "border:1px dotted#00B4DB;padding-bottom: 10px;" >
      <
      i class = "fa fa-trash-o"
   aria - hidden = "true" > < /i></a > < /div></div > `;
   	// console.log(add);
   	return $allData;

   }


   $appendData2.on("keyup", ".ip2", function() {
   	let polo = $(this).val();
   	console.log(polo);

   });









   ////////////////////////////////////////
   /////////////////////////////////////////// link button
   let $data = $('.steph');
   let iCnt = 0;
   $('.linkbtn').on('click', function() {
   	iCnt = iCnt + 1;
   	let $data1 = ` <div class="row">
      <span class="find" style="display:none">` + iCnt + `</span>
      <div class="col-md-5 u-mb-small">

         <div class="c-field ">
            <label class="c-field__label u-hidden-visually" for="input1">Label</label>
            <input class="c-input link" id="input1" type="text" placeholder="place your link here">
         </div>
      </div>
      <div class="col-md-5 u-mb-small">
         <div class="c-field ">
            <label class="c-field__label u-hidden-visually" for="input1">Label</label>
            <input class="c-input title" id="input1" type="text" placeholder="place your title here">
         </div>
      </div>
      <div class="col-md-1 u-mb-small">
      <a class="btn sav" style="border:1px dotted#00B4DB;padding-bottom: 10px;">
         <i class="fa fa-save" aria-hidden="true"></i>
      </a>
   </div>
      <div class="col-md-1 u-mb-small">
         <a class="btn del3" style="border:1px dotted#00B4DB;padding-bottom: 10px;">
            <i class="fa fa-trash-o" aria-hidden="true"></i>
         </a>
      </div>
   </div>`;

   	$data.append($data1);
   	let listItemToAdda1 = makeNewListItemLink();


   	$('.button-area1').append(listItemToAdda1);


   });
   let iCnt1 = 0;
   let makeNewListItemLink = function() {
   	iCnt1 = iCnt1 + 1;
   	let $allData = `<a href="#" id="` + iCnt1 + `"></a>`;
   	return $allData;

   }
   $flex3 = $('.button-area1');
   $data.on("click", ".del3", function() {
   	// $(this).parent().parent().remove();

   	// let bolo = $(this).parent().parent().remove();
   	let bolo1 = $(this).parent().parent().find('.find').html();
   	console.log(bolo);
   	console.log(bolo1);


   	let foo = $flex3.children();

   	// console.log(bolo1);
   	console.log(foo);

   	for (let index = 0; index < foo.length; index++) {

   		const $element = foo[index].getAttribute('id');
   		const $element1 = foo[index];
   		// console.log($element1);

   		// console.log($element1);
   		if (bolo1 === $element) {

   			$element1.remove();

   		} else {

   		}

   	}

   });
   // $data.on("keyup", ".link", function () {
   //    let polo = $(this).val();
   //    console.log(polo);
   // });
   // $data.on("keyup", ".title", function () {
   //    let polo = $(this).val();
   //    console.log(polo);
   // });
   $data.on("click", ".sav", function() {
   	let $damn = $(this).parent().parent().find('.link').val();
   	let $damn1 = $(this).parent().parent().find('.title').val();
   	// let bolo = $(this).parent().parent().remove();
   	let bolo1 = $(this).parent().parent().find('.find').html();
   	// console.log(bolo);
   	console.log(bolo1);
   	let foo = $flex3.children();

   	// console.log(bolo1);
   	console.log(foo);

   	for (let index = 0; index < foo.length; index++) {

   		const $element = foo[index].getAttribute('id');
   		const $element1 = foo[index];
   		// console.log($element1);

   		// console.log($element1);
   		if (bolo1 === $element) {

   			$element1.append($damn);
   			$element1.setAttribute("href", $damn1);

   		} else {

   		}

   	}




   })




   //////////////////////////////////////////
