const timers = require( './timers.js' );
class LogEmitter {
  constructor( moduleName ) {

  }
  get undef() { return undefined; }
  get timer( reference ) {
    return Timer.get( this, reference );
  }
}
