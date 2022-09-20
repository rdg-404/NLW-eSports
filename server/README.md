<h1 align="center">NLW eSports | Rocketseat :purple_heart:</h1>



<h1 align="center">Para ficar de olho nas rotas</h1>

* Insominia, Postman ou Hoppscoth (https://hoppscotch.io/)
<h3> Isso é pra tu ter um pouca mais de confiabilidade nas rotas, só isso mesmo </h3>
<br><br><br>

<h1 aligin="center">Dependências</h1>
<h3> Aqui vai tudo que tua aplicação vai precisar para rodar o backend</h3>
<br><br><br>

``` ruby
    
    node caminho do arquivo  (node build/server.js)
    
```

* Para rodar o projeto
<br><br><br>


``` node

    npm install express 
    
```

* Utilizar rotas, tipo, tu acessar um determinado caminho de url 
<br><br><br>


``` css

    npm i typescript -D
    
```

* Instalar o typescript apenas para desenvolvimento, vou nem falar nada sobre essa linguagem
<br><br><br>

``` css

    npm run build
    
```

* Cria um arquivo js, baseado no typescript, dentro de uma pasta build (alterando o outrout la no arquivo config do ts), para poder executar a app com ``` node src/server.js ```
<br><br><br>


``` css

    npx tsc --init
    
```

* Cria o arquivo config do typescript
<br><br><br>


``` css
    
    npm i @types/express -D
    
```

* Lib para o express reconhecer ts
<br><br><br>


``` css
    
     npm i ts-node-dev -D

```
* Para a app atualizar automaticamente sem ter que reiniciar o node (rodar com ``` npm run dev ```)



``` css 
    
    npm i prisma -D

```
``` css 

      "[prisma]": {
        "editor.formatOnSave": true,
    },

```

* Add nos settings do vscode para identar os códigis prisma


``` css 
   
   npx prisma init --datasource--provider SQLite

```


``` css 
    
    npx prisma migrate dev
    
```
* Junta todas as alterações feitas no db, executar sempre que alterar o arquivo schema.prisma para refletir no db

``` css 
    
     npx prisma studio
    
```
* Abre um editor de db do prisma


``` css 
    
    npm i @prisma/client
    
```

* Para o prisma se conectar com o banco de dados 

``` css 

    npm i cors

```

* Lib para configurar qual dominio front tera acesso ao back


``` css 

    
    npm i @types/cors -D
    
```

* Para a lib reconhecer Typescript
