// ----------------------------------------------------------------------------------//
// Main
// Rabbithole Curation Bot (( v1.0.0 ))
// Fiigmnt | Feburary 6, 2022 | Updated:
// ----------------------------------------------------------------------------------//

import { Client, Intents, TextChannel } from "discord.js";
import * as dot from "dotenv";
dot.config();

const { CURATE_FROM, POST_TO, DISCORD_TOKEN } = process.env;

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

client.once("ready", () => {
  console.log("Bot is ready");
});

client.on("messageReactionAdd", async (ReactionEmoji) => {
  const reaction = ReactionEmoji;
  try {
    // When a reaction is received, check if the structure is partial
    if (reaction.partial) {
      await reaction.fetch();
    }

    const { message, emoji, count } = reaction;
    const { channelId } = message;

    const sendMessage = () => {
      return (
        CURATE_FROM === channelId &&
        emoji.name === "🥕" &&
        count === 3
      );
    };

    if (sendMessage() && POST_TO) {
      const channel = client.channels.cache.get(POST_TO);
      const formattedMessage = `Shared by @${message?.author?.username}\n${message.content}`;
      if (channel as TextChannel) {
        (channel as TextChannel).send(formattedMessage);
        console.log('Message sent.');
        console.log(formattedMessage);
      } else {
        console.log("Issue with curation channel");
      }
    }
  } catch (error) {
    console.error("Something went wrong when fetching the message:", error);
    return;
  }
});

client.login(DISCORD_TOKEN);
