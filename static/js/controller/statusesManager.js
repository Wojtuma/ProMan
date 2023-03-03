import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {handleDragEnter,handleDragOver,handleDragLeave,handleDrop} from "./dragDropManager.js"

export let statusesManager = {
    loadStatuses: async function (boardId) {
        const statuses = await dataHandler.getStatuses();
        for (let status of statuses) {
            const statusBuilder = htmlFactory(htmlTemplates.status);
            const content = statusBuilder(status, boardId);
            domManager.addChild(`.insert-board[data-board-id="${boardId}"]`, content);
            domManager.addEventListener(
                `.status[data-status-id="${status.id}"]`,
                "click",
                deleteButtonHandler
            );
            domManager.addEventListener(
                `.status_text[data-status-id="${status.id}"]`,
                "click",
                () => {let newStatusName = prompt("Please Enter New Name");
                dataHandler.updateStatusName(status.id,newStatusName);
                domManager.refreshPage()}
             );
             domManager.addEventListener(
                `.deleteStatusBtn[data-status-id="${status.id}"]`,
                "click",
                () => {dataHandler.deleteStatus(status.id);
                domManager.refreshPage()}
             );
             domManager.addEventListener(
                `.status[data-status-id="${status.id}"]`,
                "dragenter",
                handleDragEnter
            );
            domManager.addEventListener(
                `.status[data-status-id="${status.id}"]`,
                "dragleave",
                handleDragLeave
            );
            domManager.addEventListener(
                `.status[data-status-id="${status.id}"]`,
                "dragover",
                handleDragOver
            );
            domManager.addEventListener(
                `.status[data-status-id="${status.id}"]`,
                "drop",
                handleDrop
            );
        }
       
    },
    
};

function deleteButtonHandler(clickEvent) {
}