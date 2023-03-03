import {dataHandler} from "../data/dataHandler.js";
export const htmlTemplates = {
    board: 1,
    card: 2,
    status: 3,
    register: 4
}

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
    [htmlTemplates.card]: cardBuilder,
    [htmlTemplates.status]: statusBuilder,
    [htmlTemplates.register]: registerLoginButtonBuilder,
    
};

export function htmlFactory(template) {
    if (builderFunctions.hasOwnProperty(template)) {
        return builderFunctions[template];
    }

    console.error("Undefined template: " + template);

    return () => {
        return "";
    };
}




function boardBuilder(board) {
    return `<div class="board-container">
                <div class="board" title=${board.title} data-board-id=${board.id}>${board.title}</div>
                <div class="input-board" data-board-id=${board.id}></div>
                
                
            </div>
            <div class="board-open" title=${board.title} style="display:none" data-board-id=${board.id}>${board.title}<br></div>
            <button class="addStatusBtn" data-board-id=${board.id} style="display:none">Add new Status</button>
            <div class="insert-board" data-board-id=${board.id}></div>
            <button class="addCardBtn" data-board-id=${board.id} style="display:none">Add new Card</button>
            <button class="delete-board-button" data-board-id=${board.id}>Delete</button>
            <button class="toggle-board-button" value="Show Cards" data-board-id="${board.id}">Show Cards</button>
            
            `;
}           

export function cardBuilder(card) {
    return `<div class="card" id="${card.id}" draggable="true" 
    data-status-id="${card.status_id}" data-board-id="${card.board_id}" 
    data-card-id="${card.id}" data-card-name="${card.title}">
    <div class="cardTitle" id=T${card.id}>${card.title}</div>
     <button class="removeBtn" data-card-id="${card.id}" style="display:inline-block">#</button>
     <button class="renameBtn" data-card-id="${card.id}" 
     data-status-id="${card.status_id}"" style="display:inline-block">R</button>
     </div>
            `;
}

function statusBuilder(status,boardId) {
    
    return `<div class="status" data-status-id="${status.id}" data-board-id="${boardId}" style="display:inline-block"> <p class="status_text" data-status-id="${status.id}" data-board-id="${boardId}">${status.title}</p><button class="deleteStatusBtn" data-status-id ="${status.id}">X</button></div>`;
}

export function registerLoginButtonBuilder(){
    return `<div id="log-reg-buttons">
                <button class="hide-reg-form" value="< Back">< Back</button>
                <button class="hide-log-form" value="< Back">< Back</button>
                <button class="go-to-logout" value="Logout">Logout</button>
                <button class="go-to-reg-form" value="Register">Register</button>
                <button class="go-to-log-form" value="Login">Login</button>
            </div>`
}
