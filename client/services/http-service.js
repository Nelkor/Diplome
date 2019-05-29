import { get_token } from './auth-service.js';
import { go } from './router-service.js';

const domain = 'http://localhost:8934/';

export const check_success = res => {
    if (res.success) return res.content;

    go('/auth');
};

export const get = async (route, params) => {
    params = params || {};
    params.token = get_token();

    let addr = domain + route;

    const query_arr = [];

    for (const key in params)
        query_arr.push(`${key}=${params[key]}`);

    addr += '?';
    addr += query_arr.join('&');

    const raw = await fetch(addr);

    return await raw.json();

    // return {
    //     success: true,
    //     token: '1234',
    // };
};

export const post = async (route, params) => {
    params = params || {};
    params.token = get_token();

    const raw = await fetch(domain + route, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params),
    });

    return await raw.json();
};
