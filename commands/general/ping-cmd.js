module.exports=(async (message) => {
	if(!message) return new Error ("missing message parameter");
	await require(`../../BaseCommand.js`)(message);
	
	var m = await message.channel.send("Checking Ping..");
	m.edit("Ping Calculated!");
	message.channel.send(`Bot Ping: ${(m.createdTimestamp - message.createdTimestamp)}ms${"\n"}API Ping: ${Math.round(client.ws.ping)}ms`);
	m.delete().catch(noerr=>{});
});