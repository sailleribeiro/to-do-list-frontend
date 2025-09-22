import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TaskList } from "../components/task-list";
import type { ListTasksResponse } from "../services/tasks/tasks-types";

// Mock dos hooks customizados
vi.mock("../hooks/mutations/use-done-task", () => ({
  useDoneTask: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
}));

vi.mock("../hooks/mutations/use-delete-task", () => ({
  useDeleteTask: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
}));

// Dados de teste simulados
const mockTasks: ListTasksResponse[] = [
  {
    id: "1",
    title: "Tarefa 1",
    description: "Descrição da tarefa 1",
    done: false,
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    title: "Tarefa 2",
    description: "Descrição da tarefa 2",
    done: true,
    createdAt: "2024-01-02",
  },
];

describe("TaskList Component", () => {
  /**
   * TESTE 1: Renderização quando não há tarefas
   * Verifica se a mensagem "No tasks found" aparece quando a lista está vazia
   */
  it('should display "No tasks found" when tasks array is empty', () => {
    render(<TaskList tasks={[]} />);

    // Procura pelo texto na tela
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

    // Deve ter apenas 1 botão "Conclude" (só para a tarefa não concluída)
    const concludeButtons = screen.getAllByText("Conclude");
    expect(concludeButtons).toHaveLength(1);
  });

  /**
   * TESTE 4: Aplicação de estilo para tarefas concluídas
   * Verifica se tarefas concluídas têm a classe CSS de opacidade reduzida
   */
  it("should apply opacity styling to completed tasks", () => {
    render(<TaskList tasks={mockTasks} />);

    // Busca os cards das tarefas
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

    // Busca todos os botões pela classe variant="destructive"
    const deleteButtons = screen
      .getAllByRole("button")
      .filter((button) => button.className?.includes("destructive"));

    // Verifica se encontrou pelo menos um botão
    expect(deleteButtons.length).toBeGreaterThan(0);

    // Clica no primeiro botão de delete
    fireEvent.click(deleteButtons[0]);

    // Verifica se o modal apareceu
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

    // Busca e clica no botão de delete
    const deleteButtons = screen
      .getAllByRole("button")
      .filter((button) => button.className?.includes("destructive"));

    fireEvent.click(deleteButtons[0]);

    // Aguarda o modal aparecer
    await waitFor(() => {
      expect(screen.getByText("Are you sure?")).toBeInTheDocument();
    });

    // Clica em Cancel
    fireEvent.click(screen.getByText("Cancel"));

    // Verifica se o modal desapareceu
    await waitFor(() => {
      expect(screen.queryByText("Are you sure?")).not.toBeInTheDocument();
    });
  });
});
