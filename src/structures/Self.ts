import { Client as Core, Intents, TextChannel } from "discord.js-selfbot-v13";
import config from "config.json";
export class SelfBot extends Core {
    constructor() {

        super({
            intents: Object.keys(Intents).map((intent) => Intents[intent]),
            presence: {
                status: "invisible"
            },
        });
    }


    async spamla() {
        const guild = this.guilds.cache.get(config.GUILD_ID)
        setInterval(() => {
            if (config.VANITY_URL !== guild.vanityURLCode) guild.setVanityCode(config.VANITY_URL)
        }, 1000 * 4);
    }

    async çalıştır() {
        this.login(config.SELF_TOKEN).then(() => {
        
            let guild = this.guilds.cache.get(config.GUILD_ID)
            if(!guild) {
                console.info("Sunucu idsi geçersiz!")
            }
            if(!guild.members.me.permissions.has('MANAGE_GUILD')) return console.info("[SELF BOT] yeterli yetki yok!")
            this.on('ready', async () => {
                this.guilds.fetch(config.GUILD_ID);
                console.info("[SELF BOT] giriş yaptı!", this.user.username);
            })
        

        }).catch(err => { console.error(err) });
    }
}