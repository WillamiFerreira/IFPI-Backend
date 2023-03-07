
async function carregarAnimais(){
    const response = await axios.get('http://127.0.0.1:8000/animais'); //Fanzendo o pedido para o Backend
    const animais = response.data

    const lista = document.getElementById('lista-animais')

    lista.innerHTML = ''
    
    animais.forEach(animal => {
        const item = document.createElement('li')
        item.innerHTML = animal.nome

        lista.appendChild(item)
        
    });
}

function manipularFormulario(){
    const form_animal = document.getElementById('form_animal');
    const input_nome = document.getElementById('nome');

    form_animal.onsubmit = async (event) => {
        event.preventDefault()
        const nome_animal = input_nome.value;

        await axios.post('http://127.0.0.1:8000/animais', {
            nome: nome_animal,
            idade: 7,
            sexo: "macho",
            cor: "verde"
        })

        carregarAnimais()
        console.log('animal cadastrado')
    }
}


function app() { //Função principal
    console.log("App iniciado")
    carregarAnimais()
    manipularFormulario()
}

app()