import axios from 'axios';

const API_URL = 'http://localhost:5000/api/smartphones';

// Récupérer tous les smartphones
const getAllSmartphones = () => {
  return axios.get(API_URL);
};

// Récupérer un smartphone par ID
const getSmartphoneById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

// Ajouter un smartphone
const ajouterSmartphone = (smartphone) => {
  return axios.post(API_URL, smartphone);
};

// Modifier un smartphone
const modifierSmartphone = (id, smartphone) => {
  return axios.put(`${API_URL}/${id}`, smartphone);
};

// Supprimer un smartphone
const supprimerSmartphone = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

const smartphoneService = {
  getAllSmartphones,
  getSmartphoneById,
  ajouterSmartphone,
  modifierSmartphone,
  supprimerSmartphone
};

export default smartphoneService;