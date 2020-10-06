const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
    info: {
        name: "pause",
        description: "Untuk menghentikan musik saat ini diserver",
        usage: "",
        aliases: ["song-pause"],
    },

    run: async function (client, message, args) {
        const serverQueue = message.client.queue.get(message.guild.id);
        if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
            let xd = new MessageEmbed()
            .setDescription("Jeda musik untuk anda!")
            .setColor("YELLOW")
            .setAuthor("Musik telah dijeda", "https://raw.githubusercontent.com/plengeh69/discord-music-bot/master/assets/Music.gif")
            return message.channel.send(xd);
        }
        return sendError("Tidak ada yang diputar diserver ini.", message.channel);
    },
};