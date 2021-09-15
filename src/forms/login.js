import {validateLoginData} from "../validation/login.js";
import {sendPostJSONRequest} from "../http/post.js";

function loginUser(email = '', pswd = '', repeatedPswd = '') {
    return validateLoginData(email, pswd, repeatedPswd)
        .then(() => sendPostJSONRequest(
            'http://localhost:9030/login',
            {
                email: email,
                password: pswd,
            }
        ))
}

export {loginUser};