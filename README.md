# okta-technical-exercise
An application with an Okta-hosted login page and admin portal that leverages the Okta API to manage users in an organization.

## 1. Getting Started

To install this application, run the following commands you'd like to store the project in (meant for Windows):
```
git clone https://github.com/patrickjburke245/okta-technical-exercise.git
cd okta-technical-exercise
npm install
```
This will create a copy of the project locally.
### Create a Free Okta Developer Account

If you don't have one, [create an Okta Developer account](https://developer.okta.com/signup/). After you've completed the setup process and activated your account, log in to your account.

Create a new OIDC app by changing from Developer Console to Classic UI. Navigate to **Applications** > **Add Application** > **Create New App** > select **Web** and **OpenID Connect**, and click **Next**. Fill in the following values:

* Name: `Node.js Login`
* Login redirect URI: `http://localhost:3000/callback`
* Logout redirect URI: `http://localhost:3000`

Click **Done** to create your app.

Create a file named only `.env` in your root directory and copy the client ID and secret into it. You can find the value for `<YOUR_ISSUER>` by navigating to **Security** > **API** > **Authorization Servers**.
Values for `OIDC_CLIENT_ID` and `OIDC_CLIENT_SECRET` can be found by navigating to **Applications** > **Node.js Login**.
**SESSION_SECRET** is a randomized string of characters.

```
OIDC_ISSUER=<YOUR_ISSUER>
OIDC_CLIENT_ID=<YOUR_CLIENT_ID>
OIDC_CLIENT_SECRET=<YOUR_CLIENT_SECRET>
BASE_URL=http://localhost:3000
SESSION_SECRET=todo: make-this-more-secure
OKTA_CLIENT_ORGURL=https://dev-123456.okta.com/
API_TOKEN=1234
```

**NOTE**: Make sure to remove the `<...>` placeholders. Your issuer should look something like: `https://dev-123456.okta.com/oauth2/default`.

So your .env file will end up looking something like:

```
OIDC_ISSUER=https://dev-123456.okta.com/oauth2/default
OIDC_CLIENT_ID=0oa578hjtxP8gt89F3x6
OIDC_CLIENT_SECRET=1234
BASE_URL=http://localhost:3000
SESSION_SECRET=todo: make-this-more-secure
OKTA_CLIENT_ORGURL=https://dev-123456.okta.com/
API_TOKEN=1234
```

Make sure the relevant users are assigned to the application by going to **Applications** > **Node.js Login** > **Assignments**.

Request an API token from **Security** > **API** > **Tokens**. IMMEDIATELY copy the key value and place in your .env file. You may not be able to access it later.

Make sure your app allows CORS and redirect: **Security** > **API** > **Trusted Origins**. Check boxes for CORS and redirect. URL is http://localhost:3000/. Organization name is Node.js Login.

Make sure to create an admin group and add a user to become a superuser in **Directory** > **Groups**. Grant everyone in this group administrator privileges by going to **Security** > **Administrators** > **Add Administrator Group**. Add the group you created for admins and check "Super Administrator" . Adding anybody to this group will now grant them super administrator privileges.

### Start the application

Start your application:

```
npm start
```

Login to `http://localhost:3000` and enjoy your login experience!

## 2. Technologies Used
This app was built on the Node.js Javascript runtime and Express back-end framework. The Okta API docs and 4 supporting Okta repositories were instrumental in completing this project.

## 3. Technical Exercise Requirements
The prompt reads:
Create a custom application in the programming language of your choice and include the following:
+ An unsecured ("open") landing page
+ A protected page that any authenticated user can get to
+ A protected page that only members of an admin group can get to
+ An admin page that provides an interface to add regular users to the admin group
+ Leverage Okta for these operations
+ Create custom admin pages that use the Okta API for Create, Read, Update, & Delete user functions. Refer to: [https://developer.okta.com/docs/api/resources/users.html]_

The application runs locally on my Windows machine. After starting the application and server, I go to `localhost:3000` which brings me to the landing page for a mock news website, 'The Daily Byte'. Users with regular permissions are directed to a different part of the site than admins. Admins are directed to a portal that allows them to view all users and groups in the organization, create users, delete users, grant admin privileges to users, and update their own information. The login page is hosted by Okta. The user functions are facilitated by calls to Okta's API platform.

## 4. Next Steps
The base requirements were fulfilled. The immediate next step would be adding more functionality with more parameter options for these API calls as well as more options with respect to updating users and groups.

There are security issues to address with the application. Giving clearer error messages when the results page loads and sanitizing the user input on the admin portal are the first few that come to mind.

This app could also use some better decoration and organization. Implementing a front-end framework like React or Angular could help modularize the content. The Pug templates can also be leveraged better to deliver more dynamic content.

## 5. Links and Acknowledgments
* [Node.js + Express Login Example](https://github.com/oktadeveloper/okta-nodejs-login-example#readme)
* [Okta Node.js SDK](https://github.com/okta/okta-sdk-nodejs#readme)
* [OktaDev Schematics](https://github.com/oktadeveloper/schematics#readme)
* [OIDC Middleware](https://github.com/okta/okta-oidc-js/tree/master/packages/oidc-middleware#readme)
