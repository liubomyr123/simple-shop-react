import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { OrderItem } from "@src/shared";

interface UserState {
  orderItems: OrderItem[];
}

const initialState: UserState = {
  orderItems: [],
};

interface AddOrderAction {
  orderItem: OrderItem;
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addOrderItem (state, action: PayloadAction<AddOrderAction>) {
      const { orderItem } = action.payload;
      state.orderItems.push(orderItem);
    },
  },
});

export const { addOrderItem } = userSlice.actions;
export default userSlice.reducer;
