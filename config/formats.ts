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
		section: "National Dex",
	},
	{
		name: "[Gen 8] Adventures OU",
		desc: `The standard format for Adventures.`,
		mod: 'adventures',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod'],
		banlist: [ 'Uber', 'AG', 'Baton Pass', ],
	},
	{
		name: "[Gen 8] Adventures UU",

		mod: 'adventures',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod'],
		banlist: [
			// National Dex OU
			 'OU', 'AG', 'UUBL', 'Uber', 'Drought', 'Drizzle', 'Arena Trap', 'Shadow Tag', 'Baton Pass',
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
			 'OU', 'UU', 'UUBL', 'AG', 'Uber', 'Drought', 'Drizzle', 'Arena Trap', 'Shadow Tag', 'Baton Pass',
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
			 'OU', 'UU', 'RU', 'AG', 'UUBL', 'Uber', 'Drought', 'Drizzle', 'Arena Trap', 'Shadow Tag', 'Baton Pass',
			// Slowbronite is banned so it doesn't validate on Galarian Slowbro
			'Slowbronite',
		],
	},
	{
		name: "[Gen 8] Adventures DOU",
		mod: 'adventures',
		gameType: 'doubles',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod'],
		banlist: [
			'Uber', 'AG', 'Baton Pass',
		],
	},
	{
		name: "[Gen 8] Adventures DUU",
		mod: 'adventures',
		gameType: 'doubles',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod'],
		banlist: [
			// National Dex OU
			 'DOU', 'AG', 'Uber', 'Drought', 'Drizzle', 'Arena Trap', 'Shadow Tag', 'Baton Pass',
			, // National Dex UUBL
			// Slowbronite is banned so it doesn't validate on Galarian Slowbro
			'Slowbronite',
		],
		// Used to distinguish UU from below UU in the client
	},
	{
		name: "[Gen 8] Adventures Ubers",
		mod: 'adventures',
		ruleset: ['Standard NatDex', 'Dynamax Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Sleep Clause Mod',],
		banlist: ['AG', 'Baton Pass',],
	},
	{
		name: "[Gen 8] Adventures AG",
		mod: 'adventures',
		ruleset: ['Standard NatDex'],
	},
];
