## Sequência para a criação do projeto

Criar o arquivo package.
```
npm init
```
```
npm install express --save      
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
```
npm install -g nodemon
```

## Criar o arquivo nodemon.json
{
    "watch": ["src"],
    "ext": "ts",
    "exec": "npm run build-and-run"
}

Compilar o arquivo TypeScript com Nodemon. Executar o arquivo gerado.
```
npm run dev
```

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
    "target": "es2024,
    "module": "NodeNext", 
    "outDir": "./dist",
    "rootDir": "./src",
    "moduleResolution": "NodeNext",
    "esModuleInterop": true, 
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}

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
CREATE DATABASE fullstack_t3 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
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

