const logLevels = require( '@jrapp/log-levels' );
const eventEmitters = require( './eventEmitters.js' );
class Timer {
  constructor( log ) { this.log = log; }
  start() {
    this.hrtime = process.hrtime();
    return this;
  }
  get undefined() { return undefined; }
  get undef() { return undefined; }
	job( job ) {
		this.promise = Promise.resolve( job );
		this.hrtime = process.hrtime();
		return this;
	}
}
logLevels.forEach( ( { name, value: level } ) => {
  Timer.prototype[ name ] = function( message, meta ) {
    if( eventEmitters.has( level ) ) {
			const { log, hrtime } = this;
			if( this.promise ) {
				this.promise = this.promise.then( ( data ) => {
					const [ seconds, nanoseconds ] = process.hrtime( hrtime );
		      log[ name ]( message, meta, ( ( seconds * 1e9 ) + nanoseconds ) / 1e6 );
					return data;
				} );
			}
			else {
				const [ seconds, nanoseconds ] = process.hrtime( hrtime );
	     	log[ name ]( message, meta, ( ( seconds * 1e9 ) + nanoseconds ) / 1e6 );
			}
    }
    return this;
  };
} );
module.exports = ( log ) => {
  const timers = new WeakMap();
  return ( reference ) => {
		if( reference ) {
			if( reference.then ) {
				return ( new Timer( log ) ).job( reference );
			}
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
