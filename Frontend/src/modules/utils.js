
function obterValorDoRadioButtons(name) {
    return document.querySelector(`input[name=${name}]:checked`).value
}


function resetarForm(){
    const form_task = document.getElementById('form-task') /*captura o formulário no html */
    form_task.reset() /*reseta todos os valores do input */
}

export {obterValorDoRadioButtons, resetarForm};