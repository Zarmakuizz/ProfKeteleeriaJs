const Card = require('./card');

class ErrorCard extends Card{

    constructor(){
        super();
    }

    /**
     * This error card is obviously not valid.
     * @returns {boolean} false
     */
    isValid(){
        return false;
    }

    /**
     * An error card can only equal another error card
     * @param {Card} other 
     */
    equals(other){
        return this.isValid() === other.isValid();
    }

    toString(){
        return "Invalid Card";
    }
}
module.exports = ErrorCard;