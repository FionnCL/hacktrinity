const admin = require('firebase-admin');
const serviceAccount = require('./firebase-key.json');

// Initialize Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Function to create random timetable
const createRandomTimetable = () => {
    const weekDays = ["monday", "tuesday", "wednesday", "thursday", "friday"];
    let week = {};
    weekDays.forEach(day => {
        week[day] = [];
        for (let hour = 9; hour <= 17; hour++) {
            week[day].push({ hour: hour, status: Math.round(Math.random()) });
        }
    });
    return week;
};

const initializeDatabase = async () => {
    const numberOfUsers = 50;
    const numberOfGroups = 20;

    // Create users
    let users = [];
    for (let i = 1; i <= numberOfUsers; i++) {
        const userId = `user${i}`;
        users.push(userId);
        const userRef = db.collection('user').doc(userId);
        await userRef.set({
            name: `User ${i}`,
            userID: userId,
            groups: [],
            week: createRandomTimetable()
        });
    }

    // Create groups and randomly assign users to groups
    let groups = {};
    for (let i = 1; i <= numberOfGroups; i++) {
        const groupId = `group${i}`;
        groups[groupId] = [];
        const groupRef = db.collection('group').doc(groupId);
        await groupRef.set({
            groupID: groupId,
            users: []
        });
    }

    // Randomly assign users to groups
    users.forEach(userId => {
        // Randomly decide the number of groups a user belongs to
        const numOfGroupsForUser = Math.floor(Math.random() * 3) + 1; // Each user in 1 to 3 groups
        for (let i = 0; i < numOfGroupsForUser; i++) {
            const randomGroupIndex = Math.floor(Math.random() * numberOfGroups);
            const randomGroupId = `group${randomGroupIndex + 1}`;

            // Add user to group if not already added
            if (!groups[randomGroupId].includes(userId)) {
                groups[randomGroupId].push(userId);
            }

            // Add group to user's groups if not already added
            db.collection('user').doc(userId).update({
                groups: admin.firestore.FieldValue.arrayUnion(randomGroupId)
            });
        }
    });

    // Update groups with their users
    for (const [groupId, userIds] of Object.entries(groups)) {
        const groupRef = db.collection('group').doc(groupId);
        await groupRef.update({
            users: userIds
        });
    }

    console.log('Database initialized with sample data.');
};

initializeDatabase();
