/*

Ratings and how they work:

-1: Detrimental
	  An ability that severely harms the user.
	ex. Defeatist, Slow Start

 0: Useless
	  An ability with no overall benefit in a singles battle.
	ex. Color Change, Plus

 1: Ineffective
	  An ability that has minimal effect or is only useful in niche situations.
	ex. Light Metal, Suction Cups

 2: Useful
	  An ability that can be generally useful.
	ex. Flame Body, Overcoat

 3: Effective
	  An ability with a strong effect on the user or foe.
	ex. Chlorophyll, Sturdy

 4: Very useful
	  One of the more popular abilities. It requires minimal support to be effective.
	ex. Adaptability, Magic Bounce

 5: Essential
	  The sort of ability that defines metagames.
	ex. Imposter, Shadow Tag

*/


export const Abilities: {[k: string]: ModdedAbilityData} = {
	powercompaction: {
		name: "Power Compaction",
		desc: "Boosts Attack and Special Attack by one stage when hit by a super-effective move.",
		shortDesc: "Boosts Atk and SpA when hit super-effectively.",
		onDamagingHit(damage, target, source, move) {
			if (!move.damage && !move.damageCallback && target.getMoveHitData(move).typeMod > 0) {
				this.boost({atk: 1, spa: 1});
			}
		},
		name: "Power Compaction",
		rating: 3,
		num: -5,
	},
	slumber: {
		name: "Slumber",
		desc: "On switch-in, restore HP to full and cure status, then sleep for 2 turns.",
		shortDesc: "Uses Rest on switch-in.",
		onStart(pokemon) {
			if (pokemon.status === 'slp' || pokemon.hasAbility('comatose')) return false;
			if (pokemon.hasAbility(['insomnia', 'vitalspirit'])) {
				this.add('-fail', pokemon, '[from] ability: ' + pokemon.getAbility().name, '[of] ' + pokemon);
				return null;
			}
		},
		onStart(pokemon) {
			if (!pokemon.setStatus('slp', pokemon)) return false;
			pokemon.statusState.time = 3;
			pokemon.statusState.startTime = 3;
			this.heal(pokemon.maxhp); // Aesthetic only as the healing happens after you fall asleep in-game
		},
		name: "Slumber",
		rating: 1,
		num: -6,
	},
	slowstart: {
		name: "Slow Start",
		shortDesc: "Halves Attack and Speed for 3 turns on switch-in.",
		onStart(pokemon) {
			pokemon.addVolatile('slowstart');
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['slowstart'];
			this.add('-end', pokemon, 'Slow Start', '[silent]');
		},
		condition: {
			duration: 3,
			onStart(target) {
				this.add('-start', target, 'ability: Slow Start');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(0.5);
			},
			onModifySpe(spe, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(target) {
				this.add('-end', target, 'Slow Start');
			},
		},
		name: "Slow Start",
		rating: -1,
		num: 112,
	},
	permafrost: {
		name: "Permafrost",
		desc: "Grants immunity to Fire-type moves.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				{
					this.add('-immune', target, '[from] ability: Permafrost');
				}
				return null;
			}
		},
		name: "Permafrost",
		rating: 2,
		num: -7,
	},
	liquidooze: {
		onSourceTryHeal(damage, target, source, effect) {
			this.debug("Heal is occurring: " + target + " <- " + source + " :: " + effect.id);
			const canOoze = ['drain', 'leechseed', 'strengthsap'];
			if (canOoze.includes(effect.id)) {
				this.damage(damage);
				return this.chainModify(1.5);
			}
		},
		name: "Liquid Ooze",
		rating: 1.5,
		num: 64,
	},
	unscratchable: {
		name: "Unscratchable",
		desc: "Fighting-type attacks have their attacking stat halved when targeting this Pokemon.",
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Thick Fat weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Thick Fat weaken');
				return this.chainModify(0.5);
			}
		},
		isBreakable: true,
		rating: 2,
		num: -7,
	},
	pastelveil: {
		name: "Pastel Veil",
		desc: "Grants immunity to Poison-type moves.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Poison') {
				{
					this.add('-immune', target, '[from] ability: Pastel Veil');
				}
				return null;
			}
		},
		name: "Pastel Veil",
		rating: 2,
		num: 257,
	},
	compoundeyes: {
		name: "Compound Eyes",
		desc: "Boosts accuracy of moves by 1.5x.",
		onSourceModifyAccuracyPriority: -1,
		onSourceModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			this.debug('compoundeyes - enhancing accuracy');
			return this.chainModify([0x16CD, 0x1000]);
		},
		name: "Compound Eyes",
		rating: 3,
		num: 14,
	},
	magician: {
		name: "Magician",
		desc: "Summons Magic Room on switch-in. Lasts for 5 turns.",
		shortDesc: "Magic Room on switch-in.",
		onStart(pokemon) {
			this.add('-activate', pokemon, 'ability: Magician');
			this.field.addPseudoWeather('magicroom');
		},
		name: "Magician",
		rating: 4,
		num: 170,
	},
	gravitysurge: {
		name: "Gravity Surge",
		desc: "Summons Gravity on switch-in. Lasts for 5 turns.",
		shortDesc: "Gravity on switch-in.",
		onStart(pokemon) {
			this.add('-activate', pokemon, 'ability: Gravity Surge');
			this.field.addPseudoWeather('gravity');
		},
		name: "Gravity Surge",
		rating: 4,
		num: -10,
	},
	superluck: {
		name: "Super Luck",
		desc: "Boosts the user's critical hit ratio by 2 stages.",
		onModifyCritRatio(critRatio) {
			return critRatio + 2;
		},
		name: "Super Luck",
		rating: 1.5,
		num: 105,
	},
	oracle: {
		name: "Oracle",
		desc: "Upon switchin, the user uses Future Sight on the opposing side.",
		shortDesc: "Future Sight for opposing side on switchin.",
		onStart(pokemon) {
			this.add('-activate', pokemon, 'ability: Oracle');
			let success = false;
			for (const target of pokemon.side.foe.active) {
				if (target.side.addSlotCondition(target, 'futuremove')) {
					Object.assign(target.side.slotConditions[target.position]['futuremove'], {
						duration: 3,
						move: 'futuresight',
						source: pokemon,
						moveData: {
							id: 'futuresight',
							name: "Future Sight",
							accuracy: 100,
							basePower: 120,
							category: "Special",
							priority: 0,
							flags: {},
							effectType: 'Move',
							isFutureMove: true,
							type: 'Psychic',
						},
					});
					success = true;
				}
			}
			if (success) {
				this.add('-anim', pokemon, 'Future Sight');
				this.add('-start', pokemon, 'Future Sight');
			}
		},
		rating: 5,
		num: -8,
	},
	omen: {
		name: "Omen",
		desc: "At the end of the turn it switches-in, the user uses Brutal Swing.",
		shortDesc: "Uses Brutal Swing on switch-in.",
		onStart(pokemon) {
			this.add('-activate', pokemon, 'ability: Omen');
			let success = false;
			for (const target of pokemon.side.foe.active) {
				if (target.side.addSlotCondition(target, 'futuremove')) {
					Object.assign(target.side.slotConditions[target.position]['futuremove'], {
						duration: 1,
						move: 'omen',
						source: pokemon,
						moveData: {
							id: 'omen',
							name: "Omen",
							accuracy: 100,
							basePower: 60,
							category: "Physical",
							priority: 0,
							flags: {},
							effectType: 'Move',
							isFutureMove: true,
							type: 'Dark',
						},
					});
					success = true;
				}
			}
			if (success) {
				this.add('-anim', pokemon, 'Doom Desire');
			}
		},
		rating: 5,
		num: -9,
	},
	chimering: {
		name: "Chime Ring",
		desc: "On switch-in, cures the user's party of all status conditions.",
		shortDesc: "Heal Bell on switch-in.",
		onStart(pokemon, source) {
			this.add('-activate', source, 'ability: Chime Ring');
			const side = pokemon.side;
			let success = false;
			for (const ally of side.pokemon) {
				if (ally !== source && ally.hasAbility('soundproof')) continue;
				if (ally.cureStatus()) success = true;
			}
			return success;
		},
	},
	rating: 2,
	num: -8,
	sandforce: {
		name: "Sand Force",
		desc: "Ground, Steel and Rock moves have 1.3x Power, 1.6x during Sandstorm. Grants Immunity to Sandstorm damage.",
		shortDesc: "Powers up Ground, Steel, Rock moves. Boost is doubled during Snadstorm. Sandstorm immunity.",
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Rock' || move.type === 'Ground' || move.type === 'Steel') {
					this.debug('Sand Force boost');
					return this.chainModify([0x14CD, 0x1000]);
				}
				if (this.field.isWeather('sandstorm')) {
				if (move.type === 'Rock' || move.type === 'Ground' || move.type === 'Steel') {
					this.debug('Sand Force boost 2');
					return this.chainModify([5325, 4096]);
				}
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		name: "Sand Force",
		rating: 4,
		num: 159,
		
	},
	wonderguard: {
		onStart(pokemon) {
			for (const target of pokemon.foes()) {
				for (const moveSlot of target.moveSlots) {
					const move = this.dex.moves.get(moveSlot.move);
					if (move.category === 'Status') continue;
					const moveType = move.id === 'hiddenpower' ? target.hpType : move.type;
					if (
						this.dex.getImmunity(moveType, pokemon) && this.dex.getEffectiveness(moveType, pokemon) > 0 ||
						move.ohko
					) {
						this.add('-ability', pokemon, 'Anticipation');
						return;
					}
				}
			}
		},
		onTryHit(target, source, move) {
			if (target === source || move.category === 'Status' || move.type === '???' || move.id === 'struggle') return;
			if (move.id === 'skydrop' && !source.volatiles['skydrop']) return;
			this.debug('Wonder Guard immunity: ' + move.id);
			if (target.runEffectiveness(move) <= 0) {
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-immune', target, '[from] ability: Wonder Guard');
				}
				return null;
			}
		},
		name: "Wonder Guard",
		rating: 5,
		num: 25,
		},
	whitesmoke: {
		name: "White Smoke",
		desc: "This pokemon's stat stages cannot be dropped.",
		onBoost(boost, target, source, effect) {
			let showMsg = false;
			let i: BoostName;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
				this.add("-fail", target, "unboost", "[from] ability: White Smoke", "[of] " + target);
			}
		},
		name: "White Smoke",
		rating: 2,
		num: 73,
	},
	clearbody: {
		name: "Clear Body",
		desc: "This pokemon's stat stages cannot be dropped.",
		onBoost(boost, target, source, effect) {
			let showMsg = false;
			let i: BoostName;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
				this.add("-fail", target, "unboost", "[from] ability: Clear Body", "[of] " + target);
			}
		},
		name: "Clear Body",
		rating: 2,
		num: 29,
	},
	aftermath: {
		name: "Aftermath",
		desc: "If this Pokemon is knocked out with a move, that move's user loses HP equal to the amount of damage inflicted on this Pokemon.",
		shortDesc: "If this is knocked out with a move, deals damage equal to HP lost to attacker.",
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (!target.hp) {
				this.damage(target.getUndynamaxedHP(damage), source, target);
			}
		},
		rating: 2.5,
		num: 106,
	},
	blaze: {
		desc: "This pokemon's Fire-type moves are boosted by 1.25x and by 1.5x under 25% HP.",
		shortdesc: "User gets boosted Fire-type moves, even more on low HP.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 1) {
				this.debug('Blaze boost');
				return this.chainModify(1.25);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 1) {
				this.debug('Blaze boost');
				return this.chainModify(1.25);
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 4) {
				this.debug('Blaze boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 4) {
				this.debug('Blaze boost');
				return this.chainModify(1.5);
			}
		},
		name: "Blaze",
		rating: 2,
		num: 66,
	},
	paleolithicpower: {
		desc: "This pokemon's Rock-type moves are boosted by 1.5x.",
		shortdesc: "User gets boosted Rock-type moves.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Rock') {
				this.debug('Paleolithic boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Rock') {
				this.debug('Paleolithic boost');
				return this.chainModify(1.5);
			}
		},
		name: "Paleolithic Power",
		rating: 2,
		num: 66,
	},
	torrent: {
		desc: "This pokemon's Water-type moves are boosted by 1.25x and by 1.5x under 25% HP.",
		shortdesc: "User gets boosted Water-type moves, even more on low HP.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Water' && attacker.hp <= attacker.maxhp / 1) {
				this.debug('Torrent boost');
				return this.chainModify(1.25);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Water' && attacker.hp <= attacker.maxhp / 1) {
				this.debug('Torrent boost');
				return this.chainModify(1.25);
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Water' && attacker.hp <= attacker.maxhp / 4) {
				this.debug('Torrent boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Water' && attacker.hp <= attacker.maxhp / 4) {
				this.debug('Torrent boost');
				return this.chainModify(1.5);
			}
		},
		name: "Torrent",
		rating: 2,
		num: 66,
	},
	overgrow: {
		desc: "This pokemon's Grass-type moves are boosted by 1.25x and by 1.5x under 25% HP.",
		shortdesc: "User gets boosted Grass-type moves, even more on low HP.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Grass' && attacker.hp <= attacker.maxhp / 1) {
				this.debug('Overgrow boost');
				return this.chainModify(1.25);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Grass' && attacker.hp <= attacker.maxhp / 1) {
				this.debug('Overgrow boost');
				return this.chainModify(1.25);
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Grass' && attacker.hp <= attacker.maxhp / 4) {
				this.debug('Overgrow boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Grass' && attacker.hp <= attacker.maxhp / 4) {
				this.debug('Overgrow boost');
				return this.chainModify(1.5);
			}
		},
		name: "Overgrow",
		rating: 2,
		num: 66,
	},
	swarm: {
		desc: "This pokemon's Bug-type moves are boosted by 1.25x and by 1.5x under 25% HP.",
		shortdesc: "User gets boosted Bug-type moves, even more on low HP.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Bug' && attacker.hp <= attacker.maxhp / 1) {
				this.debug('Swarm boost');
				return this.chainModify(1.25);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Bug' && attacker.hp <= attacker.maxhp / 1) {
				this.debug('Swarm boost');
				return this.chainModify(1.25);
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Bug' && attacker.hp <= attacker.maxhp / 4) {
				this.debug('Swarm boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Bug' && attacker.hp <= attacker.maxhp / 4) {
				this.debug('Swarm boost');
				return this.chainModify(1.5);
			}
		},
		name: "Swarm",
		rating: 2,
		num: 66,
	},
	wonderskin: {
		name: "Wonder Skin",
		desc: "This ability has a different effect for depending status condition the user has (Check Docs).",
		shortdesc: "Different effect depending on status condition.",
		onModifyAtkPriority: 7,
		onModifyAtk(atk, pokemon) {
			if (pokemon.status === 'brn') {
				return this.chainModify(3);
			}
		},
		onModifySpe(spe, pokemon) {
			if (pokemon.status === 'par') {
				return this.chainModify(1.5);
			}
		},
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (effect.id === 'psn' || effect.id === 'tox') {
				this.heal(target.baseMaxhp / 8);
				return false;
			}
		},
		onFlinch(pokemon) {
			this.boost({spe: 1});
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'frz') {
				this.add('-activate', pokemon, 'ability: Wonder Skin');
				pokemon.cureStatus();
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'frz') return false;
		},
		onModifyAccuracyPriority: -1,
		onModifyAccuracy(accuracy, target) {
			if (typeof accuracy !== 'number') return;
			if (target?.volatiles['confusion']) {
				this.debug('Wonder Skin - decreasing accuracy');
				return this.chainModify(0.5);
			}
		},
		name: "Wonder Skin",
		rating: 2,
		num: 147,
	},
	lightningrod: {
		name: "Lightning Rod",
		desc: "This Pokemon is immune to Electric-type moves and raises its SpA and Atk by 1 stage when hit by an Electric-type move.",
		shortdesc: "Raises SpA and Atk by 1 when hit by an Electric move. Immunity to Electric.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Electric') {
				if (!this.boost({spa: 1})) {
				}
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] ability: Lightning Rod');
				}
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if (move.type !== 'Electric' || ['firepledge', 'grasspledge', 'waterpledge'].includes(move.id)) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectState.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				if (this.effectState.target !== target) {
					this.add('-activate', this.effectState.target, 'ability: Lightning Rod');
				}
				return this.effectState.target;
			}
		},
		name: "Lightning Rod",
		rating: 3,
		num: 31,
	},
	sniper: {
		name: "Sniper",
		desc: "If this Pokemon strikes with a critical hit, the damage is multiplied by 1.3.",
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).crit) {
				this.debug('Sniper boost');
				return this.chainModify(1.33);
			}
		},
		name: "Sniper",
		rating: 2,
		num: 97,
	},
	catalyst: {
		name: "Catalyst",
		desc: "This Pokemon's Special Attack is raised by 1 stage if it attacks and KOes another Pokemon.",
		shortDesc: "This Pokemon's SpA is raised if it attacks and KOes another Pokemon.",
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({spa: length}, source);
			}
		},
		name: "Catalyst",
		rating: 3,
		num: -9,
	},
	stench: {
		name: "Stench",
		desc: "This Pokemon's attacks without a chance to flinch have a 30% chance to flinch.",
		onModifyMovePriority: -1,
		onModifyMove(move) {
			if (move.category !== "Status") {
				this.debug('Adding Stench flinch');
				if (!move.secondaries) move.secondaries = [];
				for (const secondary of move.secondaries) {
					if (secondary.volatileStatus === 'flinch') return;
				}
				move.secondaries.push({
					chance: 30,
					volatileStatus: 'flinch',
				});
			}
		},
		name: "Stench",
		rating: 0.5,
		num: 1,
	},
	levitate: {
		inherit: true,
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Levitate');
		},
	},
	iceface: {
		onStart(pokemon) {
			if (this.field.isWeather('hail') && pokemon.species.id === 'eiscuenoice' && !pokemon.transformed) {
				this.add('-activate', pokemon, 'ability: Ice Face');
				this.effectState.busted = false;
				pokemon.formeChange('Eiscue', this.effect, true);
			}
		},
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (
				target.species.id === 'eiscue' && !target.transformed
			) {
				this.add('-activate', target, 'ability: Ice Face');
				this.effectState.busted = true;
				return 0;
			}
		},
		onCriticalHit(target, type, move) {
			if (!target) return;
			if (target.species.id !== 'eiscue' || target.transformed) return;
			if (target.volatiles['substitute'] && !(move.flags['authentic'] || move.infiltrates)) return;
			if (!target.runImmunity(move.type)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			if (target.species.id !== 'eiscue' || target.transformed) return;

			const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (pokemon.species.id === 'eiscue' && this.effectState.busted) {
				pokemon.formeChange('Eiscue-Noice', this.effect, true);
			}
		},
		onAnyWeatherStart() {
			const pokemon = this.effectState.target;
			if (!pokemon.hp) return;
			if (this.field.isWeather('hail') && pokemon.species.id === 'eiscuenoice' && !pokemon.transformed) {
				this.add('-activate', pokemon, 'ability: Ice Face');
				this.effectState.busted = false;
				pokemon.formeChange('Eiscue', this.effect, true);
			}
		},
		isBreakable: true,
		isPermanent: true,
		name: "Ice Face",
		rating: 3,
		num: 248,
	},
	corrosion: {
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Poison'] = true;
			}
		},
		name: "Corrosion",
		desc: "This Pokemon's moves ignore Poison immunity.",
		rating: 3,
		num: 212,
	},
	shellarmor: {
		desc: "This Pokemon cannot be struck with a critical hit or burned.",
		shortDesc: "User can't be hit with a critical hit or burned.",
				onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Water Veil');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Water Veil');
			}
			return false;
		},
		onCriticalHit: false,
		name: "Shell Armor",
		rating: 2,
		num: 75,
	},
	battlearmor: {
		desc: "This Pokemon cannot be struck with a critical hit or affected by a move's secondary effect.",
		shortDesc: "User can't be struck with critical hits or secondary effects.",
				onModifySecondaries(secondaries) {
			this.debug('Shield Dust prevent secondary');
			return secondaries.filter(effect => !!(effect.self || effect.dustproof));
		},
		onCriticalHit: false,
		name: "Battle Armor",
		rating: 2,
		num: 75,
	},
	runaway: {
		desc: "This Pokemon cannot be trapped. (Shadow Tag, Arena Trap, No Retreat, Block, Etc.)",
		shortDesc: "This Pokemon cannot be trapped.",
		inherit: true,
		onTrapPokemonPriority: -10,
		onTrapPokemon(pokemon) {
			pokemon.trapped = pokemon.maybeTrapped = false;
		},
	rating: 1,
	},
	poisonpoint: {
		desc: "Pokemon that use a contact move on this Pokemon have a 30% chance to be badly poisoned.",
		shortDesc: "30% chance to badly poison when hit by a contact move.",
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('tox', target);
				}
			}
		},
		name: "Poison Point",
		rating: 1.5,
		num: 38,
	},
	poisontouch: {
		desc: "This Pokemon has a 30% chance to badly poison any Pokemon it comes in contact with.",
		shortDesc: "30% chance to badly poison on contact move.",
		// upokecenter says this is implemented as an added secondary effect
		onModifyMove(move) {
			if (!move || !move.flags['contact'] || move.target === 'self') return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 30,
				status: 'tox',
				ability: this.dex.abilities.get('poisontouch'),
			});
		},
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('tox', target);
				}
			}
		},
		name: "Poison Touch",
		rating: 2,
		num: 143,
	},
	oblivious: {
		inherit: true,
		//hazard immunity coded in moves.ts
		desc: "This Pokemon cannot be infatuated or taunted. Gaining this Ability while affected cures it. Immune to Intimidate and Hazards.",
		shortDesc: "This Pokemon cannot be infatuated or taunted. Immune to Intimidate and Hazards.",
	},
	pickpocket: {
		name: "Pickpocket",
		rating: 1,
		num: 124,
		desc: "The user switches items with the target after using a contact move. Cannot switch Mega Stones, Z-Stones, etc.",
		shortDesc: "Switches item with target after using contact move.",
		onTryImmunity(target) {
			return !target.hasAbility('stickyhold');
		},
		onAfterMoveSecondarySelf(target, source, move, item) {
		if (move.flags['contact']) {
			const yourItem = target.takeItem(source);
			const myItem = source.takeItem();
			if (target.item || source.item || (!yourItem && !myItem)) {
				if (yourItem) target.item = yourItem.id;
				if (myItem) source.item = myItem.id;
				return false;
			}
			if (
				(myItem && !this.singleEvent('TakeItem', myItem, source.itemData, target, source, move, myItem)) ||
				(yourItem && !this.singleEvent('TakeItem', yourItem, target.itemData, source, target, move, yourItem))
			) {
				if (yourItem) target.item = yourItem.id;
				if (myItem) source.item = myItem.id;
				return false;
			}
			this.add('-activate', source, 'ability: Pickpocket', '[of] ' + source);
			if (myItem) {
				target.setItem(myItem);
				this.add('-item', target, myItem, '[from] ability: Pickpocket');
			} else {
				this.add('-enditem', target, yourItem, '[silent]', '[from] ability: Pickpocket');
			}
			if (yourItem) {
				source.setItem(yourItem);
				this.add('-item', source, yourItem, '[from] ability: Pickpocket');
			} else {
				this.add('-enditem', source, myItem, '[silent]', '[from] ability: Pickpocket');
			}
			}
		}
	},
	forewarn: {
		onStart(pokemon) {
			let warnMoves: (Move | Pokemon)[][] = [];
			let warnBp = 1;
			for (const target of pokemon.side.foe.active) {
				if (target.fainted) continue;
				for (const moveSlot of target.moveSlots) {
					const move = this.dex.getMove(moveSlot.move);
					let bp = move.basePower;
					if (move.ohko) bp = 150;
					if (move.id === 'counter' || move.id === 'metalburst' || move.id === 'mirrorcoat') bp = 120;
					if (bp === 1) bp = 80;
					if (!bp && move.category !== 'Status') bp = 80;
					if (bp > warnBp) {
						warnMoves = [[move, target]];
						warnBp = bp;
					} else if (bp === warnBp) {
						warnMoves.push([move, target]);
					}
				}
			}
			if (!warnMoves.length) return;
			const [warnMoveName, warnTarget] = this.sample(warnMoves);
			this.add('-activate', pokemon, 'ability: Forewarn', warnMoveName, '[of] ' + warnTarget);
		},
		name: "Forewarn",
		rating: 0.5,
		num: 108,
	},
	neuroforce: {
		desc: "This Pokemon's attacks that are super effective against the target do 1.4x damage.",
		shortDesc: "Super effective hits by this Pokemon do 1.4x damage.",
		onModifyDamage(damage, source, target, move) {
			if (move && target.getMoveHitData(move).typeMod > 0) {
				return this.chainModify([0x1666, 0x1000]);
			}
		},
		name: "Neuroforce",
		rating: 2.5,
		num: 233,
	},
	stellarstriker: {
		desc: "This Pokemon's damaging moves become multi-hit moves that hit four times. The extra hits have its damage halved. Does not affect multi-hit moves or moves that have multiple targets.",
		shortDesc: "Damaging moves become 4x multihit with halved damage on extra hits.",
		onPrepareHit(source, target, move) {
			if (move.category === 'Status' || move.selfdestruct || move.multihit) return;
			if (['endeavor', 'fling', 'iceball', 'rollout'].includes(move.id)) return;
			if (!move.flags['charge'] && !move.spreadHit && !move.isZ && !move.isMax) {
				move.multihit = 4;
				move.multihitType = 'stellarstriker';
			}
		},
		onBasePowerPriority: 7,
		onBasePower(basePower, pokemon, target, move) {
			if (move.multihitType === 'stellarstriker' && move.hit > 1) return this.chainModify(0.50);
		},
		onSourceModifySecondaries(secondaries, target, source, move) {
			if (move.multihitType === 'stellarstriker' && move.id === 'secretpower' && move.hit < 2) {
				// hack to prevent accidentally suppressing King's Rock/Razor Fang
				return secondaries.filter(effect => effect.volatileStatus === 'flinch');
			}
		},
		name: "Stellar Striker",
		rating: 5,
		num: 184,
	},
	fullmetalbody: {
		onSourceModifyDamage(damage, source, target, move) {
			if (target.hp >= target.maxhp) {
				this.debug('Shadow Shield weaken');
				return this.chainModify(0.5);
			}
		},
		isUnbreakable: true,
		name: "Full Metal Body",
		rating: 2,
		num: 230,
	},
	insomnia: {
		onUpdate(pokemon) {
			if (pokemon.status === 'slp') {
				this.add('-activate', pokemon, 'ability: Insomnia');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'slp') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Insomnia');
			}
			return false;
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Dark') {
				{
					this.add('-immune', target, '[from] ability: Insomnia');
				}
				return null;
			}
		},
		name: "Insomnia",
		rating: 2,
		num: 15,
	},
	cloudnine: {
		desc: "Clears weather conditions on switch-in and disables them while this Pokemon is active.",
		shortDesc: "Clears weather on switch-in. Also disables weather while active.",
		onSwitchIn(pokemon) {
			this.field.clearWeather();
		},
		onStart(pokemon) {
			// Cloud Nine now activates after Neutralizing Gas or Skill Swap, etc
			this.add('-ability', pokemon, 'Cloud Nine');
			this.field.clearWeather();
		},
		suppressWeather: true,
		name: "Cloud Nine",
		rating: 2,
		num: 13,
	},
	flowergift: {
		desc: "If user is Cherrim, while Sunny Day is active all allies have their Attack, Special Attack and Speed multiplied by 1.5x.",
		shortDesc: "If user is Cherrim and Sunny Day is active, it and allies' Atk, SpA and Spe are 1.5x.",
		onStart(pokemon) {
			delete this.effectState.forme;
		},
		onUpdate(pokemon) {
			if (!pokemon.isActive || pokemon.baseSpecies.baseSpecies !== 'Cherrim' || pokemon.transformed) return;
			if (!pokemon.hp) return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				if (pokemon.species.id !== 'cherrimsunshine') {
					pokemon.formeChange('Cherrim-Sunshine', this.effect, false, '[msg]');
				}
			} else {
				if (pokemon.species.id === 'cherrimsunshine') {
					pokemon.formeChange('Cherrim', this.effect, false, '[msg]');
				}
			}
		},
		onAllyModifyAtkPriority: 3,
		onAllyModifyAtk(atk, pokemon) {
			if (this.effectState.target.baseSpecies.baseSpecies !== 'Cherrim') return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onAllyModifySpAPriority: 3,
		onAllyModifySpA(atk, pokemon) {
			if (this.effectState.target.baseSpecies.baseSpecies !== 'Cherrim') return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onAllyModifySpePriority: 3,
		onAllyModifySpe(spd, pokemon) {
			if (this.effectState.target.baseSpecies.baseSpecies !== 'Cherrim') return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		name: "Flower Gift",
		rating: 1,
		num: 122,
	},
	curiousmedicine: {
		desc: "On switch-in, this Pokemon clears the stat boosts of all Pokemon on the battlefield.",
		shortDesc: "Clears stat boosts of all Pokemon on switch-in.",
		onStart(pokemon) {
			for (const ally of pokemon.adjacentAllies()) {
				ally.clearBoosts();
				this.add('-clearboost', ally, '[from] ability: Curious Medicine', '[of] ' + pokemon);
			}
			for (const target of pokemon.adjacentFoes()) {
				target.clearBoosts();
				this.add('-clearboost', target, '[from] ability: Curious Medicine', '[of] ' + pokemon);
			}
		},
		name: "Curious Medicine",
		rating: 0,
		num: 261,
	},
	stormdrain: {
		desc: "This Pokemon is immune to Water-type moves and raises its SpA and Atk by 1 stage when hit by an Water-type move.",
		shortdesc: "Raises SpA and Atk by 1 when hit by an Water move. Immunity to Water.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.boost({spa: 1})) {
				}
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] ability: Storm Drain');
				}
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if (move.type !== 'Water' || ['firepledge', 'grasspledge', 'waterpledge'].includes(move.id)) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectState.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				if (this.effectState.target !== target) {
					this.add('-activate', this.effectState.target, 'ability: Storm Drain');
				}
				return this.effectState.target;
			}
		},
		name: "Storm Drain",
		rating: 3,
		num: 114,
	},
	battery: {
		onAllyModifySpAPriority: 10,
		onAllyModifyAtk(atk, pokemon) {
				return this.chainModify(1.5);
		},
		name: "Battery",
		rating: 0,
		num: 217,
	},
	sapsipper: {
		desc: "This Pokemon is immune to Grass-type moves and raises its SpA and Atk by 1 stage when hit by an Grass-type move.",
		shortdesc: "Raises SpA and Atk by 1 when hit by an Grass move. Immunity to Grass.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Grass') {
				if (!this.boost({spa: 1})) {
				}
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] ability: Sap Sipper');
				}
				return null;
			}
		},
		name: "Sap Sipper",
		rating: 3,
		num: 157,
	},
	bouncypillow: {
		desc: "This Pokemon takes 2/3 damage from attacking moves.",
		shortdesc: "This Pokemon takes 2/3 damage from attacking moves.",
		onSourceModifyDamage(damage, source, target, move) {
				this.debug('Bouncy Pillow reduce');
				return this.chainModify(0.66);
		},
		name: "Bouncy Pillow",
		rating: 3,
		num: -25,
	},
	normalize: {
		desc: "This Pokemon's moves are changed to Normal-type and have 1.5x power. Does not affect Hidden Power, Judgment, Multi Attack, Natural Gift, Revelation Dance, Struggle, Technoblast, Terrain Pulse and Weather Ball",
		shortdesc: "This Pokemon's moves are Normal-type and have 1.5x power.",
		onModifyTypePriority: 1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'hiddenpower', 'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'struggle', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (!(move.isZ && move.category !== 'Status') && !noModifyType.includes(move.id)) {
				move.type = 'Normal';
				move.normalizeBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.normalizeBoosted) return this.chainModify([5376, 4096]);
		},
		name: "Normalize",
		rating: 0,
		num: 96,
	},
	liquidvoice: {
		inherit: true,
		desc: "This Pokemon's sound moves are changed to Water-type and have 1.2x power.",
		shortdesc: "This Pokemon's sound moves are changed to Water-type and have 1.2x power.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.flags['sound'] && !pokemon.volatiles['dynamax']) { // hardcode
				move.type = 'Water';
				move.liquidvoiceBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.liquidvoiceBoosted) return this.chainModify([4915, 4096]);
		}
	},
	raindish: {
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'raindance' || effect.id === 'primordialsea') {
				this.heal(target.baseMaxhp / 4);
			}
		},
		name: "Rain Dish",
		rating: 1.5,
		num: 44,
	},
	icebody: {
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'hail') {
				this.heal(target.baseMaxhp / 4);
			}
		},
		name: "Ice Body",
		rating: 1.5,
		num: 44,
	},
	drainpower: {
		desc: "User gains 1.3x HP from draining/Aqua Ring/Ingrain/Leech Seed/Strength Sap.",
		shortdesc: "User gains 1.3x HP from draining/Aqua Ring/Ingrain/Leech Seed/Strength Sap.",
		onTryHealPriority: 1,
		onTryHeal(damage, target, source, effect) {
			const heals = ['drain', 'leechseed', 'ingrain', 'aquaring', 'strengthsap'];
			if (heals.includes(effect.id)) {
				return this.chainModify([5324, 4096]);
			}
		},
		name: "Drain Power",
		rating: 2,
		num: -26,
	},
	tailfists: {
		desc: "This Pokemon's Punch moves hit twice. The second hit deals 50% of the damage.",
		shortdesc: "This Pokemon's Punch moves hit twice. The second hit deals 50% of the damage.",
		onPrepareHit(source, target, move) {
			if (move.category === 'Status' || move.selfdestruct || move.multihit || !move.flags['punch']) return;
			if (['endeavor', 'fling', 'iceball', 'rollout'].includes(move.id)) return;
			if (!move.flags['charge'] && !move.spreadHit && !move.isZ && !move.isMax) {
				move.multihit = 2;
				move.multihitType = 'tailfists';
			}
		},
		onBasePowerPriority: 7,
		onBasePower(basePower, pokemon, target, move) {
			if (move.multihitType === 'tailfists' && move.hit > 1);
		},
		onSourceModifySecondaries(secondaries, target, source, move) {
			if (move.multihitType === 'tailfists' && move.id === 'secretpower' && move.hit < 2) {
				// hack to prevent accidentally suppressing King's Rock/Razor Fang
				return secondaries.filter(effect => effect.volatileStatus === 'flinch');
			}
		},
		name: "Tail Fists",
		rating: 4,
		num: -71,
	},
	headache: {
		desc: "This Pokemon's Special Attack is raised by 1 stage at the end of each turn it is on the battlefield.",
		shortdesc: "This Pokemon's SpA is raised by 1 stage at the end of each turn it is on the battlefield.",
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.activeTurns) {
				this.boost({spa: 1});
			}
		},
		name: "Headache",
		rating: 4.5,
		num: -70,
	},
	zenmode: {
		desc: "On switch-in, this Pokemon becomes its Zen form.",
		shortdesc: "On switch-in, this Pokemon becomes its Zen form.",
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Darmanitan' || pokemon.transformed) {
				return;
			}
			if (!['Zen', 'Galar-Zen'].includes(pokemon.species.forme)) {
				pokemon.addVolatile('zenmode');
			}
		},
		onEnd(pokemon) {
			if (!pokemon.volatiles['zenmode']) return;
			pokemon.transformed = false;
			delete pokemon.volatiles['zenmode'];
			if (pokemon.species.baseSpecies === 'Darmanitan' && pokemon.species.battleOnly) {
				pokemon.formeChange(pokemon.species.battleOnly as string, this.effect, false, '[silent]');
			}
		},
		condition: {
			onStart(pokemon) {
				if (!pokemon.species.name.includes('Galar')) {
					if (pokemon.species.id !== 'darmanitanzen') pokemon.formeChange('Darmanitan-Zen');
				} else {
					if (pokemon.species.id !== 'darmanitangalarzen') pokemon.formeChange('Darmanitan-Galar-Zen');
				}
			},
			onEnd(pokemon) {
				if (['Zen', 'Galar-Zen'].includes(pokemon.species.forme)) {
					pokemon.formeChange(pokemon.species.battleOnly as string);
				}
			},
		},
		isPermanent: true,
		name: "Zen Mode",
		rating: 0,
		num: 161,
	},
	ascension: {
		desc: "After 4 turns on the battlefield, this Pokemon obtains Godly powers.",
		shortdesc: "After 4 turns on the battlefield, this Pokemon obtains Godly powers.",
		onStart(pokemon) {
			pokemon.addVolatile('Ascension');
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['Ascension'];
			this.add('-end', pokemon, 'Ascension', '[silent]');
		},
		condition: {
			duration: 4,
			onStart(target) {
				this.add('-start', target, 'ability: Ascension');
			},
			onEnd(target) {
				this.add('-end', target, 'Ascension');
				this.boost({atk: 6}, target);
				this.boost({spa: 6}, target);
				this.add(target, ' has awakened their Godly Powers.');
			},
		},
		name: "Ascension",
		rating: -1,
		num: 112,
	},
	warriorswill: {
		desc: "This Pokemon's Attack is raised by 1 when it reaches 1/2 or less of its max HP.",
		shortdesc: "This Pokemon's Atk is raised by 1 when it reaches 1/2 or less of its max HP.",
		onDamage(damage, target, source, effect) {
			if (
				effect.effectType === "Move" &&
				!effect.multihit &&
				(!effect.negateSecondary && !(effect.hasSheerForce && source.hasAbility('sheerforce')))
			) {
				target.abilityData.checkedBerserk = false;
			} else {
				target.abilityData.checkedBerserk = true;
			}
		},
		onTryEatItem(item, pokemon) {
			const healingItems = [
				'aguavberry', 'enigmaberry', 'figyberry', 'iapapaberry', 'magoberry', 'sitrusberry', 'wikiberry', 'oranberry', 'berryjuice',
			];
			if (healingItems.includes(item.id)) {
				return pokemon.abilityData.checkedBerserk;
			}
			return true;
		},
		onAfterMoveSecondary(target, source, move) {
			target.abilityData.checkedBerserk = true;
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				this.boost({atk: 1});
			}
		},
		name: "Warrior's Will",
		rating: 2,
		num: 201,
	},
	galewings: {
		desc: "This Pokemon's Flying moves have +1 priority.",
		shortdesc: "This Pokemon's Flying moves have +1 priority.",
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.type === 'Flying') return priority + 1;
		},
		name: "Gale Wings",
		rating: 3,
		num: 177,
	},
	powerspot: {
		desc: "This Pokemon and its allies have the power of their moves multiplied by 1.3x.",
		shortdesc: "This Pokemon and its allies have the power of their moves multiplied by 1.3x.",
		onAllyBasePowerPriority: 10,
		onAllyBasePower(basePower, pokemon) {
				this.debug('Power Spot boost');
				return this.chainModify([5325, 4096]);
		},
		name: "Power Spot",
		rating: 4,
		num: 249,
	},
	powerofalchemy: {
		onAnyFaintPriority: 1,
		desc: "When any Pokemon faints, this copies its ability and restores 1/2 of its max HP.",
		shortdesc: "When any Pokemon faints, this copies its ability and restores 1/2 of its max HP",
		onAnyFaint(target, pokemon) {
			if (!this.effectState.target.hp) return;
			const ability = target.getAbility();
			const additionalBannedAbilities = [
				'noability', 'flowergift', 'forecast', 'hungerswitch', 'illusion', 'imposter', 'neutralizinggas', 'powerofalchemy', 'receiver', 'trace', 'wonderguard',
			];
			if (target.getAbility().isPermanent || additionalBannedAbilities.includes(target.ability)) return;
			this.add('-ability', this.effectState.target, ability, '[from] ability: Power of Alchemy', '[of] ' + target);
			this.effectState.target.setAbility(ability);
			this.heal(Math.floor(pokemon.maxhp / 2), pokemon, pokemon);
		},
		name: "Power of Alchemy",
		rating: 3,
		num: 222,
	},
	mysteriousmagic: {
		onBasePowerPriority: 19,
		desc: "This Pokemon's Hidden Power moves have 3.0x power.",
		shortdesc: "This Pokemon's Hidden Power moves have 3.0x power.",
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['unknown']) {
				return this.chainModify(3.0);
			}
		},
		name: "Mysterious Magic",
		rating: 4,
		num: -72,
	},
	flamingclaws: {
		onModifyTypePriority: -1,
		desc: "This Pokemon's Normal moves are changed to Fire-type and have 1.2x power.",
		shortdesc: "This Pokemon's sound moves are changed to Fire-type and have 1.2x power.",
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Fire';
				move.aerilateBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.aerilateBoosted) return this.chainModify([4915, 4096]);
		},
		name: "Flaming Claws",
		rating: 4,
		num: -71,
	},
	suctioncups: {
		desc: "This Pokemon removes hazards on switch and cannot be forced to switch by another Pokemon.",
		shortdesc: "Removes hazards on switch and cannot be forced to switch by another Pokemon.",
		onDragOutPriority: 1,
		onDragOut(pokemon) {
			this.add('-activate', pokemon, 'ability: Suction Cups');
			return null;
		},
		onStart(pokemon) {
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] ability: Suction Cups', '[of] ' + pokemon);
				}
			}
		},
		name: "Suction Cups",
		rating: 2,
		num: 21,
	},
	elusive: {
		desc: "This Pokemon takes 3/4 of attack damage and is switched out when damaged by another Pokemon's attack.",
		shortdesc: "Takes 3/4 damage from attacks and switches out when damaged by another Pokemon's attack.",
		onSourceModifyDamage(damage, source, target, move) {
				this.debug('Elusive reduce');
				return this.chainModify(0.75);
			},
			onDamagingHit(damage, target, source, move) {
			if (!this.canSwitch(target.side) || target.forceSwitchFlag || target.switchFlag) return;
			for (const side of this.sides) {
				for (const active of side.active) {
					active.switchFlag = false;
				}
			}
			target.switchFlag = true;
			this.add('-activate', target, 'ability: Elusive');
		},
		name: "Elusive",
		rating: 1,
		num: -75,
	},
	bitinghead: {
		desc: "Whenever this Pokemon attacks or is hit by a contact move, it deals damage equal to 1/8 of the interacting Pokemon's Health.",
		shortdesc: "Damages Pokemon by 1/8 of their max HP when it attacks or is hit by a contact move.",
		onPrepareHit(source, target, move) {
			if (move.category === 'Status' || move.selfdestruct) return;
			this.damage(target.baseMaxhp / 8, target);
		},
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.damage(source.baseMaxhp / 8, source, target);
				}
		},
		name: "Biting Head",
		rating: 4,
		num: -76,
		},
	emergencyexit: {
		desc: "This Pokemon switches out when it reaches 1/2 or less of its maximum HP. Also restores 1/3 of its HP.",
		shortdesc: "This Pokemon switches out when it reaches 1/2 or less of its maximum HP. Also restores 1/3 of its HP.",
		onEmergencyExit(target) {
			if (!this.canSwitch(target.side) || target.forceSwitchFlag || target.switchFlag) return;
			for (const side of this.sides) {
				for (const active of side.active) {
					active.switchFlag = false;
				}
			}
			target.switchFlag = true;
			this.heal(Math.floor(target.maxhp / 3), target, target);
			this.add('-activate', target, 'ability: Emergency Exit');
		},
		name: "Emergency Exit",
		rating: 2,
		num: 194,
	},
	wakingwrath: {
		name: "Waking Wrath",
		desc: "This Pokemon's Speed is raised by 2 stages when it wakes up from sleep.",
		shortDesc: "This Pokemon's Speed is raised by 2 stages when it wakes up from sleep.",
		onAfterSetStatus(status, target, source) {
			if (status.id !== 'slp' || !target.isAlly(source)) return;
				this.add('-ability', target, 'Waking Wrath');
				this.boost({spe: 2}, target, target, null, true);
				this.boost({atk: 2}, target, target, null, true);
		},
		rating: 2,
		num: 72,
	},
	primalrage: {
		desc: "This Pokemon's Attack is raised by 1 stage when it takes damage from an attack.",
		shortDesc: "This Pokemon's Attack is raised by 1 stage when it takes damage from an attack.",
		onDamagingHit(damage, target, source, effect) {
			this.boost({atk: 1});
		},
		name: "Primal Rage",
		rating: 4,
		num: 192,
	},
	ironfist: {
		desc: "This Pokemon's punch-based attacks have 1.3x power.",
		shortDesc: "This Pokemon's punch-based attacks have 1.3x power.",
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				this.debug('Iron Fist boost');
				return this.chainModify([5325, 4096]);
			}
		},
		name: "Iron Fist",
		rating: 3,
		num: 89,
	},
	martialmastery: {
		desc: "This Pokemon's wrestling-based attacks have 1.3x power.",
		shortDesc: "This Pokemon's wrestling-based attacks have 1.3x power.",
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['martial']) {
				this.debug('Martial Mastery boost');
				return this.chainModify([5325, 4096]);
			}
		},
		name: "Martial Mastery",
		rating: 3,
		num: 89,
	},
	flareboost: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (attacker.status === 'brn' && move.category === 'Special') {
				return this.chainModify(1.5);
			}
		},
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (effect.id === 'brn') {
				return false;
			}
		},
		name: "Flare Boost",
		rating: 2,
		num: 138,
	},
	toxicboost: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if ((attacker.status === 'psn' || attacker.status === 'tox') && move.category === 'Physical') {
				return this.chainModify(1.5);
			}
		},
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (effect.id === 'psn' || effect.id === 'tox') {
				return false;
			}
		},
		name: "Toxic Boost",
		rating: 2.5,
		num: 137,
	},
	mastersfocus: {
		desc: "This Pokemon's moves cannot be interrupted or stopped in any way.",
		shortDesc: "This Pokemon's moves cannot be interrupted or stopped in any way.",
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'flinch') return null;
		},
		onUpdate(pokemon) {
		if (pokemon.volatiles['taunt']) {
				this.add('-activate', pokemon, "ability: Master's Focus");
				pokemon.removeVolatile('taunt');
			}
		if (pokemon.volatiles['encore']) {
				this.add('-activate', pokemon, "ability: Master's Focus");
				pokemon.removeVolatile('encore');
			}
		if (pokemon.volatiles['attract']) {
				this.add('-activate', pokemon, "ability: Master's Focus");
				pokemon.removeVolatile('attract');
			}
		if (pokemon.volatiles['healblock']) {
				this.add('-activate', pokemon, "ability: Master's Focus");
				pokemon.removeVolatile('healblock');
			}
		if (pokemon.volatiles['torment']) {
				this.add('-activate', pokemon, "ability: Master's Focus");
				pokemon.removeVolatile('torment');
			}
		if (pokemon.volatiles['disable']) {
				this.add('-activate', pokemon, "ability: Master's Focus");
				pokemon.removeVolatile('disable');
			}
		if (pokemon.volatiles['confusion']) {
				this.add('-activate', pokemon, "ability: Master's Focus");
				pokemon.removeVolatile('confusion');
			}
		if (pokemon.status === 'slp') {
				this.add('-activate', pokemon, "ability: Master's Focus");
				pokemon.cureStatus('slp');
			}
		if (pokemon.status === 'par') {
				this.add('-activate', pokemon, "ability: Master's Focus");
				pokemon.cureStatus('par');
			}
		if (pokemon.status === 'frz') {
				this.add('-activate', pokemon, "ability: Master's Focus");
				pokemon.cureStatus('frz');
			}
		},
		onModifyMove(move) {
			if (move.flags['contact']) delete move.flags['protect'];
		},
		name: "Master's Focus",
		rating: 2.5,
		num: 39,
	},
	turboblaze: {
		desc: "This Pokemon's Speed and Special Attack are boosted by 1.25x during its first turn.",
		shortDesc: "This Pokemon's Spe and SpA are boosted by 1.25x during its first turn.",
		onStart(pokemon) {
			pokemon.addVolatile('turboblaze');
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['turboblaze'];
			this.add('-end', pokemon, 'Turboblaze', '[silent]');
		},
		condition: {
			duration: 1,
			onResidualOrder: 28,
			onResidualSubOrder: 2,
			onResidual(pokemon) {
			if (!pokemon.activeTurns) {
				duration = 1;
				}	
			},
			onStart(target) {
				this.add('-start', target, 'ability: Turboblaze');
			},
			onModifySpa(spa, pokemon) {
				return this.chainModify(1.25);
			},
			onModifySpe(spe, pokemon) {
				return this.chainModify(1.25);
			},
			onEnd(target) {
				this.add('-end', target, 'Turboblaze');
			}
		},
		name: "Turboblaze",
		rating: 5,
		num: 163,
	},
	teravolt: {
		desc: "This Pokemon's Speed and Attack are boosted by 1.25x during its first turn.",
		shortDesc: "This Pokemon's Spe and Atk are boosted by 1.25x during its first turn.",
		onStart(pokemon) {
			pokemon.addVolatile('teravolt');
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['teravolt'];
			this.add('-end', pokemon, 'Teravolt', '[silent]');
		},
		condition: {
			duration: 1,
			onResidualOrder: 28,
			onResidualSubOrder: 2,
			onStart(target) {
				this.add('-start', target, 'ability: Teravolt');
			},
			onModifyAtk(atk, pokemon) {
				return this.chainModify(1.25);
			},
			onModifySpe(spe, pokemon) {
				return this.chainModify(1.25);
			},
			onEnd(target) {
				this.add('-end', target, 'Teravolt');
			},
		},
		name: "Teravolt",
		rating: 5,
		num: 163,

   },
         }


