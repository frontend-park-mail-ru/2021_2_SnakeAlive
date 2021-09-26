import {backendEndpoint, registerURI} from '../constants';
import {validateRegisterData, ValidationError} from '../validation';
import {FormConfig, Form, showForm} from '../components';
import {sendPostJSONRequest} from '../http';
import {flushPopup} from "./flush_popup.js";

const registerUser = (registerInputs) => {
    return validateRegisterData(registerInputs)
        .then(() => {
            const {email} = registerInputs;
            const password = registerInputs.pswd;
            const {name} = registerInputs;
            const {surname} = registerInputs;
            return sendPostJSONRequest(backendEndpoint + registerURI, {
                email,
                password,
                name,
                surname,
            });
        })
        .then(response => {
            if (response.status === 400) {
                return Promise.reject(
                    new ValidationError('Пользователь с такой почтой уже существует', 'email')
                );
            }
            return response;
        });
}

const showRegisterForm = () => {
    const formInfo = new FormConfig(
        'signupForm',
        'Регистрация',
        'startForm',
        {
            text: 'Ок',
            id: 'signup',
            cssClass: 'btn-black',
        },
        'startInput',
        [
            {
                type: 'text',
                name: 'Имя',
                id: 'name',
            },
            {
                type: 'text',
                name: 'Фамилия',
                id: 'surname',
            },
            {
                type: 'email',
                name: 'Почта',
                id: 'email',
            },
            {
                type: 'password',
                name: 'Пароль',
                id: 'pswd',
            },
        ],
        flushPopup,
    );
    showForm(formInfo, document.getElementById('popup-place'));

    const signupForm = new Form(formInfo);
    signupForm.setButtonEvent(registerUser, [flushPopup]);
};

export {showRegisterForm}
