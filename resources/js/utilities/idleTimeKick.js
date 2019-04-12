// -- Idle Time Kick Function | - Logs out users after certain amount of time being innactive. - \\
export const idleTime = (() => {
    // Declaring Variables
    let time;

    // Logout Function
    const logout = () => {
        location.href = '/logout';
    };
    // Reset Timer Function
    const resetTimer = () => {
        clearTimeout(time);
        time = setTimeout(logout, 360000); // 1000 milisecond = 1 second | 360.000 miliseconds = 360 seconds = 6 minutes
    };

    // Resets timer on load
    window.onload = resetTimer;
    // DOM Events
    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;
})();