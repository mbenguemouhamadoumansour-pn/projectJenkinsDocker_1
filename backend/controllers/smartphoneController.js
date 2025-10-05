const Smartphone = require('../models/Smartphone');

// Ajouter un smartphone
exports.ajouterSmartphone = async (req, res) => {
  try {
    const smartphone = await Smartphone.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Smartphone ajouté avec succès',
      data: smartphone
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Erreur lors de l\'ajout du smartphone',
      error: error.message
    });
  }
};

// Retourner tous les smartphones
exports.getTousLesSmartphones = async (req, res) => {
  try {
    const smartphones = await Smartphone.find();
    res.status(200).json({
      success: true,
      count: smartphones.length,
      data: smartphones
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des smartphones',
      error: error.message
    });
  }
};

// Retourner un smartphone par ID
exports.getSmartphoneParId = async (req, res) => {
  try {
    const smartphone = await Smartphone.findById(req.params.id);
    
    if (!smartphone) {
      return res.status(404).json({
        success: false,
        message: 'Smartphone non trouvé'
      });
    }

    res.status(200).json({
      success: true,
      data: smartphone
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du smartphone',
      error: error.message
    });
  }
};

// Modifier un smartphone
exports.modifierSmartphone = async (req, res) => {
  try {
    const smartphone = await Smartphone.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!smartphone) {
      return res.status(404).json({
        success: false,
        message: 'Smartphone non trouvé'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Smartphone modifié avec succès',
      data: smartphone
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Erreur lors de la modification du smartphone',
      error: error.message
    });
  }
};

// Supprimer un smartphone
exports.supprimerSmartphone = async (req, res) => {
  try {
    const smartphone = await Smartphone.findByIdAndDelete(req.params.id);

    if (!smartphone) {
      return res.status(404).json({
        success: false,
        message: 'Smartphone non trouvé'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Smartphone supprimé avec succès',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du smartphone',
      error: error.message
    });
  }
};