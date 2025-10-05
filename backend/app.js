require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const smartphoneRoutes = require('./routes/smartphoneRoutes');

const app = express();

// Connexion MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/samadb';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connecté'))
  .catch(err => console.error('❌ Erreur MongoDB:', err));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/smartphones', smartphoneRoutes);

// Route de test
app.get('/', (req, res) => {
  res.json({
    message: 'API Gestion Smartphones - Bienvenue !',
    endpoints: {
      'GET /api/smartphones': 'Récupérer tous les smartphones',
      'GET /api/smartphones/:id': 'Récupérer un smartphone par ID',
      'POST /api/smartphones': 'Ajouter un smartphone',
      'PUT /api/smartphones/:id': 'Modifier un smartphone',
      'DELETE /api/smartphones/:id': 'Supprimer un smartphone'
    }
  });
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route non trouvée'
  });
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});