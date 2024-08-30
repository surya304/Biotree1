// Start upload preview image
$(".gambar").attr("src", "https://user.gadjian.com/static/images/personnel_boy.png");
let $uploadCrop,
    tempFilename,
    rawImg,
    imageId;

function readFile(input) {
    if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = function(e) {
            $('.upload-demo').addClass('ready');
            $('#cropImagePop').modal('show');
            rawImg = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    } else {
        swal("Sorry - you're browser doesn't support the FileReader API");
    }
}

$uploadCrop = $('#upload-demo').croppie({
    viewport: {
        width: 130,
        height: 130,
    },
    enforceBoundary: false,
    enableExif: true
});
$('#cropImagePop').on('shown.bs.modal', function() {
    $uploadCrop.croppie('bind', {
        url: rawImg
    }).then(function() {
        console.log('jQuery bind complete');
    });
});

$('.item-img').on('change', function() {
    imageId = $(this).data('id');
    tempFilename = $(this).val();
    $('#cancelCropBtn').data('id', imageId);
    readFile(this);
});

$('#cropImageBtn').on('click', function(ev) {
    $uploadCrop.croppie('result', {
        type: 'base64',
        format: 'jpeg',
        size: {
            width: 150,
            height: 200,
        }
    }).then(function(base64Image) {
        uploadImageToS3(base64Image);
        $('#cropImagePop').modal('hide');
    });
});

function uploadImageToS3(base64Image) {
    $.ajax({
        url: '/upload-to-s3',
        type: 'POST',
        data: JSON.stringify({ image: base64Image }),
        contentType: 'application/json',
        success: function(response) {
            console.log('Image uploaded successfully:', response);
            $('.flex-image').empty();
            $('.flex-image').append(`<div><img src="${response.imageUrl}" class="roundimage mx-auto d-block" id="item-img-output" /></div>`);
            
            // Handle success (e.g., display the uploaded image URL)
            console.log('Image uploaded successfully:', response.imageUrl);
        },
        error: function(error) {
            console.error('Error uploading image:', error);
        }
    });
}
// End upload preview image