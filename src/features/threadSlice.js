import { createSlice } from '@reduxjs/toolkit';

// how to set redux for login and logout user state.

export const threadSlice = createSlice({
  name: 'thread',
  initialState: {
    threadId: null,
    threadName: null,
    threadDes: null,
  },
  reducers: {
    setThread: (state, action) => {
      state.threadId = action.payload.threadId;
      state.threadName = action.payload.threadName;
      state.threadDes = action.payload.threadDes;
    }
  },
});

export const { setThread } = threadSlice.actions;

export const selectThreadId = state => state.thread.threadId;

export const selectThreadName = state => state.thread.threadName;

export const selectThreadDes = state => state.thread.threadDes;

export default threadSlice.reducer;
