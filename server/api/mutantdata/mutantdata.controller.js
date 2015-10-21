'use strict';

var _ = require('lodash');
var Tabletop = require('tabletop');
var listeners = [];
var mutantData;
var mutantDataGet = true;
var gSheets = [
	{
		key: 'klasser',
		place: 'klasses'
				}, {
		key: 'imm_talang',
		place: 'powers',
		subPlace: 'imm'
				}, {
		key: 'psi_mutation',
		place: 'powers',
		subPlace: 'psi'
				}, {
		key: 'rbt_option',
		place: 'powers',
		subPlace: 'rbt'
				}, {
		key: 'mm_mutation',
		place: 'powers',
		subPlace: 'mm'
				}, {
		key: 'weapons_regClose',
		name: 'Vanliga närstridsvapen',
		place: 'weapons',
		subPlace: 'regClose',
		subSubPlace: 'weapons'
				}, {
		key: 'weapons_techClose',
		name: 'Högteknologiska närstridsvapen',
		place: 'weapons',
		subPlace: 'techClose',
		subSubPlace: 'weapons'
				}, {
		key: 'weapons_regMissile',
		name: 'Vanliga kast- och projektilvapen',
		place: 'weapons',
		subPlace: 'regMissile',
		subSubPlace: 'weapons'
				}, {
		key: 'weapons_techMissile',
		name: 'Högteknologiska projektilvapen',
		place: 'weapons',
		subPlace: 'techMissile',
		subSubPlace: 'weapons'
				}, {
		key: 'weapons_blackPowder',
		name: 'Svartkrutsvapen',
		place: 'weapons',
		subPlace: 'blackPowder',
		subSubPlace: 'weapons'
				}, {
		key: 'weapons_gun',
		name: 'Skjutvapen',
		place: 'weapons',
		subPlace: 'gun',
		subSubPlace: 'weapons'
				}, {
		key: 'weapons_homebuilt',
		name: 'Typiska hemmabyggen',
		place: 'weapons',
		subPlace: 'homebuilt',
		subSubPlace: 'weapons'
				}, {
		key: 'weapons_gyro',
		name: 'Gyrojet- och Gausvapen',
		place: 'weapons',
		subPlace: 'gyro',
		subSubPlace: 'weapons'
				}, {
		key: 'weapons_energy',
		name: 'Energivapen',
		place: 'weapons',
		subPlace: 'energy',
		subSubPlace: 'weapons'
				}, {
		key: 'weapons_regTrap',
		name: 'Vanliga fällor',
		place: 'weapons',
		subPlace: 'regTrap',
		subSubPlace: 'weapons'
				}, {
		key: 'weapons_granade',
		name: 'Granater',
		place: 'weapons',
		subPlace: 'granade',
		subSubPlace: 'weapons'
				}, {
		key: 'weapons_explosives',
		name: 'Sprängämnen och minor',
		place: 'weapons',
		subPlace: 'explosives',
		subSubPlace: 'weapons'
				}, {
		key: 'weapons_granadeLauncher',
		name: 'Granatvapen',
		place: 'weapons',
		subPlace: 'granadeLauncher',
		subSubPlace: 'weapons'
				}, {
		key: 'weapons_machineGun',
		name: 'Kulsprutur',
		place: 'weapons',
		subPlace: 'machineGun',
		subSubPlace: 'weapons'
				}, {
		key: 'weapons_armorPierce',
		name: 'Pansarvapen',
		place: 'weapons',
		subPlace: 'armorPierce',
		subSubPlace: 'weapons'
				}, {
		key: 'jobs',
		place: 'jobs'
				}, {
		key: 'skills',
		place: 'skills'
				}, {
		key: 'armors_primitive',
		name: 'Primitiva rustningar',
		place: 'armors',
		subPlace: 'primitive',
		subSubPlace: 'armors'
				}, {
		key: 'armors_kevlar',
		name: 'Kevlar- och Impactrustningar',
		place: 'armors',
		subPlace: 'kevlar',
		subSubPlace: 'armors'
				}, {
		key: 'armors_energyArmor',
		name: 'Energirustningar och reflecskydd',
		place: 'armors',
		subPlace: 'energyArmor',
		subSubPlace: 'armors'
				}, {
		key: 'shields',
		place: 'shields'
				}, {
		key: 'gear_spareParts',
		name: 'Reservdelar',
		place: 'gear',
		subPlace: 'spareParts',
		subSubPlace: 'items'
				}, {
		key: 'gear_foods',
		name: 'Mat, dryck & boende',
		place: 'gear',
		subPlace: 'foods',
		subSubPlace: 'items'
				}, {
		key: 'gear_animals/transport',
		name: 'Djur & transport',
		place: 'gear',
		subPlace: 'transport',
		subSubPlace: 'items'
				}, {
		key: 'gear_adventure',
		name: 'Expeditionsutrustning',
		place: 'gear',
		subPlace: 'adventure',
		subSubPlace: 'items'
				}, {
		key: 'gear_misc',
		name: 'Diverse utrustning',
		place: 'gear',
		subPlace: 'misc',
		subSubPlace: 'items'
				}, {
		key: 'gear_services',
		name: 'Tjänster',
		place: 'gear',
		subPlace: 'services',
		subSubPlace: 'items'
				}, {
		key: 'gear_tools',
		name: 'Verktyg',
		place: 'gear',
		subPlace: 'tools',
		subSubPlace: 'items'
				}, {
		key: 'gear_traps',
		name: 'Fällor och vapentillbehör',
		place: 'gear',
		subPlace: 'traps',
		subSubPlace: 'items'
				}
			];

