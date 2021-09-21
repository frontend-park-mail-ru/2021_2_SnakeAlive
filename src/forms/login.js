import {validateLoginData} from '../validation/login.js';
import {sendPostJSONRequest} from '../http/post.js';
import {ValidationError} from '../validation/error.js';
import {formRequire, Form} from '../components/form.js';
import {backendEndpoint} from '../constants/endpoints.js';
import {loginURI} from '../constants/uris.js';

function loginUser(email = '', password = '') {
    return validateLoginData(email, password)
        .then(
            () => sendPostJSONRequest(
                backendEndpoint + loginURI,
                {
                    email,
                    password,
                }
            ),
        ).then(
            response => {
                if (response.status === 404) {
                    return Promise.reject(
                        new ValidationError('Не зарегистрирован такой адрес электронной почты', 'email')
                    );
                }
                if (response.status === 400) {
                    return Promise.reject(new ValidationError('Неверный пароль', 'pswd'));
                }

                return response
            });
}

function showLoginForm() {
    const inner = document.getElementById('inner');

    let formProperties = new formRequire();
    formProperties.cssClass = 'startForm';
    formProperties.button = {
        text: 'Войти',
        id: 'login',
        cssClass: 'startBtn'
    };
    formProperties.inputsCssClass = 'startInput';
    formProperties.inputs = [
        {
            type: 'email',
            name: 'Почта',
            id: 'email'
        },
        {
            type: 'password',
            name: 'Пароль',
            id: 'pswd'
        },
    ];
    let loginForm = new Form(formProperties, inner);
    loginForm.setButtonEvent(loginUser);
}

export {showLoginForm, loginUser};