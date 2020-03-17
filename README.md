# Plataforma de Detecção de Talhões

## Equipe
Bruno Henrique, Iago Cardial, Matheus Vilela, Mayra Bernardes, Willyan Antunes;


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
