import * as React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../sass/components/_first-form.scss";

const FirstForm = (props) => {
    const handleChange = (e) => {
        props.parentCallback(e.target.value);
      };
    
      return (
        <form>
          <div className="inputGroup">
            <input
              id="Birth"
              name="radio"
              onChange={handleChange}
              value="Birth"
              type="radio"
            />
            <label htmlFor="Birth">Annoncer une naissance</label>
          </div>
          <div className="inputGroup">
            <input
              id="Marry"
              name="radio"
              onChange={handleChange}
              value="Marry"
              type="radio"
            />
            <label htmlFor="Marry">Annoncer un mariage ou PACS</label>
          </div>
          <div className="inputGroup">
            <input
              id="Death"
              name="radio"
              onChange={handleChange}
              value="Death"
              type="radio"
            />
            <label htmlFor="Death">Annoncer un décès</label>
          </div>
        </form>
    );
}

export default FirstForm;