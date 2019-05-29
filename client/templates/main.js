export const styles =
`
.wrapper {
    width: 1200px;
    height: 900px;
}

.menu {
    width: 100%;
    height: 100px;
    display: flex;
}

.link {
    color: #153627;
    padding-right: 3rem;
    font-size: 3rem;
    opacity: 0.3;
    cursor: pointer;
}

.link.active  { opacity: 1 }

.content {
    width: 1200px;
    height: 800px;
}
`;

export const elements =
`
<div class="wrapper">
    <div class="menu">
        <div id="link-books" class="link">КНИГИ</div>
        <div id="link-clients" class="link">ЧИТАТЕЛИ</div>
        <div id="link-issued" class="link">ВЫДАНО</div>
    </div>
    <div id="content" class="content"></div>
</div>
`;
