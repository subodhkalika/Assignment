const getInitialFromName = (name) => {
    return name ? name.charAt(0) : "";
}

const formatDateAndTime = (dateTime) => {
    const date = new Date(dateTime);
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    
    return month + " " + day + " @ " + time.toLowerCase();
}

const JobsUtil = {
    getInitialFromName,
    formatDateAndTime
}

export default JobsUtil;
