module.exports = {
    name: 'guildCreate',
    async execute(guild, client) {
        let support_discord = client.guilds.cache.get('880258773376172082')
        const channel = support_discord.channels.cache.find(channel => channel.id == '880259129439035412');

        channel.send({content:`**${client.user.tag} Joined A New Server**\n**Server:** ${guild.name}\n**Total Servers:** ${client.guilds.cache.size}\n**Total User's:** ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}\n\n`})
    }
};