import axios from 'axios';

const API_URL = '/api/tickets/';

const getNotes = async (ticketId, token) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/${ticketId}/notes`, options);

  return response.data;
};

const createNote = async (noteText, ticketId, token) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${API_URL}/${ticketId}/notes`,
    {
      text: noteText,
    },
    options
  );

  return response.data;
};

const noteService = { getNotes, createNote };

export default noteService;
