import create from "zustand";

interface FormStore {
  formData: { [key: string]: any };
  formDataArray: { [key: string]: any }[];
  setFormData: (data: { [key: string]: any }) => void;
  saveFormData: () => void;
  isSheetOpen: boolean;
  setIsSheetOpen: (isOpen: boolean) => void;
  selectedItem: { [key: string]: any } | null;
  setSelectedItem: (item: { [key: string]: any } | null) => void;
  updateItem: (item: { [key: string]: any }) => void;
  deleteItem: (item: { [key: string]: any }) => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
}

const useFormStore = create<FormStore>((set) => ({
  formData: {},
  formDataArray: JSON.parse(localStorage.getItem("formDataArray") || "[]"),
  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  saveFormData: () => {
    set((state) => {
      const updatedArray = [...state.formDataArray, state.formData];
      localStorage.setItem("formDataArray", JSON.stringify(updatedArray));
      return { formDataArray: updatedArray, formData: {} };
    });
  },
  isSheetOpen: false,
  setIsSheetOpen: (isOpen) => set({ isSheetOpen: isOpen }),
  selectedItem: null,
  setSelectedItem: (item) => set({ selectedItem: item }),
  updateItem: (item) =>
    set((state) => {
      const updatedArray = state.formDataArray.map((i) =>
        i.sitename === state.selectedItem?.sitename ? item : i
      );
      localStorage.setItem("formDataArray", JSON.stringify(updatedArray));
      return { formDataArray: updatedArray, selectedItem: null };
    }),
  deleteItem: (item) =>
    set((state) => {
      const updatedArray = state.formDataArray.filter(
        (i) => i.sitename !== item.sitename
      );
      localStorage.setItem("formDataArray", JSON.stringify(updatedArray));
      return { formDataArray: updatedArray, selectedItem: null };
    }),
  isDialogOpen: false,
  setIsDialogOpen: (isOpen) => set({ isDialogOpen: isOpen }),
}));

export default useFormStore;
