const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    pageLoadTimeout: 120000, // 2 menit
    defaultCommandTimeout: 15000,
  
  },
});
