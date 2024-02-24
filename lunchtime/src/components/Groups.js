import React, { useEffect, useState } from 'react';
import { db } from './config.js';
import { doc, getDocs, getDoc, collection, query, where } from 'firebase/firestore';

import Group from './Group.js';
import './Groups.css';

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
    const [currentGroup, setCurrentGroup] = useState([]);

    useEffect(() => {
        async function helper(){
            let data = await fetchData("testtesttest").then((dat) => setUserData(dat));
            console.log(userData);
        }
        helper();
    });
    
    // render all groups on sidebar.
    // implement :hover here.
    const groups = userData?.map((elem) => {
        return(
            <div onClick={() => setCurrentGroup(elem.users)} className="group">
                <p className="group-text">GroupID: {elem.groupID}</p>
                <p className="group-text">Users in group: {elem.users}</p>
            </div>
        );
    });

    return(
        <div>
            <div className="groups">
                <h2 className="section-title">Your Groups</h2>
                {groups}
            </div>
            <h1> TIMETABLE GOES HERE</h1>
        </div>
    );
}