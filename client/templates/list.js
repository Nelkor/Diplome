export const styles =
`
/*<style>*/
* {
    user-select: none;
    box-sizing: border-box;
}

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

.search {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
}

.search > * { height: 100%; margin-right: 10px }
.search input { padding-left: 10px; width: 400px }
.search button { width: 120px }

.titles {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    color: #777;
}

.item {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    cursor: pointer;
}
.item:hover {
    background-color: #cfeada;
}

.item > * {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.list {
    width: 100%;
    height: 700px;
    overflow-y: scroll;
}

.id {
    width: 75px;
    text-align: right;
}

.rm-item {
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: maroon;
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
