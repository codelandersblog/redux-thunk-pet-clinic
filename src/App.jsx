import { useState } from "react";
import "./App.css";
import { loadEgg, loadError, loadPet, isError } from "./api";
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
    return pets.filter((p) => !isError(p)).length;
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
