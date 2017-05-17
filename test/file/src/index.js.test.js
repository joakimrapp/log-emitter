require( '@jrapp/node-project-setup' ).testing.file( './test/file' )( ( logEmitter ) => ( {
	eventEmitters: require( '../../../src/eventEmitters.js' ),
	log: logEmitter.log( 'test' )
} ) )
	.describe( 'logEmitter.log( moduleName )' )
		.it( 'should emit when there is a listener', ( assert, logEmitter, { eventEmitters, log } ) => new Promise( resolve => {
			eventEmitters.clear();
			logEmitter.on( 'info', ( { name, level, message, meta, milliseconds } ) => {
				assert.deepEqual( { name, level, message, meta, milliseconds }, { name: 'test', level: 3, message: 'message', meta: 'meta', milliseconds: undefined } );
				resolve();
			} );
			log.info( 'message', 'meta' );
		} ) )
		.it( 'should resolve meta if there is a listener', ( assert, logEmitter, { eventEmitters, log } ) => new Promise( resolve => {
			eventEmitters.clear();
			logEmitter.on( 'info', ( { name, level, message, meta, milliseconds } ) => {
				assert.deepEqual( { name, level, message, meta, milliseconds }, { name: 'test', level: 3, message: 'message', meta: 'resolvedmeta', milliseconds: undefined } );
				resolve();
			} );
			log.info( 'message', () => 'resolvedmeta' );
		} ) )
		.it( 'should call meta-function if there is a listener', ( assert, logEmitter, { eventEmitters, log } ) => new Promise( resolve => {
			eventEmitters.clear();
			logEmitter.on( 'info', ( { name, level, message, meta, milliseconds } ) => {} );
			let a = 1;
			log.info( 'message', () => {
				a = 2;
				return 'meta';
			} );
			setTimeout( () => {
				assert.equal( a, 2 );
				resolve();
			}, 10 );
		} ) )
		.it( 'should not call meta-function if there is not a listener', ( assert, logEmitter, { eventEmitters, log } ) => new Promise( resolve => {
			eventEmitters.clear();
			let a = 1;
			log.info( 'message', () => {
				a = 2;
				return 'meta';
			} );
			setTimeout( () => {
				assert.equal( a, 1 );
				resolve();
			}, 10 );
		} ) )
		.it( 'should resolve meta if there is a listener', ( assert, logEmitter, { eventEmitters, log } ) => new Promise( resolve => {
			eventEmitters.clear();
			logEmitter.on( 'info', ( { name, level, message, meta, milliseconds } ) => {
				assert.deepEqual( { name, level, message, meta, milliseconds }, { name: 'test', level: 3, message: 'message', meta: 'resolvedmeta', milliseconds: undefined } );
				resolve();
			} );
			log.info( 'message', () => 'resolvedmeta' );
		} ) )
		.done()
	.describe( 'logEmitter.on( config, listener )' )
		.it( 'should capture all registered events', ( assert, logEmitter, { eventEmitters, log } ) => new Promise( resolve => {
			eventEmitters.clear();
		 	let count = 0;
			logEmitter.on( [ '*', '!>3', '!<0' ], ( { name, level, message, meta, milliseconds } ) => count += level );
			log.fatal( 'message' );
			log.error( 'message' );
			log.warn( 'message' );
			log.info( 'message' );
			log.debug( 'message' );
			log.trace( 'message' );
			setTimeout( () => {
				assert.equal( count, 6 );
				resolve();
			}, 10 );
		} ) )
		.done()
	.describe( 'timers' )
		.it( 'should time something', ( assert, logEmitter, { eventEmitters, log } ) => new Promise( resolve => {
			eventEmitters.clear();
			logEmitter.on( 'info', ( { name, level, message, meta, milliseconds } ) => {
				assert.ok( milliseconds >= 9 );
				resolve();
			} );
			const timer = log.timer();
			setTimeout( () => timer.info( 'hopp', 'test' ), 10 );
		} ) )
		.it( 'should time a job', ( assert, logEmitter, { eventEmitters, log } ) => new Promise( resolve => {
			eventEmitters.clear();
			logEmitter.on( 'info', ( { name, level, message, meta, milliseconds } ) => {
				assert.ok( milliseconds >= 9 );
			} );
			log.timer()
				.job( new Promise( ( resolve ) => setTimeout( () => resolve( 123 ), 10 ) ) )
				.info( 'done', 'ok' )
				.promise.then( ( value ) => {
					assert( value, 123 );
					resolve();
				} );
		} ) )
		.it( 'should time a job and have the result as meta argument', ( assert, logEmitter, { eventEmitters, log } ) => new Promise( resolve => {
			eventEmitters.clear();
			logEmitter.on( 'info', ( { name, level, message, meta, milliseconds } ) => {
				assert.equal( meta, '123' );
			} );
			log.timer()
				.job( new Promise( ( resolve ) => setTimeout( () => resolve( 123 ), 10 ) ) )
				.info( 'done', ( result ) => result )
				.promise.then( ( value ) => {
					assert( value, 123 );
					resolve();
				} );
		} ) )
		.it( 'should time a promise reference', ( assert, logEmitter, { eventEmitters, log } ) => new Promise( resolve => {
			eventEmitters.clear();
			logEmitter.on( 'info', ( { name, level, message, meta, milliseconds } ) => {
				assert.ok( milliseconds >= 9 );
			} );
			log.timer( new Promise( ( resolve ) => setTimeout( () => resolve( 123 ), 10 ) ) )
				.info( 'done', 'ok' )
				.promise.then( ( value ) => {
					assert( value, 123 );
					resolve();
				} );
		} ) )
		.it( 'should handle a timer reference', ( assert, logEmitter, { eventEmitters, log } ) => new Promise( resolve => {
			eventEmitters.clear();
			logEmitter.on( 'info', ( { name, level, message, meta, milliseconds } ) => {
				assert.ok( milliseconds >= 9 );
				resolve();
			} );
			const reference = {};
			log.timer( reference );
			setTimeout( () => log.timer( reference ).info( 'test' ), 10 );
		} ) )
		.it( 'should handle a timer without a listener', ( assert, logEmitter, { eventEmitters, log } ) => new Promise( resolve => {
			eventEmitters.clear();
			const reference = {};
			log.timer( new Promise( ( resolve ) => setTimeout( () => resolve( 123 ), 10 ) ) )
				.info( 'test' )
				.promise.then( () => resolve() );
		} ) )
		.it( 'should return undefined', ( assert, loggers, { log } ) => assert.ok( log.timer().undefined === undefined ) )
		.it( 'should return undefined', ( assert, loggers, { log } ) => assert.ok( log.timer().undef === undefined ) )
		.it( 'should return something from a timer', ( assert, loggers, { log } ) =>
			assert.equal( log.timer().return( 1.12 ), 1.12 ) )
		.done()
	.done();
