import { log_in } from '../services/auth-service.js';
import { go } from '../services/router-service.js';

const template =
`
<style>
    .wrapper {
        width: 300px;
        display: flex;
        flex-direction: column;
    }

    .wrapper > * {
        height: 50px;
        margin-top: 10px;
        padding-left: 10px;
    }

    .greeting {
        display: flex;
        align-items: flex-end;
        color: #153627;
    }

    input, button { border-radius: 0.5rem }
    input { border: solid 1px #a9a9a9 }

    button {
        border: none;
        background-color: #37946e;
        color: #fff;
        cursor: pointer;
    }

    .error {
        color: darkred;
        display: flex;
        justify-content: center;
        opacity: 0;
    }
</style>
<div class="wrapper">
    <p class="greeting">Пожалуйста, авторизуйтесь</p>
    <input id="name" type="text" placeholder="Ваше имя">
    <input id="pass" type="password" placeholder="Пароль">
    <button id="enter">Войти</button>
    <p id="error" class="error">Неверные данные</p>
</div>
`;

export default class Auth extends HTMLElement
{
    constructor()
    {
        super();
        this.shadow_root = this.attachShadow({ mode: 'open' });
    }

    connectedCallback()
    {
        this.shadow_root.innerHTML = template;

        const name = this.shadow_root.querySelector('#name');
        const pass = this.shadow_root.querySelector('#pass');
        const enter = this.shadow_root.querySelector('#enter');
        const error = this.shadow_root.querySelector('#error');

        enter.addEventListener('click', async () => {
            if (await log_in(name.value, pass.value))
                return go('/books');

            error.style.opacity = '1';

            setTimeout(() => error.style.opacity = '0', 3000);
        });
    }
}
