module.exports=(async (message) => {
	if(!message) return new Error ("missing message parameter");
	await require(`../../BaseCommand.js`)(message);
	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry, you must have the `MANAGE_MESSAGES` permission to use this.");
	var deleteCount = args[0];
	if(!deleteCount || deleteCount < 2 || deleteCount > 100) return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
	
	var fetched = await message.channel.fetchMessages({limit: deleteCount});
	message.channel.bulkDelete(fetched).catch(e => message.reply(`I couldn't ${command} messages because of: ${error}`));
});