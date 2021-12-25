import * as React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../sass/components/_form-post.scss"
import FormPart from "./form-part-announce";
const Form = () => {
    const [step, setStep] = React.useState(1);
    const [dataForm1, setDataForm1] = React.useState();
    const [dataForm2, setDataForm2] = React.useState();
    const [title, setTitle] = React.useState("Sélectionnez un choix parmi la liste ci-dessous: ");
    const handleCallback = (childData) => {
        if (step === 1) {
            setDataForm1(childData);
        }
        if (step === 2) {
            setDataForm2(childData);
        }
    };

    const handleValidate = () => {
        switch (step) {
            case 1:
                setTitle("Merci de bien vouloir renseigner les information ci-dessous: ")
                if (dataForm1) {
                    setStep(step + 1);
                } else {
                    alert("Aucune choix");
                }
                break;
            case 2:
                switch (dataForm1) {
                    case "Birth": 
                        if (!dataForm2["name-child"] || !dataForm2["birth-day"] || !dataForm2["firstname-mom"] || !dataForm2["lastname-mom"] || !dataForm2["firstname-dad"] || !dataForm2["lastname-dad"]) {
                            alert("Cannot submit. Please check the invalid field")
                            setStep(step)
                        }
                        else {
                            setTitle("Votre annonce a été prise en compte ")
                            setStep(step + 1);
                            document.getElementById("validate-btn").style.visibility = "hidden";
                        }
                        break;
                    case "Marry": 
                        if (!dataForm2["firstname-wife"] || !dataForm2["lastname-wife"] || !dataForm2["firstname-husband"] || !dataForm2["lastname-husband"] || !dataForm2["marry-date"] || !dataForm2["marry-place"]) {
                            alert("Cannot submit. Please check the invalid field")
                            setStep(step)
                        }
                        else {
                            setTitle("Votre annonce a été prise en compte ")
                            setStep(step + 1);
                            document.getElementById("validate-btn").style.visibility = "hidden";
                        }
                        break;
                    default:
                        if (!dataForm2["firstname"] || !dataForm2["lastname"] || !dataForm2["death-date"] || !dataForm2["death-place"]) {
                            alert("Cannot submit. Please check the invalid field")
                            setStep(step)
                        }
                        else {
                            setTitle("Votre annonce a été prise en compte ")
                            setStep(step + 1);
                            document.getElementById("validate-btn").style.visibility = "hidden";
                        }
                        break;
                }
                break;
            default:
                document.getElementById("validate-btn").style.visibility = "visible";
                break;
        }
    };

    return (
        <div className="form-principle form-fill"> 
            <div className="name-form"> 
                <h4>
                    Postez votre annonce <span>GRATUITEMENT</span>
                </h4>
            </div>
            <div className="row" style={{marginBottom: "3rem"}}>
                <div className="col">
                    <div className="container container-div">
                        <span className="dot-checked"></span>
                    </div>
                    <p>Choix <br/> de l'annonce</p>
                </div>
                <div className="col">
                    <div className="container container-div">
                        <div className={step <= 1 ? "dot" : "dot-checked"}></div>
                        <span className={step <= 1 ? "line" : "line-checked"}></span>
                    </div>
                    <p>Information <br/> de l'annonce</p>
                </div>
                <div className="col">
                    <div className="container container-div">
                        <div className={step <= 2 ? "dot" : "dot-checked"}></div>
                        <span className={step <= 2 ? "line" : "line-checked"}></span>
                    </div>
                    <p>Validation <br/> de l'annonce</p>
                </div>
            </div>
            <h5 style={step===3?{fontFamily: "Poppins", fontStyle: "normal", fontWeight: 600, fontSize: "1rem", color: "#1E266D", 
            lineHeight: "125%", textAlign: "center"}: {fontFamily: "Open Sans", fontStyle: "normal", fontWeight: 600, fontSize: "1rem", color: "#6E798C", 
            lineHeight: "125%", textAlign: "center"}}>{title}</h5>
            <FormPart step={step} dataForm1={dataForm1} dataForm2={dataForm2} parentCallback={handleCallback}/>
            <button id="validate-btn" className="btn btn-primary custom-btn" onClick={handleValidate}>Valider</button>
        </div>
    )
}

export default Form;