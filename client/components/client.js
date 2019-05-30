import { styles } from '../templates/item.js';
import { go } from '../services/router-service.js';
import { books_by_ids } from '../services/books-service.js';

import {
    rm_client,
    get_client,
} from '../services/clients-service.js';

const template =
`
<style>
    ${styles}

    .content {
        display: flex;
        height: 450px;
    }

    .client, .books {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        height: 100%;
    }

    .books {
        margin-left: 20px;
    }

    #books-list {
        width: 100%;
        height: 360px;
        overflow-y: scroll;
    }
</style>
<div class="wrapper">
    <div class="bar">
        <button id="back">Назад</button>
        <button id="rm">Удалить</button>
    </div>
    <div class="content">
        <div class="client">
            <p class="id">№ <span id="client-id"></span></p>
            <div class="line">
                <div class="label">ФИО</div>
                <input id="fio" type="text" placeholder="ФИО">
            </div>
            <div class="line">
                <div class="label">Паспорт</div>
                <input id="passport" type="text" placeholder="Серия и номер паспорта">
            </div>
            <div class="line">
                <div class="label">Адрес</div>
                <input id="address" type="text" placeholder="Адрес">
            </div>
            <div class="line">
                <div class="label">Номер телефона</div>
                <input id="phone" type="text" placeholder="Номер телефона">
            </div>
            <p class="count">Книг на руках: <span id="count"></span></p>
            <button id="save">Сохранить</button>
        </div>
        <div class="books">
            <div id="books-list"></div>
            <button id="issue">Выдать</button>
        </div>
    </div>
</div>
`;

const fill = (books, ctx) => ctx.innerHTML = books.join('<br><br>');

export default class Client extends HTMLElement
{
    constructor()
    {
        super();
        this.shadow_root = this.attachShadow({ mode: 'open' });
    }

    connectedCallback()
    {
        this.shadow_root.innerHTML = template;

        const id = location.hash.substr(1);

        const back = this.shadow_root.querySelector('#back');
        const rm = this.shadow_root.querySelector('#rm');
        const books_list = this.shadow_root.querySelector('#books-list');

        const client_id = this.shadow_root.querySelector('#book-id');

        back.addEventListener('click', () => go('/clients'));
        rm.addEventListener('click', () => {
            rm_client(id).then(() => go('/clients'));
        });

        books_by_ids().then(books => fill(books, books_list));
    }
}
