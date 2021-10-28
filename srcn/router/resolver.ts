import {
    Login,
    // Register,
    // List

} from '../view/login'

class Path {
    url = '';

    view: Login; // тут нужен интерфейс вероятно!!!!
}

const paths: Array<Path> = [
    {
        url: '/login',
        view: Login
    },
    // {
    //     url: '/register',
    //     view: Register
    // },
    // {
    //     url: '/',
    //     view: List
    // },
]

const resolve = (_path: string): Login | undefined => {
    const path = paths.find(elem => elem.url === _path);
    if (path !== undefined) {
        return path.view;
    }
    return path;
}

export { resolve }