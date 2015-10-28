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
			if (forceReset === true) {
				$localStorage.flatData = undefined;
			}
			if ($localStorage.flatData === undefined || $localStorage.flatData.version === undefined) {
				if (staticData === undefined) {
					$http.get('/api/mutantdata').then(
						function (res) {
							staticData = res.data;
							$localStorage.flatData = staticData;
							$log.debug(res.data);

						},
						function (res) {
							$log.error(res.status + ': Server responded poorly..');
						});
				} else if ($localStorage.flatData.version !== staticData.version || forceReset === true) {
					$localStorage.flatData = staticData;
				}
			}
		};

	(function () {
		$log.log('Loading datas...!');
		storageMS();
		storageM();
	})();

	return {
		setStaticData: function () {
			storageMS();
		},
		resetStaticData: function () {
			storageMS(true);
		},
		resetData: function () {
			storageM(true);
		}
	};
});
