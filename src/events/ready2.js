const botdash = require('botdash.pro')
var dashboard = "";
module.exports = {
    name: 'ready',
    async execute(client) {
        dashboard = new botdash.APIclient("3c5b5b35-149c-4709-9d3a-47c3a9e3805e");
        const activities = [
            `${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} Users in ${client.guilds.cache.size} Servers!`,
            'https://sentrybot.info',
        ];
        setInterval(() => {
            const randomIndex = Math.floor(Math.random() * activities.length - 1) + 1;
            const newActivity = activities[randomIndex];

            client.user.setActivity(newActivity, {
                type: 'WATCHING'
            });
        }, 7000);



    },
};