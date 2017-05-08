require( '../../../helpers/unit.js' )( ( logEmitter ) => ( {
	eventEmitters: require( '../../../../src/eventEmitters.js' ),
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
		.it( '', ( assert, logEmitter, { eventEmitters } ) => {

		} )
		.done()
	.done();
