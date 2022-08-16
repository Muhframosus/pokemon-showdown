/*

List of flags and their descriptions:

authentic: Ignores a target's substitute.
bite: Power is multiplied by 1.5 when used by a Pokemon with the Strong Jaw Ability.
bullet: Has no effect on Pokemon with the Bulletproof Ability.
charge: The user is unable to make a move between turns.
contact: Makes contact.
dance: When used by a Pokemon, other Pokemon with the Dancer Ability can attempt to execute the same move.
defrost: Thaws the user if executed successfully while the user is frozen.
distance: Can target a Pokemon positioned anywhere in a Triple Battle.
gravity: Prevented from being executed or selected during Gravity's effect.
heal: Prevented from being executed or selected during Heal Block's effect.
mirror: Can be copied by Mirror Move.
mystery: Unknown effect.
nonsky: Prevented from being executed or selected in a Sky Battle.
powder: Has no effect on Grass-type Pokemon, Pokemon with the Overcoat Ability, and Pokemon holding Safety Goggles.
protect: Blocked by Detect, Protect, Spiky Shield, and if not a Status move, King's Shield.
pulse: Power is multiplied by 1.5 when used by a Pokemon with the Mega Launcher Ability.
punch: Power is multiplied by 1.2 when used by a Pokemon with the Iron Fist Ability.
recharge: If this move is successful, the user must recharge on the following turn and cannot make a move.
reflectable: Bounced back to the original user by Magic Coat or the Magic Bounce Ability.
snatch: Can be stolen from the original user and instead used by another Pokemon using Snatch.
sound: Has no effect on Pokemon with the Soundproof Ability.

*/

