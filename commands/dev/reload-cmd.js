module.exports=(async (message) => {
	if(!message) return new Error ("missing message parameter");
	await require(`../../BaseCommand.js`)(message);
	if (config.developers.indexOf(message.author.id) == -1) {
		return message.reply("You cannot run this command as you are not a bot owner.");
	}
	var ty=new RegExp(/^(((module|m)?[s]?(list|l)?[s]?)||all)$/gi);
	if(args.join("").length == 0) {
		var type="all";
	} else {
		if(!ty.test(args.join(""))) return message.reply("Invalid type");
		var type=args.join("");
	}
	switch(true) {			
		case new RegExp(/^((command|cmd|c)(module|m))[s]?$/gi).test(type):
			message.reply("Reloading command/custom modules..");
			global.reloadCommandModules();
			break;
			
		case new RegExp(/^(module|m)[s]?$/gi).test(type):
			message.reply("Reloading all modules");
			global.reloadModules();
			break;
			
		case type == "all":
			message.reply("Reloading everything..");
			global.reloadAll();
			break;
			
		default:
			return message.reply("Invalid reload type");
	}
	setTimeout(()=>{
		message.reply(`specified reloads finished`);
	}, 1e3);
});