function createEditBtnEventListener(){
    const edit_btns = document.querySelectorAll('.edit_btn');
    for (btn of edit_btns){
        btn.addEventListener('click', function(){
            alert('Chamar função que muda o botão')
            alert('Chamar função que modifica tarefa')
        } )
    }
};

function buildButtons(){
    const buttons_cont = document.createElement('div');

    const edit_btn = document.createElement('a');
    const img = document.createElement('img');
    img.src = './images/lapis.png';
    edit_btn.classList.add('edit_btn');
    img.style.width = '24' + 'px';
    //edit_btn.setAttribute('class', 'edit_btn');
    createEditBtnEventListener()
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

export {buildButtons, createEditBtnEventListener}