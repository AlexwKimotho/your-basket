import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  products: [],
  userInfo: [],
};

export const amazonSlice = createSlice({
  name: "amazon",
  initialState,
  reducers: {
    // ============= Product Reducers Start here ===============
    // Add to cart
    addToCart: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload);
      if (item) {
        item.quantity++;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    // Delete item from cart
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
    },
    deleteSelectedItems: (state, action) => {
      const selectedIds = action.payload;
      state.products = state.products.filter(
        (item) => !selectedIds.includes(item.id)
      );
    },
    
    deleteUnselectedItems: (state, action) => {
      const unselectedIds = action.payload;
      state.products = state.products.filter(
        (item) => !unselectedIds.includes(item.id)
      );
    },
    deselectAllItems: (state) => {
      state.products.forEach((item) => {
        item.selected = false;
      });
    },
    // Reset cart to initial state
    resetCart: (state) => {
      state.products = [];
    },
    
    // ============= Product Reducers End here =================
    // ============= UserInfo Reducers Start here ==============
    // User authentication
 
    // ============= UserInfo Reducers End here ================
  },
});

export const {
  addToCart,
  deleteItem,
  resetCart,
  increaseQuantity,
  decreaseQuantity,
  deleteSelectedItems,
  deleteUnselectedItems,
  deselectAllItems,  

} = amazonSlice.actions;
export default amazonSlice.reducer;
