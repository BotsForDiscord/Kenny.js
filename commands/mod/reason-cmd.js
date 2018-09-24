module.exports=(async (message) => {
	if(!message) return new Error ("missing message parameter");
	await require(`../../BaseCommand.js`)(message);
	if(!staff) return message.reply(`Sorry, but you must be staff to use this!`);
	
	var log=args[0];
	if(!log) return message.reply(`Please list a valid case number from <#${config.modLogs}>`);
	
	var ch=message.guild.channels.get(config.modLogs);
	var m=await ch.fetchMessage(log);
	if(!m) return message.reply(`Please list a valid case number from <#${config.modLogs}>`);
	
	var reason = args.slice(1).join(' ');
	if(!reason) return message.reply("You must provide a new reason!");
	
	var c=m.embeds[0];
	if(!c) return message.reply(`Please list a valid case number from <#${config.modLogs}>`);
	var data=Object.assign({},c);
	if(data.fields[2].value === reason) return message.reply("Reason did not change.");
	data.fields[2].value = reason;
	var embed=new Discord.RichEmbed(data);
	m.edit(embed).then(()=>{
		message.reply("Done.");
	}).catch(e=>{
		message.reply(`I couldn't edit entry **${log}** because: ${e}`);
	});
});