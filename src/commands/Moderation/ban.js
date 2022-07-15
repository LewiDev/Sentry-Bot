const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const { GuildMember } = require('discord.js');
const ms = require('ms')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a member of choice!')
        .addSubcommand(subcommand =>
            subcommand
            .setName('temp')
            .setDescription('Bans a user for a set amount of days!')
            .addMentionableOption(option => option.setName('member').setDescription('The Member You Want To Ban!').setRequired(true))
            .addStringOption(option => option.setName('reason').setDescription('The Reason You Want To Ban This Member?').setRequired(true))
            .addStringOption(option => option.setName('length').setDescription('the length of time you want to ban this member for, e.g. 1d, 1 week, 1 year').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
            .setName('perm')
            .setDescription('Bans a user permanently!')
            .addMentionableOption(option => option.setName('member').setDescription('The Member You Want To Ban!').setRequired(true))
            .addStringOption(option => option.setName('reason').setDescription('The Reason You Want To Ban This Member?').setRequired(true))),
    async execute(interaction, client) {
        const member = interaction.options.getMentionable('member');
        const reason = interaction.options.getString('reason');


        const banMessage = `${interaction.member}, Successfully banned ${member}!`;
        const noPerms = `${interaction.member} you do not have the required permission to use the command: ${interaction.name}!`;
        const notBannableByUser = `${interaction.member} you cannot ban this member!`;


        if (!(member instanceof GuildMember)) return interaction.reply({content: `${interaction.member}, The argument provided was not a member!`, ephemeral:true});
        if (!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.reply({content: noPerms, ephemeral:true});
        if (member.managable) return interaction.reply({content: notBannableByUser, ephemeral:true});

        if(interaction.options.getSubcommand() === 'temp') {
            const length = interaction.options.getString('length');
            const notValidLength = `${interaction.member}, ${length} is not a valid length of time!`;
            try {
                await member.send({content: `${member}\nYou have been temporarily banned from ${interaction.guild}\n**Reason:** ${reason}\n**Length:** ${length}`});
            } catch (err) {}
            let msTime = ''
            try{
                msTime = ms(length);
            } catch (err) {
                console.log(err)
                return interaction.reply({content: notValidLength, ephemeral: true })
            }
            member.ban({ reason })
            interaction.reply({content:banMessage, ephemeral:true})
            console.log(msTime)
    
            setTimeout(() => {
                	interaction.guild.members.unban(member.id)	
            }, msTime)
    

        }
        if(interaction.options.getSubcommand() === 'perm') {
            try {
                await member.send({content: `${member}\nYou have been banned from ${interaction.guild}\n**Reason:** ${reason}`});
            } catch (err) {
                member.ban({ reason })
            }
            member.ban({ reason })
            interaction.reply({content:banMessage, ephemeral:true})

        }



    },
};