import React, { useState, useEffect } from 'react';

const DetaillerSmartphone = ({ smartphone, onAnnuler, onModifier }) => {
  const [modeEdition, setModeEdition] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (smartphone) {
      setFormData({
        nom: smartphone.nom || '',
        marque: smartphone.marque || '',
        description: smartphone.description || '',
        prix: smartphone.prix || '',
        photo: smartphone.photo || '',
        ram: smartphone.ram || '',
        rom: smartphone.rom || '',
        ecran: smartphone.ecran || '',
        couleurs: smartphone.couleurs ? smartphone.couleurs.join(', ') : ''
      });
    }
  }, [smartphone]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const smartphoneModifie = {
      ...formData,
      prix: Number(formData.prix),
      couleurs: formData.couleurs.split(',').map(c => c.trim())
    };

    onModifier(smartphone._id, smartphoneModifie);
    setModeEdition(false);
  };

  if (!smartphone) return null;

  if (modeEdition) {
    return (
      <div className="detailler-smartphone">
        <h2>Éditer le Smartphone</h2>
        <form onSubmit={handleSubmit} className="smartphone-form">
          <div className="form-group">
            <label>Nom</label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Marque</label>
            <input
              type="text"
              name="marque"
              value={formData.marque}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Prix (€)</label>
              <input
                type="number"
                name="prix"
                value={formData.prix}
                onChange={handleChange}
                required
                min="0"
              />
            </div>

            <div className="form-group">
              <label>Photo URL</label>
              <input
                type="text"
                name="photo"
                value={formData.photo}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>RAM</label>
              <input
                type="text"
                name="ram"
                value={formData.ram}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>ROM</label>
              <input
                type="text"
                name="rom"
                value={formData.rom}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Écran</label>
            <input
              type="text"
              name="ecran"
              value={formData.ecran}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Couleurs (séparées par des virgules)</label>
            <input
              type="text"
              name="couleurs"
              value={formData.couleurs}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-success">
              Enregistrer
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => setModeEdition(false)}
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="detailler-smartphone">
      <h2>Détails du Smartphone</h2>
      <div className="details-card">
        <div className="detail-item">
          <strong>Nom:</strong> {smartphone.nom}
        </div>
        <div className="detail-item">
          <strong>Marque:</strong> {smartphone.marque}
        </div>
        <div className="detail-item">
          <strong>Description:</strong> {smartphone.description}
        </div>
        <div className="detail-item">
          <strong>Prix:</strong> {smartphone.prix} F
        </div>
        <div className="detail-item">
          <strong>RAM:</strong> {smartphone.ram}
        </div>
        <div className="detail-item">
          <strong>ROM:</strong> {smartphone.rom}
        </div>
        <div className="detail-item">
          <strong>Écran:</strong> {smartphone.ecran}
        </div>
        <div className="detail-item">
          <strong>Couleurs disponibles:</strong>
          <div className="couleurs-list">
            {smartphone.couleurs && smartphone.couleurs.map((couleur, index) => (
              <span key={index} className="couleur-badge">{couleur}</span>
            ))}
          </div>
        </div>
        {smartphone.photo && smartphone.photo !== 'default.jpg' && (
          <div className="detail-item">
            <strong>Photo:</strong> {smartphone.photo}
          </div>
        )}
      </div>

      <div className="form-actions">
        <button 
          className="btn btn-warning"
          onClick={() => setModeEdition(true)}
        >
          Éditer
        </button>
        <button 
          className="btn btn-secondary"
          onClick={onAnnuler}
        >
          Annuler
        </button>
      </div>
    </div>
  );
};

export default DetaillerSmartphone;