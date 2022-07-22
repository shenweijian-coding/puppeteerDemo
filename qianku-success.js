const puppeteer = require('puppeteer');
const addCookies = async (cookies_str, page, domain) => {
  let cookies = cookies_str.split(';').map(
    pair => {
      let name = pair.trim().slice(0, pair.trim().indexOf('='));
      let value = pair.trim().slice(pair.trim().indexOf('=') + 1);
      return { name, value, domain, path: "/", }
    });
  await Promise.all(cookies.map(pair => {
    return page.setCookie(pair)
  }))
}

let cookie = `adIssem=0; _ga=GA1.2.1817299266.1655038685; _k_iprec_wd_1=%7C-; bt_guid=%22a0e0f12c880315a52d7a02372ad00467%22; FIRSTVISITED=1657806199.025; 588ku_login_refer_url=%22https%3A%5C%2F%5C%2F588ku.com%5C%2F%22; success_target_path=%22%5C%2F%5C%2F588ku.com%5C%2F%22; ISREQUEST=1; WEBPARAMS=is_pay=1; ele_search_words=%5B%22tanwei%22%5D; Hm_lvt_6434381c05f6d955403c23f84f441f82=1656940876,1657806228; back_search_words=%5B%22kejichengshi%22%5D; webpage_search_words=%5B%22jiaoyu%22%5D; _k_iprec_1=36.112.204.149; _gid=GA1.2.794634150.1658231838; host=588ku.com; source_url=588ku.com; temp_login_uid=17269040; temp_login_avator=%22http%3A%5C%2F%5C%2Fthirdqq.qlogo.cn%5C%2Fqqapp%5C%2F101252414%5C%2FC6CA4469FE3143C119546419CDF24663%5C%2F100%22; temp_login_flag2=1; last_login_type=1; stat_str=%u7F16%u8F91%u5668%u6D3B%u52A8; no_login_pv=1; down_type=1; 588KUSSID=2qjba6v152vukvv5jcd8fcu2n2; _k_ut_v1=%7B%22ip%22%3A%2236.112.204.149%22%2C%22d%22%3A%222022-07-21%22%2C%22h%22%3A%22%22%2C%22hd%22%3A%22%22%2C%22sem%22%3A%22%22%2C%22host%22%3A%22588ku.com%22%2C%22bm%22%3A9%2C%22kw%22%3A%22%22%7D; Hm_lvt_8226f7457e3273fa68c31fdc4ebf62ff=1658064250,1658231838,1658323865,1658408946; Hm_lvt_3e90322e8debb1d06c9c463f41ea984b=1658064250,1658231837,1658323865,1658408946; phoneold17269040=1; auth_id=%2217269040%7C%5Cu5de6%5Cu4e0b%5Cu89d2%5Cu7684%5Cu6211%7C1659272950%7Cdc2bfcc5b8bbd0cfd157628bceddd550%22; sns=%7B%22token%22%3A%7B%22access_token%22%3A%224213154E49F709FD01AD574EA4FC53B5%22%2C%22expires_in%22%3A%227776000%22%2C%22refresh_token%22%3A%2226EC886C9136C9B0A021F16531A3E2DB%22%2C%22openid%22%3A%22C6CA4469FE3143C119546419CDF24663%22%7D%2C%22type%22%3A%22qq%22%7D; ui_588ku=dWlkPTAmdWM9JnVzPSZ0PTEyMzdiYmJjYjQxYWU2ZTJjNmY0OGU5NTQ5ODQ3Nzc4MTY1NjEyNzE3MS40Nzk5MTA4OCZncj0xJnVycz0%3D; IPSSESSION=t0kvf0ntghat49hli806on3jh0; all_pic_search_words=%5B%22yiliao%22%2C%22jinrong%22%2C%22xiatian%22%2C%22taiyang%22%2C%22kuaishoudouyinlogo%22%2C%22102558545%22%2C%22shiwu%22%5D; search:last:keyword=%22%5Cu533b%5Cu7597%22; Qs_lvt_474541=1658323865%2C1658408946%2C1658409566%2C1658409637%2C1658410587; qk_host=588ku.com; referer=%22%5C%2F%5C%2F588ku.com%5C%2Fdesignvip%5C%2F%22; 60840175e8d41e29906b9e83321fda6c=%220a35a8a8059a99fb4f9570dd8c0a57c7%22; login_pv=12; location=99; _gat_gtag_UA_139867171_1=1; Qs_pv_474541=3497625786455417000%2C177496378192351230%2C3125309367537195000%2C3846108615815447000%2C3167806052424180000; mediav=%7B%22eid%22%3A%221099916%22%2C%22ep%22%3A%22%22%2C%22vid%22%3A%22-et0jcSD%2329i%3CZ5%5EWS%241%22%2C%22ctn%22%3A%22%22%2C%22vvid%22%3A%22-et0jcSD%2329i%3CZ5%5EWS%241%22%2C%22_mvnf%22%3A1%2C%22_mvctn%22%3A0%2C%22_mvck%22%3A0%2C%22_refnf%22%3A1%7D; Hm_lpvt_8226f7457e3273fa68c31fdc4ebf62ff=1658410990; Hm_lpvt_3e90322e8debb1d06c9c463f41ea984b=1658410990`
async function run() {

}
  ; (async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
    // timeout: 3000,
    slowMo: 10,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-features=site-per-process', '--window-size=1400,900'],
  });
  // 新开标签页
  const page = await browser.newPage();
  await addCookies(cookie, page, '.588ku.com')
  // 打开指定网址
  await page.goto('https://588ku.com/?m=home&type=1');

    await page.waitForSelector(".download-file")
    await page.click('.download-file')
    // await page.waitForTimeout(1000);
  // 等待极验出现
  await page.waitForSelector(".geetest_holder")
  // 点击显示极验
  // await page.click(".geetest_btn")
  await page.waitForTimeout(800);
  // 开始滑动
  await slider();
  async function slider() {
    // 等待canvas完成 并完成0.5s的移动动画 (验证出错也可为等待时间)
    await page.waitForSelector('.geetest_ready', {
      timeout: 0,
    });
    await page.waitForTimeout(500);
    // 获取canvas的左上角X坐标作为滑动的基坐标
    await page.waitForSelector('.geetest_canvas_bg');
    let canvasCoordinate = await page.$('.geetest_canvas_bg');
    let canvasBox = await canvasCoordinate.boundingBox();
    let canvasX = canvasBox.x;
    // 等待滑动按钮出现获取Y坐标
    await page.waitForSelector('.geetest_slider_button');
    let button = await page.$('.geetest_slider_button');
    let box = await button.boundingBox();
    let mouseY = Math.floor(box.y + box.height / 2);
    // 计算位移
    let moveDistance = await compare();
    // 滑动验证
    await page.hover('.geetest_slider_button');
    await page.mouse.down();
    await page.mouse.move(canvasX + moveDistance / 3, mouseY + 4, { steps: 15 });
    await page.waitForTimeout(1 * 10);
    await page.mouse.move(canvasX + moveDistance / 2, mouseY + 5, { steps: 20 });
    await page.waitForTimeout(2 * 20);
    await page.mouse.move(canvasX + moveDistance + 10, mouseY + 6, { steps: 18 });
    await page.waitForTimeout(3 * 10);
    await page.mouse.move(canvasX + moveDistance - 15, mouseY - 2, { steps: 18 });
    await page.waitForTimeout(3 * 10);
    await page.mouse.move(canvasX + moveDistance / 1, mouseY - 3, { steps: 60 });
    await page.waitForTimeout(4 * 40);
    await page.mouse.up();
    // await page.waitForSelector('.geetest_success_radar_tip_content');
    // 是否验证成功
    // let state = await page.evaluate(() => {
    //   return document.querySelector('.geetest_success_radar_tip_content').innerText;
    // });
    // if (state === '验证成功') {
    //   console.log('失败');
    //   return slider();
    // } else {
    console.log('成功');
    // }
    await page.waitForTimeout(2000);
    browser.close()
  }
  // 计算位移
  async function compare() {
    //  获取canvas
    let moveDistance = await page.evaluate(() => {
      let fullbgs = document.querySelector('.geetest_canvas_fullbg');
      let bgs = document.querySelector('.geetest_canvas_bg');
      let bgsCtx = bgs.getContext('2d');
      let fullbgsCtx = fullbgs.getContext('2d');
      let canvasWidth = bgsCtx.canvas.width;
      let canvasHeight = bgsCtx.canvas.height;
      // 最大像素差(阀值)
      // let pixelsDifference = 100;
      let pixelsDifference = 70;
      // 第一个超过阀值的x坐标 最后一个超过阀值的x坐标
      let firstX, lastX;
      // 对比像素
      for (let i = 1, k = 1; i < canvasWidth; i++) {
        if (!firstX) {
          // 找到第一个超过阀值的X坐标后 Y轴停止循环
          for (let j = 1; j < canvasHeight; j++) {
            // 获取像素数据
            let bgsPx = bgsCtx.getImageData(i, j, 1, 1).data;
            let fullbgsPx = fullbgsCtx.getImageData(i, j, 1, 1).data;
            // 计算像素差 并判断是否超过阀值
            let res1 = Math.abs(bgsPx[0] - fullbgsPx[0]);
            let res2 = Math.abs(bgsPx[1] - fullbgsPx[1]);
            let res3 = Math.abs(bgsPx[2] - fullbgsPx[2]);
            if (res1 > pixelsDifference || res2 > pixelsDifference || res3 > pixelsDifference) {
              firstX = i;
              // 记录Y坐标
              k = j;
            }
          }
        } else {
          // 顺着X轴查找最后一个超过阀值的X坐标
          // K是第一个超过阀值的Y坐标
          // (会多一点循环时间 但是不用手动测量阴影块宽度)
          let bgsPx = bgsCtx.getImageData(i, k, 1, 1).data;
          let fullbgsPx = fullbgsCtx.getImageData(i, k, 1, 1).data;
          let res1 = Math.abs(bgsPx[0] - fullbgsPx[0]);
          let res2 = Math.abs(bgsPx[1] - fullbgsPx[1]);
          let res3 = Math.abs(bgsPx[2] - fullbgsPx[2]);
          if (res1 > pixelsDifference || res2 > pixelsDifference || res3 > pixelsDifference) {
            lastX = i;
          }
        }
      }
      // 滑动到阴影块中心的距离
      return firstX + (lastX - firstX) / 2;
    });
    return moveDistance;
  }
   await browser.close()
})();