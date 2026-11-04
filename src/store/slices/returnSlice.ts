import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ReturnRequest } from "@/types";

export interface ReturnState {
  returns: ReturnRequest[];
}

const initialState: ReturnState = {
  returns: [],
};

const returnSlice = createSlice({
  name: "returns",
  initialState,
  reducers: {
    addReturnRequest: (state, action: PayloadAction<ReturnRequest>) => {
      state.returns.push(action.payload);
    },
    updateReturnStatus: (state, action: PayloadAction<{ id: string | number; status: string }>) => {
      const { id, status } = action.payload;
      const req = state.returns.find((r) => r.id === id);
      if (req) {
        req.status = status;
      }
    },
  },
});

export const { addReturnRequest, updateReturnStatus } = returnSlice.actions;
export default returnSlice.reducer;
