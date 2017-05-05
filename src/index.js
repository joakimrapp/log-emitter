const listeningLevels = new Map();
const eventEmitter = new ( require( 'events' ) ).EventEmitter();
const keys = new WeakMap();
const levels = [ [ 'fatal', true ], [ 'error' ], [ 'warning' ], [ 'info' ], [ 'debug' ], [ 'trace' ] ];
const create = {
	levels: ( moduleName, returns ) => Object.assign( ...levels.map( ( [ level, exit = false ] ) =>
		( { [ level ]: ( message, meta, extra ) => {
			eventEmitter.emit( listeningLevels.get( level ) || 'log', { moduleName, level, message, meta, extra } );
			if( exit )
				process.nextTick( process.exit );
			return returns;
		} } ) ) ),
	startTimer: ( key ) => {
		if( key )
			keys.set( key, process.hrtime() );
		else {
			const key = {};
			keys.set( key, process.hrtime() );
			return key;
		}
	}
};
class Timer { constructor( logEmitter, key ) { this.context = { key, logEmitter }; } }
levels.forEach( ( [ level ] ) => Timer.prototype[ level ] = function( message, meta ) {
	const diff = process.hrtime( keys.get( this.context.key ) );
	const milliseconds = ( ( diff[ 0 ] * 1e9 + diff[ 1 ] ) / 1e6 ).toFixed( 3 );
	this.context.logEmitter[ level ]( message, meta, `(in ${milliseconds} ms)` );
} );
class Time { constructor( logEmitter, job, args ) { this.context = { logEmitter, job, args }; } }
levels.forEach( ( [ level ] ) => Time.prototype[ level ] = function( message, meta ) {
	const hrtime = process.hrtime();
	const result = this.context.job( ...this.context.args );
	const [ seconds, nanoseconds ] = process.hrtime( hrtime );
	const milliseconds = ( ( seconds * 1000 ) + ( nanoseconds / 1000000 ) ).toFixed( 3 );
	this.context.logEmitter[ level ]( message, meta, `(in ${milliseconds} ms)` );
	return result;
} );
const LogEmitter = ( moduleName ) => {
	const instance = create.levels( moduleName );
	instance.startTimer = create.startTimer;
	instance.log = create.levels( moduleName, instance );
	instance.timer = ( key ) => new Timer( instance, key );
	instance.time = ( job, ...args ) => new Time( instance, job, args );
	return instance;
};
module.exports = Object.assign( moduleName => LogEmitter( moduleName ), { on: new Proxy( ( level, listener ) =>
	eventEmitter.on( level, listener ), {
	get: ( target, level, proxy ) => ( ...argumentsList ) =>
		target( listeningLevels.set( level, `log.${level}` ).get( level ), ...argumentsList ),
	apply: ( target, thisArg, argumentsList, proxy ) => target( 'log', ...argumentsList )
} ) } );
