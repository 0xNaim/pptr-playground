const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    defaultViewport: false,
  });
  const page = await browser.newPage();
  await page.goto('https://chaldal.com/frozen-fish');

  const productsHandle = await page.$$('.productPane .product');

  const items = [];
  for (products of productsHandle) {
    let image, title, weight, price, discountPrice;
    try {
      image = await page.evaluate(
        (el) =>
          el.querySelector('.imageWrapperWrapper img').getAttribute('src'),
        products
      );
    } catch (error) {}

    try {
      title = await page.evaluate(
        (el) => el.querySelector('.imageWrapper > .name').textContent,
        products
      );
    } catch (error) {}

    try {
      weight = await page.evaluate(
        (el) => el.querySelector('.imageWrapper > .subText').innerText,
        products
      );
    } catch (error) {}

    try {
      price = await page.evaluate(
        (el) =>
          el.querySelector('.imageWrapper .price span:nth-child(2)').innerText,
        products
      );
    } catch (error) {}

    try {
      discountPrice = await page.evaluate(
        (el) =>
          el.querySelector(
            '.imageWrapper .discountedPriceSection .discountedPrice span:nth-child(2)'
          ).innerText,
        products
      );
    } catch (error) {}

    items.push({
      image,
      title,
      weight,
      price,
      discountPrice,
    });
  }
  console.log(items.length);

  await browser.close();
})();
