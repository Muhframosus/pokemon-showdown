export const Pokedex: {[k: string]: ModdedSpeciesData} = {

     palossand: {
		inherit: true,
		baseStats: {hp: 150, atk: 100, def: 135, spa: 100, spd: 85, spe: 20},
		abilities: {0: "Water Compaction", H: "Power Compaction", 1: "Sand Stream", },
	 },
     claydol: {
		inherit: true,
		baseStats: {hp: 75, atk: 45, def: 135, spa: 115, spd: 120, spe: 75},
		abilities: {0: "Levitate", H: "Analytic", 1: "Magic Guard", },
	 },
     drifblim: {
		inherit: true,
		baseStats: {hp: 150, atk: 95, def: 55, spa: 108, spd: 55, spe: 80},
	 },
     genesect: {
		inherit: true,
		baseStats: {hp: 71, atk: 120, def: 95, spa: 120, spd: 95, spe: 99},
		abilities: {0: "Mega Launcher"},
	 },
     aggronmega: {
		inherit: true,
		baseStats: {hp: 70, atk: 140, def: 230, spa: 60, spd: 80, spe: 50},
            types: ["Steel", "Dragon"],
		abilities: {0: "Filter"},
      },	
      }	