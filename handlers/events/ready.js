module.exports = (async(self)=>{
	console.log(`Bot has started, with ${self.users.size} users, in ${self.channels.size} channels of ${self.guilds.size} guilds.`); 
  	try {
		  var botCount=self.guilds.get("374071874222686211").members.filter(t=>t.user.bot).size;
		  self.user.setActivity(`${botCount} Bots in BFD`,{type:"WATCHING"});
	  }catch(e){
		  self.user.setActivity(`Bots For Discord`,{type:"WATCHING"});
	  }
});
