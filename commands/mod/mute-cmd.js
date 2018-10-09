module.exports=(async (message) => {
	if(!message) return new Error ("missing message parameter");
	await require(`../../BaseCommand.js`)(message);
	//if(!message.member.hasPermission(["MANAGE_MESSAGES"])) return message.reply("Sorry, you must have the `MANAGE_MESSAGES` permission to use this.");
	
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
	
	// member mention
	if(message.mentions.members.first()) {
		var member=message.mentions.members.first();
	}
	
	// user ID
	if(!isNaN(args[0]) && !(args.length == 0 || !args || message.mentions.members.first())) {
		var member=message.guild.members.get(args[0]);
	}
	
	// username
	if(isNaN(args[0]) && args[0].indexOf("#") == -1 && !(args.length == 0 || !args || message.mentions.members.first())) {
		var usr=client.users.find(t=>t.username==args[0]);
		if(usr instanceof Discord.User) var member=message.guild.members.get(usr.id);
	}
	
	// user tag
	if(isNaN(args[0]) && args[0].indexOf("#") !== -1 && !message.mentions.members.first()) {
		var usr=client.users.find(t=>t.tag==args[0]);
		if(usr instanceof Discord.User) var member=message.guild.members.get(usr.id);
	}
	
	if(!member) return message.reply("Please either provide a user ID, FULL USERNAME, or FULL USERNAME AND TAG.");
	
	if(message.author.id == member.id) return message.reply(`You cannot ${command} yourself!`);
	
	if(member.roles.highest.calculatedPosition >= message.member.roles.highest.calculatedPosition && message.member.id !== message.guild.ownerID) return message.reply(`Sorry, you cannot ${command} ${member.user.tag} either because their highest role is the same as, or higher than yours.`);
	var reason = args.slice(1).join(' ');
	if(!reason) reason = "No reason provided";
	
	var modlog=message.guild.channels.find(t=>t.name=="mod-log");
	if(modlog !== null) {
		var e=constructModLog(message.author,member,command,reason);
		if(!e instanceof Discord.MessageEmbed) throw new Error("Function did not return MessageEmbed");
	}
	if(member.user.bot) {
		if(member.roles.has(config.roles.mutedBot)) return message.reply(`The bot ${member.user.tag} is already muted.`);
		member.addRole(config.roles.mutedBot,`Command "${command}": ${message.author.tag} -> ${reason}`).then(async()=>{
			if(modlog !== null) {
				var m=await modlog.send(e);
				m.edit(new Discord.MessageEmbed(m.embeds[0]).setFooter(`Case ID: ${m.id}`));
			}
		}).then(async()=>{
			message.reply(`Done. Check ${modlog}.`);
			// add something here to message bot devs
		})
		.catch(e=>{
			message.reply(`I couldn't ${command} ${member.user.tag} because of: ${e}`);
		});
	} else {
		if(member.roles.has(config.roles.muted)) return message.reply(`The user ${member.user.tag} is already muted.`);
		member.addRole(config.roles.muted,`Command "${command}": ${message.author.tag} -> ${reason}`).then(async()=>{
			if(modlog !== null) {
				var m=await modlog.send(e);
				m.edit(new Discord.MessageEmbed(m.embeds[0]).setFooter(`Case ID: ${m.id}`));
			}
		}).then(async()=>{
			message.reply(`Done. Check ${modlog}.`);
			await member.user.send(`You were muted in **${message.guild.name}** (${message.guild.id}) by **${message.author.tag}** (${message.author.id})\nReason: ${reason}`)
		})
		.catch(e=>{
			message.reply(`I couldn't ${command} ${member.user.tag} because of: ${e}`);
		});
	}
});