import * as React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import FirstForm from "./first-form";
import BirthForm from "./birth-form";
import MarryForm from "./marry-form";
import DeathForm from "./death-form";
import checkmark from "../img/checkmark.png";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

const app = initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
});

const db = getDatabase(app);

const FormPart = (props) => {
    const step = props.step;
    const handleCallback = props.parentCallback;
    const dataForm1 = props.dataForm1;
    const dataForm2 = props.dataForm2;
    switch (step) {
        case 1:
            return (
                <div>
                    <FirstForm parentCallback={handleCallback} />
                </div>
            );
        case 2:
            switch (dataForm1) {
                case "Birth":
                    return (
                        <div>
                            <BirthForm parentCallback={handleCallback} />
                        </div>
                    );
                case "Marry":
                    return (
                        <div>
                            <MarryForm parentCallback={handleCallback} />
                        </div>
                    );
                case "Death":
                    return (
                        <div>
                            <DeathForm parentCallback={handleCallback} />
                        </div>
                    );
                default:
                    break;
            }
            break;
        case 3:
            if (dataForm2) {
                let table_ref = "";
                let adding_data = {}
                let d = null
                if ("birth-day" in dataForm2) {
                    table_ref = "/birth";
                    d = new Date(dataForm2["birth-day"]);
                    adding_data = {
                        day: d.getDate(),
                        month: d.getMonth() + 1,
                        year: d.getFullYear(),
                        firstname: dataForm2['name-child'],
                        firstname_dad: dataForm2['firstname-dad'],
                        lastname_dad: dataForm2['lastname-dad'],
                        firstname_mom: dataForm2['firstname-mom'],
                        lastname_mom: dataForm2['lastname-mom'],
                        promo_dad: dataForm2['promo-dad'],
                        promo_mom: dataForm2['promo-mom']
                    }
                }
                else if ("marry-date" in dataForm2) {
                    d = new Date(dataForm2["marry-date"]);
                    adding_data = {
                        day: d.getDate(),
                        month: d.getMonth() + 1,
                        year: d.getFullYear(),
                        firstname_wife: dataForm2['firstname-wife'],
                        lastname_wife: dataForm2['lastname-wife'],
                        firstname_husband: dataForm2['firstname-husband'],
                        lastname_husband: dataForm2['lastname-husband'],
                        promo_husband: dataForm2['promo-husband'],
                        promo_wife: dataForm2['promo-wife'],
                        place: dataForm2['marry-place']
                    }
                    table_ref = "/marry";
                }
                else if ("death-date" in dataForm2) {
                    d = new Date(dataForm2["death-date"]);
                    adding_data = {
                        day: d.getDate(),
                        month: d.getMonth() + 1,
                        year: d.getFullYear(),
                        firstname: dataForm2["firstname"],
                        lastname: dataForm2["lastname"],
                        promo: dataForm2["promo"],
                        place: dataForm2["death-place"]
                    }
                    table_ref = "/death"
                }
                // Add to Firebase 
                const dataRef = ref(db, table_ref);
                onValue(dataRef, (snapshot) => {
                    let id_data = snapshot.size;
                    console.log("ID after fetch: " + id_data);
                    set(ref(db, table_ref + "/" + id_data), adding_data);
                }, 
                {
                onlyOnce: true
                });

                // Send email notification
                const sendMail = async (data) => {
                    // e.preventDefault();
                  
                    try{
                        const response = await fetch("/.netlify/functions/inform", {
                            method: "POST",
                            body: JSON.stringify(data)
                        })
                    
                        if (!response.ok) {
                            console.error("Response with error")
                            return
                        }
                        
                        console.log("Successfully send email notification to admin")
                      
                    } 
                    catch(e){
                        console.error("Error when sending email: " + e)
                    }
                }
                sendMail(adding_data);

                return (
                <div className="formFill">
                    <img
                    className="rounded mx-auto d-block"
                    src={checkmark}
                    alt="checkmark"
                    width="150"
                    height="150"
                    />
                </div>
                );
            } else {
                return <div>Nothing</div>;
            }
        default:
            break;
    }
}

export default FormPart;