require( '@jrapp/node-project-setup' ).testing.file( './test/file' )( ( eventEmitters ) => {} )
	.describe( 'eventEmitters.has( level )' )
		.it( 'should not have a undefined level', ( assert, eventEmitters ) =>
			assert.ok( !eventEmitters.has( 20 ) ) )
		.it( 'should not have a defined level without a listener', ( assert, eventEmitters ) =>
			assert.ok( !eventEmitters.has( 0 ) ) )
		.it( 'should have a defined level with a listener', ( assert, eventEmitters ) => {
			eventEmitters.on( -1, () => {} );
			assert.ok( eventEmitters.has( -1 ) );
		} )
		.done()
	.describe( 'eventEmitters.emit( level, msg )' )
		.it( 'should return undefined if level has no listener', ( assert, eventEmitters ) =>
			assert.ok( eventEmitters.emit( 0, {} ) === undefined ) )
		.it( 'should not return undefined if level has a listener', ( assert, eventEmitters ) => {
			eventEmitters.clear();
			eventEmitters.on( -1, () => {} );
			assert.ok( !!eventEmitters.emit( -1, {} ) );
		} )
		.done()
	.describe( 'eventEmitters.clear()' )
		.it( 'should be able to clear all listeners', ( assert, eventEmitters ) => {
			eventEmitters.on( -1, () => {} );
			eventEmitters.clear();
			assert.ok( !eventEmitters.has( -1 ) );
		} )
		.done()
	.describe( 'eventEmitters.on( level, fn )' )
		.it( 'should get events on a level if a listener is registered', ( assert, eventEmitters ) => new Promise( ( resolve ) => {
			eventEmitters.clear();
			eventEmitters.on( 2, ( data ) => {
				assert.deepEqual( data, { value: 1 } );
				resolve();
			} );
			eventEmitters.emit( 2, { value: 1 } );
		} ) )
		.done()
	.done();
