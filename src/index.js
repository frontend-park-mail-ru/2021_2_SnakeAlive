// validation
import {validateLoginData} from "./validation/login.js";
import {ValidationError} from "./validation/error.js";

// http api
import {sendGetJSONRequest, sendGetMultipartRequest} from "./http/get.js";
import {sendPostJSONRequest, sendPostMultipartRequest, sendPostFileRequest} from "./http/post.js";

// forms
import {loginUser} from "./forms/login.js"

loginUser('asd@mail.ru', '1234', '1234').then(
    (response) => {
        console.log("response: ", response.json())
    }
).catch(
    (e) => {
        console.log("error", e.toString())
    }
)

