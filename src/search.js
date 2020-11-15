const Series = require('./series');
const Card = require('./card');
const ErrorCard = require('./errorCard');
const Database = require('./database');
const Utilities = require('./utilities');

class Search{

    /**
     * 
     * @param {Database} database 
     * @param {Utilities} utilities 
     */
    constructor(database, utilities){
        this.database = database;
        this.utilities = utilities;
    }

    /**
     * 
     * @param {string} message 
     * @returns {Card[]} cards matching
     */
    findCards(message){
        const pattern = /\[([^[\]]+)\]/g;
        const matches = [...message.matchAll(pattern)];
        if(matches.length == 0){
            return matches;
        }
        let result = [];
        for(const match of matches){
            result.push(this.identifyCard(match[1]));
        }
        return result;
    };

    /**
     * 
     * @param {string} cardName 
     * @returns {Card}
     */
    identifyCard(cardName){
        const parsedCard = this.parseCard(cardName);
        const names = parsedCard.names;
        const series = parsedCard.series;
        const number = parsedCard.number;
        let candidates = this.getCandidates(names);
        if(series != null && this.areCardsValid(candidates)){
            candidates = this.filterBySeries(candidates);
        }
        if(number != "" && this.areCardsValid(candidates)){
            candidates = this.filterByNumber(candidates);
        }

        if(this.areCardsValid(candidates)){
            candidates = this.filterLongNames(candidates);
            candidates = this.sortPerReleaseDate(candidates);
            return candidates[0];
        }
        return new ErrorCard();
    };

    /**
     * 
     * @param {string} cardName 
     * @returns {any}
     */
    parseCard(cardName){
        let names = cardName.split(' ');
        let series = null;
        let number = "";

        while(names.length > 1){
            /** @type {string} */
            let current = names.pop();
            if( !isNaN(current)){ // string is number
                number = current;
                continue;
            }
            // Expedition has the abbreviation EX - clashed with ex/EX cards
            if(current.toLocaleUpperCase() != "EX" && this.database.isSeries(current)){
                series = this.database.getSeries(current);
                continue;
            }
            names.push(current);
            break;
        }
        // todo filter bad strings
        return {names: names, series: series, number: number};
    };

    /**
     * Get cards that could match, based on the name substrings provided
     * @param {string[]} names 
     * @return {Card[]}
     */
    getCandidates(names){
        return this.database.getCards(names);
    };

    /**
     * Checks that a list of cards only contains valid cards
     * 
     * @param {Card[]} cards 
     * @returns {boolean}
     */
    areCardsValid(cards){
        if(cards == null){
            return false;
        }

        for(let i = 0; i < cards.length; i++){
            if(!cards[i].isValid()){
                return false;
            }
        }

        return true;
    };

    /**
     * 
     * @param {Card[]} cards 
     * @param {Series} series 
     * @returns {Card[]}
     */
    filterBySeries(cards, series){
        return cards.filter( (card)=>{ return card.series.equals(series); });
    };

    /**
     * 
     * @param {Card[]} card
     * @param {string} number
     * @returns {Card[]}
     */
    filterByNumber(cards, number){
        return cards.filter( (card)=>{ return card.number == number; });
    }

    /**
     * 
     * @param {Card[]} cards 
     * @returns {Card[]}
     */
    filterLongNames(cards){
        // Ignore Trainer/NRJ cards - we only have name issues with Pokémon
        let containsPokemon = false;
        for(let i = 0; i < cards.length; i++){
            if(this.utilities.isPokemon(cards[i])){
                containsPokemon = true;
                break;
            }
        }
        if(!containsPokemon){
            return cards;
        }
        const sortedByNameLength = cards.sort( (a,b)=>{ return a.length - b.length; } );
        let shortestLength = sortedByNameLength[0].name.length;
        let result = sortedByNameLength.filter( (card)=>{ return card.name.length <= shortestLength; } );
        return result;
    };

    /**
     * Sort cards from the last released first to the oldest last
     * 
     * @param {Card[]} cards 
     * @returns {Card[]}
     */
    sortPerReleaseDate(cards){
        let result = cards.sort( 
            /**
             * if a is newest, we want a first => b-a will return -1 and a will stay with a lower index
             * @param {Card} a
             * @param {Card} b
             */
            (a,b)=>{
                return (b.series.date - a.series.date);
            });
        
        return result;
    };

}
module.exports = Search;