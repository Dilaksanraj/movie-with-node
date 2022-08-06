
export class AppsConst {

    static AppName = "NetFlix";

    static commonUrl= [
        { name: 'Login', url: '/login' },
        { name: 'Register', url: '/register' },
        { name: 'Home', url: '/home' },
        {name: 'Movie', url: '/movie'},
        {name: 'my-movie', url: '/my-movie'},
        
    ];

    static baseUrl = 'http://127.0.0.1:4500';

    static mediaType = {Video:'VIDEO', img:'IMG'}

    static isAuth = 'isAuth';
    static token = 'token';
    static authId = 'authId';
}