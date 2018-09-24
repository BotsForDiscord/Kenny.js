const fs = require("fs");
const token = fs.readFileSync("./token.txt","UTF8");
const path = require("path");
const os = require("os");

config = {
	get rootDir() {
		return path.dirname(require.main.filename);
	},
	get beta() {return os.hostname() === "FURRYBOT-SERVER"?false:true;},
	customPrefix: false,
	get prefix() {
		return this.customPrefix?this.customPrefix:this.beta?"&":"$";
	},
	roles: {
		bot: "374075473669521408",
		verifiedBot: "374083302237274113",
		get muted() {return this.beta?"488467613798891522":"379424100801576960"},
		get mutedBot() {return this.beta?"488467671805984778":"491333600684277760"},
		get trialModerator() {return this.beta?"493890812791488523":"411965769316958209"},
		get moderator() {return this.beta?"493890737226776577":"475404548136239115"},
		hideNSFW: "407290932644544523",
		developer: "374082321441226752",
		verifiedDeveloper: "374083705347637249"
	},
	allowedGuilds: [
		// MCPro Private Bot Testing
		"329498711338123268",
		
		// Bots For Discord
		"374071874222686211",
		
		// Bots For Discord Staff
		"374074135506190349",
		
		// BFD Bot Testing Center
		"493793746358501396",
	],
	modLogs: "491324642166964227",
	developers: [
		//Habchy#1665
		"162780049869635584",
		
		// Donovan_DMC#1337
		"242843345402069002",
		
		// jacob#0513
		"310081310335172608"
	],
	commandList: {
		get all() {
			var list=[];
			var inf={};
			for(var key in config.commandList.categories){
				for(var ke in config.commandList.categories[key]) {
					var cmd=config.commandList.categories[key][ke];
					Object.assign(inf,{[ke]:Object.assign(cmd,{category:key})});
					list.push(ke);
					if(cmd.aliases.length !== 0) {
						cmd.aliases.forEach((alias)=>{
							var g = Object.assign({},Object.assign(cmd,{category:key}));
							delete g.aliases;
							Object.assign(g,{alias: true, category: key, aliasof: ke});
							Object.assign(inf,{[alias]:g});
							list.push(alias);
						});
					} else {
						inf[ke].alias=false;
					}
				}
			}
			return Object.assign(Object.assign({},inf),{list});
		},
		categories: {
			dev: {
				eval: {
					name: ":keyboard: Evaluate",
					description: "Evaluate some code",
					get usage() {return `${config.prefix}eval <code>`;},
					permissions: [],
					roles: [],
					dev: true,
					aliases: [
						"exec",
						"e"
					]
				},
				reload: {
					name: "Reload",
					description: "Reload sections or all of the bot",
					get usage() {return `${config.prefix}reload <rtype>`;},
					permissions: [],
					roles: [],
					dev: true,
					aliases: [
					]
				}
					
			},
			general: {
				help: {
					name: "<:bfdhelp:395046793219407874> **Help**",
					description: "Lists the commands you can use",
					get usage() {return `${config.prefix}help [category]`;},
					permissions: [],
					roles: [],
					dev: false,
					aliases: [
						"h",
						"?"
					]
				},
				id: {
					name: ":id: **ID**",
					description: "Get a user/bots ID",
					get usage() {return `${config.prefix}id [mention, username, or tag]`;},
					permissions: [],
					roles: [],
					dev: false,
					aliases: [
						"userid"
					]
				},
				nsfw: {
					name: ":underage: **NSFW**",
					description: "Hide or show NSFW channels.",
					get usage() {return `${config.prefix}nsfw`;},
					permissions: [],
					roles: [],
					dev: false,
					aliases: [

					]
				},
				get : {
					name: "**Get Bot**",
					description: "get a bot in the server's stats",
					get usage() {return `${config.prefix}get <bot mention, username, or ID>`;},
					permissions: [],
					roles: [],
					dev: false,
					aliases: [

					]
				},
				amistaff : {
					name: "**Am I Staff?**",
					description: "determine if you are staff or not.",
					get usage() {return `${config.prefix}amistaff`;},
					permissions: [],
					roles: [],
					dev: false,
					aliases: [

					]
				}
			},
			mod: {
				reason: {
					name: ":pencil: **Reason**",
					description: "Change the reason for a mod log.",
					get usage() {return `${config.prefix}reason <message/case id> <new reason>`;},
					permissions: [],
					roles: [],
					dev: false,
					aliases: [

					]
				},
				grabcase: {
					name: ":briefcase: **GrabCase**",
					get description(){ return `Display a case from <#${config.modLogs}>`;},
					get usage() {return `${config.prefix}grabcase <message/case id>`;},
					permissions: [],
					roles: [],
					dev: false,
					aliases: [
						"modlog"
					]
				},
				say: {
					name: ":loudspeaker: **Say**",
					description: "Make the bot say a message.",
					get usage() {return `${config.prefix}say <message>`;},
					permissions: ["MANAGE_MESSAGES"],
					roles: [],
					dev: false,
					aliases: [

					]
				},
				kick: {
					name: ":boot: **Kick**",
					description: "Kick a person or bot.",
					get usage() {return `${config.prefix}kick <mention, username, or id> [reason]`;},
					permissions: ["KICK_MEMBERS"],
					roles: [],
					dev: false,
					aliases: [
						"k"
					]
				},
				ban: {
					name: ":hammer: **Ban**",
					description: "Ban a person or bot.",
					get usage() {return `${config.prefix}ban <mention, username, or id> [reason]`;},
					permissions: ["BAN_MEMBERS"],
					roles: [],
					dev: false,
					aliases: [
						"b"
					]
				},
				unban: {
					name: ":scales: **Unban**",
					description: "Remove a ban from a person or a bot.",
					get usage() {return `${config.prefix}unban <id> [reason]`;},
					permissions: ["BAN_MEMBERS"],
					roles: [],
					dev: false,
					aliases: [
						"ub"
					]
				},
				mute: {
					name: ":mute: **Mute**",
					description: "Mute a person or bot.",
					get usage() {return `${config.prefix}mute <mention, username, or id> [reason]`;},
					permissions: ["MANAGE_MESSAGES"],
					roles: [],
					dev: false,
					aliases: [
						"m"
					]
				},
				unmute: {
					name: ":loud_sound: **Unmute**",
					description: "Unmute a person or a bot.",
					get usage() {return `${config.prefix}unmute <mention, username, or id> [reason]`;},
					permissions: ["MANAGE_MESSAGES"],
					roles: [],
					dev: false,
					aliases: [
						"um"
					]
				},
				purge: {
					name: ":scissors: **Prune/Purge**",
					description: "Delete X amount of messages from a channel.",
					get usage() {return `${config.prefix}purge [2-100]`;},
					permissions: ["MANAGE_MESSAGES"],
					roles: [],
					dev: false,
					aliases: [
						"prune",
						"p"
					]
				}
			},
		},
		categoryInfo: {
			dev: {
				name: "Developer",
				emoji: "<:bfdwebsitebot:416375786971463690>",
				dev: true
			},
			general: {
				name: "General",
				emoji: "<:bfdhelp:395046793219407874>",
				dev: false
			},
			mod: {
				name: "Moderator",
				emoji: "<:bfdmoderator:374215795619659776>",
				dev: false
			}
		}
	},
	token
};

module.exports=config;
