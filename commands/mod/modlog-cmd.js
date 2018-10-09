module.exports=(async (message) => {
	if(!message) return new Error ("missing message parameter");
	await require(`../../BaseCommand.js`)(message);
	if(!staff) return message.reply(`Sorry, but you must be staff to use this!`);
	
	var user = args[0];
	var type = args[1];
	var reason= [...args]
	reason.splice(0,2);
	
	var mdl = constructModLog(message.member,user,type,reason.join(" "));
	
	var modlog=message.guild.channels.find(t=>t.name=="mod-log");
	if(modlog !== null) {
		if(!mdl instanceof Discord.MessageEmbed) throw new Error("Function did not return MessageEmbed");
		var m=await modlog.send(mdl).then(()=>{
			message.reply(`Done. Check ${modlog}.`);
		});;
		m.edit(new Discord.MessageEmbed(m.embeds[0]).setFooter(`Case ID: ${m.id}`));
	} else {
		message.reply("This server seems to have no mod log, so I'll send it here.");
		var m=await message.channel.send(mdl)
		m.edit(new Discord.MessageEmbed(m.embeds[0]).setFooter(`Case ID: ${m.id}`));
	}
});