module.exports=(async (message) => {
	if(!message) return new Error ("missing message parameter");
	await require(`../../BaseCommand.js`)(message);
	if(args.length == 0) {
		var m=staff?"<:bfdmoderator:374215795619659776> Moderation (mod)\n":"";
		var d=config.developers.includes(message.author.id)?":hammer: Developer (dev)\n":"";
		var data = {
			title: "Help",
			description: `Do **${config.prefix}help <category>** to get help for that category`,
			color: 3322313,
			timestamp: new Date().toISOString(),
			footer: {
				text: "Bot Made By Donovan_DMC#1337"
			},
			fields: [
				{
					name: "Categories",
					value: `${d}${m}<:bfdhelp:395046793219407874> General`,
					inline: false
				}
			]
		};
		var embed = new Discord.RichEmbed(data);
		return message.channel.send(embed);
	} else {
		if(!["mod","moderation","dev","developer","general"].includes(args[0].toLowerCase())) return message.reply("Invalid command category");
		switch(args[0].toLowerCase()) {
			case "dev":
			case "developer":
				if(!config.developers.includes(message.author.id)) return message.reply("Sorry, only developers can view these commands!");
				var data = {
					title:"<:bfdmoderator:374215795619659776> Moderation Commands",
					color: 431123,
					timestamp: new Date().toISOString(),
					footer: {
						text: "Bot Made By Donovan_DMC#1337"
					},
					fields: [
					{
						name: ":hammer: **Eval**",
						value: `Description: Evaluate some code.\nUsage: **${config.prefix}eval <code>**\nRequires hardcoded bot developer.`,
						inline: false
					}
					]
				};
				var embed = new Discord.RichEmbed(data);
				return message.channel.send(embed).catch(e=>{
					message.reply(`Failed to send help: ${e}`);
				});
				break;
				
			case "mod":
			case "moderation":
				if(!staff) return message.reply("Sorry, only staff can view these commands!");
				var data = {
					title:"<:bfdmoderator:374215795619659776> Moderation Commands",
					color: 431123,
					timestamp: new Date().toISOString(),
					footer: {
						text: "Bot Made By Donovan_DMC#1337"
					},
					fields: [
					{
						name: ":pencil:  **Reason**",
						value: `Description: Change the reason for a mod log.\nUsage: **${config.prefix}reason <message/case id> <new reason>**\nRequires **Trial Moderators**, **Moderators**, or **Staff** roles.`,
						inline: false
					},{
						name: ":briefcase: **GrabCase**",
						value: `Description: Displays a case from <#${config.modLogs}>.\nUsage: **${config.prefix}grabcase <message/case id>**\nRequires **Trial Moderators**, **Moderators**, or **Staff** roles.`,
						inline: false
					},{
						name: ":loudspeaker: **Say**",
						value: `Description: Get the bot to say a message.\nUsage: **${config.prefix}say <message>**\nRequires **Trial Moderators**, **Moderators**, or **Staff** roles.`,
						inline: false
					}
					]
				};
				if(message.member.hasPermission("KICK_MEMBERS")) {
					data.fields.push({
						name: ":boot: **Kick**",
						value: `Description: Kick a person or a bot.\nUsage: **${config.prefix}kick <mention, username, or id> [reason]**\nRequires **KICK_MEMBERS** permission.`,
						inline: false
					});
				}
				if(message.member.hasPermission("BAN_MEMBERS")) {
					data.fields.push.apply(data.fields,[{
						name: ":hammer: **Ban**",
						value: `Description: Ban a person or a bot.\nUsage: **${config.prefix}ban <mention, username, or id> [reason]**\nRequires **BAN_MEMBERS** permission.`,
						inline: false
					},{
						name: ":scales: **Unban**",
						value: `Description: Remove a ban from a person or a bot.\nUsage: **${config.prefix}unban <id> [reason]**\nRequires **BAN_MEMBERS** permission.`,
						inline: false
					}]);
				}
				if(message.member.hasPermission("MANAGE_MESSAGES")) {
					data.fields.push.apply(data.fields,[{
						name: ":mute: **Mute**",
						value: `Description: Mute a person or bot.\nUsage: **${config.prefix}mute <mention, username, or id> [reason]**\nRequires **MANAGE_MESSAGES** permission.`,
						inline: false
					},{
						name: ":loud_sound: **Unmute**",
						value: `Description: Unmute a person or a bot.\nUsage: **${config.prefix}kick <mention, username, or id> [reason]**\nRequires **MANAGE_MESSAGES**permission.`,
						inline: false
					},{
						name: ":scissors: **Prune/Purge**",
						value: `Description: Delete X amount of messages from a channel.\nUsage: **${config.prefix}prune [2-100]**\nRequires **MANAGE_MESSAGES** permission.`,
						inline: false
					}]);
				}
				/*if(message.member.hasPermissions("MANAGE_SERVER")) {
					data.fields.push.apply(data.fields,[{
						name: ":lock: **Lock Channel**",
						value: `Description: Disable sending messages in a channel.\nUsage: **${config.prefix}lock [#channel, channel name, or channel id]\nRequires **MANAGE_SERVER** permission.**`,
						inline: false
					},{
						name: ":unlock: **Unlock Channel**",
						value: `Description: Reenables sending messages in a channel after lock.\nUsage: **${config.prefix}unlock [#channel, channel name, or channel id]**\nRequires **MANAGE_SERVER** permission.`,
						inline: false
					}]);
				}*/
				var embed = new Discord.RichEmbed(data);
				return message.channel.send(embed).catch(e=>{
					message.reply(`Failed to send help: ${e}`);
				});
				break;
				
			case "general":
				var data = {
					title:"<:bfdhelp:395046793219407874> General Commands",
					color: 431123,
					timestamp: new Date().toISOString(),
					footer: {
						text: "Bot Made By Donovan_DMC#1337"
					},
					fields: [
					{
						name: ":id: **ID**",
						value: `Description: Get a users ID.\nUsage: **${config.prefix}id [mention, username, or id]**`,
						inline: false
					},{
						name: ":underage:  **NSFW**",
						value: `Description: Hide or show NSFW channels.\nUsage: **${config.prefix}nsfw**`,
						inline: false
					}
					]
				};
				var embed = new Discord.RichEmbed(data);
				return message.channel.send(embed).catch(e=>{
					message.reply(`Failed to send help: ${e}`);
				});
				break;
		}
	}
});