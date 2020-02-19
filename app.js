console.log('adopt some pets!')

let user = {
  apiKey: "bbbwM5cNHrI9qH2vnqNnzTd828VIPtgBb2o7g2AgNihqnslFm1",
  secret: "59vvv4E0djZGzSKLzFDRTtEbAB5kSwA4GjTvPM22",
}

let body = 'grant_type=client_credentials&client_id=' + user.apiKey + '&client_secret=' + user.secret

function getToken() {
  $.ajax({
    url: "https://api.petfinder.com/v2/oauth2/token",
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: body,
    dataType: 'json',
    processData: false,
    success: onSuccessToken,
    error: onError
  });
}

const onSuccessToken = response => {
  user.token = response;
  console.log(user.token);
  getPets();
};

function getPets(){
  $.ajax({
    url: "https://api.petfinder.com/v2/animals?type=dog&type=cat",
    method: 'GET',
    headers: {
      'Authorization': user.token.token_type + ' ' + user.token.access_token,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: body,
    dataType: 'json',
    processData: false,
    success: onSuccessPets,
    error: onError
  });
}

const onSuccessPets = response => {
  user.pets = response;
  console.log(user.pets);
};

/* --- Handles unsuccessful Ajax Request */
const onError = (error, errorText, errorCode) => {
  console.log({ error })
};

getToken();