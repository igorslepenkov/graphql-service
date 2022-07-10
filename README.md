# Graphql-service

## For RSSchool (NodeJS basic course)

### 0) Prerequisites

    - To use this application you will need microservices, that located within this link: https://github.com/rolling-scopes-school/node-graphql-service
    - Also you will need NodeJS 16.5.0 and NPM installed on your device

### 1) Installing

    After cloning the repository use **npm install** command

### 2) Runnning

    Use **npm run dev** to start the server

### 3) Using

    After start in dev mode, Apollo Server starting at http://localhost:8000
    You can use it for better graphQL experience. Apollo Server has all needed documentation about quering and mutating data in microservices.

    Authentification token is taken either from request.headers.authentification or from token, that you will recieve after registration. This token will bew added to modules/jwt/token.json file and after login your user you will have this token passed in all your requests
    (PLEASE NOTE THAT AFTER EACH PROCESS EXITING YOUR TOKEN WILL BE DELETED AND YOU WILL NEED TO LOGIN AGAIN. THAT WAS IMPLEMENTED BECAUSE IN NORMAL CASE WE WILL KEEP AUTH TOKEN AND OTHER USER INFO ONLY ON USER'S DEVICE. IN CASE IF YOU HAVE FOUND THIS UNEFFICIENT, PLEASE USE AUTH HEADER IN YOUR REQUEST INSTEAD)

    (ПОЖАЛУЙСТА ЗАМЕТЬТЕ, ЧТО ПОСЛЕ ЛЮБОГО ВЫХОДА ИЗ ПРОЦЕССА ВАМ НУЖНО БУДЕТ ЛОГИНИТЬ ЮЗЕРА ПО НОВОЙ. ЭТО СДЕЛАНО ПРОСТО ИЗ ЗДРАВОГО СМЫСЛА, ЧТОБЫ ПОСТОЯННО ВНУТРИ СЕРВИСА НЕ ХРАНИЛСЯ ТОКЕН, КОТОРЫЙ ДОЛЖЕН В НОРМАЛЬНОМ СЛУЧАЕ ХРАНИТЬСЯ ТОЛЬКО НА КОМПЬЮТЕРЕ У ПОЛЬЗОВАТЕЛЯ. ЕСЛИ ЭТО ОКАЖЕТСЯ НЕУДОБНЫМ ИСПОЛЬЗУЙТЕ АУТЕНТИФИКАЦИОННЫЙ ХЕДЕР РЕКВЕСТА)
