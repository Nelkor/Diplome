import { styles, elements } from '../templates/main.js';
import { go } from '../services/router-service.js';

import {
    get_books_stock,
    get_books_filter,
    add_book,
    rm_book,
} from '../services/books-service.js';

const template =
`
<style>
    ${styles}
</style>
${elements}
`;

export default class Books extends HTMLElement
{
    constructor()
    {
        super();
        this.shadow_root = this.attachShadow({ mode: 'open' });
    }

    connectedCallback()
    {
        this.shadow_root.innerHTML = template;

        const link_books = this.shadow_root.querySelector('#link-books');
        const link_clients = this.shadow_root.querySelector('#link-clients');
        const link_issued = this.shadow_root.querySelector('#link-issued');

        link_books.classList.add('active');
        link_clients.addEventListener('click', () => go('/clients'));
        link_issued.addEventListener('click', () => go('/issued'));
    }
}
