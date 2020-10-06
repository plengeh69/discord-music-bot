const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error")

module.exports = {
    info: {
        name: "nowplaying",
        description: "Untuk menampilkan musik yang sedang diputar diserver ini",
        usage: "",
        aliases: ["np"],
    },

    run: async function (client, message, args) {
        const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue) return sendError("Tidak ada yang diputar diserver ini.", message.channel);
        let song = serverQueue.songs[0]
        let thing = new MessageEmbed()
        .setAuthor("Sedang memutar", "https://raw.githubusercontent.com/plengeh69/discord-music-bot/master/assets/Music.gif")
        .setThumbnail(song.img)
        .setColor("BLUE")
        .addField("Nama", song.title, true)
        .addField("Durasi", song.duration, true)
        .addField("Requested by", song.req.tag, true)
        .setFooter(`Views: ${song.views} | ${song.ago}`)
        return message.channel.send(thing)
    },
};