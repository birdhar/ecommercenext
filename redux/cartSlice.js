import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
    addProductToCart: (state, action) => {
      state.items.push(action.payload);
    },
    increaseCartProduct: (state, action) => {
      const updatedCartItems = state.items.map((item) => {
        if (item?.info?._id === action.payload?.info?._id) {
          return { ...item, count: item.count + 1 };
        }
        return item;
      });
      return { ...state, items: updatedCartItems };
    },
    decreaseCartProduct: (state, action) => {
      const updatedCartItems = state.items.map((item) => {
        if (item?.info?._id === action.payload?.info?._id) {
          return { ...item, count: Math.max(1, item.count - 1) };
        }
        return item;
      });
      return { ...state, items: updatedCartItems };
    },
    removeCartProduct: (state, action) => {
      const updatedCartItems = state.items.filter((item) => {
        return item?.info?._id !== action.payload?.info?._id;
      });
      return { ...state, items: updatedCartItems };
    },
    getCartTotal: (state, action) => {
      let { totalCount, totalPrice } = state.items.reduce(
        (accumulator, currentItem) => {
          accumulator.totalCount += currentItem.count;
          accumulator.totalPrice += currentItem.info.price * currentItem.count;
          return accumulator;
        },
        { totalCount: 0, totalPrice: 0 }
      );
      return {
        ...state,
        totalQuantity: totalCount,
        totalAmount: totalPrice,
      };
    },
  },
});

export const {
  clearCart,
  addProductToCart,
  increaseCartProduct,
  decreaseCartProduct,
  removeCartProduct,
  getCartTotal,
} = cartSlice.actions;

export default cartSlice.reducer;
