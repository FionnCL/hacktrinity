import React, { useEffect, useState } from 'react';
import { db } from './config.js';
import { getDocs, collection, query } from 'firebase/firestore';

import Timetable from './Timetable.js';
import './Groups.css';
import add from "./img/add.png";

async function fetchData(uid){
    const q = query(collection(db, "group"));
    const querySnapshot = await getDocs(q);

    let array = [];
    querySnapshot.forEach((doc) => {
        array.push({id: doc.id, ...doc.data()});
    });

    return array;
}

export default function Groups(props){
    const [userData, setUserData] = useState([]);
    const [currentGroup, setCurrentGroup] = useState('');

    useEffect(() => {
        async function helper(){
            let data = await fetchData("testtesttest").then((dat) => setUserData(dat));
            console.log(userData);
        }
        helper();
    },[]);
    
    // render all groups on sidebar.
    // implement :hover here.
    const groups = userData?.map((elem) => {
        return(
            <div onClick={() => setCurrentGroup(elem.users)} className="group">
                <p className="group-text">Group: {elem.groupID}</p>
                <p className="group-text">Users in group: {elem.users.toString()}</p>
            </div>
        );
    });

    return(
        <div className="home">
            <div className="groups">
                <h2 className="section-title">Your Groups</h2>
                {groups}
            </div>
            { currentGroup ? <Timetable users={currentGroup}/> : <p className='no-groups'>No group selected.</p>}
            <div className="add">
                    <img src={add} alt="add friends" className="add"/>
            </div>
        </div>
    );
}
