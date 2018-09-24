module.exports=(async (message) => {
	if(!message) return new Error ("missing message parameter");
	await require(`../../BaseCommand.js`)(message);
	if(args.length == 0 || !args) {
		var user=message.member;
	}
	// member mention
	if(message.mentions.members.first()) {
		var user=message.mentions.members.first();
	}
	
	// user ID
	if(!isNaN(args.join(" ")) && !(args.length == 0 || !args || message.mentions.members.first())) {
		var user=message.guild.members.get(args.join(" "));
	}
	
	// username
	if(isNaN(args.join(" ")) && args.join(" ").indexOf("#") == -1 && !(args.length == 0 || !args || message.mentions.members.first())) {
		var usr=client.users.find(t=>t.username==args.join(" "));
		if(usr instanceof Discord.User) var user=message.guild.members.get(usr.id);
	}
	
	// user tag
	if(isNaN(args.join(" ")) && args.join(" ").indexOf("#") !== -1 && !message.mentions.members.first()) {
		var usr=client.users.find(t=>t.tag==args.join(" "));
		if(usr instanceof Discord.User) var user=message.guild.members.get(usr.id);
	}
	
	if(!user) return message.reply("Please either provide a user ID, FULL USERNAME, FULL USERNAME AND TAG, or nothing.");
	
	var tag=user.user.tag;
	message.reply(`ID of ${tag} is:`);
	return message.channel.send(user.id);
});