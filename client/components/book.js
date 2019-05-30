import { styles } from '../templates/item.js';
import { go } from '../services/router-service.js';

const template =
`
<style>
    ${styles}
</style>
`;

export default class Book extends HTMLElement
{
    constructor()
    {
        super();
        this.shadow_root = this.attachShadow({ mode: 'open' });
    }

    connectedCallback()
    {
        this.shadow_root.innerHTML = template;

        const book_id = location.hash.substr(1);
    }
}
