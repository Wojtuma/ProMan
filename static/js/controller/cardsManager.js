import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {handleDragEnd, handleDragStart} from "./dragDropManager.js"

const renameBtn = ".renameBtn"

export let cardsManager = {
    loadCards: async function (boardId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);

        for (let card of cards) {
            
                    const cardBuilder = htmlFactory(htmlTemplates.card);
                    const content = cardBuilder(card);
                    domManager.addChild(`.status[data-status-id="${card.status_id}"][data-board-id="${boardId}"]`, content);
                    domManager.addEventListener(
                    `.card[data-card-id="${card.id}"]`,
                    "click",
                    deleteButtonHandler
                    
            );
            domManager.addEventListener(
                `.removeBtn[data-card-id="${card.id}"]`,
                "click",
                (event) => {event.stopPropagation()
                    dataHandler.deleteCard(card.id),
                    domManager.refreshPage()}
            
            );
            domManager.addEventListener(
                `.renameBtn[data-card-id="${card.id}"]`,
                "click",
                (event) => {event.stopPropagation()
                    let newCardName = prompt("Please input new text","")
                    let status = document.getElementById(card.id).getAttribute("data-status-id")
                    dataHandler.updateCard(card.id,newCardName, status)
                    document.getElementById("T"+card.id).innerText=newCardName}
                    // 
                    
                    // domManager.refreshPage()}
        
            );
            domManager.addEventListener(
                `.card[data-card-id="${card.id}"]`,
                "dragstart",
                handleDragStart
            );
            domManager.addEventListener(
                `.card[data-card-id="${card.id}"]`,
                "dragend",
                handleDragEnd
            );
    }
    
},
};



function deleteButtonHandler(clickEvent) {
}

