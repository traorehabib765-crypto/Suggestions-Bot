// Made by Ayliee, All rights are reserved to AeroX Development

import 'dotenv/config';
import express from 'express';
import { Client, GatewayIntentBits, Partials } from 'discord.js';
import {
  msg,
  ContainerBuilder,
  MessageFlags,
  thinDivider,
  text,
} from './ui.js';
import { BotManager } from './BotManager.js';

// ─── Express Server ───────────────────────────────────────────────────────────

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'mc-afk-bot' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`HTTP server running on port ${PORT}`);
});

// ─── Startup validation ────────────────────────────────────────────────────────

if (!process.env.DISCORD_TOKEN) {
  console.error('[ERROR] DISCORD_TOKEN is not set. Add it to your .env file or Pterodactyl startup variables.');
  process.exit(1);
}

const GUILD_ID = process.env.GUILD_ID?.trim() || null;

// ─── Client ───────────────────────────────────────────────────────────────────

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

const botManager = new BotManager();

client.on('clientReady', () => {
  if (GUILD_ID) {
    console.log(`Discord bot logged in as ${client.user.tag} — restricted to guild ${GUILD_ID}`);
  } else {
    console.log(`Discord bot logged in as ${client.user.tag} — active in all servers`);
  }
});

// ─── Help ─────────────────────────────────────────────────────────────────────

const COMMANDS = [
  { usage: '!join <ip[:port]> [username]',  desc: 'Join a cracked server.' },
  { usage: '!premjoin <ip[:port]>',         desc: 'Join an online-mode server via Microsoft account.' },
  { usage: '!leave <ip> <username>',        desc: 'Disconnect a bot.' },
  { usage: '!say <ip> <username> <message>', desc: 'Send a chat message in-game.' },
  { usage: '!bots',                         desc: 'List all active bots.' },
  { usage: '!jump <ip> <username>',         desc: 'Force a bot to jump.' },
  { usage: '!help',                         desc: 'Show this reference.' },
];

function buildHelp() {
  const c = new ContainerBuilder();

  c.addTextDisplayComponents(text('## MC AFK Bot Commands'));
  c.addSeparatorComponents(thinDivider());

  const commandLines = COMMANDS
    .map((cmd) => `\`${cmd.usage}\` **- ${cmd.desc}**`)
    .join('\n');

  c.addTextDisplayComponents(
    text(
      '**Send Minecraft AFK bots to any server and control them from Discord.**\n' +
      '\n' +
      '**Main Commands:**\n' +
      commandLines
    )
  );

  c.addSeparatorComponents(thinDivider());

  c.addTextDisplayComponents(
    text('**Made by:** Ayliee  ·  AeroX Development')
  );

  c.addSeparatorComponents(thinDivider());

  c.addTextDisplayComponents(
    text('-# Bots auto-jump every 5s and rotate view every 30s to prevent AFK kicks.')
... (101lignes restantes)
