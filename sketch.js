let capture;
let handPose;
let hands = [];

function preload() {
  // 載入 handPose 模型
  handPose = ml5.handPose();
}

function setup() {
  // 建立全螢幕畫布
  createCanvas(windowWidth, windowHeight);
  // 擷取攝影機影像
  capture = createCapture(VIDEO);
  // 隱藏預設產生的 HTML5 video 元素
  capture.hide();
  // 開始偵測手部
  handPose.detectStart(capture, gotHands);
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

  // 繪製手部連線
  drawHandLines(hands, x, y, displayW, displayH);
}

function gotHands(results) {
  // 儲存偵測結果
  hands = results;
}

function drawHandLines(hands, offsetX, offsetY, displayW, displayH) {
  stroke(255, 0, 0); // 設定線條顏色（例如紅色）
  strokeWeight(3);
  noFill();

  // 定義需要串接的編號群組
  const groups = [
    [0, 1, 2, 3, 4],    // 大拇指（含手腕）
    [5, 6, 7, 8],       // 食指
    [9, 10, 11, 12],    // 中指
    [13, 14, 15, 16],   // 無名指
    [17, 18, 19, 20]    // 小指
  ];

  for (let hand of hands) {
    for (let group of groups) {
      beginShape();
      for (let idx of group) {
        let kp = hand.keypoints[idx];
        // 將原始影像座標映射到畫布上的縮放位置
        let screenX = map(kp.x, 0, capture.width, offsetX, offsetX + displayW);
        let screenY = map(kp.y, 0, capture.height, offsetY, offsetY + displayH);
        vertex(screenX, screenY);
      }
      endShape();
    }
  }
}

function windowResized() {
  // 當視窗大小改變時，自動調整畫布
  resizeCanvas(windowWidth, windowHeight);
}
