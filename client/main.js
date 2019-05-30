import { set_outlet, go } from './services/router-service.js';

import RouterOutlet from './components/router-outlet.js';
import Auth from './components/auth.js';
import Books from './components/books.js';
import Book from './components/book.js';
import Clients from './components/clients.js';
import Issued from './components/issued.js';

customElements.define('router-outlet', RouterOutlet);
customElements.define('ath-auth', Auth);
customElements.define('ath-books', Books);
customElements.define('ath-book', Book);
customElements.define('ath-clients', Clients);
customElements.define('ath-issued', Issued);

const init = () => {
    const outlet = document.querySelector('#router');

    set_outlet(outlet);
    go(location.pathname);
};

document.addEventListener('DOMContentLoaded', init);
