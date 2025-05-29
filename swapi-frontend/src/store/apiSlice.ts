import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api', // Unique key for the API slice in the Redux store
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }), // Base URL for the API
    endpoints: (builder) => ({
        getCharacters: builder.query({
            query: ({ page = 1, limit = 10 ,search=""}) => `?page=${page}&limit=${limit}&search=${search}`, 
        }),
        getCharacterById: builder.query({
            query: (id: number | string | undefined) => `${id}`, 
        }),
    }),
});

export const { useGetCharactersQuery,useGetCharacterByIdQuery } = apiSlice;