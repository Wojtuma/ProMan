import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";

export let loginManager = {
    loginRegisterManager: async function () {
            const registerLoginButtonBuilder = htmlFactory(htmlTemplates.register);
            const content = registerLoginButtonBuilder();
            domManager.addChild("#reg_log_buttons", content);
            /* domManager.addEventListener(
                `<div id="reg_log_buttons"></div>`,
                "click",showHideButtonHandler
                
            ); */

            domManager.addEventListener(
                `.go-to-reg-form`,
                "click",
                createRegisterForm
            );
            
            domManager.addEventListener(
                `.go-to-log-form`,
                "click",
                createLoginForm
            );
            
            domManager.addEventListener(
                `.hide-reg-form`,
                "click",
                showHideRegister
            );

            domManager.addEventListener(
                `.hide-log-form`,
                "click",
                showHideLogin
            );
        
    },
    
};

export function createRegisterForm(){
 let div = document.getElementById('register-form')
    div.innerHTML=` <form action="/api/register/" method="POST">
                        <input class="input type="text" name="user_name" placeholder="Username" required><br>
                        <input class="input type="password" name="password" placeholder="Password" required><br>
                        <input class="input type="password" name="repeat password" placeholder="Repeat Password" required><br>
                        <button id="registerButton" type="submit">Register</button>
                    </form>
                    `
    document.querySelector("#register-form").style.display="block";
    document.querySelector("#registerButton").style.display="block";
    document.querySelector(".hide-reg-form").style.display="block";
    document.querySelector(".go-to-log-form").style.display="none";
    document.querySelector(".go-to-reg-form").style.display="none";
    let saveBtn = document.getElementById('registerButton')
    let data = document.getElementById('input')
    console.log("Register data: ", data)
    saveBtn.addEventListener("click", () => {  dataHandler.registerNewUser(data.value), domManager.refreshPage()
        }); 
    
}

export function createLoginForm(){
    let div = document.getElementById('login-form')
    div.innerHTML=` <form action="/api/login/" method="POST">
                        <input class="input type="text" name="user_name" placeholder="Username" required><br>
                        <input class="input type="password" name="password" placeholder="Password" required><br>
                        <button id="loginButton" type="submit">Login</button>
                    </form>
                    `
    document.querySelector("#login-form").style.display="block";
    document.querySelector("#loginButton").style.display="block";
    document.querySelector(".hide-log-form").style.display="block";
    document.querySelector(".go-to-log-form").style.display="none";
    document.querySelector(".go-to-reg-form").style.display="none";
    let loginBtn = document.getElementById('loginButton')
    let data = document.getElementById('input')
    console.log("Login data: ", data)
    loginBtn.addEventListener("click", () => {  dataHandler.loginUser(data.value), domManager.refreshPage()
        });
    
}

async function showHideRegister() {
    const list = [
    document.getElementById('register-form'),
    document.getElementById('registerButton'),
    document.querySelector('.hide-reg-form'),
    document.querySelector('.go-to-reg-form'),
    document.querySelector('.go-to-log-form')
    ]
    for(const item of list){
        if (item.style.display === "none") {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    }
}

async function showHideLogin() {
    const list = [
    document.getElementById('login-form'),
    document.getElementById('loginButton'),
    document.querySelector('.hide-log-form'),
    document.querySelector('.go-to-reg-form'),
    document.querySelector('.go-to-log-form')
    ]
    for(const item of list){
        if (item.style.display === "none") {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    }
}
