const express = require('express');
const router = express.Router();
const {
  ajouterSmartphone,
  getTousLesSmartphones,
  getSmartphoneParId,
  modifierSmartphone,
  supprimerSmartphone
} = require('../controllers/smartphoneController');

// Routes
router.post('/', ajouterSmartphone);
router.get('/', getTousLesSmartphones);
router.get('/:id', getSmartphoneParId);
router.put('/:id', modifierSmartphone);
router.delete('/:id', supprimerSmartphone);

module.exports = router;