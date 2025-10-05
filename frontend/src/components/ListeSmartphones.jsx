import React, { Component } from 'react';
import smartphoneService from '../services/smartphoneService';
import Smartphone from './Smartphone';
import AjouterSmartphone from './AjouterSmartphone';
import DetaillerSmartphone from './DetaillerSmartphone';

class ListeSmartphones extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smartphones: [],
      smartphoneSelectionne: null,
      afficherFormulaire: false,
      afficherDetails: false,
      recherche: '',
      message: '',
      loading: true
    };
  }

  componentDidMount() {
    this.chargerSmartphones();
  }

  // Charger tous les smartphones
  chargerSmartphones = () => {
    this.setState({ loading: true });
    smartphoneService.getAllSmartphones()
      .then(response => {
        this.setState({
          smartphones: response.data.data || [],
          loading: false
        });
      })
      .catch(error => {
        console.error('Erreur lors du chargement:', error);
        this.setState({ 
          message: 'Erreur lors du chargement des smartphones',
          loading: false 
        });
      });
  };

  // Ajouter un smartphone
  ajouterSmartphone = (smartphone) => {
    smartphoneService.ajouterSmartphone(smartphone)
      .then(response => {
        this.setState({
          smartphones: [...this.state.smartphones, response.data.data],
          afficherFormulaire: false,
          message: 'Smartphone ajouté avec succès !'
        });
        setTimeout(() => this.setState({ message: '' }), 3000);
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout:', error);
        this.setState({ message: 'Erreur lors de l\'ajout du smartphone' });
      });
  };

  // Supprimer un smartphone
  supprimerSmartphone = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce smartphone ?')) {
      smartphoneService.supprimerSmartphone(id)
        .then(() => {
          this.setState({
            smartphones: this.state.smartphones.filter(s => s._id !== id),
            message: 'Smartphone supprimé avec succès !'
          });
          setTimeout(() => this.setState({ message: '' }), 3000);
        })
        .catch(error => {
          console.error('Erreur lors de la suppression:', error);
          this.setState({ message: 'Erreur lors de la suppression' });
        });
    }
  };

  // Afficher les détails d'un smartphone
  afficherDetails = (id) => {
    smartphoneService.getSmartphoneById(id)
      .then(response => {
        this.setState({
          smartphoneSelectionne: response.data.data,
          afficherDetails: true,
          afficherFormulaire: false
        });
      })
      .catch(error => {
        console.error('Erreur:', error);
        this.setState({ message: 'Erreur lors du chargement des détails' });
      });
  };

  // Modifier un smartphone
  modifierSmartphone = (id, smartphone) => {
    smartphoneService.modifierSmartphone(id, smartphone)
      .then(response => {
        const updatedSmartphones = this.state.smartphones.map(s =>
          s._id === id ? response.data.data : s
        );
        this.setState({
          smartphones: updatedSmartphones,
          smartphoneSelectionne: response.data.data,
          message: 'Smartphone modifié avec succès !'
        });
        setTimeout(() => this.setState({ message: '' }), 3000);
      })
      .catch(error => {
        console.error('Erreur lors de la modification:', error);
        this.setState({ message: 'Erreur lors de la modification' });
      });
  };

  // Rechercher un smartphone
  rechercherSmartphone = (e) => {
    this.setState({ recherche: e.target.value });
  };

  // Filtrer les smartphones selon la recherche
  getSmartphonesFiltres = () => {
    const { smartphones, recherche } = this.state;
    if (!recherche) return smartphones;

    return smartphones.filter(smartphone =>
      smartphone.nom.toLowerCase().includes(recherche.toLowerCase()) ||
      smartphone.marque.toLowerCase().includes(recherche.toLowerCase())
    );
  };

  render() {
    const { 
      afficherFormulaire, 
      afficherDetails, 
      smartphoneSelectionne, 
      recherche,
      message,
      loading
    } = this.state;

    const smartphonesFiltres = this.getSmartphonesFiltres();

    return (
      <div className="liste-smartphones-container">
        <h1>Gestion des Smartphones</h1>

        {message && (
          <div className="message-success">
            {message}
          </div>
        )}

        {/* Bouton Ajouter */}
        {!afficherFormulaire && !afficherDetails && (
          <button
            className="btn btn-primary btn-large"
            onClick={() => this.setState({ afficherFormulaire: true })}
          >
            + Ajouter un Smartphone
          </button>
        )}

        {/* Formulaire d'ajout */}
        {afficherFormulaire && (
          <AjouterSmartphone
            onAjouter={this.ajouterSmartphone}
            onAnnuler={() => this.setState({ afficherFormulaire: false })}
          />
        )}

        {/* Détails d'un smartphone */}
        {afficherDetails && smartphoneSelectionne && (
          <DetaillerSmartphone
            smartphone={smartphoneSelectionne}
            onAnnuler={() => this.setState({ 
              afficherDetails: false, 
              smartphoneSelectionne: null 
            })}
            onModifier={this.modifierSmartphone}
          />
        )}

        {/* Liste des smartphones */}
        {!afficherFormulaire && !afficherDetails && (
          <>
            {/* Barre de recherche */}
            <div className="recherche-container">
              <input
                type="text"
                placeholder="🔍 Rechercher un smartphone..."
                value={recherche}
                onChange={this.rechercherSmartphone}
                className="input-recherche"
              />
            </div>

            {loading ? (
              <div className="loading">Chargement...</div>
            ) : smartphonesFiltres.length === 0 ? (
              <div className="no-data">
                {recherche ? 'Aucun smartphone trouvé.' : 'Aucun smartphone disponible. Ajoutez-en un !'}
              </div>
            ) : (
              <div className="smartphones-grid">
                {smartphonesFiltres.map(smartphone => (
                  <Smartphone
                    key={smartphone._id}
                    smartphone={smartphone}
                    onSupprimer={this.supprimerSmartphone}
                    onAfficherDetails={this.afficherDetails}
                  />
                ))}
              </div>
            )}

            <div className="total-count">
              Total: {smartphonesFiltres.length} smartphone(s)
            </div>
          </>
        )}
      </div>
    );
  }
}

export default ListeSmartphones;