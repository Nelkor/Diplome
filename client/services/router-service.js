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
    '/add-book': {
        tag: 'ath-add-book',
        title: 'Новая книга',
    },
    '/add-client': {
        tag: 'ath-add-client',
        title: 'Новая книга',
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
