import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY =  '04f4733b64f435bf171d1c90539c050d'
const BASE_URL = 'https://api.themoviedb.org/3'

export const fetchMovies = createAsyncThunk(
    'movies/fetchMovies',
    async () => {
        const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
        return response.data.results
    }
)

interface MoviesState {
    movies: any[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

const initialState: MoviesState = {
    movies: [],
    status: 'idle'
}

const moviesSlice  =  createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.movies = action.payload
                state.status = 'succeeded'
            })
            .addCase(fetchMovies.rejected, (state) => {
                state.status = 'failed'
            })
    }
})

export default moviesSlice.reducer