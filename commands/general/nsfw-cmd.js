module.exports=(async (message) => {
	if(!message) return new Error ("missing message parameter");
	await require(`../../BaseCommand.js`)(message);
	if(message.member.roles.has(config.roles.hideNSFW)) {
		message.member.removeRole(config.roles.hideNSFW);
		return message.reply("You can now see NSFW channels, run this command again to hide them.");
	} else {
		message.member.addRole(config.roles.hideNSFW);
		return message.reply("You can no longer see NSFW channels, run this command again to show them.");
	}
});
