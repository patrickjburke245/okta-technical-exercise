# okta-technical-exercise
An application with an Okta-hosted login page and admin portal that leverages the Okta API to manage users in an organization.

##Getting Started

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

Log in to `http://localhost:3000` and enjoy your login experience!

##Exercise Requirements
The exercise

##Technologies Used


##Links
..*[Node.js + Express Login Example](https://github.com/oktadeveloper/okta-nodejs-login-example#readme)
..*[Okta Node.js SDK](https://github.com/okta/okta-sdk-nodejs#readme)
..*[OktaDev Schematics](https://github.com/oktadeveloper/schematics#readme)
..*[OIDC Middleware](https://github.com/okta/okta-oidc-js/tree/master/packages/oidc-middleware#readme)
