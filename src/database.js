const Series = require('./series');
const Card = require('./card');

class Database{

    /**
     * 
     * @param {string[]} names
     * @returns {Card[]}
     */
    getCards(names){ throw Error("not implemented");};

    /**
     * Checks if an abbreviation belongs to a known Series.
     * 
     * @param {string} abbreviation
     * @returns {boolean}
     */
    isSeries(abbreviation){ throw Error("not implemented");};

    /**
     * Get a Series from a given abbreviation.
     * 
     * @param {string} abbreviation
     * @returns {Series}
     */
    getSeries(abbreviation){ throw Error("not implemented");};
}

module.exports = Database;