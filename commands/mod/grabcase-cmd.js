module.exports=(async (message) => {
	if(!message) return new Error ("missing message parameter");
	await require(`../../BaseCommand.js`)(message);
	if(!staff) return message.reply(`Sorry, but you must be staff to use this!`);
	
	var log=args[0];
	if(!log) return message.reply(`Please list a valid case number from ${modlog}`);
	
	var ch=message.guild.channels.find(t=>t.name=="mod-log");
	if(ch === null) return message.reply("Server does not appear to have a mod log.");
	var m=await ch.fetchMessage(log);
	if(!m) return message.reply(`Please list a valid case number from ${modlog}`);
	
	var c=m.embeds[0];
	if(!c) return message.reply(`Please list a valid case number from ${modlog}`);
	var d=Object.assign({},c);
	var modCase = {
		action: c.title,
		user: c.fields[0].value,
		blame: c.fields[1].value,
		reason: c.fields[2].value,
		timestamp: c.timestamp
	}
	var data = {
		title: `${modCase.action} | Case ${log}`,
		color: c.color,
		timestamp: modCase.timestamp,
		footer: c.footer,
		fields: [
		
		]
	}
	Object.assign(data.fields,c.fields);
	Object.assign(data.fields,{name: "Debug", value: "```json\n"+util.inspect(modCase, {showHidden: true, depth:null})+"```", inline: false});
	var embed=new Discord.RichEmbed(data);
	message.channel.send(embed);
});