var tableTopCallback = function (data) {
	if (!data) {
		return;
	}
	var staticData = {
		//version: version,
		klasses: {},
		//attrPrimShort: attrPrimShort,
		//attrPrim: attrPrim,
		skills: {},
		jobs: {},
		//skadeBonus: skadeBonus,
		//attrSec: attrSec,
		powers: {},
		//weaponReach: weaponReach,
		weapons: {},
		//bodyParts: bodyParts,
		armors: {},
		shields: [],
		gear: {}
	};

	/*
	console.log('Tabletop data: ');
	_(data).forEach(function (page, iPage) {
		if (page.column_names && page.name === 'jobs') {
			tmpData[page.name] = {
				name: page.name,
				elements: page.elements
			};

			console.log('SHEET: ' + page.name);
			console.log('COLUMN_NAMES: ' + page.column_names);
			page.elements.forEach(function (element) {
				console.log('ROW: ' + JSON.stringify(element));
			});
			console.log('./' + page.name);
			console.log('-----\n');
		}
	});
	*/
	gSheets.forEach(function (s) {
		try {
			if (!s.key) {
				throw 'Error';
			}
			/* data[s.key].elements.forEach(function (e) {
				data[s.key].column_names.forEach(function (c) {
					if (e[c].charAt(0) === '[' && e[c].slice(-1) === ']') {
						e[c] = e[c].slice(1, -1).split(',');
						if (!Array.isArray(e[c])) {
							e[c] = [e[c]];
						}
					}
				});
			});*/
			if (s.subSubPlace) {
				if (staticData[s.place][s.subPlace] === undefined) {
					staticData[s.place][s.subPlace] = {};
				}
				staticData[s.place][s.subPlace][s.subSubPlace] = data[s.key].elements;
				if (s.name) {
					staticData[s.place][s.subPlace].name = s.name;
				}
			} else if (s.subPlace) {
				staticData[s.place][s.subPlace] = data[s.key].elements;
				if (s.name) {
					staticData[s.place].name = s.name;
				}
			} else if (s.place) {
				staticData[s.place] = data[s.key].elements;
			} else {
				throw 'Error';
			}
		} catch (err) {
			console.error('Error on sheet: ' + s.key + ' :: ' + err);
		}
	});

	mutantData = staticData;
	listeners.forEach(function (l) {
		try {
			l(mutantData);
		} catch (err) {
			console.err('Problem calling listener: ' + err);
		}
	});
};
var loadMutantData = function () {
	if (mutantDataGet) {
		mutantDataGet = false;
		Tabletop.init({
			key: '1-O2dpXX923Hetv2P24XpN4KhhLSr7-NJ-rnrx_pB_ug',
			parseNumbers: true,
			callback: tableTopCallback,
			postProcess: function (element) {

				if (element.multiPart && element.multiPart === 'TRUE') {
					element.multiPart = true;
				} else if (element.multiPart && element.multiPart === 'FALSE') {
					element.multiPart = false;
				}
				if (element.natural && element.natural == 'TRUE') { //SKILL.natural
					element.natural = true;
				} else if (element.natural && element.natural == 'FALSE') {
					element.natural = false;
				}
			}
		});
	}
};
loadMutantData();
setInterval(loadMutantData, 120000);

// Get list of mutantdatas
exports.index = function (req, res) {
	mutantDataGet = true;
	if (!!mutantData) {
		return res.status(200).send(mutantData);
	} else {
		return res.status(500).send('No data on server..');
	}
};

exports.listen = function (listener) {
	listeners.push(listener);
};
