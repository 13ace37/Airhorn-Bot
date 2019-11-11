const { Client } = require("discord.js");
const client = new Client();

const { token } = require("./auth.json");

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("/join");
});

client.on("message", message => {
    if (!message.guild) return;

    if (message.content === "/join") {
        if (message.member.voiceChannel) {
            message.member.voiceChannel.join()
                .then(connection => {
                    message.delete();
                    const dispatcher = connection.playFile("PATH TO SOUND FILE");
                    dispatcher.on("end", () => {
                        message.member.voiceChannel.leave();
                    });

                    dispatcher.on("error", e => {
                        console.log(e);
                    });
                })
                .catch(console.log);
        }
    }

});

client.login(token);