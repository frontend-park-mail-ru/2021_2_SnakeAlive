import {validateLoginData} from "../validation/login.js";
import {sendPostJSONRequest} from "../http/post.js";
import { formRequire, Form } from "../components/form.js";

function loginUser(email = '', pswd = '', repeatedPswd = pswd) {
    console.log(email, pswd, repeatedPswd);
    return validateLoginData(email, pswd, repeatedPswd)
        .then(() => sendPostJSONRequest(
            'http://localhost:9030/login',
            {
                email: email,
                password: pswd,
            }
            ), 
            error => loginForm.setError(error)
        )
}

let loginForm = null;

function showLoginForm(){
    const inner = document.getElementById('inner');

    let formProperties = new formRequire();
    formProperties.cssClass = "startForm";
    formProperties.button = {
                text : "Войти",
                id : "login",
                cssClass: "startBtn"
            };
    formProperties.inputsCssClass = "startInput"
    formProperties.inputs = [
                {
                    type: "email",
                    name: "Почта",
                    id: "email"
                }, 
                {
                    type: "password",
                    name: "Пароль",
                    id: "pswd"
                }, 
            ]                
    loginForm = new Form(formProperties, inner);
    loginForm.setButtonEvent(loginUser);
}

export {showLoginForm, loginUser}