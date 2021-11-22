### Prerequisites: Set up AWS Cognito
1. Set up a user pool you intend to attach this provider to. Starting from your AWS Cognito console, click "Create a user pool" and enter a pool name. Click "Review defaults" and "Create pool".
2. Set up an app client from that pool by going to the left sidebar menu and clicking "App clients" under "General settings". Click "Add another app client", add an app client name, and click "Create app client".
3. Set up a domain for authenticating using the sign-up and sign-in pages hosted by Cognito by clicking "Domain name" under "App integration" and entering a domain prefix. To allow your users to sign in with their phone number, be sure to set the "Allow phone numbers" radio button in the "Attributes" settings.

### Prerequisites: Sora
- An active client ID and secret from Sora (specifically for OpenID Connect integration)
- Under redirect URLs on your Sora OIDC dashboard, specify "https://\<your-base-domain\>/oauth2/idpresponse" as an allowed redirect URL, for example "https://sora-example.auth.us-east-2.amazoncognito.com/oauth2/idpresponse".

### Setting up the Sora OIDC Provider in Cognito
1. View the user pool you want to add Sora to. You should see a side panel with categories including "App integration" and "Federation".
2. Click "Identity providers" in the sidebar (under Federation).
3. Click OpenID Connect.
4. Fill in the following:
  - Create a name for the provider (specifc to your project; we recommend "sora")
  - Client ID and client secret (from Sora)
  - Leave the attributes request method set to `GET`
  - For Authorize scope, specify "openid"
  - For issuer, specify "https://verify.soraid.com" and click "Run discovery". There should be no errors shown now.
5. Click the "Update provider" button.
6. Click "App client settings" under "App integration" in the sidebar.
  - Check "sora" as an enabled identity provider
  - Set "http://localhost/signin" as a callback url, or other base url if hosting somewhere other than localhost
  - Set "http://localhost/signout" as the sign out url; this is not used in this demo.
  - Check "Authorization code grant" under the allowed OAuth flows and "openid" and "profile" under allowed OAuth scopes.
7. If you want the attributes in Sora's ID token to map to your user pool (for example, mapping phone number would make it accessible in your user pool), click "Attribute mapping" on the sidebar (under Federation) and add the OIDC attributes you require.


### Configuring the app
1. Set the variables in constants.js; they are described in that file.

### Running the app
```sh
yarn install
node app.js
```
