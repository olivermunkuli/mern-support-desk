import { configureStore } from '@reduxjs/toolkit';
import noteReducer from '../features/notes/noteSlice';
import authReducer from '../features/auth/authSlice';
import ticketReducer from '../features/tickets/ticketSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tickets: ticketReducer,
    note: noteReducer,
  },
});
