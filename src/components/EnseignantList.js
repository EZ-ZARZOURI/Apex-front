import React, { useState, useEffect } from "react";
import { getEnseignants } from "../services/api";

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
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold text-blue-600 mb-6">
        Liste des Enseignants
      </h2>
      {enseignants.length > 0 ? (
        <div className="grid grid-cols-2 gap-8">
          <table className="table-auto border-collapse w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2">Code</th>
                <th className="px-4 py-2">Nom</th>
                <th className="px-4 py-2">Prénom</th>
              </tr>
            </thead>
            <tbody>
              {enseignants.map((enseignant) => (
                <tr
                  key={enseignant.noEnseignant}
                  onClick={() => handleRowClick(enseignant)}
                  className={`cursor-pointer ${
                    selectedEnseignant?.noEnseignant ===
                    enseignant.noEnseignant
                      ? "bg-blue-200"
                      : "hover:bg-blue-50"
                  }`}
                >
                  <td className="border px-4 py-2">{enseignant.noEnseignant}</td>
                  <td className="border px-4 py-2">{enseignant.nom}</td>
                  <td className="border px-4 py-2">{enseignant.prenom}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedEnseignant && (
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-600 mb-4">
                Modifier l'enseignant
              </h3>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Type
                  </label>
                  <select
                    name="type"
                    value={selectedEnseignant.type || ""}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="ENC">ENC</option>
                    <option value="INT">INT</option>
                  </select>
                </div>

                {selectedEnseignant.type === "ENC" ? (
                  <>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="text"
                        name="enc_ubo_email"
                        value={selectedEnseignant.enc_ubo_email || ""}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">
                        Téléphone UBO
                      </label>
                      <input
                        type="text"
                        name="enc_ubo_tel"
                        value={selectedEnseignant.enc_ubo_tel || ""}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">
                        Téléphone Personnel
                      </label>
                      <input
                        type="text"
                        name="encPersoTel"
                        value={selectedEnseignant.encPersoTel || ""}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">
                        Email Personnel
                      </label>
                      <input
                        type="text"
                        name="enc_perso_email"
                        value={selectedEnseignant.enc_perso_email || ""}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="text"
                        name="int_prof_email"
                        value={selectedEnseignant.int_prof_email || ""}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">
                        Téléphone
                      </label>
                      <input
                        type="text"
                        name="int_prof_tel"
                        value={selectedEnseignant.int_prof_tel || ""}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">
                        Portable
                      </label>
                      <input
                        type="text"
                        name="tel_port"
                        value={selectedEnseignant.tel_port || ""}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">
                        Société
                      </label>
                      <input
                        type="text"
                        name="int_soc_nom"
                        value={selectedEnseignant.int_soc_nom || ""}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  </>
                )}
              </form>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-600">Aucun enseignant trouvé.</p>
      )}
    </div>
  );
};

export default EnseignantList;
