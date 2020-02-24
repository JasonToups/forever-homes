console.log('adopt some pets!')

/* Used to store global variables for get requests and response objects */
let user = {
  apiKey: "bbbwM5cNHrI9qH2vnqNnzTd828VIPtgBb2o7g2AgNihqnslFm1",
  secret: "59vvv4E0djZGzSKLzFDRTtEbAB5kSwA4GjTvPM22",
  favoriteDogObject: [],
  favoriteDogId: [],
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

let userSearchString;

const searchSuccess = response => {
  console.log('response', response)
  if (response.length <= 0) {
    userSearchString = 'status=adoptable&type=dog&limit=100';
  }
  else {
    let type = response[0].fields.type;
    let coat = response[0].fields.coat;
    let color = response[0].fields.color;
    let gender = response[0].fields.gender
    if (coat == 'False') {
      searchNoCoat = `status=adoptable&type=${type}&color=${color}&gender=${gender}&limit=100`;
      // console.log('nocoat',searchNoCoat)
      userSearchString = encodeURI(searchNoCoat);
      console.log('nocoat', userSearchString);
    }
    else {
      searchWithCoat = `status=adoptable&type=${type}&coat=${coat}&color=${color}&gender=${gender}&limit=100`;
      // console.log('withcoat',searchWithCoat)
      userSearchString = encodeURI(searchWithCoat);
      console.log('withcoat', userSearchString);
    }
  }
  getPets(userSearchString);
};

// After receiving a token, it is saved in the User object.
// Then we use the token to request the array of adoption listings
const onSuccessToken = response => {
  user.token = response;
  $.ajax({
    method: 'GET',
    url: 'users/searchinfo',
    success: searchSuccess,
    error: err => console.log(err),
  });
};

// API request for getting pet adoption listings
function getPets(searchString){
  $('.post').remove();
  $.ajax({
    url: `https://api.petfinder.com/v2/animals?${searchString}`,
    method: 'GET',
    headers: {
      'Authorization': user.token.token_type + ' ' + user.token.access_token,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    // data: requestBody,
    // dataType: 'json',
    // processData: false,
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
  // console.log(user.pets);
  createFeed(user.pets.animals, "main");
}

// TODO If nothing is returned from the pet search, append a message to the dom stating that nothing was returned and include a button that links back to the search page.
// Pass in a param, to use for both Main Feed & Favorites Feed
function createFeed (array, feedType) {
  $('.post').remove();
  console.log(array);
  if (!array | array.length === 0) {
    console.log('no array')
    let templateSearch = `
    <div class="headline">
      <h2 class="headline-text">Try Again!</h2>
    </div>
    <div class="input center-text">
      <p>Your search returned no pets.</p>
      <p>Update your search filter and try again.</p>
    </div>
    <div class="button">
      <a href="/users/feedsearch" class="submit">Search</a>
    </div>
    `
    let templateFavorites = `
      <div class="headline">
        <h2 class="headline-text">You have no favorites!</h2>
      </div>
      <div class="input center-text">
        <p>Go back to the Pet Feed to find some favorite pets.</p>
      </div>
      <div class="button">
        <a href="/users/mainfeed" class="submit">Pet Feed</a>
      </div>
    `
    if (feedType === "main") {
      $('.container').prepend(templateSearch);
    } else if (feedType ==="favorites"){
      $('.container').prepend(templateFavorites);
    }
    } else {
    for (i = 0; i < array.length; i++){
      let name = array[i].name;
      let image = array[i].photos[0].large;
      let species = array[i].species;
      let breedPrimary = array[i].breeds.primary;
      let breedSecondary = array[i].breeds.secondary;
      let age = array[i].age;
      let gender = array[i].gender;
      let description = array[i].description;
      let url = array[i].url;
      let template = `
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
              ${feedType === "main" ? '<img class="favorite" src="../static/images/heart-favorite-empty.svg"/>': feedType === "favorites" ? '<img class="favorite" src="../static/images/heart-favorite-filled.svg"/>':''}
            </div>
          </div>
          <div class="post-detail">
            ${species ? '<p class="pet-detail">Type: ' + species + '</p>' : ''}
            ${breedPrimary ? '<p class="pet-detail">Breed Primary: ' + breedPrimary + '</p>' : ''}
            ${breedSecondary ? '<p class="pet-detail">Breed Secondary: ' + breedSecondary + '</p>' : ''}
            ${age ? '<p class="pet-detail">Age: ' + age + '</p>' : ''}
            ${gender ? '<p class="pet-detail">Gender: ' + gender + '</p>' : ''}
            ${description ? '<p class="pet-detail">Description: ' + description + '</p>' : ''}
            <div class="button">
              <a href="${url}" target="_blank"><button class="adopt">Adopt Me</button></a>
            </div>
          </div>
        </div>
      </div>
      `;
      $('#list').append(template);
    }
  }
  startClickListener()
}

function startClickListener() {
  $(document).ready(function(){
    console.log('listening for clicks')
    // to show and hide the detail of the post
    $(".post").click(function(event){
      const detail = $(event.target).closest('.post').children('.post-content').children('.post-detail')[0];
      // console.log(detail)
      $(detail).toggleClass('show');
    });
    // to favorite pets in the feed
    // TODO update click function to change the url of the icon
    $(".favorite").click(function(event){
      console.log('You found a favorite pet!');
      const detail = $(event.target).closest('.post').children('.post-image').children('.pet-picture')[0].src;
      // console.log(detail)
      // saving the url to the user object to look up the pet object id from the user.pets
      user.favoriteImage = detail;
      // TODO wrap getFavorite in an if/else statement to update the event.target.src
      // console.log(event.target.src)
      // if getFavorite returns false, make the heart icon empty.
      // if getFavorite returns true, make the heart icon filled.
      if (getFavorite(user.pets.animals, user.favoriteImage)) {
        event.target.src = "../static/images/heart-favorite-filled.svg"
      } else {
        event.target.src = "../static/images/heart-favorite-empty.svg"
      }
    });
    $("#favorites").click(function(event){
      
      showFavorites();
    });
  });
};

// This finds the whole pet object, and saves it to User
function getFavorite(object, value){
  console.log('looking for favorite pet');
  // Checks if the current pet exists in the favorites pet array.
  for (var j = 0; j < user.favoriteDogObject.length; j++){
    if (user.favoriteDogObject[j].photos[0].large === value){
      console.log('that pet is already a favorite')
      user.favoriteDogObject.splice(j, 1)
      console.log('removing favorite')
      // console.log(user.favoriteDogObject)
      return (false)
    }
  }
  // If the current pet does not exist in the favorite pet array, it's added to the array.
  for (var i = 0; i < object.length; i++){
    if (object[i].photos[0].large === value){
      console.log('pet found!')
      user.favoriteDogId.push(object[i].id);
      user.favoriteDogObject.push(object[i]);
      return(true)
    }
  }
  // console.log(user.favoriteDogObject);
}

function showFavorites(){
  document.getElementById("myLinks").style.display = "none"
  createFeed(user.favoriteDogObject, "favorites");
}

/* --------------- Handles unsuccessful Ajax Request */
const onError = (error, errorText, errorCode) => {
  console.log({ error })
};

/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function hamburgerMenu() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function hamburgerResize() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Controlls the hamburger menu for mobile
hamburgerMenu()
hamburgerResize()

/* This invokes the function to get the token, which starts the series of API requests */
getToken();







