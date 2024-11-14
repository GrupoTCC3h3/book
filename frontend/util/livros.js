const transformarEmDicionario = (lista) => {
    return lista.reduce((dicionario, objeto) => {
        dicionario[objeto.id] = objeto;
        return dicionario;
    }, {});
};


function saveOtherUserBooks(books) {
    const booksDict = transformarEmDicionario(books);
    sessionStorage.setItem("otherUserBooks", JSON.stringify(booksDict));
}

function getOtherUserBooks() {
    return JSON.parse(sessionStorage.getItem("otherUserBooks"));
}