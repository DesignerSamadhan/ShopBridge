import { inventoryConstants } from '../_constants';
import { inventoryService } from '../_services';

export const ItemActions = {   
    getAllItems,
    postNewItem,
    updateItem,
    deleteItem    
};

function getAllItems()
{
    return dispatch => {
        dispatch(requestItems());

        inventoryService.getAllItemsFromService()
            .then(
                items => dispatch(successItems(items)),
                error => dispatch(failureItems(error))
            );
    };

    function requestItems() { return { type: inventoryConstants.ITEM_GETALL_REQUEST } }
    function successItems(items) { return { type: inventoryConstants.ITEM_GETALL_SUCCESS, items } }
    function failureItems(error) { return { type: inventoryConstants.ITEM_GETALL_FAILURE, error } }
}

function postNewItem(newItem)
{
    return dispatch => {
        dispatch(addItem(newItem));
      
        inventoryService.addItemService(newItem)
            .then(
                newItem => {dispatch(successAddItem(newItem))},
                error => dispatch(failureAddItem(error))
            );
    };

    function addItem(newItem) { return { type: inventoryConstants.ITEM_ADD_REQUEST, newItem} }
    function successAddItem(newItem) { return { type: inventoryConstants.ITEM_ADD_SUCCESS, newItem } }
    function failureAddItem(error) { return { type: inventoryConstants.ITEM_ADD_FAILURE, error } }
}

function updateItem(item)
{
    return dispatch => {
        dispatch(request(item));
      
        inventoryService.updateItemService(item)
            .then(
                item => {dispatch(success(item))},
                error => dispatch(failure(item, error))
            );
    };

    function request(item) { return { type: inventoryConstants.ITEM_UPDATE_REQUEST, item} }
    function success(item) { return { type: inventoryConstants.ITEM_UPDATE_SUCCESS, item } }
    function failure(item, error) { return { type: inventoryConstants.ITEM_UPDATE_FAILURE, item, error } }
}

function deleteItem(id)
{
    return dispatch => {
        dispatch(request(id));
      
        inventoryService.deleteItemService(id)
            .then(
                newItem => {dispatch(success(id))},
                error => dispatch(failure(id, error))
            );
    };

    function request(id) { return { type: inventoryConstants.ITEM_DELETE_REQUEST, id} }
    function success(id) { return { type: inventoryConstants.ITEM_DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: inventoryConstants.ITEM_DELETE_FAILURE, id, error } }
}