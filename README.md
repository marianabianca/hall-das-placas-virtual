# [Hall das Placas Virtual](https://hall-das-placas-virtual.vercel.app/)

O Hall das Placas Virtual é uma plataforma para criação e visualização de placas
de formatura virtuais.

## Executar localmente

Primeiramente, você precisa criar um novo projeto no Firebase.

### Configurando o Firebase

Vá até o [console do Firebase](https://console.firebase.google.com/) e crie um
novo projeto com o nome que desejar.

Então, utilizando a barra ao lado esquerdo, adicione o produto `Authentication`,
basta clicar em `primeiros passos` em sua página. Selecione a opção `E-mail/senha`.

Agora adicione o produto `Firestore`. Selecione ele na barra ao lado esquerdo, e
então clique em `criar banco de dados` em sua página.

Após isso, vá até as `Configurações do projeto`, clicando no botão de engrenagem
na barra do lado esquerdo. Na aba `Geral`, na seção `Seus aplicativos`, crie um
novo aplicativo `Web`, que é representado pelo botão com o símbolo `</>`.

Crie um arquivo `.env` na pasta raiz do Halldas Placas Virtual, copie os dados
do `firebaseConfig`, e cole-os no `.env` criado seguindo o formato do `.example.env`.

### Executando

Após concluir a etapa de configuração do projeto no Firebase, para executar a
aplicação rode os comandos abaixo na pasta raiz:

```
yarn
yarn start
```

Prontinho! Seu projeto deverá estar rodando e funcionando perfeitamente após isso!
