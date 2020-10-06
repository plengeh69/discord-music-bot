const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
    info: {
        name: "stop",
        description: "Untuk menghentikan lagu dan menghapus antrian",
        usage: "",
        aliases: ["song-stop"],
    },

    run: async function (client, message, args) {
        const channel = message.member.voice.channel
        if (!channel)return sendError("Maaf, tetapi anda harus menggunakan voice channel untuk memutar lagu!", message.channel);
        const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue)return sendError("Tidak ada pemutar yang bisa saya hentikan untuk anda.", message.channel);
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end("Lagu berhenti");
        message.react("✅")
    },
};