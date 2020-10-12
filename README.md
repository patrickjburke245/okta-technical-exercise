# okta-technical-exercise
An application with an Okta-hosted login page and admin portal that leverages the Okta API to manage users in an organization.

## 1. Getting Started

To install this application, run the following commands (meant for Windows):
```
git clone https://github.com/patrickjburke245/okta-technical-exercise.git
cd okta-nodejs-login-example
npm install
```
This will create a copy of the project locally.
### Create a Free Okta Developer Account

If you don't have one, [create an Okta Developer account](https://developer.okta.com/signup/). After you've completed the setup process, log in to your account.

Create a new OIDC app by navigating to **Applications** > **Add Application** > select **Web**, and click **Next**. Fill in the following values:

* Name: `Node.js Login`
* Base URI: `http://localhost:3000`
* Login redirect URI: `http://localhost:3000/callback`
* Logout redirect URI: `http://localhost:3000`

Click **Done** to create your app. 

Create a `.env` file in your root directory and copy the client ID and secret into it. You can find the value for `<YOUR_ISSUER>` by navigating to **API** > **Authorization Servers**.

```
OIDC_ISSUER=<YOUR_ISSUER>
OIDC_CLIENT_ID=<YOUR_CLIENT_ID>
OIDC_CLIENT_SECRET=<YOUR_CLIENT_SECRET>
BASE_URL=http://localhost:3000
SESSION_SECRET=todo: make-this-more-secure
```
   
**NOTE**: Make sure to remove the `<...>` placeholders. Your issuer should look something like: `https://dev-123456.okta.com/oauth2/default`.

### Start the application

Start your application:

```
npm start
```

Login to `http://localhost:3000` and enjoy your login experience!

## 2. Technologies Used
Node.js, Express, Pug, 4x okta links, body-parser.

## 3. Technical Exercise Requirements
I will reiterate the prompt given for this exercise and then illustrate how I fulfilled it. The prompt reads:
_Create a custom application in the programming language of your choice and include the following:
+ An unsecured ("open") landing page
_ + A protected page that any authenticated users can get to
+ An admin page that provides an interface to add regular users to the admin group
_ + Leverage Okta for these operations
_ + Create custom admin pages that use the Okta API for Create, Read, Update, & Delete user functions. Refer to: [https://developer.okta.com/docs/api/resources/users.html]

The application runs locally on my Windows machine. After starting the application and server, I go to `localhost:3000`, a mock news website landing page....
## 4. Next Steps
Implementing a front-end framework. Utilizing Pug better to deliver more aesthetic dynamic content. Improving on routing and code organization.

## 5. Links and Acknowledgments
* [Node.js + Express Login Example](https://github.com/oktadeveloper/okta-nodejs-login-example#readme)
* [Okta Node.js SDK](https://github.com/okta/okta-sdk-nodejs#readme)
* [OktaDev Schematics](https://github.com/oktadeveloper/schematics#readme)
* [OIDC Middleware](https://github.com/okta/okta-oidc-js/tree/master/packages/oidc-middleware#readme)
