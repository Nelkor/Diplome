import { styles, elements } from '../templates/list.js';
import { go } from '../services/router-service.js';
import { make_el, make_titles, fill } from '../templates/html.js';

import {
    get_books_stock,
    get_books_filter,
    rm_book,
} from '../services/books-service.js';

const template =
`
<style>
    ${styles}

    .author, .name {
        width: 220px;
        padding-left: 10px;
    }

    .isbn, .publisher {
        width: 175px;
    }

    .series {
        width: 180px;
    }

    .status {
        width: 100px;
        text-align: left;
    }
</style>
${elements}
`;

const make_book = book => {
    const b = make_el(`item book-${book.id}`);

    b.appendChild(make_el('id', book.id));
    b.appendChild(make_el('author', book.author));
    b.appendChild(make_el('name', book.name));
    b.appendChild(make_el('isbn', book.isbn));
    b.appendChild(make_el('publisher', book.publisher));
    b.appendChild(make_el('series', book.series));
    b.appendChild(make_el('status', book.status));

    const rm = make_el('rm-item');

    b.dataset.book_id = book.id;
    rm.dataset.book_id = book.id;

    b.appendChild(rm);

    return b;
};

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

        const content = this.shadow_root.querySelector('#content');
        const link_books = this.shadow_root.querySelector('#link-books');
        const link_clients = this.shadow_root.querySelector('#link-clients');
        const link_issued = this.shadow_root.querySelector('#link-issued');

        const titles = make_titles({
            id: 'НОМЕР',
            author: 'АВТОР',
            name: 'НАЗВАНИЕ',
            isbn: 'ISBN',
            publisher: 'ИЗДАТЕЛЬСТВО',
            series: 'СЕРИЯ',
            status: 'СТАТУС',
        });

        const search = make_el('search');
        const list = make_el('list');

        const search_input = document.createElement('input');
        const search_button = document.createElement('button');
        const new_book_btn = document.createElement('button');

        search_input.placeholder = 'Введите часть имени или ISBN';
        search_button.innerHTML = 'Найти';
        new_book_btn.innerHTML = 'Добавить книгу';

        search.appendChild(search_input);
        search.appendChild(search_button);
        search.appendChild(new_book_btn);

        content.appendChild(search);
        content.appendChild(titles);
        content.appendChild(list);

        link_books.classList.add('active');
        link_clients.addEventListener('click', () => go('/clients'));
        link_issued.addEventListener('click', () => go('/issued'));
        new_book_btn.addEventListener('click', () => go('/add-book'));

        list.addEventListener('click', e => {
            if (e.path[0].classList.contains('rm-item')) {
                const id = e.path[0].dataset.book_id;

                rm_book(id).then(() => {
                    const el = list.querySelector(`.book-${id}`);
                    list.removeChild(el);
                });
            } else if (e.path[1].classList.contains('item')) {
                const id = e.path[1].dataset.book_id;
                return go(`/book#${id}`);
            }
        });

        search_button.addEventListener('click', async () => {
            const filter = search_input.value;
            const books = await get_books_filter(filter);

            fill(books, list);
        });

        get_books_stock().then(books => fill(books, make_book, list));
    }
}
