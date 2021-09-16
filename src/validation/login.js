import {ValidationError} from "./error.js";

function validateLoginData(email = '', pswd = '') {
    return new Promise((resolve, reject) => {
        if (pswd === '') {
            reject(new ValidationError('пустое поле пароля', 'pswd'));
            return;
        }
        if (email === '') {
            reject(new ValidationError('пустое поле логина', 'email'));
            return;
        }

        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(email).toLowerCase())) {
            reject(new ValidationError('невалидное поле логина', 'email'))
            return;
        }

        resolve();
    })
}

export {validateLoginData};