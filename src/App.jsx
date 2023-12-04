import { useState } from "react";
import "./App.css";
import { EGG_CODE, ERROR_CODE, loadEgg, loadError, loadPet } from "./api";
import PropTypes from "prop-types";

export function App() {
  const [pets, setPets] = useState([]);
  const [egg, setEgg] = useState(null);
  function onLoadPet(e) {
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
          <Element
            key={`pet-${a.id}`}
            id={a.id}
            code={a.code}
            onClick={healPet}
          />
        ))}
        {egg && <Element key={`egg-${egg.id}`} id={egg.id} code={egg.code} />}
      </div>
    </div>
  );
}

function Element({ id, code, onClick }) {
  function handleClick() {
    onClick?.(id);
  }
  return (
    <span
      onClick={handleClick}
      className={`element ${onClick ? "clickable" : ""}`}
      dangerouslySetInnerHTML={{ __html: code }}
    />
  );
}
Element.propTypes = {
  id: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
