// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.ts
/*
If you want to add custom formats, create a file in this folder named: "custom-formats.ts"

Paste the following code into the file and add your desired formats and their sections between the brackets:
--------------------------------------------------------------------------------
// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.ts

export const Formats: FormatList = [
];
--------------------------------------------------------------------------------

If you specify a section that already exists, your format will be added to the bottom of that section.
New sections will be added to the bottom of the specified column.
The column value will be ignored for repeat sections.
*/

export const Formats: FormatList = [

	
	{
		section: "Official Formats",
	},
	{
		name: "[Gen 8] Adventures OU",
		desc: `The standard format for Adventures.`,
		mod: 'adventures',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod',],
		banlist: [ 'Uber', 'AG',],
	},
	{
		name: "[Gen 8] Adventures UU",

		mod: 'adventures',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod'],
		banlist: [
			// National Dex OU
			 'OU', 'AG', 'UUBL', 'Uber', 'Drought', 'Drizzle', 'Arena Trap', 'Shadow Tag',
			// Slowbronite is banned so it doesn't validate on Galarian Slowbro
			'Slowbronite',
		],
	},
	{
		name: "[Gen 8] Adventures RU",

		mod: 'adventures',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod'],
		banlist: [
			// National Dex OU
			 'OU', 'AG', 'UUBL', 'UU', 'Uber', 'Drought', 'Drizzle', 'Arena Trap', 'Shadow Tag',
			// Slowbronite is banned so it doesn't validate on Galarian Slowbro
			'Slowbronite',
		],
	},
	{
		name: "[Gen 8] Adventures NU",

		mod: 'adventures',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod'],
		banlist: [
			// National Dex OU
			 'OU', 'AG', 'UUBL', 'UU', 'RU', 'Uber', 'Drought', 'Drizzle', 'Arena Trap', 'Shadow Tag',
			// Slowbronite is banned so it doesn't validate on Galarian Slowbro
			'Slowbronite',
		],
	},
	{
		name: "[Gen 8] Adventures AG",
		mod: 'adventures',
		ruleset: ['Obtainable Good', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause'],
	},
	
	{
		section: "Co-Formats",
	},
	
	{
		name: "[Gen 8] Fierce Format",
		desc: `The format run by Fierce Flamethrower.`,
		mod: 'fierceformat',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod'],
		banlist: [ 'Uber', 'AG', 'Baton Pass', ],
	},
	
	{
		section: "Side Formats",
	},
	{
		name: "[Gen 8] Random Battle - DO NOT USE FOR NOW",
		mod: 'adventures',
		team: 'random',
		ruleset: ['PotD', 'Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod'],
	},
	{
		name: "[Gen 8] Gen 8 Random Battle",
		desc: `Randomized teams of level-balanced Pok&eacute;mon with sets that are generated to be competitively viable.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656537/">Random Battle Suggestions</a>`,
		],

		mod: 'gen8',
		team: 'random',
		ruleset: ['PotD', 'Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod'],
	},
	{
		name: "[Gen 8] Adventures Doubles",
		desc: `Bring six Pok&eacute;mon to Team Preview and choose three to a 2v2 battle.`,
		mod: 'adventures',
		gameType: 'doubles',
		ruleset: ['Standard Natdex', 'Dynamax Clause', 'Swagger Clause', 'Picked Team Size = 3'],
		banlist: ['Uber', 'AG',],
	},
	{
		name: "[Gen 8] Adventures 1v1",
		desc: `Bring three Pok&eacute;mon to Team Preview and choose one to a 1v1 battle.`,
		mod: 'adventures',
		ruleset: [
			'Picked Team Size = 1', 'Max Team Size = 3',
			'Standard NatDex', 'Dynamax Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Sleep Clause Mod',
		],
		banlist: [
			'Calyrex-Ice', 'Calyrex-Shadow', 'Cinderace', 'Dialga', 'Dragonite', 'Eternatus', 'Genesect', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Jirachi',
			'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Lugia', 'Lunala', 'Magearna', 'Marshadow', 'Melmetal', 'Mew', 'Mewtwo', 'Mimikyu', 'Necrozma-Dawn-Wings',
			'Necrozma-Dusk-Mane', 'Palkia', 'Rayquaza', 'Reshiram', 'Sableye', 'Snorlax', 'Solgaleo', 'Victini', 'Xerneas', 'Yveltal', 'Zacian', 'Zacian-Crowned',
			'Zamazenta', 'Zamazenta-Crowned', 'Zekrom', 'Moody', 'Bright Powder', 'Focus Band', 'Focus Sash', 'Lax Incense', 'Quick Claw', 'Perish Song',
		],
	},
	
	{
		section: "Misc Formats",
	},
	
	{
		name: "[Gen 8] Adventures Custom Game",

		mod: 'adventures',
		debug: true,
		rated: false,
		battle: {trunc: Math.trunc},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100'],
	},
	
	{
		name: "[Gen 8] Adventures Free-For-All",
		mod: 'adventures',
		gameType: 'freeforall',
		rated: false,
		tournamentShow: false,
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod'],
		banlist: [ 'Uber', 'AG', ],
	},
	
	{
		name: "[Gen 8] Adventures Multi Battle",

		mod: 'adventures',
		gameType: 'multi',
		tournamentShow: false,
		rated: false,
		ruleset: [
			'Max Team Size = 3',
			'Obtainable Good', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod',
		],
	},
	
	{
		name: "[Gen 8] Adventures Free-For-All Custom Game",

		mod: 'adventures',
		gameType: 'freeforall',
		rated: false,
		tournamentShow: false,
		ruleset: ['Standard Doubles', 'Sleep Clause Mod', 'Dynamax Clause', '!Gravity Sleep Clause', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100'],
	},
	
	{
		name: "[Gen 8] Adventures Doubles Custom Game",

		mod: 'adventures',
		gameType: 'doubles',
		rated: false,
		battle: {trunc: Math.trunc},
		debug: true,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100'],
	},
    	
	//{
	//	name: "Torcho's Territory",
	//	desc: `The format run by Torchic.`,
	//	mod: 'torchic',
	//	ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod'],
	//	banlist: [ 'Uber', 'AG', 'Baton Pass', ],
	//},
];
