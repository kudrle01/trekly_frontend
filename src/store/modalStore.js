import { create } from "zustand";

const useModalStore = create(set => ({
    bodyPartsModalVisible: false,
    equipmentModalVisible: false,

    setBodyPartsModalVisible: (isVisible) => set({bodyPartsModalVisible: isVisible}),
    setEquipmentModalVisible: (isVisible) => set({equipmentModalVisible: isVisible})
}));

export default useModalStore;