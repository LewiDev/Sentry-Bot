
const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        const BlacklistWords = ["faggot", "f@ggot", "kys", "nigger", "n1gger", "n!gger", "nigga", "niggas"]
        for (var i = 0; i < BlacklistWords.length; i++) {
            if (message.content.includes(BlacklistWords[i])) {
                message.delete()
                message.member.send(`${message.member} your message was deleted as you used one of our forbidden words!!!`)
                break;
            }
        }  



        if(message.content.startsWith('!qweasdzxc')) {
            const embed = new MessageEmbed()
                .setTitle(`Update V1.0.0`)
                .setThumbnail(client.user.displayAvatarURL())
                .setDescription(``)
                .setTimestamp()
                .setFooter('sentrybot.info', `${client.user.displayAvatarURL()}`);

            message.channel.send({embeds: [embed]})
        }
    },
};