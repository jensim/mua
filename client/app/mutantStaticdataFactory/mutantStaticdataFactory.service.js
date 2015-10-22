'use strict';

angular.module('dndToolApp').factory('mutantStaticdataFactory', function ($http, $localStorage, $log) {
	// AngularJS will instantiate a singleton by calling "new" on this function
	var staticData,
		storageM = function (forceReset) {
			if ($localStorage.storage === undefined || $localStorage.storage.version === undefined) {
				if (staticData === undefined) {
					$localStorage.storage = {
						version: undefined
					};
				} else if (forceReset === true || $localStorage.storage.version !== staticData.version) {
					$localStorage.storage = {
						version: staticData.version
					};
				}
			}
		},
		storageMS = function (forceReset) {
			if ($localStorage.flatData === undefined || $localStorage.flatData.version === undefined) {
				if (staticData === undefined || $localStorage.flatData.version !== staticData.version || forceReset === true) {
					$http.get('/api/mutantdata').then(
						function (req, res) {
							staticData = res.data;
							$localStorage.flatData = staticData;
							$log.debug(res.data);
						},
						function (req, res) {
							$log.error(res.status + ': Server responded poorly..');
						});
				}
			}
		};

	(function () {
		$log.log('Loading datas...!');
		storageMS();
		storageM();
	})();

	return {
		resetStaticData: function () {
			storageMS(true);
		},
		resetData: function () {
			storageM(true);
		}
	};
});
