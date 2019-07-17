const {handleHomeRoute, handlePublic, handleAPI} = require('./handlers.js');

const router = (request, response) => {
  const url = request.url;
  if (url === '/') {
    handleHomeRoute(request, response);
  } else if (url.indexOf('public') !== -1) {
    handlePublic(request, response, url);
  } else if (url === '/api') {
    handleAPI(request, response)
  }
  else {
    response.writeHead(404, {'Content-Type': 'text/html'});
    response.end('<h1>404 file not found</h1>');
  }
};

module.exports = router;