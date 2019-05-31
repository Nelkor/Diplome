export const make_el = (class_name, content) => {
    const el = document.createElement('div');

    el.className = class_name;

    if (content) el.innerHTML = content;

    return el;
};

export const make_titles = titles => {
    const t = make_el('titles');

    for (const index in titles)
        t.appendChild(make_el(index, titles[index]));

    return t;
};

export const fill = (items, cb, ctx) => {
    const elements = items.map(cb);

    ctx.innerHTML = '';
    elements.forEach(el => ctx.appendChild(el));
};
