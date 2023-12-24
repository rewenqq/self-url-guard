import { ActivityType, AuditLogEvent, Client as Core, EmbedBuilder, Events, GatewayIntentBits, Message, Partials, TextChannel } from "discord.js";
import config from "config.json"
export class Client extends Core {
    constructor() {
     
        super({
            intents: Object.keys(GatewayIntentBits).map((intent) => GatewayIntentBits[intent]),
            partials: Object.keys(Partials).map(p => Partials[p]),
            presence: {
                activities: [{ name: config.STATUS, type: ActivityType.Watching }],
            },
        });
    }

    async connect() {
        const guild = this.guilds.cache.get(config.GUILD_ID);
        const channel = guild.channels.cache.get(config.LOGCHANNEL_ID) as TextChannel;
        if(!channel) return console.info("Log kanalı geçersiz.");
        this.login(config.BOT_TOKEN).then(() => {
            this.on('ready', async () => {
                this.guilds.fetch(config.GUILD_ID);
                console.info("[MAIN BOT] giriş yaptı!", this.user.username);
            });
            }).catch(err => { console.error(err) });
        }
    }
