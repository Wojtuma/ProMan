export let dataHandler = {
    getBoards: async function () {
        return await apiGet("/api/boards");
    },
    getBoard: async function (boardId) {
        return await apiGet(`/api/board/${boardId}`)
    },
    getStatuses: async function () {
        // the statuses are retrieved and then the callback function is called with the statuses
        return await apiGet(`/api/statuses`);
    },
    getStatus: async function (statusId) {
        // the status is retrieved and then the callback function is called with the status
    },
    getCardsByBoardId: async function (boardId) {
        return await apiGet(`/api/boards/${boardId}/cards/`);
    },
    getCard: async function (boardId,cardId) {
        return await apiGet(`/api/boards/${boardId}/cards/${cardId}`)
    },
    createNewBoard: async function (boardTitle) { 
        return await apiPost('/api/boards/', {title: boardTitle});
    },
    createNewCard: async function (cardTitle, boardId) {
        return await apiPost(`/api/${boardId}/cards`, {title: cardTitle})
    },
    updateBoardName: async function (boardId,title) {
        let data =  {'boardId': boardId, 'name': title }
        return await apiPut(`/api/boards/${boardId}`, data)
    },
    deleteBoard: async function (boardId) { 
        return await apiDelete(`/api/boards/${boardId}`);
    },
    createNewStatus: async function (statusTitle) {
        return await apiPost(`/api/statuses/`, {title: statusTitle});
    },
    updateStatusName: async function (statusId,title) {
        let data =  {'statusId': statusId, 'name': title }
        return await apiPut(`/api/statuses/${statusId}`, data)
    },
    updateCard: async function (cardId,name,statusId) {
            let data =  {'cardId': cardId, 'name': name,'status': statusId}
            return await apiPut(`api/cards/${cardId}`, data)

    },
    deleteStatus: async function (statusId) { 
        return await apiDelete(`/api/statuses/${statusId}`);
    },
    deleteCard: async function (card_id){
        return await apiDelete(`/api/cards/${card_id}`);
    },
    getCards: async function(){
        return await apiGet(`/api/cards`)
    },
    registerNewUser: async function (register_form, hashed_password) { 
        return await apiPost('/api/register/', {'user_name': register_form['user_name'], 'password' : hashed_password});
    },
    logUserIn: async function (user_name, password) {
        return await apiPost('api/users/login', {'user_name': user_name, 'password': password});
    },
    logUserOut: async function() {
        await apiGet('api/users/logout')
    }
};

async function apiGet(url) {
    let response = await fetch(url, {
        method: "GET",
    });
    if (response.ok) {
        return await response.json();
    }
}

async function apiPost(url, payload) {
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    ;
    if (response.ok) {
    return await response.json();
}}
async function apiDelete(url) {
    let response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },  
    });
}

async function apiPut(url, data) {
    let response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    ;
    if (response.ok) {
    return await response.json();
    }
}

async function apiPatch(url) {

}