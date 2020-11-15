const Series = require('../src/series');
const Card = require('../src/card');
const Database = require('../src/database');

class FakeDatabase extends Database{

    constructor(){
        super();
        let teamUp = Series.fromTestData("Team Up", Date.parse('2019-02-04'), ['TEU', 'SM09', 'SM9']);
        let rebelClash = Series.fromTestData("Rebel Clash", Date.parse('2020-05-21'), ['SWSH2']);
        let celestialStorm = Series.fromTestData("Celestial Storm", Date.parse('2018-08-04'), ['SM7']);
        let oldSet = Series.fromTestData("who cares", Date.parse('2015-01-01'), ['']);

        this.cards = [
            Card.fromTestData("Jirachi", oldSet, 42),
            Card.fromTestData("Pikachu", oldSet, 25),
            Card.fromTestData("Jirachi", teamUp, 99),
            Card.fromTestData("Jirachi {*}", celestialStorm, 80),
            Card.fromTestData("Pikachu GX", oldSet, 26),
            Card.fromTestData("Pikachu EX", oldSet, 26),
            Card.fromTestData("Pikachu&Zekrom GX", teamUp, 33),
            Card.fromTestData("Inteleon V", rebelClash, 49),
            Card.fromTestData("Inteleon Vmax", rebelClash, 50),
        ];
        this.buildSeries();
    }

    buildSeries(){
        this.series = [];
        this.cards.forEach( (card)=>{
            card.series.abbreviations.forEach( (abbr)=>{
                this.series[abbr] = card.series;
            });
        });
    };

    /**
     * 
     * @param {string[]} names
     * @returns {Card[]}
     */
    getCards(names){
        let results = [];
        const safeNames = names.map((name)=>{ return this.sanitizeName(name);});
        this.cards.forEach( (card)=>{
            const safeCardName = card.name.toLocaleLowerCase();
            const namePartMatches = safeNames.map( (name)=>{ return safeCardName.includes(name); });
            const isMatching = namePartMatches.reduce( (a,b)=>{ return a && b});
            if(isMatching){
                results.push(card);
            }
        });

        return results;
    };

    /**
     * 
     * @param {string} name 
     * @return {string}
     */
    sanitizeName(name){
        let result = name.toLocaleLowerCase();
        result = result.replace(/-ex$/, " ex");
        result = result.replace(/-gx$/, " gx");
        result = result.replace(/-vmax$/, " vmax");
        result = result.replace(/-v$/, " v");
        return result;
    };



    /**
     * Checks if an abbreviation belongs to a known Series.
     * 
     * @param {string} abbreviation
     * @returns {boolean}
     */
    isSeries(abbreviation){ 
        return this.series[abbreviation] != null;
    };

    /**
     * Get a Series from a given abbreviation.
     * 
     * @param {string} abbreviation
     * @returns {Series}
     */
    getSeries(abbreviation){
        return this.series[abbreviation];
    };
}

module.exports = FakeDatabase;