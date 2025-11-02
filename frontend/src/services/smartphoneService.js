import axios from 'axios';

// ✅ Configuration de l'URL de l'API
// En production avec Nginx, on utilise /api (reverse proxy)
// En développement local, on utilise l'URL complète
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

const API_URL = `${API_BASE_URL}/smartphones`;

console.log('🔗 API URL utilisée:', API_URL);
console.log('🌍 Environment:', process.env.NODE_ENV);

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