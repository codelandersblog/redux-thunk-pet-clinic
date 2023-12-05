import { createSlice } from "@reduxjs/toolkit";
import { loadEgg, loadError, loadPet } from "./api";

const initialState = {
  pets: [],
  egg: null,
};

export const clinicSlice = createSlice({
  name: "clinic",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.egg = loadEgg();
    },
    addPet: (state, action) => {
      state.pets.push(action.payload.pet);
      state.egg = null;
    },
    addError: (state) => {
      state.pets.push(loadError());
      state.egg = null;
    },
    healPet: (state, action) => {
      state.pets = state.pets.filter((p) => p.id !== action.payload.id);
    },
  },
});

export const { startLoading, addPet, addError, healPet } = clinicSlice.actions;

export const loadPetThunk = () => async (dispatch) => {
  dispatch(startLoading());
  try {
    const pet = await loadPet();
    dispatch(addPet({ pet }));
  } catch {
    dispatch(addError());
  }
};

export default clinicSlice.reducer;
