const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('Show server information'),
    async execute(interation){
        await interation.reply(`You are in ${interation.guild.name} and there are ${interation.guild.memberCount} members :person_standing:`)
    }
}