import { get } from './http-service.js';

let token = 'null';

export const get_token = () => token;

export const log_in = async (name, pass) => {
    const res = await get('log_in', {name, pass});

    if (res.success) {
        token = res.token;

        return true;
    }

    return false;
};
