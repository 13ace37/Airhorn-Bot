const { Client } = require("discord.js");
const client = new Client();

const { token, prefix, playCommand } = require(__dirname + "/config.js");

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(prefix + playCommand);
});

client.on("message", message => {
    if (!message.guild || message.author.bot) return;

    if (message.content.startsWith(prefix) && message.content.slice(prefix.length) === playCommand) {
        if (message.member.voiceChannel) {
            message.member.voiceChannel.join()
                .then(connection => {
                    const dispatcher = connection.playFile(__dirname + "/sounds/airhorn.mp3");
                    dispatcher.on("end", () => {
                        message.member.voiceChannel.leave();
                    });
                    dispatcher.on("error", error => {
                        console.error(error);
                    });
                })
                .catch(console.error);
        }
    }

});

client.login(token);