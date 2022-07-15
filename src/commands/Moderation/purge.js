const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription('Bulk Deletes a selected amount of messages')
        .addIntegerOption(option => option.setName('amount').setDescription('the amount of messages to delete!').setRequired(true)),
	async execute(interaction, client) {
        let amount = interaction.options.getInteger('amount')

        if(!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply({content: `${interaction.member} you do not have the required permission to use the command: ${interaction.name}!`, ephemeral: true})

        if(amount > 100) return interaction.reply({content: `${interaction.member}, you cannot purge more than 100 messages!`, ephemeral: true});
        if(amount < 1) return interaction.reply({content: `${interaction.member}, you cannot purge less than 1 messages!`, ephemeral: true});

        await interaction.channel.bulkDelete(amount);

        interaction.reply({content: `${interaction.member}, Successfully Cleared ${amount} Messages in ${interaction.channel}`, ephemeral: true});


		
	},
};