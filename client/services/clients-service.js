import { get, post, check_success } from './http-service.js';

export const get_clients = async () => {
    // const res = await get('get_clients');
    // return check_success(res);

    return [
        {
            id: 765,
            fio: 'Иванов Иван Иваныч',
            passport: '4010 456123',
            address: 'улица Пушкина, дом Колотушкина',
            phone: '+7 123 456 78-90',
            books: 4,
        },
        {
            id: 765,
            fio: 'Петров Сергей Александрович',
            passport: '4010 456123',
            address: '70-летия освобождения',
            phone: '+7 123 456 78-90',
            books: 4,
        },
    ];
};

export const get_clients_filter = async filter => {
    // const res = await get('get_clients_filter', filter);
    // return check_success(res);

    return [
        {
            id: 76345,
            fio: 'Иванов Иван Иваныч',
            passport: '4010 456123',
            phone: '+7 123 456 78-90',
            books: 4,
        },
        {
            id: 12765,
            fio: 'Петров Сергей Александрович-Абдуррахманович',
            passport: '4010 456123',
            phone: '+7 123 456 78-90',
            books: 4,
        },
    ];
};

export const get_client = async id => {
    // const res = await post('get_client', { id });
    // return check_success(res);

    return {
        id: 76345,
        fio: 'Иванов Пётр Максимович',
        passport: '4010 456123',
        address: 'Пушкина Колотушкина',
        phone: '+7 123 456 78-90',
        count: 100500,
    };
};

export const upd_client = async client => {
    // const res = await post('upd_client', client);
    // return check_success(res);
};

export const add_client = async client => {
    const res = await post('add_client', client);
    return check_success(res);
};

export const rm_client = async id => {
    // const res = await post('rm_client', { id });
    // return check_success(res);
};
