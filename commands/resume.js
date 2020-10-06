const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
    info: {
        name: "resume",
        description: "Untuk melanjutkan lagu yang dijeda",
        usage: "",
        aliases: ["song-resume"],
    },

    run: async function (client, message, args) {
        const serverQueue = message.client.queue.get(message.guild.id);
        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            let xd = new MessageEmbed()
            .setDescription("Melanjutkan lagu untuk anda!")
            .setColor("YELLOW")
            .setAuthor("Lagu telah di lanjutkan", "https://raw.githubusercontent.com/plengeh69/discord-music-bot/master/assets/Music.gif")
            return message.channel.send(xd);
        }
        return sendError("Tidak ada yang diputar diserver ini.", message.channel);
    },
};