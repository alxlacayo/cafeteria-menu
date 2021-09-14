export default function createSettingsDb({ db }) {
    return {
        async getAll() {
            const data = await db.getRows();
            return data.reduce((settings, item) => {
                settings[item.Name] = item.Value;
                return settings;
            }, {});
        }
    };
}
