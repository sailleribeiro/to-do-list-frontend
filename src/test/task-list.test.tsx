import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { TaskList } from "../components/task-list";
import { mockTasks, emptyTasks, mockUseDoneTask } from "./__mocks__";

// Aplicar os mocks
vi.mock("../hooks/mutations/use-done-task", async () => {
  const mock = await import("./__mocks__/hooks/mutations/use-done-task");
  return mock;
});

vi.mock("../hooks/mutations/use-delete-task", async () => {
  const mock = await import("./__mocks__/hooks/mutations/use-delete-task");
  return mock;
});

describe("TaskList Component", () => {
  beforeEach(() => {
    // Limpa os mocks antes de cada teste
    vi.clearAllMocks();
  });

  /**
   * TESTE 1: Renderização quando não há tarefas
   * Verifica se a mensagem "No tasks found" aparece quando a lista está vazia
   */
  it('should display "No tasks found" when tasks array is empty', () => {
    render(<TaskList tasks={emptyTasks} />);

    expect(screen.getByText("No tasks found.")).toBeInTheDocument();
  });

  /**
   * TESTE 2: Renderização das tarefas
   * Verifica se as tarefas são exibidas corretamente na tela
   */
  it("should render all tasks correctly", () => {
    render(<TaskList tasks={mockTasks} />);

    // Verifica se os títulos das tarefas estão na tela
    expect(screen.getByText("Tarefa 1")).toBeInTheDocument();
    expect(screen.getByText("Tarefa 2")).toBeInTheDocument();

    // Verifica se as descrições estão na tela
    expect(screen.getByText("Descrição da tarefa 1")).toBeInTheDocument();
    expect(screen.getByText("Descrição da tarefa 2")).toBeInTheDocument();
  });

  /**
   * TESTE 3: Botão de conclusão
   * Verifica se o botão "Conclude" aparece apenas para tarefas não concluídas
   */
  it("should show conclude button only for incomplete tasks", () => {
    render(<TaskList tasks={mockTasks} />);

    // Deve ter 2 botões "Conclude" (para as 2 tarefas não concluídas)
    const concludeButtons = screen.getAllByText("Conclude");
    expect(concludeButtons).toHaveLength(2);
  });

  /**
   * TESTE 4: Aplicação de estilo para tarefas concluídas
   * Verifica se tarefas concluídas têm a classe CSS de opacidade reduzida
   */
  it("should apply opacity styling to completed tasks", () => {
    render(<TaskList tasks={mockTasks} />);

    const taskCards = screen
      .getAllByRole("generic")
      .filter((el) => el.className?.includes("relative border"));

    // A segunda tarefa (concluída) deve ter opacity-50
    expect(taskCards[1]).toHaveClass("opacity-50");
  });

  /**
   * TESTE 5: Abertura do modal de confirmação
   * Verifica se o modal de delete aparece quando clica no botão de lixeira
   */
  it("should open delete confirmation modal when trash button is clicked", async () => {
    render(<TaskList tasks={mockTasks} />);

    const deleteButtons = screen
      .getAllByRole("button")
      .filter((button) => button.className?.includes("destructive"));

    expect(deleteButtons.length).toBeGreaterThan(0);

    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(screen.getByText("Are you sure?")).toBeInTheDocument();
      expect(
        screen.getByText(
          "This action cannot be undone. This will permanently delete the selected task."
        )
      ).toBeInTheDocument();
    });
  });

  /**
   * TESTE 6: Fechar modal pelo botão Cancel
   * Verifica se o modal fecha quando clica em "Cancel"
   */
  it("should close modal when cancel button is clicked", async () => {
    render(<TaskList tasks={mockTasks} />);

    const deleteButtons = screen
      .getAllByRole("button")
      .filter((button) => button.className?.includes("destructive"));

    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(screen.getByText("Are you sure?")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Cancel"));

    await waitFor(() => {
      expect(screen.queryByText("Are you sure?")).not.toBeInTheDocument();
    });
  });

  /**
   * TESTE 7: Chamar função de marcar como concluída
   * Verifica se a função mutate é chamada quando clica em "Conclude"
   */
  it("should call markAsDone when conclude button is clicked", () => {
    render(<TaskList tasks={mockTasks} />);

    const concludeButton = screen.getAllByText("Conclude")[0];
    fireEvent.click(concludeButton);

    expect(mockUseDoneTask.mutate).toHaveBeenCalledWith("1");
  });
});
