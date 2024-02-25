// import React, { useState, useEffect } from 'react';
// import { gapi } from 'gapi-script';

// const GoogleCalendar = () => {
//     const [events, setEvents] = useState([]);

//     useEffect(() => {
//         const fetchEvents = async () => {
//             try {
//                 // Ensure the client is initialized before trying to fetch events
//                 await gapi.client.init({
//                     apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
//                     clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
//                     discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
//                     scope: 'https://www.googleapis.com/auth/calendar'
//                 });

//                 const timeMax = new Date();
//                 timeMax.setDate(timeMax.getDate() + 7); // Get events for the next week

//                 const response = await gapi.client.calendar.events.list({
//                     'calendarId': 'primary',
//                     'timeMin': (new Date()).toISOString(),
//                     'showDeleted': false,
//                     'singleEvents': true,
//                     'maxResults': 10,
//                     'orderBy': 'startTime'
//                 });
//                 setEvents(response.result.items);
//             } catch (error) {
//                 console.log(error);
//             }
//         };

//         if (window.gapi) {
//             gapi.load('client:auth2', fetchEvents);
//         }
//     }, []);

//     return (
//         <div>
//             <h2>Upcoming Events</h2>
//             <ul>
//                 {events.map((event, index) => (
//                     <li key={index}>
//                         {event.summary} ({new Date(event.start.dateTime || event.start.date).toLocaleString()})
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default GoogleCalendar;
