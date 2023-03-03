import {boardsManager,createAddBoardButton} from "./controller/boardsManager.js";
import { cardsManager } from "./controller/cardsManager.js";
import { htmlFactory, htmlTemplates,  } from "./view/htmlFactory.js";
import {loginManager, createRegisterForm} from "./controller/loginManager.js";

export function init() {
    loginManager.loginRegisterManager();
    createAddBoardButton();
    
    boardsManager.loadBoards();

}

init();
