import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { persistState } from "../store";
import { REHYDRATE } from 'redux-persist'
import missionSlice from "../store/slices/mission";

export const settingApi = createApi({
  reducerPath: "settingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5002",
    prepareHeaders: (headers, { getState }) => {
      const {
        auth: { token: token },
      } = getState() as persistState;
      if (token) {
        console.log(token);
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  keepUnusedDataFor: 30,
  tagTypes: ["Setting"],
  endpoints: (builder) => ({
    updateSetting: builder.mutation({
      query: (initialPost) => ({
        url: "/update/setting",
        method: "POST",
        // Include the entire post object as the body of the request
        body: initialPost,
      }),
      invalidatesTags: ["Setting"],
    }),
    createSetting: builder.mutation({
      query: (initialPost) => ({
        url: "/create/setting",
        method: "POST",
        // Include the entire post object as the body of the request
        body: initialPost,
      }),
      invalidatesTags: ["Setting"],
    }),
    getSetting: builder.query<any[], void>({
      query: (id) => "/get/setting" + id,
      providesTags: ["Setting"],
    }),
  }),
});

export const missionApi = createApi({
  reducerPath: "missionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5002",
    prepareHeaders: (headers, { getState }) => {
      const {
        auth: { token: token },
      } = getState() as persistState;
      if (token) {
        console.log(token);
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },

  }),
  tagTypes: ["Mission"],
  keepUnusedDataFor: 10,
  endpoints: (builder) => ({
    getMission: builder.query<any[], void>({
      query: (id) => "/get/mission/" + id,
    }),
    getMissions: builder.query<any[], void>({
      query: () => "/get/all/mission",
      providesTags: ["Mission"],
    }),
    getMissionsHours: builder.query<any[], void>({
      query: () => "/mission/hours",
      providesTags: ["Mission"],
    }),
    getMissionsNombre: builder.query<any[], void>({
      query: () => "/mission/nombre",
      providesTags: ["Mission"],
    }),
    createMission: builder.mutation({
      query: (initialPost) => ({
        url: "/create/mission",
        method: "POST",
        // Include the entire post object as the body of the request
        body: initialPost,
      }),
      invalidatesTags: ["Mission"],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        // `onStart` side-effect
        try {
          dispatch(
            missionSlice.actions.clearLogger()
          );
        } catch (err) {
          // `onError` side-effect
          console.log("error", err);
        }
      },
    }),
    deleteMission: builder.mutation({
      query: (id) => ({
        url: "/create/mission" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Mission"],
    }),
  }),
});

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5002"
  }),
  refetchOnReconnect: true,
  keepUnusedDataFor: 10,

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (initialPost) => ({
        url: "/login",
        method: "POST",
        // Include the entire post object as the body of the request
        body: initialPost,
      }),
    }),
    updateUser: builder.mutation({
      query: (initialPost) => ({
        url: "/update/user",
        method: "POST",
        // Include the entire post object as the body of the request
        body: initialPost,
      }),
    }),
    createUser: builder.mutation({
      query: (initialPost) => ({
        url: "/create/user",
        method: "POST",
        // Include the entire post object as the body of the request
        body: initialPost,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
} = userApi;

export const {
  useCreateMissionMutation,
  useDeleteMissionMutation,
  useGetMissionQuery,
  useGetMissionsHoursQuery,
  useGetMissionsNombreQuery,
  useGetMissionsQuery,
} = missionApi;

export const {
  useCreateSettingMutation,
  useGetSettingQuery,
  useUpdateSettingMutation,
} = settingApi;
