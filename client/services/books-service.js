import { get, post, check_success } from './http-service.js';

const selected_books = [];

export const add_selected_books = id => selected_books.push(id);
export const clear_selection = () => selected_books.length = 0;
export const get_selection = () => selected_books;

export const get_books_stock = async () => {
    // const res = await get('get_books_stock');
    // return check_success(res);

    return [
        {
            id: 1,
            author: '1234',
            name: 'Lorem ipsum dolor',
            isbn: '1234-5678-1234-7654',
            publisher: 'Publisher',
            series: 'Series',
            status: 'В наличии',
        },
        {
            id: 2186,
            author: '1234',
            name: 'Lorem ipsum dolor',
            isbn: '1234-5678-1234-7654',
            publisher: 'Publisher',
            series: 'Series',
            status: 'В наличии',
        },
    ];
};

export const get_books_filter = async filter => {
    // const res = await get('get_books_filter', { filter });
    // return check_success(res);

    return [
        {
            id: 555,
            author: '5555555',
            name: 'Lorem ipsum dolor',
            isbn: '1234-5678-1234-7654',
            publisher: 'Publisher',
            series: 'Series',
            status: 'В наличии',
        },
        {
            id: 666,
            author: '66666666',
            name: 'Lorem ipsum dolor',
            isbn: '1234-5678-1234-7654',
            publisher: 'Publisher',
            series: 'Series',
            status: 'В наличии',
        },
    ];
};

export const get_book = async id => {
    // const res = await post('get_book', { id });
    // return check_success(res);

    return {
        author: 'zaq',
        name: 'qwerty',
        isbn: '123-345-567-567',
        publisher: 'yay',
        series: 'double yay',
        count: 1,
    };
};

export const add_book = async book => {
    // const res = await post('add_book', book);
    // return check_success(res);
};

export const upd_book = async book => {
    // const res = await post('upd_book', book);
    // return check_success(res);
};

export const rm_book = async id => {
    // const res = await post('rm_book', { id });
    // return check_success(res);
};

export const books_by_ids = async () => {
    // const res = await get('books_by_ids', { ids: selected_books.join(',') });
    // return check_success(res);

    return [
        'Хроники Нарнии',
        'Гарри Поттер',
    ];
};
