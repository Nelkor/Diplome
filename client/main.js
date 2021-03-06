import { set_outlet, go } from './services/router-service.js';

import RouterOutlet from './components/router-outlet.js';
import Auth from './components/auth.js';
import Books from './components/books.js';
import Book from './components/book.js';
import Clients from './components/clients.js';
import Client from './components/client.js';
import Issued from './components/issued.js';
import AddBook from './components/add-book.js';
import AddClient from './components/add-client.js';

customElements.define('router-outlet', RouterOutlet);
customElements.define('ath-auth', Auth);
customElements.define('ath-books', Books);
customElements.define('ath-book', Book);
customElements.define('ath-clients', Clients);
customElements.define('ath-client', Client);
customElements.define('ath-issued', Issued);
customElements.define('ath-add-book', AddBook);
customElements.define('ath-add-client', AddClient);

const init = () => {
    const outlet = document.querySelector('#router');

    set_outlet(outlet);
    go(location.pathname + location.hash);
};

document.addEventListener('DOMContentLoaded', init);
