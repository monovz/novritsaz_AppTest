import { isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Contact {
  id: string,
  firstName: string,
  lastName: string,
  age: number,
  photo: string
}

export interface Response<ResponseData> {
  message: string,
  data: ResponseData,
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://simple-contact-crud.herokuapp.com' }),
  endpoints: (build) => ({
    addContact: build.mutation<Response<Contact>, Partial<Contact>>({
      query(body) {
        return {
          url: `/contact`,
          method: 'POST',
          body,
        }
      },
    }),
    getContact: build.query<Response<Contact>, string>({
      query: (id) => `/contact/${id}`,
    }),
    getAllContact: build.query<Response<Contact[]>, void>({
      query: () => `/contact`,
    }),
    updateContact: build.mutation<Response<Contact>, Partial<Contact>>({
      query(data) {
        const { id, ...body } = data
        return {
          url: `/contact/${id}`,
          method: 'PUT',
          body,
        }
      },
    }),
    deleteContact: build.mutation<{ success: boolean; id: number }, string>({
      query(id) {
        return {
          url: `/contact/${id}`,
          method: 'DELETE',
        }
      },
    }),
  }),
})

export const { useAddContactMutation, useDeleteContactMutation, useGetContactQuery, useUpdateContactMutation, useGetAllContactQuery, useLazyGetContactQuery } = api

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      console.log('we got a rejected action!', action.error.data.message)
      // console.warn('We got a rejected action!')
      // toast.warn({ title: 'Async error!', message: action.error.data.message })
    // }

    return next(action)
  }
}