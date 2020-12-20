#!/usr/bin/env node
const configKeys = ["API_URL", "APP_STAGE"];

const configObj = {};

// Build a config object to override in the index.html
for (let key of configKeys) {
  const currentConfigValue = process.env[key];

  // If there is a value, push it in the config obj
  if (currentConfigValue) {
    configObj[key] = currentConfigValue;
  }
}

const fs = require("fs");
const index = fs.readFileSync("./public/index.html").toString("utf8");
const result = index.replace("%REPLACE_ME%", JSON.stringify(configObj));
fs.writeFileSync("./build/index.html", result);
