// Client ID of the cognito app, NOT your Sora client ID. This can be found after clicking "app clients" in the sidebar on the user pool page.
export const client_id = "<YOUR_CLIENT_ID>";

// Client secret of the cognito app, NOT your Sora client secret. This can be found after clicking "app clients" in the sidebar on the user pool page.
//
// Some apps don't use a client secret, in which case there is no authorization header
// in fetch request in app.js
export const client_secret = "<YOUR_CLIENT_SECRET>";

// base url of your cognito auth page. This can be found after clicking "domain name" (under "App integration") in the sidebar on the user pool page.
export const auth_base_url = "<YOUR_BASE_URL>";

// redirect url for signing in. Replace the base url if not running on localhost.
export const redirect_uri = "https://ethan.soraid.com/signin"
