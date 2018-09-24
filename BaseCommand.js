module.exports=((message)=>{
    if(!message) throw new Error("Message parameter is required.");
    global.args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    global.command = args.shift().toLowerCase();
	global.staff = message.member.roles.some(t=>[config.roles.staff,config.roles.moderator,config.roles.trialModerator].includes(t.id)) || message.member.hasPermission("ADMINISTRATOR");
	
	global.cmd = config.commandList.all[command];
	global.category = cmd.category;
});
