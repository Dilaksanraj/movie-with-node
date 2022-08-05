
export class AppsConst {

    static AppName = "NetFlix";

    static commonUrl= [
        { name: 'Login', url: '/login' },
        { name: 'Register', url: '/register' },
        { name: 'Home', url: '/home' },
        {name: 'Movie', url: '/movie'}
    ];

    static baseUrl = 'https://movie-with-node.herokuapp.com';

    static mediaType = {Video:'VIDEO', img:'IMG'}

    static isAuth = 'isAuth';
    static token = 'token';
    static authId = 'authId';
}