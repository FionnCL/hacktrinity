import React, { useState, useEffect } from 'react';
import { db } from './config.js'
import { getFirestore, where, query, collection, getDocs } from 'firebase/firestore';

import './Timetable.css';

const dotw = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const times = ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"];

async function getTimetables(groupUsers){
    let array = [];
    for(let s of groupUsers){
        const q = query(collection(db, "user"), where("userID", "==", s));
        const qsnap = await getDocs(q);

        qsnap?.forEach((doc) => {
            array.push({id: doc.id, ...doc.data()});
        });
    }

    console.log(array);
    return array;
}

export default function Timetable(props){
    const [userTimetables, setUserTimetables] = useState([]);

    const groupUsers = props.users;

    useEffect(() => {
        async function helper(){
            setUserTimetables(await getTimetables(groupUsers));
        }
        helper();
    }, []);

    const finalTable = compareTables(userTimetables);

    const timeCells = times.map((elem) => {
        return <p className='time'>{elem}</p>
    });

    const dayCells = dotw.map((elem) => {
        return <p className='days'>{elem}</p>;
    });

    // groupUsers[i]'s timetable = finalTable[i];
    //
    const cells = finalTable.map((elem, index) => {
        return (elem ? <div className='cell green'><p className="cell-text">All free!</p></div> : <div className='cell red'> { userTimetables.map((tt, userIndex) => {
             return !tt.timetable[index] ? "" : <p className="cell-text">{groupUsers[userIndex]}</p>; })
        }</div>)
    });

    return(
        <div class='home'>
            <div className='times'>
                {timeCells}
            </div>
            <div className='timetable'>
                {dayCells}
                {cells}
            </div>
        </div>
    );
}

function compareTables(tables){
    const baseTimetable = [
        true, true, true, true, true,
        true, true, true, true, true,
        true, true, true, true, true,
        true, true, true, true, true,
        true, true, true, true, true,
        true, true, true, true, true,
        true, true, true, true, true,
        true, true, true, true, true,
        true, true, true, true, true
    ];

    for(let i = 0; i < tables.length; i++){
        let curr = tables[i].timetable;
        for(let j = 0; j < curr.length; j++){
            if(!curr[j]){
                baseTimetable[j] = false;
            }
        }
    }

    console.log(baseTimetable);
    return baseTimetable;
}

// function compareArrayStrings(arr1, arr2) {
//     const len1 = arr1.length;
//     const len2 = arr2.length;

//     if (len1 === len2 && len1 !== 0 && len2 !== 0) {
//         return true; // Green
//     } else if (len1 !== len2 && len1 !== 0 && len2 !== 0) {
//         return 'yellow'; // Yellow
//     } else {
//         return false; // Red
//     }
// }


// function generateTimetable() {
//     const timetableBody = document.getElementById('timetableBody');

//     // Control array containing all names
//     const allNames = ["Alice", "Bob", "Charlie", "David"];

//     // Array of arrays of strings for timetable data
//     const timetableData = [
//         [[], ["Alice", "Bob"], ["Charlie", "David"], ["Alice", "Charlie"], ["Bob", "David"]],
//         [["Alice", "Bob"], ["Bob", "Charlie"], ["Alice", "David"], ["Charlie", "David"], ["Alice", "Bob", "Charlie"]],
//         [["Alice", "Bob", "David"], [], ["Charlie"], ["Alice", "David"], ["Bob", "Charlie"]],
//         [["Alice", "Bob"], ["Alice", "Charlie"], ["Charlie", "David"], ["Alice", "Bob", "Charlie", "David"], ["Alice", "Charlie"]],
//         [["Alice", "Bob", "David"], ["Alice", "Bob", "Charlie"], ["Charlie"], ["David"], ["Alice", "Charlie", "David"]],
//         [["Alice", "Bob"], [], ["Charlie", "David"], ["Alice", "Charlie"], ["Bob", "David"]],
//         [["Alice", "David"], ["Alice", "Bob"], ["Charlie", "David"], ["David"], ["Alice", "Charlie"]],
//         [["Alice", "Bob", "David"], ["Alice", "Bob", "Charlie"], [], ["Alice", "David"], []],
//         [["Alice", "Bob", "Charlie", "David"], ["Alice", "Bob", "Charlie", "David"], ["Charlie"], ["Alice", "Bob", "Charlie", "David"], ["Alice", "Bob", "Charlie", "David"]]
//     ];

//     // Start from 9am
//     let hour = 9;

//     for (let i = 0; i < 9; i++) {
//         const row = document.createElement('tr');
//         const time = document.createElement('td');
//         time.textContent = `${hour}-${hour+1}`; // Display hour range
//         row.appendChild(time);
//         for (let j = 0; j < 5; j++) {
//             const cell = document.createElement('td');
//             const cellColor = compareArrayStrings(timetableData[i][j], allNames);
//             cell.classList.add(cellColor === true ? 'true' : cellColor === 'yellow' ? 'yellow' : 'false');
//             // Add class based on column index
//             switch (j) {
//                 case 0:
//                     cell.classList.add('monday-column');
//                     break;
//                 case 1:
//                     cell.classList.add('tuesday-column');
//                     break;
//                 case 2:
//                     cell.classList.add('wednesday-column');
//                     break;
//                 case 3:
//                     cell.classList.add('thursday-column');
//                     break;
//                 case 4:
//                     cell.classList.add('friday-column');
//                     break;
//                 default:
//                     break;
//             }
//             row.appendChild(cell);
//         }
//         timetableBody.appendChild(row);
//         hour++;
//     }
// }

// // Call the function to generate timetable
// generateTimetable();
