module.exports=(async (message) => {
	if(!message) return new Error ("missing message parameter");
	await require(`../../BaseCommand.js`)(message);
	if (config.developers.indexOf(message.author.id) === -1) {
		return message.reply("You cannot run this command as you are not a bot owner.");
	}
	
	try {
	var exec = args.join(" ");
	var res = await eval(exec);
	}catch(err){
		return message.reply(`Error evaluating: ${err}`);
	}
	if(res === "") {
		var res = "finished with no return";
	} else {
		try {
			var j=JSON.stringify(res);
			var res = "```json\n"+j+"```";
		}catch(e){
			var res = res;
		}
	}
	var data = {
		title: "Evaluated",
		author: {
			name: message.author.tag,
			icon_url: message.author.displayAvatarURL
		},
		color: 3322313,
		fields: [
			{
				name: ":inbox_tray:  Input",
				value: exec,
				inline: false
			}, {
				name: ":outbox_tray:  Output",
				value: res,
				inline: false
			}
		]
	};
	var embed = new Discord.MessageEmbed(data);
	message.channel.send(embed).catch(err => {
		console.log(err);
		message.author.send(`I could not return the result: ${err}`).catch(noerr=>null);
	});
});