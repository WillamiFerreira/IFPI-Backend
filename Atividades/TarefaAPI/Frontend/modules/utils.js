function obterValorDoRadioButtons(name) {
    return document.querySelector(`input[name=${name}]:checked`).value
}
/*function mudar_btn_editar_para_salvar(){

pass
}

function atualizarTarefa(index){

    let item = this
    item.setAttribute('contenteditable', 'true')
    item.style.backgroundColor = 'red'

    mudar_btn_editar_para_salvar()

}*/

/*function createEditBtnEventListener(edbt){
    const edit_btns = edbt.children[2]
    edit_btns.style.backgroundColor ='red'
}*/

function buildButtons(){
    const buttons_cont = document.createElement('div');

    const edit_btn = document.createElement('a');
    const img = document.createElement('img');
    img.src = './images/lapis.png';
    edit_btn.classList.add('edit_btn');
    img.style.width = '24' + 'px';
    //edit_btn.setAttribute('class', 'edit_btn');
    //createEditBtnEventListener(edit_btn)
    edit_btn.appendChild(img)

    const delete_btn = document.createElement('a');
    const img2 = document.createElement('img');
    img2.src = './images/lata-de-lixo.png';
    img2.style.width = '24' + 'px';
    delete_btn.href = "#"
    delete_btn.appendChild(img2)

    buttons_cont.appendChild(edit_btn);
    buttons_cont.appendChild(delete_btn);

    return buttons_cont;

}

function resetarForm(){
    const form_task = document.getElementById('form-task') /*captura o formulário no html */
    form_task.reset() /*reseta todos os valores do input */
}

export {obterValorDoRadioButtons, buildButtons, resetarForm};