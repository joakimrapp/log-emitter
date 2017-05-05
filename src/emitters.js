const levels = require( './levels.js' );
const operators = [ '+', '-', '<', '>' ];



module.exports = {
  emitter: ( moduleName ) => {

  },
  on: ( levels, listener ) => {
    if( !listener )
      [ listener, levels ] = [ levels, '*' ];
    Array.prototype.concat( Array.prototype.concat( levels )
      .map( item => item.toString() )
      .map( item => operators.indexOf( item.charAt( 0 ) ) < 0 ? { operator: '+', item } : { operator: item.charAt( 0 ), item: item.slice( 1 ) } )
      .map( ( { operator, item } ) => {
        if( item === '*' )
          return levels.values.map( value => ( { operator, value } ) );
        else if( !isNaN( item ) )
					return { operator, value: parseInt( item, 10 ) };
				else if( levels.has( item ) )
					return { operator, value: levels.value( item ) };
				else
					throw new Error( `unknown level "${item}"` );
      } ) );




    Array.prototype.concat( levels ).reduce( ( resolved, item ) => {
      if( item === '*' )
        return [ ...levels.values, ...resolved ];
      else if( levels.has( item ) )
        return [ levels.value( item ), ...resolved ];
    }, [] )

  },
  has: ( name ) => {

  },
  levels
}
