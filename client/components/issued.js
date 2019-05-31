import { styles, elements } from '../templates/list.js';
import { go } from '../services/router-service.js';
import { get_issued } from '../services/issued-service.js';
import { make_el, make_titles, fill } from '../templates/html.js';

const template =
`
<style>
    ${styles}

    .green { color: green }
    .red { color: maroon }

    .content { padding-top: 50px }

    .book, .client {
        width: 490px;
        padding-left: 10px;
    }

    .limit { width: 100px }
</style>
${elements}
`;

const make_issue = issue => {
    const i = make_el(`item`);
    const lc = issue.good ? 'green' : 'red';

    i.appendChild(make_el('id', issue.id));
    i.appendChild(make_el('book', issue.book));
    i.appendChild(make_el('client', issue.client));
    i.appendChild(make_el(`limit ${lc}`, issue.limit));

    i.dataset.client_id = issue.client_id;

    return i;
};

export default class Issued extends HTMLElement
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

        const titles = make_titles({
            id: 'НОМЕР',
            book: 'КНИГА',
            client: 'ЧИТАТЕЛЬ',
            limit: 'СРОК',
        });

        const list = make_el('list');

        content.appendChild(titles);
        content.appendChild(list);

        link_issued.classList.add('active');
        link_books.addEventListener('click', () => go('/books'));
        link_clients.addEventListener('click', () => go('/clients'));

        list.addEventListener('click', e => {
            const id = e.path[1].dataset.client_id;

            if (id) go(`/client#${id}`);
        });

        get_issued().then(issued => fill(issued, make_issue, list));
    }
}
