

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('slowmode')
		.setDescription('Sets a channels slowmode!')
                .addIntegerOption(option => option.setName('delay').setDescription('The amount of time inbertween each message in seconds!').setRequired(true)),
	async execute(interaction, client) {
        const s = interaction.options.getInteger('delay');

        if(!interaction.member.permissions.has('MANAGE_CHANNELS')) return interaction.reply({content: `${interaction.member}, you do not have the required permission to use the command: ${interaction.name}!`, ephemeral: true});
        await interaction.channel.setRateLimitPerUser(s);
        interaction.reply({content: `${interaction.member}, Slowmode has been set for ${s} Seconds`, ephemeral: true})


	},
};