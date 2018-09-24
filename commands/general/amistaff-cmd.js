module.exports=(async (message) => {
	if(!message) return new Error ("missing message parameter");
	await require(`../../BaseCommand.js`)(message);
	
	var pt = new PrettyTable();
	
	pt.fieldNames(["Permission","Yes/No"]);
	
	var isStaff = staff;
	var canUseReason = isStaff?"Yes":"No";
	var canUseModlog = isStaff?"Yes":"No";
	var canUseSay = isStaff?"Yes":"No";
	var canKick = message.member.hasPermission("KICK_MEMBERS")?"Yes":"No";
	var canBan = message.member.hasPermission("BAN_MEMBERS")?"Yes":"No";
	var canMute = message.member.hasPermission("MANAGE_MESSAGES")?"Yes":"No";
	var canPurge = message.member.hasPermission("MANAGE_MESSAGES")?"Yes":"No";
	var isAdmin = message.member.hasPermission("ADMINISTRATOR")?"Yes":"No";
	var isDev = config.developers.includes(message.author.id)?"Yes":"No";
	
	pt.addRow(['Edit Mod Logs',canUseReason]);
	pt.addRow(['Grab Cases',canUseModlog]);
	pt.addRow(['Use "say" command',canUseSay]);
	pt.addRow(['Kick',canKick]);
	pt.addRow(['Ban/Unban',canBan]);
	pt.addRow(['Mute/Unmute',canMute]);
	pt.addRow(['Purge',canPurge]);
	pt.addRow(['Admin',isAdmin]);
	pt.addRow(['Developer',isDev]);
	
	var m = `You are ${isStaff?"":"Not"} a staff member.\nHere's some permission info:`;
	message.reply(m);
	return message.channel.send(pt.toString(),{code:"css"});
});