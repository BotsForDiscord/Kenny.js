/****************************
 * Made by Donovan_DMC#1337 *
 *****************************/

const Discord = require("discord.js");
const config = require("./config");
const logger = require("./utility/logger.js");
//const handlers = require("./handlers");

class Kenny extends Discord.Client {
	constructor(options) {
		var opt = options || {};
		super(opt);
		global.util = require("util");
		this.config = config;
		this.r = require("./db.js");
		this.PrettyTable = require("prettytable");
		this.os = require("os");
		this.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
		this.fs = require("fs");
		/*Object.assign(this,handlers);
		for(let key in this.events) {
			this.on(key, ()=>{this.events[key](this)});
		}*/
		this.load.apply(this);
	}
	
	function load() {
		this.fs.readdir(`${process.cwd()}/handlers/events/`, (err, files) => {
		    if (err) return console.error(err);
		    files.forEach(file => {
				if (!file.endsWith(".js")) return;
				const event = require(`./handlers/events/${file}`);
				let eventName = file.split(".")[0];

				this.on(eventName, event.bind(this));
				delete require.cache[require.resolve(`./handlers/events/${file}`)];
		    });
		});
	}
}
