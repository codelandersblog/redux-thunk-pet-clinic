import "./App.css";
import { isError } from "./api";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { healPet, loadPetThunk } from "./clinicSlice";

export function App() {
  const pets = useSelector((state) => state.clinic.pets);
  const egg = useSelector((state) => state.clinic.egg);
  const dispatch = useDispatch();
  return (
    <div className="container">
      <button
        disabled={!!egg}
        className="loading-button"
        onClick={() => dispatch(loadPetThunk())}
      >
        Load new pet
      </button>
      <span className="pets-to-heal">
        Pets to heal: {pets.filter((p) => !isError(p)).length}
      </span>
      <div className="clinic">
        {pets.map((a) => (
          <Element
            key={`pet-${a.id}`}
            id={a.id}
            code={a.code}
            onClick={() => dispatch(healPet({ id: a.id }))}
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
