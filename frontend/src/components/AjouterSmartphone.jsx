import React, { useState } from 'react';

const AjouterSmartphone = ({ onAjouter, onAnnuler }) => {
  const [formData, setFormData] = useState({
    nom: '',
    marque: '',
    description: '',
    prix: '',
    photo: '',
    ram: '',
    rom: '',
    ecran: '',
    couleurs: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convertir les couleurs en tableau
    const smartphone = {
      ...formData,
      prix: Number(formData.prix),
      couleurs: formData.couleurs.split(',').map(c => c.trim())
    };

    onAjouter(smartphone);
    
    // Réinitialiser le formulaire
    setFormData({
      nom: '',
      marque: '',
      description: '',
      prix: '',
      photo: '',
      ram: '',
      rom: '',
      ecran: '',
      couleurs: ''
    });
  };

  return (
    <div className="ajouter-smartphone-container">
      <h2>Ajouter un Smartphone</h2>
      <form onSubmit={handleSubmit} className="smartphone-form">
        <div className="form-group">
          <label>Nom *</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
            placeholder="Ex: Galaxy S24 Ultra"
          />
        </div>

        <div className="form-group">
          <label>Marque *</label>
          <input
            type="text"
            name="marque"
            value={formData.marque}
            onChange={handleChange}
            required
            placeholder="Ex: Samsung"
          />
        </div>

        <div className="form-group">
          <label>Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Description du smartphone"
            rows="3"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>FCFA (F) *</label>
            <input
              type="number"
              name="prix"
              value={formData.prix}
              onChange={handleChange}
              required
              min="0"
              placeholder="999"
            />
          </div>

          <div className="form-group">
            <label>Photo URL</label>
            <input
              type="text"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              placeholder="smartphone.jpg"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>RAM *</label>
            <input
              type="text"
              name="ram"
              value={formData.ram}
              onChange={handleChange}
              required
              placeholder="8 GB"
            />
          </div>

          <div className="form-group">
            <label>ROM *</label>
            <input
              type="text"
              name="rom"
              value={formData.rom}
              onChange={handleChange}
              required
              placeholder="256 GB"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Écran *</label>
          <input
            type="text"
            name="ecran"
            value={formData.ecran}
            onChange={handleChange}
            required
            placeholder="6.8 pouces AMOLED"
          />
        </div>

        <div className="form-group">
          <label>Couleurs disponibles * (séparées par des virgules)</label>
          <input
            type="text"
            name="couleurs"
            value={formData.couleurs}
            onChange={handleChange}
            required
            placeholder="Noir, Blanc, Bleu"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Ajouter
          </button>
          {onAnnuler && (
            <button type="button" className="btn btn-secondary" onClick={onAnnuler}>
              Annuler
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AjouterSmartphone;