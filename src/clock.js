export class Clock {
    constructor(hour, minute) {
        // Check if hour >= 0, and hour < 24
        if (0 <= hour && hour < 24) {
            this.hours = hour;
        }
        else { 
            throw Error('hour value must be >= 0 and < 24');
        }
        
        if (0 <= minute && minute < 60) {
            this.minutes = minute;
        }
        else {
            throw Error('minute value must be >= 0 and < 60');    
        }

        // Activate alarm
        this.alarmIsActive = true;
    }

    // Set alarm time
    setAlarm(hour,minute) {
        this.hourAlarm = hour;
        this.minuteAlarm = minute;
    }

    activateAlarm() {
        this.alarmIsActive = true;
    }

    deactivateAlarm() {
        this.alarmIsActive = false;
    }

    getTime() {
        if (this.minutes >= 60) {
            this.minutes -= 60;
            this.hours += 1;
        }

        if (this.hours >= 24) {
            this.hours -= 24;
        }

        if (this.hours < 0) {
            this.hours += 24;
        }
        
        let hoursPrefix = (this.hours < 10) ? '0'+this.hours : this.hours; 
        let minutesPrefix = (this.minutes < 10) ? '0'+this.minutes : this.minutes;
        this.timeGet = (hoursPrefix + ':' + minutesPrefix);

        return this.timeGet;
    }

    // Clock tick
    tick() {
        this.minutes += 1;
            
        if (this.minutes >= 60) {
            this.minutes -= 60;
            this.hours += 1;
        }

        if (this.hours >= 24) {
            this.hours -= 24;
        }

        if (this.hours < 0) {
            this.hours += 24;
        }
            
        // Say time
        this.hoursPrefix = (this.hours < 10) ? '0'+this.hours : this.hours; 
        this.minutesPrefix = (this.minutes < 10) ? '0'+this.minutes : this.minutes;
        this.timeGet = (this.hoursPrefix + ':' + this.minutesPrefix);
        
        return this.timeGet;
    }
}