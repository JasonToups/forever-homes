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
    let name = user.pets.animals[i].name;
    let image = user.pets.animals[i].photos[0].large;
    let species = user.pets.animals[i].species;
    let breedPrimary = user.pets.animals[i].breeds.primary;
    let breedSecondary = user.pets.animals[i].breeds.secondary;
    let age = user.pets.animals[i].age;
    let gender = user.pets.animals[i].gender;
    let description = user.pets.animals[i].description;
    let url = user.pets.animals[i].url;
    const template = `
    <div class="post">
      <div class="post-image">
        <img class="pet-picture" src="${image}"/>
      </div>
      <div class = post-content>
        <div class="post-header">
          <div class="post-name">
            <h2>${name}</h2>
          </div>
          <div class="post-favorite">
          </div>
        </div>
        <div class="post-detail">
          <p class="pet-detail">Type: ${species}</p>
          <p class="pet-detail">Breed Primary: ${breedPrimary}</p>
          <p class="pet-detail">Breed Secondary: ${breedSecondary}</p>
          <p class="pet-detail">Age: ${age}</p>
          <p class="pet-detail">Gender: ${gender}</p>
          <p class="pet-detail">Description: ${description}</p>
          <div class="button">
            <a href="${url}"><button class="adopt">Adopt Me</button></a>
          </div>
        </div>
      </div>
    </div>
    `;
    $('#list').append(template);
  }
  startClickListener()
}

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

// TODO BUG - this is only registering one click for the first picture. Event Delegation.

function startClickListener() {
  $(document).ready(function(){
    console.log('listening for clicks')
    $(".post").click(function(event){
      const detail = $(event.target).closest('.post').children('.post-content').children('.post-detail')[0];
      console.log(detail)
      $(detail).toggleClass('show');
      // 'clicked', user.petUrl = $(this.innerHTML);
      // user.petUrl = $('#post img').attr('src');
      // console.log(user.petUrl);
      // getPetObject(user.pets.animals, user.petUrl)
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