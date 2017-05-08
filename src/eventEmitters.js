const events = require( 'events' );
const store = new Map();
module.exports = {
  has: ( level ) => store.has( level ),
  emit: ( level, msg ) => store.has( level ) ? store.get( level ).emit( 'log', msg ) : undefined,
  on: ( level, fn ) => ( store.get( level ) || store.set( level, new events.EventEmitter() ).get( level ) ).on( 'log', fn ),
	clear: () => store.clear()
};
