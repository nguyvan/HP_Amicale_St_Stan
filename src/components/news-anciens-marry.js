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

const Marry = (props) => {
    
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    const date = props.date;

    const [marry, setMarry] = React.useState()

    React.useEffect(() => { 
        var marrySet = []  
        const marryAlumni = query(ref(db, '/marry'), orderByChild("day"));    
        onValue(marryAlumni, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                var marryData = childSnapshot.val();
                if (marryData.month === (date.month + 1) && marryData.year === date.year) {
                    marrySet.push(JSON.parse(JSON.stringify(marryData)));
                }
            });
            setMarry(marrySet);
        }, 
        {
        onlyOnce: true
        });
    
    }, [date])

    if (!marry) {
        return (
            <div style={{marginBottom: "100px", marginTop: "100px", marginLeft: "50px"}}>
                <p style={textStyle}>&#128141; Mariages</p> 
                <ul>
                    <li style={liStyle}>Pas de l'annonce</li>
                </ul>
            </div>
            )
    }
    if (marry.length === 0) {
        return (
            <div style={{marginBottom: "100px", marginTop: "100px", marginLeft: "50px"}}>
                <p style={textStyle}>&#128141; Mariages</p> 
                <ul>
                    <li style={liStyle}>Pas de l'annonce</li>
                </ul>
            </div>
            )
    }
    else {
        return (  
            <div style={{marginBottom: "100px", marginTop: "100px", marginLeft: "50px"}}>
                <p style={textStyle}>&#128141; Mariages</p>
                {
                    marry.map((m, index) => {
                        var promo_wife = (m.promo_wife) ? "(promo " + m.promo_wife + ")" : ""
                        var promo_husband = (m.promo_husband) ? "(promo " + m.promo_husband + ")" : ""
                        return (
                        <li key={index} style={liStyle}>{capitalize(m.firstname_wife)} {m.lastname_wife.toUpperCase()} {promo_wife} et {capitalize(m.firstname_husband)} {m.lastname_husband.toUpperCase()} {promo_husband}, le {m.day} {monthNames[m.month - 1]} {m.year} à {capitalize(m.place)}</li>
                        )    
                    })
                }   
            </div>
        )
    }
}

export default Marry;