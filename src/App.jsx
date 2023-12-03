import { useState } from "react";
import "./App.css";
import { EGG_CODE, ERROR_CODE, loadEgg, loadError, loadPet } from "./api";
import PropTypes from "prop-types";

export function App() {
  const [pets, setPets] = useState([]);
  const [egg, setEgg] = useState(null);
  async function onLoadPet(e) {
    e.preventDefault();
    setEgg(loadEgg());
    loadPet()
      .then((pet) => {
        setEgg(null);
        setPets([...pets, pet]);
      })
      .catch(() => {
        setEgg(null);
        setPets([...pets, loadError()]);
      });
  }
  function healPet(id) {
    setPets(pets.filter((p) => p.id !== id));
  }
  function countPets() {
    return pets.filter((p) => p.code !== ERROR_CODE && p.code !== EGG_CODE)
      .length;
  }
  return (
    <div className="container">
      <button disabled={!!egg} className="loading-button" onClick={onLoadPet}>
        Load new pet
      </button>
      <span className="pets-to-heal">Pets to heal: {countPets()}</span>
      <div className="clinic">
        {pets.map((a) => (
          <Pet key={`pet-${a.id}`} id={a.id} code={a.code} healPet={healPet} />
        ))}
        {egg && (
          <Pet
            key={`egg-${egg.id}`}
            id={egg.id}
            code={egg.code}
            healPet={healPet}
          />
        )}
      </div>
    </div>
  );
}

function Pet({ id, code, healPet }) {
  function onHealPet() {
    healPet(id);
  }
  return (
    <span
      onClick={onHealPet}
      className="pet"
      dangerouslySetInnerHTML={{ __html: code }}
    />
  );
}
Pet.propTypes = {
  id: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  healPet: PropTypes.func.isRequired,
};
