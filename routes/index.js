var express = require('express');
var router = express.Router();
const okta = require('@okta/okta-sdk-nodejs');
const urltemplate = require('url-template');
require('dotenv').config()

//Variables that don't require userId to be declared
const token = process.env.API_TOKEN;
const orgUrl = process.env.OKTA_CLIENT_ORGURL;

//Creating client
const client = new okta.Client({
  orgUrl: `${orgUrl}`,
  token: `${token}`
});

//Setting up request methods and headers
const getRequest = {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'SSWS ' + token
  }
};

const listUsersRequest = getRequest;

const deleteRequest = {
  method: 'DELETE',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'SSWS ' + token,
    'Prefer': 'respond-async'
  }
};

/* GET home page. */
router.get('/', function(req, res, next) {

  let x = 'initial';
  if (!req.userContext) {
    res.render('login', { title: 'The Daily Byte: News and More'});
  } else {
    const userId = req.userContext.userinfo.sub
    const orgUrlLocal = orgUrl
    const url = orgUrl + `api/v1/users/${userId}/roles`
    client.http.http(url, getRequest)
      .then(res => res.json())
      .then(text => {
        let t = text;
        if(t[0] === undefined) {
          x = "error";
          res.render('index', { title: 'The Daily Byte: News and More', user: req.userContext, secret: x, admin: false });
        } else if(t[0].type == "SUPER_ADMIN") {
          x = "admin";
          res.render('admins', { title: 'The Daily Byte: News and More', user: req.userContext, secret: x, admin: true });
        } else {
          x = "error";
          res.render('index', { title: 'The Daily Byte: News and More', user: req.userContext, secret: x, admin: false });
        }
      })
      .catch(err => {
        const e = err;
        console.error(err);
      });
  }
});

let resultsData = "";
function listUsers(){
    const url = orgUrl + 'api/v1/users'
    console.log(url);
    client.http.http(url, listUsersRequest)
      .then(res => res.json())
      .then(text => {
        //pugVariable = pitter;
        for (let i = 0; i < 100; i++) {
          resultsData = resultsData + `User ${i + 1} Name: ` + text[i].profile.firstName + " " +
          text[i].profile.lastName + ", ID: " + text[i].id + "; ";
        }
        //res.render('index', { title: 'The Daily Byte: News and More', user: req.userContext, secret: x, admin: false });
      })
      .catch(err => {
        const e = err;
        console.error(err);
      });
    //res.render('results');
};

let groupsData = "";
function listGroups(){
    const url = orgUrl + 'api/v1/groups?limit=200'
    console.log(url);
    client.http.http(url, listUsersRequest)
      .then(res => res.json())
      .then(text => {
        //pugVariable = pitter;
        for (let i = 0; i < 100; i++) {
          groupsData = groupsData + `Group ${i + 1} Name: ` + text[i].profile.name +
          ", ID: " + text[i].id + "; ";
        }
        console.log(text);
        //res.render('index', { title: 'The Daily Byte: News and More', user: req.userContext, secret: x, admin: false });
      })
      .catch(err => {
        const e = err;
        console.error(err);
      });
    //res.render('results');
};

let userData;
function getUser(userId) {
  const url = orgUrl + `api/v1/users/${userId}`
  client.http.http(url, getRequest)
    .then(res => res.json())
    .then(text => {
      userData = text;
    })
    .catch(err => {
      const e = err;
      console.error(err);
    });
}

let create = "User creation succeeded!"
function createUserFunc(first, last, inputEmail, inputPhone, inputPassword) {
  let request = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'SSWS ' + token
    },
    body: JSON.stringify({ 'profile': {
        'firstName': first,
        'lastName': last,
        'email': inputEmail,
        'login': inputEmail,
        'mobilePhone': inputPhone,
        'password': inputPassword
      }
    })
  };
  const url = orgUrl + `api/v1/users/`
  client.http.http(url, request)
    .then(res => res.text())
    .then(text => {
      console.log(text);
    })
    .catch(err => {
      const e = err;
      console.error(err);
      appender = " Not!"
    });
}

