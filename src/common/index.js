export const API_URL = 'https://jewerlocrm.com/jobijob/api';

export const getDateAsString = str => {
    var months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
    var d = new Date(str);

    console.log(str, d.getMonth(), d.getDate(), d.getFullYear());
    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
}
