const getIdPessoa = async () => {
    const usuario = JSON.parse(sessionStorage.getItem("currentUser"));

    if (usuario) {
        const response =  await fetch('http://localhost:3000/pessoa/' + usuario.userId, {
            method: 'GET'
        });

        if (response.ok) {
            const pessoa = response.json();

            return pessoa.id;
        } else {
            throw Error(`Erro ao consultar a pessoa: ${response.statusText}`);
        }
    }

    throw Error("Não foi possível capturar o usuário");
}


export { getIdPessoa }