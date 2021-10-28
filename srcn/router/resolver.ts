import {
    Login,
    // Register,
    // List

} from '../view/login'

class Path {
    url = '';

    view: object; // тут нужен интерфейс вероятно!!!!

    constructor(_url: string, _view: object){
        this.url = _url;
        this.view = _view;
    }
}

const paths: Array<Path> = [
    new Path('/login', Login)
    // {
    //     url: '/register',
    //     view: Register
    // },
    // {
    //     url: '/',
    //     view: List
    // },
]

const resolve = (_path: string): object | undefined => {
    const path = paths.find(elem => elem.url === _path);
    if (path !== undefined) {
        return path.view;
    }
    return path;
}

export { resolve }