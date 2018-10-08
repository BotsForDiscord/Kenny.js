module.exports=(async (message) => {
	if(!message) return new Error ("missing message parameter");
	await require(`../../BaseCommand.js`)(message);
	
	if(args.length == 0) {
		var cmd = config.commandList.all[command];
		console.log(cmd);
		var data = {
			title: `:x: Invalid command usage | ${command}`,
			description: cmd.description,
			fields: [
				{
					name: "Usage",
					value: cmd.usage,
					inline: false
				},
				{
					name: "Permissions",
					value: (()=>{if(cmd.permissions.length == 0) {return "none";}else{return "**"+cmd.permissions.join("**, **")+"**";}})(),
					inline: false
				},
				{
					name: "Roles",
					value: (()=>{if(cmd.roles.length == 0) {return "none";}else{return "Atleast one of **"+cmd.roles.join("**, **")+"**";}})(),
					inline: false
				},
				{
					name: "Developer Only",
					value: cmd.dev,
					inline: false
				}
			]
		};
		var embed = new Discord.MessageEmbed(data);
		return message.channel.send(embed);
	}
	
	// member mention
	if(message.mentions.members.first()) {
		var member=message.mentions.members.first();
	}
	
	// user ID
	if(!isNaN(args[0]) && !(args.length == 0 || !args || message.mentions.members.first())) {
		var member=args[0];
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
	
	var bot = member.id||member;
	
	var xhr = new XMLHttpRequest();

	xhr.addEventListener("readystatechange", function () {
		if (this.readyState === 4) {
			switch(this.status) {
				case 200:
					var response = JSON.parse(this.responseText);
					if(staff) {
						var inv = `[Regular](${response.invite})\n[Main Server](https://discordapp.com/oauth2/authorize?client_id=${response.id}&scope=bot&guild_id=374071874222686211)\n[Staff Server](https://discordapp.com/oauth2/authorize?client_id=${response.id}&scope=bot&guild_id=374074135506190349)\n[General No Perms](https://discordapp.com/oauth2/authorize?client_id=${response.id}&scope=bot)`;
					} else {
						var inv = `[Regular](${response.invite})`;
					}
					var data = {
						author: {
							name: response.name,
							icon_url: `https://cdn.discordapp.com/avatars/${response.id}/${response.avatar}.png`
						},
						title: "Bot Info",
						fields: [
						]
					};
					data.fields.push({
						name: "Name",
						value: response.name,
						inline: true
					});
					data.fields.push({
						name: "ID",
						value: response.id,
						inline: true
					});
					data.fields.push({
						name: "Approved",
						value: response.approved,
						inline: true
					});
					data.fields.push({
						name: "Verified",
						value: response.verified,
						inline: true
					});
					if(typeof response.server_count !== "undefined" && response.server_count !== "") data.fields.push({
						name: "Server Count",
						value: response.server_count,
						inline: true
					});
					data.fields.push({
						name: "Prefix",
						value: response.prefix,
						inline: true
					});
					if(typeof response.library !== "undefined" && response.library !== "") data.fields.push({
						name: "Library",
						value: response.library,
						inline: true
					});
					data.fields.push({
						name: "Invites",
						value: inv,
						inline: true
					});
					var links = typeof response.github !== "undefined" && response.github !== ""?`[Github](${response.github})\n[List](https://botsfordiscord.com/bots/${response.id})`:`[List](https://botsfordiscord.com/bots/${response.id})`;
					data.fields.push({
						name: "Links",
						value: links,
						inline: false
					});
					data.fields.push({
						name: "Description",
						value: response.short_desc,
						inline: false
					});
					if(typeof response.owners !== "undefined" && response.owners.length !== 0) {
						var ot = "Owners";
						var ob = `Main: <@!${response.owner}>`;
						response.owners.forEach((owner)=>{
							ob = `${ob}\nSecondary:  <@!${owner}>`;
						});
					} else {
						var ot = "Owner";
						var ob = `<@!${response.owner}>`;
					}
					data.fields.push({
						name: ot,
						value: ob,
						inline: true
					});
					var embed = new Discord.MessageEmbed(data);
					message.channel.send(embed);
					break;
				
				default:
					message.reply("Bot not found.");
			}
		}
	});

	xhr.open("GET", `https://botsfordiscord.com/api/bot/${bot}`);

	xhr.send();
});