'use strict';

angular.module('dndToolApp').controller('MutantCtrl', function ($scope, $log, $localStorage, $interval, mutantStaticdataFactory) {
	$scope.message = 'Hello';

	var storage, flatData,
		jsonLog = function (j) {
			$log.log(JSON.stringify(j, null, '\t'));
		},
		rebindStorages = function () {
			var stopTime = $interval(function () {
				if ($localStorage.storage && $localStorage.flatData) {
					storage = $localStorage.storage;
					$scope.storage = $localStorage.storage;
					flatData = $localStorage.flatData;
					$scope.flatData = $localStorage.flatData;

					storage.activeCharacter = storage.characters ? storage.characters[0] : undefined;

					$interval.cancel(stopTime);
				}
			}, 250);
		};
	rebindStorages();



	$scope.logIt = function (msg) {
		jsonLog(msg);
	};
	$scope.resetStaticData = function () {
		mutantStaticdataFactory.resetStaticData(true);
		rebindStorages();
	};
	$scope.resetUserData = function () {
		mutantStaticdataFactory.resetData(true);
		rebindStorages();
	};


	/* * * * * * * * * * * */

	$scope.createCharacter = function (klass, job) {
		if (klass && job) {
			mutantService.newCharacter(klass, job);
		}
	};
	$scope.loadCharacter = function (character) {
		storage.activeCharacter = character;
	};
	$scope.deleteCharacter = function (charIndex) {
		if (storage.characters.splice(charIndex, 1)[0] === storage.activeCharacter) {
			storage.activeCharacter = undefined;
		}
	};
	$scope.editAttrPrim = function (a) {
		if ($scope.attrPrimEdit === a) {
			$scope.attrPrimEdit = undefined;
		} else {
			$scope.attrPrimEdit = a;
		}
	};
	$scope.editWeapon = function (weapon) {
		if ($scope.weaponEdit === weapon) {
			$scope.weaponEdit = undefined;
		} else {
			$scope.weaponEdit = weapon;
		}
	};
	$scope.createWeapon = function (weapon) {
		var newWep = angular.copy(weapon);
		storage.activeCharacter.weapons.push(newWep);
		$scope.weaponEdit = newWep;
	};
	$scope.deleteWeapon = function (weaponIndex) {
		if (storage.activeCharacter.weapons.splice(weaponIndex, 1)[0] === $scope.weaponEdit) {
			$scope.weaponEdit = undefined;
		}
	};
	$scope.calcSecAttr = function (attr) {
		if (attr === undefined) {
			for (attr in storage.activeCharacter.attrSec) {
				mutantCalcFactory.calcSecondaryAttribute(storage.activeCharacter.attrSec[attr]);
			}
		} else {
			mutantCalcFactory.calcSecondaryAttribute(attr);
		}
	};
	$scope.skillSum = function (skill) {
		var timesGE = skill.natural ? 1 : skill.postTrained ? 1 : 0;
		timesGE += skill.valueSp + skill.valueSpFree;
		var fromGE = timesGE * (
			storage.activeCharacter.attrPrim[skill.attrPrim].value +
			storage.activeCharacter.attrPrim[skill.attrPrim].mod);
		var fromTrain = skill.valueErf + skill.valueErfFree;

		return fromGE + fromTrain - mutantCalcFactory.calcBeg(skill);
	};
	$scope.getUsedGE = function () {
		var sum = 0;
		if (storage.activeCharacter) {
			var attr;
			for (attr in storage.activeCharacter.attrPrim) {
				sum += storage.activeCharacter.attrPrim[attr].value;
			}
		}
		return sum;

	};
	$scope.getUsedSP = function () {
		var sum = 0;
		if (storage.activeCharacter) {
			var skill;
			for (skill in storage.activeCharacter.skills) {
				sum += storage.activeCharacter.skills[skill].valueSp;
			}
			var power;
			for (power in storage.activeCharacter.powers) {
				sum += storage.activeCharacter.powers[power].cost;
			}
		}
		return sum;
	};
	$scope.getUsedErf = function () {
		var sum = 0;
		if (storage.activeCharacter) {
			storage.activeCharacter.skills.forEach(function (skill, index, skills) {
				sum += $scope.getSkillUsedErf(skills[index]);
			});
		}
		return sum;
	};
	$scope.getSkillUsedErf = function (skill) {
		return mutantCalcFactory.getSkillUsedErf(skill);
	};
	$scope.createSkill = function (skill) {
		var newSkill = angular.copy(skill);
		newSkill.postTrained = 14 - storage.activeCharacter.attrPrim.INT.value;
		if (newSkill.postTrained < 2) {
			newSkill.postTrained = 2;
		}
		storage.activeCharacter.skills.push(newSkill);
		$scope.create.skill = {};
	};
	$scope.deleteSkill = function (skillIndex) {
		storage.activeCharacter.skills.splice(skillIndex, 1);
		$scope.skillEdit = undefined;
	};
	$scope.editSkill = function (skill) {
		if (skill === $scope.skillEdit) {
			$scope.skillEdit = undefined;
		} else {
			$scope.skillEdit = skill;
		}
	};
	$scope.editPower = function (power) {
		if ($scope.powerEdit === power) {
			$scope.powerEdit = undefined;
		} else {
			$scope.powerEdit = power;
		}
	};
	$scope.createPower = function (power) {
		var newPower = angular.copy(power);
		storage.activeCharacter.powers.push(newPower);
		if (newPower.skill) {
			storage.activeCharacter.skills.push(angular.copy(newPower.skill));
		}
		$scope.powerEdit = newPower;
	};
	$scope.deletePower = function (powerIndex) {
		if (storage.activeCharacter.powers.splice(powerIndex, 1)[0] === $scope.powerEdit) {
			$scope.powerEdit = undefined;
		}
	};
	$scope.availablePowers = function () {
		if (storage.activeCharacter) {
			return flatData.powers[storage.activeCharacter.klass.short];
		} else {
			return {};
		}
	};
	$scope.calcArmor = function (part) {
		if (storage.activeCharacter === undefined) {
			return 0;
		}
		if (part === undefined) {
			throw 'calcArmor:: no part defined';
		}
		return mutantCalcFactory.calcArmorBodypart(part);
	};
	$scope.calcBeg = function (skill) {
		if (storage.activeCharacter === undefined) {
			return 0;
		}
		return mutantCalcFactory.calcBeg(skill);
	};
	$scope.createArmor = function (armor) {
		var newArmor = angular.copy(armor);
		if (newArmor.multiPart === true) {
			newArmor.bodyPart = newArmor.fits;
		}
		storage.activeCharacter.armors.push(newArmor);
	};
	$scope.deleteArmor = function (armor) {
		if (armor === $scope.armorEdit) {
			$scope.armorEdit = undefined;
		}
		storage.activeCharacter.armors.forEach(function (a, i, armors) {
			if (a === armor) {
				armors.splice(i, 1);
			}
		});
	};
	$scope.armorFilter = function (bodyPart) {
		return /\d/.test(bodyPart);
	};
	$scope.editArmor = function (armor) {
		if (armor === $scope.armorEdit) {
			$scope.armorEdit = undefined;
		} else {
			$scope.armorEdit = armor;
		}
	};
	$scope.createNote = function () {
		var newNote = {
			head: 'Ny',
			content: ''
		};
		$scope.noteEdit = newNote;
		storage.activeCharacter.notes.push(newNote);
	};
	$scope.editNote = function (note) {
		if (note === $scope.noteEdit) {
			$scope.noteEdit = undefined;
		} else {
			$scope.noteEdit = note;
		}
	};
	$scope.deleteNote = function (noteIndex) {
		if (storage.activeCharacter.notes.splice(noteIndex, 1)[0] === $scope.noteEdit) {
			$scope.noteEdit = undefined;
		}
	};
	$scope.createItem = function (item) {
		if (item) {
			var newItem = angular.copy(item);
			storage.activeCharacter.items.push(newItem);
			$scope.itemEdit = newItem;
		} else {
			var newItem = {
				name: 'Nytt föremål',
				description: '',
				quantity: 1,
				cost: 0
			};
			storage.activeCharacter.items.push(newItem);
			$scope.itemEdit = newItem;
		}
	};
	$scope.editItem = function (item) {
		if ($scope.itemEdit === item) {
			$scope.itemEdit = undefined;
		} else {
			$scope.itemEdit = item;
		}
	};
	$scope.deleteItem = function (itemIndex) {
		//throw 'not yet implmented';
		if (storage.activeCharacter.items.splice(itemIndex, 1)[0] === $scope.itemEdit) {
			$scope.itemEdit = undefined;
		}
	};
	$scope.moneyManage = function (mod) {
		storage.activeCharacter.money += mod;
	};
});
