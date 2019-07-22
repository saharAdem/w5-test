const fs = require("fs");
const path = require("path");
const request = require("request");

const handleHomeRoute = (request, response) => {
  const filePath = path.join(__dirname, "..", "public", "index.html");
  fs.readFile(filePath, (error, file) => {
    if (error) {
      console.log(error);
      response.writeHead(500, { "Content-Type": "text/html" });
      response.end("<h1>Sorry, we've had a problem on our end</h1>");
    } else {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(file);
    }
  });
};

const handlePublic = (request, response, url) => {
  const extension = url.split(".")[1];
  const extensionType = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    ico: "image/x-icon",
    jpg: "image/jpeg",
    png: "image/png"
  };
  const filePath = path.join(__dirname, "..", url);

  fs.readFile(filePath, (error, file) => {
    if (error) {
      console.log(error);
      response.writeHead(404, { "Content-Type": "text/html" });
      response.end("<h1>404 file not found</h1>");
    } else {
      response.writeHead(200, { "Content-Type": extensionType[extension] });
      response.end(file);
    }
  });
};

const handleAPI = (req, res) => {
  // add code here!
  url = `http://www.omdbapi.com/?s=star-wars&apikey=5c1977ba`;
  request(url, (err, resp, body) => {
    if (err) {
      res.writeHead(404, {
        "Content-Type": "text/html"
      });
      res.end("<h1>Try again</h1>");
    }

    res.writeHead(200, {
      "Content-Type": "application/json"
    });
    const movie = JSON.parse(body);
    res.end(JSON.stringify(movie));
  });
};

module.exports = {
  handleHomeRoute,
  handlePublic,
  handleAPI
};
