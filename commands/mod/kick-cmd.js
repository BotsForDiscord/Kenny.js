module.exports=(async (message, gConfig) => {
	if(!message) return new Error ("missing message parameter");
	await require(`../../BaseCommand.js`)(message);
	if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Sorry, you must have the `KICK_MEMBERS` permission to use this.");
			
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
	
	if(!member.kickable) return message.reply(`Sorry, I cannot ${command} ${member.user.tag}. Do they have higher roles than me? Do I have ${command} permission?`);
	
	if(member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.member.id !== message.guild.ownerID) return message.reply(`Sorry, you cannot ${command} ${member.user.tag} because their highest role is the same as, or higher than yours.`);
	var reason = args.slice(1).join(' ');
	if(!reason) reason = "No reason provided";
	
	var modlog=message.guild.channels.find(t=>t.name=="mod-log");
	if(modlog !== null) {
		var e=constructModLog(message.author,member,command,reason);
		if(!e instanceof Discord.RichEmbed) throw new Error("Function did not return RichEmbed");
	}
	
	await member.user.send(`You were kicked from **${message.guild.name}** (${message.guild.id} by **${message.author.tag}** (${message.author.id})\nReason: ${reason}`).catch(noerr=>null);
	await member.kick(`Command "${command}": ${message.author.tag} -> ${reason}`)
	.then(async()=>{
		if(modlog !== null) {
			var m=await modlog.send(e);
			m.edit(new Discord.RichEmbed(m.embeds[0]).setFooter(`Case ID: ${m.id}`));
		}
	}).then(async()=>{
		message.reply(`Done. Check <#${config.modLogs}>.`);
	})
	.catch(e=>{
		message.channel.send(`Sorry, ${message.member}. I couldn't ${command} ${member.user.tag} because of: ${e}`);
	});
});