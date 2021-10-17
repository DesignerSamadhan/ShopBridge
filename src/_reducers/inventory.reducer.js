import { inventoryConstants } from "../_constants";

export function InventoryItems(state = {}, action){
    switch(action.type){

        case inventoryConstants.ITEM_GETALL_REQUEST:
        return {          
            loading: true
        };
        case inventoryConstants.ITEM_GETALL_SUCCESS:
        return { 
            allItems: action.items          
        };
        case inventoryConstants.ITEM_GETALL_FAILURE:
        return {           
            error: action.error         
        };

        case inventoryConstants.ITEM_ADD_REQUEST:
        return {    
            ...state,      
            loading: true            
        };
        case inventoryConstants.ITEM_ADD_SUCCESS:
            let addItem = { ...action.newItem, id: state.allItems.length > 0 ? state.allItems[state.allItems.length - 1].id + 1 : 1 };          
        return {             
            allItems: [...state.allItems, addItem],
            loading:false
        };
        case inventoryConstants.ITEM_ADD_FAILURE:
        return {           
            error: action.error         
        };

        case inventoryConstants.ITEM_UPDATE_REQUEST:
        return { 
            ...state,         
            loading: true           
        };
        case inventoryConstants.ITEM_UPDATE_SUCCESS:
        return {   
            ...state,                  
            allItems: state.allItems.map(item =>
                item.id === action.item.id
            ? { ...action.item }
            : item),
            loading:false
        };
        case inventoryConstants.ITEM_UPDATE_FAILURE:
        return {           
            error: action.error         
        };

        case inventoryConstants.ITEM_DELETE_REQUEST:
        return {          
            ...state,
            allItems: state.allItems.map(item =>
                item.id === action.id
            ? { ...item, deleting: true }
            : item)
        };
        case inventoryConstants.ITEM_DELETE_SUCCESS:
        return { 
            allItems: state.allItems.filter(item => item.id !== action.id)  
        };
        case inventoryConstants.ITEM_DELETE_FAILURE:
        return {           
            ...state,
            allItems: state.allItems.map(item => {
          if (item.id === action.id) {           
            const { deleting, ...itemCopy } = item;          
            return { ...itemCopy, deleteError: action.error };
          }

          return item;
        })     
        };

        default:
            return state        
    }

}