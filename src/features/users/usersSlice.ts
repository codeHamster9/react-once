import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, Pokemon } from "./interfaces/user.interface";

export enum EStatus {
  idle,
  loading,
  failed,
}

interface IUsers {
  users: Array<Pokemon>;
  page: number;
  status: EStatus;
}

const initialState: IUsers = {
  users: [],
  page: 1,
  status: EStatus.idle,
};

const fetchUsersByPage = async (page: number) => {
  const result = await fetch(`https://randomuser.me/api?page=${page}`);
  return await result.json();
};

export const fetchUsersAsync = createAsyncThunk(
  "users/fetchUsersByPage",
  async (page: number) => {
    const { info, results } = await fetchUsersByPage(page);
    return { page: info.page, users: results };
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    appendUsers: (state, action: PayloadAction<Pokemon | undefined>) => {
      if (action.payload) {
        state.users.push(action.payload);
        state.page = Math.floor(Math.random() * 1000);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAsync.pending, (state) => {
        state.status = EStatus.loading;
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.status = EStatus.idle;
        state.page = action.payload.page + 1;
        state.users = [...state.users, ...action.payload.users];
      })
      .addCase(fetchUsersAsync.rejected, (state) => {
        state.status = EStatus.failed;
      });
  },
});

export const { appendUsers } = usersSlice.actions;

export default usersSlice.reducer;
