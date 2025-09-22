# Guia de Testes Unitários - To-Do List Frontend

## 🛠️ Ferramentas Utilizadas

- **Vitest**: Framework de testes moderno e rápido
- **React Testing Library**: Biblioteca para testar componentes React
- **Jest DOM**: Extensões para verificações mais específicas no DOM
- **User Event**: Simula interações do usuário (cliques, digitação, etc.)

## 📁 Estrutura dos Testes (Organizada)

```
src/test/
├── setup.ts                           # Configurações globais dos testes
├── task-list.test.tsx                 # Testes do componente TaskList
├── use-list-tasks.test.tsx            # Testes do hook useListTasks
└── __mocks__/                         # Pasta centralizada de mocks
    ├── index.ts                       # Arquivo central de exports
    ├── data/
    │   └── mock-tasks.ts              # Dados de teste reutilizáveis
    ├── hooks/
    │   └── mutations/
    │       ├── use-done-task.ts       # Mock do hook useDoneTask
    │       └── use-delete-task.ts     # Mock do hook useDeleteTask
    └── services/
        └── tasks/
            └── tasks-api.ts           # Mock da API de tarefas
```

### 🔧 Benefícios da Nova Estrutura:

1. **Reutilização**: Mocks podem ser usados em múltiplos testes
2. **Manutenção**: Fácil de atualizar quando a API mudar
3. **Organização**: Estrutura espelha a estrutura do projeto real
4. **Clareza**: Cada mock tem sua responsabilidade específica
5. **Escalabilidade**: Fácil adicionar novos mocks conforme projeto cresce

## 🧪 Testes Implementados

### 1. Componente TaskList (`task-list.test.tsx`) - 7 Testes

Este componente é responsável por exibir a lista de tarefas e permite ao usuário interagir com elas.

**Cenários testados:**
- ✅ **Lista vazia**: Verifica se mostra "No tasks found" quando não há tarefas
- ✅ **Renderização completa**: Confirma se todas as tarefas e descrições aparecem na tela
- ✅ **Botão Concluir**: Verifica se o botão "Conclude" só aparece para tarefas não concluídas
- ✅ **Estilo visual**: Confirma se tarefas concluídas ficam com opacidade reduzida (opacity-50)
- ✅ **Modal de confirmação**: Testa se o modal aparece ao clicar no botão de deletar
- ✅ **Fechar modal**: Verifica se o modal fecha ao clicar em "Cancel"
- ✅ **Ação de conclusão**: Testa se a função `markAsDone` é chamada corretamente

**Dados de teste utilizados:**
```typescript
// 3 tarefas: 2 não concluídas + 1 concluída
mockTasks = [
  { id: "1", title: "Tarefa 1", done: false },
  { id: "2", title: "Tarefa 2", done: true },
  { id: "3", title: "Tarefa 3", done: false }
]
```

### 2. Hook useListTasks (`use-list-tasks.test.tsx`) - 4 Testes

Este hook é responsável por buscar a lista de tarefas da API usando React Query.

**Cenários testados:**
- ✅ **Sucesso da API**: Verifica se retorna os dados quando a API funciona
- ✅ **Erro da API**: Testa o comportamento quando a API retorna erro
- ✅ **Lista vazia**: Confirma o comportamento quando não há tarefas
- ✅ **Estados corretos**: Verifica os estados de loading, success, error

**Estados testados:**
- `isLoading`: true → false
- `isSuccess`: false → true (em caso de sucesso)
- `isError`: false → true (em caso de erro)
- `data`: undefined → dados da API
- `error`: null → objeto de erro (em caso de erro)

## 🎯 Mocks Organizados

### 📊 Dados Mock (`mock-tasks.ts`)
```typescript
mockTasks: 3 tarefas (2 incompletas, 1 completa)
emptyTasks: array vazio []
singleTask: uma tarefa individual para testes específicos
```

### 🔗 Hooks Mock
- `use-done-task.ts`: Mock do hook para marcar tarefa como concluída
- `use-delete-task.ts`: Mock do hook para deletar tarefa

### 🌐 Services Mock
- `tasks-api.ts`: Mock da API com todos os métodos (getTasks, createTask, etc.)

## 🚀 Como Executar os Testes

### Comandos Disponíveis:

```bash
# Executar todos os testes uma vez
npm run test:run

# Executar testes em modo watch (re-executa quando arquivos mudam)
npm run test

# Executar testes com interface visual
npm run test:ui
```

### Resultado Esperado:
```
✓ TaskList Component (7 testes)
✓ useListTasks Hook (4 testes)

Total: 11 testes passando ✅
```

