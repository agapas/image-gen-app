const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

module.exports = {
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "oaidalleapiprodscus.blob.core.windows.net",
      port: "",
      pathname: "/**",
    }]
  },
  publicRuntimeConfig: {
    apiKey: process.env.API_KEY
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@use 'variables' as *;`
  },
};
