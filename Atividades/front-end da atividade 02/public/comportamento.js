const baseURL = 'http://127.0.0.1:8000/filmes'

let filmes = []
let editing = false
let filme_id


function resetar_formulario() {
    const form_filme = document.getElementById('form-filme') /*captura o formulário no html */
    form_filme.reset() /*reseta todos os valores do input */

    const btn_confirmar = document.getElementById('btn-confirmar') /*Captura o botão confirmar...*/
    btn_confirmar.value = 'Adicionar Filme'/*e reseta o valor novamente para adicionar filme*/

    editing = false /**Retorna o valor da variável para false */
}

function atualizar_tela(){
    // Manipulacao de DOM
    const ul_filmes = document.getElementById('list-filme') /**Captura a lista de filmes do html */
    ul_filmes.innerHTML = [] /*zera essa lista(somente apaga os itens li da página)*/

    for(let filme of filmes){ /*Para cada filme da lista de filmes... */
        const item = document.createElement('li') /*cria um novo elemento li*/
        item.classList.add("item")/*adicona a class item*/
        const label = `${filme.id} - ${filme.nome}`/*Cria uma variável com id e nome do filme corrente*/

        const btn_editar = document.createElement('a') //cria um link
        btn_editar.innerHTML = '<img src="images/lapis.png" style="width:18px">' //E adiciona uma imagem 
        btn_editar.href = '#' //adicoona um atributo href
        
        btn_editar.onclick = (event) => { //adiciona um lestener de clique para o botão de editar
            event.preventDefault() 

            // 1. Preencher o Formulário
            preencher_formulario(filme) 
            
            // 2. Mudar o Label do Botão para Atualizar
            const btn_confirmar = document.getElementById('btn-confirmar') //captura o botão confirma
            btn_confirmar.value = 'Editar Filme' //muda o nome do botão

            // 3. Salvar um Estado Global se está editando
            editing = true
            filme_id = filme.id
        }

        const btn_remover = document.createElement('a') // cria um link
        btn_remover.innerHTML = '<img src="images/lixo.png" style="width:18px">' // <a>Editar</a>
        btn_remover.href = '#'
        btn_remover.onclick = async (event) => {
            event.preventDefault()
            const confirmou = confirm(`Deseja mesmo remover o Filme: ${filme.nome}`)

            if (!confirmou){
                return
            }

            const response = await fetch(baseURL+'/'+filme.id, {method: 'DELETE'})

            // se deu certo..
            if (response.ok){
                alert('Filme removido com sucesso!')
                carregar_filmes()
            }
        }

        item_buttons = document.createElement('div')
        item_buttons.classList.add('item-buttons')
        item_buttons.appendChild(btn_editar)
        item_buttons.appendChild(btn_remover)

        item.innerText = label
        item.appendChild(item_buttons)

        ul_filmes.appendChild(item)
    }
}

function preencher_formulario(filme){
    const form_filme = document.querySelector('.inputs')

    const inputs = form_filme.children
    inputs[1].value = filme.nome
    inputs[3].value = filme.genero
    inputs[5].value = filme.ano
    inputs[7].value = filme.duracao
}

async function carregar_filmes(){
    //console.log('API - Todos os filmes')
    const response = await fetch(baseURL)

    const status = response.status
    filmes = await response.json()

    atualizar_tela()

    // console.log('Status', status)
    // console.log('Dados', dados)
}

function configurar_formulario(){
    const form_filme = document.getElementById('form-filme')
    const input_duracao = document.getElementById('duracao')

    const btn_cancelar = document.getElementById('btn-cancelar')

    btn_cancelar.onclick = () => {
        const btn_confirmar = document.getElementById('btn-confirmar')
        btn_confirmar.value = 'Adicionar Filme'
    }

    form_filme.onsubmit = async function(event){

        event.preventDefault()

        const nome = document.querySelector('#nome').value
        const genero = document.querySelector('#genero').value
        const ano = document.querySelector('#ano').value
        const duracao = document.querySelector('#duracao').value
        const filme = {nome, genero, ano, duracao}

        console.log('Submeteu!!!')

        let url = baseURL
        let method = 'POST'
        let mensagem_ok = 'Filme Adicionado com sucesso!'
        let mensagem_erro = 'Não foi possível adicionar'
        let response_status = 201

        if (editing){
            url = baseURL+'/'+filme_id
            method = 'PUT'
            mensagem_ok = 'Filme Atualizado com sucesso!'
            mensagem_erro = 'Não foi possível editar'
            response_status = 200
        }

        const opcoes = {
            method: method, 
            body: JSON.stringify(filme),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const response = await fetch(url, opcoes)
    
        if (response.status === response_status ){
            alert(mensagem_ok)
            carregar_filmes()
            resetar_formulario()
        }else{
            alert(mensagem_erro)
        }
        
    }
}


function app(){
    configurar_formulario()
    carregar_filmes()
}

app()