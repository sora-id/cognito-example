### Prerequisites: AWS
- AWS Cognito set up with a user pool you intend to attach this provider to
- A client set up for that user pool
- A domain for authenticating using that user pool (set up by clicking "domain name" in the user pool sidebar)
- Be sure that your user pool requires phone number (not email).   # TODO

### Prerequisites: Sora
- An active client ID and secret from Sora (specifically for OpenID Connect integration)
- Under redirect URLs on your Sora OIDC dashboard, specify "https://\<your-base-domain\>/oauth2/idpresponse" as an allowed redirect URL, for example "https://sora-example.auth.us-east-2.amazoncognito.com/oauth2/idpresponse"  # TODO

### Setting up the Sora OIDC Provider in Cognito
1. View the user pool you want to add Sora to. You should see a side panel with categories including "App integration" and "Federation".
2. Click "Identity providers" in the sidebar (under Federation).
3. Click OpenID Connect.
4. Fill in the following:
  - create a name for the provider (specifc to your project; we recommend "sora")
  - client ID and client secret (from Sora)
  - Leave the attributes request method set to `GET`
  - For Authorize scope, specify "openid"  # NB may change to "default"?
  - For issuer, specify "https://verify.soraid.com" and click "Run discovery". There should be no errors shown now.
5. Click the "Update provider" button.
6. Click "App client settings" under "App integration" in the sidebar.
  - Check "sora" as an enabled identity provider
  - Set "http://localhost/signin" as a callback url, or other base url if hosting somewhere other than localhost
  - Set "http://localhost/signout" as the sign out url; this is not used in this demo.
  - Check "Authorization code grant" under the allowed OAuth flows and "openid" and "profile" under allowed OAuth scopes.
7. If you want the attributes in Sora's ID token to map to your user pool (for example, mapping phone number would make it accessible in your user pool), click "Attribute mapping" on the sidebar (under Federation) and add the OIDC attributes you require.


### Configuring the app
1. set the variables in constants.js; they are described in that file.

### Running the app
```sh
yarn install
node app.js
```