export const Moves: {[moveid: string]: MoveData} = {
// Mega Launcher Implementation Start
	zapcannon: {
	inherit: true,
    flags: {bullet: 1, protect: 1, mirror: 1, pulse: 1},	
	},
	flashcannon: {
	inherit: true,
    flags: {protect: 1, mirror: 1, pulse: 1},	
	},
	dynamaxcannon: {
	inherit: true,
    flags: {protect: 1, pulse: 1},	
	},
	fleurcannon: {
	inherit: true,
	flags: {protect: 1, mirror: 1, pulse: 1},
	},
	gmaxcannonade: {
	inherit: true,
	flags: {pulse: 1},
	},
	hydrocannon: {
	inherit: true,
    flags: {recharge: 1, protect: 1, mirror: 1, pulse: 1},	
	},
	spikecannon: {
	inherit: true,
	basePower: 25,
	type: "Ground",
    flags: {recharge: 1, protect: 1, mirror: 1, pulse: 1},	
	},
// Mega Launcher Implementation End

//Move changes
	snore: {
		inherit: true,
		basePower: 120,
	},
	suckerpunch: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1},
	},
		iciclecrash: {
		inherit: true,
		accuracy: 100,
	},
	honeclaws: {
		desc: "Raises the user's attack by 1 and accuracy by 2.",
		shortDesc: "Raises the user's attack by 1 and accuracy by 2.",
		inherit: true,
		boosts: {
		atk: 1,
		accuracy: 2,	 
	  },
	},
	lifedew: {
		desc: "Heals status and 1/3 max HP of self and allies.",
		shortDesc: "Heals status and 1/3 max HP of self and allies.",
		num: 791,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Life Dew",
		pp: 10,
		priority: 0,
		flags: {heal: 1, authentic: 1, mystery: 1},
		onHit(pokemon) {
			const success = !!this.heal(this.modify(pokemon.maxhp, 0.33));
			return pokemon.cureStatus() || success;
		},
		secondary: null,
		target: "allies",
		type: "Water", 
	},
	shoreup: {
		num: 659,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Shore Up",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather()) {
			case 'sandstorm':
				factor = 0.667;
				break;
			case 'raindance':
			case 'primordialsea':
				factor = 0.25;
				break;
			}
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
		secondary: null,
		target: "self",
		type: "Ground",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Beautiful",
	},
	dragonrage: {
		desc: "Deals damage equal to the user's level.",
		shortDesc: "Deals damage equal to the user's level.",
		num: 82,
		accuracy: 100,
		basePower: 0,
		damage: 'level',
		category: "Physical",
		name: "Dragon Rage",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, nonsky: 1},
		secondary: null,
		target: "normal",
		type: "Dragon",
		maxMove: {basePower: 100},
		contestType: "Tough",
	},
	armthrust: {
		inherit: true,
		basePower: 25,
	},
	furyswipes: {
		desc: "Hits 2-5 times. High critical hit ratio.",
		shortDesc: "Hits 2-5 times. Hig critical hit ratio.",
		inherit: true,
		basePower: 20,
		critRatio: 3,
	},
	diamondstorm: {
		inherit: true,
		accuracy: 100,
	},
	drillrun: {
		desc: "High critical hit ratio.",
		shortDesc: "High critical hit ratio.",
		inherit: true,
		accuracy: 100,
		critRatio: 3,
	},
	razorshell: {
		desc: "100% chance to increase the target's Defense by 1 stage.",
		shortDesc: "100% chance to lower the target's Def by 1 .",
		inherit: true,
		accuracy: 100,
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
	},
	highhorsepower: {
		desc: "20% chance to increase the user's Speed by 1 stage.",
		shortDesc: "20% chance to increase the user's Spe by 1 .",
		inherit: true,
		basePower: 90,
		accuracy: 90,
		secondary: {
			chance: 20,
			self: {
				boosts: {
					spe: 1,
				},
			},
		}
	},
	wildcharge: {
		basePower: 120,
		inherit: true,
	},
	volttackle: {
		basePower: 130,
		secondary: {
			chance: 30,
			status: 'par',
		},
		inherit: true,
	},
	explosion: {
		desc: "Hits adjacent Pokemon. User faints. Always results in a critical hit.",
		shortDesc: "Hits adjacent Pokemon. User faints. Always results in a critical hit.",
		inherit: true,
		category: "Special",
		critRatio: 5,
	},
	selfdestruct: {
		desc: "Hits adjacent Pokemon. User faints. Always results in a critical hit.",
		shortDesc: "Hits adjacent Pokemon. User faints. Always results in a critical hit.",
		inherit: true,
		basePower: 250,
		critRatio: 5,
	},
	mistyexplosion: {
		desc: "User faints. Power doubles on Misty terrain. Always results in a critical hit.",
		shortDesc: "User faints. User on Misty terrain: 2.0x power. Always results in a critical hit.",
		inherit: true,
		basePower: 125,
		critRatio: 5,
		onBasePower(basePower, source) {
			if (this.field.isTerrain('mistyterrain') && source.isGrounded()) {
				this.debug('misty terrain boost');
				return this.chainModify(2);
			}
		}
	},
	octazooka: {
		num: 190,
		accuracy: 85,
		basePower: 110,
		category: "Special",
		name: "Octazooka",
		pp: 10,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		critRatio: 3,
		target: "normal",
		type: "Water",
		contestType: "Tough",
	},
	dancinglights: {
		num: 147,
		desc: "Puts the enemy to sleep.",
		shortDesc: "Puts the enemy to sleep.",
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Dancing Lights",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		status: 'slp',
		secondary: null,
		target: "normal",
		type: "Electric",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Beautiful",
	},
	triplekick: {
		num: 167,
		accuracy: 90,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 20 * move.hit;
		},
		category: "Physical",
		name: "Triple Kick",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		multihit: 3,
		multiaccuracy: true,
		secondary: null,
		target: "normal",
		type: "Fighting",
		zMove: {basePower: 120},
		maxMove: {basePower: 140},
		contestType: "Cool",
	},
	tyrantchomp: {
		desc: "10% chance to flinch.",
		shortDesc: "10% chance to flinch.",
		num: -1,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Tyrant Chomp",
		pp: 15,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		secondary: {
				chance: 10,
				volatileStatus: 'flinch',
			},
		target: "normal",
		type: "Dragon",
		contestType: "Cool",
	},
	toxicthread: {
		desc: "Badly poisons the target and prevents it from switching out.",
		shortDesc: "Badly poisons the target and prevents it from switching out.",
		num: 672,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		isNonstandard: "Past",
		name: "Toxic Thread",
		pp: 5,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		status: 'tox',
		onHit(target, source, move) {
			return target.addVolatile('trapped', source, move, 'trapper');
		},
		boosts: null,
		secondary: null,
		target: "normal",
		type: "Poison",
		zMove: {boost: {spe: 1}},
		contestType: "Tough",
	},
	licky: {
		num: 35,
		basePower: 15,
		category: "Physical",
		name: "Licky",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough",
		accuracy: 85,
		ignoreImmunity: true,
		volatileStatus: 'lickytrapped',
		self: {
			volatileStatus: 'lickytrappinglock',
		},
		// FIXME: onBeforeMove(pokemon, target) {target.removeVolatile('mustrecharge')}
		onHit(target, source) {
			/**
			 * The duration of the partially trapped must be always renewed to 2
			 * so target doesn't move on trapper switch out as happens in gen 1.
			 * However, this won't happen if there's no switch and the trapper is
			 * about to end its partial trapping.
			 **/
			if (target.volatiles['lickytrapped']) {
				if (source.volatiles['lickytrappinglock'] && source.volatiles['lickytrappinglock'].duration > 1) {
					target.volatiles['lickytrapped'].duration = 2;
				}
			}
		},
	},
	poisonfang: {
		inherit: true,
		basePower: 50,
		secondary: {
			chance: 100,
			status: 'tox',
		},
	},
	dizzypunch: {
		desc: "Hits twice. Each hit has a 20% chance to confuse the target and a 20% chance to flinch.",
		shortDesc: "Hits twice. Each hit has a 20% chance to confuse and a 20% chance to flinch.",
		inherit: true,
		accuracy: 85,
		basePower: 45,
		category: "Physical",
		name: "Dizzy Punch",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		multihit: 2,
		secondaries: [
			{
				chance: 20,
				volatileStatus: 'confusion',
			}, 
			{
				chance: 20,
				volatileStatus: 'flinch',
			},
		],
		target: "normal",
		type: "Fighting",
		zMove: {basePower: 180},
		maxMove: {basePower: 140},
		contestType: "Clever",
	},
	beakblast: {
		inherit: true,
		basePower: 120,
	},
	aurorabeam : {
		desc: "100% chance to lower the target's Attack by 1 stage.",
		shortDesc: "100% chance to lower target's Atk by 1.",
		inherit: true,
		basePower: 75,
		secondary: {
			chance: 100,
			boosts: {
				atk: -1,
			}
		}
	},
	technoblast : {
		inherit: true,
		basePower: 150,
	},
	present: {
		desc: "80, 160, 240 power, or heals target 1/4 max HP.",
		shortDesc: "80, 160, 240 power, or heals target 1/4 max HP.",
		inherit: true,
		type: "Flying",
		onModifyMove(move, pokemon, target) {
			const rand = this.random(10);
			if (rand < 2) {
				move.heal = [1, 4];
				move.infiltrates = true;
			} else if (rand < 6) {
				move.basePower = 80;
			} else if (rand < 9) {
				move.basePower = 160;
			} else {
				move.basePower = 240;
			}
		}
	},
	jawlock: {
		inherit: true,
		type: "Rock",
	},
	xscissor: {
		inherit: true,
		critRatio: 3,
	},
	bonemerang: {
		inherit: true,
		basePower: 60,
	},
	shadowbone: {
		desc: "100% chance to lower the target's Defense by 1 stage.",
		shortDesc: "100% chance to lower target's Def by 1.",
		inherit: true,
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			}
		}
	},
	snipeshot: {
		inherit: true,
		basePower: 100
	},
	paraboliccharge: {
		inherit: true,
		basePower: 75
	},
	revelationdance: {
		desc: "Type varies based on the user's primary type. Physical if Atk > SpA.",
		shortDesc: "Type varies based on the user's primary type. Physical if Atk > SpA.",
		inherit: true,
		basePower: 120,
		category: "Special",
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
	},
	focusenergy: {
		desc: "Increases the user's critical hit ratio by 4.",
		shortDesc: "Increases the user's crit ratio by 4.",
		inherit: true,
		volatileStatus: 'focusenergy',
		condition: {
			onStart(target, source, effect) {
				if (effect?.id === 'zpower') {
					this.add('-start', target, 'move: Focus Energy', '[zeffect]');
				} else if (effect && (['imposter', 'psychup', 'transform'].includes(effect.id))) {
					this.add('-start', target, 'move: Focus Energy', '[silent]');
				} else {
					this.add('-start', target, 'move: Focus Energy');
				}
			},
			onModifyCritRatio(critRatio) {
				return critRatio + 4;
			},
		},
	},
	psychocut: {
		inherit: true,
		critRatio: 3,
	},
	razorleaf: {
		inherit: true,
		critRatio: 3,
	},
	razorwind: {
		inherit: true,
		critRatio: 3,
	},
	shadowclaw: {
		inherit: true,
		critRatio: 3,
	},
	skyattack: {
		inherit: true,
		critRatio: 3,
	},
	slash: {
		inherit: true,
		basePower: 80,
		critRatio: 3,
	},
	snipeshot: {
		inherit: true,
		critRatio: 3,
	},
	spacialrend: {
		inherit: true,
		critRatio: 3,
	},
	stoneedge: {
		inherit: true,
		critRatio: 3,
	},
	"10000000voltthunderbolt": {
		inherit: true,
		critRatio: 5,
	},
	aeroblast: {
		inherit: true,
		critRatio: 3
	},
	aircutter: {
		inherit: true,
		critRatio: 3,
	},
	attackorder: {
		inherit: true,
		critRatio: 3,
	},
	blazekick: {
		inherit: true,
		critRatio: 3,
	},
	crabhammer: {
		inherit: true,
		critRatio: 3,
	},
	crosschop: {
		inherit: true,
		critRatio: 3,
	},
	crosspoison: {
		inherit: true,
		critRatio: 3,
	},
	karatechop: {
		inherit: true,
		critRatio: 3,
	},
	leafblade: {
		inherit: true,
		critRatio: 3,
	},
	nightslash: {
		inherit: true,
		basePower: 80,
		critRatio: 3,
	},
	flyingpress: {
		basePower: 120,
		zMove: {basePower: 190},
	},
	poisontail: {
		inherit: true,
		critRatio: 3,
	},
	decorate: {
		desc: "Restores 1/4 of an ally or self's max HP and gives it +1 SpD, +1 SpA.",
		shortDesc: "Restore's 1/4 HP of ally or self and gives it +1 SpD, +1 SpA.",
		inherit: true,
		heal: [1, 4],
		boosts: {
			spd: 1,
			spa: 1,
		},
		target: "adjacentAllyOrSelf",
	},	
	aircutter: {
		inherit: true,
		accuracy: 100,
		basePower: 80,
	},
	airslash: {
		inherit: true,
		accuracy: 100,
	},
	fly: {
		inherit: true,
		accuracy: 100,
	},
	sacredfire: {
		inherit: true,
		accuracy: 100,
	},
	shelltrap: {
		desc: "Usually goes first. Fails if target is not attacking.",
		shortDesc: "Usually goes first. Fails if target is not attacking.",
		num: 704,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		name: "Shell Trap",
		pp: 8,
		priority: 1,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTry(source, target) {
			const action = this.queue.willMove(target);
			const move = action?.choice === 'move' ? action.move : null;
			if (!move || (move.category === 'Status' && move.id !== 'mefirst') || target.volatiles['mustrecharge']) {
				return false;
			}
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Clever",
	},
	icehammer: {
		desc: "100% chance to lower the target's Speed by 1 stage.",
		shortDesc: "100% chance to lower target's Spe by 1.",
		inherit: true,
		self: null,
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			}
		}
	},
	hammerarm: {
		desc: "100% chance to lower the target's Speed by 1 stage.",
		shortDesc: "100% chance to lower target's Spe by 1.",
		inherit: true,
		self: null,
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			}
		}
	},
	dragonhammer: {
		desc: "High critical hit ratio.",
		shortDesc: "High critical hit ratio.",
		inherit: true,
		accuracy: 90,
		basePower: 100,
		pp: 10,
		critRatio: 3,
	},
	bulletpunch: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, bullet: 1, punch: 1},
	},
	defog: {
		desc: "-1 Evasion; clears terrain, screens, hazards and weather for both sides.",
		shortDesc: "-1 Evasion; clears terrain, screens, hazards and weather for both sides.",
		num: 432,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Defog",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
		onHit(target, source, move) {
			let success = false;
			this.field.clearTerrain();
			if (!target.volatiles['substitute'] || move.infiltrates) success = !!this.boost({evasion: -1});
			const removeTarget = [
				'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.conditions.get(targetCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.conditions.get(sideCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			this.field.clearTerrain();
			this.field.clearWeather();
			return success;
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		zMove: {boost: {accuracy: 1}},
		contestType: "Cool",
	},
	barrage: {
		desc: "Hits three times.",
		shortDesc: "Hits three times.",
		num: 140,
		accuracy: 100,
		basePower: 30,
		category: "Physical",
		name: "Barrage",
		isNonstandard: "Past",
		name: "Barrage",
		pp: 20,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		multihit: [3],
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Cute",
	},
	beatup: {
		num: 251,
		accuracy: 100,
		basePower: 0,
		basePowerCallback(pokemon, target, move) {
			return 10 + Math.floor(move.allies!.shift()!.species.baseStats.atk / 10);
		},
		category: "Physical",
		name: "Beat Up",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, mystery: 1},
		onModifyMove(move, pokemon) {
			move.allies = pokemon.side.pokemon.filter(ally => ally === pokemon || !ally.fainted && !ally.status);
			move.multihit = move.allies.length;
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Clever",
	},
	vcreate: {
		desc: "Lowers the user's Defense, Sp. Def, Speed by 1. Physical if user's Atk > SpA",
		shortDesc: "Lowers the user's Def, SpD, Spe by 1. Physical if user's Atk > SpA",
		num: 557,
		accuracy: 95,
		basePower: 180,
		category: "Special",
		name: "V-Create",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		self: {
			boosts: {
				spe: -1,
				def: -1,
				spd: -1,
			},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
			},
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		zMove: {basePower: 220},
		contestType: "Cool",
	},
	doublekick: {
		inherit: true,
		basePower: 45
	},
	metalburst: {
		priority: -5,
		inherit: true,
	},
	chargebeam: {
		desc: "100% chance to increase the user's Special Attack by 1 stage.",
		shortDesc: "100% chance to increase the user's SpA by 1.",
		num: 451,
		accuracy: 90,
		basePower: 60,
		name: "Charge Beam",
		category: "Special",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		target: "normal",
		type: "Electric",
		contestType: "Beautiful",
	},
	belch: {
		inherit: true,
		basePower: 140,
		accuracy: 100,
	},
	geargrind: {
		inherit: true,
		basePower: 75,
		accuracy: 100,
	},
	shadowpunch: {
		inherit: true,
		basePower: 75,
	},
	fly: {
		inherit: true,
		accuracy: 100,
	},
	circlethrow: {
		inherit: true,
		basePower: 80,
	},
	dragontail: {
		inherit: true,
		basePower: 80,
	},
	mobboss: {
		num: -15,
		accuracy: 100,
		basePower: 0,
		basePowerCallback(pokemon, target, move) {
			return 10 + Math.floor(move.allies!.shift()!.species.baseStats.atk / 10);
		},
		category: "Physical",
		name: "Mob Boss",
		desc: "Usually goes first. Hits the target one time for the user and one time for each unfainted Pokemon without a non-volatile status condition in the user's party. The power of each hit is equal to 10+(X/10), where X is each participating Pokemon's base Attack; each hit is considered to come from the user.",
		shortDesct: "Beat Up with +1 priority.",
		pp: 10,
		priority: 1,
		flags: {protect: 1, mirror: 1, mystery: 1},
		onModifyMove(move, pokemon) {
			move.allies = pokemon.side.pokemon.filter(ally => ally === pokemon || !ally.fainted && !ally.status);
			move.multihit = move.allies.length;
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Clever",
	},
	shatteringsteel: {
		num: -16,
		accuracy: 100,
		basePower: 150,
		name: "Shattering Steel",
		desc: "100% chance to lower the target's Defense by 2 stages.",
		shortDesc: "100% chance to lower target's Def by 2.",
		category: "Physical",
		pp: 1,
		noPPBoosts: true,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
				boosts: {
					def: -2,
				},
		},
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		zMove: {boost: {atk: 2}},
	},
	twineedle: {
		desc: "Hits twice. Each hit has 20% chance to badly poison.",
		shortDesc: "Hits twice. Each hit has 20% chance to badly poison.",
		num: 41,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		isNonstandard: "Past",
		name: "Twineedle",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		multihit: 2,
		secondary: {
			chance: 20,
			status: 'tox',
		},
		target: "normal",
		type: "Bug",
		maxMove: {basePower: 100},
		contestType: "Cool",
	},
	clearsmog: {
		num: 499,
		accuracy: true,
		basePower: 80,
		category: "Special",
		name: "Clear Smog",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit(target) {
			target.clearBoosts();
			this.add('-clearboost', target);
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Beautiful",
	},
	aromaticmist: {
		desc: "-1 Evasion; clears hazards and screens on both sides, then summons Misty Terrain.",
		shortDesc: "-1 Evasion; clears hazards and screens on both sides, then summons Misty Terrain.",
		num: 597,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Aromatic Mist",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1, nonsky: 1},
		onHit(target, source, move) {
			let success = false;
			if (!target.volatiles['substitute'] || move.infiltrates) success = !!this.boost({evasion: -1});
			const removeTarget = [
				'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.conditions.get(targetCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.conditions.get(sideCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			return success;
			},
		terrain: 'mistyterrain',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onSetStatus(status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (effect && ((effect as Move).status || effect.id === 'yawn')) {
					this.add('-activate', target, 'move: Misty Terrain');
				}
				return false;
			},
			onTryAddVolatile(status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (status.id === 'confusion') {
					if (effect.effectType === 'Move' && !effect.secondaries) this.add('-activate', target, 'move: Misty Terrain');
					return null;
				}
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Dragon' && defender.isGrounded() && !defender.isSemiInvulnerable()) {
					this.debug('misty terrain weaken');
					return this.chainModify(0.5);
				}
			},
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Misty Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Misty Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd(side) {
				this.add('-fieldend', 'Misty Terrain');
			},
			},
		secondary: null,
		target: "normal",
		type: "Fairy",
		zMove: {boost: {spd: 2}},
		contestType: "Beautiful",
	},
	twister: {
		desc: "10% chance to flinch.",
		shortDesc: "10% chance to flinch.",
		num: 239,
		accuracy: 80,
		basePower: 110,
		category: "Special",
		name: "Twister",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			volatileStatus: 'flinch',
		},
		target: "allAdjacentFoes",
		type: "Dragon",
		contestType: "Cool",
	},
	steameruption: {
		inherit: true,
		accuracy: 100,
	},
	toxicspikes: {
		num: 390,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Toxic Spikes",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1},
		sideCondition: 'toxicspikes',
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Toxic Spikes');
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasType('Poison')) {
					this.add('-sideend', pokemon.side, 'move: Toxic Spikes', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('toxicspikes');
				} else if (pokemon.hasType('Steel') || pokemon.hasItem('heavydutyboots') || pokemon.hasAbility('oblivious') || pokemon.hasAbility('suctioncups')) {
					return;
				} else {
					pokemon.trySetStatus('tox', pokemon.side.foe.active[0]);
				}
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Poison",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
	smellingsalts: {
		num: 265,
		accuracy: true,
		desc: "Heals the user of Paralysis and restores 25% of its max HP.",
		shortDesc: "Heals Paralysis and restores 25% max HP of allies.",
		basePowerCallback(pokemon, target, move) {
			if (target.status === 'par') return move.basePower * 2;
			return move.basePower;
		},
		category: "Status",
		isNonstandard: "Past",
		name: "Smelling Salts",
		pp: 10,
		priority: 0,
		flags: {heal: 1, authentic: 1, mystery: 1},
		onHit(pokemon) {
			const success = !!this.heal(this.modify(pokemon.maxhp, 0.25));
			if (pokemon.status === 'par') pokemon.cureStatus();
		},
		secondary: null,
		target: "allies",
		type: "Normal",
		contestType: "Tough",
	},
	curse: {
		desc: "If the user is a Ghost-type, removes 1/4 of the user's HP to Curse target. Else -1 Spe, +1 Atk, +1 Def.",
		shortDesc: "Curses if Ghost, else -1 Spe, +1 Atk, +1 Def.",
		num: 174,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Curse",
		pp: 10,
		priority: 0,
		flags: {authentic: 1},
		volatileStatus: 'curse',
		onModifyMove(move, source, target) {
			if (!source.hasType('Ghost')) {
				move.target = move.nonGhostTarget as MoveTarget;
			}
		},
		onTryHit(target, source, move) {
			if (!source.hasType('Ghost')) {
				delete move.volatileStatus;
				delete move.onHit;
				move.self = {boosts: {spe: -1, atk: 1, def: 1}};
			} else if (move.volatileStatus && target.volatiles['curse']) {
				return false;
			}
		},
		onHit(target, source) {
			this.directDamage(source.maxhp / 4, source, source);
		},
		condition: {
			onStart(pokemon, source) {
				this.add('-start', pokemon, 'Curse', '[of] ' + source);
			},
			onResidualOrder: 10,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / 4);
			},
		},
		secondary: null,
		target: "randomNormal",
		nonGhostTarget: "self",
		type: "Ghost",
		zMove: {effect: 'curse'},
		contestType: "Tough",
	},
	painsplit: {
		num: 220,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Pain Split",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, mystery: 1},
		onHit(target, pokemon) {
			if (Math.floor(target.getUndynamaxedHP() > 50)) {
			const targetHP = target.getUndynamaxedHP();
			const averagehp = Math.floor((targetHP + pokemon.hp) / 2) || 1;
			const targetChange = ((targetHP - averagehp) + 50);
			target.sethp(target.hp - targetChange);
			this.add('-sethp', target, target.getHealth, '[from] move: Pain Split', '[silent]');
			pokemon.sethp(averagehp + 50);
			this.add('-sethp', pokemon, pokemon.getHealth, '[from] move: Pain Split');
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
	storedpower: {
		num: 500,
		accuracy: 100,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return move.basePower + 20 * pokemon.positiveBoosts();
		},
		category: "Special",
		name: "Stored Power",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Psychic",
		zMove: {basePower: 175},
		maxMove: {basePower: 130},
		contestType: "Clever",
	},
	nightdaze: {
		num: 539,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Night Daze",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 40,
			boosts: {
				accuracy: -1,
			},
		},
		target: "normal",
		type: "Dark",
		zMove: {basePower: 175},
		maxMove: {basePower: 130},
		contestType: "Cool",
	},
	drillpeck: {
		desc: "High critical hit ratio.",
		shortDesc: "High critical hit ratio.",
		num: 65,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Drill Peck",
		pp: 20,
		priority: 0,
		critRatio: 3,
		flags: {contact: 1, protect: 1, mirror: 1, distance: 1},
		secondary: null,
		target: "any",
		type: "Flying",
		contestType: "Cool",
	},
	mirrormove: {
		num: 119,
		accuracy: true,
		basePower: 0,
		category: "Status",
		isNonstandard: "Past",
		name: "Mirror Move",
		pp: 20,
		priority: 4,
		flags: {authentic: 1},
		volatileStatus: 'snatch',
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'Snatch');
			},
			onAnyPrepareHitPriority: -1,
			onAnyPrepareHit(source, target, move) {
				const snatchUser = this.effectData.source;
				if (snatchUser.isSkyDropped()) return;
				if (!move || !move.flags['mirror'] || move.isZ || move.isMax) {
				return false;
				}
				snatchUser.removeVolatile('snatch');
				this.add('-activate', snatchUser, 'move: Snatch', '[of] ' + source);
				this.useMove(move.id, snatchUser);
				return null;
			},
		},
		secondary: null,
		pressureTarget: "foeSide",
		target: "normal",
		type: "Dark",
		zMove: {boost: {atk: 2}},
		contestType: "Clever",
	},
	vinetrap: {
		desc: "If a foe is switching out, hits it at 2x power",
		shortDesc: "If a foe is switching out, hits it at 2x power.",
		num: -19,
		accuracy: 100,
		basePower: 40,
		basePowerCallback(pokemon, target, move) {
			// You can't get here unless the pursuit succeeds
			if (target.beingCalledBack || target.switchFlag) {
				this.debug('Pursuit damage boost');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Physical",
		isNonstandard: "Past",
		name: "Vine Trap",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		beforeTurnCallback(pokemon) {
			for (const side of this.sides) {
				if (side === pokemon.side) continue;
				side.addSideCondition('pursuit', pokemon);
				const data = side.getSideConditionData('pursuit');
				if (!data.sources) {
					data.sources = [];
				}
				data.sources.push(pokemon);
			}
		},
		onModifyMove(move, source, target) {
			if (target?.beingCalledBack || target?.switchFlag) move.accuracy = true;
		},
		onTryHit(target, pokemon) {
			target.side.removeSideCondition('pursuit');
		},
		condition: {
			duration: 1,
			onBeforeSwitchOut(pokemon) {
				this.debug('Vine start');
				let alreadyAdded = false;
				pokemon.removeVolatile('destinybond');
				for (const source of this.effectData.sources) {
					if (!this.queue.cancelMove(source) || !source.hp) continue;
					if (!alreadyAdded) {
						this.add('-activate', pokemon, 'move: Vine Trap');
						alreadyAdded = true;
					}
					// Run through each action in queue to check if the Pursuit user is supposed to Mega Evolve this turn.
					// If it is, then Mega Evolve before moving.
					if (source.canMegaEvo || source.canUltraBurst) {
						for (const [actionIndex, action] of this.queue.entries()) {
							if (action.pokemon === source && action.choice === 'megaEvo') {
								this.runMegaEvo(source);
								this.queue.list.splice(actionIndex, 1);
								break;
							}
						}
					}
					this.runMove('pursuit', source, this.getTargetLoc(pokemon, source));
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Clever",
	},
	megapunch: {
		num: 5,
		accuracy: 85,
		basePower: 110,
		category: "Physical",
		name: "Mega Punch",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough",
	},
	megakick: {
		num: 25,
		accuracy: 75,
		basePower: 130,
		category: "Physical",
		name: "Mega Kick",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
	relicsong: {
		num: 547,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		isNonstandard: "Past",
		name: "Relic Song",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		secondary: {
			chance: 50,
			status: 'slp',
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
			},
		onHit(target, pokemon, move) {
			if (pokemon.baseSpecies.baseSpecies === 'Meloetta' && !pokemon.transformed) {
				move.willChangeForme = true;
			}
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.willChangeForme) {
				const meloettaForme = pokemon.species.id === 'meloettapirouette' ? '' : '-Pirouette';
				pokemon.formeChange('Meloetta' + meloettaForme, this.effect, false, '[msg]');
			}
		},
		target: "allAdjacentFoes",
		type: "Normal",
		contestType: "Beautiful",
	},
	sing: {
		inherit: true,
		accuracy: 75,
	},
	wakeupslap: {
		desc: "If a foe is sleeping, hits it at 2x power, even if they switch.",
		shortDesc: "If a foe is sleeping, hits it at 2x power, even if they switch.",
		num: -19,
		accuracy: 100,
		basePower: 40,
		basePowerCallback(pokemon, target, move) {
			// You can't get here unless the pursuit succeeds
			if (target.beingCalledBack || target.switchFlag) {
				this.debug('Pursuit damage boost');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Physical",
		isNonstandard: "Past",
		name: "Wake-Up Slap",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		beforeTurnCallback(pokemon) {
			for (const side of this.sides) {
				if (side === pokemon.side) continue;
				side.addSideCondition('pursuit', pokemon);
				const data = side.getSideConditionData('pursuit');
				if (!data.sources) {
					data.sources = [];
				}
				data.sources.push(pokemon);
			}
		},
		onModifyMove(move, source, target) {
			if (target?.beingCalledBack || target?.switchFlag) move.accuracy = true;
		},
		onTryHit(target, pokemon) {
			target.side.removeSideCondition('pursuit');
		},
		condition: {
			duration: 1,
			onBeforeSwitchOut(pokemon) {
				this.debug('Wake-Up Slap start');
				let alreadyAdded = false;
				pokemon.removeVolatile('destinybond');
				for (const source of this.effectData.sources) {
					if (!this.queue.cancelMove(source) || !source.hp) continue;
					if (!alreadyAdded) {
						this.add('-activate', pokemon, 'move: Wake-Up Slap');
						alreadyAdded = true;
					}
					// Run through each action in queue to check if the Pursuit user is supposed to Mega Evolve this turn.
					// If it is, then Mega Evolve before moving.
					if (source.canMegaEvo || source.canUltraBurst) {
						for (const [actionIndex, action] of this.queue.entries()) {
							if (action.pokemon === source && action.choice === 'megaEvo') {
								this.runMegaEvo(source);
								this.queue.list.splice(actionIndex, 1);
								break;
							}
						}
					}
					this.runMove('pursuit', source, this.getTargetLoc(pokemon, source));
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Clever",
	},
	aquarevolver: {
		desc: "100% chance to decrease the opponent's Special Defense by 1 stage. Affected by Mega Launcher",
		shortDesc: "100% chance to decrease the opponent's SpD by 1 stage.",
		num: 488,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Aqua Revolver",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, pulse: 1},
		secondary: {
			chance: 100,
			boosts: {
					spd	: -1,
				},
			},
		target: "normal",
		type: "Water",
		contestType: "Cool",
	},
	snaptrap: {
		inherit: true,
		basePower: 60,
		flags: {contact: 1, protect: 1, mirror: 1, bite: 1},
	},
	gravity: {
		num: 356,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Gravity",
		pp: 5,
		priority: 0,
		flags: {nonsky: 1},
		pseudoWeather: 'gravity',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', effect);
					return 7;
				}
				if (source?.hasItem('unidentifiedforeignrock')) {
				return 8;
				}	
				return 5;
			},
			onFieldStart() {
				this.add('-fieldstart', 'move: Gravity');
				for (const pokemon of this.getAllActive()) {
					let applies = false;
					if (pokemon.removeVolatile('bounce') || pokemon.removeVolatile('fly')) {
						applies = true;
						this.queue.cancelMove(pokemon);
						pokemon.removeVolatile('twoturnmove');
					}
					if (pokemon.volatiles['skydrop']) {
						applies = true;
						this.queue.cancelMove(pokemon);

						if (pokemon.volatiles['skydrop'].source) {
							this.add('-end', pokemon.volatiles['twoturnmove'].source, 'Sky Drop', '[interrupt]');
						}
						pokemon.removeVolatile('skydrop');
						pokemon.removeVolatile('twoturnmove');
					}
					if (pokemon.volatiles['magnetrise']) {
						applies = true;
						delete pokemon.volatiles['magnetrise'];
					}
					if (pokemon.volatiles['telekinesis']) {
						applies = true;
						delete pokemon.volatiles['telekinesis'];
					}
					if (applies) this.add('-activate', pokemon, 'move: Gravity');
				}
			},
			onModifyAccuracy(accuracy) {
				if (typeof accuracy !== 'number') return;
				return this.chainModify([6840, 4096]);
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.dex.moves.get(moveSlot.id).flags['gravity']) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			// groundedness implemented in battle.engine.js:BattlePokemon#isGrounded
			onBeforeMovePriority: 6,
			onBeforeMove(pokemon, target, move) {
				if (move.flags['gravity'] && !move.isZ) {
					this.add('cant', pokemon, 'move: Gravity', move);
					return false;
				}
			},
			onModifyMove(move, pokemon, target) {
				if (move.flags['gravity'] && !move.isZ) {
					this.add('cant', pokemon, 'move: Gravity', move);
					return false;
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 2,
			onFieldEnd() {
				this.add('-fieldend', 'move: Gravity');
			},
		},
		secondary: null,
		target: "all",
		type: "Psychic",
		zMove: {boost: {spa: 1}},
		contestType: "Clever",
	},
	zippyzap: {
		desc: "Goes first.",
		shortDesc: "Goes first",
		num: 729,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		isNonstandard: "LGPE",
		name: "Zippy Zap",
		pp: 10,
		priority: 2,
		flags: {contact: 1, protect: 1},
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	junglehealing: {
		desc: "Heals status and 1/3 max HP of self and allies.",
		shortDesc: "Heals status and 1/3 max HP of self and allies.",
		num: 816,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Jungle Healing",
		pp: 10,
		priority: 0,
		flags: {heal: 1, authentic: 1, mystery: 1},
		onHit(pokemon) {
			const success = !!this.heal(this.modify(pokemon.maxhp, 0.33));
			return pokemon.cureStatus() || success;
		},
		secondary: null,
		target: "allies",
		type: "Grass",
	},
	fairyfool: {
		num: 999,
		desc: "Fairy-type Foul Play.",
		shortDesc: "Fairy-type Foul Play.",
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		name: "Fairy Fool",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		useTargetOffensive: true,
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Clever",
	},
	omen: {
		num: 248,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Omen",
		pp: 10,
		priority: 0,
		flags: {},
		ignoreImmunity: true,
		isFutureMove: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 3,
				move: 'omen',
				source: source,
				moveData: {
					id: 'omen',
					name: "Omen",
					accuracy: 100,
					basePower: 100,
					category: "Physical",
					priority: 0,
					flags: {},
					ignoreImmunity: false,
					effectType: 'Move',
					isFutureMove: true,
					type: 'Ground',
				},
			});
			this.add('-start', source, 'move: Omen');
			return this.NOT_FAIL;
		},
		secondary: null,
		target: "normal",
		type: "Ground",
		contestType: "Clever",
	},
	stalk: {
		num: 666,
		desc: "Protect + Focus Energy.",
		shortDesc: "Protect + Focus Energy.",
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Stalk",
		pp: 10,
		priority: 4,
		flags: {},
		stallingMove: true,
		volatileStatus: 'obstruct',
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'Protect');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect'] || move.category === 'Status') {
					if (['gmaxoneblow', 'gmaxrapidflow'].includes(move.id)) return;
					if (move.isZ || move.isMax) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'move: Protect');
				}
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				return this.NOT_FAIL;
			},
		},
		volatileStatus: 'focusenergy',
		condition: {
			onStart(target, source, effect) {
				if (effect?.id === 'zpower') {
					this.add('-start', target, 'move: Focus Energy', '[zeffect]');
				} else if (effect && (['imposter', 'psychup', 'transform'].includes(effect.id))) {
					this.add('-start', target, 'move: Focus Energy', '[silent]');
				} else {
					this.add('-start', target, 'move: Focus Energy');
				}
			},
			onModifyCritRatio(critRatio) {
				return critRatio + 4;
			},
		},
		secondary: null,
		target: "self",
		type: "Dark",
	},
	quell: {
		desc: "If a foe is switching out, hits it at 2x power",
		shortDesc: "If a foe is switching out, hits it at 2x power.",
		num: -19,
		accuracy: 100,
		basePower: 40,
		basePowerCallback(pokemon, target, move) {
			// You can't get here unless the pursuit succeeds
			if (target.beingCalledBack || target.switchFlag) {
				this.debug('Pursuit damage boost');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Physical",
		isNonstandard: "Past",
		name: "Quell",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		beforeTurnCallback(pokemon) {
			for (const side of this.sides) {
				if (side === pokemon.side) continue;
				side.addSideCondition('pursuit', pokemon);
				const data = side.getSideConditionData('pursuit');
				if (!data.sources) {
					data.sources = [];
				}
				data.sources.push(pokemon);
			}
		},
		onModifyMove(move, source, target) {
			if (target?.beingCalledBack || target?.switchFlag) move.accuracy = true;
		},
		onTryHit(target, pokemon) {
			target.side.removeSideCondition('pursuit');
		},
		condition: {
			duration: 1,
			onBeforeSwitchOut(pokemon) {
				this.debug('Quell start');
				let alreadyAdded = false;
				pokemon.removeVolatile('destinybond');
				for (const source of this.effectData.sources) {
					if (!this.queue.cancelMove(source) || !source.hp) continue;
					if (!alreadyAdded) {
						this.add('-activate', pokemon, 'move: Quell');
						alreadyAdded = true;
					}
					// Run through each action in queue to check if the Pursuit user is supposed to Mega Evolve this turn.
					// If it is, then Mega Evolve before moving.
					if (source.canMegaEvo || source.canUltraBurst) {
						for (const [actionIndex, action] of this.queue.entries()) {
							if (action.pokemon === source && action.choice === 'megaEvo') {
								this.runMegaEvo(source);
								this.queue.list.splice(actionIndex, 1);
								break;
							}
						}
					}
					this.runMove('pursuit', source, this.getTargetLoc(pokemon, source));
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Clever",
	},
	attract: {
		num: 213,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Attract",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, bypasssub: 1},
		volatileStatus: 'attract',
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(pokemon, source, effect) {
				if (effect.id === 'cutecharm') {
					this.add('-start', pokemon, 'Attract', '[from] ability: Cute Charm', '[of] ' + source);
				} else if (effect.id === 'destinyknot') {
					this.add('-start', pokemon, 'Attract', '[from] item: Destiny Knot', '[of] ' + source);
				} else {
					this.add('-start', pokemon, 'Attract');
				}
			},
			onUpdate(pokemon) {
				if (this.effectState.source && !this.effectState.source.isActive && pokemon.volatiles['attract']) {
					this.debug('Removing Attract volatile on ' + pokemon);
					pokemon.removeVolatile('attract');
				}
			},
			onBeforeMovePriority: 2,
			onBeforeMove(pokemon, target, move) {
				this.add('-activate', pokemon, 'move: Attract', '[of] ' + this.effectState.source);
				if (this.randomChance(1, 2)) {
					this.add('cant', pokemon, 'Attract');
					return false;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Attract', '[silent]');
			},
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	thrash: {
		inherit: true,
		type: "Fighting",
	},
	zippyzap: {
		num: 729,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		isNonstandard: "LGPE",
		name: "Zippy Zap",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1},
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	belch: {
		num: 562,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		name: "Belch",
		pp: 10,
		priority: 0,
		flags: {protect: 1, sound: 1},
		// Move disabling implemented in Battle#nextTurn in sim/battle.js
		onTry(source) {
			const item = source.getItem();
			if (item.isBerry && source.eatItem(true)) {
				this.boost({def: 0}, source, null, null, false, true);
			} else {
				return false;
			}
		},
		onHit(pokemon) {
			if (pokemon.item || !pokemon.lastItem) return false;
			const item = pokemon.lastItem;
			pokemon.lastItem = '';
			this.add('-item', pokemon, this.dex.items.get(item), '[from] move: Belch');
			pokemon.setItem(item);
		},
		secondary: {
			chance: 30,
			status: 'psn',
		},
		target: "normal",
		type: "Poison",
		contestType: "Tough",
	},
	stuffcheeks: {
		num: 747,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Stuff Cheeks",
		desc: "Munches on held berry and increases a random stat +2.",
		shortDesc: "Munches on held berry and increases a random stat +2.",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		// Move disabling implemented in Battle#nextTurn in sim/battle.ts
		onTry(source) {
			const item = source.getItem();
			if (item.isBerry && source.eatItem(true)) {
				this.boost({def: 0}, source, null, null, false, true);
			} else {
				return false;
			}
			const stats: BoostID[] = [];
			let stat: BoostID;
			for (stat in source.boosts) {
				if (source.boosts[stat] < 6) {
					stats.push(stat);
				}
			}
			if (stats.length) {
				const randomStat = this.sample(stats);
				const boost: SparseBoostsTable = {};
				boost[randomStat] = 2;
				this.boost(boost);
			} else {
				return false;
		      }
		},
		onHit(pokemon) {
			if (pokemon.item || !pokemon.lastItem) return false;
			const item = pokemon.lastItem;
			pokemon.lastItem = '';
			this.add('-item', pokemon, this.dex.items.get(item), '[from] move: Stuff Cheeks');
			pokemon.setItem(item);
		},
		secondary: null,
		target: "self",
		type: "Normal",
	},
	passbaton: {
		num: 226,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Pass Baton",
		desc: "Switch out, keeping stat changes.",
		shortDesc: "Switch out, keeping stat changes.",
		pp: 40,
		priority: 0,
		flags: {},
		self: {
			onHit(source) {
				source.skipBeforeSwitchOutEventFlag = true;
			},
		},
		selfSwitch: 'copyvolatile',
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
}
