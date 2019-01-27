'use strict';

const { join } = require('path');
const axios = require('axios');

const APP_URI = 'http://localhost:3000';

const main = async () => {
  const categories = require(join(__dirname, 'seedData', 'categories'));
  try {
    await axios.post(`${APP_URI}/category/bulk`, {
      categories
    });
  } catch (error) {
    const cache = [];
    console.log(JSON.stringify(error.response.data, (key, val) => {
      if (typeof val === 'object' && val !== null) {
        if (cache.indexOf(val) !== -1) {
          try {
            return JSON.parse(JSON.stringify(val));
          } catch (error) {
            return;
          }
        }
        cache.push(val);
      }
      return val;
    }, 2));
  }
};

main();
