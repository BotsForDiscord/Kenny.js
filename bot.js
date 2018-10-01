/****************************
 * Made by Donovan_DMC#1337 *
 *****************************/
global.Discord = require("discord.js");
global.client = new Discord.Client();
global.util = require("util");
global.config = require("./config.js");
global.logger = require("./utility/logger.js");
global.r = require("./db.js");
global.PrettyTable = require("prettytable");
global.os = require("os");
global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

global.constructModLog = ((author,member,act,reason)=>{
	if(!author) throw new Error("missing author");
	if(!member) throw new Error("missing member");
	if(!act) throw new Error("missing action");
	if(!reason) reason = "None Specified";
	var blame=author instanceof Discord.GuildMember?author.user:author instanceof Discord.User?author:author;
	var target=member instanceof Discord.GuildMember?member.user:member instanceof Discord.User?member:member;
	var targetIsBot=member instanceof Discord.GuildMember?member.user.bot:member instanceof Discord.User?member.bot:false;
	if(target === null|| targetIsBot === null) throw new Error("member must be GuildMember or User");
	switch(act) {
		case "kick":
			var color = 16433420;
			var action=targetIsBot?"Bot Kicked":"Member Kicked";
			break;
			
		case "ban":
			var color = 14495300;
			var action=targetIsBot?"Bot Banned":"Member Banned";
			break;
			
		case "unban":
			var color = 12616706;
			var action=targetIsBot?"Bot Unbanned":"Member Unbanned";
			break;
			
		case "mute":
			var color = 0;
			var action=targetIsBot?"Bot Muted":"Member Muted";
			break;
			
		case "unmute":
			var color = 581126;
			var action=targetIsBot?"Bot Unmuted":"Member Unmuted";
			break;
	}
	var t=act=="unban"?`${target} (<@!${target}>)`:`${target.tag} (<@!${target.id}>)`;
	var data = {
		title: action,
		timestamp: new Date().toISOString(),
		color: color,
		fields: [
			{
				name: targetIsBot?"Bot":"Member",
				value: t,
				inline: false
			},
			{
				name: "Blame",
				value: `${blame.tag} (<@!${blame.id}>)`,
				inline: false
			},
			{
				name: "Reason",
				value: reason,
				inline: false
			}
		]
	};
	var embed = new Discord.RichEmbed(data);
	
	return embed;
});

global.reloadCommandModules=(()=>{
	for(var key in require.cache){
		if(key.indexOf("\\node_modules") == -1){
			delete require.cache[key];
		}
	}
	return true;
});
global.reloadModules=(()=>{
	for(var key in require.cache){
		if(key.indexOf("\\node_modules") != -1){
			delete require.cache[key];
		}
	}
	return true;
});
global.reloadAll=(()=>{
	for(var key in require.cache){
		if(key.indexOf("\\node_modules") != -1){
			delete require.cache[key];
		}
	}
	return true;
});

client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  	try {
		  var botCount=client.guilds.get("374071874222686211").members.filter(t=>t.user.bot).size;
		  client.user.setActivity(`${botCount} Bots in BFD`,{type:"WATCHING"});
	  }catch(e){
		  client.user.setActivity(`Bots For Discord`,{type:"WATCHING"});
	  }
});

client.on("guildCreate", async (guild) => {
	console.log(`Joined ${guild.name} (${guild.id}), member count: ${guild.memberCount}, owner : ${guild.owner.user.tag} (${guild.ownerID})`);
	if(!config.allowedGuilds.includes(guild.id)) {
		console.log(`Leaving disallowed guild ${guild.name} (${guild.id})`);
		await guild.owner.user.send(`This bot is not allowed to be in this guild (${guild.name})!\nIt will now leave.`).catch(noerr=>null);
		guild.leave();
	}
});

client.on("guildDelete", async (guild) => {
	console.log(`Left ${guild.name} (${guild.id}),member count: ${guild.memberCount}, owner : ${guild.owner.user.tag} (${guild.ownerID})`);
});

