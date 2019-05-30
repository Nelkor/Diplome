import { styles, elements } from '../templates/list.js';
import { go } from '../services/router-service.js';

import {
    get_clients,
    get_clients_filter,
    rm_client,
} from '../services/clients-service.js';

const template =
`
<style>
    ${styles}

    .fio { width: 310px; padding-left: 10px }
    .passport { width: 130px }
    .address { width: 240px }
    .phone { width: 190px }
    .books { width: 200px; text-align: center }
</style>
${elements}
`;

const make_el = (class_name, content) => {
    const el = document.createElement('div');

    el.className = class_name;

    if (content) el.innerHTML = content;

    return el;
};

const make_titles = () => {
    const t = make_el('titles');

    t.appendChild(make_el('id', 'НОМЕР'));
    t.appendChild(make_el('fio', 'ФИО'));
    t.appendChild(make_el('passport', 'ПАСПОРТ'));
    t.appendChild(make_el('address', 'АДРЕС'));
    t.appendChild(make_el('phone', 'НОМЕР ТЕЛЕФОНА'));
    t.appendChild(make_el('books', 'КНИГ НА РУКАХ'));

    return t;
};

const make_client = client => {
    const c = make_el(`item client-${client.id}`);

    c.appendChild(make_el('id', client.id));
    c.appendChild(make_el('fio', client.fio));
    c.appendChild(make_el('passport', client.passport));
    c.appendChild(make_el('address', client.address));
    c.appendChild(make_el('phone', client.phone));
    c.appendChild(make_el('books', client.books));

    const rm = make_el('rm-item');

    c.dataset.client_id = client.id;
    rm.dataset.client_id = client.id;

    c.appendChild(rm);

    return c;
};

const fill = (clients, ctx) => {
    const elements = clients.map(make_client);

    ctx.innerHTML = '';
    elements.forEach(el => ctx.appendChild(el));
};

export default class Clients extends HTMLElement
{
    constructor()
    {
        super();
        this.shadow_root = this.attachShadow({ mode: 'open' });
    }

    connectedCallback()
    {
        this.shadow_root.innerHTML = template;

        const content = this.shadow_root.querySelector('#content');
        const link_books = this.shadow_root.querySelector('#link-books');
        const link_clients = this.shadow_root.querySelector('#link-clients');
        const link_issued = this.shadow_root.querySelector('#link-issued');

        const search = make_el('search');
        const titles = make_titles();
        const list = make_el('list');

        const search_input = document.createElement('input');
        const search_button = document.createElement('button');
        const new_client_btn = document.createElement('button');

        search_input.placeholder = 'Введите имя или данные паспорта';
        search_button.innerHTML = 'Найти';
        new_client_btn.innerHTML = 'Добавить читателя';

        search.appendChild(search_input);
        search.appendChild(search_button);
        search.appendChild(new_client_btn);

        content.appendChild(search);
        content.appendChild(titles);
        content.appendChild(list);

        link_clients.classList.add('active');
        link_books.addEventListener('click', () => go('/books'));
        link_issued.addEventListener('click', () => go('/issued'));

        list.addEventListener('click', e => {
            if (e.path[0].classList.contains('rm-item')) {
                const id = e.path[0].dataset.client_id;

                rm_client(id).then(() => {
                    const el = list.querySelector(`.client-${id}`);
                    list.removeChild(el);
                });
            } else if (e.path[1].classList.contains('item')) {
                const id = e.path[1].dataset.client_id;
                return go(`/client#${id}`);
            }
        });

        search_button.addEventListener('click', async () => {
            const filter = search_input.value;
            const books = await get_clients_filter(filter);

            fill(books, list);
        });

        get_clients().then(clients => fill(clients, list));
    }
}
