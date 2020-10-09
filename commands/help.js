const { MessageEmbed } = require('discord.js')

module.exports = {
    info: {
        name: "help",
        description: "Untuk menampilkan semua perintah",
        usage: "[command]",
        aliases: ["commands", "help me"]
    },

    run: async function(client, message, args){
        var allcmds = "";

        client.commands.forEach(cmd => {
            let cmdinfo = cmd.info
            allcmds+="``"+client.config.prefix+cmdinfo.name+" "+cmdinfo.usage+"`` ~ "+cmdinfo.description+"\n"
        })

        let embed = new MessageEmbed()
        .setAuthor("Commands of "+client.user.username, "https://raw.githubusercontent.com/plengeh69/discord-music-bot/master/assets/Music.gif")
        .setColor("Blue")
        .setDescription(allcmds)
        .setFooter(`Untuk mendapatkan info setiap perintah yang bisa anda lakukan ${client.config.prefix}help [command] | Made by Arjn.id#9922`)

        if(!args[0])return message.channel.send(embed)
        else {
            let cmd = args[0]
            let command = client.commands.get(cmd)
            if(!command)command = client.commands.find(x => x.info.aliases.includes(cmd))
            if(!command)return message.channel.send("Perintah tidak diketahui")
            let commandinfo = new MessageEmbed()
            .setTitle("Command: "+command.info.name+" info")
            .setColor("YELLOW")
            .setDescription(`
Name: ${command.info.name}
Description: ${command.info.description}
Usage: \`\`${client.config.prefix}${command.info.name} ${command.info.usage}\`\
Aliases: ${command.info.aliases.join(", ")}
`)
            message.channel.send(commandinfo)
        }
    }
}
