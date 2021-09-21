import {validateEmail, checkEmpty, checkLength} from './common.js';

export function validateLoginData(email = '', password = '') {
    return checkEmpty(email, 'email')
        .then(
            () => {
                return checkEmpty(password, 'pswd')
            }
        )
        .then(
            () => {
                return checkLength(password, 8, 'pswd')
            }
        )
        .then(
            () => {
                return validateEmail(email, 'email')
            }
        );
}