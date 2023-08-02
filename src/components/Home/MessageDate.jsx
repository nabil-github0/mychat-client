const setCurrentTime = () => {
    const now = new Date();
    const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][now.getDay()];
    let hour = now.getHours();
    const minute = now.getMinutes().toString().padStart(2, '0');
    const amPM = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    hour = hour.toString();
    const formattedTime = `${hour}:${minute} ${amPM}`;
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear().toString();
    const formattedDate = `${day}-${month}-${year}`;
    const formattedDateTime = `${dayOfWeek}/${formattedTime}/${formattedDate}`;
    return formattedDateTime;
}

export const MessageDate = setCurrentTime() 