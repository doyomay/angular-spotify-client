import angular from 'angular';

let formatMilisecondsModule = angular.module('millSecondsToTimeString', [])
    .filter('millSecondsToTimeString', () => {
        return (millseconds) => {
            let oneSecond = 1000;
            let oneMinute = oneSecond * 60;
            let oneHour = oneMinute * 60;
            let oneDay = oneHour * 24;

            let seconds = Math.floor((millseconds % oneMinute) / oneSecond);
            let minutes = Math.floor((millseconds % oneHour) / oneMinute);
            let hours = Math.floor((millseconds % oneDay) / oneHour);
            let days = Math.floor(millseconds / oneDay);

            let timeString = '';
            // if (hours !== 0) {
            //     timeString += (hours !== 1) ? (hours + ' hours ') : (hours + ' hour ');
            // }
            if (minutes !== 0) {
                timeString += minutes
            } else {
                timeString += '00';
            }
            if (seconds !== 0 || millseconds < 1000) {
                timeString += ':' + (seconds < 10 ? '0' + seconds : seconds);
            }

            return timeString;
        };
    }).name;

export default formatMilisecondsModule;