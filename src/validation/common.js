import {ValidationError} from './error.js';

const checkEmpty = (value= '', name= '') => {
    if (!value) {
        return Promise.reject(new ValidationError('пустое поле', name));
    }

    return Promise.resolve();
}

const checkLength = (value = '', length = 0, name = '') => {
    if (value.length < length) {
        return Promise.reject(new ValidationError('поле слишком мало', name));
    }

    return Promise.resolve();
}

const validateEmail = (value = '', name = '') => {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!re.test(String(value).toLowerCase())) {
        return Promise.reject(new ValidationError('невалидное полее', name))
    }

    return Promise.resolve();
}

export {validateEmail, checkEmpty,checkLength }
