const path = require( 'path' );
const stacktrace = require( 'stack-trace' );
const assert = require( 'assert' );
module.exports = ( setup = () => {} ) => {
	const displaypath = stacktrace.get()[ 1 ].getFileName()
		.replace( path.resolve( __dirname, '../tests/unit' ), '.' ).replace( '.test.js', '' );
	const unit = require( path.resolve( __dirname, `../../`, displaypath ) );
	let data;
	const tests = [];
	const ptr = [];
	before( () => Promise.resolve( setup( unit ) )
		.then( ( result ) => ( data = result ) )
		.then( () => {} ) );
	const recursive = ( tests ) => tests.forEach( ( { title, tests, test } ) => tests ?
		describe( title, () => recursive( tests ) ) :
		it( title, () => Promise.resolve( test( assert, unit, data ) ) ) );
	const pub = ( tests ) => ( {
		describe: ( title ) => {
			const item = { title, tests: [] };
			ptr.push( tests );
			tests.push( item );
			return pub( item.tests );
		},
		it: ( title, test ) => {
			tests.push( { title, test } );
			return pub( tests );
		},
		done: () => ptr.length ?
			pub( ptr.pop() ) :
			describe( `UNIT: ${displaypath}`, () => recursive( tests ) )
	} );
	return pub( tests );
};
