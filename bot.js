const { Client } = require('discord.js');
const client = new Client();

const auth = require('./auth.json');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('/join');
});

client.on('message', msg => {
    if (!msg.guild) return;

    if (msg.content === '/join') {
        if (msg.member.voiceChannel) {
            msg.member.voiceChannel.join()
                .then(connection => {
                    msg.delete();
                    const dispatcher = connection.playFile('E:/Projecten/Bots/test-bot/sounds/airhorn.mp3');
                    dispatcher.on('end', () => {
                        msg.member.voiceChannel.leave();
                    });

                    dispatcher.on('error', e => {
                        console.log(e);
                    });
                })
                .catch(console.log);
        }
    }

});

client.login(auth.token);