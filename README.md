# Plataforma de Detecção de Talhões

### Equipe 4
### Bruno Henrique, Iago Cardial, Matheus Vilela, Mayra Bernardes e Willyan Antunes
#

### Entregas
### [- Gerenciamento da Sprint - Burn Down e Custo](https://drive.google.com/open?id=18nxotizbgWOUV79GEEmgSKg7JJiXPh1RW-djI0H_5po)

### [- Priorização Ágil do Projeto](https://drive.google.com/open?id=1fPgkGqo3wlhHqdagS5zdr_9R37E_ryQD)

### [- Entrega 3 - 29-05-2020](https://drive.google.com/drive/folders/1T9M7tOpUUz0_yKG-bx7DxeZ2GFKUhSbj?usp=sharing)
- Construção de api para IA, que receba e recorte AOI no raster file, faça a predição e retorne a máscara binária.
- Atualização no backend para que ele consulte o serviço da IA
- Desenvolvimento de página para predição de talhoes, contendo o componente para selecionar AOI e um modal para selecionar raster e enviar para o backend.
- Estabelecer uma consulta a uma API que retorne todos os raster que contenham o polígono estabelecido.

### [- Todos os Arquivos do Projeto](https://drive.google.com/open?id=1VwCP69CIkUA82ie0dcBAwo4NLiBk8iC7)
#

# Adonis fullstack application

This is the fullstack boilerplate for AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Session
3. Authentication
4. Web security middleware
5. CORS
6. Edge template engine
7. Lucid ORM
8. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
npm i -g @adonisjs/cli
npm install
cp .env.example .env
adonis key:generate
adonis serve --dev
```


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```
