const express = require('express');
const app = express();
const fs = require('fs');

const client = contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: "pvs0glpvlo4v",
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: "0_Z8Dnh-2i5Vs7LymEku--jFoA-sVfFuLZPejKFe4Wc"
  });
  