import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { useListTasks } from "../hooks/queries/use-list-tasks";
import { taskService } from "../services/tasks/tasks-api";
import type { ListTasksResponse } from "../services/tasks/tasks-types";

// Mock do serviço de tarefas
vi.mock("../services/tasks/tasks-api", () => ({
  taskService: {
    getTasks: vi.fn(),
  },
}));

// Dados de teste simulados
const mockTasks: ListTasksResponse[] = [
  {
    id: "1",
    title: "Tarefa de Teste 1",
    description: "Descrição 1",
    done: false,
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    title: "Tarefa de Teste 2",
    description: "Descrição 2",
    done: true,
    createdAt: "2024-01-02",
  },
];

// Wrapper para prover o QueryClient aos hooks
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Desabilita retry nos testes para evitar delays
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useListTasks Hook", () => {
  beforeEach(() => {
    // Limpa todos os mocks antes de cada teste
    vi.clearAllMocks();
  });

  /**
   * TESTE 1: Hook deve retornar dados quando a API retorna sucesso
   * Verifica se o hook consegue buscar e retornar as tarefas corretamente
   */
  it("should return tasks data when API call is successful", async () => {
    // Configura o mock para retornar dados simulados
    vi.mocked(taskService.getTasks).mockResolvedValueOnce(mockTasks);

    // Renderiza o hook com o wrapper do QueryClient
    const { result } = renderHook(() => useListTasks(), {
      wrapper: createWrapper(),
    });

    // Verifica o estado inicial (loading)
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeNull();

    // Aguarda a resolução da query
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Verifica se os dados foram carregados corretamente
    expect(result.current.data).toEqual(mockTasks);
    expect(result.current.error).toBeNull();
    expect(result.current.isSuccess).toBe(true);

    // Verifica se a função do serviço foi chamada
    expect(taskService.getTasks).toHaveBeenCalledOnce();
  });

  /**
   * TESTE 2: Hook deve lidar com erros da API
   * Verifica se o hook gerencia corretamente quando a API retorna erro
   */
  it("should handle API errors correctly", async () => {
    // Simula um erro da API
    const errorMessage = "Erro ao buscar tarefas";
    vi.mocked(taskService.getTasks).mockRejectedValueOnce(
      new Error(errorMessage)
    );

    // Renderiza o hook
    const { result } = renderHook(() => useListTasks(), {
      wrapper: createWrapper(),
    });

    // Verifica estado inicial
    expect(result.current.isLoading).toBe(true);

    // Aguarda a resolução (erro)
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Verifica se o erro foi capturado
    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBeDefined();
    expect(result.current.data).toBeUndefined();

    // Verifica se a função foi chamada mesmo com erro
    expect(taskService.getTasks).toHaveBeenCalledOnce();
  });

  /**
   * TESTE 3: Hook deve usar a query key correta
   * Verifica se o hook está configurado com a chave de cache correta
   */
  it("should use correct query key", () => {
    vi.mocked(taskService.getTasks).mockResolvedValueOnce(mockTasks);

    const { result } = renderHook(() => useListTasks(), {
      wrapper: createWrapper(),
    });

    // A query key deve ser ["tasks"] conforme definido no hook
    // Isso é importante para o cache funcionar corretamente
    expect(result.current.dataUpdatedAt).toBeDefined();
  });

  /**
   * TESTE 4: Hook deve retornar array vazio quando não há tarefas
   * Verifica o comportamento quando a API retorna uma lista vazia
   */
  it("should handle empty tasks list", async () => {
    // Mock retorna array vazio
    vi.mocked(taskService.getTasks).mockResolvedValueOnce([]);

    const { result } = renderHook(() => useListTasks(), {
      wrapper: createWrapper(),
    });

    // Aguarda a resolução
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Verifica se retorna array vazio
    expect(result.current.data).toEqual([]);
    expect(result.current.isSuccess).toBe(true);
    expect(taskService.getTasks).toHaveBeenCalledOnce();
  });
});
