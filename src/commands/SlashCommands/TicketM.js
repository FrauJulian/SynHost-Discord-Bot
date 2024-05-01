const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, PermissionFlagsBits, ButtonStyle, ActionRow,  } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../../../CONFIGS/config.json");
const moment = require("moment");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ticket")
    .setDescription("Mit diesen Command hast du die Tickets immer im Griff!")
    .setDefaultMemberPermissions(PermissionFlagsBits.MoveMembers),
    run: async (client, interaction) => {

      try {
        if (interaction.channel.parent.id === config.ticket_system.ticket_categorie) {

          let embed_author_text = config.ticket_system.embeds_theme.embed_author_text;
          let embed_author_icon = config.ticket_system.embeds_theme.embed_author_icon;
          let embed_footer_text = config.ticket_system.embeds_theme.embed_footer_text;
          let embed_footer_icon = config.ticket_system.embeds_theme.embed_footer_icon;
          let embed_color = config.ticket_system.embeds_theme.embed_color;
  
          const Claim = new ButtonBuilder()
          .setCustomId(`ticket-claim-${interaction.user.id}`)
          .setLabel("Claim")
          .setEmoji("🙋‍♂️")
          .setStyle(ButtonStyle.Success);
  
          const AddUser = new ButtonBuilder()
          .setCustomId("ticket-adduser")
          .setLabel("Add User")
          .setEmoji("🙇‍♂️")
          .setStyle(ButtonStyle.Primary);

          const RemUser = new ButtonBuilder()
          .setCustomId("ticket-remuser")
          .setLabel("Remove User")
          .setEmoji("🙇‍♂️")
          .setStyle(ButtonStyle.Primary);
  
          const Assign = new ButtonBuilder()
          .setCustomId("ticket-assign")
          .setLabel("Assign")
          .setEmoji("👉")
          .setStyle(ButtonStyle.Success);
  
          const Unclaim = new ButtonBuilder()
          .setCustomId("ticket-unclaim")
          .setLabel("Unclaim")
          .setEmoji("🤷‍♂️")
          .setStyle(ButtonStyle.Secondary);
  
          const Close = new ButtonBuilder()
          .setCustomId("ticket-close")
          .setLabel("Close")
          .setEmoji("🛡️")
          .setStyle(ButtonStyle.Danger);

          const Psychiater = new ButtonBuilder()
          .setCustomId("ticket-psychiater")
          .setLabel("Psychiater")
          .setEmoji("❤️‍🔥")
          .setStyle(ButtonStyle.Secondary);
    
          const ButtonsCla = new ActionRowBuilder()
          .addComponents(Claim, Assign, Unclaim);

          const ButtonsU = new ActionRowBuilder()
          .addComponents(AddUser, RemUser);

          const ButtonsClo = new ActionRowBuilder()
          .addComponents(Close);

          const PsychiaterRow = new ActionRowBuilder()
          .addComponents(Psychiater);
  
          const ManageEmbed = new EmbedBuilder()
          .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
          .setDescription("## Wähle eine Aktion für dieses Ticket!")
          .setTimestamp()
          .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
          .setColor(embed_color)
          interaction.reply({ embeds: [ManageEmbed], components: [ButtonsCla,ButtonsU,ButtonsClo,PsychiaterRow], ephemeral: true})
  
        } else {
          let embed_author_text = config.generell.err_embed.embed_author_text;
          let embed_author_icon = config.generell.err_embed.embed_author_icon;
          let embed_footer_text = config.generell.err_embed.embed_footer_text;
          let embed_footer_icon = config.generell.err_embed.embed_footer_icon;
          let embed_color = config.generell.err_embed.embed_color;
  
          const WrongChannel = new EmbedBuilder()
          .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
          .setDescription("## Dieser Befehl funktioniert nur in Tickets!")
          .setTimestamp()
          .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
          .setColor(embed_color)
          interaction.reply({ embeds: [WrongChannel], ephemeral: true})
        }
      } catch (err) {
        let embed_author_text = config.generell.err_embed.embed_author_text;
        let embed_author_icon = config.generell.err_embed.embed_author_icon;
        let embed_description = config.generell.err_embed.embed_description.replace("%err%", "" + err + "");
        let embed_footer_text = config.generell.err_embed.embed_footer_text;
        let embed_footer_icon = config.generell.err_embed.embed_footer_icon;
        let embed_color = config.generell.err_embed.embed_color;

        const ErrEmbed = new EmbedBuilder()
        .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
        .setDescription(embed_description)
        .setTimestamp()
        .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
        .setColor(embed_color)
        console.error(err)
        interaction.reply({ embeds: [ErrEmbed], ephemeral: true})
      }
    }
}