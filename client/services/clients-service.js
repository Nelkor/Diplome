import { get, post, check_success } from './http-service.js';

export const get_clients = async () => {
    const res = await get('get_clients');
    return check_success(res);
};

export const get_clients_filter = async filter => {
    const res = await get('get_clients_filter', filter);
    return check_success(res);
};

export const add_client = async client => {
    const res = await post('add_client', client);
    return check_success(res);
};

export const rm_client = async id => {
    const res = await post('rm_client', { id });
    return check_success(res);
};
