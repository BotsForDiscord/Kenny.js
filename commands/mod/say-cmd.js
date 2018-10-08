module.exports=(async (message) => {
	if(!message) return new Error ("missing message parameter");
	await require(`../../BaseCommand.js`)(message);
	
	if(args.length == 0) {
		var cmd = config.commandList.all[command];
		console.log(cmd);
		var data = {
			title: `:x: Invalid command usage | ${command}`,
			description: cmd.description,
			fields: [
				{
					name: "Usage",
					value: cmd.usage,
					inline: false
				},
				{
					name: "Permissions",
					value: (()=>{if(cmd.permissions.length == 0) {return "none";}else{return "**"+cmd.permissions.join("**, **")+"**";}})(),
					inline: false
				},
				{
					name: "Roles",
					value: (()=>{if(cmd.roles.length == 0) {return "none";}else{return "Atleast one of **"+cmd.roles.join("**, **")+"**";}})(),
					inline: false
				},
				{
					name: "Developer Only",
					value: cmd.dev,
					inline: false
				}
			]
		};
		var embed = new Discord.MessageEmbed(data);
		return message.channel.send(embed);
	}
	
	return message.channel.send(args.join(" "));
});