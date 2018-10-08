
module.exports = class SyncQuery {
  constructor(conn){
    this.connection = conn;
  }
  query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
}
