# E-commerce API

API Rest para plataforma de e-commerce, desenvolvida em Node.js com Express, JWT para autenticação e Swagger para documentação. Utiliza banco de dados em memória para fins de aprendizado de testes e automação de API.

## Funcionalidades
- Registro de usuário (sem duplicidade de e-mail)
- Login (por e-mail ou login + senha, retorna JWT)
- Consulta de usuários (autenticado)
- Realização de compras com regras:
  - Compras acima de R$ 5.000,00 exigem cartão de crédito salvo
  - Produtos "exclusivos" só podem ser comprados por usuários verificados
- Documentação Swagger disponível em `/api-docs`

## Estrutura de Pastas
- `controller/` - Lida com requisições HTTP
- `service/` - Lógica de negócios
- `repository/` - Acesso aos dados em memória
- `app.js` - Configuração principal da API
- `server.js` - Inicialização do servidor (usado em testes)

## Instalação
1. Clone o repositório
2. Instale as dependências:
   ```powershell
   npm install express jsonwebtoken swagger-ui-express
   ```

## Como rodar a API
```powershell
node server.js
```
Acesse a documentação Swagger em [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Testes
Para testar a API, utilize ferramentas como [Supertest](https://github.com/visionmedia/supertest) ou [Postman](https://www.postman.com/).

Exemplo de teste com Supertest:
```javascript
const request = require('supertest');
const app = require('./server');

describe('API Test', () => {
  it('deve registrar usuário', async () => {
    const res = await request(app)
      .post('/users/register')
      .send({ name: 'João', email: 'joao@email.com', password: '123456' });
    expect(res.statusCode).toEqual(201);
  });
});
```

## Observações
- O servidor não utiliza `app.listen()` em `server.js` para facilitar testes automatizados.
- O banco de dados é em memória, reiniciado a cada execução.
