const baseURL = 'http://127.0.0.1:8000/tarefa'
import obterValorDoRadioButtons from "../modules/js_modules/utils.js";

let tasks = [];

function atualizar_tela(){
    const task_cont = document.querySelector('.task-cont');
    task_cont.innerHTML = []

    for (let task of tasks){
        const item = document.createElement('div')
        item.classList.add('task-item')

        var task_info = []

        for (let i in task) {
            item.innerText = item.innerHTML + task[i]
        }


        task_cont.appendChild(item)
    }
}

async function carregar_tarefas(){
    const response = await fetch(baseURL)

    const status = response.status
    tasks = await response.json()

    //atualizar_tela()
    atualizar_tela()
}

function configurar_formulario(){
    const form_task = document.querySelector('#form-task');

    form_task.onsubmit = async function(event){
        event.preventDefault();

        const dados = form_task.children
        const descricao = dados[1].value
        const responsavel = dados[3].value
        const prioridade = obterValorDoRadioButtons("priori-option")
        const nivel = obterValorDoRadioButtons("level-option")

        const task = {descricao, responsavel, nivel, prioridade}

        const opcoes = {
            method: "POST",
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(baseURL, opcoes)

        if(response.status === 201){
            alert('Tarefa cadastrada com sucesso!')
            carregar_tarefas()

        } else{
            alert('Terefa não cadastrada')
        }
    }
}

function app(){
    configurar_formulario()
}

app()