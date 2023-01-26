import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ticketService from './ticketService';

const initialState = {
  tickets: [],
  ticket: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create new ticket
export const createTicket = createAsyncThunk(
  'tickets/create',
  async (ticketData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.createTicket(ticketData, token);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user tickets
export const getTickets = createAsyncThunk(
  'tickets/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await ticketService.getTickets(token);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user ticket
export const getTicket = createAsyncThunk(
  'tickets/get',
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await ticketService.getTicket(ticketId, token);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Close ticket
export const closeTicket = createAsyncThunk(
  'tickets/close',
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await ticketService.closeTicket(ticketId, token);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.message = '';
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(createTicket.fulfilled, (state) => {
        state.message = '';
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(getTickets.pending, (state) => {
        state.message = '';
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.tickets = action.payload;
        state.message = '';
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(getTicket.pending, (state) => {
        state.message = '';
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        state.ticket = action.payload;
        state.message = '';
        state.isLoading = false;
        state.isSuccess = false; // exception
        state.isError = false;
      })
      .addCase(getTicket.rejected, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(closeTicket.pending, (state) => {
        state.message = '';
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(closeTicket.fulfilled, (state, action) => {
        state.tickets.map((ticket) =>
          ticket._id === action.payload._id
            ? (ticket.status = 'closed')
            : ticket
        );

        state.message = '';
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(closeTicket.rejected, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      });
  },
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;
