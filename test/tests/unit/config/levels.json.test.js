require( '../../../helpers/unit.js' )( ( levels ) =>
		( name ) => levels.find( ( { names } ) => names.indexOf( name ) >= 0 ).value )
	.it( 'should have 9 defined levels', ( assert, levels ) => assert.equal( levels.length, 9 ) )
	.it( 'should have 10 defined names', ( assert, levels ) =>
		assert.equal( Array.prototype.concat( ...levels.map( ( { names } ) => names ) ).length, 10 ) )
	.it( 'should have "fatal" with value 0', ( assert, levels, value ) => assert.equal( value( 'fatal' ), 0 ) )
	.it( 'should have "error" with value 1', ( assert, levels, value ) => assert.equal( value( 'error' ), 1 ) )
	.it( 'should have "warning" with value 2', ( assert, levels, value ) => assert.equal( value( 'warning' ), 2 ) )
	.it( 'should have "warn" with value 2', ( assert, levels, value ) => assert.equal( value( 'warn' ), 2 ) )
	.it( 'should have "info" with value 3', ( assert, levels, value ) => assert.equal( value( 'info' ), 3 ) )
	.it( 'should have "debug" with value 4', ( assert, levels, value ) => assert.equal( value( 'debug' ), 4 ) )
	.it( 'should have "trace" with value 5', ( assert, levels, value ) => assert.equal( value( 'trace' ), 5 ) )
	.it( 'should have "alert" with value -1', ( assert, levels, value ) => assert.equal( value( 'alert' ), -1 ) )
	.it( 'should have "alarm" with value -2', ( assert, levels, value ) => assert.equal( value( 'alarm' ), -2 ) )
	.it( 'should have "metric" with value 10', ( assert, levels, value ) => assert.equal( value( 'metric' ), 10 ) )
	.done();
