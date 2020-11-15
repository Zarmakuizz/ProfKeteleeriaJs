const Card = require('./card');

/**
 * Interface for various utilities to pimp your Embed
 * Override depending on your platform
 */
class Utilities{

    /**
     * Returns a color depending on the card type.
     * 
     * @param {int} idType Id of the type requested
     * @returns {string} Color in hexadecimal RGB string form, i.e. #ffffff for white;
     */
    getColor(idType){
        return "#ffffff";
    };

    /**
     * Returns the link to the given type id
     * 
     * @param {int} idType 
     * @returns {string} URL to the icon
     */
    getLinkToTypeIcon(idType){
        return "https://assets.pokemon.com/static2/_ui/img/cards/energy-types.png";
    };

    /**
     * 
     * @param {Card} card 
     * @returns {string} link
     */
    getLinkToThumbnail(card){
        return "https://assets.pokemon.com/assets/cms2/img/cards/web/SWSH3/SWSH3_EN_2.png";
    };

    /**
     * Determines if the card represents a Pokémon or not
     * 
     * @param {Card} card 
     * @returns {boolean}
     */
    isPokemon(card){
        return true;
    };


    /**
     * For a given Card, retrieves the link to consult the related series
     * 
     * @param {Card} card 
     * @returns {string} Link to consult the series
     */
    getLinkToSeries(card){
        return "https://www.pokemon.com/uk/pokemon-tcg/pokemon-cards/?"
    };
}

module.exports = Utilities;