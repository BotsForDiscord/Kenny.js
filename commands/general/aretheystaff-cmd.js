module.exports=(async (message) => {
	if(!message) return new Error ("missing message parameter");
	await require(`../../BaseCommand.js`)(message);
	
	// member mention
	if(message.mentions.members.first()) {
		var member=message.mentions.members.first();
	}
	
	// user ID
	if(!isNaN(args.join(" ")) && !(args.length == 0 || !args || message.mentions.members.first())) {
		var member=message.guild.members.get(args.join(" "));
	}
	
	// username
	if(isNaN(args.join(" ")) && args.join(" ").indexOf("#") == -1 && !(args.length == 0 || !args || message.mentions.members.first())) {
		var usr=client.users.find(t=>t.username==args.join(" "));
		if(usr instanceof Discord.User) var member=message.guild.members.get(usr.id);
	}
	
	// user tag
	if(isNaN(args.join(" ")) && args.join(" ").indexOf("#") !== -1 && !message.mentions.members.first()) {
		var usr=client.users.find(t=>t.tag==args.join(" "));
		if(usr instanceof Discord.User) var member=message.guild.members.get(usr.id);
	}
	
	if(!member) return message.reply("Please either provide a user ID, FULL USERNAME, FULL USERNAME AND TAG.");
	
	
	var pt = new PrettyTable();
	
	pt.fieldNames(["Permission","Yes/No"]);
	
	var isStaff = member.roles.some(t=>config.staffRoles.includes(t.id)) || member.hasPermission("ADMINISTRATOR");;
	var canUseReason = isStaff?"Yes":"No";
	var canUseModlog = isStaff?"Yes":"No";
	var canUseSay = isStaff?"Yes":"No";
	var canKick = member.hasPermission("KICK_MEMBERS")?"Yes":"No";
	var canBan = member.hasPermission("BAN_MEMBERS")?"Yes":"No";
	var canMute = member.hasPermission("MANAGE_MESSAGES")?"Yes":"No";
	var canPurge = member.hasPermission("MANAGE_MESSAGES")?"Yes":"No";
	var isAdmin = member.hasPermission("ADMINISTRATOR")?"Yes":"No";
	var isDev = config.developers.includes(member.id)?"Yes":"No";
	
	pt.addRow(['Edit Mod Logs',canUseReason]);
	pt.addRow(['Grab Cases',canUseModlog]);
	pt.addRow(['Use "say" command',canUseSay]);
	pt.addRow(['Kick',canKick]);
	pt.addRow(['Ban/Unban',canBan]);
	pt.addRow(['Mute/Unmute',canMute]);
	pt.addRow(['Purge',canPurge]);
	pt.addRow(['Admin',isAdmin]);
	pt.addRow(['Developer',isDev]);
	
	var m = `They are ${isStaff?"":"Not"} a staff member.\nHere's some permission info:`;
	message.reply(m);
	return message.channel.send(pt.toString(),{code:"css"});
});