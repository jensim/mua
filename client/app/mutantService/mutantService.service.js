'use strict';

angular.module('dndToolApp').factory('mutantService', function ($localStorage, $log) {
	// AngularJS will instantiate a singleton by calling "new" on this function

	var saveCharacter = function (inChar) {
		var storage = $localStorage.storage;
		//character = angular.copy(inChar);

		if (inChar) {
			if (storage.characters === undefined) {
				storage.characters = [inChar];
				return;
			} else if (storage.characters.indexOf(inChar) === -1) {
				storage.characters.push(inChar);
			} else {
				$log.error('Didn\'t save.');
			}
		}
	};

	return {
		newCharacter: function (iklass, ijob) {
			var staticStorage = $localStorage.flatData,
				storage = $localStorage.storage,

				newChar = {
					name: 'Ny',
					klass: angular.copy(iklass),
					job: angular.copy(ijob),
					attrPrim: angular.copy(staticStorage.attrPrim),
					attrSec: angular.copy(staticStorage.attrSec),
					skills: [],
					armors: [],
					shields: [],
					powers: [],
					notes: [],
					weapons: [],
					items: [],
					money: angular.copy(ijob.startcapital)
				};
			var addSkill = function (s) {
				var newSkill = angular.copy(s);
				newSkill.valueSp = 0;
				newSkill.valueSpFree = 0;
				newSkill.valueErf = 0;
				newSkill.valueErfFree = 0;
				newChar.skills.push(newSkill);
			};
			ijob.trainedSkills.split(',').forEach(function (s) {
				staticStorage.skills.forEach(function (skill) {
					if (s.trim().toLowerCase() === skill.name.toLowerCase()) {
						addSkill(skill);
					}
				});
			});
			staticStorage.skills.forEach(function (skill) {
				if (skill.natural === true || skill.natural === 'TRUE') {
					addSkill(skill);
				}
			});

			storage.activeCharacter = newChar;
			saveCharacter(newChar);
		}
	};
});
