const Series = require('./series');
const EmbedCard = require('./embedCard');

class Card{

    constructor(){
        this.id = 0;
        this.name = "";
        this.number = "";
        this.type = 0;
        this.series = null;
    }

    /**
     * 
     * @param {string} name 
     * @param {Series} series 
     * @param {string} number 
     */
    static fromTestData(name, series, number){
        let card = new Card();
        card.name = name;
        card.series = series;
        card.number = number;

        return card;
    }

    /**
     * We need to differentiate valid cards from erroneous instances.
     * @returns {boolean} 
     */
    isValid(){
        return true;
    }

    /**
     * Exports the card to a type to embed on Discord
     * @param {Utilities} utilities 
     * @returns {RichEmbed}
     */
    toEmbed(utilities){
        return new EmbedCard(this, utilities).get();
    }

    equals(other){
        return this.isValid() && other != null && other.isValid() && 
                this.name === other.name && this.number == other.number;
    }

    toString(){
        return `${this.name} ${this.series.toString()}`;
    }
}

module.exports = Card;