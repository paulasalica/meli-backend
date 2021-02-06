exports.BASE_URLs = new Map();
BASE_URLs.set('MERCADOLIBRE_API', 'https://api.mercadolibre.com/');
BASE_URLs.set('PATH_SEARCH', 'sites/MLA/search?q=');
BASE_URLs.set('PATH_ITEMS', 'items/');

function getBaseUrl(url) {
    return BASE_URLs.get(url);
}

module.exports = getBaseUrl;