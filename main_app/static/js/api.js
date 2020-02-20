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

  //WORKING line: 
  user.token = response;
  
  //Testing
  // user.token = response + "1";
  // console.log('Adding character to token')

  // console.log(user.token);
  getPets();
};

// API request for getting pet adoption listings
function getPets(){
  $.ajax({
    url: "https://api.petfinder.com/v2/animals?status=adoptable&type=dog&type=cat&limit=100",
    method: 'GET',
    headers: {
      'Authorization': user.token.token_type + ' ' + user.token.access_token,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: requestBody,
    dataType: 'json',
    processData: false,
    success: onSuccessPets,
    // error: onError
    error: onErrorPets
    //onErrorPets-  duplicate function, to create a condition to look for the status.  find status of zero( 0 ), then make the token request again.  

  });
}
// After receiving the pet adoption listings.
const onSuccessPets = response => {
  user.pets = response;
  console.log(response);
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
  user.pets.animals = array
  console.log(user.pets)
}
/* --------------- Handles unsuccessful Ajax Request */
const onError = (error, errorText, errorCode) => {
  console.log({ error })
};

/* This invokes the function to get the token, which starts the series of API requests */
getToken();