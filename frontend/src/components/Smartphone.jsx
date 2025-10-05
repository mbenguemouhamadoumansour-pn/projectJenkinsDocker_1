import React from 'react';

const Smartphone = ({ smartphone, onSupprimer, onAfficherDetails }) => {
  return (
    <div className="smartphone-card">
      <div className="smartphone-info">
        <h3 
          className="smartphone-nom" 
          onClick={() => onAfficherDetails(smartphone._id)}
          style={{ cursor: 'pointer', color: '#007bff' }}
        >
          {smartphone.nom}
        </h3>
        <p className="smartphone-marque">{smartphone.marque}</p>
        <p className="smartphone-prix">{smartphone.prix} F</p>
      </div>
      <button 
        className="btn btn-danger"
        onClick={() => onSupprimer(smartphone._id)}
      >
        Supprimer
      </button>
    </div>
  );
};

export default Smartphone;