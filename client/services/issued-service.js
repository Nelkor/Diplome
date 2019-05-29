import { get, post, check_success } from './http-service.js';

export const get_issued = async () => {
    const res = await get('get_issued');
    return check_success(res);
};

export const close_issue = async id => {
    const res = await post('close_issue', { id });
    return check_success(res);
};
