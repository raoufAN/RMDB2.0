// src/services/tmdbApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// try CRA or Vite env var, fallback to literal (replace 'YOUR_KEY' with real key)
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const TmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/" }),
  endpoints: (builder) => ({
    // for every movies
    getContent: builder.query({
      query: ({ type, page = 1 }) => `${type}?api_key=${TMDB_API_KEY}&page=${page}`,
    }),

    getPopularPeople: builder.query({
      query: (page = 1) => `/person/popular?api_key=${TMDB_API_KEY}&page=${page}`,
    }),

    getDetailMovieAndSerie: builder.query({
      query: ({ type, id }) => `${type}/${id}?api_key=${TMDB_API_KEY}`,
    }),

    // get detail about season
    getMoreDetailAboutSeason: builder.query({
      query: ({ seasonID, seasonNumber }) =>
        `tv/${seasonID}/season/${seasonNumber}?api_key=${TMDB_API_KEY}`,
    }),

    // get detail about season
    getTrailer: builder.query({
      query: ({ type, id }) => `${type}/${id}/videos?api_key=${TMDB_API_KEY}`,
    }),

    // get cast
    getCredits: builder.query({
      query: ({ type, id }) => `${type}/${id}/credits?api_key=${TMDB_API_KEY}`,
    }),

    // get Recommandion
    getRecommandation: builder.query({
      query: ({ type, id }) => `${type}/${id}/recommendations?api_key=${TMDB_API_KEY}`,
    }),

    getDetailPeople: builder.query({
      query: ({ person_id }) => `person/${person_id}?api_key=${TMDB_API_KEY}`,
    }),

    getPeopleImage: builder.query({
      query: ({ person_id }) => `person/${person_id}/images?api_key=${TMDB_API_KEY}`,
    }),

    getPeopleActing: builder.query({
      query: ({ person_id }) => `person/${person_id}/combined_credits?api_key=${TMDB_API_KEY}`,
    }),

    getSeasonDeatil: builder.query({
      query: ({ series_id, season_number }) =>
        `tv/${series_id}/season/${season_number}?api_key=${TMDB_API_KEY}`,
    }),

    getGenresTypes: builder.query({
      query: ({ type }) => `genre/${type}/list?api_key=${TMDB_API_KEY}`,
    }),

    getGenresDetails: builder.query({
      query: ({ type, genres_Id, page = 1 }) =>
        `discover/${type}?api_key=${TMDB_API_KEY}&with_genres=${genres_Id}&page=${page}`,
    }),

    // search: accept an object to pass q and page
    search: builder.query({
      query: ({ q, page = 1 }) =>
        `search/multi?query=${encodeURIComponent(q)}&page=${page}&api_key=${TMDB_API_KEY}`,
    }),
  }),
});

export const {
  useSearchQuery,
  useGetContentQuery,
  useGetGenresDetailsQuery,
  useGetPopularPeopleQuery,
  useGetDetailMovieAndSerieQuery,
  useGetMoreDetailAboutSeasonQuery,
  useGetTrailerQuery,
  useGetCreditsQuery,
  useGetRecommandationQuery,
  useGetDetailPeopleQuery,
  useGetPeopleImageQuery,
  useGetPeopleActingQuery,
  useGetSeasonDeatilQuery,
  useGetGenresTypesQuery,
} = TmdbApi;