## 🔍 Entendendo um Teste

Vamos analisar um teste simples:

```tsx
it('should display "No tasks found" when tasks array is empty', () => {
  // 1. ARRANGE: Preparar os dados
  render(<TaskList tasks={emptyTasks} />)
  
  // 2. ACT: Não há ação neste teste, apenas verificação
  
  // 3. ASSERT: Verificar o resultado
  expect(screen.getByText('No tasks found.')).toBeInTheDocument()
})
```

**Padrão AAA:**
1. **ARRANGE** (Preparar): Renderizamos o componente com dados específicos
2. **ACT** (Agir): Executamos a ação que queremos testar (clique, digitação, etc.)
3. **ASSERT** (Verificar): Confirmamos que o resultado está correto

## 🎯 Conceitos Importantes

### Mocks
```tsx
vi.mock('../hooks/mutations/use-done-task', async () => {
  const mock = await import('./__mocks__/hooks/mutations/use-done-task')
  return mock
})
```
**O que é:** Substituímos implementações reais por versões controláveis.
**Por que:** Permite testar em isolamento, sem dependências externas.

### Queries do Testing Library
- `getByText()`: Encontra elemento pelo texto (falha se não encontrar)
- `queryByText()`: Encontra elemento pelo texto (retorna null se não encontrar)
- `getAllByText()`: Encontra múltiplos elementos pelo mesmo texto
- `getAllByRole('button')`: Encontra todos os botões

### Assertions (Verificações)
- `expect(elemento).toBeInTheDocument()`: Verifica se está na tela
- `expect(array).toHaveLength(2)`: Verifica o tamanho do array
- `expect(elemento).toHaveClass('opacity-50')`: Verifica se tem uma classe CSS
- `expect(mock).toHaveBeenCalledWith('1')`: Verifica se função foi chamada com parâmetro específico

### Async/Await em Testes
```tsx
await waitFor(() => {
  expect(result.current.isLoading).toBe(false)
})
```
**Quando usar:** Para aguardar mudanças de estado assíncronas (API calls, etc.)

## 🏃‍♂️ Próximos Passos

Para expandir os testes, você pode:

1. **Testar outros hooks**: `useCreateTask`, `useDeleteTask`, `useDoneTask`
2. **Testar outros componentes**: Formulários, modais, inputs
3. **Testes de integração**: Como TaskList + hooks funcionam juntos
4. **Testes de fluxo de usuário**: Criar → Editar → Concluir → Deletar tarefa
5. **Testes de erro**: Cenários quando API falha
6. **Testes de loading**: Estados de carregamento

## 💡 Dicas Avançadas

### Organização
- **Um arquivo de teste por componente/hook**: Facilita manutenção
- **Mocks centralizados**: Reutilize dados e mocks entre testes
- **Nomes descritivos**: `should render task title correctly` é melhor que `test 1`

### Performance
- **Use `beforeEach`**: Limpe mocks entre testes
- **Configure retry: false**: Evita delays desnecessários nos testes
- **Mock apenas o necessário**: Não mocke tudo, apenas dependências externas

### Debugging
```tsx
// Ver o HTML renderizado
screen.debug()

// Ver elemento específico
screen.debug(screen.getByText('Tarefa 1'))
```

## 🐛 Troubleshooting

### Problemas Comuns:

1. **"Unable to find element"**
   - Verifique se o texto está exato (maiúsculas, pontuação)
   - Use `screen.debug()` para ver o HTML
   - Considere usar `queryBy` em vez de `getBy`

2. **"Element is not in document"**
   - Aguarde elementos assíncronos com `waitFor()`
   - Verifique se o componente renderizou corretamente

3. **"Mock not working"**
   - Confirme se o caminho do mock está correto
   - Use `vi.clearAllMocks()` no `beforeEach`
   - Verifique se o mock está sendo importado antes do componente

### Comandos Úteis:
```bash
# Executar teste específico
npm run test task-list

# Executar com mais detalhes
npm run test -- --reporter=verbose

# Executar e parar no primeiro erro
npm run test -- --bail
```

---

## 📊 Resumo da Cobertura

- **Componentes**: 1/1 (TaskList) ✅
- **Hooks**: 1/4 (useListTasks) ⚠️
- **Cenários**: 11 testes cobrindo casos principais ✅
- **Estrutura**: Organizada e reutilizável ✅

**Lembre-se:** Testes são um investimento. Eles podem parecer trabalho extra no início, mas economizam muito tempo evitando bugs e facilitando mudanças futuras no código!