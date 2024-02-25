import React from "react";
import Login from './Login.js'
import timetable from './img/timetable.png';

import NodesImage from './nodes.png';
import './Landing.css'

export default function Landing(){
    return(
        <div className="landing">
            <div className="landing-text">
                <h1 className="h1-1">Schedule Smarter,</h1><h1 className="h1-2">Socialise Better.</h1>
                <h2 className="h2-1">Lunchtime: The Ultimate Meetup Planner.</h2>
            </div>
            <div className="circle"></div>
            <div className="circle-2"></div>
            <div className="timetable-lowtext">
                <div id="timetable-2">
                    <img src={timetable} alt="timetable" id="timetable-2"/>
                </div>
                <div className="landing-text-low">
                    <h1 className="h1-3">How It Works:</h1>
                    <h2 className="h3-1">Welcome to lunchtime, where syncing calendars with friends, clubs, or projects is a breeze. Simply import your Google or Apple Calendar, add contacts, and instantly find overlapping free time slots for meetings, hangouts, or events. Effortlessly coordinate schedules with ease!</h2>
                </div>
            </div>
            <div className="circle-3"></div>
        </div>
    );
}
