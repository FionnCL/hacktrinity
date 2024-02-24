
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


function renderTimetable(weekData) {
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
            if (slot) {
                statusCell.textContent = slot.status === 1 ? 'Free' : 'Busy';
                statusCell.classList.add(slot.status === 1 ? 'bg-green-200' : 'bg-red-200');
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
        renderTimetable(weekData);
    }
});


// Function to fetch users in the user's group
async function getUsersInGroup() {
    const userRef = doc(db, "user", "user1"); // Assuming user1 is the current user
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
        const groupIDs = userSnapshot.data().groups || [];
        const usersInGroup = [];

        // Iterate through groupIDs and fetch users in each group
        for (const groupID of groupIDs) {
            const groupRef = doc(db, "group", groupID);
            const groupSnapshot = await getDoc(groupRef);

            if (groupSnapshot.exists()) {
                const groupData = groupSnapshot.data();
                const groupUsers = groupData.users || [];

                // Fetch data of each user in the group and push to usersInGroup array
                for (const userID of groupUsers) {
                    const userRef = doc(db, "user", userID);
                    const userSnapshot = await getDoc(userRef);

                    if (userSnapshot.exists()) {
                        const userData = userSnapshot.data();
                        usersInGroup.push(userData);
                    }
                }
            }
        }

        return usersInGroup;
    } else {
        console.log("No such user document!");
        return [];
    }
}

// Example usage to print the result to console
getUsersInGroup().then(users => {
    console.log("Users in group:", users);
}).catch(error => {
    console.error("Error fetching users in group:", error);
});

// Add event listener to each cell for cell selection
document.querySelectorAll('#timetableBody td').forEach(cell => {
    cell.addEventListener('click', function() {
        const hour = this.parentNode.firstElementChild.textContent.split(':')[0]; // Extract hour from the first column of the selected cell
        const selectedDay = this.parentNode.firstElementChild.textContent.toLowerCase(); // Extract day from the first column of the selected cell
        const selectedHour = parseInt(hour);

        // Fetch users from the group
        getUsersInGroup().then(users => {
            // Filter users who are free in the selected hour
            const freeUsers = users.filter(user => {
                const userAvailability = user.week[selectedDay]?.find(slot => slot.hour === selectedHour);
                return userAvailability && userAvailability.status === 1; // Assuming status 1 means free
            });

            // Display the list of free users in a modal
            displayFreeUsers(freeUsers);
        }).catch(error => {
            console.error("Error fetching users in group:", error);
        });
    });
});


// Function to display free users in a modal
function displayFreeUsers(users) {
    const freeUsersList = document.getElementById('freeUsersList');
    freeUsersList.innerHTML = ''; // Clear existing content

    if (users.length > 0) {
        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = user.name; // Assuming each user object has a 'name' property
            freeUsersList.appendChild(li);
        });

        // Open the modal
        openModal();
    } else {
        alert("No users are free in this hour.");
    }
}
