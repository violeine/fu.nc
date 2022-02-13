import Chromium from "chrome-aws-lambda";

export const fetchPdf = async () => {
  const browser = await Chromium.puppeteer.launch({
    args: Chromium.args,
    defaultViewport: Chromium.defaultViewport,
    executablePath: await Chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();
  await page.goto("https://violeine.github.io/re.sume", {
    waitUntil: "networkidle2",
  });
  const pdf = await page.pdf({
    format: "legal",
    margin: {
      top: "0.39in",
      bottom: "0.38in",
      left: "0.39in",
      right: "0.38in",
    },
    printBackground: true,
  });
  await browser.close();
  return pdf;
};
