require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const smartphoneRoutes = require('./routes/smartphoneRoutes');

const app = express();

// ✅ Connexion MongoDB avec variable d'environnement
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://smartphone-mongo:27017/samadb';

console.log('🔗 Tentative de connexion à MongoDB:', MONGODB_URI);

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connecté avec succès'))
  .catch(err => {
    console.error('❌ Erreur de connexion MongoDB:', err);
    process.exit(1);
  });

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ ENDPOINT HEALTH CHECK (pour Kubernetes)
app.get('/api/health', (req, res) => {
  const healthcheck = {
    status: 'ok',
    message: 'Backend is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  };
  
  res.status(200).json(healthcheck);
});

// Routes API
app.use('/api/smartphones', smartphoneRoutes);

// Route racine
app.get('/', (req, res) => {
  res.json({
    message: 'API Gestion Smartphones - Bienvenue !',
    version: '1.0.0',
    endpoints: {
      'GET /api/health': 'Vérifier la santé du service',
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
    message: 'Route non trouvée',
    path: req.path
  });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error('❌ Erreur:', err);
  res.status(500).json({
    success: false,
    message: 'Erreur serveur interne',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
  console.log(`🌍 Environnement: ${process.env.NODE_ENV || 'development'}`);
});