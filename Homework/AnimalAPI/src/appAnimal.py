from fastapi import FastAPI, status, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

origins = [
    "http://127.0.0.1:5500"
]

app.add_middleware(
    CORSMiddleware, 
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class Animal(BaseModel):
    id: int | None
    nome: str
    idade: int
    sexo: str
    cor: str

animais: list[Animal] = []

@app.post('/animais', status_code=status.HTTP_201_CREATED)
def adiciononar_animal(animal: Animal):
    """Recebe um objeto animal, atribui um ID e adiciona na lista de animais"""
    animal.id = len(animais)
    animais.append(animal)
    
    return animal

@app.get('/animais')
def lista_animais():
    """Retorna todos os animais cadastrados na lista."""
    return animais;

@app.get('/animais/{animal_id}')
def obter_animal(animal_id : int):
    "Retorna um item da lista a partir do ID"
    for animal in animais:
        if animal.id ==  animal_id:
            return animal
        
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail= f'Animal com ID {animal_id} não está cadastrado.')

@app.delete('/animais/{animal_id}')
def deletar_animal(animal_id : int):
    "Deleta um animal da lista a partir do ID"
    for animal in animais:
        if animal.id == animal_id:
            animais.remove(animal)
            return animal
    
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail= f'Animal com ID {animal_id} não está cadastrado.')
    