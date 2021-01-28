import React from 'react';
import './Today.css';

const Today = () => {

    const currDate = new Date();
    const date = printDate(currDate);
    
    function printDate(d) {
        const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        //Get specific information that you need from new Date(). 
        const weekDay = days[d.getDay()]; 
        const monthDay = d.getDate();
        const month = months[d.getMonth()];
        const year = d.getFullYear();

        //Here weekDay + monthDay + month + year (Monday, 13 july 2020).
        return weekDay + ", " + monthDay + " " + month + " " + year;
    }
    
    return (
        <div className="today-container">
            <h2>My Day</h2>
            <p className="today">{date}</p>
        </div>
    );
}

export default Today;