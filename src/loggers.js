const logLevels = require( '@jrapp/log-levels' );
const eventEmitters = require( './eventEmitters.js' );
const timers = require( './timers.js' );
const loggers = new Map();
class Logger {
	constructor( moduleName ) { Object.assign( this, { moduleName, timer: timers( this ) } ); }
  get undefined() { return undefined; }
  get undef() { return undefined; }
	return( value ) { return value; }
}
logLevels.forEach( ( { name, value: level } ) => {
	Logger.prototype[ name ] = function( message, meta, milliseconds ) {
    if( eventEmitters.has( level ) )
			eventEmitters.emit( level, {
				timestamp: Date.now(),
				name: this.moduleName,
				level,
				message,
				meta: ( meta instanceof Function ) ? meta() : meta,
				milliseconds
			} );
    return this;
  };
} );
module.exports = ( moduleName ) => loggers.get( moduleName ) || loggers.set( moduleName, new Logger( moduleName ) ).get( moduleName );
