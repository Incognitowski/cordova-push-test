cordova.define("cordova-softniels-plugin.snBatteryOptimization", function(require, exports, module) {
var exec = require('cordova/exec');

exports.disableBatteryOptimizations = function(arg0, success, error)
{
	exec(success, error, "snBatteryOptimization", "battery", []);
};
exports.moveToForeground = function(arg0, success, error)
{
	exec(success, error, "snBatteryOptimization", "foreground", []);
};
});
