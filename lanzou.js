const puppeteer = require("puppeteer");
const devices = require('puppeteer/DeviceDescriptors');

let timeout = function (delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(1);
      } catch (e) {
        reject(0);
      }
    }, delay);
  });
};

async function run() {
  const browser = await puppeteer.launch({
    headless: false, //这里我设置成false主要是为了让大家看到效果，设置为true就不会打开浏览器
  });
  page = await browser.newPage();

  await page.goto("https://pc.woozooo.com/account.php?action=login&ref=/mydisk.php");
  await timeout(2000);

  const { left, top, distance } = await page.evaluate(() => {
    const { x, y } = document.querySelector('.nc_iconfont').getBoundingClientRect()
    const { clientWidth } = document.querySelector('.slidetounlock')
    return { left: x + 10, top: y + 10, distance: clientWidth - 40 }
  })
  console.log(left, top, 'btn_position');
  const distance1 = distance - 40
  const distance2 = 40
  page.mouse.click(left, top, {
    delay: 2000,
  });
  page.mouse.down(left, top);
  page.mouse.move(left + distance1, top, {
    steps: 50,
  });

  await timeout(800);
  page.mouse.move(left + distance1 + distance2, top, {
    steps: 80,
  });
  await timeout(800);
  page.mouse.up();
  await timeout(4000);
}
run()