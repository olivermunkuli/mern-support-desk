import axios from 'axios';

const API_URL = '/api/tickets';

const createTicket = async (ticketData, token) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, ticketData, options);

  return response.data;
};

const ticketService = {
  createTicket,
};

export default ticketService;
