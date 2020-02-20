console.log('adopt some pets!')

/* Used to store global variables for get requests and response objects */
let user = {
  apiKey: "bbbwM5cNHrI9qH2vnqNnzTd828VIPtgBb2o7g2AgNihqnslFm1",
  secret: "59vvv4E0djZGzSKLzFDRTtEbAB5kSwA4GjTvPM22",
}

let requestBody = 'grant_type=client_credentials&client_id=' + user.apiKey + '&client_secret=' + user.secret

/* --------------- API Ajax Requests */
// Post Request to Petfinder API to get Token to use for Get Pets Request.
function getToken() {
  $.ajax({
    url: "https://api.petfinder.com/v2/oauth2/token",
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: requestBody,
    dataType: 'json',
    processData: false,
    success: onSuccessToken,
    error: onError
  });
}

// After receiving a token, it is saved in the User object.
// Then we use the token to request the array of adoption listings
const onSuccessToken = response => {
  user.token = response;
  getPets();
};

// API request for getting pet adoption listings
function getPets(){
  $.ajax({
    url: "https://api.petfinder.com/v2/animals?status=adoptable&type=dog&limit=100",
    method: 'GET',
    headers: {
      'Authorization': user.token.token_type + ' ' + user.token.access_token,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: requestBody,
    dataType: 'json',
    processData: false,
    success: onSuccessPets,
    error: onErrorPets
  });
}
// After receiving the pet adoption listings.
const onSuccessPets = response => {
  user.pets = response;
  filterPhotos();
};

const onErrorPets = response => {
  console.log(response)
  if (response.status === 0){
    console.log('Status 0: Failured to get a new token, but no problem!  Retrieving new token.');
    getToken()
  }
}

// This filters the response, removing any entries that do not have photos.
function filterPhotos () {
  let array = [];
  for (i = 0; i < user.pets.animals.length; i++){
    if (user.pets.animals[i].photos.length !== 0){
      array.push(user.pets.animals[i])
    }
  }
  user.pets.animals = array;
  console.log(user.pets);
  createFeed();
}

function createFeed () {
  for (i = 0; i < user.pets.animals.length; i++){
    let petName = user.pets.animals[i].name;
    let petImage = user.pets.animals[i].photos[0].large;
    const template = `
    <div id="post">
      <div id="post-image">
        <img src="${petImage}"/>
      </div>
      <div id="post-header">
        <div id="post-name">
          <h2>${petName}</h2>
        </div>
        <div id="post-favorite>
        </div>
      </div>
    </div>
    `;
    $('#list').append(template);
  }
  startClickListener()
}

// TODO BUG - this is only registering one click for the first picture.
function startClickListener() {
  $(document).ready(function(){
    console.log('listening for clicks')
    $("#post").click(function(event){
      // 'clicked', user.petUrl = $(this.innerHTML);
      user.petUrl = $('#post img').attr('src');
      console.log(user.petUrl);
      getPetObject(user.pets.animals, user.petUrl)
    });
  });
}

function getPetObject(object, value){
  console.log('looking for pet object');
  for (var i = 0; i < object.length; i++){
    if (object[i].photos[0].large === value){
      user.selectedDog = object[i]
    }
  }
  createDetail()
}

// TODO this is just collecting data at this point. I need to append this data to the DOM, but I first need to find the DOM element that was originally selected. I might just go back and save it on click, then reference it here.
function createDetail(){
  console.log(user.selectedDog);
  console.log(user.selectedDog.species);
  let species = user.selectedDog.species;
  console.log(user.selectedDog.breeds.primary);
  let primary = user.selectedDog.breeds.primary;
  console.log(user.selectedDog.breeds.secondary);
  let secondary = user.selectedDog.breeds.secondary;
  console.log(user.selectedDog.age);
  let age = user.selectedDog.age;
  console.log(user.selectedDog.gender);
  let gender = user.selectedDog.gender;
  console.log(user.selectedDog.description);
  let description = user.selectedDog.description;
  console.log(user.selectedDog.url);
  let url = user.selectedDog.url;
}

/* --------------- Handles unsuccessful Ajax Request */
const onError = (error, errorText, errorCode) => {
  console.log({ error })
};

/* This invokes the function to get the token, which starts the series of API requests */
getToken();