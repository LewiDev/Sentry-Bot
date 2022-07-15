const log = require('../mongoEvents/logsSchema.js')

module.exports = {
	name: 'guildDelete',
	async execute(guild, client) {
		let string = guild.id.toString()

        log.deleteMany({guildId: string}, (err, res) => {
            if(err) console.log(err)
            console.log(`I was kicked from ${guild.name} = all data`)
        });
	},
};