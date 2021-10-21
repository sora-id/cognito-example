import express from "express";

import fetch from 'node-fetch';
import base64 from "base-64";
import formurlencoded from 'form-urlencoded';
import {
  client_id,
  client_secret,
  auth_base_url,
  redirect_uri,
} from "./constants.js";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const params = {
    response_type: "code",
    client_id,
    redirect_uri,
    // scope: "openid profile",
    // identity_provider: "soraid",
  }
  const location = auth_base_url + "/oauth2/authorize?" + formurlencoded(params)
  res.send(`<a href=${location}>Sign in</a>`);
});

app.get("/signin", async (req, res) => {
  const code = req.query.code;
  const params = {
    grant_type: "authorization_code",
    code,
    client_id,
    redirect_uri,
  }
  if (!code) {
    res.send("error: no code in query");
  }
  const result = await fetch(auth_base_url + "/oauth2/token", {
    body: formurlencoded(params),
    method: "POST",
    headers: {
      "Authorization": "Basic " + base64.encode(client_id + ":" + client_secret),
      "Content-Type": "application/x-www-form-urlencoded",
    }
  });
  const json_result = await result.json();
  // In the real world, you should validate the token before parsing
  res.send(JSON.parse(base64.decode(json_result["id_token"].split(".")[1])));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

