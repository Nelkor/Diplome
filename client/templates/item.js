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
