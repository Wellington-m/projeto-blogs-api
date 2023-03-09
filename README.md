# Boas-vindas ao projeto Blogs Api!


## Descrição
Este projeto trata-se de uma api REST na qual disoinibiliza conteúdos para um blog.


## Rodando a aplicação localmente via docker
* Clone o projeto ```git clone git@github.com:Wellington-m/blogs-api.git```
* Entre na pasta ```cd blogs-api```
* Instale as dependências ```npm i```
* Crie os containers ```docker-compose up -d```
* Execute o container blogs_api ```docker exec -it blogs_api bash```
* Rode o comando para criar o banco de dados ```npm run prestart```
* Rode o comando para popular o banco de dados ```npm run seed```
* Rode o comando para iniciar a api ```npm start```


## Nesse projeto, foi utilizado:

  * A _Context API_ do **React** para gerenciar estado.
  * O _React Hook useState_;
  * O _React Hook useContext_;
  * O _React Hook useEffect_;
  * _React Hooks_ customizados.
  * O _styled-components_ para estilização.

