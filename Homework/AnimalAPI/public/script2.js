function carregarAnimais(){
    const lista = document.getElementById('lista-animais');
    //Chamando a API com promises
    axios.get('http://127.0.0.1:8000/animais').then(response => {
        const animais = response.data;

        animais.forEach(animal => { //Para cada objeto animal da lista animais...
            const item = document.createElement('li') //É criado um elemento li...
            item.innerHTML = animal.nome//e atribuido a ele o valor da propriedade nome do objeto animal atual
        
            lista.appendChild(item)//Por fim, esse elemento li é adicionado à lista.
            
        });
    })
}

function app(){
    console.log("App Iniciado")
    carregarAnimais()
}

app()