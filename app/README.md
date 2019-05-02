## Local setup

### Dependência

  - Node.js com gereciador de pacotes
  - Ruby v2.5.1
  - Postgres v10.3+
  - [API](https://github.com/myfreecomm/desafio-frontend-api.git)


### Configuração

Instale todos os pacotes necessários.

```bash
$ npm install
```

Execute o servidor local usando a porta 8888 e compile os arquivos necessários.

```bash
$ gulp
```


#### Caso precise alterar a porta do servidor local

Caso precise alterar a porta do servidor local, veja o arquivo `gulpfile.js`, altere a porta na linha abaixo.

```
	var server = gls.static('./public', 8888);
```

E execute o servidor local.

```bash
$ gulp
```

Acesse o servidor local no browser: http://localhost:8888/


### Executando aplicação em desenvolvimento

Instale os pacotes necessários para desenvolvimento e execute o servidor local.

```bash
$ npm install
$ gulp
```


#### Alterando url de requisição

Caso precise modificar url de requisição, faça a alteração no arquivo ```public/assets/js/src/index.js``` e execute o servidor local.

```bash
$ gulp
```

Acesse o servidor local no browser: http://localhost:8888/