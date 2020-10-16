"use strict";
/**
 * Primary endpoint path for the Twilio application to redirect.
 * All Twilio actions will redirect to the original Twilio endpoint.
 * @type {{default: string}}
 */
const postPath = {
  default: '/',
  outbound_call: "/outbound_call"
};

/**
 * Constants
 */
const http = require('http');
const path = require('path');
const express = require('express');
const twilio_voice = require(path.resolve('js', 'twilio_voice.js'));

/**
 * Initialise variables using environment parameters
 */
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3000;

// initialize an Express application
const app = express();
const router = express.Router();

// Tell express to use this router with /api before.
app.use(postPath.default, router);

// twilio message comes in
const twilio_voice_instance = new twilio_voice();

router.post(postPath.default, twilio_voice_instance.handleInboundCalls());

router.post(postPath.outbound_call, twilio_voice_instance.handleOutboundCalls());

// start the express application
http.createServer(app).listen(port, () => {
  console.log(`Listening on port: ${port}`);
});