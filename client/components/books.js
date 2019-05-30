import { styles, elements } from '../templates/list.js';
import { go } from '../services/router-service.js';

import {
    get_books_stock,
    get_books_filter,
    rm_book,
} from '../services/books-service.js';

const template =
`
<style>
    ${styles}

    .titles {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        color: #777;
    }

    .search {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
    }

    .search > * { height: 100%; margin-right: 10px }
    .search input { padding-left: 10px; width: 400px }
    .search button { width: 120px }

    .book-list {
        width: 100%;
        height: 700px;
        overflow-y: scroll;
    }

    .book {
        width: 100%;
        height: 30px;
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    .book:hover {
        background-color: #cfeada;
    }

    .book-id {
        width: 75px;
        text-align: right;
    }

    .author, .name {
        width: 210px;
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

    .rm-book {
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background-color: maroon;
    }
</style>
${elements}
`;

const make_el = (class_name, content) => {
    const el = document.createElement('div');

    el.className = class_name;

    if (content) el.innerHTML = content;

    return el;
};

const make_titles = () => {
    const t = make_el('titles');

    t.appendChild(make_el('book-id', 'НОМЕР'));
    t.appendChild(make_el('author', 'АВТОР'));
    t.appendChild(make_el('name', 'НАЗВАНИЕ'));
    t.appendChild(make_el('isbn', 'ISBN'));
    t.appendChild(make_el('publisher', 'ИЗДАТЕЛЬСТВО'));
    t.appendChild(make_el('series', 'СЕРИЯ'));
    t.appendChild(make_el('status', 'СТАТУС'));

    return t;
};

const make_book = book => {
    const b = make_el(`book book-${book.id}`);

    b.appendChild(make_el('book-id', book.id));
    b.appendChild(make_el('author', book.author));
    b.appendChild(make_el('name', book.name));
    b.appendChild(make_el('isbn', book.isbn));
    b.appendChild(make_el('publisher', book.publisher));
    b.appendChild(make_el('series', book.series));
    b.appendChild(make_el('status', book.status));

    const rm = make_el('rm-book');

    b.dataset.book_id = book.id;
    rm.dataset.book_id = book.id;

    b.appendChild(rm);

    return b;
};

const fill = (books, ctx) => {
    const elements = books.map(make_book);

    ctx.innerHTML = '';
    elements.forEach(el => ctx.appendChild(el));
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

        const search = make_el('search');
        const titles = make_titles();
        const book_list = make_el('book-list');

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
        content.appendChild(book_list);

        link_books.classList.add('active');
        link_clients.addEventListener('click', () => go('/clients'));
        link_issued.addEventListener('click', () => go('/issued'));

        book_list.addEventListener('click', e => {
            if (e.path[0].classList.contains('rm-book')) {
                const id = e.path[0].dataset.book_id;

                rm_book(id).then(() => {
                    const el = book_list.querySelector(`.book-${id}`);
                    book_list.removeChild(el);
                });
            } else if (e.path[1].classList.contains('book')) {
                const id = e.path[1].dataset.book_id;
                return go(`/book#${id}`);
            }
        });

        search_button.addEventListener('click', async () => {
            const filter = search_input.value;
            const books = await get_books_filter(filter);

            fill(books, book_list);
        });

        get_books_stock().then(books => fill(books, book_list));
    }
}
