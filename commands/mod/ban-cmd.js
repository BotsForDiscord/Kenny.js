module.exports = (async (message) => {
	if (!message) return new Error("missing message parameter");
	await require(`../../BaseCommand.js`)(message);
	if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Sorry, you must have the `BAN_MEMBERS` permission to use this.");
	if (!args[0] || args.length < 1) return message.reply("Please provide a user MENTION, ID, USERNAME or USERNAME W/ DISCRIMINATOR");

	let member;
	//DEFINING MEMBER
	if (message.mentions.members.first()) member = message.mentions.members.first(); //MENTION
	else if (message.guild.members.get(args[0])) member = message.guild.members.get(args[0]); //ID
	else if (message.guild.members.find(t=>t.username === args[0])) member = message.guild.members.find(t=>t.username === args[0]); //USERNAME
	else if (message.guild.members.find(t=>t.tag === args[0])) member = message.guild.members.find(t=>t.tag === args[0]) //TAG
	else return message.reply("User entered is invalid. Please provide a user MENTION, ID, USERNAME or USERNAME W/ DISCRIMINATOR"); //IF NOTHING TRIGGERED

	if (message.author.id == member.id) return message.reply(`You cannot ${command} yourself!`);

	if (!member.bannable) return message.reply(`Sorry, I cannot ${command} ${member.user.tag}. Do they have higher roles than me? Do I have ${command} permission?`);

	if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.member.id !== message.guild.ownerID) return message.reply(`Sorry, you cannot ${command} ${member.user.tag} because their highest role is the same as, or higher than yours.`);
	let reason = args.slice(1).join(' ');
	if (!reason) reason = "No reason provided";

	let modlog = message.guild.channels.find(t => t.name == "mod-log");
	if (modlog !== null) {
		var e = constructModLog(message.author, member, command, reason);
		if (!e instanceof Discord.MessageEmbed) throw new Error("Function did not return MessageEmbed");
	}
<<<<<<< HEAD
	
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
	
	if(!member.bannable) return message.reply(`Sorry, I cannot ${command} ${member.user.tag}. Do they have higher roles than me? Do I have ${command} permission?`);
	
	if(member.roles.highest.calculatedPosition >= message.member.roles.highest.calculatedPosition && message.member.id !== message.guild.ownerID) return message.reply(`Sorry, you cannot ${command} ${member.user.tag} because their highest role is the same as, or higher than yours.`);
	var reason = args.slice(1).join(' ');
	if(!reason) reason = "No reason provided";
	
	var modlog=message.guild.channels.find(t=>t.name=="mod-log");
	if(modlog !== null) {
		var e=constructModLog(message.author,member,command,reason);
		if(!e instanceof Discord.MessageEmbed) throw new Error("Function did not return MessageEmbed");
	}
	
	await member.user.send(`You were banned from **${message.guild.name}** (${message.guild.id} by **${message.author.tag}** (${message.author.id})\nReason: ${reason}`).catch(noerr=>null);
=======

	await member.user.send(`You were banned from **${message.guild.name}** (${message.guild.id} by **${message.author.tag}** (${message.author.id})\nReason: ${reason}`).catch(noerr => null);
>>>>>>> 2ee920d0eff57423d352ca491cb2cc7cd83794b2
	await member.ban(`Command "${command}": ${message.author.tag} -> ${reason}`)
		.then(async () => {
			if (modlog !== null) {
				var m = await modlog.send(e);
				m.edit(new Discord.MessageEmbed(m.embeds[0]).setFooter(`Case ID: ${m.id}`));
			}
		}).then(async () => {
			message.reply(`Done. Check ${modlog}.`);
		})
		.catch(e => {
			message.channel.send(`Sorry, ${message.member}. I couldn't ${command} ${member.user.tag} because of: ${e}`);
		});
});