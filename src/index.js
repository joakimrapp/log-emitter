const logLevels = require( '@jrapp/log-levels' );
const loggers = require( './loggers.js' );
const eventEmitters = require( './eventEmitters.js' );
module.exports = {
	log: loggers,
	on: ( config, listener ) =>
		logLevels.resolveValues( config ).forEach( value => eventEmitters.on( value, listener ) )
};
