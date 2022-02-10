"use strict";
// ----------------------------------------------------------------------------------//
// Main
// Rabbithole Curation Bot (( v1.0.0 ))
// Fiigmnt | Feburary 6, 2022 | Updated:
// ----------------------------------------------------------------------------------//
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dot = __importStar(require("dotenv"));
dot.config();
const { CURATE_FROM, POST_TO, DISCORD_TOKEN } = process.env;
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
client.once("ready", () => {
    console.log("Bot is ready");
});
client.on("messageReactionAdd", (ReactionEmoji) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const reaction = ReactionEmoji;
    try {
        // When a reaction is received, check if the structure is partial
        if (reaction.partial) {
            yield reaction.fetch();
        }
        const { message, emoji, count } = reaction;
        const { channelId } = message;
        const sendMessage = () => {
            return (CURATE_FROM === channelId &&
                emoji.name === "🥕" &&
                count === 3);
        };
        if (sendMessage() && POST_TO) {
            const channel = client.channels.cache.get(POST_TO);
            const formattedMessage = `Shared by @${(_a = message === null || message === void 0 ? void 0 : message.author) === null || _a === void 0 ? void 0 : _a.username}\n${message.content}`;
            if (channel) {
                channel.send(formattedMessage);
                console.log('Message sent.');
                console.log(formattedMessage);
            }
            else {
                console.log("Issue with curation channel");
            }
        }
    }
    catch (error) {
        console.error("Something went wrong when fetching the message:", error);
        return;
    }
}));
client.login(DISCORD_TOKEN);
