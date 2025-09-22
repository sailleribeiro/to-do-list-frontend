# To-Do List Frontend

Uma aplicação frontend para gerenciamento de tarefas (to-do list) construída com React e TypeScript, oferecendo uma interface moderna e responsiva para criação, visualização, conclusão e exclusão de tarefas.

## 🚀 Tecnologias Utilizadas

### Core
- **React** `^19.1.1` - Biblioteca para construção da interface
- **TypeScript** `~5.8.3` - Superset do JavaScript com tipagem estática
- **Vite** `^7.1.6` - Build tool e dev server

### UI e Estilização
- **Tailwind CSS** `^4.1.13` - Framework CSS utility-first
- **Radix UI** - Componentes acessíveis e não estilizados
  - Alert Dialog `^1.1.15`
  - Checkbox `^1.3.3`
  - Dialog `^1.1.15`
  - Slot `^1.2.3`
  - Tabs `^1.1.13`
- **Lucide React** `^0.544.0` - Ícones
- **Class Variance Authority** `^0.7.1` - Variantes de componentes
- **Next Themes** `^0.4.6` - Gerenciamento de temas

### Estado e Requisições
- **TanStack React Query** `^5.89.0` - Gerenciamento de estado servidor
- **Axios** `^1.12.2` - Cliente HTTP

### Notificações
- **Sonner** `^2.0.7` - Sistema de notificações toast

### Testes
- **Vitest** `^3.2.4` - Framework de testes
- **React Testing Library** `^16.3.0` - Utilitários para testar componentes React
- **Jest DOM** `^6.8.0` - Matchers customizados para DOM
- **User Event** `^14.6.1` - Simulação de eventos do usuário
- **jsdom** `^27.0.0` - Implementação DOM para Node.js

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base da interface
│   └── skeleton/       # Componentes de loading
├── hooks/              # Hooks customizados
│   ├── mutations/      # Hooks para operações de escrita
│   └── queries/        # Hooks para operações de leitura
├── services/           # Camada de serviços/API
├── contexts/           # Contextos React
├── pages/              # Páginas da aplicação
├── lib/                # Utilitários e configurações
└── test/               # Testes unitários e mocks
```

## ⚙️ Instalação e Execução

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação das dependências
```bash
npm install
```

### Executar em modo de desenvolvimento
```bash
npm run dev
```
A aplicação estará disponível em `http://localhost:5173`

### Build para produção
```bash
npm run build
```

### Preview do build de produção
```bash
npm run preview
```

## 🧪 Testes

O projeto possui uma suíte completa de testes unitários implementada com Vitest e React Testing Library.

### Executar todos os testes
```bash
npm run test:run
```

### Executar testes em modo watch
```bash
npm run test
```

### Interface visual dos testes
```bash
npm run test:ui
```

### Cobertura de Testes
- **TaskList Component**: 7 testes (renderização, interações, modais)
- **useListTasks Hook**: 4 testes (sucesso, erro, estados)
- **Total**: 11 testes implementados

### Estrutura de Testes
```
src/test/
├── setup.ts                 # Configuração global dos testes
├── task-list.test.tsx       # Testes do componente TaskList
├── use-list-tasks.test.tsx  # Testes do hook useListTasks
└── __mocks__/               # Mocks organizados
    ├── data/                # Dados de teste
    ├── hooks/               # Mocks dos hooks
    └── services/            # Mocks dos serviços
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera o build de produção
- `npm run lint` - Executa o linter ESLint
- `npm run preview` - Visualiza o build de produção
- `npm run test` - Executa testes em modo watch
- `npm run test:run` - Executa todos os testes uma vez
- `npm run test:ui` - Interface visual para os testes

## 📋 Funcionalidades

- ✅ Listar tarefas
- ✅ Criar nova tarefa
- ✅ Marcar tarefa como concluída
- ✅ Deletar tarefa
- ✅ Interface responsiva
- ✅ Tema claro/escuro
- ✅ Notificações toast
- ✅ Estados de loading
- ✅ Tratamento de erros

## 🏗️ Arquitetura

O projeto segue uma arquitetura baseada em:
- **Separation of Concerns**: Separação clara entre UI, lógica de negócio e dados
- **Custom Hooks**: Encapsulamento da lógica de estado e side effects
- **Service Layer**: Abstração das chamadas de API
- **Component Composition**: Composição de componentes reutilizáveis
- **Type Safety**: Tipagem rigorosa com