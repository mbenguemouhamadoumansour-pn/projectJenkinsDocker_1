const mongoose = require('mongoose');

const smartphoneSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, 'Le nom est obligatoire'],
    trim: true
  },
  marque: {
    type: String,
    required: [true, 'La marque est obligatoire'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'La description est obligatoire'],
    trim: true
  },
  prix: {
    type: Number,
    required: [true, 'Le prix est obligatoire'],
    min: [0, 'Le prix doit être positif']
  },
  photo: {
    type: String,
    default: 'default.jpg'
  },
  ram: {
    type: String,
    required: [true, 'La RAM est obligatoire']
  },
  rom: {
    type: String,
    required: [true, 'La ROM est obligatoire']
  },
  ecran: {
    type: String,
    required: [true, 'L\'écran est obligatoire']
  },
  couleurs: {
    type: [String],
    required: [true, 'Les couleurs disponibles sont obligatoires'],
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'Au moins une couleur doit être spécifiée'
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Smartphone', smartphoneSchema);