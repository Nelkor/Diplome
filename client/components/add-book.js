import { add_book } from '../services/books-service.js';
import { styles, book } from '../templates/item.js';
import { go } from '../services/router-service.js';

const template =
`
<style>
    ${styles}

    .bar { margin-bottom: 30px }
</style>
<div class="wrapper">
    <div class="bar">
        <button id="back">Назад</button>
    </div>
    <div class="content">
        ${book}
    </div>
    <button id="save">Сохранить</button>
</div>
`;

export default class AddBook extends HTMLElement
{
    constructor()
    {
        super();
        this.shadow_root = this.attachShadow({ mode: 'open' });
    }

    connectedCallback()
    {
        this.shadow_root.innerHTML = template;

        const back = this.shadow_root.querySelector('#back');
        const save = this.shadow_root.querySelector('#save');

        const author = this.shadow_root.querySelector('#author');
        const name = this.shadow_root.querySelector('#name');
        const isbn = this.shadow_root.querySelector('#isbn');
        const publisher = this.shadow_root.querySelector('#publisher');
        const series = this.shadow_root.querySelector('#series');
        const count = this.shadow_root.querySelector('#count');

        back.addEventListener('click', () => go('/books'));

        save.addEventListener('click', async () => {
            await add_book({
                author: author.value,
                name: name.value,
                isbn: isbn.value,
                publisher: publisher.value,
                series: series.value,
                count: count.value,
            });

            go('/books');
        });
    }
}
