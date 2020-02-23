console.log('Feedsearch ready to go!')

let limit = 1;
$('.checked-box').on('change', function(evt) {
        if($(this).siblings(':checked').length >= limit) {
                this.checked = false;
        }
});

let coatlimit = 1;
$('#searchCoats').on('change', '.coats-box', function (evt) {
        if ($(this).siblings(':checked').length >= coatlimit) {
                this.checked = false;
        }
});

let colorLimit=1;
$('#searchColors').on('change', '.colors-box', function(evt) {
        if ($(this).siblings(':checked').length >= colorLimit) {
                this.checked = false;
        }
});

let apiResponse;
let userSearch;
let speciesSearch;
let coatSearch;
let colorSearch;
let genderSearch;

$('.checked-box').on('click', function(evt) {
        if($(this).is(':checked')) {
                let userType= encodeURIComponent($(this).val());
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
        }
        else {
                $('#searchCoats').empty();
                $('#searchColors').empty();
                $('#searchGenders').empty();
                speciesSearch = '';
                coatSearch = '';
                colorSearch = '';
                genderSearch = '';
        }
});

const onSuccess = response => {
        apiResponse = response;
        // console.log(apiResponse)
        populateCoats();
};

function populateCoats() {
        if (apiResponse.type.coats.length !== 0) {
                $('#searchCoats').append('<br/><h3>Select A Single Type Of Coat<h3>')
                for (let i=0; i<apiResponse.type.coats.length; i++) {
                        $('#searchCoats').append(`
                        <input class="coats-box" type="checkbox" name="type2" value="${apiResponse.type.coats[i]}">
                                <label for="type1">${apiResponse.type.coats[i]}</label><br>
                        `)
                }
        }
        populateColors();
};

function populateColors() {
        if (apiResponse.type.colors !== 0) {
                $('#searchColors').append('<br/><h3>Select A Single Color</h3>')
                for (let i=0; i<apiResponse.type.colors.length; i++) {
                        $('#searchColors').append(`
                        <input class="colors-box" type="checkbox" name="type3" value="${apiResponse.type.colors[i]}">
                                <label for="type1">${apiResponse.type.colors[i]}</label><br>
                        `)
                }
        }
        populateGender();
}

function populateGender() {
        $('#searchGenders').append('<br/><h3>Select A Single Gender</h3>')
        for (let i = 0; i < apiResponse.type.genders.length; i++) {
                $('#searchGenders').append(`
                        <input class="gender-box" type="checkbox" name="type4" value="${apiResponse.type.genders[i]}">
                                <label for="type1">${apiResponse.type.genders[i]}</label><br>
                        `)
        }
}

// $('#submitSearch').on('click', function(evt) {
//         event.preventDefault();
//         if ($('.checked-box').siblings(':checked')) {
//                 let species = ($('.checked-box').siblings(':checked').val());
//                 let speciesInter = encodeURIComponent(species);
//                 speciesSearch = `type=${speciesInter}`
//         }
//         if ($('.coats-box').is(':checked')) {
//                 let coat = ($('.coats-box').siblings(':checked').val());
//                 let coatInter = encodeURIComponent(coat);
//                 coatSearch = `&coat=${coatInter}`
//         }
//         if ($('.colors-box').is(':checked')) {
//                 let color = ($('.colors-box').siblings(':checked').val());
//                 let colorInter = encodeURIComponent(color);
//                 colorSearch = `&color=${colorInter}`
//         }
//         if ($('.gender-box').is(':checked')) {
//                 let gender = ($('.gender-box').siblings(':checked').val());
//                 let genderInter = encodeURIComponent(gender);
//                 genderSearch = `&gender=${genderInter}`
//         }
//         pushUserSearch();
// });

// function pushUserSearch() {
//         if (coatSearch === undefined) {
//                 userSearch = `${speciesSearch}${colorSearch}${genderSearch}`;
//         }
//         else {
//                 userSearch = `${speciesSearch}${coatSearch}${colorSearch}${genderSearch}`;
//         }
//         console.log(userSearch);
// }
