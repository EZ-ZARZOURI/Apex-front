import React, { useState, useEffect } from "react";
import { getEnseignants } from "../services/api"; // Importez votre service API
import "./EnseignantList.css"; // Fichier CSS pour styliser le tableau

const EnseignantList = () => {
  const [enseignants, setEnseignants] = useState([]);
  const [selectedEnseignant, setSelectedEnseignant] = useState(null);

  useEffect(() => {
    const fetchEnseignants = async () => {
      try {
        const data = await getEnseignants();
        setEnseignants(data);
      } catch (error) {
        console.error("Error fetching enseignants:", error);
      }
    };
    fetchEnseignants();
  }, []);

  const handleRowClick = (enseignant) => {
    setSelectedEnseignant(enseignant);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedEnseignant((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="enseignant-list-container">
      <h2>Liste des Enseignants</h2>
      {enseignants.length > 0 ? (
        <div className="table-and-form">
          <table className="enseignant-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Nom</th>
                <th>Prénom</th>
              </tr>
            </thead>
            <tbody>
              {enseignants.map((enseignant) => (
                <tr
                  key={enseignant.noEnseignant}
                  onClick={() => handleRowClick(enseignant)}
                  className={
                    selectedEnseignant?.noEnseignant === enseignant.noEnseignant
                      ? "selected-row"
                      : ""
                  }
                >
                  <td>{enseignant.noEnseignant}</td>
                  <td>{enseignant.nom}</td>
                  <td>{enseignant.prenom}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedEnseignant && (
            <div className="enseignant-form">
              <h3>Modifier l'enseignant</h3>
              <form>
                <div className="form-group">
                  <label>Type</label>
                  <select
                    name="type"
                    value={selectedEnseignant.type || ""}
                    onChange={handleInputChange}
                  >
                    <option value="ENC">ENC</option>
                    <option value="INT">
                      INT
                    </option>
                  </select>
                </div>


                {selectedEnseignant.type === "ENC" ? (
                  <>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="text"
                        name="enc_ubo_email"
                        value={selectedEnseignant.enc_ubo_email || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Téléphone UBO</label>
                      <input
                        type="text"
                        name="enc_ubo_tel"
                        value={selectedEnseignant.enc_ubo_tel || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Téléphone Personel</label>
                      <input
                        type="text"
                        name="encPersoTel"
                        value={selectedEnseignant.encPersoTel || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Email Personel</label>
                      <input
                        type="text"
                        name="enc_perso_email"
                        value={selectedEnseignant.enc_perso_email || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                  </>
                ) : (
                  <>

                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="text"
                        name="int_prof_email"
                        value={selectedEnseignant.int_prof_email || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Téléphone</label>
                      <input
                        type="text"
                        name="int_prof_tel"
                        value={selectedEnseignant.int_prof_tel || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Portable</label>
                      <input
                        type="text"
                        name="tel_port"
                        value={selectedEnseignant.tel_port || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Société</label>
                      <input
                        type="text"
                        name="int_soc_nom"
                        value={selectedEnseignant.int_soc_nom || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                  </>
                )}
              </form>
            </div>
          )}
        </div>
      ) : (
        <p>Aucun enseignant trouvé.</p>
      )}
    </div>
  );
};

export default EnseignantList;
