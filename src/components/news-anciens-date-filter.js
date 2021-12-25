// Step 1: Import React
import * as React from 'react';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {useState} from 'react';
import Birth from "./news-anciens-birth";
import Marry from "./news-anciens-marry";
import Death from "./news-anciens-death";
  
// import DateProvider from "./news-anciens-provider";


var buttonStyle = {
    border: 0,
    backgroundColor: "transparent",
    height: "2rem",
    marginRight: "10px",
    marginLeft: "10px", 
    fontSize: "3rem",
    lineHeight: "50%",
    display: "inline-flex",
    alignItems: "flex-end",
    verticalAlign: "text-bottom",
    position: "relative",
}

var spanStyle = {
    position: "relative",
    fontWeight: 50,
    display: "block",
    height: "100%",
    bottom: "0px",
    lineHeight: "50%"
}

var textStyle = {
    position: "relative",
    fontFamily: "Poppins",
    fontStyle: "normal", 
    fontWeight: 600,
    fontSize: "1.5rem",
    color: "#000000",
    display: "inline-block",
}

const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

const Filtre = () => {
    var date_var = new Date();
    const [date, setDate] = useState({
        month: date_var.getMonth(),
        year: date_var.getFullYear()
    });

    const getNextMonth = () => {
        var nextDate = date;
        if (nextDate.month === 11) {
            nextDate.month = 0
            nextDate.year++
        }
        else {
            nextDate.month++
        }
        setDate((prevDate) => ({
            ...prevDate,
            month: nextDate.month,
            year: nextDate.year
        }));
    };

    const getPrevMonth = () => {
        var previDate = date;
        if (previDate.month === 0) {
            previDate.month = 11
            previDate.year--
        }
        else {
            previDate.month--
        }
        setDate((prevDate) => ({
            ...prevDate,
            month: previDate.month,
            year: previDate.year
        }));
    }

    return (
        <div style={{marginTop: "200px"}}>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "baseline", flexWrap: "wrap"}}>
                <div>
                    <button style={buttonStyle} onClick={getPrevMonth}><span style={spanStyle}>&#8249;</span></button>
                </div>
                <div>
                    <p style={textStyle}>{monthNames[date.month]} {date.year}</p>
                </div>
                <div>
                    <button style={buttonStyle} onClick={getNextMonth}><span style={spanStyle}>&#8250;</span></button>
                </div>
            </div>
            <div>
                <Birth date={date}/>
                <Marry date={date}/>
                <Death date={date}/> 
            </div>
        </div>
    )
}

export default Filtre;