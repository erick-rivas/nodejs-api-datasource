import * as mysql from "mysql";
import { Pair } from "@util/Util";

/**
 * Base class to handle common database operations.
 */

class Executor
{
  protected sql;

  protected constructor()
  {
    const isDebug = process.env.IS_DEBUG == null ||
      process.env.IS_DEBUG.toLowerCase() == "true";

    if (isDebug)
      this.sql = mysql.createConnection({
        host: process.env.SQL_HOST,
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        database: process.env.SQL_DATABASE,
        multipleStatements: true
      });
    else
      this.sql = mysql.createConnection({
        host: process.env.RDS_HOSTNAME,
        user: process.env.RDS_USERNAME,
        password: process.env.RDS_PASSWORD,
        database: process.env.RDS_DB_NAME,
        port: process.env.RDS_PORT,
        multipleStatements: true
      });

  }

  /**
   * Get a collection based on params conditions.
   * Example:
   *  - Query: SELECT p.* FROM player p WHERE p.player_id = ?
   *  - params: [1]
   * 
   * @param  {string} query Base query.
   * @param  {any[]} params Params collection.
   */

  protected get(query: string, params: any[]): Promise<any[]>
  {
    return new Promise((resolve, reject) =>
    {
      this.sql.query(query, params, function (err, result)
      {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  /**
   * Get a collection based on filter conditions.
   * Example:
   *  - Query: SELECT p.* FROM player p
   *  - Filters: [new Pair(p.player_id, 1)]
   * 
   * @param  {string} query Base query.
   * @param  {Pair[]} filters Filter collection, equivalente to WHERE conditions.
   */

  protected async getList(query: string, filters: Pair[]): Promise<any[]>
  {
    const params = [];
    let where = " WHERE true = true";
    for (let filter of filters) {
      where += ` AND ${filter.key} = ?`;
      params.push(filter.value);
    }
    query = query + where;
    let res = await this.get(query, params);
    return res;
  }

  /**
   * 
   * Get an item based on params conditions.
   * Example:
   *  - Query: SELECT p.* FROM player p WHERE p.player_id = ?
   *  - Filters: [1]
   * 
   * @param  {string} query Base query.
   * @param  {any[]} params Params collection.
   */

  protected async getDetails(query: string, params: any[]): Promise<any[]>
  {
    let res = await this.get(query, params);
    return res.length > 0 ? res[0] : null;
  }


  /**
  * Execute a generic query.
  * Suggested use: modifications in the database schema.
  * Example:
  *  - Query: DROP TABLE player
  * 
  * @param  {string} query Complete query.
  */

  protected execute(query: string, params = []): Promise<void>
  {
    return new Promise((resolve, reject) =>
    {
      this.sql.query(query, params, function (err, result)
      {
        if (err) return reject(err);
        resolve();
      });
    });
  }

  /**
   * Execute a save query.
   * Example:
   *  - Query: INSERT INTO player";
   *  - Params: [new Pair('id', '1')]
   * 
   * @param  {string} query Base query
   * @param  {Pair[]} params Params collection.
   */

  protected save(query: string, params: Pair[]): Promise<void>
  {
    let columns = " (";
    let values = [];
    for (let p of params) {
      columns += p.key + ",";
      values.push(p.value);
    }
    columns = params.length > 0 ? columns.slice(0, -1) + ")" : columns + ")";

    let templates = " VALUES (";
    for (let p of params) templates += "?,";
    templates = params.length > 0 ? templates.slice(0, -1) + ")" : templates + ")";

    query = query + columns + templates;
    return this.execute(query, values);
  }

  /**
   * Execute a set query.
   * Example:
   *  - Query: UPDATE player";
   *  - Columns: [new Pair('name', 'juan')]
   *  - keyCol: player_id
   *  - keyVal: 1
   * 
   * @param  {string} query Base query
   * @param  {Pair[]} columns Set collection to modify, equivalente to SET conditions.
   * @param  {string} keyCol Column name of primary key  
   * @param  {number} keyVal Value of primary key
   */

  protected set(query: string, columns: Pair[], keyCol: string, keyVal: number): Promise<void>
  {
    const params = [];
    let set = ` SET ${keyCol} = ${keyCol},`;
    for (let col of columns) {
      set += ` ${col.key} = ?,`;
      params.push(col.value);
    }
    set = set.slice(0, -1);
    let where = ` WHERE ${keyCol} = ?`;
    query = query + set + where;
    params.push(keyVal);
    return this.execute(query, params);
  }

  /**
   * Execute a delete query.
   * Example:
   *  - Query: DELETE FROM player WHERE player_id = ?";
   *  - Params: [1]
   * 
   * @param  {string} query Base query
   * @param  {number[]} params Params collection (identifiers)
   */

  protected delete(query: string, params: number[]): Promise<void>
  {
    return this.execute(query, params);
  }
}

export default Executor;
