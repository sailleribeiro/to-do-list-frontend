# Guia de Testes Unitários - To-Do List Frontend

## 📖 O que são Testes Unitários?

Testes unitários são pequenos pedaços de código que verificam se partes específicas do seu aplicativo funcionam corretamente. É como ter um assistente que testa automaticamente se cada botão, função ou componente faz o que deveria fazer.

## 🛠️ Ferramentas Utilizadas

- **Vitest**: Framework de testes moderno e rápido
- **React Testing Library**: Biblioteca para testar componentes React
- **Jest DOM**: Extensões para verificações mais específicas no DOM
- **User Event**: Simula interações do usuário (cliques, digitação, etc.)

## 📁 Estrutura dos Testes

```
src/test/
├── setup.ts                    # Configurações globais dos testes
├── task-list.test.tsx          # Testes do componente TaskList
└── use-list-tasks.test.tsx     # Testes do hook useListTasks
```

## 🧪 Testes Implementados

### 1. Componente TaskList (`task-list.test.tsx`)

Este componente é responsável por exibir a lista de tarefas e permite ao usuário interagir com elas.

**Cenários testados:**
- ✅ **Lista vazia**: Verifica se mostra "No tasks found" quando não há tarefas
- ✅ **Renderização**: Confirma se todas as tarefas aparecem na tela
- ✅ **Botão Concluir**: Verifica se o botão "Conclude" só aparece para tarefas não concluídas
- ✅ **Estilo visual**: Confirma se tarefas concluídas ficam com opacidade reduzida
- ✅ **Modal de confirmação**: Testa se o modal aparece ao clicar no botão de deletar
- ✅ **Fechar modal**: Verifica se o modal fecha ao clicar em "Cancel"

**Por que testamos isso?**
- Garante que a interface funciona como esperado
- Evita bugs visuais e de interação
- Assegura que as ações do usuário funcionam corretamente

### 2. Hook useListTasks (`use-list-tasks.test.tsx`)

Este hook é responsável por buscar a lista de tarefas da API.

**Cenários testados:**
- ✅ **Sucesso da API**: Verifica se retorna os dados quando a API funciona
- ✅ **Erro da API**: Testa o comportamento quando a API retorna erro
- ✅ **Lista vazia**: Confirma o comportamento quando não há tarefas
- ✅ **Estados de loading**: Verifica os estados de carregamento

**Por que testamos isso?**
- Garante que a comunicação com a API funciona
- Testa cenários de erro que podem acontecer
- Assegura que os estados (loading, error, success) estão corretos

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

## 🔍 Entendendo um Teste

Vamos analisar um teste simples:

```tsx
it('should display "No tasks found" when tasks array is empty', () => {
  // 1. ARRANGE: Preparar os dados
  render(<TaskList tasks={[]} />)
  
  // 2. ACT: Não há ação neste teste, apenas verificação
  
  // 3. ASSERT: Verificar o resultado
  expect(screen.getByText('No tasks found.')).toBeInTheDocument()
})
```

**Explicação:**
1. **ARRANGE** (Preparar): Renderizamos o componente com uma lista vazia
2. **ACT** (Agir): Neste caso, não fazemos nenhuma ação
3. **ASSERT** (Verificar): Confirmamos que o texto "No tasks found" aparece na tela

## 🎯 Conceitos Importantes

### Mocks
```tsx
vi.mock('../services/tasks/tasks-api', () => ({
  taskService: {
    getTasks: vi.fn(),
  },
}))
```
**O que é:** Substituímos a API real por uma versão falsa que podemos controlar.
**Por que:** Permite testar sem depender de um servidor real.

### Queries do Testing Library
- `getByText()`: Encontra elemento pelo texto
- `getAllByRole()`: Encontra múltiplos elementos pelo papel (button, input, etc.)
- `queryByText()`: Como getByText(), mas retorna null se não encontrar

### Assertions (Verificações)
- `expect(elemento).toBeInTheDocument()`: Verifica se está na tela
- `expect(array).toHaveLength(1)`: Verifica o tamanho do array
- `expect(elemento).toHaveClass('classe')`: Verifica se tem uma classe CSS

## 🏃‍♂️ Próximos Passos

Para expandir os testes, você pode:

1. **Testar outros hooks**: `useCreateTask`, `useDeleteTask`, `useDoneTask`
2. **Testar outros componentes**: Formulários, botões, etc.
3. **Testes de integração**: Testar como os componentes funcionam juntos
4. **Testes E2E**: Testar o fluxo completo do usuário

## 💡 Dicas

- **Teste comportamentos, não implementação**: Foque no que o usuário vê e faz
- **Use nomes descritivos**: O nome do teste deve explicar o que está sendo testado
- **Mantenha testes simples**: Um teste deve verificar apenas uma coisa
- **Execute os testes frequentemente**: Quanto mais cedo encontrar bugs, melhor

## 🐛 Debugging

Se um teste falhar:
1. Leia a mensagem de erro cuidadosamente
2. Use `screen.debug()` para ver o HTML renderizado
3. Verifique se os seletores estão corretos
4. Confirme se os mocks estão configurados adequadamente

---

**Lembre-se:** Testes são um investimento. Eles podem parecer trabalho extra no início, mas economizam muito tempo evitando bugs e facilitando mudanças futuras no código!
