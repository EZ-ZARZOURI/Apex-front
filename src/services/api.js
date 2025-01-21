import axios from 'axios';

// Configuration de base pour Axios
const api = axios.create({
  baseURL: 'http://localhost:8080/ens', // URL de base sans le / à la fin
});

// Récupérer tous les enseignants
export const getEnseignants = async () => {
  const response = await api.get(''); // Pas de slash ici, car la baseURL finit déjà par ens
  return response.data; // Retourne uniquement les données
};

// Récupérer un enseignant par son ID
export const getEnseignantById = async (id) => {
  const response = await api.get(`/${id}`);
  return response.data; // Retourne uniquement les données
};

// Ajouter un nouvel enseignant
export const addEnseignant = async (enseignant) => {
  const response = await api.post('', enseignant); // Pas de slash ici non plus
  return response.data; // Retourne uniquement les données de l'enseignant créé
};

// Mettre à jour un enseignant existant
export const updateEnseignant = async (id, enseignant) => {
  const response = await api.put(`/${id}`, enseignant);
  return response.data; // Retourne uniquement les données de l'enseignant mis à jour
};

// Supprimer un enseignant par son ID
export const deleteEnseignant = async (id) => {
  await api.delete(`/${id}`);
};
