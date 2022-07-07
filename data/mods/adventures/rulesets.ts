// Note: These are the rules that formats use

import {Utils} from "../lib";

// The list of formats is stored in config/formats.js
export const Rulesets: {[k: string]: FormatData} = {

	// Rulesets
	///////////////////////////////////////////////////////////////////

"eeveelutionbatonpassclause": {
		effectType: 'ValidatorRule',
		name: 'Eeveelution Baton Pass Clause',
		desc: "Stops teams from having Pok&eacute;mon with Baton Pass aside from Eeveelutions",
		banlist: (species.id !== 'sylveon'  &&
		          species.id !== 'espeon'   &&
				  species.id !== 'jolteon'  &&
				  species.id !== 'flareon'  &&
				  species.id !== 'umbreon'  &&
				  species.id !== 'leafeon'  &&
				  species.id !== 'vaporeon' &&
				  species.id !== 'glaceon'  &&
				  pokemon.baseMoves.includes === 'Baton Pass'),
		onBegin() {
			this.add('rule', 'Eeveelution Baton Pass Clause: Non-Eeveelutions cannot have Baton Pass');
		},
	},
	
};