const sendError = require("../util/error");

module.exports = {
    info: {
        name: "skip",
        description: "Untuk melewati lagu saat ini",
        usage: "",
        aliases: ["song-skip"],
    },

    run: async function (client, message, args) {
        const channel = message.member.voice.channel
        if (!channel)return sendError("Maaf, tetapi anda harus menggunakan voice channel untuk memutar lagu!", message.channel);
        const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue)return sendError("Tidak ada pemutaran yang bisa saya lewatkan untuk anda.", message.channel);
        serverQueue.connection.dispatcher.end("Melewatkan lagunya");
        message.react("✅")
    },
};