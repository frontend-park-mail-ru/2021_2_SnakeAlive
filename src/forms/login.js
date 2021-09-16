import {validateLoginData} from "../validation/login.js";
import {sendPostJSONRequest} from "../http/post.js";
import {ValidationError} from "../validation/error.js";
import {formRequire, Form} from "../components/form.js";

function loginUser(email = '', pswd = '') {
    return validateLoginData(email, pswd)
        .then(
            () => sendPostJSONRequest(
                'http://localhost:8080/login',
                {
                    email: email,
                    password: pswd,
                }
            ),
        )
}

let loginForm = null;

function showLoginForm() {
    const inner = document.getElementById('inner');

    let formProperties = new formRequire();
    formProperties.cssClass = "startForm";
    formProperties.button = {
        text: "Войти",
        id: "login",
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
    loginForm.setButtonEvent(
        loginUser,
        function (response) {
            if (response.status === 404) {
                loginForm.setError(new ValidationError("Не зарегистрирован такой адрес электронной почты", "email"));
            } else if (response.status === 400) {
                loginForm.setError(new ValidationError("Неверный пароль", "pswd"));
            } else {
                console.log("?! showResponse(" + response.status + ")")
            }
        },
    );
}

export {showLoginForm, loginUser}