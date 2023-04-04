const puppeteer = require("puppeteer");

(async () => {
  // 네이버 id, pw 입력
  const naverId = "aesopx6";
  const naverPw = "Overthew4ves!";
  const browser = await puppeteer.launch({
    headless: false, // 브라우저 실행 여부
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", // macOS 크롬 브라우저 경로
  }); // puppeteer 시작
  // const pages = await browser.newPage() // 새로운 탭 생성
  // const pages = await browser.pages()
  const page = (await browser.pages())[0]; // 첫 번째 탭
  try {
    await page.goto("https://www.naver.com"); // 해당 페이지로 이동
  } catch (e) {
    const errorMsg =
      "오류 발생! \n 홈 페이지에 연결할 수 없습니다. 다시 확인 해주세요.";
    throw Error("브라우저를 실행할 수 없습니다: " + e);
    console.log(errorMsg, e);
  }

  await page.bringToFront(); // 탭 전환
  await page.setViewport({
    // 화면 크기 설정
    width: 1280,
    height: 1024,
  });

  //await page.waitForNavigation();
  try {
    await page.click("#account > a"); // 클릭 이벤트
  } catch (e) {
    let errorMsg = "오류 발생! \n 네이버 로그인 버튼을 클릭할 수 없습니다.";
    console.log(errorMsg, e);
  }

  try {
    // 네이버 자동 로그인
    await page.evaluate(
      (id, pw) => {
        document.querySelector('input[name="id"]').value = id;
        document.querySelector('input[name="pw"]').value = pw;
      },
      naverId,
      naverPw
    );
  } catch (e) {
    let errorMsg = "오류 발생! \n ID, PW 입력불가!";
    console.log(errorMsg, e);
  }

  try {
    await page.waitForTimeout(500);
    await page.waitForSelector(".btn_login");
    await page.click(".btn_login");
  } catch (e) {
    let errorMsg = "오류 발생! \n 로그인하기 버튼 클릭 불가능!";
    console.log(errorMsg, e);
  }

  try {
    await page.waitForTimeout(500);
    await page.waitForSelector('a[id="new.dontsave"]');
    await page.click('a[id="new.dontsave"]');
  } catch (e) {
    let errorMsg = "오류 발생! \n 자주 로그인하는 페이지 버튼 클릭 불가능!";
    console.log(errorMsg, e);
  }

  try {
    await page.goto("https://brand.naver.com/asics/products/6396185213"); // 원하는 상품 상세 페이지로 이동
  } catch (e) {
    const errorMsg =
      "오류 발생! \n 상품 페이지에 연결할 수 없습니다. 다시 확인 해주세요.";
    throw Error("상품 페이지에 연결할 수 없습니다.: " + e);
    console.log(errorMsg, e);
  }

  // 품목 선택 -> 사이즈 선택 -> 구매하기버튼 클릭
  try {
    await page.waitForSelector(
      "#content > div > div._2-I30XS1lA > div._2QCa6wHHPy > fieldset > div.bd_2dy3Y > div:nth-child(1)"
    );
    await page.click(
      "#content > div > div._2-I30XS1lA > div._2QCa6wHHPy > fieldset > div.bd_2dy3Y > div:nth-child(1)"
    );
    await page.waitForSelector(
      "#content > div > div._2-I30XS1lA > div._2QCa6wHHPy > fieldset > div.bd_2dy3Y > div:nth-child(1) > ul > li"
    );
    await page.click(
      "#content > div > div._2-I30XS1lA > div._2QCa6wHHPy > fieldset > div.bd_2dy3Y > div:nth-child(1) > ul > li"
    );
    await page.waitForSelector(
      "#content > div > div._2-I30XS1lA > div._2QCa6wHHPy > fieldset > div.bd_2dy3Y > div:nth-child(2)"
    );
    await page.click(
      "#content > div > div._2-I30XS1lA > div._2QCa6wHHPy > fieldset > div.bd_2dy3Y > div:nth-child(2)"
    );
    await page.waitForSelector(
      "#content > div > div._2-I30XS1lA > div._2QCa6wHHPy > fieldset > div.bd_2dy3Y > div:nth-child(2) > ul > li:nth-child(3)"
    );
    await page.click(
      "#content > div > div._2-I30XS1lA > div._2QCa6wHHPy > fieldset > div.bd_2dy3Y > div:nth-child(2) > ul > li:nth-child(3)"
    );
    await page.click(
      "#content > div > div._2-I30XS1lA > div._2QCa6wHHPy > fieldset > div.XqRGHcrncz > div:nth-child(1) > div"
    );
  } catch (e) {
    const errorMsg =
      "오류 발생! \n 상품 페이지에 연결할 수 없습니다. 다시 확인 해주세요.";
    throw Error("상품 결제창까지 전달하지 못했습니다. " + e);
    console.log(errorMsg, e);
  }

  // 일반 결제 클릭 -> 나중에 결제 클릭 -> 결제완료 버튼 클릭
  try {
    await page.waitForTimeout(1500);
    await page.waitForSelector("#generalPaymentsRadio");
    await page.click("#generalPaymentsRadio");

    await page.waitForSelector("#pay3");
    await page.click("#pay3");

    await page.waitForSelector(
      "#orderForm > div > div.payment_agree_wrap > button"
    );
    await page.click("#orderForm > div > div.payment_agree_wrap > button");
  } catch (e) {
    const errorMsg =
      "오류 발생! \n 상품 페이지에 연결할 수 없습니다. 다시 확인 해주세요.";
    throw Error("결제 페이지 내에서 요소를 찾을 수 없습니다. " + e);
    console.log(errorMsg, e);
  }

  // await page.goto("https://google.com"); // 페이지 이동
  // await page.goBack(); // 이전 페이지 이동
  // await page.reload(); // 새로고침
  // await page.goForward(); // 다음 페이지 이동

  // await browser.close(); // 브라우저 종료
})();

// id, pw, smart link, 옵션 번째수,