client.on("guildMemberAdd", async(member) => {
	try {
		  var botCount=client.guilds.get("374071874222686211").members.filter(t=>t.user.bot).size;
		  client.user.setActivity(`${botCount} Bots in BFD`,{type:"WATCHING"});
	  }catch(e){
		  client.user.setActivity(`Bots For Discord`,{type:"WATCHING"});
	  }
	if(!member.user.bot) return;
  switch(member.guild.id) {
	  // staff
	case "374074135506190349":
		member.addRole(config.roles.staffServerBot,"Bot autorole");
		break;
	
	// regular
	case "374071874222686211":
		member.addRole(config.roles.bot,"Bot autorole");
		break;
  }
			
});

client.on("guildMemberRemove", async(member) => {
	  try {
		  var botCount=client.guilds.get("374071874222686211").members.filter(t=>t.user.bot).size;
		  client.user.setActivity(`${botCount} Bots in BFD`,{type:"WATCHING"});
	  }catch(e){
		  client.user.setActivity(`Bots For Discord`,{type:"WATCHING"});
	  }
});

/*client.on("guildMemberUpdate", async(oldMember,newMember) => {
	if(!oldMember || !newMember) return;
	var oldRoles = oldMember.roles.map(t=>t.id);
	var newRoles = newMember.roles.map(t=>t.id);
	if(JSON.stringify(oldRoles) !== JSON.stringify(newRoles)) {
		var l = await newMember.guild.fetchAuditLogs({type:"MEMBER_ROLE_UPDATE",limit:1});
		var log = l.entries.first();
		var lg = log.changes[0].new[0];
		try {
			var blame = newMember.guild.members.get(log.executor.id);
		}catch(e) {
			var blame = "Unknown";
		}
		
		try {
			var reason = typeof global.reason[newMember.id] !== "undefined"?global.reason[newMember.id]:log.reason !== ""?log.reason:"Not Specified";
		}catch(e){
			var reason = "Unknown";
		}
		if(newMember.bot && lg.id === config.roles.mutedBot) {
			switch(log.key) {
				case "$add":
					var modlog = newMember.guild.channels.find(t=>t.name=="mod-log");
					if(modlog !== null) {
						var e=constructModLog(blame,newMember,"mute",reason);
						if(!e instanceof Discord.RichEmbed) throw new Error("Function did not return RichEmbed");
					}
					break;
					
				case "$remove":
					var modlog = newMember.guild.channels.find(t=>t.name=="mod-log");
					if(modlog !== null) {
						var e=constructModLog(blame,newMember,"unmute",reason);
						if(!e instanceof Discord.RichEmbed) throw new Error("Function did not return RichEmbed");
					}
					break;
			}
		} else {
			
		}
	}
});*/

client.on("message", async (message)=> {
    if ((!message || !message.guild) || (!config.allowedGuilds.includes(message.guild.id) || message.author.bot || message.content.indexOf(config.prefix) === -1)) return;
    var args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    var command = args.shift().toLowerCase();
	var staff = message.member.roles.some(t=>config.staffRoles.includes(t.name)) || message.member.hasPermission("ADMINISTRATOR");
	
	if(!config.commandList.all.list.includes(command)) return;
	
	var cmd = config.commandList.all[command];
	var category = cmd.category;

	if(cmd.permissions.length !== 0) {
		cmd.permissions.forEach((perm)=>{
			if(!message.member.hasPermission(perm)) return message.reply(`You are missing the required **${perm}** permission to use this!`);
		});
	}
	
	if(cmd.roles.length !== 0) {
		if(!message.member.roles.some(t=>[cmd.roles].includes(t.id))) {
			var tr = [];
			cmd.roles.forEach((role)=>{
				try{
					tr.push(message.guild.roles.get(role).name);
				}catch(e){}
			});
			return message.reply(`You do not have any of the required roles **${tr.join("**, **")}** (must have AT LEAST ONE in this list)`);
		}
	}
	try{
		console.commandlog(`[Guild ${message.guild.name} (${message.guild.id})]: Command "${command}" ran by user ${message.author.tag} (${message.author.id}) in channel #${message.channel.name} (${message.channel.id})`);
		if(!cmd.alias) {
			require(`./commands/${category}/${command}-cmd.js`)(message);
		} else {
			require(`./commands/${category}/${cmd.aliasof}-cmd.js`)(message);
		}
	}catch(e) {
		message.reply(`Error while running this command: ${e}`);
		return console.error(e);
	}
});

client.login(config.token);