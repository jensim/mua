'use strict';

angular.module('dndToolApp').factory('mutantCalcFactory', function ($localStorage) {
	// AngularJS will instantiate a singleton by calling "new" on this function

	var calcSecondarySkadeBonus = function () { //STY + STO
			var storage = $localStorage.storage,
				flatData = $localStorage.flatData,
				sum = storage.activeCharacter.attrPrim.STY.value + storage.activeCharacter.attrPrim.STO.value,
				skadeBonus = '',
				key;
			for (key in flatData.skadeBonus) {
				if (sum >= key) {
					skadeBonus = flatData.skadeBonus[key];
				}
			}
			storage.activeCharacter.attrSec.sb.value = skadeBonus;
		},
		calcBegArmorBody = function () {
			var c = $localStorage.storage.activeCharacter,
				armors = c.armors,
				shields = c.shields,
				sumBeg = 0,
				parts = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, '1', '2', '3', '4', '5', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
			armors.forEach(function (item) {
				if (item !== undefined && item.wearing !== undefined && item.wearing === true) {
					if (item.BEG !== undefined && !isNaN(item.BEG)) {
						var p = item.bodyPart,
							hit = false;

						if (angular.isArray(p)) {
							p.forEach(function (i) {
								if (parts.indexOf(i) !== -1) {
									hit = true;
								}
							});
						} else {
							if (parts.indexOf(p) !== -1) {
								hit = true;
							}
						}
						if (hit) {
							sumBeg += item.BEG;
						}
					}
				}
			});

			shields.forEach(function (item) {
				if (item.BEG !== undefined && !isNaN(item.BEG)) {
					sumBeg += Number(item.BEG);
				}
			});

			return Math.ceil(sumBeg);
		},
		calcBegArmorHead = function () {
			var c = $localStorage.storage.activeCharacter,
				armors = c.armors,
				sumBeg = 0;
			armors.forEach(function (item) {
				if (item !== undefined && item.wearing !== undefined && item.wearing === true) {
					if (item.BEG !== undefined && !isNaN(item.BEG)) {
						var p = item.bodyPart;
						if (p === 6 || p === '6' || (angular.isArray(p) && (p.indexOf(6) !== -1 || item.bodyPart.indexOf('6') !== -1))) {
							sumBeg += Number(item.BEG);
						}
					}
				}
			});

			return Math.ceil(sumBeg);
		},
		calcBegWeight = function () {
			var c = $localStorage.storage.activeCharacter,
				bf = c.attrSec.bf.value,
				weapons = c.weapons,
				armors = c.armors,
				items = c.items,
				shields = c.shields,
				weightArr = [weapons, armors, items, shields],
				sumWeight = 0;

			weightArr.forEach(function (arr) {
				if (angular.isArray(arr)) {
					arr.forEach(function (item) {

						if (item !== undefined && item.weight !== undefined && !isNaN(item.weight)) {
							sumWeight += Number(item.weight);
						}
					});
				}
			});

			if (bf < sumWeight) {
				return Math.ceil(sumWeight - bf);
			} else {
				return 0;
			}
		};

	return {
		calcSecondaryAttribute: function (attr) {
			var storage = $localStorage.storage;

			if (attr.name === storage.activeCharacter.attrSec.sb.name) {
				calcSecondarySkadeBonus();
			} else if (attr.name === storage.activeCharacter.attrSec.ib.name) {
				attr.value = storage.activeCharacter.attrPrim.SMI.value;
			} else if (attr.name === storage.activeCharacter.attrSec.bf.name) {
				attr.value = storage.activeCharacter.attrPrim.STY.value;
			} else if (attr.name === storage.activeCharacter.attrSec.rea.name) {
				attr.value = storage.activeCharacter.attrPrim.PER.value * 5;
			} else if (attr.name === storage.activeCharacter.attrSec.ryk.name) {
				attr.value = 0;
			} else if (attr.name === storage.activeCharacter.attrSec.sts.name) {
				attr.value = 0;
			} else if (attr.name === storage.activeCharacter.attrSec.ffstrid.name) {
				attr.value = Math.floor(storage.activeCharacter.attrPrim.SMI.value / 5);
			} else if (attr.name === storage.activeCharacter.attrSec.ffspring.name) {
				attr.value = Math.floor(storage.activeCharacter.attrPrim.SMI.value / 2);
			} else if (attr.name === storage.activeCharacter.attrSec.ffsprint.name) {
				attr.value = storage.activeCharacter.attrPrim.SMI.value;
			} else if (attr.name === storage.activeCharacter.attrSec.kp.name) {
				attr.value = storage.activeCharacter.attrPrim.FYS.value + storage.activeCharacter.attrPrim.STO.value;
			} else if (attr.name === storage.activeCharacter.attrSec.tt.name) {
				attr.value = Math.floor((storage.activeCharacter.attrPrim.FYS.value + storage.activeCharacter.attrPrim.STO.value) / 2);
			}
		},
		getSkillUsedErf: function (skill) {
			var sum = 0;
			if (skill.valueErf > 0 || skill.postTrained) {
				var storage = $localStorage.storage;

				sum += skill.postTrained || 0;

				var timesGE = skill.natural ? 1 : skill.postTrained ? 1 : 0;
				timesGE += skill.valueSp + skill.valueSpFree;
				var attrPrim = storage.activeCharacter.attrPrim[skill.attrPrim],
					fromGE = timesGE * (attrPrim.value + attrPrim.mod),
					fromTrain = skill.valueErf,
					total = fromGE + fromTrain;
				if (total < 85) {
					sum += skill.valueErf;
				} else if (total > 100) {
					if (fromGE < 85) {
						sum += (85 - fromGE);
						sum += ((100 - 85) * 2);
						sum += ((total - 100) * 3);
					} else if (fromGE > 100) {
						sum += ((total - fromGE) * 3);
					} else { //GE between..
						sum += ((100 - fromGE) * 2);
						sum += ((total - 100) * 3);
					}
				} else { //between
					if (fromGE < 85) {
						sum += (85 - fromGE);
						sum += ((total - 85) * 2);
					} else {
						sum += ((total - fromGE) * 2);
					}
				}
			}
			return sum;
		},
		calcArmorBodypart: function (part) {
			var sum = 0,
				storage = $localStorage.storage;
			storage.activeCharacter.armors.forEach(function (a) {
				if (a.bodyPart === part && a.wearing) {
					sum += a.ABS;
				} else if (a.bodyPart.toString() === part.toString() && a.wearing) {
					sum += a.ABS;
				} else if (angular.isArray(a.bodyPart) && a.wearing && (a.bodyPart.indexOf(Number(part)) !== -1 || a.bodyPart.indexOf(part.toString()) !== -1)) {
					sum += a.ABS;
				}
			});
			return sum;
		},
		calcBeg: function (skill) {
			//if (skill === undefined) {					throw 'Skill is mandatory.';				}
			var sum = 0,
				skillName = skill.name.toLowerCase();

			if (skillName.indexOf('akrobatik') === 0 || skillName.indexOf('smyga') === 0 || skillName.indexOf('undvika') === 0) {
				//akrobatik, smyga, undvika,
				sum += calcBegArmorBody();

			} else if (skillName.indexOf('iaktagelseförmåga') === 0) {
				//iaktegelseförmåga
				sum += calcBegArmorHead();
			}

			if (skill.attrPrim === 'SMI') {
				//smi
				sum += calcBegWeight();
			}

			return sum;
		}
	};
});
