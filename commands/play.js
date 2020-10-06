const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const yts = require("yt-search");
const sendError = require("../util/error")

module.exports = {
    info: {
        name: "play",
        description: "Untuk memutar lagu!",
        usage: "<song-name>",
        aliases: ["p"],
    },

    run: async function (client, message, args) {
        const channel = message.member.voice.channel;
        if (!channel)return sendError("Maaf, tetapi anda harus menggunakan saluran suara untuk memutar musik!", message.channel);

        const permissions = channel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT"))return sendError("Saya tidak dapat terhubung ke saluran suara anda, pastikan saya memiliki izin yang sesuai", message.channel);
        if (!permissions.has("SPEAK"))return sendError("Saya tidak dapat berbicara disaluran suara ini", message.channel);
        
        var searchString = args.join(" ");
        if (!searchString)return sendError("Anda tidak poivide ingin saya ingin bermain", message.channel);

        var serverQueue = message.client.queue.get(message.guild.id);

        var searched = await yts.search(searchString)
        if(searched.videos.length === 0)return sendError("Sepertinya saya tidak bisa menemukan lagu tersebut di YouTube", message.channel)
        var songInfo = searched.videos[0]

        const song = {
            id: songInfo.videoId,
            title: Util.escapeMarkdown(songInfo.title),
            views: String(songInfo.views).padStart(10, ' '),
            url: songInfo.url,
            ago: songInfo.ago,
            duration: songInfo.duration.toString(),
            img: songInfo.image,
            req: message.author
        };

        if (serverQueue) {
            serverQueue.songs.push(song);
            let thing = new MessageEmbed()
            .setAuthor("Lagu telah ditambahkan ke antrian", "https://raw.githubusercontent.com/plengeh69/discord-music-bot/master/assets/Music.gif")
            .setThumbnail(song.img)
            .setColor("YELLOW")
            .addField("Nama", song.title, true)
            .addField("Durasi", song.duration, true)
            .addField("Requested by", song.req.tag, true)
            .setFooter(`Views: ${song.views} | ${song.ago}`)
            return message.channel.send(thing);
        }

        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: channel,
            connection: null,
            songs: [],
            volume: 2,
            playing: true,
        };
        message.client.queue.set(message.guild.id, queueConstruct);
        queueConstruct.songs.push(song);

        const play = async (song) => {
            const queue = message.client.queue.get(message.guild.id);
            if (!song) {
                sendError("Keliuar dari voice channel karena menurut saya tidak ada lagu dalam antrean. Jika anda suka bot, tetap 24/7 di voice channel pergi ke `commands/play.js` dan hapus nomor baris 61\n\nTerimakasih, source code![Github](https://github.com/plengeh69/music-bot)", message.channel)
                queue.voiceChannel.leave();
                message.client.queue.delete(message.guild.id);
                return;
            }

            const dispatcher = queue.connection
            .play(ytdl(song.url))
            .on("finish", () => {
                queue.songs.shift();
                play(queue.songs[0]);
            })
            .on("error", (error) => console.error(error));
            dispatcher.setVolumeLogarithmic(queue.volume / 5);
            let thing = new MessageEmbed()
            .setAuthor("Mulai Memutar Lagu!", "https://raw.githubusercontent.com/plengeh69/discord-music-bot/master/assets/Music.gif")
            .setThumbnail(song.img)
            .setColor("BLUE")
            .addField("Nama", song.title, true)
            .addField("Durasi", song.duration, true)
            .addField("Requested by", song.req.tag, true)
            .setFooter(`Views: ${song.views} | ${song.ago}`)
            queue.textChannel.send(thing);
        };

        try {
            const connection = await channel.join();
            queueConstruct.connection = connection;
            channel.guild.voice.setSelfDeaf(true)
            play(queueConstruct.songs[0]);
        } catch (error) {
            console.error(`Saya tidak bisa gabung ke voice channel: ${error}`);
            message.client.queue.delete(message.guild.id);
            await channel.leave();
            return sendError(`Saya tidak bisa gabung ke voice channel: ${error}`, message.channel);
        }
    }
};