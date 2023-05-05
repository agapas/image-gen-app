const dotenv = require('dotenv');

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
  }
};
