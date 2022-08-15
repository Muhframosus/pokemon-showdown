export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
init() {
//-NEW MOVES START

this.modData('Learnsets', 'drifblim').learnset.hurricane = ['8L1'];
this.modData('Learnsets', 'drifblim').learnset.poltergeist = ['8L1'];
this.modData('Learnsets', 'drifblim').learnset.flamethrower = ['8L1'];
this.modData('Learnsets', 'drifblim').learnset.aeroblast = ['8L1'];




//NEW MOVES END-

//-REMOVE MOVES START

//havent figured it out yet--

//REMOVE MOVES END-
		
		
		// Give Frustration, Return and Toxic to all gen 8 - Credit goes to Heat Enteis
		const gen8mons = require('./../../pokedex').Pokedex;
		const gen8monsKeys = Object.keys(gen8mons);
		for (const mon of gen8monsKeys) {
			const currMon = gen8mons[mon];
			// baseSpecies mons inherit movepool from another movepool so adding to them will cause an error.
			// baseSpecies is otherwise undefined which is falsy, so we can check that way.
			if (currMon.num >= 810 && currMon.num <= 898 && !currMon.baseSpecies) {
				this.modData('Learnsets', mon).learnset.return = ['8L1'];
				this.modData('Learnsets', mon).learnset.frustration = ['8L1'];
				this.modData('Learnsets', mon).learnset.toxic = ['8L1'];
			}
		}
	},
	// - Credit goes to Heat Enteis
	ccanMegaEvo(pokemon) {
		const species = pokemon.baseSpecies;
		const altForme = species.otherFormes && this.dex.getSpecies(species.otherFormes[0]);
		const item = pokemon.getItem();
		// Mega Rayquaza
		if ((this.gen <= 7 || this.ruleTable.has('standardnatdex')) &&
			altForme?.isMega && altForme?.requiredMove &&
			pokemon.baseMoves.includes(this.toID(altForme.requiredMove)) && !item.zMove) {
			return altForme.name;
		}
		// changed so that it is based on exact mon instead of dex number
		if (item.megaEvolves === pokemon.species.name && item.megaStone !== species.name) {
			return item.megaStone;
		}
		return null;
	    },

	//Clientside Stuff, dont worry about it.
    teambuilderConfig: {
         // only to specify the order of custom tiers
        customTiers: ['Adventures OU', 'Adventures UU', 'Adventures Ubers', 'Adventures 1v1', 'Adventures Free For All', 'Adventures Multi Battle', 'Adventures Custom Game', 'Adventures FFA Custom Game'],
        customDoublesTiers: ['Adventures DOU', 'Adventures DUU',],
		  // use sprites from a certain past gen where available
		spriteGen: 8,
    
    },
};
