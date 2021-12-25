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

const Birth = (props) => {
    
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    const date = props.date;

    const [birth, setBirth] = React.useState()

    React.useEffect(() => { 
        var birthSet = []  
        const birthAlumni = query(ref(db, '/birth'), orderByChild("day"));    
        onValue(birthAlumni, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                var birthData = childSnapshot.val();
                if (birthData.month === (date.month + 1) && birthData.year === date.year) {
                    birthSet.push(JSON.parse(JSON.stringify(birthData)));
                }
            });
            setBirth(birthSet);
        }, 
        {
        onlyOnce: true
        });
    
    }, [date])

    if (!birth) {
        return (
            <div style={{marginBottom: "100px", marginTop: "100px", marginLeft: "50px"}}>
                <p style={textStyle}>&#128035; Naissances</p> 
                <ul>
                    <li style={liStyle}>Loading ...</li>
                </ul>
            </div>
            )
    }
    if (birth.length === 0) {
        return (
            <div style={{marginBottom: "100px", marginTop: "100px", marginLeft: "50px"}}>
                <p style={textStyle}>&#128035; Naissances</p> 
                <ul>
                    <li style={liStyle}>Pas de l'annonce</li>
                </ul>
            </div>
            )
    }
    else {
        return (  
            <div style={{marginBottom: "100px", marginTop: "100px", marginLeft: "50px"}}>
                <p style={textStyle}>&#128035; Naissances</p> 
                    {
                        birth.map((b, index) => {
                            var promo_mom = (b.promo_mom) ? "(Promo " + b.promo_mom + ")": ""
                            var promo_dad = (b.promo_dad) ? "(Promo " + b.promo_dad + ")": ""
                            return (
                            <li key={index} style={liStyle}>{capitalize(b.firstname)} au foyer de {capitalize(b.firstname_mom)} {b.lastname_mom.toUpperCase()} {promo_mom} et {capitalize(b.firstname_dad)} {b.lastname_dad.toUpperCase()} {promo_dad}, le {b.day} {monthNames[b.month-1]} {b.year} </li>)
                        })
                    }                    
            </div>
        )
    }
}

export default Birth;