import { vi } from "vitest";

export const mockUseDeleteTask = {
  mutate: vi.fn(),
  isPending: false,
};

export const useDeleteTask = vi.fn(() => mockUseDeleteTask);
