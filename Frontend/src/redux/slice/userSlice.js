import { createSlice, current } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  data: [],
  basket: [],
  wishlist: [],
};
export const fetchData = createAsyncThunk("user/fetchData", async () => {
  const response = await axios.get("http://localhost:3030/bye");
  return response.data;
});

export const deletedData = createAsyncThunk("user/deletedData", async (id) => {
  const response = await axios.delete("http://localhost:3030/bye", +id);
  return response.data;
});

export const postData = createAsyncThunk("user/postData", async (obj) => {
  const response = await axios.delete("http://localhost:3030/bye", obj);
  return response.data;
});

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addBasket: (state, action) => {
      let foundIndex = state.basket.findIndex(
        (item) => item._id == action.payload._id
      );
      if (foundIndex !== -1) {
        state.basket = current(state.basket).map((item, index) => {
          index = foundIndex ? { ...item, quantity: item.quantity + 1 } : item;
        });
      } else {
        state.basket = [
          ...current(state.basket),
          { ...action.payload, quantity: 1 },
        ];
      }
    },
    increaseBasket: (state, action) => {
      let foundIndex = state.basket.findIndex(
        (item) => item._id == action.payload._id
      );
      state.basket = current(state, basket).map((item, index) => {
        index = foundIndex ? { ...item, quantity: item.quantity + 1 } : item;
      });
    },
    decreaseBasket: (state, action) => {
      let foundIndex = state.basket.findIndex(
        (item) => item._id == action.payload._id
      );
      state.basket = current(state, basket).map((item, index) => {
        index = foundIndex ? { ...item, quantity: item.quantity - 1 } : item;
      });
    },
    deleteBasket: (state, action) => {
      state.basket = current(state.basket).filter((item) => {
        item._id != action.payload;
      });
    },
    addWishlist: (state, action) => {
      let found = state.wishlist.find((item) => item._id == action.payload._id);
      if (found) {
        state.wishlist = current(state.wishlist).filter((item) => {
          item._id != action.payload._id;
        });
      } else {
        state.wishlist = [...current(state.wishlist), action.payload];
      }
    },
    deleteWishlist: (state, action) => {
      state.wishlist = current(state.wishlist).filter((item) => {
        item._id != action.payload._id;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(deletedData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletedData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = state.data.filter(
          (item) => item._id != action.payload._id
        );
      })
      .addCase(deletedData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(postData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postData.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.data = [...current(state.data), action.payload];
        console.log(state.data);
      })
      .addCase(postData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  addBasket,
  deleteBasket,
  decreaseBasket,
  increaseBasket,
  addWishlist,
  deleteWishlist,
} = counterSlice.actions;

export default counterSlice.reducer;
