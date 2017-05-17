require( '@jrapp/node-project-setup' ).testing.file( './test/file' )( ( loggers ) => ( {} ) )
	.describe( 'loggers.undefined' )
		.it( 'should return undefined', ( assert, loggers ) =>
			assert.ok( loggers( 'loggers-test' ).undefined === undefined ) )
		.done()
	.describe( 'loggers.undef' )
		.it( 'should return undefined', ( assert, loggers ) =>
			assert.ok( loggers( 'loggers-test' ).undef === undefined ) )
		.done()
	.describe( 'loggers.return( value )' )
		.it( 'should return the first argument', ( assert, loggers ) =>
			assert.deepEqual( loggers( 'loggers-test' ).return( { a: 1 } ), { a: 1 } ) )
		.done()
	.done();
