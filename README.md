# Boas-vindas ao projeto Blogs Api!


## Descrição
API REST CRUD que disponibiliza conteúdos para um blog.


## Rodando a aplicação via docker
* Clone o projeto ```git clone git@github.com:Wellington-m/blogs-api.git```
* Entre na pasta ```cd blogs-api```
* Instale as dependências ```npm i```
* Crie os containers da api e do banco de dados ```docker-compose up -d```
* Execute o container blogs_api ```docker exec -it blogs_api bash```
* Rode o comando para criar o banco de dados ```npm run prestart```
* Rode o comando para popular o banco de dados ```npm run seed```
* Rode o comando para iniciar a api ```npm start```

Após se certificar de que a aplicação esta rodando, deve aparecer a mensagem "ouvindo na porta 3000", como na imagem abaixo:

![Screenshot from 2023-03-09 14-19-50](https://user-images.githubusercontent.com/98190059/224122302-0a670abb-e3f3-4078-8944-170949d77b03.png)

Abra alguma ferramenta para requisições HTTP como postman, insominia, thunderCliente etc...
Utilize a rota http://localhost:3000/login para fazer login passando as informações pelo body:
```JSON
{
 "email": "lewishamilton@gmail.com",
 "password": "123456"
}
```

- **:warning: Atenção:** Será retornado um token para ser utilizado no *Header* das demais requisições.

Para criar um post é esperado um objeto no body do tipo:
```JSON
{
 "title": "Titulo do post",
 "content": "conteúdo do post",
 "categoryIds": [4] //É esperado um ou mais id a categoria que o post pertence
}
```

Para editar um post é esperado um objeto no body do tipo:
```JSON
{
  "title": "Titulo do post",
  "content": "conteúdo do post"
}
```

As rotas disponíveis são:
### Post
* Login: ```http://localhost:3000/login```
* Criar um post: ```http://localhost:3000/post```
* Criar uma categoria: ```http://localhost:3000/categories```

### Get
* Listar todos os posts: ```http://localhost:3000/post```
* Procurar um post pelo ID: ```http://localhost:3000/post/id```
* Procurar um post por parâmetro: ```http://localhost:3000/post/search?q=ano```
* Listar todos os usuários: ```http://localhost:3000/user```
* Buscar usuário pelo ID: ```http://localhost:3000/user/id```
* Listar todas as categotias: ```http://localhost:3000/categories```

### Put
* Editar um post pelo ID: ```http://localhost:3000/post/id```

### Delete
* Deletar um post pelo id: ```http://localhost:3000/post/id```
* Deletar o usuário que esta logado com base no token: ```http://localhost:3000/user/me```


## Nesse projeto, foi utilizado:

  * Node.js com Express
  * JWT
  * Sequelize
  * Jest e Frisby para testes
