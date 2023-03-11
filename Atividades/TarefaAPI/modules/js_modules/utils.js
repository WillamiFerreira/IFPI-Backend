function obterValorDoRadioButtons(name) {
    return document.querySelector(`input[name=${name}]:checked`).value
}

export default obterValorDoRadioButtons;