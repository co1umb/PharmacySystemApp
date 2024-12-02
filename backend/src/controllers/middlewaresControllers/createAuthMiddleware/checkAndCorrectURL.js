function checkAndCorrectURL(url) {
  
  const hasHttps = url.startsWith('https:

  
  url = url.replace(/^https?:\/\

  
  url = url.replace(/\/+$/, '');

  const httpType = hasHttps ? 'https:
  return httpType + url;
}

module.exports = checkAndCorrectURL;
