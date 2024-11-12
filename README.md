# UniNews

**UniNews** é uma plataforma que fornece notícias e atualizações de várias universidades. Ela permite que os usuários sigam universidades, salvem artigos de notícias e se mantenham atualizados com as últimas informações.

## Índice

- [Recursos](#recursos)
- [Instalação](#instalação)
- [Ferramentas Necessárias](#ferramentas-necessárias)
- [Executando o APK no Celular](#executando-o-apk-no-celular)
- [Contribuição](#contribuição)

## Recursos

- Autenticação e autorização de usuários
- Seguir e deixar de seguir universidades
- Salvar e remover artigos de notícias
- Buscar notícias por universidade
- Buscar todas as universidades e localizações
- Gerenciamento de perfil de usuário
- Funcionalidade de redefinição de senha

## Instalação

Para começar com o UniNews, siga estes passos:

1. **Acesse o repositório** hospedado no GitHub e clone o projeto localmente:
    ```sh
    git clone https://github.com/UniVerse-Uninews/UniNews.git
    ```

2. **Navegue até o diretório do projeto**:
    ```sh
    cd UniNews
    ```

3. **Instale as dependências**:
    - No diretório `client`:
      ```sh
      cd client
      npm install
      ```
    - No diretório `server`:
      ```sh
      cd ../server
      npm install
      ```

4. **Configuração do ambiente**:
    - No diretório `client`, crie um arquivo `.env` com as seguintes variáveis:
      ```env
      REACT_APP_API_URL=http://[seu_ip_local]:[porta]
      EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=[sua_clerk_chave]
      ```
      > **Nota:** Substitua `[seu_ip_local]` pelo seu IP local e `[porta]` pela porta desejada. No site [Clerk](https://clerk.com/), gere uma chave `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` para login via Google.

    - No diretório `server`, crie um arquivo `.env` com os valores:
      ```env
      PORT=[sua_porta]
      JWT_SECRET=[sua_jwt_secret]
      DATABASE_URL=[url_do_seu_banco_de_dados]
      NODE_ENV=dev
      EMAIL_USER=[seu_email]
      EMAIL_PASS=[sua_senha_de_app]
      ```
      > **Nota:** Substitua os valores acima conforme necessário. Use uma URL de conexão MongoDB para o banco de dados, e para `EMAIL_PASS`, gere uma senha de app no Gmail.

5. **Inicialização do Banco de Dados**:
    - No diretório `server`, execute:
      ```sh
      npx prisma generate
      npx prisma db push
      ```

6. **Inicie o Projeto**:
    - No diretório `server`, inicie o servidor:
      ```sh
      npm run dev
      ```
    - No diretório `client`, inicie o cliente:
      ```sh
      npm start
      ```

## Ferramentas Necessárias

- **Node.js**
- **Android Studio** (para emulação no computador)
- **Visual Studio Code**
- **Expo Go** (para funcionamento no celular)

## Executando o APK no Celular

1. Acesse o [site do projeto](https://projetoscti.com.br/projetoscti27/site/) pelo celular e baixe o APK.
2. Após o download, instale o APK para iniciar a aplicação.
   > **Nota:** Caso o arquivo tenha a extensão `.zip`, renomeie-o para `.apk` após o download.

## Contribuição

Contribuições são bem-vindas! Para colaborar, siga os passos abaixo:

1. Faça um fork deste repositório.
2. Crie uma branch para a sua feature.
3. Envie um pull request com uma descrição das alterações.

