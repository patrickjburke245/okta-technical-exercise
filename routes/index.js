var express = require('express');
var router = express.Router();
const okta = require('@okta/okta-sdk-nodejs');

//Variables that don't require userId to be declared
const applicationId = process.env.APPLICATION_ID;
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
    'Authorization': 'SSWS 006TkryedDC_lmFjNIsEQJKQ-C2gvkj_IZcJYsTGjx'
  }
};

const listUsersRequest = getRequest;

const deleteRequest = {
  method: 'DELETE',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'SSWS 006TkryedDC_lmFjNIsEQJKQ-C2gvkj_IZcJYsTGjx',
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
    const url = `https://dev-224294.okta.com/api/v1/users/${userId}/roles`
    let t;
    client.http.http(url, getRequest)
      .then(res => res.json())
      .then(text => {
        t = text;
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

    const url = `https://dev-224294.okta.com/api/v1/users`
    client.http.http(url, listUsersRequest)
      .then(res => res.json())
      .then(text => {
        //pugVariable = pitter;
        for (let i = 0; i < 10; i++) {
          resultsData = resultsData + " " + text[i].profile.firstName + " " + text[i].profile.lastName + ", ";
        }
        console.log(4);
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
  const url = `https://dev-224294.okta.com/api/v1/users/${userId}`
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
      'Authorization': 'SSWS 006TkryedDC_lmFjNIsEQJKQ-C2gvkj_IZcJYsTGjx'
    },
    data:
      { 'profile': {
        'firstName': first,
        'lastName': last,
        'email': inputEmail,
        'phone': inputPhone,
        'password': inputPassword
      }
    }
  };
  const url = `https://dev-224294.okta.com/api/v1/users/`
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

let appender = "";
function deleteUserFunc(userId) {
  const url = `https://dev-224294.okta.com/api/v1/users/${userId}?sendEmail=true`
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

function updateUserFunc(userId, password) {
  const url = `https://dev-224294.okta.com/api/v1/users/${userId}`
  const updateRequest = {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'SSWS 006TkryedDC_lmFjNIsEQJKQ-C2gvkj_IZcJYsTGjx'
    },
    data: { "credentials": { "password" : { "value": password } } }
  }
  client.http.http(url, updateRequest)
    .then(res => res.text())
    .then(text => {
      console.log(text);
      //res.render('index', { title: 'The Daily Byte: News and More', user: req.userContext, secret: x, admin: false });
    })
    .catch(err => {
      const e = err;
      console.error(err);
      //appender = " Not!"
    });
}

function upgradeUserFunc(userId) {
  const groupId = "00g147vfemycD1Hpw4x7";
  let url = `https://dev-224294.okta.com/api/v1/groups/${groupId}/users/${userId}`
  const upgradeRequest = {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'SSWS 006TkryedDC_lmFjNIsEQJKQ-C2gvkj_IZcJYsTGjx'
    },
  };
  client.http.http(url, upgradeRequest)
    .then(res => res.text())
    .then(text => {
      console.log(text);
      //res.render('index', { title: 'The Daily Byte: News and More', user: req.userContext, secret: x, admin: false });
    })
    .catch(err => {
      const e = err;
      console.error(err);
      //appender = " Not!"
    });
}

router.post('/', async function(req, res, next) {
  console.log(req.body);
  await listUsers();
  res.sendFile(__dirname, '/dashboard.html');
  //res.sendFile(__dirname + '/dashboard.html');
  console.log('written');
  resultsData = "";
});

router.post("/results", async function(req, res){

  //List all users
  let a = JSON.stringify(req.body);
  console.log(a);
  console.log(req.body.createuserfirstname);
  //console.log(a.contains());
  if (a.includes("listusersbutton")) { // List all users
    //console.log('list');
    await listUsers();
    res.send('List of Users in Patrick Burke\'s Organization:' + resultsData);
  } else if (a.includes('getuserbutton')) { //Get a user
    console.log('get');
    console.log(typeof req.body)
    await getUser(req.body.getuser)
    .then(res => res.text())
    .then(text => {
      console.log(text);
      //res.render('index', { title: 'The Daily Byte: News and More', user: req.userContext, secret: x, admin: false });
    })
    .catch(err => {
      const e = err;
      console.error(err);
      //appender = " Not!"
    });
    console.log(req.body);
    console.log(userData);
    res.send("User: " + userData.profile.firstName + " " + userData.profile.lastName + " | Email: "
      + userData.profile.email + " | Phone number : " + userData.profile.mobilePhone);

  } else if (a.includes('createuserbutton')) { //Create a user
    await createUserFunc(req.body.createuserfirstname, req.body.createuserfirstname,
      req.body.createuseremail, req.body.createuserpassword);

    res.send(create);
    console.log(req.body);
  } else if (a.includes('deleteuserbutton')) {
      // //client.getUser(req.body.deleteuser)
      await deleteUserFunc(req.body.deleteuser);
      res.send('complete');

  //Turning a regular user into an admin.
  } else if (a.includes('upgradeuserbutton')) {
    await upgradeUserFunc(req.body.upgradeuserid);
    res.send(req.body.upgradeuserid, "is now an admin.");
  }

  //Get 1 user

});

module.exports = router;
