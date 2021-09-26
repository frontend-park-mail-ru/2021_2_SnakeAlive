import { sendGetMultipartRequest } from './index.js'

const createHtml = (templateName, data) => 
    fetch('http://localhost/templates/popup.mst', {
        method: 'GET',
        mode: 'no-cors',
        credentials: 'include',
    })
    .then(response => {
        // console.log(response);
        // console.log(response.text());
        // const template = Handlebars.compile(response.text());
        // console.log(template(data));
        return Promise.resolve(response.text());

    }).catch(error => console.log('Unable to get all template data: ', error.message));

export { createHtml };