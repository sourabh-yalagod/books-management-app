import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_BASE_URL;
if (!baseUrl) {
  throw new Error("VITE_BASE_URL is Required....!");
}
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["books"],
  endpoints: (build) => ({
    getBooks: build.query({
      query: () => "/api/books",
      providesTags: ["books", "carts", "publisherBooks", "transactions"]
    }),
    getBookById: build.query({
      query: (bookId) => ({ url: `/api/books/${bookId}`, params: { bookId } })
    }),
    publishBook: build.mutation({
      query: () => ({
        url: ``
      })
    }),
    getCartBooks: build.query({
      query: (userId) => ({
        url: `/api/carts/${userId}`,
        params: { userId }
      }),
      providesTags: ["carts"]
    }),
    addBookToCart: build.mutation({
      query: ({ bookId, userId }) => ({
        url: `/api/carts/${bookId}`,
        body: { userId },
        method: "POST"
      }),
      invalidatesTags: ["carts"]
    }),
    removeCart: build.mutation({
      query: (cartId) => ({
        url: `/api/carts/${cartId}`,
        method: "DELETE",
        params: { cartId }
      }),
      invalidatesTags: ["carts"]
    }),
    getPublisherBooks: build.query({
      query: (publisherId) => ({
        url: `/api/books/book-publisher/${publisherId}`,
        params: { publisherId }
      }),
      providesTags: ["publisherBooks"]
    }),
    publishBook: build.mutation({
      query: (formDate) => ({
        url: `/api/books/publish-book`,
        body: formDate,
        method: "POST"
      }),
      invalidatesTags: ["publisherBooks"]
    }),
    createPaymentIntent: build.mutation({
      query: (amount) => ({
        url: `/api/transactions/create-payment-intent`,
        body: { amount },
        method: "POST"
      })
    }),
    createPaymentRecord: build.mutation({
      query: (formData) => ({
        url: "/api/transactions/transaction-record",
        body: formData,
        method: "POST"
      }),
      invalidatesTags: ["transactions"]
    }),
    getTransaction: build.query({
      query: (userId) => ({
        url: `/api/transactions/${userId}`,
        params: { userId }
      }),
      providesTags: ["transactions"]
    })
  })
});
export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useGetCartBooksQuery,
  useAddBookToCartMutation,
  useRemoveCartMutation,
  useGetPublisherBooksQuery,
  usePublishBookMutation,
  useCreatePaymentIntentMutation,
  useCreatePaymentRecordMutation,
  useGetTransactionQuery
} = api;
