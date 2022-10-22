const http = require("http");
const url = require("url");
const fs = require("fs");
const slugify = require("slugify");
const replaceTemplate = require("./modules/replaceTemplate");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

dataObj.reduce((acc, cur) => {
  cur["id"] = slugify(cur.productName, { lower: true });
  return cur;
}, []);

const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // Overview page
  if (["/", "/overview"].includes(pathname)) {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardHTML = dataObj
      .map((el) => replaceTemplate(templateCard, el))
      .join("");

    const output = templateOverview.replace("{%PRODUCT_CARDS%}", cardHTML);

    res.end(output);

    // Product page
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });

    const product = dataObj[dataObj.map((e) => e.id).indexOf(query.id)];
    const output = replaceTemplate(templateProduct, product);

    res.end(output);

    // API
  } else if (pathname === "/api") {
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>Page not found</h1>");
  }
});

server.listen(8001, "127.0.0.1", () => {
  console.log("🚀 Listening to requests on port 8001");
});
