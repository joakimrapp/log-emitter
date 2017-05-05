const levels = require( './levels.json' );
const emitters = require( './emitters.js' );
class Timer {
  constructor( context ) { this._context = context; }
  start() {
    this._context.hrtime = process.hrtime();
    return this;
  }
  get reference() { return this._context.reference; }
  get ref() { return this._context.reference; }
  get undefined() { return undefined; }
  get undef() { return undefined; }
}
levels.forEach( ( { names, value } ) => names.forEach( ( name ) => {
  Timer.prototype[ name ] = function( message, meta ) {
    if( emitters.has( name ) ) {
      const [ seconds, nanoseconds ] = process.hrtime( this._context.hrtime );
      this._context.emit[ name ]( message, meta, ( ( seconds * 1e9 ) + nanoseconds ) / 1e6 );
    }
    return this;
  };
} ) );
module.exports = ( emit ) => {
  const timers = new WeakMap();
  return ( reference = {} ) => {
    let timer = timers.get( reference );
    if( !timer )
      timers.set( reference, timer = new Timer( { emit, reference } ) );
    return timer.start();
  };
};
