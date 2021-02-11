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
        filters: [],
        items: []
    }
    
    let filters = items.filters[0].values[0].path_from_root;   
    filters.map(filter => {
        itemsResponse['filters'].push({
            name: filter.name
        })
    })
    
    const itemsList = items.results;
    for(let i=0; i<=3; i++) {
        const item = itemsList[i]; 
        const price = getPrice(item.price);
        const amount = price[0];
        const decimals = price[1];

        itemsResponse['items'].push({
            id: item.id,
            title: item.title,
            price: {
                currency: item.installments.currency_id,
                amount: amount,
                decimals: decimals
            },
            picture: item.thumbnail,
            condition: item.condition,
            free_shipping: item.shipping.free_shipping,
            city_name: item.address.city_name
        });
    }

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

    const price = getPrice(itemData.price);
    let amount = price[0];
    let decimals = price[1];

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
                amount: amount,
                decimals: decimals
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

function getPrice(priceAmount) {
    let amount = priceAmount;
    let decimals = "00";
    if (amount.toString().includes('.')) {
        let amountSplit =  amount.toString().split('.');
        amount = amountSplit[0];
        decimals = amountSplit[1];
    } 
    return [amount, decimals];
}

exports.searchItems = searchItems;
exports.searchItemData = searchItemData;