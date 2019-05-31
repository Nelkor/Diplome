export const styles =
`
* {
    box-sizing: border-box;
}

.id {
    margin-bottom: 10px;
    font-size: 3rem;
}

.wrapper {
    width: 1200px;
    height: 900px;
}

.bar {
    height: 50px;
    display: flex;
    justify-content: space-between;
}
.bar > * {
    height: 100%;
    width: 150px;
}

.line {
    display: flex;
    height: 40px;
    margin-bottom: 20px;
}

.line input {
    height: 100%;
    width: 200px;
    padding-left: 10px;
}

.label {
    width: 150px;
    height: 100%;
    display: flex;
    align-items: center;
}

#save, #issue {
    width: 350px;
    height: 40px;
}
`;

export const book =
`
<div class="line">
    <div class="label">Автор</div>
    <input id="author" type="text" placeholder="Автор">
</div>
<div class="line">
    <div class="label">Название</div>
    <input id="name" type="text" placeholder="Название">
</div>
<div class="line">
    <div class="label">ISBN</div>
    <input id="isbn" type="text" placeholder="ISBN">
</div>
<div class="line">
    <div class="label">Издательство</div>
    <input id="publisher" type="text" placeholder="Издательство">
</div>
<div class="line">
    <div class="label">Серия</div>
    <input id="series" type="text" placeholder="Серия">
</div>
<div class="line">
    <div class="label">В наличии</div>
    <input id="count" type="number" min="0" placeholder="Количество">
</div>
`;

export const client =
`
<div class="line">
    <div class="label">ФИО</div>
    <input id="fio" type="text" placeholder="ФИО">
</div>
<div class="line">
    <div class="label">Паспорт</div>
    <input id="passport" type="text" placeholder="Серия и номер паспорта">
</div>
<div class="line">
    <div class="label">Адрес</div>
    <input id="address" type="text" placeholder="Адрес">
</div>
<div class="line">
    <div class="label">Номер телефона</div>
    <input id="phone" type="text" placeholder="Номер телефона">
</div>
`;
