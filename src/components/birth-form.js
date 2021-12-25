import React, { useEffect } from "react";
import "../sass/components/_second-form.scss"
const BirthForm = (props) => {
  const handleCallback = props.parentCallback;
  const [birth, updateBirth] = React.useState({
    "name-child": "",
    "birth-day": "",
    "firstname-mom": "",
    "lastname-mom": "",
    "promo-mom": null,
    "firstname-dad": "",
    "lastname-dad": "",
    "promo-dad": null
  });

  useEffect(() => {
    updateBirth(birth);
    handleCallback(birth);
  })
  return (
    <form>
      <div className="form-group form-content">
        <label className="form-text" htmlFor="name-child">Prénom de l'enfant</label>
        <input
          type="text"
          className="form-control form-items"
          id="name-child"
          placeholder="Ex: Joseph"
          required
          onChange={(e) => {
            updateBirth({ ...birth, "name-child": e.target.value });
            handleCallback(birth);
          }}
        />
      </div>
      <div className="form-group form-content">
        <label className="form-text" htmlFor="birth-day">Date de naissance</label>
        <input
          type="text"
          className="form-control form-items"
          id="birth-day"
          placeholder="Ex: 12/07/2020"
          required
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
            updateBirth({ ...birth, "birth-day": e.target.value });
            handleCallback(birth);
          }}
        />
      </div>
      <div className="form-group form-content">
        <label className="form-text" htmlFor="firstname-mom">Prénom de la mère</label>
        <input
          type="text"
          className="form-control form-items"
          id="firstname-mom"
          placeholder="Ex: Marine"
          required
          onChange={(e) => {
            updateBirth({ ...birth, "firstname-mom": e.target.value });
            handleCallback(birth);
          }}
        />
      </div>
      <div className="form-group form-content">
        <label className="form-text" htmlFor="lastname-mom">Nom de jeune fille de la mère</label>
        <input
          type="text"
          className="form-control form-items"
          id="lastname-mom"
          placeholder="Ex: Martin"
          required
          onChange={(e) => {
            updateBirth({ ...birth, "lastname-mom": e.target.value });
            handleCallback(birth);
          }}
        />
      </div>
      <div className="form-group form-content">
        <label className="form-text" htmlFor="promo-mom">
          Année de promo de la mère (si valable)
        </label>
        <input
          type="number"
          className="form-control form-items"
          id="promo-mom"
          placeholder="Ex: 2007"
          onChange={(e) => {
            updateBirth({ ...birth, "promo-mom": e.target.value });
            handleCallback(birth);
          }}
        />
      </div>
      <div className="form-group form-content">
        <label className="form-text" htmlFor="firstname-dad">Prénom du père</label>
        <input
          type="text"
          className="form-control form-items"
          id="firstname-dad"
          placeholder="Ex: Martin"
          required
          onChange={(e) => {
            updateBirth({ ...birth, "firstname-dad": e.target.value });
            handleCallback(birth);
          }}
        />
      </div>
      <div className="form-group form-content">
        <label className="form-text" htmlFor="lastname-dad">Nom du père</label>
        <input
          type="text"
          className="form-control form-items"
          id="lastname-dad"
          placeholder="Ex: Dubois"
          required
          onChange={(e) => {
            updateBirth({ ...birth, "lastname-dad": e.target.value });
            handleCallback(birth);
          }}
        />
      </div>
      <div className="form-group form-content">
        <label className="form-text" htmlFor="promo-mom">Année de promo du père (si valable)</label>
        <input
          type="number"
          className="form-control form-items"
          id="promo-dad"
          placeholder="Ex: 2006"
          onChange={(e) => {
            updateBirth({ ...birth, "promo-dad": e.target.value });
            handleCallback(birth);
          }}
        />
      </div>
    </form>
  );
};

export default BirthForm;