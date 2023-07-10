const puppeteer = require('puppeteer');
const fs = require('fs');

var arr = [];

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://coolors.co/7d84b2-8e9dcc-d9dbf1-f9f9ed-dbf4a7');

  // Enable console message interception
  page.on('console', (msg) => {
    const msgText = msg.text();
    const msgType = msg.type();
    if (msgType === 'log' && msgText !== '' && !msgText.includes("https://") && !msgText.includes('%c')) {
      // Log the message text and type
      console.log(`[${msgType}] ${msgText}`);
      arr.push(msgText);
    }
  });

  // Perform the action and capture console.log statements 20 times
  for (let i = 0; i < 50; i++) {
    await page.keyboard.press('Space');
    await page.waitForTimeout(1000); // Delay to allow new console.log messages to appear
  }

  await browser.close();

  // Convert the array to a JSON string
  const jsonStr = JSON.stringify(arr);

  fs.writeFile('../assets/colors.txt', jsonStr, 'utf8', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return;
    }
    console.log('Data written to file successfully.');
  });
})();
