#!/usr/bin/env node
const config = {
  API_URL: process.env.API_URL || null,
  APP_STAGE: process.env.APP_STAGE || null,
};

for (let key in config) {
  if (config[key] === null) {
    throw new Error(`Missing environment variable: ${key}`);
  }
}

const fs = require("fs");
const index = fs.readFileSync("./public/index.html").toString("utf8");
const result = index.replace("%ENV_ANCHOR%", JSON.stringify(config));
fs.writeFileSync("./public/index.html", result);
