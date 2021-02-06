const fetch = require('axios');

const MERCADOLIBRE_API = 'https://api.mercadolibre.com/';

/**
 * @name searchItems
 * @description get data about items
 * @param {string} searchKey
 * @return {object}
 */

const searchItems = async (searchKey) => {
    const response = await fetch(MERCADOLIBRE_API + 'sites/MLA/search?q=' + searchKey);
    const items = await response.data;

    let itemsResponse = {
        author: {
            name: "Paula",
            lastname: "Salica"
        }, 
        items: []
    }
    
    items.results.map(item => {
        itemsResponse['items'].push({
            id: item.id,
            title: item.title,
            price: {
                currency: item.installments.currency_id,
                mount: item.price
            },
            picture: item.thumbnail,
            condition: item.condition,
            free_shipping: item.shipping.free_shipping
        });
    })

    return itemsResponse;
}

/**
 * @name searchItemData
 * @description get data about item given an itemId 
 * @param {string} itemId
 * @return {object} 
 */

const searchItemData = async (itemId) => {
    const response = await fetch(MERCADOLIBRE_API + 'items/' + itemId);
    const itemData = await response.data;
    const responseDescription = await fetch(MERCADOLIBRE_API + 'items/' + itemId + '/description');
    const itemDecription = await responseDescription.data;
    const description = itemDecription.plain_text.replace('\n\n', ' ').replace('\n', ' ');

    let itemResponse = {
        author: {
            name: "Paula",
            lastname: "Salica"
        }, 
        item: {
            id: itemData.id,
            title: itemData.title,
            price:{
                currency: itemData.currency_id,
                amount: itemData.price,
            },
            picture: itemData.pictures[0].url,
            condition: itemData.condition,
            free_shipping: itemData.shipping.free_shipping,
            sold_quantity: itemData.sold_quantity,
            description: description
        }
    }

   return itemResponse;
}

exports.searchItems = searchItems;
exports.searchItemData = searchItemData;