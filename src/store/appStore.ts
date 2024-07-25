// src/store/useAppStore.ts
import { create } from "zustand";
import { ModelData } from "../utils/contants";
export interface Model {
  id: number;
  task_id: string;
  thumbnail_url: string;
  glb_url: string;
  prompt: string;
  type: string;
  draft_model_id: string | null;
}

interface AppState {
  models: Model[];
  selectedModel: Model | null;
  setSelectedModel: (model: Model | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  models: ModelData,
  selectedModel: null,
  setSelectedModel: (model) => set({ selectedModel: model }),
}));
