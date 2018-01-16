"use strict";
/**
* @author Raviel Chausse Silveira
*/

const Connect = require('./connect');

module.exports = class GenericContext {

    constructor() {
        this.module = arguments[0] || null;
        this.table = arguments[1] || null;
        this.primaryKey = arguments[2] || null;
        this.initContext();
    }

    initContext() {
        this.context = Connect();
    }

    open() {
        if (!this.context) 
        {
            this.initContext();
        }
        this.context.connect();
    }

    close() {
        if (this.context) 
        {
            this.context.end();
        }
    }

    begin() {
        return new Promise((accept, reject) => {
            try 
            {
                this.open();
                this.context.query('START TRANSACTION;', [], (err, begin) => {
                    if (err) 
                    {
                        reject(err);
                    }
                    else
                    {
                        this.autoCommit().then(accept).catch(reject);
                    }
                });
            } 
            catch (e) 
            {
                reject(e);
            }
        });
    }

    /**
    * @author Raviel Chausse Silveira
    */
    autoCommit() {
        return new Promise((accept, reject) => {
            try 
            {
                this.context.query('SET autocommit=0;', [], (err, commit) => {
                    if (err) 
                    {
                        reject(err);
                    }
                    else
                    {
                        accept(commit);
                    }
                });
            } 
            catch (e) 
            {
                reject(e);
            }
        });
    }

    /**
    * @author Raviel Chausse Silveira
    */
    commit() {
        return new Promise((accept, reject) => {
            try 
            {
                this.context.query('COMMIT;', [], (err, commit) => {
                    if (err) 
                    {
                        this.rollback().then(reject).catch(reject);
                    }
                    else
                    {
                        this.close();
                        accept(commit);
                    }
                });
            } 
            catch (e) 
            {
                reject(e);
            }
        });
    }

    /**
    * @author Raviel Chausse Silveira
    */
    rollback() {
        return new Promise((accept, reject) => {
            try 
            {
                this.context.query('ROLLBACK;', [], (err, rollback) => {
                    if (err) 
                    {
                        this.close();
                        reject(err);
                    }
                    else
                    {
                        this.close();
                        accept(rollback);
                    }
                });
            } 
            catch (e) 
            {
                reject(e);
            }
        });
    }

    /**
    * @author Raviel Chausse Silveira
    */
    makeObject(attributes) {
        try 
        {
            throw new Error('This method must be overwritten in the concrete class.');
        } 
        catch (e) 
        {
            throw e;
        }
    }

    /**
    * @author Raviel Chausse Silveira
    */
    insert(query, params) {
        return new Promise((accept, reject) => {
            try 
            {
                this.context.query(query, params, (err, results) => {
                    if (err) 
                    {
                        reject(err);
                    }
                    else
                    {
                        accept(results.insertId);
                    }
                });
            } 
            catch (e) 
            {
                reject(e);
            }
        });
    }

    /**
    * @author Raviel Chausse Silveira
    */
    update(query, params) {
        return new Promise((accept, reject) => {
            try 
            {
                this.context.query(query, params, (err, results) => {
                    if (err) 
                    {
                        reject(err);
                    }
                    else
                    {
                        accept(results);
                    }
                });
            } 
            catch (e) 
            {
                reject(e);
            }
        });
    }

    /**
    * @author Raviel Chausse Silveira
    */
    delete(id) {
        return new Promise((accept, reject) => {
            try 
            {
                throw new Error('Not implemented!!!');
            } 
            catch (e) 
            {
                reject(e);
            }
        });
    }

    /**
    * @author Raviel Chausse Silveira
    */
    get(query, params) {
        return new Promise((accept, reject) => {
            try 
            {
                this.open();
                this.context.query(query, params, (err, results) => {
                    if (err) 
                    {
                        reject(err);
                    }
                    else
                    {
                        accept(results);
                    }
                    this.close();
                });
            } 
            catch (e) 
            {
                this.close();
                reject(e);
            }
        });
    }

    /**
    * @author Raviel Chausse Silveira
    */
    getOne(query, params) {
        return new Promise((accept, reject) => {
            try 
            {
                this.open();
                this.context.query(query, params, (err, results) => {
                    if (err) 
                    {
                        reject(err);
                    }
                    else
                    {
                        accept(results[0]);
                    }
                    this.close();
                });
            } 
            catch (e) 
            {
                this.close();
                reject(e);
            }
        });
    }
}
