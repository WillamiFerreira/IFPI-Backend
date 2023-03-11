function obterValorDoRadioButtons(name) {
    return document.querySelector(`input[name=${name}]:checked`).value
}
function buildButtons(){
    const buttons_cont = document.createElement('div');

    const edit_btn = document.createElement('a');
    edit_btn.innerHTML = 'Edit';
    edit_btn.href = "#"

    const delete_btn = document.createElement('a');
    delete_btn.innerHTML = 'Delete';
    delete_btn.href = "#"

    buttons_cont.appendChild(edit_btn);
    buttons_cont.appendChild(delete_btn);

    return buttons_cont;

}

function resetarForm(){
    const form_task = document.getElementById('form-task') /*captura o formulário no html */
    form_task.reset() /*reseta todos os valores do input */
}

export {obterValorDoRadioButtons, buildButtons, resetarForm};