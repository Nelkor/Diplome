import { styles, elements } from '../templates/main.js';
import { go } from '../services/router-service.js';

import {
    get_clients,
    get_clients_filter,
    add_client,
    rm_client,
} from '../services/clients-service.js';

const template =
`
<style>
    ${styles}
</style>
${elements}
`;

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

        link_clients.classList.add('active');
        link_books.addEventListener('click', () => go('/books'));
        link_issued.addEventListener('click', () => go('/issued'));
    }
}
