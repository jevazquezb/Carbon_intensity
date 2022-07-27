import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Actions
const FETCH_CARBON_SOURCE = 'capstone_3/sources/FETCH_CARBON_SOURCE';

// URL

// Async function (Function Action Creator)
const fetchSrcAsync = createAsyncThunk(
  FETCH_CARBON_SOURCE,
  async (id) => {
    const singleRegionURL = `https://api.carbonintensity.org.uk/regional/regionid/${id}`;
    const response = await fetch(singleRegionURL);
    const output = await response.json();
    const regionRaw = output.data[0];
    const region = {
      id: regionRaw.regionid,
      name: regionRaw.shortname,
      intensity: regionRaw.data[0].intensity,
      sources: regionRaw.data[0].generationmix,
    };

    return region;
  },
);

const initialState = {};

// Reducer
const sourceSlice = createSlice({
  name: 'intensity',
  initialState,
  extraReducers: {
    [fetchSrcAsync.fulfilled]: (state, action) => (
      { ...action.payload }
    ),
  },
});

export { fetchSrcAsync };

export default sourceSlice.reducer;
