import dateUtils from '../src/utils/date.js'

test('parseDateString returns correct date object', () => {
    const year = 2021;
    const month = 8;
    const day = 26;
    const date = new Date(year, month - 1, day);
    const dateString = `${month}-${day}-${year}`;

    expect(dateUtils.parseDateString(dateString)).toStrictEqual(date)
});

test('toDateString returns correct dateString', () => {
    const year = '2021';
    const month = '08';
    const day = '26';
    const date = new Date(
        parseInt(year, 10),
        parseInt(month, 10) - 1,
        parseInt(day, 10)
    );
    const dateString = `${month}-${day}-${year}`;

    expect(dateUtils.toDateString(date)).toBe(dateString);
});
