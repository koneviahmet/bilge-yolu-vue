import http from "./http";

const QuesitonsServices = {
  getItems: async () => {
    try {
      const response = await http.get("/quesitons");
      return response?.data;
    } catch (e) {}
  },
  searchItems: async (obj) => {
    try {
      const response = await http.get("/quesitons");
      return response?.data;
    } catch (e) {}
  },
  getItem: async (obj) => {
    try {
      const response = await http.get(`/quesitons/${obj.id}`);
      return response?.data;
    } catch (e) {}
  },
  addItem: async (obj) => {
    try {
      const response = await http.post("/quesitons", obj);
      return response?.data;
    } catch (e) {}
  },
  updateItem: async (obj) => {
    try {
      const response = await http.put(`/quesitons/${obj.id}`, obj);
      return response?.data;
    } catch (e) {}
  },
  deleteItem: async (obj) => {
    try {
      const response = await http.delete(`/quesitons/${obj.id}`);
      return response?.data;
    } catch (e) {}
  },
};

export default QuesitonsServices;
