import React from "react";

import Timetable from './Timetable.js';
import Groups from './Groups.js';
import './Home.css'

export default function Home(props){
    return (
        <div>
            <Groups/>
            <Timetable uid={props.uid.userID}/>
        </div>
    );
}
