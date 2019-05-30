import { styles, elements } from '../templates/main.js';
import { go } from '../services/router-service.js';

import {
    get_issued,
    close_issue,
} from '../services/issued-service.js';

const template =
`
<style>
    ${styles}
</style>
${elements}
`;

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

        link_issued.classList.add('active');
        link_books.addEventListener('click', () => go('/books'));
        link_clients.addEventListener('click', () => go('/clients'));
    }
}
