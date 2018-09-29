module.exports=(async (message) => {
	if(!message) return new Error ("missing message parameter");
	await require(`../../BaseCommand.js`)(message);
	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry, you must have the `MANAGE_MESSAGES` permission to use this.");
	var deleteCount = args[0];
	if(!deleteCount || deleteCount < 2 || deleteCount > 100) return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
	
	var fetched = await message.channel.fetchMessages({limit: deleteCount});
	await message.delete();
	message.channel.bulkDelete(fetched).catch(e => message.reply(`I couldn't ${command} messages because of: ${error}`));
	
	var modlog = message.guild.channels.find(t=>t.name=="mod-log");
	if(!modlog) return;
	
	var data = {
		title: `Messages Purged`,
		timestamp: new Date().toISOString(),
		color: 3911642,
		fields: [
			{
				name: "Channel",
				value: `<#${message.channel.id}>`,
				inline: false
			},
			{
				name: "Blame",
				value: `${message.author.tag} (<@!${message.author.id}>)`,
				inline: false
			},
			{
				name: "Amount",
				value: deleteCount,
				inline: false
			}
		]
	};
	var embed = new Discord.RichEmbed(data);
	
	var m=await modlog.send(embed);
	return m.edit(new Discord.RichEmbed(m.embeds[0]).setFooter(`Case ID: ${m.id}`));
});