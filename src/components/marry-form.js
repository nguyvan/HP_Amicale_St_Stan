import React, { useEffect } from "react";
import "../sass/components/_second-form.scss"

const MarryForm = (props) => {
  const handleCallback = props.parentCallback;
  const [marry, updateMarry] = React.useState({
    "firstname-wife": "",
    "lastname-wife": "",
    "promo-wife": null,
    "firstname-husband": "",
    "lastname-husband": "",
    "promo-husband": null,
    "marry-date": "",
    "marry-place": ""
  });

  useEffect(() => {
    updateMarry(marry);
    handleCallback(marry)
  });

  return (
    <form>
      <div className="form-group form-content">
        <label className="form-text" htmlFor="firstname-wife">Prénom de la mariée</label>
        <input
          type="text"
          className="form-control form-items"
          id="firstname-wife"
          placeholder="Ex: Marine"
          required
          onChange={(e) => {
            updateMarry({ ...marry, "firstname-wife": e.target.value });
            handleCallback(marry);
          }}
        />
      </div>
      <div className="form-group form-content">
        <label className="form-text" htmlFor="lastname-wife">Nom de jeune fille de la mariée</label>
        <input
          type="text"
          className="form-control form-items"
          id="lastname-wife"
          placeholder="Ex: Martin"
          required
          onChange={(e) => {
            updateMarry({ ...marry, "lastname-wife": e.target.value });
            handleCallback(marry);
          }}
        />
      </div>
      <div className="form-group form-content">
        <label className="form-text" htmlFor="promo-wife">
          Année de promo de la mariée (si valable)
        </label>
        <input
          type="number"
          className="form-control form-items"
          id="promo-wife"
          placeholder="Ex: 2007"
          onChange={(e) => {
            updateMarry({ ...marry, "promo-wife": e.target.value });
            handleCallback(marry);
          }}
        />
      </div>
      <div className="form-group form-content">
        <label className="form-text" htmlFor="firstname-husband">Prénom du marié</label>
        <input
          type="text"
          className="form-control form-items"
          id="firstname-husband"
          placeholder="Ex: Martin"
          required
          onChange={(e) => {
            updateMarry({ ...marry, "firstname-husband": e.target.value });
            handleCallback(marry);
          }}
        />
      </div>
      <div className="form-group form-content">
        <label className="form-text" htmlFor="lastname-husband">Nom du marié</label>
        <input
          type="text"
          className="form-control form-items"
          id="lastname-husband"
          placeholder="Ex: Martin"
          required
          onChange={(e) => {
            updateMarry({ ...marry, "lastname-husband": e.target.value });
            handleCallback(marry);
          }}
        />
      </div>
      <div className="form-group form-content">
        <label className="form-text" htmlFor="promo-husband">
          Année de promo du marié (si valable)
        </label>
        <input
          type="number"
          className="form-control form-items"
          id="promo-husband"
          placeholder="Ex: 2006"
          onChange={(e) => {
            updateMarry({ ...marry, "promo-husband": e.target.value });
            handleCallback(marry);
          }}
        />
      </div>
      <div className="form-group form-content">
        <label className="form-text" htmlFor="marry-date">Date du mariage</label>
        <input
          type="text"
          className="form-control form-items"
          id="marry-date"
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
            updateMarry({ ...marry, "marry-date": e.target.value });
            handleCallback(marry);
          }}
        />
      </div>
      <div className="form-group form-content">
        <label className="form-text" htmlFor="marry-place">Lieu du mariage</label>
        <input
          type="text"
          className="form-control form-items"
          id="marry-place"
          placeholder="Ex: Nantes"
          onChange={(e) => {
            updateMarry({ ...marry, "marry-place": e.target.value });
            handleCallback(marry);
          }}
        />
      </div>
    </form>
  );
};

export default MarryForm;
