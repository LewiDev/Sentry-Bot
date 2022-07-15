const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const log = require('../../mongoEvents/logsSchema.js')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('history')
		.setDescription('Checks a users punishment history!')
        .addMentionableOption(option => option.setName('member').setDescription('Members punishment logs you want to check!').setRequired(true)),
	async execute(interaction, client) {
        const member = interaction.options.getMentionable('member')
		const logs = await log.find({punishedId: member.id, guildId: interaction.guild.id})
        if(logs.length === 0) return interaction.reply({content: `${interaction.member}, ${member} Has not been punished before!`, ephemeral: true})
        let type = "";
        let punishment = ''
        for(const i in logs) {
            
            if(logs[i].logtype === 'WARN') {
                punishment = 'Warning'
            }
            if(logs[i].logtype === 'MUTE') {
                punishment = 'Mute'
            }
            const a = client.users.cache.find(user => user.id === logs[i].by)
            type += `**${parseInt(i) + 1})**\nPunishment: ${punishment}\nReason: ${logs[i].reason}\nBy: ${a}\n\n`;

        }
        const historyEmbed = new MessageEmbed()
        .setDescription(`${type}`)
        .setFooter('sentrybot.info', `${client.user.displayAvatarURL()}`);
        interaction.reply({embeds: [historyEmbed], ephemeral: true})
	},
};