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

	// Sw/Sh Singles
	///////////////////////////////////////////////////////////////////

	{
		section: "Official Formats",
	},
	{
		name: "Adventures OU",
		desc: `The standard format for Adventures.`,
		mod: 'adventures',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod',],
		banlist: [ 'Uber', 'AG',],
	},
	{
		name: "Adventures UU",

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
		name: "Adventures RU",

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
		name: "Adventures NU",

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
		name: "Adventures AG",
		mod: 'adventures',
		ruleset: ['Obtainable Good', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause'],
	},
	{
		section: "Side Formats",
	},
	{
		name: "Random Battle",
		mod: 'adventures',
		team: 'random',
		ruleset: ['PotD', 'Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod'],
	},
	{
		name: "Adventures Doubles OU",
		mod: 'adventures',
		gameType: 'doubles',
		ruleset: ['Standard Natdex', 'Dynamax Clause', 'Swagger Clause'],
		banlist: ['DUber'],
	},
	{
		name: "Adventures 1v1",
		desc: `Bring three Pok&eacute;mon to Team Preview and choose one to battle.`,
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
		name: "Adventures Custom Game",

		mod: 'adventures',
		searchShow: false,
		debug: true,
		battle: {trunc: Math.trunc},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100'],
	},
	{
		name: "Adventures Free-For-All",
		mod: 'adventures',
		gameType: 'freeforall',
		rated: false,
		tournamentShow: false,
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod'],
		banlist: [ 'Uber', 'AG', ],
	},
	{
		name: "Adventures Multi Battle",

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
		name: "Adventures Free-For-All Custom Game",

		mod: 'adventures',
		gameType: 'freeforall',
		rated: false,
		tournamentShow: false,
		ruleset: ['Standard Doubles', 'Sleep Clause Mod', 'Dynamax Clause', '!Gravity Sleep Clause', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100'],
	},
	{
		name: "Adventures Doubles Custom Game",

		mod: 'adventures',
		gameType: 'doubles',
		searchShow: false,
		battle: {trunc: Math.trunc},
		debug: true,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100'],
	},
	{
		section: "Co-Formats",
	},
	{
		name: "Fierce Format",
		desc: `The format run by Fierce Flamethrower.`,
		mod: 'fierceformat',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod'],
		banlist: [ 'Uber', 'AG', 'Baton Pass', ],
	},
	{
		name: "Torcho's Territory",
		desc: `The format run by Torchic.`,
		mod: 'torchic',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod'],
		banlist: [ 'Uber', 'AG', 'Baton Pass', ],
	},
];
