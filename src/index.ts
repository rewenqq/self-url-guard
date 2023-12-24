import { Client, SelfBot } from "@/structures";
import { ActivityType, AuditLogEvent, Client as Core, EmbedBuilder, Events, GatewayIntentBits, Guild, Partials, TextChannel } from "discord.js";
const client = new Client();
const selfBot = new SelfBot();
import config from "config.json";

client.on(Events.GuildUpdate, async (oldGuild: Guild, newGuild: Guild) => {
    if (oldGuild.vanityURLCode !== newGuild.vanityURLCode) {
        let guild = selfBot.guilds.cache.get(config.GUILD_ID);
        let logs = await oldGuild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.GuildUpdate });
        let entry = logs.entries.first();
        let channel = oldGuild.channels.cache.get(config.LOGCHANNEL_ID) as TextChannel;
        if (!entry || entry.executor.id == oldGuild.ownerId || config.WHITELIST.some(wl => entry.executor.id.includes(wl))) return;
        let member = await oldGuild.members.fetch(entry.executor.id);
        if(member.bannable) return member.ban({
            reason: "url guard siker - Takachi"
        });
        if(guild) {
            selfBot.guilds.cache.get(oldGuild.id).setVanityCode(config.VANITY_URL);
        };
        let response = member.bannable ? "Güvenli listede olmadığı için banlandı!" : "Yetkim yetmediği için banlayamadım"
        channel.send({
            content: `@everyone & @here`,
            embeds: [new EmbedBuilder().setTitle("Url Guard").setDescription(`${entry.executor} (${entry.executor.id}) Sunucu urlsini değiştirmeye çalıştı fakat ${response}`)]
        })
    }
});