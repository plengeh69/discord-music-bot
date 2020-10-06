const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
    info: {
        name: "volume",
        description: "Untuk mengubah volume antrian lagu",
        usage: "[volume]",
        aliases: ["vol"],
    },

    run: async function (client, message, args) {
        const channel = message.member.voice.channel;
        if (!channel)return sendError("Maaf, tetapi anda harus menggunakan voice channel untuk memutar lagu!", message.channel);
        const serverQueue = meesage.client.queue.get(message.guild.id);
        if (!serverQueue) return sendError("Tidak ada yang diputar diserver ini.", message.channel);
        if (!args[0])return message.channel.send(`Volume saat ini adalah: **${serverQueue.volume}**`);
        serverQueue.volume = args[0];
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
        let xd = new MessageEmbed()
        .setDescription(`Volume: **${args[0]/5}/5**(itu akan dibagi 5)`)
        .setAuthor("Volume", "https://raw.githubusercontent.com/plengeh69/discord-music-bot/master/assets/Music.gif")
        .setColor("BLUE")
        return message.channel.send(xd);
    },
};