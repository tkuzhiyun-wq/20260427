let capture;

function setup() {
  // 建立全螢幕畫布
  createCanvas(windowWidth, windowHeight);
  // 擷取攝影機影像
  capture = createCapture(VIDEO);
  // 隱藏預設產生的 HTML5 video 元素
  capture.hide();
}

function draw() {
  // 設定背景顏色為 #e7c6ff
  background('#e7c6ff');

  // 設定影像顯示的大小為全螢幕寬高的 50%
  let displayW = width * 0.5;
  let displayH = height * 0.5;

  // 計算置中座標
  let x = (width - displayW) / 2;
  let y = (height - displayH) / 2;

  // 繪製擷取到的影像
  image(capture, x, y, displayW, displayH);
}

function windowResized() {
  // 當視窗大小改變時，自動調整畫布
  resizeCanvas(windowWidth, windowHeight);
}
