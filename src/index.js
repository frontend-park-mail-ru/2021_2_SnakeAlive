// forms
import {loginUser} from "./forms/login.js"

loginUser('alex@mail.ru', 'pass', 'pass').then(
    (response) => {
        console.log("response: ", response.json())
    }
).catch(
    (e) => {
        console.log("error", e.toString())
    }
)

