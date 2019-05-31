import { add_client } from '../services/clients-service.js';
import { styles, client } from '../templates/item.js';
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
        ${client}
    </div>
    <button id="save">Сохранить</button>
</div>
`;

export default class AddClient extends HTMLElement
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

        const fio = this.shadow_root.querySelector('#fio');
        const passport = this.shadow_root.querySelector('#passport');
        const address = this.shadow_root.querySelector('#address');
        const phone = this.shadow_root.querySelector('#phone');

        back.addEventListener('click', () => go('/clients'));

        save.addEventListener('click', async () => {
            await add_client({
                fio: fio.value,
                passport: passport.value,
                address: address.value,
                phone: phone.value,
            });

            go('/clients');
        });
    }
}
