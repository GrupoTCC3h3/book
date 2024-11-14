function getUsuarioLogado() {
    return JSON.parse(sessionStorage.getItem("currentUser"));
}