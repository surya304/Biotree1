
$(function () {

    function fivedigitalphanumericode() {
        return Math.random().toString(36).substr(2, 5).toUpperCase();
    }
    let InitialData = {
        "socialmedia": [
            {
                "name": "Facebook",
                "username": "asdsad",
                "icon": "fa fa-facebook fa-2x",
                "url": "https://www.facebook.com/VancityReynolds/",
                "id": 1725017660257,
            }
            , {
                "name": "Instagram",
                "username": "asdsad",
                "icon": "fa fa-instagram fa-2x",
                "url": "https://www.instagram.com/vancityreynolds/",
                "id": 1725017660258,

            }

        ],
        "links": [
            {
                "id": 1626959820000,
                "title": "Deadpool",
                "link": "https://www.imdb.com/title/tt6263850/"
            }, {
                "id": 1626959820001,
                "title": "Red Notice",
                "link": "https://www.imdb.com/title/tt15944472/?ref_=vp_vi_tt"

            }

        ],
        "trackingList": [],
        "shortcode": fivedigitalphanumericode(),
        "type": "instabio",
        // "dashimg": "https://mybucket4345.s3.amazonaws.com/uploads/1724979630457.jpeg", logo
        "dashimg": "https://mybucket4345.s3.us-east-2.amazonaws.com/uploads/1725020388275.jpeg",
        "title": "Ryan Reynalds",
        "bio": "Hello I am Ryan Reynalds and I am a Actor",
        "rounded_border": true,
        "bg_color": "instagram",
        "clicks": 0

    };


    let finalData = {
        "socialmedia": [


        ],
        "links": [


        ],
        "trackingList": [],
        "shortcode": "vkdM7",
        "type": "instabio",
        "dashimg": "/userui/img/app-icon6.png",
        "title": "asd",
        "bio": "asdasdasdsa dasdsad ",
        "rounded_border": false,
        "bg_color": "instagram",
        "clicks": 0
    };





    const currentUrl = window.location.href;

 


    const $bioname = $('#bioname');
    const $bio = $('#bio');
    const $bgColor = $('#bg_color');
    const $roundedBorder = $('#rounded_border');
    const $colorButtons = $('.colorbutton');
    const $phoneBodyInternal = $('.phonebody-internal, .phonebody-internal1');
    const $flexName = $('.flex-name, .flex-name1');
    const $flexBio = $('.flex-bio');
    const $buttonArea = $('.button-area, .button-area1');
    const $image = $("#item-img-output");
    const $secondSwitch = $("#secondswitch");
    const $socialMediaContainer = $("#socialMediaContainer");
    const $SociallinkContainer = $("#sortable");

    let $LinkInputContainer = $('#sortable1');
    if (currentUrl.includes('instabio')) {

        setTimeout(() => {
            if (currentUrl.includes('instabio')) {
                const id = currentUrl.split('/').pop(); // Extract the ID from the URL

                // Validate the extracted ID
                if (id && id.length === 24) { // Assuming the ID is a 24-character string
                    $.ajax({
                        url: `/getShortUrlData/${id}`,
                        type: 'GET',
                        dataType: 'json',
                        success: function (data) {
                            if (data) {
                                // bindData(data);
                                console.log(data, "updated data");
                                // finalData= data.data;
                                // bindDatatoView1();
                                bindEditData(data.data);

                            } else {
                                console.error('No data received');
                            }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.error('Error fetching data:', textStatus, errorThrown);
                        }
                    });
                } else {
                    console.error('Invalid ID format');
                }
            }
        }, 500);

    } else {
        InitialBInding();

    }



    function bindEditData(data) {

        const { title, bio, bg_color, rounded_border, dashimg, shortcode, socialmedia, links } = data;

        $bioname.val(title);
        $bio.val(bio);
        bindColors(bg_color);
        $roundedBorder.val(rounded_border);
        $phoneBodyInternal.attr('id', bg_color);
        $image.attr('src', dashimg);
        $('.checkshort').val(shortcode);
        bindColors(bg_color)
finalData._id = data._id;
        finalData.title = title;
        finalData.bio = bio;
        finalData.bg_color = bg_color;
        finalData.rounded_border = rounded_border;
        finalData.dashimg = dashimg;
        finalData.shortcode = shortcode;
            if (data.rounded_border) {
                toggleSwitch('on');
            } else {
                toggleSwitch('off');
            }


       

        socialmedia.forEach(function (data) {
            finalData.socialmedia.push(data);
            bindsocialMediaDatatoHtml(data.id, data);

        });

        links.forEach(function (data) {

            finalData.links.push(data);

            bindLinkData(data.id, data);

            // trigger the click event

        });

        bindDatatoView1();


    }

    function InitialBInding() {

        // This function binds to the view and the Forms 
        bindDataInitial();
        function bindDataInitial() {
            $bioname.val(InitialData.title);
            $bio.val(InitialData.bio);
            $roundedBorder.val(InitialData.rounded_border);
            $phoneBodyInternal.attr('id', InitialData.bg_color);
            $image.attr('src', InitialData.dashimg);
            bindColors(InitialData.bg_color)

            // create a shortcode for the user
            $('.checkshort').val(InitialData.shortcode);


            finalData.title = InitialData.title;
            finalData.bio = InitialData.bio;
            finalData.bg_color = InitialData.bg_color;
            finalData.rounded_border = InitialData.rounded_border;
            finalData.dashimg = InitialData.dashimg;
            finalData.shortcode = InitialData.shortcode;
            bindDatatoView1();

            window.onload = function () {
                if (InitialData.rounded_border) {
                    toggleSwitch('on');
                } else {
                    toggleSwitch('off');
                }

            };
        }




        InitialData.socialmedia.forEach(function (data) {
            finalData.socialmedia.push(data);
            bindsocialMediaDatatoHtml(data.id, data);

        });

        InitialData.links.forEach(function (data) {

            finalData.links.push(data);

            bindLinkData(data.id, data);

            // trigger the click event

        });





    }

    function toggleSwitch(state) {
        const $switch = $('#roundedBorderSwitch');
        console.log($switch);
        if (state === 'on') {
            if (!$switch.is(':checked')) {
                $switch.prop('checked', true);
                finalData.rounded_border = true;

                if (!$buttonArea.hasClass('rounded'))
                    $buttonArea.addClass('rounded').removeClass('rectangle');
            }
        } else if (state === 'off') {
            if ($switch.is(':checked')) {
                $switch.prop('checked', false);
                console.log('Switch is OFF');
                // Add your logic 
                if ($buttonArea.hasClass('rounded'))
                    $buttonArea.removeClass('rounded').addClass('rectangle');
            }
        }
    }

    $('#roundedBorderSwitch').on('click', function () {


        if ($(this).is(':checked')) {
            // Perform action when switch is checked
            console.log('Switch is ON');


            finalData.rounded_border = true;

            if (!$buttonArea.hasClass('rounded'))
                $buttonArea.addClass('rounded').removeClass('rectangle');


            // Add your logic here
        } else {
            // Perform action when switch is unchecked
            console.log('Switch is OFF');
            // Add your logic 
            if ($buttonArea.hasClass('rounded'))
                $buttonArea.removeClass('rounded').addClass('rectangle');


        }
    });


    let linkData = [];

    $('.linkbtn').on('click', function () {


        let uniqueId = Date.now(); // Generate a unique ID based on the current timestamp

        const data = { title: "", link: "" };

        bindLinkData(uniqueId, data);

    });


    function bindLinkData(uniqueId, data) {

        let $data1 = `
        <div class="row sortableitem u-mt-custom" data-id="${uniqueId}">
            <div class="col-md-5 l0">
                <div class="c-field">
                    <label class="c-field__label u-hidden-visually" for="link-${uniqueId}">Label</label>
                    <input class="c-input link resip" id="link-${uniqueId}" type="text" placeholder="place your link here" value=${data.link}>
                </div>
            </div>
            <div class="col-md-5 l1">
                <div class="c-field">
                    <label class="c-field__label u-hidden-visually" for="title-${uniqueId}">Label</label>
                    <input class="c-input title resipdown" id="title-${uniqueId}" type="text" placeholder="place your title here" value=${data.title}>
                </div>
            </div>
            <div class="col-md-1 l2">
                <div class="pull-right">
                    <a class="btn del3" style="padding-bottom: 10px;">
                        <i class="fa fa-trash-o" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
            <div class="col-md-1 l3">
                <i class="fa fa-bars" aria-hidden="true" style="font-size:15px;padding-top:10px;"></i>
            </div>
        </div>`;

        $LinkInputContainer.append($data1);

        // Add event listeners to track input changes
        $(`#link-${uniqueId}`).on('input', function () {
            updateLinkData(uniqueId, 'link', $(this).val());
            console.log(linkData);


            bindDatatoView();

        });

        $(`#title-${uniqueId}`).on('input', function () {
            updateLinkData(uniqueId, 'title', $(this).val());
            console.log(linkData);
            bindDatatoView();



        });

        // Add event listener to handle deletion
        $(`.sortableitem[data-id="${uniqueId}"] .del3`).on('click', function () {
            removeLinkData(uniqueId);
            $(this).closest('.sortableitem').remove();

            bindDatatoView1();

        });
        bindDatatoView1();

    }


    function updateLinkData(id, key, value) {
        let item = finalData.links.find(item => item.id === id);
        if (!item) {
            item = { id: id, title: "", link: "" };
            finalData.links.push(item);
        }
        item[key] = value;
        bindDatatoView1();

    }

    function removeLinkData(id) {
        const linkData = finalData.links.filter(item => item.id !== id);
        finalData.links = linkData;
        bindDatatoView1();

    }



    let socialMediaData = [
        {
            "name": "Facebook",
            "username": "asdsad",
            "icon": "fa fa-facebook fa-2x",
            "url": "",
            "id": "53AD65A4-3828-86E3-8FC8-6559366940E1",
            "socialMediaName": "Facebook",
            "socialMediaIcon": "fa fa-facebook"
        },
        {
            "name": "Instagram",
            "username": "asdsad",
            "icon": "fa fa-instagram fa-2x",
            "url": "",
            "id": "60437C32-6A96-4D77-643C-31A68A960513",
            "socialMediaName": "Instagram",
            "socialMediaIcon": "fa fa-instagram"
        },
        {
            "name": "Twitter",
            "username": "asdsad",
            "icon": "fa fa-twitter fa-2x",
            "url": "",
            "id": "60437C32-6A96-4D77-643C-31A68A960513",
            "socialMediaName": "Twitter",
            "socialMediaIcon": "fa fa-twitter"
        },
    ];

    let socialMediaInputs = [];

    function bindsocialMediaData(element) {
        const uniqueId = Date.now(); // Generate a unique ID based on the current timestamp

        bindsocialMediaDatatoHtml(uniqueId, element);
    }

    function bindsocialMediaDatatoHtml(uniqueId, element) {
        const $socialMedia = $(`
            <div class="sortableitem u-mb-custom u-mt-custom" data-id="${uniqueId}">
                <li>
                    <div class="row justify-content-left nolo r0">
                        <div class="col-md-10 col-9 r2">
                            <div class="c-field has-addon-left hey">
                                <span class="c-field__addon" id="sizing-addon1"><i class="${element.icon}" style="font-size:20px;color:#fff"></i></span>
                                <label class="c-field__label u-hidden-visually" for="link-${uniqueId}">Disabled Input</label>
                                <input class="c-input ip inputborder" id="link-${uniqueId}" type="text" placeholder="place Your link Here" value=${element.url}>
                            </div>
                        </div>
                        <div class="col-md-1 col-1 r3">
                            <div class="pull-right">
                                <span class="naming" style="display:none">${element.name}</span>
                                <span class="findp" style="display:none">${element.id}</span>
                                <span class="image1" style="display:none">${element.icon}</span>
                                <a class="btn del"><i class="fa fa-trash-o" aria-hidden="true"></i></a>
                            </div>
                        </div>
                        <div class="col-md-1 col-1 text-left r4" style="padding-top:5px;">
                            <div class="pull-left">
                                <i class="fa fa-bars" aria-hidden="true" style="font-size:15px;padding-top:5px;"></i>
                            </div>
                        </div>
                    </div>
                </li>
            </div>
        `);

        // Add event listeners to track input changes
        $socialMedia.find(`#link-${uniqueId}`).on('input', function () {
            updateSocialMediaInputs(uniqueId, 'link', $(this).val(), element.name, element.icon);
            bindDatatoView1();

        });

        // Add event listener to handle deletion
        $socialMedia.find('.del').on('click', function () {
            removeSocialMediaInput(uniqueId);
            $(this).closest('.sortableitem').remove();
            bindDatatoView1();

        });

        $SociallinkContainer.append($socialMedia);
    }

    function updateSocialMediaInputs(id, key, value, name, icon) {
        let item = finalData.socialmedia.find(item => item.id === id);
        if (!item) {
            item = { id: id, name: name, icon: icon };
            finalData.socialmedia.push(item);
        }
        item[key] = value;

        console.log(socialMediaInputs, "socialMediaInputs");
        bindDatatoView1();

    }

    function removeSocialMediaInput(id) {
        const socialMediaInputs = finalData.socialmedia.filter(item => item.id !== id);
        finalData.socialmedia = socialMediaInputs;
        bindDatatoView1();




    }

    socialMediaData.forEach(function (data) {
        const $socialMedia = $(`
                <li>
                    <button class="btn btn-primary btn-block" id="${data.id}"><i class="${data.icon}"></i> ${data.socialMediaName}</button>
                </li>
            `);

        $socialMedia.on("click", function () {
            console.log("clicked", data.socialMediaName);
            console.log("clicked", data.socialMediaIcon);
            console.log("clicked", data.id);

            bindsocialMediaData(data);
        });

        $socialMediaContainer.append($socialMedia);
    });


    $bioname.on('keyup', function () {
        finalData.title = $(this).val();


        bindDatatoView();


    });

    $bio.on('keyup', function () {
        finalData.bio = $(this).val();
        bindDatatoView();

    });

    $bgColor.on('change', function () {
        finalData.bg_color = $(this).val();
        bindDatatoView1();

    });

    $roundedBorder.on('change', function () {
        finalData.rounded_border = $(this).val();
        bindDatatoView1();

    });

    $colorButtons.on("click", function () {
        const colorID = $(this).attr('id');

        bindColors(colorID)
    });

    function bindColors(colorID) {
        $phoneBodyInternal.attr('id', colorID);

        finalData.bg_color = colorID;

        if (colorID === "purewhite") {
            toggleClasses(true);
        } else {
            toggleClasses(false);
        }
        bindDatatoView1();
    }


    $secondSwitch.on("click", function () {
        $buttonArea.toggleClass('rounded').removeClass('rectangle');
        checkit();
    });

    function toggleClasses(isWhite) {
        const action = isWhite ? 'addClass' : 'removeClass';
        const oppositeAction = isWhite ? 'removeClass' : 'addClass';
        $flexName[action]('black')[oppositeAction]('white');
        $flexBio[action]('black')[oppositeAction]('white');
        $buttonArea[action]('black')[oppositeAction]('white');
    }

    function checkit() {
        if (!$buttonArea.hasClass('rounded')) {
            $buttonArea.addClass('rectangle');
        }
    }


    function bindDatatoView() {


        setTimeout(() => {

            bindDatatoView1();

        }, 500);

    }


    function bindDatatoView1() {
        $('.button-area1').empty();
        $('.button-area').empty();
        $('.flex-name').empty();
        $('.flex-bio').empty();

        $bgColor.val(finalData.bg_color);


        const NameTag = bindName(finalData.title);
        const BioTag = bindBio(finalData.bio);

        $('.flex-name').append(NameTag);
        $('.flex-bio').append(BioTag);


        finalData.links.forEach(function (data) {
            const $link = appendTitleAndLink(data.link, data.title);
            $('.button-area1').append($link);
        });

        finalData.socialmedia.forEach(function (data) {
            const $socialMedia = appendSocialMediaLink(data.icon, data.link);
            $('.button-area').append($socialMedia);
        });



        console.log(finalData, "finalData");
    }



    function bindBio(params) {
        let data = `<div>` + params + `</div>`
        return data
    }

    function bindName(params) {
        let data = `<div class="title">` + params + `</div>`
        return data
    }


    function appendTitleAndLink(href, title) {

        let $allData = `<a href="` + href + `" >` + title + `</a>`;
        return $allData;

    }

    function appendSocialMediaLink(add, link) {



        let $allData = `<a  href="` + link + `"><i class="` + add + `" class="rounded-circle image1" id="previewicon" ></i></a>`;
        return $allData;

    }

    $(".submitButton").on("click", function () {

        finalData.dashimg = $("#item-img-output").attr('src');

        let errors = [];
        console.log(finalData, "finalData");

        // Validate socialmedia array
        if (finalData.socialmedia.length === 0) {
            errors.push("-> Social media links cannot be empty.");
        } else {
            finalData.socialmedia.forEach((item, index) => {
                if (!isValidURL(item.link)) {
                    errors.push(`-> Invalid URL for social media link at index ${index + 1}`);
                }
            });
        }

        // Validate links array
        if (finalData.links.length === 0) {
            errors.push("-> Links cannot be empty.");
        } else {
            finalData.links.forEach((item, index) => {
                if (!isValidURL(item.link)) {
                    errors.push(`-> Invalid URL for link at index ${index + 1}`);
                }
            });
        }

        // Validate shortcode
        let shortUrlCode = $('.checkshort').val();
        if (!shortUrlCode || !/^[a-zA-Z0-9]{5}$/.test(shortUrlCode)) {
            errors.push("-> Please enter at least 5 shortUrl characters.");
        }

        // Display errors or proceed with form submission
        if (errors.length > 0) {
            swal("Oops...", errors.join("\n"), "error");
        } else {
            finalData.shortcode = shortUrlCode;

            // Proceed with form submission
            $.ajax({
                type: 'POST',
                data: finalData,
                url: '/create-instabio',
                success: function (data) {

                    $("#success-url").text("biotree.one/link/" + shortUrlCode);
                    $("#success-url2").val("biotree.one/link/" + shortUrlCode);


                    $("#success-modal").trigger("click");
                }
            });
        }
    });

    $('.updating').on('click', function(e) {
        finalData.dashimg = $("#item-img-output").attr('src');

        let errors = [];
        console.log(finalData, "finalData");

        // Validate socialmedia array
        if (finalData.socialmedia.length === 0) {
            errors.push("-> Social media links cannot be empty.");
        } else {
            finalData.socialmedia.forEach((item, index) => {
                if (!isValidURL(item.link)) {
                    errors.push(`-> Invalid URL for social media link at index ${index + 1}`);
                }
            });
        }

        // Validate links array
        if (finalData.links.length === 0) {
            errors.push("-> Links cannot be empty.");
        } else {
            finalData.links.forEach((item, index) => {
                if (!isValidURL(item.link)) {
                    errors.push(`-> Invalid URL for link at index ${index + 1}`);
                }
            });
        }

        // Validate shortcode
        let shortUrlCode = $('.checkshort').val();
        if (!shortUrlCode || !/^[a-zA-Z0-9]{5}$/.test(shortUrlCode)) {
            errors.push("-> Please enter at least 5 shortUrl characters.");
        }

        // Display errors or proceed with form submission
        if (errors.length > 0) {
            swal("Oops...", errors.join("\n"), "error");
        } else {
            finalData.shortcode = shortUrlCode;

            // Proceed with form submission
            $.ajax({
                type: 'PUT',
                data: finalData,
                url: '/update-instabio',
                success: function (data) {

                    $("#success-url").text("biotree.one/link/" + shortUrlCode);
                    $("#success-url2").val("biotree.one/link/" + shortUrlCode);


                    $("#success-modal").trigger("click");
                }
            });
        }
    });

    function isValidURL(url) {
        const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(url);
    }

});



