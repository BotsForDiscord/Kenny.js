module.exports = (async(self)=>{
	console.log(`Bot has started, with ${self.users.size} users, in ${self.channels.size} channels of ${self.guilds.size} guilds.`); 
  	try {
		  var botCount=client.guilds.get("374071874222686211").members.filter(t=>t.user.bot).size;
		  client.user.setActivity(`${botCount} Bots in BFD`,{type:"WATCHING"});
	  }catch(e){
		  client.user.setActivity(`Bots For Discord`,{type:"WATCHING"});
	  }
});
