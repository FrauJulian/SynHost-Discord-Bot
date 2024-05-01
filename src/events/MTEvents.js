const { ActionRowBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require('discord.js');
const discordTranscripts = require('discord-html-transcripts');
const client = require("../../index");
const config = require("../../CONFIGS/config.json");
const moment = require("moment");
const fs = require('fs');

module.exports = {
    name: "ManageTickets"
};

client.on("interactionCreate", async (interaction) => {
    try {
        let embed_author_text = config.ticket_system.embeds_theme.embed_author_text;
        let embed_author_icon = config.ticket_system.embeds_theme.embed_author_icon;
        let embed_footer_text = config.ticket_system.embeds_theme.embed_footer_text;
        let embed_footer_icon = config.ticket_system.embeds_theme.embed_footer_icon;
        let embed_color = config.ticket_system.embeds_theme.embed_color;

        if(interaction.isModalSubmit()) {
            //Add User 1
            if (interaction.customId === "ticket-adduser-modal") {
                const channel = interaction.guild.channels.cache.get(`${interaction.channel.id}`);
                const user = interaction.fields.getTextInputValue('ticket-adduser-0');

                try {
                    await channel.edit({
                        permissionOverwrites: [
                            {
                                id: user,
                                allow: ['SendMessages', 'ViewChannel'],
                            },
                            {
                                id: interaction.guild.roles.everyone,
                                deny: ['ViewChannel'],
                            },
                            {
                                id: config.generell.bot_id,
                                allow: ['ManageChannels']
                            },
                            {
                                id: config.ticket_system.support_role,
                                allow: ['SendMessages', 'ViewChannel']
                            }
                        ],
                       }).then(async => {
                        const AddedUser = new EmbedBuilder()
                        .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                        .setDescription(`### <@`+ user +`> wurde zum Ticket hinzugefügt!`)
                        .setTimestamp()
                        .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                        .setColor(embed_color)
                        interaction.channel.send({
                           embeds: [AddedUser]
                        });
                    })
                } catch (err) {
                    console.log(err);
                    const AddedUser = new EmbedBuilder()
                    .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                    .setDescription("### Es wurde niemand mit der ID " + user + " gefunden!")
                    .setTimestamp()
                    .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                    .setColor(embed_color)
                    interaction.reply({ embeds: [AddedUser], ephemeral: true });
                }
            }
            //Rem User 1
            if (interaction.customId === "ticket-remuser-modal") {
                const channel = interaction.guild.channels.cache.get(`${interaction.channel.id}`);
                const user = interaction.fields.getTextInputValue('ticket-remuser-0');

                try {
                    await channel.edit({
                        permissionOverwrites: [
                            {
                                id: user,
                                deny: ['SendMessages', 'ViewChannel'],
                            },
                            {
                                id: interaction.guild.roles.everyone,
                                deny: ['ViewChannel'],
                            },
                            {
                                id: config.generell.bot_id,
                                allow: ['ManageChannels']
                            },
                            {
                                id: config.ticket_system.support_role,
                                allow: ['SendMessages', 'ViewChannel']
                            }
                        ],
                       }).then(async => {
                        const RemUserE = new EmbedBuilder()
                        .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                        .setDescription(`### <@`+ user +`> wurde entfernt!`)
                        .setTimestamp()
                        .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                        .setColor(embed_color)
                        interaction.reply({
                           embeds: [RemUserE]
                        });
                    })
                } catch (err) {
                    console.log();
                    const AddedUser = new EmbedBuilder()
                    .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                    .setDescription("### Es wurde niemand mit der ID " + user + " gefunden!")
                    .setTimestamp()
                    .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                    .setColor(embed_color)
                    interaction.channel.send({ embeds: [AddedUser], ephemeral: true });
                }
            }
            //Assign 0
            if (interaction.customId === "ticket-assign-modal") {
                const user = interaction.fields.getTextInputValue('ticket-assign-0');
                const channel = interaction.guild.channels.cache.get(`${interaction.channel.id}`);

                channel.setName("c-" + user);

                const AssignedEmbed = new EmbedBuilder()
                .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                .setDescription("### Das Ticket wurde an " + user + " übergeben!")
                .setTimestamp()
                .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                .setColor(embed_color)
                interaction.channel.send({ embeds: [AssignedEmbed] })
            }
            //Psychiater
            if (interaction.customId === "ticket-psyco-modal") {
                const problem = interaction.fields.getTextInputValue('ticket-psyco-0');

                console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}]`);
                console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] Der Supporter namens ` + interaction.member.displayName + ` hat die Sau rausgelassen! Aua...`);
                console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ` + problem);
                console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}]`);

                const PSYCOEmbed = new EmbedBuilder()
                .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                .setDescription("### Du schaffst das!")
                .setTimestamp()
                .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                .setColor(embed_color)
                interaction.reply({ embeds: [PSYCOEmbed], ephemeral: true })
            }
        }

        if(interaction.isButton()) {
            //Close
            if (interaction.customId.startsWith(`ticket-close`)) {

                const LogEmbed = new EmbedBuilder()
                .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                .setDescription("### Das Ticket `" + interaction.channel.name + "` wurde von `" + interaction.user.username + "` gelöscht!\n\n**Transcript:**\nhttps://log.fraujulian.xyz/transcript" + interaction.channel.id + ".html")
                .setTimestamp()
                .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                .setColor(embed_color)

                const DeleteEmbed = new EmbedBuilder()
                .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                .setDescription("### Das Ticket wurde von `" + interaction.user.username + "` geschlossen!\n> Das Ticket wird in 5 Minuten gelöscht!")
                .setTimestamp()
                .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                .setColor(embed_color)

                const TicketChannel = interaction.guild.channels.cache.get(`${interaction.channel.id}`)

                const LogString = await discordTranscripts.createTranscript(TicketChannel, {
                    limit: -1,
                    returnType: 'string',
                    filename: "transcript" + interaction.channel.id + ".html",
                    saveImages: true,
                    poweredBy: false
                });

                fs.writeFile("./transcripts/transcript" + interaction.channel.id + ".html", LogString, function (err) {
                    if (err) throw err;
                });

                const LogChannel = interaction.guild.channels.cache.find(ch => ch.id === config.ticket_system.transcripts);
                
                setTimeout(async () => {
                    const LogFile = new AttachmentBuilder()
                    .setFile("transcripts/transcript" + interaction.channel.id + ".html/")

                    LogChannel.send({ embeds: [LogEmbed], files: [LogFile] })
                    interaction.reply({ embeds: [DeleteEmbed] })
                    interaction.channel.send({ content: "|| <@" + config.ticket_system.member_role + "> || :heart:\n\nBewerten Sie uns gerne in <#1170807016567078945>, auf [Trustpilot](https://de.trustpilot.com/evaluate/synergy-solution.de) oder auf [Google](https://g.page/r/CTzKF9Xwbq8IEB0/review)." })

                    await TicketChannel.edit({
                        name: `closed-ticket`,
                    })
                        
                    const { exec } = require("child_process");

                    exec("mv /var/lib/pufferpanel/servers/"+config.ticket_system.serverid_bot+"/transcripts/transcript" + interaction.channel.id + ".html /var/lib/pufferpanel/servers/"+config.ticket_system.serverid_web+"", (error, stdout, stderr) => {
                        if (error) {
                            console.log(err);
                            return true;
                        }
                        if (stderr) {
                            return true;
                        }
                    });
                }, 1500);

                setTimeout(() => {
                    TicketChannel.delete();
                }, 300000);
            }
            //Unclaim
            if (interaction.customId === "ticket-unclaim") {
                const channel = interaction.guild.channels.cache.get(`${interaction.channel.id}`);

                try {
                    channel.setName("ticket");

                    const AssignedEmbed = new EmbedBuilder()
                    .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                    .setDescription("### Das Ticket wurde entclaimed!")
                    .setTimestamp()
                    .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                    .setColor(embed_color)
                    interaction.reply({ embeds: [AssignedEmbed] })
                } catch (err) {
                    console.log(err);
                }
            }
            //Claim
            if (interaction.customId.startsWith(`ticket-claim`)) {
                const channel = interaction.guild.channels.cache.get(`${interaction.channel.id}`);
                const channelNB = channel.name;

                if (channelNB.includes("c-")) {return;}

                let channelN = "c-" + interaction.user.username;

                await channel.setName(channelN);
                
                const ClaimEmbed = new EmbedBuilder()
                .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                .setDescription("### Es wird Ihnen nun von " + interaction.user.username + " geholfen!")
                .setTimestamp()
                .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                .setColor(embed_color)
                interaction.reply({ embeds: [ClaimEmbed] })
            }  
            //Add User 0
            if (interaction.customId === "ticket-adduser") {

               const UserModal = new ModalBuilder()
                .setCustomId(`ticket-adduser-modal`)
                .setTitle(`SynHost.de Support`);

               const AddUsername = new TextInputBuilder()
                    .setCustomId(`ticket-adduser-0`)
                    .setLabel("Username")
                    .setPlaceholder("Gebe die DISCORD ID an!")
                    .setStyle(TextInputStyle.Short)
                    .setMaxLength(100);

                const UserNameInput = new ActionRowBuilder().addComponents(AddUsername);
                UserModal.addComponents(UserNameInput);
                interaction.showModal(UserModal);
            }
            //Add User 0
            if (interaction.customId === "ticket-remuser") {

               const UserModal = new ModalBuilder()
                .setCustomId(`ticket-remuser-modal`)
                .setTitle(`SynHost.de Support`);

               const RemUser = new TextInputBuilder()
                    .setCustomId(`ticket-remuser-0`)
                    .setLabel("Username")
                    .setPlaceholder("Gebe die DISCORD ID an!")
                    .setStyle(TextInputStyle.Short)
                    .setMaxLength(100);

                const UserNameInput = new ActionRowBuilder().addComponents(RemUser);
                UserModal.addComponents(UserNameInput);
                interaction.showModal(UserModal);
            }
            //Psychiater 0
            if (interaction.customId === "ticket-psychiater") {
                var messages = [
                    "Selbst in den schwierigsten Momenten zeigt sich dein Können im Kundenservice. Du bist der Held, den unser Team braucht!",
                    "Jeder nervige Kunde ist eine Chance, einen echten Unterschied zu machen. Du bist nicht nur ein Problemlöser, sondern ein Kundenretter!",
                    "Dein Durchhaltevermögen ist beeindruckend. Auch die schwierigsten Situationen werden durch deine positive Einstellung gemeistert.",
                    "In der Ruhe liegt die Kraft. Du bewahrst einen kühlen Kopf, auch wenn es heiß hergeht – das zeichnet einen wahren Profi aus!",
                    "Denke daran, dass du nicht nur Probleme löst, sondern auch die Erwartungen deiner Kunden übertriffst. Du bist der Service-Superheld!",
                    "Herausforderungen sind nur Chancen in Verkleidung. Du nimmst sie an und zeigst, dass unser Kundenservice-Team unschlagbar ist!",
                    "Deine Professionalität ist bewundernswert. Auch in schwierigen Situationen strahlst du Kompetenz und Freundlichkeit aus.",
                    "Kunden, die Schwierigkeiten bringen, sind die besten Lehrer. Du lernst und wächst mit jeder Herausforderung, die du meisterst!",
                    "Nervige Kunden sind wie Gewitter. Sie kommen und gehen, aber du bleibst als strahlender Himmel bestehen. Du machst den Unterschied!",
                    "Mit deiner Geduld und Freundlichkeit zauberst du aus jedem Konflikt eine Chance zur Kundenbindung. Du bist ein Meister im Service!",
                    "Nicht jeder kann so souverän mit schwierigen Kunden umgehen wie du. Du bist nicht nur ein Kundendienstmitarbeiter, sondern ein Magier der Gelassenheit!",
                    "Durch dein Engagement machst du aus negativen Erfahrungen positive Erlebnisse. Du bist unser Geheimrezept für zufriedene Kunden!",
                    "Nervige Kunden sind wie Gewichte im Fitnessstudio. Sie machen dich stärker. Du wächst mit jeder Herausforderung und wirst unschlagbar!",
                    "Inmitten von Beschwerden und Frustrationen leuchtet deine Freundlichkeit wie ein Stern. Du machst aus jedem Kundenkontakt eine positive Erfahrung!",
                    "Ein echter Held kennt keine Müdigkeit. Auch wenn der Tag lang ist und die Kundenforderungen hoch, bleibst du unser unermüdlicher Service-Champion!",
                    "Jede Beschwerde ist eine Gelegenheit, einen Kunden in einen treuen Botschafter zu verwandeln. Du baust Brücken, wo andere auf Mauern stoßen!",
                    "Dein Einsatz ist wie ein Licht in der Dunkelheit der Kundenbeschwerden. Du machst den Kundenservice zu einer strahlenden Erfahrung für alle!",
                    "Nervige Kunden sind wie Puzzlestücke. Du findest die richtigen Verbindungen, um das Gesamtbild einer positiven Kundenerfahrung zu vervollständigen.",
                    "Deine Ausdauer im Kundenservice ist bewundernswert. Du lässt dich nicht entmutigen, sondern bist bereit, jeden Kundenwunsch zu erfüllen!",
                    "Du bist nicht nur ein Kundenservice-Mitarbeiter, sondern ein Problemlösungs-Experte. Du verwandelst Herausforderungen in Chancen und machst aus jedem Kontakt einen Erfolg!"
                ];
        
                const rmsg = messages[Math.floor(Math.random() * messages.length)];

                const PSYCO = new ButtonBuilder()
                .setCustomId("ticket-psyco")
                .setLabel("ICH BRAUCHE MEHR HILFE")
                .setEmoji("💔")
                .setStyle(ButtonStyle.Primary);
          
                const ButtonsPSYCO = new ActionRowBuilder()
                .addComponents(PSYCO);

                const TeamChat = interaction.guild.channels.cache.get(config.ticket_system.team_chat);

                const PsyUsed = new EmbedBuilder()
                .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                .setDescription(`### <@` + interaction.member.id + `> hat den Psychiater genötigt!`)
                .setTimestamp()
                .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                .setColor(embed_color)

                const PsychiaterEmbed = new EmbedBuilder()
                .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                .setDescription("### " + rmsg + "\nGeneriert von ChatGPT übrigens! :joy:")
                .setTimestamp()
                .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                .setColor(embed_color)
                TeamChat.send({ embeds: [PsyUsed] })
                interaction.reply({ embeds: [PsychiaterEmbed], components: [ButtonsPSYCO], ephemeral: true })
            } 
            //Psychiater 1
            if (interaction.customId === "ticket-psyco") {
                const UserModal = new ModalBuilder()
                .setCustomId(`ticket-psyco-modal`)
                .setTitle(`SynHost.de Support`);

               const AddUsername = new TextInputBuilder()
                    .setCustomId(`ticket-psyco-0`)
                    .setLabel("Problem mit dem Kunden")
                    .setPlaceholder("Lasse die volle Sau raus und beleidige den Kunden!")
                    .setStyle(TextInputStyle.Paragraph)
                    .setMaxLength(2000);

                const UserNameInput = new ActionRowBuilder().addComponents(AddUsername);
                UserModal.addComponents(UserNameInput);
                interaction.showModal(UserModal);
            }  
            //Assign
            if (interaction.customId === "ticket-assign") {
                const UserModal = new ModalBuilder()
                .setCustomId(`ticket-assign-modal`)
                .setTitle(`SynHost.de Support`);

               const AddUsername = new TextInputBuilder()
                    .setCustomId(`ticket-assign-0`)
                    .setLabel("Username")
                    .setPlaceholder("Gib den Nutzernamen deines Kollegen an!")
                    .setStyle(TextInputStyle.Short)

                const UserNameInput = new ActionRowBuilder().addComponents(AddUsername);
                UserModal.addComponents(UserNameInput);
                interaction.showModal(UserModal);
            }  
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
})