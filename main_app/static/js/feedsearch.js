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

/* Appends forms to Search Page */
function populateCoats() {
	if (apiResponse.type.coats.length !== 0) {
		$('#searchCoats').append(`
		<h3>Select A Single Type Of Coat<h3>
		<div class="fields" id="coatBoxes"></div>
		`).addClass('input')
		for (let i=0; i<apiResponse.type.coats.length; i++) {
			$('#coatBoxes').append(`
			<input class="coats-box" type="checkbox" name="type2" value="${apiResponse.type.coats[i]}">
				<label for="type1">${apiResponse.type.coats[i]}</label><br>
			`)
		}
	}
	populateColors();
};

function populateColors() {
	if (apiResponse.type.colors !== 0) {
		$('#searchColors').append(`
		<h3>Select A Single Color</h3>
		<div class="fields" id="colorBoxes"></div>`).addClass('input')
		for (let i=0; i<apiResponse.type.colors.length; i++) {
			$('#colorBoxes').append(`
			<input class="colors-box" type="checkbox" name="type3" value="${apiResponse.type.colors[i]}">
				<label for="type1">${apiResponse.type.colors[i]}</label><br>
			`)
		}
	}
	populateGender();
}

function populateGender() {
	$('#searchGenders').append(`
	<h3>Select A Single Gender</h3>
	<div class="fields" id="genderBoxes"></div>
	`).addClass('input')
	for (let i = 0; i < apiResponse.type.genders.length; i++) {
		$('#genderBoxes').append(`
			<input class="gender-box" type="checkbox" name="type4" value="${apiResponse.type.genders[i]}">
				<label for="type1">${apiResponse.type.genders[i]}</label><br>
			`)
	}
}

// $('#submitSearch').on('click', function(evt) {
// 	window.location.href = 'http://localhost:8000/users/mainfeed';
// });
