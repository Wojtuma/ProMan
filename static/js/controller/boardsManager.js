import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";
import {statusesManager} from "./statusesManager.js";

export let boardsManager = {
    loadBoards: async function () {
        const boards = await dataHandler.getBoards();
        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board);
            domManager.addChild("#root", content);
            domManager.addEventListener(
                `.toggle-board-button[data-board-id="${board.id}"]`,
                "click",showHideButtonHandler
                
            );
            domManager.addEventListener(
                `.board[data-board-id="${board.id}"]`,
                "click",
                renameBoard 
            );
            domManager.addEventListener(
                `.delete-board-button[data-board-id="${board.id}"]`,
                "click",
                removeBoard 
            );
            domManager.addEventListener(
                `.board-open[data-board-id="${board.id}"]`,
                "click",
                () => {let object_open = document.querySelector(`.board-open[data-board-id="${board.id}"]`);
                        let object_close = document.querySelector(`.board[data-board-id="${board.id}"]`);
                        closeBoard(board.id,object_open,object_close); }
             );
             domManager.addEventListener(
                `.addStatusBtn[data-board-id="${board.id}"]`,
                "click",
                () => {let newStatusName = prompt("Please Enter Name","");
                dataHandler.createNewStatus(newStatusName);
                domManager.refreshPage()
                
            }
             );
             domManager.addEventListener(
                `.addCardBtn[data-board-id="${board.id}"]`,
                "click",
                () => {let newCardName = prompt("Please Enter Name","");
                            dataHandler.createNewCard(newCardName, board.id);
                            domManager.refreshPage()
                
            }
             ); 
        }
        
    },
    
};

async function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    
    const button = document.querySelector(`.toggle-board-button[data-board-id="${boardId}"]`)
    button.style.display="none";
    document.querySelector(`.insert-board[data-board-id="${boardId}"]`).innerHTML="";
    await statusesManager.loadStatuses(boardId);
    cardsManager.loadCards(boardId);
    
    document.querySelector(`.board[data-board-id="${boardId}"]`).style.display="none";
    document.querySelector(`.board-open[data-board-id="${boardId}"]`).style.display="block";
    document.querySelector(`.insert-board[data-board-id="${boardId}"]`).style.display="block";
    document.querySelector(`.addStatusBtn[data-board-id="${boardId}"]`).style.display="inline-block";
    document.querySelector(`.addCardBtn[data-board-id="${boardId}"]`).style.display="inline-block";
    
}

function closeBoard(boardId,object,object_new){
        object.style.display="none";
        object_new.style.display="block"
        document.querySelector(`.insert-board[data-board-id="${boardId}"]`).style.display="none";
        document.querySelector(`.toggle-board-button[data-board-id="${boardId}"]`).style.display="inline-block"
        document.querySelector(`.addStatusBtn[data-board-id="${boardId}"]`).style.display="none"
        document.querySelector(`.addCardBtn[data-board-id="${boardId}"]`).style.display="none"
        // document.querySelector(`.insert-board[data-board-id=${boardId}]`).style.display="none";

}

export function createAddBoardButton(){
    let div = document.getElementById('root')
    div.innerHTML=`<input id='input' style='display: none'></input>
                    <button id='saveNewBoard' style='display: none'>Save</button>
                    <button id='1' onclick="document.getElementById('input').style.display='block';
                    document.getElementById('saveNewBoard').style.display='block'">Create new board</button>`
    let saveBtn = document.getElementById('saveNewBoard')
    let data = document.getElementById('input')
    saveBtn.addEventListener("click", () => {  dataHandler.createNewBoard(data.value), domManager.refreshPage()
        });
    
}

function renameBoard(clickEvent){
    const boardId = clickEvent.target.dataset.boardId;
    const boardName = document.querySelector(`.board[data-board-id="${boardId}"]`)
    boardName.style.display='none'
    document.querySelector(`.toggle-board-button[data-board-id="${boardId}"]`).style.display='none'
    const inputBoard = document.querySelector(`.input-board[data-board-id="${boardId}"]`)
    inputBoard.innerHTML=`<input class="input" value="${boardName.textContent}" data-board-id="${boardId}"></input><button class="saveBtn" data-board-id="${boardId}">Save</button><button class="exitBtn" data-board-id="${boardId}">Exit</button>`
    let saveBtn =document.querySelector(`.saveBtn[data-board-id="${boardId}"]`);
    let exitBtn =document.querySelector(`.exitBtn[data-board-id="${boardId}"]`);
    saveBtn.addEventListener("click", () => {let inputValue = document.querySelector(`.input[data-board-id="${boardId}"]`); dataHandler.updateBoardName(boardId,inputValue.value); domManager.refreshPage()});
    exitBtn.addEventListener("click", () => {document.querySelector(`.input[data-board-id="${boardId}"]`).style.display="none",boardName.style.display='block',exitBtn.style.display="none",saveBtn.style.display="none", document.querySelector(`.toggle-board-button[data-board-id="${boardId}"]`).style.display='inline-block' });
    
    
};

function removeBoard(clickEvent){
    const boardId = clickEvent.target.dataset.boardId;
    dataHandler.deleteBoard(boardId);
    domManager.refreshPage()}

    

    
    