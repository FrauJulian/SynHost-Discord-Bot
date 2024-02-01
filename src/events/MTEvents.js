const { ActionRowBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ButtonBuilder, ButtonStyle } = require('discord.js');
const discordTranscripts = require('discord-html-transcripts');
const client = require("../../index");
const config = require("../../CONFIGS/config.json");
const moment = require("moment");

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
                const username = interaction.fields.getTextInputValue('ticket-adduser-0');
                const userB = interaction.guild.members.search({ query: username });

                userB.then(async (Collection) => {
                    const UserID = Collection.find(Collection.values("user"));

                    console.log(SUserID);
                })

                /*try {
                    const userB = interaction.guild.members.search({ query: username });

                    userB.then(async (UserID) => {
                        var user = UserID;

                        console.log(user);

                        await channel.edit({
                            permissionOverwrites: [
                                {
                                   id: user,
                                   allow: ['SendMessages', 'ViewChannel'],
                               }
                           ],
                       }).then(async => {
                           const AddedUser = new EmbedBuilder()
                           .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                           .setDescription(`### <@`+ user +`> wurde zum Ticket hinzugefügt!`)
                           .setTimestamp()
                           .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                           .setColor(embed_color)
                           interaction.reply({
                               embeds: [AddedUser]
                           });
                       })
                    })
                } catch (err) {
                    const AddedUser = new EmbedBuilder()
                    .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                    .setDescription("### Es wurde kein Nutzer mit dem Nutzernamen " + username + " gefunden!")
                    .setTimestamp()
                    .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                    .setColor(embed_color)
                    interaction.reply({ embeds: [AddedUser], ephemeral: true });
                }*/
            }
            //Assign 0
            if (interaction.customId === "ticket-assign-modal") {
                const assignguy = interaction.fields.getTextInputValue('ticket-assign-0');
            
                const channel = interaction.guild.channels.cache.get(`${interaction.channel.id}`);
                const channelN = channel.name;

                const modifiedName = channelN.replace("-", " ");

                let userName = modifiedName.split(4);
                let newChannelName = "c-" + assignguy + "-u-" + userName;

                console.log(newChannelName);

                try {
                    channel.setName(newChannelName);

                    const AssignedEmbed = new EmbedBuilder()
                    .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                    .setDescription("### Das Ticket wurde an @" + assignguy + " übergeben!")
                    .setTimestamp()
                    .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                    .setColor(embed_color)
                    interaction.reply({ embeds: [AssignedEmbed], ephemeral: true })
                } catch (err) {
                    console.log(err);
                }
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
            //Claim
            if (interaction.customId.startsWith(`ticket-claim`)) {
                await interaction.deferUpdate()

                const channel = interaction.guild.channels.cache.get(`${interaction.channel.id}`);
                const channelNB = channel.name;

                if (channelNB.includes("c-")) {return;}

                let channelN = "c-" + interaction.user.username + "-u-" + channel.name;

                await channel.setName(channelN);
                
                const ClaimEmbed = new EmbedBuilder()
                .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                .setDescription("### Es wird Ihnen nun von " + interaction.user.username + " geholfen!")
                .setTimestamp()
                .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                .setColor(embed_color)
                channel.send({ embeds: [ClaimEmbed] })
            }  
            //Add User 0
            if (interaction.customId === "ticket-adduser") {

               const UserModal = new ModalBuilder()
                .setCustomId(`ticket-adduser-modal`)
                .setTitle(`SynHost.de Support`);

               const AddUsername = new TextInputBuilder()
                    .setCustomId(`ticket-adduser-0`)
                    .setLabel("Username")
                    .setPlaceholder("Gebe den Discord Nutzernamen an!")
                    .setStyle(TextInputStyle.Short)
                    .setMaxLength(100);

                const UserNameInput = new ActionRowBuilder().addComponents(AddUsername);
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
                    .setPlaceholder("Gib den Username deines Kollegen an!")
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