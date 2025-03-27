

# Agenda Eletrônica

Uma aplicação Angular para gerenciamento de compromissos, contatos, locais e usuários, com autenticação JWT e suporte a dois níveis de acesso (usuário comum e administrador). Os usuários comuns podem gerenciar seus próprios compromissos e contatos, enquanto administradores têm acesso completo ao sistema, incluindo gerenciamento de locais e usuários.

## Requisitos para Rodar

### Pré-requisitos
- **Node.js**: Versão 16 ou superior
- **npm**: Versão 8 ou superior
- **Angular CLI**: Instale globalmente com `npm install -g @angular/cli`
- **JSON Server**: Para simular a API local

### Dependências
Instale as dependências do projeto:
```bash
npm install
npm install @angular/material @angular/cdk
```

### Executando o Projeto
1. Inicie o servidor Angular:
   ```bash
   ng serve
   ```
2. Acesse a aplicação em `http://localhost:4200`.
