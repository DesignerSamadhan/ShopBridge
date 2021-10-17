export const inventoryService = {   
    getAllItemsFromService,
    addItemService,
    updateItemService,
    deleteItemService
};

function getAllItemsFromService() {
    const requestOptions = {
        method: 'GET',
    };
    return fetch('http://localhost:3333/inventoryList', requestOptions).then(handleResponse);   
}

function deleteItemService(id) {
    const requestOptions = {
        method: 'DELETE'
    };

    return fetch(`http://localhost:3333/inventoryList/${id}`, requestOptions).then(handleResponse);
}

function updateItemService(item) {

    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(item)
    };

    return fetch(`http://localhost:3333/inventoryList/${item.id}`, requestOptions).then(handleResponse);;
    
}

function addItemService(item) {

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        async:true,
        body: JSON.stringify(item)
    };

    return fetch(`http://localhost:3333/inventoryList`, requestOptions).then(handleResponse);;
    
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                //logout();
                //window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}