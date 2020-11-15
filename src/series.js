class Series{

    constructor(){
        this.id = 0;
        this.bloc = 0;
        this.name = "";
        this.date = null;
        this.total = 0;
        this.abbreviations = [];
    }

    /**
     * Easy initializer for unit tests
     * 
     * @param {string} name 
     * @param {Date} date 
     * @param {string[]} abbreviations 
     */
    static fromTestData(name, date, abbreviations){
        let series = new Series();
        series.name = name;
        series.date = date;
        series.abbreviations = abbreviations;

        return series;
    }

    /**
     * Adds an abbreviation to this series
     * 
     * @param {string} abbreviation 
     */
    addAbbreviation(abbreviation){
        this.abbreviations.push(abbreviation);
    }

    /**
     * Checks if this series matches the given abbreviation
     * 
     * @param {string} abbreviation
     * @returns {boolean}
     */
    matches(abbreviation){
        return this.abbreviations.includes(abbreviation);
    }

    /**
     * Checks if this object equals the other Series object given
     * 
     * @param {Series} other 
     * @returns {boolean} true if it's considered equal
     */
    equals(other){
        return other != null && this.name === other.name && this.date === other.date;
    }

    /**
     * Represents this object in a more comfortable string form
     * @returns {string}
     */
    toString(){
        return `[${this.name}|${this.abbreviations.join(',')}]`;
    }

}
module.exports = Series;