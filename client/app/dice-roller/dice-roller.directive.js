'use strict';

angular.module('dndToolApp').directive('diceRoller', function ($timeout) {
	var isMobileOrTablet = function () {
		return false;
	};
	return {
		templateUrl: 'app/dice-roller/dice-roller.html',
		restrict: 'E',
		scope: true,
		controller: function ($scope, $element) {
			$scope.result = '';
			var diceClasses = ['fi-die-one', 'fi-die-two', 'fi-die-three', 'fi-die-four', 'fi-die-five', 'fi-die-six'];
			$scope.diceClass = diceClasses[Math.floor(Math.random() * diceClasses.length)];
			var forceShow = false,
				hoverShow = false,
				result = -1,
				timeout,
				showTime = $element.attr('show') || 3500,
				//init parse attrs
				rollDice = function () {
					var i, sum = 0,
						diceParts = $element.attr('dice') ? $element.attr('dice').split(' ') : ['0D6'];
					for (i = 0; i < diceParts.length; i += 1) {
						var dicePart = diceParts[i],
							oneDiceType = dicePart.split(/[tdTD]/g);
						if (oneDiceType.length === 2) {
							var multiplier = 1,
								numberOfDice;
							if (oneDiceType[0].charAt(0) === '-') {
								multiplier = -1;
								numberOfDice = Number(oneDiceType[0].substring(1));
							} else {
								numberOfDice = Number(oneDiceType[0]);
							}
							var diceSize = Number(oneDiceType[1]),
								rolledDice;

							for (rolledDice = 0; rolledDice < numberOfDice; rolledDice += 1) {
								var partSum = Math.floor((Math.random() * diceSize) + 1) * multiplier;
								sum += partSum;
							}
						} else if (dicePart.indexOf('+') === 0) {
							sum += Number(dicePart.substr(1, dicePart.length - 1));
						} else if (dicePart.indexOf('-') === 0) {
							sum -= Number(dicePart.substr(1, dicePart.length - 1));
						} else {
							console.error('could not calc dice roll:' + $element.attr('dice'));
							result = -1;
							break;
						}
					}
					result = sum;
				},
				hideOrShow = function () {
					if ((forceShow || hoverShow) && result !== -1) {
						$scope.result = result;
					} else {
						$scope.result = '';
					}
				};

			$scope.theClick = function () {
				rollDice();
				forceShow = true;
				hideOrShow();
				if ($element.attr('reroll') === undefined || $element.attr('reroll') === 'true') {
					var oldClass = $scope.diceClass;
					while (oldClass === $scope.diceClass) {
						$scope.diceClass = diceClasses[Math.floor(Math.random() * diceClasses.length)];
					}
				}

				$timeout.cancel(timeout);
				if (($element.attr('persist') === undefined && !isMobileOrTablet()) || $element.attr('persist') === 'false') {
					timeout = $timeout(function () {
						forceShow = false;
						hideOrShow();
					}, showTime);
				}
			};

			$scope.theEnter = function () {
				hoverShow = true;
				hideOrShow();
			};
			$scope.theLeave = function () {
				hoverShow = false;
				hideOrShow();
			};
			$scope.$on('desctroy', function () { //Param: event
				$timeout.cancel(timeout);
			});
		}
	};
});
