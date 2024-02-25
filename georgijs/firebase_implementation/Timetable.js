
import { initializeApp } from "firebase/app";

import { getFirestore, doc, getDoc } from "firebase/firestore";

// // TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDc0vCtuvnganCqfcXl7G4uHr2VkpXYhRg",
  authDomain: "lunchtime-26f66.firebaseapp.com",
  projectId: "lunchtime-26f66",
  storageBucket: "lunchtime-26f66.appspot.com",
  messagingSenderId: "90954896727",
  appId: "1:90954896727:web:ffb241b06f4e762c59da12",
  measurementId: "G-3ESQP5FJG7"
};


initializeApp(firebaseConfig);
const db = getFirestore();

async function fetchUserWeek(userID) {
    const userRef = doc(db, "user", userID);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
        return userSnapshot.data().week || {};
    } else {
        console.log("No such user document!");
        return null;
    }
}


function renderTimetable(weekData, groupId) {
    const timetableBody = document.getElementById('timetableBody');
    timetableBody.innerHTML = ''; // Clear existing content

    const hours = ['9', '10', '11', '12', '13', '14', '15', '16', '17']; // 9AM to 5PM (17 in 24-hour format)
    hours.forEach(hour => {
        const row = document.createElement('tr');

        // Create and append hour cell
        const hourCell = document.createElement('td');
        hourCell.textContent = `${hour}:00`;
        hourCell.classList.add('px-4', 'py-2');
        row.appendChild(hourCell);

        // Loop through each day
        ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].forEach(day => {
            const statusCell = document.createElement('td');
            statusCell.classList.add('px-4', 'py-2');
            // Find the slot for the current hour
            const slot = weekData[day]?.find(s => s.hour.toString() === hour);
            if (slot && slot.status === 1) {
                statusCell.textContent = slot.status === 1 ? 'Free' : 'Busy';
                statusCell.classList.add(slot.status === 1 ? 'bg-green-200' : 'bg-red-200');
                statusCell.addEventListener('click', async () => {
                    const freeUsers = await fetchUsersFreeAtHour(groupId, day, parseInt(hour));
                    showModal(freeUsers);
                });
            } else {
                statusCell.textContent = '-';
            }
            row.appendChild(statusCell);
        });

        timetableBody.appendChild(row);
    });
}

// Example usage
fetchUserWeek('user1').then(weekData => {
    if (weekData) {
        const groupId = 'group9'
        renderTimetable(weekData, groupId);
    }
});

async function fetchGroupData(groupID) {
    const groupRef = doc(db, "group", groupID);
    const groupSnapshot = await getDoc(groupRef);

    if (groupSnapshot.exists()) {
        return groupSnapshot.data().users || [];
    } else {
        console.log("No such group document!");
        return [];
    }
}

async function fetchUsersFreeAtHour(groupId, day, hour) {
    const userIds = await fetchGroupData(groupId);
    let freeUsers = [];

    for (const userId of userIds) {
        const userRef = doc(db, "user", userId);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
            const week = userSnapshot.data().week || {};
            const slot = week[day]?.find(s => s.hour === hour && s.status === 1);
            if (slot) {
                freeUsers.push(userSnapshot.data().name);
            }
        }
    }
    console.log(freeUsers)
    return freeUsers;
}

async function openModal(day, hour, groupID) {
    const freeUsersList = document.getElementById('freeUsersList');
    freeUsersList.innerHTML = ''; // Clear existing content

    const usersInGroup = await fetchGroupData(groupID);

    // Fetch each user's week data and check if they are free at the selected time
    for (const userID of usersInGroup) {
        const userWeekData = await fetchUserWeek(userID);
        if (userWeekData && userWeekData[day].some(slot => slot.hour.toString() === hour && slot.status === 1)) {
            const li = document.createElement('li');
            li.textContent = `User ${userID} is free`;
            freeUsersList.appendChild(li);
        }
    }

    modal.style.display = 'block'; // Show the modal
}

function showModal(freeUsers) {
    const modal = document.getElementById('myModal');
    const freeUsersList = document.getElementById('freeUsersList');

    // Clear existing content in the modal
    freeUsersList.innerHTML = '';

    // Populate the modal with the list of free users
    freeUsers.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = user;
        freeUsersList.appendChild(listItem);
    });

    // Display the modal
    modal.style.display = 'block';
}

async function fetchUsersFreeAtWeek(groupId) {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17]; // 9AM to 5PM
    const weekAvailability = [];

    const usersInGroup = await fetchGroupData(groupId);
    const totalUsers = usersInGroup.length;

    for (const day of days) {
        for (const hour of hours) {
            const freeUsers = await fetchUsersFreeAtHour(groupId, day, hour);
            const frequency = freeUsers.length / totalUsers;

            // Adjusted color classification
            let colorClass;
            if (frequency > 0.9) {
                colorClass = 'bg-green-200'; // 90%+ availability
            } else if (frequency > 0.5) {
                colorClass = 'bg-yellow-200'; // 50-90% availability
            } else {
                colorClass = 'bg-red-200'; // <50% availability
            }

            weekAvailability.push({ day, hour, usersFree: freeUsers, frequency: colorClass });
        }
    }

    return weekAvailability;
}

async function fetchAndDisplayUserGroups(userID) {
    const userRef = doc(db, "user", userID);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
        const userGroups = userSnapshot.data().groups || [];
        const groupListElement = document.getElementById('groupList');
        groupListElement.innerHTML = ''; // Clear existing groups

        userGroups.forEach(groupID => {
            const groupItem = document.createElement('li');
            groupItem.textContent = groupID;
            groupItem.classList.add('cursor-pointer', 'hover:text-blue-600');
            groupItem.onclick = () => renderGroupTimetable(groupID);
            groupListElement.appendChild(groupItem);
        });
    } else {
        console.log("No such user document!");
    }
}

// Call this function on page load
fetchAndDisplayUserGroups('user1'); // Replace 'user1' with the actual user ID

async function renderGroupTimetable(groupId) {
    // Fetch the heatmap data for the group
    const heatmapData = await fetchUsersFreeAtWeek(groupId);

    // Clear the existing timetable
    const timetableBody = document.getElementById('timetableBody');
    timetableBody.innerHTML = '';

    const hours = ['9', '10', '11', '12', '13', '14', '15', '16', '17']; // 9AM to 5PM
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

    hours.forEach(hour => {
        const row = document.createElement('tr');

        // Create and append hour cell
        const hourCell = document.createElement('td');
        hourCell.textContent = `${hour}:00`;
        hourCell.classList.add('px-4', 'py-2');
        row.appendChild(hourCell);

        days.forEach(day => {
            const statusCell = document.createElement('td');
            statusCell.classList.add('px-4', 'py-2');

            // Find the slot for the current day and hour
            const slot = heatmapData.find(s => s.day === day && s.hour.toString() === hour);

            if (slot) {
                statusCell.textContent = slot.usersFree.length > 0 ? 'Free' : 'Busy';
                statusCell.classList.add(slot.frequency); // Add color class based on frequency
                statusCell.addEventListener('click', () => showModal(slot.usersFree));
            } else {
                statusCell.textContent = '-';
            }

            row.appendChild(statusCell);
        });

        timetableBody.appendChild(row);
    });
}


// Example of a group item click event in the sidebar
groupItem.onclick = () => renderGroupTimetable(groupID);
