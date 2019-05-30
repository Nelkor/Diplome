import { get, post, check_success } from './http-service.js';

export const get_books_stock = async () => {
    const res = await get('get_books_stock');
    return check_success(res);
};

export const get_books_filter = async filter => {
    const res = await get('get_books_filter', { filter });
    return check_success(res);
};

export const add_book = async book => {
    const res = await post('add_book', book);
    return check_success(res);
};

export const rm_book = async id => {
    const res = await post('rm_book', { id });
    return check_success(res);
};
