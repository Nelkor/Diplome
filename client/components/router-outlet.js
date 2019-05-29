const tags = tag => `<${tag}></${tag}>`;

export default class RouterOutlet extends HTMLElement
{
    static get observedAttributes() { return ['route'] }

    constructor()
    {
        super();
        this.shadow_root = this.attachShadow({ mode: 'open' });
    }

    attributeChangedCallback(name, oldValue, newValue)
    {
        this.shadow_root.innerHTML = tags(newValue);
    }
}
