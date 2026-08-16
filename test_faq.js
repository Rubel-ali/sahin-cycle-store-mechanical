const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  // Go to page
  await page.goto('http://127.0.0.1:3000/en');
  
  // Find the Contact CTA section position before click
  const contactCtaPosBefore = await page.evaluate(() => {
    const el = document.querySelector('section.bg-primary');
    return el ? el.getBoundingClientRect().top : -1;
  });
  console.log('Contact CTA position before click:', contactCtaPosBefore);

  // Scroll to FAQ
  await page.evaluate(() => {
    window.scrollBy(0, 3000);
  });
  await new Promise(r => setTimeout(r, 1000));
  
  // Click FAQ item 1
  const faqButtons = await page.$$('button');
  // Find a button containing FAQ text
  for (const btn of faqButtons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text.includes('same-day')) {
      await btn.click();
      console.log('Clicked FAQ item');
      break;
    }
  }
  
  await new Promise(r => setTimeout(r, 1000));
  
  // Find the Contact CTA section position after click
  const contactCtaPosAfter = await page.evaluate(() => {
    const el = document.querySelector('section.bg-primary');
    return el ? el.getBoundingClientRect().top : -1;
  });
  console.log('Contact CTA position after click:', contactCtaPosAfter);
  
  await browser.close();
})();
