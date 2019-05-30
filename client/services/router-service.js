const routes = {
    '/auth': {
        tag: 'ath-auth',
        title: 'Авторизация',
    },
    '/clients': {
        tag: 'ath-clients',
        title: 'Читатели',
    },
    '/client': {
        tag: 'ath-client',
        title: 'Читатель',
    },
    '/books': {
        tag: 'ath-books',
        title: 'Книги',
    },
    '/book': {
        tag: 'ath-book',
        title: 'Книга',
    },
    '/issued': {
        tag: 'ath-issued',
        title: 'Выдано',
    },
};

let outlet = null;

export const set_outlet = el => outlet = el;

export const go = link => {
    let route = link.split('#')[0];

    if ( ! routes[route]) link = route = '/books';

    document.title = routes[route].title;
    history.pushState(null, null, link);

    outlet.setAttribute('route', routes[route].tag);
};
