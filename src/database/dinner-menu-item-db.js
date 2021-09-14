export default function createDinnerMenuItemDb({ db }) {
    return {
        async getByDate(dateString) {
            const data = await db.getRows();
            const filteredData = data.filter(row => dateString === row.Date);
            const reducedData = filteredData.reduce((menu, row) => {
                const section = row.Section;
                if (!menu.hasOwnProperty(section)) {
                    menu[section] = {
                        title: section,
                        items: []
                    };
                }
                menu[section].items.push({
                    name: row.Name,
                    price: row.Price
                });
                return menu;
            }, {});
            return Object.values(reducedData);
        }
    };
}
