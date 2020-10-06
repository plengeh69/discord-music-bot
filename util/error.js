const { MessageEmbed } = require("discord.js")

/**
 * Easy to send error
 * @param {String} text - Message which is need to send
 * @param {TextChannel} channel - A Channel to send error
 */
module.exports = async (text, channel) => {
    let embed = new MessageEmbed()
    .setColor("RED")
    .setDescription(text)
    .setFooter("Ups! ada yang tidak beres :(")
    await channel.send(embed)
}