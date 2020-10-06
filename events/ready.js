module.exports = async (client) => {
    console.log(`[READY] Logged in as ${client.user.tag}`);
    await client.user.setActivity("Music", {
        type: "LISTENING",
    });
};