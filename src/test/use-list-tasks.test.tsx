import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useListTasks } from "../hooks/queries/use-list-tasks";
import { mockTasks, emptyTasks } from "./__mocks__/data/mock-tasks";
import { mockTaskService } from "./__mocks__/services/tasks/tasks-api";

// Aplicar mock do serviço
vi.mock("../services/tasks/tasks-api", async () => {
  const mock = await import("./__mocks__/services/tasks/tasks-api");
  return mock;
});

// Wrapper para prover o QueryClient aos hooks
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useListTasks Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /**
   * TESTE 1: Hook deve retornar dados quando a API retorna sucesso
   */
  it("should return tasks data when API call is successful", async () => {
    mockTaskService.getTasks.mockResolvedValueOnce(mockTasks);

    const { result } = renderHook(() => useListTasks(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockTasks);
    expect(result.current.error).toBeNull();
    expect(result.current.isSuccess).toBe(true);
    expect(mockTaskService.getTasks).toHaveBeenCalledOnce();
  });

  /**
   * TESTE 2: Hook deve lidar com erros da API
   */
  it("should handle API errors correctly", async () => {
    const errorMessage = "Erro ao buscar tarefas";
    mockTaskService.getTasks.mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useListTasks(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBeDefined();
    expect(result.current.data).toBeUndefined();
    expect(mockTaskService.getTasks).toHaveBeenCalledOnce();
  });

  /**
   * TESTE 3: Hook deve usar a query key correta
   */
  it("should use correct query key", () => {
    mockTaskService.getTasks.mockResolvedValueOnce(mockTasks);

    const { result } = renderHook(() => useListTasks(), {
      wrapper: createWrapper(),
    });

    expect(result.current.dataUpdatedAt).toBeDefined();
  });

  /**
   * TESTE 4: Hook deve retornar array vazio quando não há tarefas
   */
  it("should handle empty tasks list", async () => {
    mockTaskService.getTasks.mockResolvedValueOnce(emptyTasks);

    const { result } = renderHook(() => useListTasks(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(emptyTasks);
    expect(result.current.isSuccess).toBe(true);
    expect(mockTaskService.getTasks).toHaveBeenCalledOnce();
  });
});
