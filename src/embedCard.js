const Discord = require('discord.js');
const Card = require('./card');
const Utilities = require('./utilities');

class EmbedCard{

    /**
     * 
     * @param {Card} card 
     * @param {Utilities} utilities
     */
    constructor(card, utilities){
        this.card = card;
        this.utilities = utilities;
    }

    /**
     * 
     * @returs {RichEmbed}
     */
    get(){
        return this.getBasicEmbed();
    }

    /**
     * 
     * @returs {RichEmbed}
     */
    getBasicEmbed(){
        let embed = new Discord.RichEmbed()
            .setColor(this.utilities.getColor(this.card.type))
            .setURL(this.utilities.getLinkToSeries(this.card))
            .setAuthor(this.card.name, this.utilities.getLinkToTypeIcon(this.card.type), this.utilities.getLinkToSeries(this.card))
            .setImage(this.utilities.getLinkToThumbnail(this.card))
        ;

        return embed;
    }

    /**
     * 
     * @returs {RichEmbed}
     */
    getRichEmbed(){
        // todo
        return null;
    }

}

module.exports = EmbedCard;