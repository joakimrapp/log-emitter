const logLevels = require( '@jrapp/log-levels' );
const eventEmitters = require( './eventEmitters.js' );
class Timer {
	static milliseconds( hrtime ) {
		const [ seconds, nanoseconds ] = process.hrtime( hrtime );
		return ( ( seconds * 1e9 ) + nanoseconds ) / 1e6;
	}
  constructor( log ) { this.log = log; }
  start() {
    this.hrtime = process.hrtime();
    return this;
  }
  get undefined() { return undefined; }
  get undef() { return undefined; }
	return( value ) { return value; }
	set( value ) { this.value = value; return this; }
	get() { return this.value; }
	job( job ) {
		this.hrtime = process.hrtime();
		this.promise = Promise.resolve( job );
		return this;
	}
}
logLevels.forEach( ( { name, value: level } ) => {
  Timer.prototype[ name ] = function( message, meta ) {
    if( eventEmitters.has( level ) ) {
			const { log, hrtime } = this;
			if( this.promise )
				this.promise = this.promise.then( data =>
					log[ name ]( message, meta instanceof Function ? meta( data ) : meta, Timer.milliseconds( hrtime ) ).return( data ) );
			else
	     	log[ name ]( message, meta, Timer.milliseconds( hrtime ) );
    }
    return this;
  };
} );
module.exports = ( log ) => {
  const timers = new WeakMap();
  return ( reference ) => {
		if( reference ) {
			if( reference.then instanceof Function )
				return ( new Timer( log ) ).job( reference );
			else {
				let timer = timers.get( reference );
				if( timer )
					return timer;
				else {
					timers.set( reference, timer = new Timer( log ) );
					return timer.start();
				}
			}
		}
		else
			return ( new Timer( log ) ).start();
  };
};
