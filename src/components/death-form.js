import React, { useEffect } from "react";
import "../sass/components/_second-form.scss"

const DeathForm = (props) => {
  const handleCallback = props.parentCallback;
  const [death, updateDeath] = React.useState({
    firstname: "",
    lastname: "",
    promo: null,
    "death-date": "",
    "death-place": ""
  });

  useEffect(() => {
    updateDeath(death);
    handleCallback(death);
  });

  return (
    <form>
      <div className="form-group form-content">
        <label className="form-text" htmlFor="firstname">Prénom de la personne décédée</label>
        <input
          type="text"
          className="form-control form-items"
          id="firstname"
          placeholder="Ex: Martin"
          required
          onChange={(e) => {
            updateDeath({ ...death, firstname: e.target.value });
            handleCallback(death);
          }}
        />
      </div>
      <div className="form-group form-content">
        <label className="form-text" htmlFor="lastname">Nom de la personne décédée</label>
        <input
          type="text"
          className="form-control form-items"
          id="lastname"
          placeholder="Ex: Dubois"
          required
          onChange={(e) => {
            updateDeath({ ...death, lastname: e.target.value });
            handleCallback(death);
          }}
        />
      </div>
      <div className="form-group form-content">
        <label className="form-text" htmlFor="propmo">Année de promo (si valable)</label>
        <input
          type="number"
          className="form-control form-items"
          id="promo"
          placeholder="Ex: 2006"
          required
          onChange={(e) => {
            updateDeath({ ...death, promo: e.target.value });
            handleCallback(death);
          }}
        />
      </div>
      <div className="form-group form-content">
        <label className="form-text" htmlFor="death-date">Date du décès</label>
        <input
          type="text"
          className="form-control form-items"
          id="death-date"
          placeholder="Ex: 12/07/2020"
          onFocus={
            (e) => {
              e.currentTarget.type="date";
              e.currentTarget.focus();
            }
          }
          onBlur={
            (e) => {
              e.currentTarget.type="text";
              e.currentTarget.placeholder="Ex: 12/07/2020"
            }
          }
          onChange={(e) => {
            updateDeath({ ...death, "death-date": e.target.value });
            handleCallback(death);
          }}
        />
      </div>
      <div className="form-group form-content">
        <label className="form-text" htmlFor="death-place">Lieu du décès</label>
        <input
          type="text"
          className="form-control form-items"
          id="death-place"
          placeholder="Ex: Nantes"
          onChange={(e) => {
            updateDeath({ ...death, "death-place": e.target.value });
            handleCallback(death);
          }}
        />
      </div>
    </form>
  );
};

export default DeathForm;
