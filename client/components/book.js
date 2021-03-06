import { styles, book } from '../templates/item.js';
import { go } from '../services/router-service.js';

import {
    get_book,
    rm_book,
    add_selected_books,
    clear_selection,
    upd_book,
} from '../services/books-service.js';

const template =
`
<style>
    ${styles}
</style>
<div class="wrapper">
    <div class="bar">
        <button id="back">Назад</button>
        <button id="choose">Выбрать</button>
        <button id="clear">Отменить выбор</button>
        <button id="rm">Удалить</button>
    </div>
    <div class="content">
        <p class="id">№ <span id="book-id"></span></p>
        ${book}
    </div>
    <button id="save">Сохранить</button>
</div>
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

        const id = location.hash.substr(1);

        const back = this.shadow_root.querySelector('#back');
        const rm = this.shadow_root.querySelector('#rm');
        const choose = this.shadow_root.querySelector('#choose');
        const clear = this.shadow_root.querySelector('#clear');
        const save = this.shadow_root.querySelector('#save');

        const book_id = this.shadow_root.querySelector('#book-id');
        const author = this.shadow_root.querySelector('#author');
        const name = this.shadow_root.querySelector('#name');
        const isbn = this.shadow_root.querySelector('#isbn');
        const publisher = this.shadow_root.querySelector('#publisher');
        const series = this.shadow_root.querySelector('#series');
        const count = this.shadow_root.querySelector('#count');

        back.addEventListener('click', () => go('/books'));
        rm.addEventListener('click', () => {
            rm_book(id).then(() => go('/books'));
        });
        choose.addEventListener('click', () => add_selected_books(id));
        clear.addEventListener('click', clear_selection);
        save.addEventListener('click', async () => {
            await upd_book({
                id,
                author: author.value,
                name: name.value,
                isbn: isbn.value,
                publisher: publisher.value,
                series: series.value,
                count: count.value,
            });
        });

        get_book(id).then(book => {
            book_id.innerHTML = id;
            author.value = book.author;
            name.value = book.name;
            isbn.value = book.isbn;
            publisher.value = book.publisher;
            series.value = book.series;
            count.value = book.count;
        });
    }
}
