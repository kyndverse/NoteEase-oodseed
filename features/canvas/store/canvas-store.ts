import { Editor } from "tldraw";
import { create } from "zustand";

type CanvasStore = {
  editor: Editor | null;
  setEditor: (editor: Editor) => void;
};

export const useCanvasStore = create<CanvasStore>((set) => ({
  editor: null,
  setEditor: (editor) => set({ editor }),
}));
