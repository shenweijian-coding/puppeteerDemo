const puppeteer = require("puppeteer");
const devices = require("puppeteer/DeviceDescriptors");
// const iPhone = devices["iPhone 6 Plus"];
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

let page = null;
let btn_position = null;
let times = 0; // 执行重新滑动的次数
const distanceError = [-10, 2, 3, 5]; // 距离误差

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

let cookie = `mediav=%7B%22eid%22%3A%221099916%22%2C%22ep%22%3A%22%22%2C%22vid%22%3A%22-et0jcSD%2329jyfFXTG%3Aw%22%2C%22ctn%22%3A%22%22%2C%22vvid%22%3A%22-et0jcSD%2329jyfFXTG%3Aw%22%2C%22_mvnf%22%3A1%2C%22_mvctn%22%3A0%2C%22_mvck%22%3A0%2C%22_refnf%22%3A1%7D; adIssem=0; _ga=GA1.2.1817299266.1655038685; track_id=74866fc5a9f46cef0e67a47cee9c4917e9a5db4e81a2669821461561f612ec3ca%3A2%3A%7Bi%3A0%3Bs%3A8%3A%22track_id%22%3Bi%3A1%3Bs%3A51%3A%221237bbbcb41ae6e2c6f48e95498477781656127171.47991088%22%3B%7D; _k_iprec_wd_1=%7C-; referer=%22%5C%2F%5C%2F588ku.com%5C%2F%22; bt_guid=%22a0e0f12c880315a52d7a02372ad00467%22; FIRSTVISITED=1657806199.025; 588ku_login_refer_url=%22https%3A%5C%2F%5C%2F588ku.com%5C%2F%22; success_target_path=%22%5C%2F%5C%2F588ku.com%5C%2F%22; ISREQUEST=1; WEBPARAMS=is_pay=1; ui_588ku=dWlkPTAmdWM9JnVzPSZ0PTEyMzdiYmJjYjQxYWU2ZTJjNmY0OGU5NTQ5ODQ3Nzc4MTY1NjEyNzE3MS40Nzk5MTA4OCZncj0xJnVycz0%3D; ele_search_words=%5B%22tanwei%22%5D; Hm_lvt_6434381c05f6d955403c23f84f441f82=1656940876,1657806228; _gid=GA1.2.826524232.1657930361; auth_id=%2217269040%7C%5Cu5de6%5Cu4e0b%5Cu89d2%5Cu7684%5Cu6211%7C1658806622%7C746c6f091f6f0bceee4ca191e479d367%22; sns=%7B%22token%22%3A%7B%22access_token%22%3A%224213154E49F709FD01AD574EA4FC53B5%22%2C%22expires_in%22%3A%227776000%22%2C%22refresh_token%22%3A%2226EC886C9136C9B0A021F16531A3E2DB%22%2C%22openid%22%3A%22C6CA4469FE3143C119546419CDF24663%22%7D%2C%22type%22%3A%22qq%22%7D; 588ku_eid=172467%7C1658806624; e_ssid=s588ku62d23260e86841.07819382; source_url=588ku.com; _k_iprec_1=124.127.0.47; _k_ut_v1=%7B%22ip%22%3A%22124.127.0.47%22%2C%22d%22%3A%222022-07-17%22%2C%22h%22%3A%22%22%2C%22hd%22%3A%22%22%2C%22sem%22%3A%22%22%2C%22host%22%3A%22588ku.com%22%2C%22bm%22%3A5%2C%22kw%22%3A%22%22%7D; host=588ku.com; back_search_words=%5B%22kejichengshi%22%5D; backConditionFilterField=8_0; webpage_search_words=%5B%22jiaoyu%22%5D; IPSSESSION=ndltc86lmf292hletnup759sh6; Qs_lvt_474541=1657930360%2C1657954549%2C1658026956%2C1658059021; down_type=1; 588KUSSID=t53p871qkpq3267ereo4q1pdr5; Hm_lvt_3e90322e8debb1d06c9c463f41ea984b=1657930361,1658026957,1658059019,1658064250; Hm_lvt_8226f7457e3273fa68c31fdc4ebf62ff=1657930361,1658026957,1658059019,1658064250; mediav=%7B%22eid%22%3A%221099916%22%2C%22ep%22%3A%22%22%2C%22vid%22%3A%224L.7at3U8%608n%24JC!%40%3CmA%22%2C%22ctn%22%3A%22%22%2C%22vvid%22%3A%224L.7at3U8%608n%24JC!%40%3CmA%22%2C%22_mvnf%22%3A1%2C%22_mvctn%22%3A0%2C%22_mvck%22%3A0%2C%22_refnf%22%3A1%7D; qk_host=588ku.com; keyword=%22%5Cu91d1%5Cu878d%22; all_pic_search_words=%5B%22jinrong%22%2C%22xiatian%22%2C%22taiyang%22%2C%22kuaishoudouyinlogo%22%2C%22102558545%22%2C%22shiwu%22%5D; search:last:keyword=%22%5Cu91d1%5Cu878d%22; 6cef5aee53857eab7fd1673c93f271f3=%220a35a8a8059a99fb4f9570dd8c0a57c7%22; location=99; login_pv=49; _gat_gtag_UA_139867171_1=1; Hm_lpvt_3e90322e8debb1d06c9c463f41ea984b=1658069065; Hm_lpvt_8226f7457e3273fa68c31fdc4ebf62ff=1658069065; Qs_pv_474541=531333470547387900%2C3194197584916241400%2C365697968807448400%2C2409954286656831000%2C653853442742818700`

