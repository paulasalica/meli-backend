const httpStatus = require('http-status');
const httpError = require('http-errors');

const { searchItems, searchItemData } = require('../services/item');

/**
 * @name getItems
 * @description retrieves items with query as param
 * @param {} req express request
 * @param {} res express response
 * @return {}
 */

const getItems = async(req, res) => {
    const searchKey = req.query.q;
    try {
        if (!searchKey) throw new httpError.BadRequest();
        const itemsResponse = await searchItems(searchKey);
        res.status(httpStatus.OK).send(itemsResponse);
    } catch (error) {
        errorResponse(error);
    }
}

/**
 * @name getItemById
 * @description retrieves item data with itemId as param
 * @param {} req express request
 * @param {} res express response
 * @return {}
 */

const getItemById = async(req, res) => {
    const itemId = req.params.id;
    try {
        if (!itemId) throw new httpError.BadRequest();
        const itemResponse = await searchItemData(itemId);
        res.status(httpStatus.OK).send(itemResponse);
    } catch (error) {
        errorResponse(error);
    }
}

const errorResponse = (error) => {
    res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message || httpStatus[500]
    });
} 

exports.getItems = getItems;
exports.getItemById = getItemById;