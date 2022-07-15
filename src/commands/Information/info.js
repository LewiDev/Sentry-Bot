const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, GuildMember } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Displays Information')
        .addSubcommand(subcommand =>
            subcommand
            .setName('user')
            .setDescription('Displays Information on a user!')
            .addMentionableOption(option => option.setName('member').setDescription('The member you want to see information about!').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
            .setName('server')
            .setDescription('Displays Information on the Server!'))
        .addSubcommand(subcommand =>
            subcommand
            .setName('bot')
            .setDescription('Displays Information on the Bot!')),
	async execute(interaction, client) {
        if(interaction.options.getSubcommand() === 'user') {
            const member = interaction.options.getMentionable('member')
            let date = member.joinedAt.toDateString();
            let date2 = member.user.createdAt.toDateString();
            let memberRoles = member.roles.cache
                    .filter((roles) => roles.id !== interaction.guild.id)
                    .map((role) => role.toString());
            if(!(member instanceof GuildMember)) return interaction.reply({content: `${interaction.member}, ${member} is not a member!`, ephemeral: true})

            try {
                const userInfoEmbed = new MessageEmbed()
                .setTitle(`${member.user.username}'s Information`)
                .setThumbnail(member.user.displayAvatarURL())
                .setFields(
                    {name:'Username‎‎‎‎‏‏‎:‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎', value: `\`${member.user.username}\``, inline: true},
                    {name:'User ID:' , value:`\`${member.id}\``, inline: true},
                    {name: '\u200B', value: '\u200B', inline: true },
                    {name:'Joined Server:‏‏‎' , value:`\`${date}\``, inline: true},
                    {name:'Joined Discord:' , value:`\`${date2}\``, inline: true},
                    {name: '\u200B', value: '\u200B', inline: true },
                    {name:'User\'s Roles:' , value:`${memberRoles}`, inline: false},         

                )
                .setTimestamp()
                .setFooter('sentrybot.info', `${client.user.displayAvatarURL()}`);

                interaction.reply({embeds: [userInfoEmbed]})
            } catch(err) {
                console.log(err)
                const catchEmbed = new MessageEmbed()
                .setTitle(`${member.user.username}'s Information`)
                .setThumbnail(member.user.displayAvatarURL())
                .setFields(
                    {name:'Username‎‎‎‎‏‏‎:‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎', value: `\`${member.user.username}\``, inline: true},
                    {name:'User ID:' , value:`\`${member.id}\``, inline: true},
                    {name: '\u200B', value: '\u200B', inline: true },
                    {name:'Joined Server:‏‏‎' , value:`\`${date}\``, inline: true},
                    {name:'Joined Discord:' , value:`\`${date2}\``, inline: true},
                    {name: '\u200B', value: '\u200B', inline: true },
                    {name:'User\'s Roles:' , value:`This user has no roles!`, inline: false},         

                )
                .setTimestamp()   
                .setFooter('sentrybot.info', `${client.user.displayAvatarURL()}`);
                interaction.reply({embeds: [catchEmbed]})
            }

        }
        if(interaction.options.getSubcommand() === 'server') {
            let serverRoles = interaction.guild.roles.cache
                    .filter((roles) => roles.id !== interaction.guild.id)
                    .map((role) => role.toString());

            let date3 = interaction.guild.createdAt.toDateString();

            const serverInfoEmbed = new MessageEmbed()
                .setTitle(`${interaction.guild.name} Information`)
                .setThumbnail(interaction.guild.icon)
                .setFields(
                    {name:'Owner:‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎', value: `<@!${interaction.guild.ownerId}>`, inline: true},
                    {name:'Server ID:' , value:`\`${interaction.guild.id}\``, inline: true},
                    {name: '\u200B', value: '\u200B', inline: true },
                    {name:'Server Name:‏‏‎' , value:`\`${interaction.guild.name}\``, inline: true},
                    {name:'Server Created:‏‏‎' , value:`\`${date3}\``, inline: true},
                    {name: '\u200B', value: '\u200B', inline: true },
                    {name:'Total Member\'s:' , value:`\`${interaction.guild.memberCount}\``, inline: true},
                    {name:'Server\'s Roles:' , value:`${serverRoles}`, inline: false},         

                )
                .setTimestamp()
                .setFooter('sentrybot.info', `${client.user.displayAvatarURL()}`);

                interaction.reply({embeds: [serverInfoEmbed]})
        }

        if(interaction.options.getSubcommand() === 'bot') {
            const botInfoEmbed = new MessageEmbed()
            .setTitle(`${client.user.username}\'s Information`)
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`**Bot Name:** \`${client.user.tag}\`\n**Bot ID:** \`${client.user.id}\`\n**Total Server\'s:** \`${client.guilds.cache.size}\`\n**Total User\'s:** \`${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}\`\n**Website:** http://sentrybot.info/\n**Support:** https://discord.sentrybot.info/`)
            .setTimestamp()
            .setFooter('sentrybot.info', `${client.user.displayAvatarURL()}`);

            interaction.reply({embeds: [botInfoEmbed]})
        }

	},
};