async function run() {
  const browser = await puppeteer.launch({
    defaultViewport: null,
    headless: false, //这里我设置成false主要是为了让大家看到效果，设置为true就不会打开浏览器
  });
  page = await browser.newPage();
  // await page.emulate(iPhone);
  await addCookies(cookie, page, '588ku.com')
  await timeout(2000);
  await page.goto("https://588ku.com/ycpng/13347673.html");
  await timeout(2000);

  // 4.点击验证
  // const down_btn = await page.$(".btns-box")
  // console.log(down_btn);
  page.click(".show-company-guide");

  // await timeout(9000);

  // btn_position = await getBtnPosition();
  // // 5.滑动
  // drag(null);
}

/**
 * 计算按钮需要滑动的距离
 * */
async function calculateDistance() {
  const distance = await page.evaluate(() => {
    // 比较像素,找到缺口的大概位置
    function compare(document) {
      const ctx1 = document.querySelector(".geetest_canvas_fullbg"); // 完整图片
      const ctx2 = document.querySelector(".geetest_canvas_bg"); // 带缺口图片
      const pixelDifference = 30; // 像素差
      let res = []; // 保存像素差较大的x坐标

      // 对比像素
      for (let i = 57; i < 260; i++) {
        for (let j = 1; j < 160; j++) {
          const imgData1 = ctx1
            .getContext("2d")
            .getImageData(1 * i, 1 * j, 1, 1);
          const imgData2 = ctx2
            .getContext("2d")
            .getImageData(1 * i, 1 * j, 1, 1);
          const data1 = imgData1.data;
          const data2 = imgData2.data;
          const res1 = Math.abs(data1[0] - data2[0]);
          const res2 = Math.abs(data1[1] - data2[1]);
          const res3 = Math.abs(data1[2] - data2[2]);
          if (
            !(
              res1 < pixelDifference &&
              res2 < pixelDifference &&
              res3 < pixelDifference
            )
          ) {
            if (!res.includes(i)) {
              res.push(i);
            }
          }
        }
      }
      // 返回像素差最大值跟最小值，经过调试最小值往左小7像素，最大值往左54像素
      return { min: res[0] - 7, max: res[res.length - 1] - 54 };
    }
    return compare(document);
  });
  return distance;
}

/**
 * 计算滑块位置
 */
function getBtnPosition() {
  return { btn_left: 105, btn_top: 427 };
}
/**
 * 尝试滑动按钮
 * @param distance 滑动距离
 * */
async function tryValidation(distance) {
  //将距离拆分成两段，模拟正常人的行为
  const distance1 = distance - 10;
  const distance2 = 10;

  page.mouse.click(btn_position.btn_left, btn_position.btn_top, {
    delay: 2000,
  });
  page.mouse.down(btn_position.btn_left, btn_position.btn_top);
  page.mouse.move(btn_position.btn_left + distance1, btn_position.btn_top, {
    steps: 30,
  });
  await timeout(800);
  page.mouse.move(
    btn_position.btn_left + distance1 + distance2,
    btn_position.btn_top,
    { steps: 20 }
  );
  await timeout(800);
  page.mouse.up();
  await timeout(4000);

  // 判断是否验证成功
  const isSuccess = await page.evaluate(() => {
    return (
      document.querySelector(".geetest_success_radar_tip_content") &&
      document.querySelector(".geetest_success_radar_tip_content").innerHTML
    );
  });
  await timeout(1000);
  // 判断是否需要重新计算距离
  const reDistance = await page.evaluate(() => {
    return (
      document.querySelector(".geetest_result_content") &&
      document.querySelector(".geetest_result_content").innerHTML
    );
  });
  await timeout(1000);
  return {
    isSuccess: isSuccess === "验证成功",
    reDistance: reDistance.includes("怪物吃了拼图"),
  };
}

/**
 * 拖动滑块
 * @param distance 滑动距离
 * */
async function drag(distance) {
  distance = distance || (await calculateDistance());
  const result = await tryValidation(distance.min);
  if (result.isSuccess) {
    await timeout(1000);
    //登录
    console.log("验证成功");
    page.click("#modal-member-login button");
  } else if (result.reDistance) {
    console.log("重新计算滑距离录，重新滑动");
    times = 0;
    await drag(null);
  } else {
    if (distanceError[times]) {
      times++;
      console.log("重新滑动");
      await drag({
        min: distance.max,
        max: distance.max + distanceError[times],
      });
    } else {
      console.log("滑动失败");
      times = 0;
      run();
    }
  }
}

run();
