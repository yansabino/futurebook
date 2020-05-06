# futurebook-backend

## Stack
Esse é um projeto de Backend feito utilizando NodeJS, Express, jwt, Typescript e MySQL. Além disso, ele segue uma arquitetura em camadas simples:
1. Presentation: responsável pela comunicação com agentes externos (como o Frontend)
1. Data: responsável pela comunicação direta com o banco de dados
1. Business: responsável pela lógica de negócio
Por fim, ressalta-se que a comunicação da camada `Data` e a `Business` é feita através de interfaces denominadas `Gateway`, para possibilitar os testes unitários desta última camada (inversão de dependências).

## Sobre
Esse foi um projeto de Backend que utilizei para reproduzir o funcionamento do sistema que o Facebook utiliza, nele é possivel se cadastrar, fazer login , fazer e desfazer amizades. Além disso o usuário pode criar, curtir, descurtir e comentar Posts.
Além de Poder ver o feed com os posts de amigos e o feed de posts de amigos classificados como um Post tipo Normal ou tipo Evento.

## Instruções para rodar

- Clone o Repositório e com ele em sua máquina: `git clone https://github.com/yansabino/futurebook-backend.git`
- Agora basta abrir o terminal e navegar até o repositório: `cd futurebook-backend`
- E então instala-lo e rodar-lo:
    1. `npm install` para instalar todas as dependências;
    1. `npm run start` para rodar localmente o projeto
    1. Rodar os Endpoints no localhost de sua máquina. 
    1. `npm run build` para gerar uma versão possível de ser deployada com os arquivos transpilados para Javascript

