const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
    info: {
        name: "queue",
        description: "Untuk menampilkan antrian lagu server",
        usage: "",
        aliases: ["list", "songlist", "list-song"],
    },

    run: async function (client, message, args) {
        const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue) return sendError("Tidak ada yang diputar diserver ini.", message.channel);

        let queue = new MessageEmbed()
        .setAuthor("Antrian Lagu", "https://raw.githubusercontent.com/plengeh69discord-music-bot/master/assets/Music.gif")
        .setColor("BLUE")
        .addField("Sekarang Memutar", serverQueue.songs[0].title, true)
        .addField("Teks Channel", serverQueue.textChannel, true)
        .addField("Voice Channel", serverQueue.voiceChannel, true)
        .setDescription(serverQueue.songs.map((song) => {
            if(song === serverQueue.songs[0])return
            return `**-** ${song.title}`
        }).join("\n"))
        .setFooter("Volume saat ini adalah "+serverQueue.volume)
        if(serverQueue.songs.length === 1)queue.setDescription(`Tidak ada lagu untuk diputar selanjutnya tambahkan lagu \`\`${client.config.prefix}play <song_name>\`\``)
        message.channel.send(queue)
    },
};