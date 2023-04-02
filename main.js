const puppeteer = require("puppeteer");

(async () => {
  // 브라우저를 실행한다.
  // 옵션으로 headless모드를 끌 수 있다.
  const browser = await puppeteer.launch({
    headless: false,
  });

  // 새로운 페이지를 연다.
  const page = await browser.newPage();
  // 페이지의 크기를 설정한다.
  await page.setViewport({
    width: 1366,
    height: 768,
  });
  // "https://www.naver.com" URL에 접속한다. (네이버 메인 페이지)
  await page.goto("https://www.naver.com");
})();
