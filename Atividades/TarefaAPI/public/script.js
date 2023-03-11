const baseURL = 'http://127.0.0.1:8000/tarefa'
import {
    obterValorDoRadioButtons,
    buildButtons,
    resetarForm
} from "../modules/js_modules/utils.js";

let tasks = [];

function filtrarTarefas() {
    const level_filter = document.querySelector('#level-filter');
    const priority_filter = document.querySelector('#priority-filter');

    const filtrar_btn = document.querySelector('#filtrar-btn');

    filtrar_btn.onclick = () => {
        //obtendo o valor de level filtrado pelo user
        var selectedIndexL = level_filter.selectedIndex;
        var selectedOptionL = level_filter.options[selectedIndexL];
        var selectedTextL = selectedOptionL.value;

        //obtendo o valor de priority filtrado pelo user
        var selectedIndexP = priority_filter.selectedIndex;
        var selectedOptionP = priority_filter.options[selectedIndexP];
        var selectedTextP = selectedOptionP.value;

        selectedTextP = Number(selectedTextP)
        selectedTextL = Number(selectedTextL)



        console.log(typeof(selectedTextP));


        atualizar_tela(selectedTextL, selectedTextP)
    }


}

function atualizar_tela(l = null, p = null) {

    var task_cont = document.querySelector('.task-cont');
    task_cont.innerHTML = []

    for (let task of tasks) {
        if (l == 'name' || null && p == 'name' || null) { //Entre se o user não tiver seleciona um filtro

            const item = document.createElement('div')
            item.classList.add('task-item')

            for (var i = 0; i < 7; ++i) {
                var item_cell = document.createElement('div')
                item.appendChild(item_cell)
                item_cell.classList.add('task-cell')

                if (i == 0) {
                    var checkbox_bottom = document.createElement('input')
                    checkbox_bottom.type = 'checkbox'
                    item_cell.appendChild(checkbox_bottom)

                } else if (i == 1) {
                    item_cell.innerText = task.descricao;
                } else if (i == 2) {
                    item_cell.innerText = task.prioridade
                } else if (i == 3) {
                    item_cell.innerText = task.nivel
                } else if (i == 4) {
                    item_cell.innerText = task.situacao
                } else if (i == 5) {
                    item_cell.innerText = task.responsavel
                } else {
                    item_cell.appendChild(buildButtons())
                }
            }

            task_cont.appendChild(item)


        } else { // se o user seleciona algum filtro
            if (task.nivel == l || task.prioridade == p) {

                const item = document.createElement('div')
                item.classList.add('task-item')

                for (var i = 0; i < 7; ++i) {
                    var item_cell = document.createElement('div')
                    item.appendChild(item_cell)
                    item_cell.classList.add('task-cell')

                    if (i == 0) {
                        var checkbox_bottom = document.createElement('input')
                        checkbox_bottom.type = 'checkbox'
                        item_cell.appendChild(checkbox_bottom)

                    } else if (i == 1) {
                        item_cell.innerText = task.descricao;
                    } else if (i == 2) {
                        item_cell.innerText = task.prioridade
                    } else if (i == 3) {
                        item_cell.innerText = task.nivel
                    } else if (i == 4) {
                        item_cell.innerText = task.situacao
                    } else if (i == 5) {
                        item_cell.innerText = task.responsavel
                    } else {
                        item_cell.appendChild(buildButtons())
                    }
                }

                task_cont.appendChild(item)
            } else {
                console.log("Erro aqui")
            }
        }

    }
}

async function carregar_tarefas() {
    const response = await fetch(baseURL)

    const status = response.status
    tasks = await response.json()

    atualizar_tela()
}

function configurar_formulario() {
    const form_task = document.querySelector('#form-task');

    form_task.onsubmit = async function (event) {
        event.preventDefault();

        const dados = form_task.children
        const descricao = dados[1].value
        const responsavel = dados[3].value
        const prioridade = obterValorDoRadioButtons("priori-option")
        const nivel = obterValorDoRadioButtons("level-option")

        const task = {
            descricao,
            responsavel,
            nivel,
            prioridade
        }


        const opcoes = {
            method: "POST",
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(baseURL, opcoes)

        if (response.status === 201) {
            alert('Tarefa cadastrada com sucesso!')
            carregar_tarefas()
            resetarForm()

        } else {
            alert('Terefa não cadastrada')
        }
    }
}

function app() {
    configurar_formulario()
    carregar_tarefas()
    filtrarTarefas()
}


app()