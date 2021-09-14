function parseDateString(dateString, separator = '-') {
    const [month, day, year] = dateString.split(separator);
    return new Date(
        parseInt(year, 10),
        parseInt(month, 10) - 1,
        parseInt(day, 10)
    );
}

function toDateString(date, separator = '-') {
    return date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    }).replace(/\//g, separator);
}

export default { parseDateString, toDateString };
