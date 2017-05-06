require( '../../../helpers/unit.js' )( ( levels ) => {} )
	.describe( 'levels.config' )
		.it( 'should return the config', ( assert, levels ) =>
	 		assert.deepEqual( levels.config, require( '../../../../config/levels.json' ) ) )
		.done()
	.describe( 'levels.names' )
		.it( 'should have all 10 names', ( assert, levels ) => assert.deepEqual( levels.names,
			[ 'fatal', 'error', 'warning', 'warn', 'info', 'debug', 'trace', 'alert', 'alarm', 'metric' ] ) )
		.done()
	.describe( 'levels.has( name )' )
		.it( 'should return true for all names defined in config', ( assert, levels ) =>
			assert.equal( levels.config.reduce( ( count, { names } ) =>
				names.every( name => levels.has( name ) ) ? count + names.length : 0, 0 ), 10 ) )
		.it( 'should return false for a name that is not defined in config', ( assert, levels ) =>
			assert.ok( !levels.has( 'not_defined' ) ) )
		.done()
	.describe( 'levels.value( name )' )
		.it( 'should return 0 for "fatal"', ( assert, levels ) => assert.equal( levels.value( 'fatal' ), 0 ) )
		.it( 'should return 1 for "error"', ( assert, levels ) => assert.equal( levels.value( 'error' ), 1 ) )
		.it( 'should return 2 for "warning"', ( assert, levels ) => assert.equal( levels.value( 'warning' ), 2 ) )
		.it( 'should return 2 for "warn"', ( assert, levels ) => assert.equal( levels.value( 'warn' ), 2 ) )
		.it( 'should return 3 for "info"', ( assert, levels ) => assert.equal( levels.value( 'info' ), 3 ) )
		.it( 'should return 4 for "debug"', ( assert, levels ) => assert.equal( levels.value( 'debug' ), 4 ) )
		.it( 'should return 5 for "trace"', ( assert, levels ) => assert.equal( levels.value( 'trace' ), 5 ) )
		.it( 'should return -1 for "alert"', ( assert, levels ) => assert.equal( levels.value( 'alert' ), -1 ) )
		.it( 'should return -2 for "alarm"', ( assert, levels ) => assert.equal( levels.value( 'alarm' ), -2 ) )
		.it( 'should return 10 for "metric"', ( assert, levels ) => assert.equal( levels.value( 'metric' ), 10 ) )
		.done()
	.done();
