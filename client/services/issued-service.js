import { get, post, check_success } from './http-service.js';
import { get_selection } from './books-service.js';

export const get_issued = async () => {
    const res = await get('get_issued');
    return check_success(res);

    // return [
    //     {
    //         id: 17,
    //         book: 'Шерлок Холмс и Эмма Ватсон',
    //         client: 'Пупкин Сергей Петрович',
    //         limit: '29.06.2019',
    //         client_id: 123,
    //         good: true,
    //     },
    //     {
    //         id: 18,
    //         book: 'Букварь',
    //         client: 'Длиннобородов Вениамин Александович',
    //         limit: '01.03.2019',
    //         client_id: 103,
    //         good: false,
    //     },
    // ];
};

export const make_issue = async id => {
    const res = await post('make_issue', { id, books: get_selection() });
    return check_success(res);
};

export const close_issue = async id => {
    const res = await post('close_issue', { id });
    return check_success(res);
};

export const client_issues = async id => {
    const res = await post('client_issues', { id });
    return check_success(res);

    // return [
    //     {
    //         id: 1,
    //         name: 'Песнь Льда и Пламени',
    //         limit: '29.06.2019',
    //         good: true,
    //     },
    //     {
    //         id: 2,
    //         name: 'Винни-Пух и его друзья, но название очень длинное',
    //         limit: '09.01.2018',
    //         good: false,
    //     },
    // ];
};
