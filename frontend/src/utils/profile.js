import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  profile: null,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileData: (state, action) => {
      state.profile = action.payload
    },
  },
})
export const { setProfileData } = profileSlice.actions

export default profileSlice.reducer
