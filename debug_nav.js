const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812 });
  
  await page.goto('http://localhost:3001');

  const navToggleInfo = await page.evaluate(() => {
    const el = document.querySelector('.nav-toggle');
    if (!el) return null;
    
    const rect = el.getBoundingClientRect();
    const style = window.getComputedStyle(el);
    const zIndex = style.zIndex;
    const display = style.display;
    const visibility = style.visibility;
    const opacity = style.opacity;
    const bgColor = style.backgroundColor;
    const position = style.position;
    
    // Check elements at the center of the nav toggle
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    let topElement = null;
    if (centerX >= 0 && centerY >= 0 && centerX <= window.innerWidth && centerY <= window.innerHeight) {
        topElement = document.elementFromPoint(centerX, centerY);
    }
    
    return {
      rect: rect.toJSON(),
      styles: { zIndex, display, visibility, opacity, bgColor, position },
      topElementId: topElement ? topElement.id : null,
      topElementClass: topElement ? topElement.className : null,
      topElementTag: topElement ? topElement.tagName : null,
      documentWidth: document.documentElement.scrollWidth,
      windowWidth: window.innerWidth
    };
  });

  console.log(JSON.stringify(navToggleInfo, null, 2));

  await browser.close();
})();
