import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface Profile {
  id: string;
  name: string;
  phone: string;
  city: string;
  state: string;
  country: string;
}

interface ProfileState {
  profiles: Profile[];
  loading: boolean;
}

const initialState: ProfileState = {
  profiles: [],
  loading: false,
};

// Mock async save
export const saveProfile = createAsyncThunk(
  "profiles/saveProfile",
  async (profile: Profile) => {
    await new Promise((resolve) => setTimeout(resolve, 500)); // simulate delay
    return profile;
  }
);

const profileSlice = createSlice({
  name: "profiles",
  initialState,
  reducers: {
    deleteProfile: (state, action: PayloadAction<string>) => {
      state.profiles = state.profiles.filter((p) => p.id !== action.payload);
    },
    updateProfile: (state, action: PayloadAction<Profile>) => {
      const index = state.profiles.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.profiles[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveProfile.fulfilled, (state, action) => {
        state.profiles.push(action.payload);
        state.loading = false;
      })
      .addCase(saveProfile.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { deleteProfile, updateProfile } = profileSlice.actions;
export default profileSlice.reducer;
