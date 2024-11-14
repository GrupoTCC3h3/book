async function getAPIURL() {
    const response = await fetch('/book/frontend/util/config.json');
    const config = await response.json();

    return config.api.baseUrl;

    


    /*
    fetch('config.json')
        .then(response => response.json())
        .then(config => {
            console.log('API URL:', config.API_URL);
            console.log('Client ID:', config.CLIENT_ID);
            console.log('Modo do App:', config.APP_MODE);
            // Agora você pode usar as variáveis carregadas
        })
        .catch(error => {
            console.error('Erro ao carregar o arquivo de configuração:', error);
        });
    */

    
}