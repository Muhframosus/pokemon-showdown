export const Items: {[k: string]: ModdedItemData} = {
	zoomlens: {
		name: "Zoom Lens",
		spritenum: 574,
		fling: {
			basePower: 10,
		},
		onSourceModifyAccuracyPriority: -2,
		onSourceModifyAccuracy(accuracy, target) {
			if (typeof accuracy === 'number' && !this.queue.willMove(target)) {
				this.debug('Zoom Lens boosting accuracy');
				return this.chainModify([0x2000, 0x1000]);
			}
		},
		num: 276,
		gen: 4,
	},
	widelens: {
		name: "Wide Lens",
		spritenum: 537,
		fling: {
			basePower: 10,
		},
		onSourceModifyAccuracyPriority: -2,
		onSourceModifyAccuracy(accuracy) {
			if (typeof accuracy === 'number') {
				return this.chainModify([0x1800, 0x1000]);
			}
		},
		num: 265,
		gen: 4,
	},
	leek: {
		name: "Leek",
		fling: {
			basePower: 60,
		},
		spritenum: 475,
		onModifyCritRatio(critRatio, user) {
			if (["farfetchd", "sirfetchd"].includes(this.toID(user.baseSpecies.baseSpecies))) {
				return critRatio + 4;
			}
		},
		itemUser: ["Farfetch\u2019d", "Sirfetch\u2019d"],
		num: 259,
		gen: 8,
	
	},
	stick: {
		name: "Stick",
		fling: {
			basePower: 60,
		},
		spritenum: 475,
		onModifyCritRatio(critRatio, user) {
			if (this.toID(user.baseSpecies.baseSpecies) === 'farfetchd') {
				return critRatio + 4;
			}
		},
		itemUser: ["Farfetch\u2019d"],
		num: 259,
		gen: 2,
		isNonstandard: "Past",
	},
	luckypunch: {
		name: "Lucky Punch",
		spritenum: 261,
		fling: {
			basePower: 40,
		},
		onModifyCritRatio(critRatio, user) {
			if (user.baseSpecies.name === 'Kangaskhan') {
				return critRatio + 2;
			}
		},
		onModifyMovePriority: -2,
		onModifyMove(move) {
			if (move.secondaries) {
				this.debug('doubling secondary chance');
				for (const secondary of move.secondaries) {
					if (secondary.chance) secondary.chance *= 2;
				}
			}
			if (move.self?.chance) move.self.chance *= 2;
		},
		itemUser: ["Kangaskhan"],
		num: 256,
		gen: 2,
		isNonstandard: "Past",
	
	},
	quickherb: {
		name: "Quick Herb",
		desc: "Removes the recharging time from a move once.",
		shortDesc: "Removes recharge time from a move.",
		spritenum: 358,
		fling: {
			basePower: 10,
		},
		onUpdate(pokemon) {
			if (pokemon.volatiles['mustrecharge']) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			pokemon.removeVolatile('mustrecharge');
		},
		num: -2
	
	},
	adrenalineorb: {
		name: "Adrenaline Orb",
		spritenum: 660,
		fling: {
			basePower: 30,
		},
		onAfterBoost(boost, target, source, effect) {
			if (effect.id === 'intimidate') {
				target.useItem();
			}
			if (effect.id === 'stickyweb') {
				target.useItem();
			}
		},
		onTrapPokemonPriority: -10,
		onTrapPokemon(pokemon) {
			if (!pokemon.trapped) return;
			pokemon.useItem();
		},
		onUpdate(pokemon) {
			if (!pokemon.trapped) return;
			pokemon.useItem();
		},
		boosts: {
			spe: 1,
		},
		num: 846,
		gen: 7,
	},
	unidentifiedforeignrock: {
		name: "Unidentified Foreign Rock",
		desc: "Extends the holder's Gravity Duration from 5 to 8 turns.",
		shortDesc: "Holder's use of Gravity lasts 8 turns instead of 5.",
		spritenum: 193,
		fling: {
			basePower: 60,
		},
		num: 284,
		gen: 4,
	},	
	lightball: {
		inherit: true,
		onResidualOrder: 28,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			pokemon.trySetStatus('par', pokemon);
		},
	},
	metalpowder: {
		name: "Metal Powder",
		fling: {
			basePower: 10,
		},
		spritenum: 287,
		onModifyDefPriority: 2,
		onModifyDef(def, pokemon) {
			if (pokemon.species.name === 'Ditto') {
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 2,
		onModifySpD(spd, pokemon) {
			if (pokemon.species.name === 'Ditto') {
				return this.chainModify(1.5);
			}
		},
		itemUser: ["Ditto"],
		num: 257,
		gen: 2,
	},
	metronome: {
		name: "Metronome",
		spritenum: 289,
		fling: {
			basePower: 30,
		},
		onStart(pokemon) {
			pokemon.addVolatile('metronome');
		},
		condition: {
			onStart(pokemon) {
				this.effectState.lastMove = '';
				this.effectState.numConsecutive = 0;
			},
			onTryMovePriority: -2,
			onTryMove(pokemon, target, move) {
				if (!pokemon.hasItem('metronome')) {
					pokemon.removeVolatile('metronome');
					return;
				}
				if (this.effectState.lastMove === move.id && pokemon.moveLastTurnResult) {
					this.effectState.numConsecutive++;
				} else if (pokemon.volatiles['twoturnmove']) {
					if (this.effectState.lastMove !== move.id) {
						this.effectState.numConsecutive = 1;
					} else {
						this.effectState.numConsecutive++;
					}
				} else {
					this.effectState.numConsecutive = 0;
				}
				this.effectState.lastMove = move.id;
			},
			onModifyDamage(damage, source, target, move) {
				const dmgMod = [1.15*4096, 1.30*4096, 1.45*4096, 1.60*4096, 1.75*4096, 1.90*4096];
				const numConsecutive = this.effectState.numConsecutive > 5 ? 5 : this.effectState.numConsecutive;
				this.debug(`Current Metronome boost: ${dmgMod[numConsecutive]}/4096`);
				return this.chainModify([dmgMod[numConsecutive], 4096]);
			},
		},
		num: 277,
		gen: 4,
	},
	watergem: {
		inherit: true,
		isNonstandard: null,
	},
	steelgem: {
		inherit: true,
		isNonstandard: null,
	},
	flyinggem: {
		inherit: true,
		isNonstandard: null,
	},
	normalgem: {
		inherit: true,
		isNonstandard: null,
	},
	icegem: {
		inherit: true,
		isNonstandard: null,
	},
	groundgem: {
		inherit: true,
		isNonstandard: null,
	},
	grassgem: {
		inherit: true,
		isNonstandard: null,
	},
	ghostgem: {
		inherit: true,
		isNonstandard: null,
	},
	fightinggem: {
		inherit: true,
		isNonstandard: null,
	},
	electricgem: {
		inherit: true,
		isNonstandard: null,
	},
	darkgem: {
		inherit: true,
		isNonstandard: null,
	},
	dragongem: {
		inherit: true,
		isNonstandard: null,
	},
	buggem: {
		inherit: true,
		isNonstandard: null,
	},
	butterfrinite: {
        name: "Butterfrinite",
        spritenum: 626,
		desc: "If held by a Butterfree, this item allows it to Mega Evolve in battle.",
		shortDesc: "If held by a Butterfree, this item allows it to Mega Evolve in battle.",
        megaStone: "Butterfree-Mega",
        megaEvolves: "Butterfree",
        itemUser: ["Butterfree"],
        onTakeItem(item, source) {
            if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
            return true;
        },
        num: -101,
        gen: 7,
        isNonstandard: "Past",
    },
	snorlite: {
        name: "Snorlite",
        spritenum: 626,
		desc: "If held by a Snorlax, this item allows it to Mega Evolve in battle.",
		shortDesc: "If held by a Snorlax, this item allows it to Mega Evolve in battle.",
        megaStone: "Snorlax-Mega",
        megaEvolves: "Snorlax",
        itemUser: ["Snorlax"],
        onTakeItem(item, source) {
            if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
            return true;
        },
        num: -101,
        gen: 7,
        isNonstandard: "Past",
    },
};
