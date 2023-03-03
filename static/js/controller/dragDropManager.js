import {dataHandler} from "../data/dataHandler.js";
import {domManager} from "../view/domManager.js";
import { boardsManager } from "./boardsManager.js";
import { cardsManager } from "./cardsManager.js";
import { statusesManager } from "./statusesManager.js";


let draggedCard= {
    originStatusId:0,
    destinationStatusId:0,
    cardName:'',
    cardId:0,
    boardId:0
}


let originStatus=null
let destinationStatus=null
let card=null

export function handleDragStart(e){
    let x=e.target
    draggedCard.cardId=x.dataset.cardId
    draggedCard.cardName=x.dataset.cardName
    draggedCard.originStatusId=x.dataset.statusId
    draggedCard.boardId=x.dataset.boardId
    card =document.querySelector(`.card[data-card-id="${draggedCard.cardId}"]`)
    originStatus=`.status[data-status-id="${draggedCard.originStatusId}"]`
    // console.log(`${card} card`)
    // console.log(`${originStatus} status start`)
    // e.dataTransfer.setData("text", e.target.dataset.cardId);
    e.dataTransfer.setData("number", e.target.dataset.cardId);
} 

export function handleDragEnd(e){

}
//statuses functions
export function handleDragEnter(e){
   
    
}
export function handleDragOver(e){
    e.preventDefault();
    
}
export function handleDragLeave(e){
  
    
}
export function handleDrop(e){
    e.preventDefault();
    draggedCard.destinationStatusId=e.target.dataset.statusId
    destinationStatus=`.status[data-status-id="${draggedCard.destinationStatusId}"]`
    // console.log(`${destinationStatus} status stop`)
    dataHandler.updateCard(draggedCard.cardId,draggedCard.cardName,draggedCard.destinationStatusId)
    // card.classList.add('hidden')
    // console.log(`${card.classList} class list`)
    // e.target.insertAdjacentHTML('beforeend', card)
    let childnr = e.dataTransfer.getData("number", e.target.dataset.cardId);
    // let child=`<div class="card" draggable="true" data-status-id=${draggedCard.destinationStatusId} data-board-id="${draggedCard.boardId}" data-card-id="${draggedCard.cardId}" data-card-name="${draggedCard.cardName}">${draggedCard.cardName}
    // <button class="removeBtn" data-card-id="${draggedCard.cardId}" style="display:inline-block">#</button>
    // <button class="renameBtn" data-card-id="${draggedCard.cardId}" data-status-id=${draggedCard.destinationStatusId} style="display:inline-block">R</button>
    // </div>`
    
    document.getElementById(childnr).setAttribute("data-status-id",draggedCard.destinationStatusId);
    document.querySelector(`.renameBtn[data-card-id="${draggedCard.cardId}"]`).setAttribute("data-status-id",draggedCard.destinationStatusId);
    e.target.appendChild(document.getElementById(childnr));
    // reload()

    


    
    
}
async function reload(){
    document.querySelector(`.insert-board[data-board-id="1"]`).innerHTML="";
    await statusesManager.loadStatuses(1);
    cardsManager.loadCards(1);
}