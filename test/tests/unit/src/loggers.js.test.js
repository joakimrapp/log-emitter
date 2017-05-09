require( '../../../helpers/unit.js' )( ( loggers ) => ( {} ) )
	.describe( 'loggers.undefined' )
		.it( 'should return undefined', ( assert, loggers ) => assert.ok( loggers( 'loggers-test' ).undefined === undefined ) )
		.done()
	.describe( 'loggers.undef' )
		.it( 'should return undefined', ( assert, loggers ) => assert.ok( loggers( 'loggers-test' ).undef === undefined ) )
		.done()
	.describe( 'loggers.value( value )' )
		.it( 'should return the first argument', ( assert, loggers ) => assert.deepEqual( loggers( 'loggers-test' ).value( { a: 1 } ), { a: 1 } ) )
		.done()
	.done();