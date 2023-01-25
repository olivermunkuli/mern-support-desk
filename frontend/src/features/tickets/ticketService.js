import axios from 'axios';

const API_URL = '/api/tickets';

// Create new ticket
const createTicket = async (ticketData, token) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, ticketData, options);

  return response.data;
};

// Get user tickets
const getTickets = async (token) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, options);

  return response.data;
};

// Get user ticket
const getTicket = async (ticketId, token) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/${ticketId}`, options);

  return response.data;
};

const ticketService = {
  createTicket,
  getTicket,
  getTickets,
};

export default ticketService;
