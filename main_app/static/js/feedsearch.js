console.log('Feedsearch ready to go!')

// var limit = 3;
// $('input.single-checkbox').on('change', function(evt) {
//    if($(this).siblings(':checked').length >= limit) {
//        this.checked = false;
//    }
// });

var limit = 1;
$('.checked-box').on('change', function(evt) {
        if($(this).siblings(':checked').length >= limit) {
                this.checked = false;
        }
});

let apiResponse;

$('.checked-box').on('click', function(evt) {

        let userType= $(this).val();
        console.log(userType);


        $.ajax({
                url: `https://api.petfinder.com/v2/types/${userType}/`,
                method: 'GET',
                headers: {
                  'Authorization': user.token.token_type + ' ' + user.token.access_token,
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: requestBody,
                dataType: 'json',
                processData: false,
                success: onSuccess, 
                error: error => console.log(error)

              });
});

const onSuccess = response => {
        apiResponse = response;
};
console.log(apiResponse);