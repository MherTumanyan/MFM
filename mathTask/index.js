function minimumTimeForMeetings(participants, timePerMeeting, rooms) {
    // Calculate the total number of meetings required
    const totalMeetings = (participants * (participants - 1)) / 2;
    
    // Check if the number of rooms makes sense
    const isRoomsMuch = rooms > participants / 2 ? true : false;

    // If there are more rooms than needed, adjust the number of rooms
    if(isRoomsMuch) {
        rooms = participants / 2;
    }

    // Calculate the minimum time required in minutes
    const minimumTime = (totalMeetings * timePerMeeting) / rooms;

    return minimumTime;
}

// Example usage:
const participants = 50;
const timePerMeeting = 20; // minutes
const rooms = 10;

const minimumTime = minimumTimeForMeetings(participants, timePerMeeting, rooms);
console.log(`Minimum time required for all meetings: ${minimumTime} minutes`);


// So, you've calculated how much time you need for interviews. But here's the thing: 
// When you translate that time into workdays, you might realize you need to rent 
// the space for several days straight. Imagine that! 🛋️☕
// To put it in perspective, if you divide the total time by 60 (to get hours), 
// and then divide it by 8 (representing a typical workday), you'll see just how 
// many days you'll need to rent the space. Brace yourselves!
