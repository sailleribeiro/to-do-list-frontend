import { vi } from "vitest";

export const mockUseDoneTask = {
  mutate: vi.fn(),
  isPending: false,
};

export const useDoneTask = vi.fn(() => mockUseDoneTask);
