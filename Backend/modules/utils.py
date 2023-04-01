from fastapi import HTTPException, status

def formatar_valores(tarefa):
    tarefa.descricao = tarefa.descricao.capitalize()
    tarefa.responsavel = tarefa.responsavel.capitalize()
    tarefa.situacao = tarefa.situacao.capitalize()
    
    return tarefa

def not_found_error_message(tarefa_id):
    """Função que retorna um mensagem de erro 404"""
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                detail=f'Tarefa com ID {tarefa_id} não encontrada.')
    

