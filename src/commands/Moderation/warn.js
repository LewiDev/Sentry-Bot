const { SlashCommandBuilder } = require('@discordjs/builders');
const { GuildMember } = require('discord.js');
const mongoose = require('mongoose')
const log = require('../../mongoEvents/logsSchema.js')


//dashboard
const botdash = require('botdash.pro');
const dashboard = new botdash.APIclient("3c5b5b35-149c-4709-9d3a-47c3a9e3805e");
//line 25
//dashboard end

module.exports = {
	data: new SlashCommandBuilder()
		.setName('warn')
		.setDescription('warns a user')
        .addMentionableOption(option => option.setName('member').setDescription('Member you want to warn!').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Reason for warning this member!').setRequired(true)),
	async execute(interaction, client) {
        const member = interaction.options.getMentionable('member');
        const reason = interaction.options.getString('reason');

	if(!interaction.member.permissions.has('MANAGE_MESSAGES')) return interaction.reply('You do not have permissions to use this command')

        if(!(member instanceof GuildMember)) return interaction.reply({content: `${interaction.member}, ${member} is not a member!`, ephemeral: true})

        const logtoggle = await dashboard.getVal(interaction.guild.id, "logstoggle")
        //if(logtoggle === null) {return}
        //if(logtoggle === 'on') {
//
        //}
       // if(logtoggle === 'off') {return}

        const newlog = await log.create({
            logtype: 'WARN',
            punishedId: member.id,
            guildId: interaction.guild.id,
            by: interaction.member.user.id,
            reason
        })



		interaction.reply({content: `${member} has been warned by ${interaction.member} for ${reason}`});



	},
};