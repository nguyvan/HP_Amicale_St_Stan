import * as React from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, orderByChild, query, onValue } from "firebase/database";

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

const textStyle = {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "1.5rem",
    lineHeight: "1rem",
    color: "#92969D"
}

const liStyle = {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "1rem",
    lineHeight: "150%",
    color: "#455880",
    display: "list_item",
    listStylePosition: "inside",
    marginLeft: "4.5%"
}

const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
"Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

const Death = (props) => {
    
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    const date = props.date;

    const [death, setDeath] = React.useState()

    React.useEffect(() => { 
        var deathSet = []  
        const deathAlumni = query(ref(db, '/death'), orderByChild("day"));    
        onValue(deathAlumni, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                var deathData = childSnapshot.val();
                if (deathData.month === (date.month + 1) && deathData.year === date.year) {
                    deathSet.push(JSON.parse(JSON.stringify(deathData)));
                }
            });
            setDeath(deathSet);
        }, 
        {
        onlyOnce: true
        });
    
    }, [date])

    if (!death) {
        return (
            <div style={{marginBottom: "100px", marginTop: "100px", marginLeft: "50px"}}>
                <p style={textStyle}><span style={{fontSize: "2.2rem", lineHeight: "1", verticalAlign: "middle"}}>&#10014;</span> Décès</p>
                <ul>
                    <li style={liStyle}>Loading ...</li>
                </ul>   
            </div>
            )
    }
    if (death.length === 0) {
        return (
            <div style={{marginBottom: "100px", marginTop: "100px", marginLeft: "50px"}}>
                <p style={textStyle}><span style={{fontSize: "2.2rem", lineHeight: "1", verticalAlign: "middle"}}>&#10014;</span> Décès</p>
                <ul>
                    <li style={liStyle}>Pas de l'annonce</li>
                </ul>
            </div>
            )
    }
    else {

        return (  
            <div style={{marginBottom: "100px", marginTop: "100px", marginLeft: "50px"}}>
                <p style={textStyle}><span style={{fontSize: "2.2rem", lineHeight: "1", verticalAlign: "middle"}}>&#10014;</span> Décès</p>
                {
                    death.map((d, index) => {
                        var promo = (d.promo) ? "(promo " + d.promo + ")" : "";
                        return (
                        <li key={index} style={liStyle}>{capitalize(d.firstname)} {d.lastname.toUpperCase()} {promo}, le {d.day} {monthNames[d.month - 1]} {d.year} à {capitalize(d.place)}</li>
                        )
                    })
                } 
            </div>
        )
    }
}

export default Death;