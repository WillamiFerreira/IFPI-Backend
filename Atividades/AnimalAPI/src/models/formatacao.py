def formatar_valores(animal):
    """Função recebe um objeto Tarefa e modifica os valores string de seus atributos, fazendo
    eles ficarem com a primeira letra maiúscula."""
    animal.nome = animal.nome.capitalize()
    animal.sexo = animal.sexo.capitalize()
    animal.cor = animal.cor.capitalize()
    
    return animal