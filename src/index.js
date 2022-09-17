const fs = require('node:fs')
const path = require('node:path')
const { Client, Intents, Collection } = require('discord.js');
const { token, guildId, clientId } = require('../config.json');
const { GatewayIntentBits } = require('discord-api-types/v9');
const { channel } = require('node:diagnostics_channel');

// Create a new client instance
const client = new Client(
	{ 
	partials: ['CHANNEL', 'MESSAGE', 'REACTION'],
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] 
	}
)
client.commands = new Collection()


// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
})

const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for(const file of commandFiles){
	const filePath = path.join(commandsPath, file)
	const command = require(filePath)
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
})

client.on('messageCreate', async(message) => {
	if(message.author.bot) return

	if(message.content === 'hello'){
		await message.channel.send('hello my friend')
	}
})

client.on('messageCreate', (message) => {
	if(message.author.bot) return

	if(message.content === '/deleteMessages'){
		message.channel.bulkDelete(100)
	}
})

// Login to Discord with your client's token
client.login(token);