function updateUserFunc(first, last, inputEmail, inputPhone, inputPassword) {
  let request = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'SSWS ' + token
    },
    body: JSON.stringify({ 'profile': {
        'firstName': first,
        'lastName': last,
        'email': inputEmail,
        'login': inputEmail,
        'mobilePhone': inputPhone,
        'password': inputPassword
      }
    })
  };
  const url = orgUrl + `api/v1/users/me`
  client.http.http(url, request)
    .then(res => res.text())
    .then(text => {
      console.log(text);
    })
    .catch(err => {
      const e = err;
      console.error(err);
      appender = " Not!"
      //console.log(create + appender);
    });
}

let appender = "";
function deleteUserFunc(userId) {
  const url = orgUrl + `api/v1/users/${userId}?sendEmail=true`
  let request = deleteRequest;
  console.log('delete called');
  client.http.http(url, request)
    .then(res => res.text())
    .then(text => {
      console.log(text);
      //res.render('index', { title: 'The Daily Byte: News and More', user: req.userContext, secret: x, admin: false });
    })
    .catch(err => {
      const e = err;
      console.error(err);
      appender = " Not!"
    });
}

function upgradeUserFunc(userId, groupId) {
  let url = orgUrl + `api/v1/groups/${groupId}/users/${userId}`
  const upgradeRequest = {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'SSWS ' + process.env.API_TOKEN
    },
  };
  client.http.http(url, upgradeRequest)
    .then(res => res.text())
    .then(text => {
      console.log(text);
    })
    .catch(err => {
      console.error(err);
    });
}

router.post('/', async function(req, res, next) {
  console.log(req.body);
  await listUsers();
  res.sendFile(__dirname, '/dashboard.html');
  console.log('written');
  resultsData = "";
});

router.post("/results", async function(req, res){
  //List all users
  let a = JSON.stringify(req.body);
  console.log(a);
  console.log(req.body.createuserfirstname);
  if (a.includes("listusersbutton")) { // List all users
    await listUsers();
    res.send('Copy a user\'s ID to clipboard to manage this user in the admin dashboard...  ' +
    '  <strong>List of Users in Organization (REFRESH ONCE):</strong>' + resultsData);
  } else if (a.includes('getuserbutton')) { //Get a user
    console.log('get');
    console.log(typeof req.body)
    await getUser(req.body.getuser)
    .then(res => res.text())
    .then(text => {
      console.log(text);
    })
    .catch(err => {
      const e = err;
      console.error(err);
    });
    console.log(req.body);
    console.log(userData);
    res.send("User: " + userData.profile.firstName + " " + userData.profile.lastName + " | Email: "
      + userData.profile.email + " | Phone number : " + userData.profile.mobilePhone);

  } else if (a.includes("listgroupsbutton")) { // List all users
    //console.log('list');
    await listGroups();
    res.send('Copy a group\'s ID to clipboard to manage this user in the admin dashboard...  ' +
    '  <strong>List of Groups in Organization (REFRESH ONCE):</strong>' + groupsData);
  } else if (a.includes('createuserbutton')) { //Create a user
    await createUserFunc(req.body.createuserfirstname, req.body.createuserlastname,
      req.body.createuseremail, req.body.createuserpassword);

    res.send(create);
    console.log(req.body);
  } else if (a.includes('deleteuserbutton')) {
      // //client.getUser(req.body.deleteuser)
      await deleteUserFunc(req.body.deleteuser);
      res.send('complete');

  //Turning a regular user into an admin.
  } else if (a.includes('upgradeuserbutton')) {
    await upgradeUserFunc(req.body.upgradeuserid, req.body.upgradegroupid);
    res.send('Success?');
  } else if (a.includes('updateuserbutton')) {
    console.log(req.body);
    await updateUserFunc(req.body.updateuserfirstname, req.body.updateuserlastnametname,
      req.body.updateuseremail, req.body.updateuserpassword);
    res.send('complete');
  }
});

module.exports = router;
