## Requisitos

Node.js 22 ou superior

## NVM

```
nvm -v
```
```
nvm list
```
```
nvm install 22
```
```
nvm use 22
```
```
nvm install 24
```
```
nvm use 24
```
```
node -v
```

## Como rodar o projeto baixado

Duplicar o arquivo ".env_example" e renomear para ".env"<br>
Alterar no arquivo ".env" as credenciais do banco de dados.<br>

Instalar todas as dependências
```
npm install
```

Duplicar o arquivo ".env_example" e renomear para ".env".<br>
Alterar no arquivo .env as credenciais do banco de dados.<br>

## Requisições

Importar a collection do diretório "Thunder-client" para o Thunder Client (app ou no VSCode).<br>
Alterar a URL em "Base URL no Thunder-Client".<br>

## Sequência pra criar o projeto

Criar o arquivo package.
```
npm init
```
```
npm install express --save      OU
```
```
npm i express
```

Instalar os pacotes para suporte ao TypeScript

```
npm i --save-dev @types/express
```
```
npm i --save-dev @types/node
```

Instalar o compilador do projeto do TypeScript para reiniciar o projeto quando o arquivo for modificado.
```
npm i --save-dev ts-node
```

Gerar o arquivo de configuração para o TypeScript
```
npx tsc --init
```

Compilar o arquivo TypeScript
```
npx tsc
```

Executar o arquivo gerado com Node.js
```
node dist/index.js
```

Instalar o nodemon: instalar a dependência de forma global: 
-g significa globalmente. Executar o comando através do prompt de comando.
```
npm install -g nodemon
```

Criar o arquivo nodemon.json

{
    "watch": ["src"],
    "ext": "ts",
    "exec": "npm run build-and-run"
}

Compilar o arquivo TypeScript com Nodemon. Executar o arquivo gerado.
```
npm run dev
```

Alterar a chave "scripts" do arquivo package.json para:

{
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "build-and-run": "npm run build && npm run start",
    "dev": "nodemon",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
}

Instalar a dependência para rodar os processos simultaneamente.
```
npm install --save-dev concurrently
```

Alterar a chave "scripts" do arquivo package.json usando o atributo --watch

  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "watch": "tsc --watch",
    "start:watch": "concurrently -k \"npm:watch\" \"node --watch dist/index.js\"",
    "dev": "npm run start:watch",
      "test": "echo \"Error: no test specified\" && exit 1"
  },

Compilar o arquivo TypeScript. Executar o comando para iniciar o projeto
```
npm run start:watch
```

## Código

Alterar o tsconfig.json para:

{
  "compilerOptions": {
    "target": "es2024",
    "module": "NodeNext", // Ou "CommonJS" dependendo da sua estrutura
    "outDir": "./dist",
    "rootDir": "./src",
    "moduleResolution": "NodeNext",
    "esModuleInterop": true, // Essencial para importar o Express corretamente
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "resolveJsonModule": true
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules"
  ]
}

## Git

* Repositório Git: extensão .git

## Como enviar e baixar os arquivos do GitHub

```
git clone --branch <branch_name> <repository_url> .
```

Baixar as atualizações do GitHub (Verificar se o projeto foi modificado e atualizá-lo).
```
git pull
```

Adicionar todos os arquivos modificados no Staging Area (área de preparação).
```
git add .
```

Commit: representa um conjunto de alterações em um ponto específico do seu projeto, registra apenas as alterações adicionadas ao índice de preparação. O atributo -m permite que seja inseria uma mensagem junto ao commit através da linha de comando.
```
git commit -m "Descrição do commit"
```

Enviar os commits locais para um repositório remoto.
```
git push <remote> <branch_name>
```

Exemplo:

```
git -v
```

Clonar um projeto dentro do próprio diretório
```
git clone -b projeto https://github.com/cgetchepare//projeto.git .                   OU
```
```
git clone --branch projeto https://github.com/cgetchepare//projeto.git .
```
```
git pull
```
```
git add .
```
```
git commit -m "Base do projeto"
```
```
git push origin main
```

## .gitignore

# Arquivo .gitignore
# Dependências do Node.js
/node_modules

# Diretórios com os arquivos compilados
/dist
/build

# TypeScript
.tsbuildinfo

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.*.local

# Editor-specific files
.vscode/
.idea/
*.swp
*.swo
*.DS_Store
Thumbs.db

# OS-specific files
.DS_Store
*.lock

# Other
coverage/
tmp/

# Banco de Dados

MySQL
```
npm install mysql --save      OU
```
```
npm install mysql2 --save 
```

PostgreSQL
```
npm install pg --save
```

SQLite
```
npm install sqlite3 --save
```

Microsoft SQL Server
```
npm install mssql --save
```

sql.js
```
npm install sql.js --save
```

## Banco de Dados MySQL

```
mysql --version
```
```
mysql -h localhost -u root -p
```

Após logar, no prompt do mysql, mostrar os bancos de dados instalados
```
SHOW DATABASES;
```

Comando SQL para criação da base de dados
```
CREATE DATABASE <banco_de_dados> CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Inicializar o MySQL através do prompt, modo de Administador do PowerShell.
```
net start mysql80
```

Instalar o drive do banco de dados MySQL
```
npm install mysql2 --save
```

Manipular variáveis de ambiente.
```
npm install dotenv --save
```

Instalar os tipos do TypeScript
```
npm install --save-dev @types/dotenv
```

Criar o arquivo src/data-source.ts

## TypeORM

Instalar a biblioteca para conectar o Node.js (TypeScript) com o banco de dados.
```
npm install typeorm --save
```

Biblioteca utilizada no TypeScript para adicionar metadados (informações adicionais) a classes.
```
npm install reflect-metadata --save
```

## Migrações
```
npx typeorm migration:create src/migration/<nome-da-migration>
```

```
npx typeorm migration:create src/migration/CreateSituationsTable
```

```
npx typeorm migration:create src/migration/CreateUsersTable
```

Executar as migrations para criar as tabelas no banco de dados.
```
npm run build
npx typeorm migration:run -d dist/data-source.js
```

Executar as seeds para cadastrar registros de testes nas tabelas do banco de dados.
```
node dist/run-seeds.js
```

Validar formulário
```
npm install yup
```

Permitir requisição externa
```
npm install cors
```

```
npm install --save-dev @types/cors
```

## DotEnv

Instalar a biblioteca dotenv
```
npm install dotenv
```

Instalar os tipos do TypeScript
```
npm install --save-dev @types/dotenv
```
