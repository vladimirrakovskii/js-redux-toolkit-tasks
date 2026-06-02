import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// BEGIN (write your solution here)
export const tasksApi = createApi({
    reducerPath: "tasksApi",
    baseQuery: fetchBaseQuery({ baseUrl: '/api/tasks' }),
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () => '',
            providesTags: ['Tasks'],
        }),
        addTask: builder.mutation({
            query: (text) => ({
                method: 'POST',
                body: { text },
            }),
            invalidatesTags: ['Tasks'],
        }),
        removeTask: builder.mutation({
            query: (id) => ({
                url: id,
                method: 'DELETE',
            }),
            invalidatesTags: ['Tasks'],
        }),
    }),
});

export const {
    useGetTasksQuery,
    useAddTaskMutation,
    useRemoveTaskMutation,
} = tasksApi;
// END
