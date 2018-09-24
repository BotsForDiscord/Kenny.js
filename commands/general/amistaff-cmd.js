module.exports=(async (message) => {
	if(!message) return new Error ("missing message parameter");
	await require(`../../BaseCommand.js`)(message);
	
	var pt = new PrettyTable();
	
	var isStaff = staff;
	var canUseReason = isStaff?":white_check_mark:":":x:";
	var canUseModlog = isStaff?":white_check_mark:":":x:";
	var canUseSay = isStaff?":white_check_mark:":":x:";
	var canKick = message.member.hasPermission("KICK_MEMBERS")?":white_check_mark:":":x:";
	var canBan = message.member.hasPermission("BAN_MEMBERS")?":white_check_mark:":":x:";
	var canMute = message.member.hasPermission("MANAGE_MESSAGES")?":white_check_mark:":":x:";
	var canPurge = message.member.hasPermission("MANAGE_MESSAGES")?":white_check_mark:":":x:";
	var isAdmin = message.member.hasPermission("ADMINISTRATOR")?":white_check_mark:":":x:";
	var isDev = config.developers.includes(message.author.id)?":white_check_mark:":":x:";
	
	var m = `You are ${isStaff?"":"Not"} a staff member.
	Permissions:\n
	Edit Mod Logs ${canUseReason}
	Grab Cases ${canUseModlog}
	Use "Say" Command ${canUseSay}
	Kick ${canKick}
	Ban ${canBan}
	Mute ${canMute}
	Purge: ${canPurge}
	Admin: ${isAdmin}
	Developer: ${isDev}`;
	return message.reply(m);
});