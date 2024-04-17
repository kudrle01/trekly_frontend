import { create } from "zustand";

const defaultBodyPart = {
    name: "Body Part",
};
const defaultEquipment = {
    name: "Equipment",
};


const useFilterStore = create(set => ({
    defaultBodyPart: defaultBodyPart,
    defaultEquipment: defaultEquipment,
    bodyPart: defaultBodyPart,
    equipment: defaultEquipment,
    searchQuery: "",

    setBodyPart: (bodyPart) => set({bodyPart: bodyPart}),
    setEquipment: (equipment) => set({equipment: equipment}),
    setSearchQuery: (searchQuery) => set({searchQuery: searchQuery}),
}));

export default useFilterStore;