const puppeteer = require("puppeteer");
const devices = require("puppeteer/DeviceDescriptors");
const iPhone = devices["iPhone 6"];
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

let cookie = `adIssem=0; _ga=GA1.2.1817299266.1655038685; track_id=74866fc5a9f46cef0e67a47cee9c4917e9a5db4e81a2669821461561f612ec3ca%3A2%3A%7Bi%3A0%3Bs%3A8%3A%22track_id%22%3Bi%3A1%3Bs%3A51%3A%221237bbbcb41ae6e2c6f48e95498477781656127171.47991088%22%3B%7D; _k_iprec_wd_1=%7C-; referer=%22%5C%2F%5C%2F588ku.com%5C%2F%22; bt_guid=%22a0e0f12c880315a52d7a02372ad00467%22; FIRSTVISITED=1657806199.025; 588ku_login_refer_url=%22https%3A%5C%2F%5C%2F588ku.com%5C%2F%22; success_target_path=%22%5C%2F%5C%2F588ku.com%5C%2F%22; ISREQUEST=1; WEBPARAMS=is_pay=1; ui_588ku=dWlkPTAmdWM9JnVzPSZ0PTEyMzdiYmJjYjQxYWU2ZTJjNmY0OGU5NTQ5ODQ3Nzc4MTY1NjEyNzE3MS40Nzk5MTA4OCZncj0xJnVycz0%3D; ele_search_words=%5B%22tanwei%22%5D; Hm_lvt_6434381c05f6d955403c23f84f441f82=1656940876,1657806228; back_search_words=%5B%22kejichengshi%22%5D; webpage_search_words=%5B%22jiaoyu%22%5D; all_pic_search_words=%5B%22jinrong%22%2C%22xiatian%22%2C%22taiyang%22%2C%22kuaishoudouyinlogo%22%2C%22102558545%22%2C%22shiwu%22%5D; no_login_pv=1; 588KUSSID=f3da11khdvdnv3ekn1anrdg8u6; _k_iprec_1=36.112.204.149; _k_ut_v1=%7B%22ip%22%3A%2236.112.204.149%22%2C%22d%22%3A%222022-07-19%22%2C%22h%22%3A%22%22%2C%22hd%22%3A%22%22%2C%22sem%22%3A%22%22%2C%22host%22%3A%22588ku.com%22%2C%22bm%22%3A9%2C%22kw%22%3A%22%22%7D; Hm_lvt_3e90322e8debb1d06c9c463f41ea984b=1658026957,1658059019,1658064250,1658231837; _gid=GA1.2.794634150.1658231838; Hm_lvt_8226f7457e3273fa68c31fdc4ebf62ff=1658026957,1658059019,1658064250,1658231838; temp_login_uid=17269040; temp_login_avator=%22http%3A%5C%2F%5C%2Fthirdqq.qlogo.cn%5C%2Fqqapp%5C%2F101252414%5C%2FC6CA4469FE3143C119546419CDF24663%5C%2F100%22; temp_login_flag2=1; auth_id=%2217269040%7C%5Cu5de6%5Cu4e0b%5Cu89d2%5Cu7684%5Cu6211%7C1659095966%7C8d32dbe7be7aa189a7424875389f49f7%22; sns=%7B%22token%22%3A%7B%22access_token%22%3A%224213154E49F709FD01AD574EA4FC53B5%22%2C%22expires_in%22%3A%227776000%22%2C%22refresh_token%22%3A%2226EC886C9136C9B0A021F16531A3E2DB%22%2C%22openid%22%3A%22C6CA4469FE3143C119546419CDF24663%22%7D%2C%22type%22%3A%22qq%22%7D; last_login_type=1; IPSSESSION=asa1svrcfmhv3re080eq3pnia2; 588ku_eid=172467%7C1659095977; e_ssid=s588ku62d69ca906aef4.56213343; vipGather=1; growPonitsigncode=1; 60840175e8d41e29906b9e83321fda6c=%220a35a8a8059a99fb4f9570dd8c0a57c7%22; down_type=1; Qs_lvt_474541=1658026956%2C1658059021%2C1658231838%2C1658238939%2C1658238952; keyword=%22%5Cu98df%5Cu7269%22; search:last:keyword=%22%5Cu98df%5Cu7269%22; location=99; login_pv=12; Hm_lpvt_3e90322e8debb1d06c9c463f41ea984b=1658238992; Hm_lpvt_8226f7457e3273fa68c31fdc4ebf62ff=1658238992; Qs_pv_474541=2717167922045082600%2C911834269619390200%2C2374569605899726000%2C3609993037935899600%2C963373235049779800`

async function run() {
  const browser = await puppeteer.launch({
    defaultViewport: null,
    headless: false, //这里我设置成false主要是为了让大家看到效果，设置为true就不会打开浏览器
  });
  page = await browser.newPage();
  // await page.emulate(iPhone);
  await addCookies(cookie, page, '.588ku.com')
  await timeout(2000);
  await page.goto("https://588ku.com/ycpng/13347673.html");
  await timeout(2000);

  // 4.点击验证
  // const down_btn = await page.$(".btns-box")
  // console.log(down_btn);
  await page.click(".show-company-guide");
  // await page.click(".down-file>p");

  await timeout(7000);
  btn_position = await page.evaluate(() => { 
    const { x, y } = document.querySelector(".geetest_slider_button") && document.querySelector(".geetest_slider_button").getBoundingClientRect()
    return {
      btn_left: x,
      btn_top: y + 34
    }
  })

  // btn_position = await getBtnPosition();
  // 5.滑动
  drag(null);
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
  const distance1 = distance - 30;
  const distance2 = 30;

  page.mouse.click(btn_position.btn_left, btn_position.btn_top, {
    delay: 2000,
  });
  page.mouse.down(btn_position.btn_left, btn_position.btn_top);
  page.mouse.move(btn_position.btn_left + distance1, btn_position.btn_top, {
    steps: 30,
  });
  await timeout(1000);
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
