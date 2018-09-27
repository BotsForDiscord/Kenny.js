module.exports=(async (message) => {
	if(!message) return new Error ("missing message parameter");
	await require(`../../BaseCommand.js`)(message);
	if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Sorry, you must have the `BAN_MEMBERS` permission to use this.");
	
	// user ID
	var user = isNaN(args[0])?false:args[0];
	
	if(!user) return message.reply("Please provide a valid user ID.");
	
	if(message.author.id == user.id) return message.reply(`You cannot ${command} yourself!`);
	
	var reason = args.slice(1).join(' ');
	if(!reason) reason = "No reason provided";
	
	var modlog=message.guild.channels.find(t=>t.name=="mod-log");
	if(modlog !== null) {
		var e=constructModLog(message.author,member,command,reason);
		if(!e instanceof Discord.RichEmbed) throw new Error("Function did not return RichEmbed");
	}
	var b = await message.guild.fetchBans();
	if(!b.has(user)) return message.reply("That user is not banned!");
	
	await message.guild.unban(user,`Command "${command}": ${message.author.tag} -> ${reason}`)
	.then(async()=>{
		if(modlog !== null) {
			var m=await modlog.send(e);
			m.edit(new Discord.RichEmbed(m.embeds[0]).setFooter(`Case ID: ${m.id}`));
		}
	}).then(async()=>{
		message.reply(`Done. Check ${modlog}.`);
	})
	.catch(e=>{
		message.channel.send(`Sorry, ${message.member}. I couldn't ${command} ${user} because of: ${e}`);
	});
});