import { styles, client } from '../templates/item.js';
import { go } from '../services/router-service.js';
import { books_by_ids, clear_selection } from '../services/books-service.js';

import {
    client_issues,
    close_issue,
    make_issue,
} from '../services/issued-service.js';

import {
    rm_client,
    get_client,
    upd_client,
} from '../services/clients-service.js';

const template =
`
<style>
    ${styles}

    .green { color: green }
    .red { color: maroon }

    h1 {
        color: #777;
        height: 50px;
        margin: 0;
        font-size: 1.5rem;
    }

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
        margin: 0 20px;
    }

    #books-list {
        width: 100%;
        height: 360px;
        overflow-y: scroll;
    }

    .issues {
        width: 350px;
    }

    .issue { cursor: pointer }
    .issue:hover { background-color: #e2fdec }

    #issues {
        width: 100%;
        height: 400px;
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
            ${client}
            <p class="count">Книг на руках: <span id="count"></span></p>
            <button id="save">Сохранить</button>
        </div>
        <div class="books">
            <div id="books-list"></div>
            <button id="issue">Выдать</button>
        </div>
        <div class="issues">
            <h1>ВЫДАНО</h1>
            <div id="issues"></div>
        </div>
    </div>
</div>
`;

const fill_books = (books, ctx) => ctx.innerHTML = books.join('<br><br>');

const fill_issues = (issues, ctx) => {
    issues = issues.map(issue => {
        const cn = issue.good ? 'green' : 'red';
        const text = `${issue.name}, до ${issue.limit}`;
        const args =
            `data-id="${issue.id}" class="issue ${cn}" title="Принять"`;

        return `<span ${args}>${text}</span>`;
    });

    ctx.innerHTML = issues.join('<br><br><br>');
};

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
        const issues_list = this.shadow_root.querySelector('#issues');
        const save = this.shadow_root.querySelector('#save');
        const issue = this.shadow_root.querySelector('#issue');

        const client_id = this.shadow_root.querySelector('#client-id');
        const fio = this.shadow_root.querySelector('#fio');
        const passport = this.shadow_root.querySelector('#passport');
        const address = this.shadow_root.querySelector('#address');
        const phone = this.shadow_root.querySelector('#phone');
        const count = this.shadow_root.querySelector('#count');

        back.addEventListener('click', () => go('/clients'));
        rm.addEventListener('click', () => {
            rm_client(id).then(() => go('/clients'));
        });

        books_by_ids().then(books => fill_books(books, books_list));

        get_client(id).then(client => {
            client_id.innerHTML = id;
            fio.value = client.fio;
            passport.value = client.passport;
            address.value = client.address;
            phone.value = client.phone;
            count.innerHTML = client.count;
        });

        save.addEventListener('click', async () => {
            await upd_client({
                id,
                fio: fio.value,
                passport: passport.value,
                address: address.value,
                phone: phone.value,
            });
        });

        issue.addEventListener('click', async () => {
            await make_issue(id);

            clear_selection();
            go('/clients');
        });

        issues_list.addEventListener('click', async e => {
            const target = e.path[0];

            if (target.classList.contains('issue')) {
                await close_issue(target.dataset.id);

                issues_list.removeChild(target);
            }
        });

        client_issues(id).then(issues => fill_issues(issues, issues_list));
    }
}
