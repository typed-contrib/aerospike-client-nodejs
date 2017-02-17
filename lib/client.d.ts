// *****************************************************************************
// Copyright 2013-2017 Aerospike, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License")
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// *****************************************************************************
//
// Typings by SomaticIT <https://github.com/SomaticIT>
// Typings hosted on : https://github.com/typed-contrib/aerospike-client-nodejs

import * as Config from "./config";
import * as Key from "./key";
import * as Job from "./job";
import * as Query from "./query";
import * as Scan from "./scan";

import * as AerospikeError from "./aerospike_error";
import * as LargeList from "./llist";

import { Operation } from "./operations";
import {
    indexType,
    indexDataType
} from "./aerospike";
import {
    DoneCallback,
    ValueCallback,
    UdfArguments,
} from "./utils";

/**
 * @class Client
 * @classdesc Aerospike client
 */
declare class Client {
    public config: Config;

    /**
     * Construct a new Aerospike client instance.
     * @param {Config} config - Configuration used to initialize the client.
     */
    constructor(config: Config.ConfigOptions);

    /**
     * Creates a new LargeList instance, which is used to perform all LDT operations in the database.
     *
     * @param {Key} key - A key, used to locate the record in the cluster.
     * @param {string} binName - Name of the Large Data Type Bin.
     * @param {Client~WritePolicy} [writePolicy] - The Write Policy to use for this operation.
     * @param {string} [createModule] - Lua function name that initialized the list configuration parameters, pass null for default list.
     *
     * @deprecated since v2.4.4
     *
     * @see {@link LargeList}
     *
     * @example
     *
     * const Aerospike = require('aerospike')
     * const Key = Aerospike.Key
     *
     * const key = new Key('test', 'demo', 'ldt_key')
     * const policy = { timeout: 1000 }
     *
     * Aerospike.connect((error, client) => {
     *   var llist = client.LargeList(key, 'ldtBinName', policy);
     *   llist.add('abc', (error) => {
     *     client.close()
     *   })
     * })
     */
    public LargeList(key: Key, bindName: string, writePolicy?: Client.WritePolicy, createModule?: string): LargeList;

    /**
     * @function Client#batchExists
     *
     * @summary Checks the existence of a batch of records from the database cluster.
     *
     * @param {Key[]} keys - An array of Keys used to locate the records in the cluster.
     * @param {Client~BatchRecordsCallback} callback - The function to call when the operation completes, with the results of the batch operation.
     *
     * @deprecated since v2.0 - use {@link Client#batchRead} instead.
     *
     * @example
     *
     * var keys = [
     *   new Key('test', 'demo', 'key1'),
     *   new Key('test', 'demo', 'key2'),
     *   new Key('test', 'demo', 'key3')
     * ]
     *
     * client.batchExists(keys, function (error, results) {
     *   if (error) {
     *     // handle failure
     *   } else {
     *     results.forEach(function (result) {
     *       switch (result.status) {
     *         case status.AEROSPIKE_OK:
     *           // record found
     *           break
     *         case status.AEROSPIKE_ERR_RECORD_NOT_FOUND:
     *           // record not found
     *           break
     *         default:
     *           // error while reading record
     *           break
     *       }
     *     })
     *   }
     * })
     */
    public batchExists(keys: Key[], callback: Client.BatchRecordsCallback): void;
    /**
     * @function Client#batchExists
     *
     * @summary Checks the existence of a batch of records from the database cluster.
     *
     * @param {Key[]} keys - An array of Keys used to locate the records in the cluster.
     * @param {Client~BatchPolicy} policy - The Batch Policy to use for this operation.
     * @param {Client~BatchRecordsCallback} callback - The function to call when the operation completes, with the results of the batch operation.
     *
     * @deprecated since v2.0 - use {@link Client#batchRead} instead.
     */
    public batchExists(keys: Key[], policy: Client.BatchPolicy, callback: Client.BatchRecordsCallback): void;

    /**
     * Reads a batch of records from the database cluster.
     *
     * @param {Key[]} keys - An array of keys, used to locate the records in the cluster.
     * @param {Client~BatchRecordsCallback} callback - The function to call when the operation completes, with the results of the batch operation.
     *
     * @deprecated since v2.0 - use {@link Client#batchRead} instead.
     *
     * @example
     *
     * var keys = [
     *   new Key('test', 'demo', 'key1'),
     *   new Key('test', 'demo', 'key2'),
     *   new Key('test', 'demo', 'key3')
     * ]
     *
     * client.batchGet(keys, function (error, results) {
     *   if (error) {
     *     // handle failure
     *   } else {
     *     results.forEach(function (result) {
     *       switch (result.status) {
     *         case status.AEROSPIKE_OK:
     *           // record found - bin values are available in result.record
     *           break
     *         case status.AEROSPIKE_ERR_RECORD_NOT_FOUND:
     *           // record not found
     *           break
     *         default:
     *           // error while reading record
     *           break
     *       }
     *     })
     *   }
     * })
     */
    public batchGet(keys: Key[], callback: Client.BatchRecordsCallback): void;
    /**
     * Reads a batch of records from the database cluster.
     *
     * @param {Key[]} keys - An array of keys, used to locate the records in the cluster.
     * @param {Client~BatchPolicy} policy - The Batch Policy to use for this operation.
     * @param {Client~BatchRecordsCallback} callback - The function to call when the operation completes, with the results of the batch operation.
     *
     * @deprecated since v2.0 - use {@link Client#batchRead} instead.
     */
    public batchGet(keys: Key[], policy: Client.BatchPolicy, callback: Client.BatchRecordsCallback): void;

    /**
     * Read multiple records for specified batch keys in one batch call.
     *
     * This method allows different namespaces/bins to be requested for each key in
     * the batch. This method requires Aerospike Server version >= 3.6.0.
     *
     * @param {object[]} records - List of keys and bins to retrieve.
     * @param {Client~BatchRecordsCallback} callback - The function to call when the operation completes, with the results of the batch operation.
     *
     * @since v2.0
     *
     * @example
     *
     * const Aerospike = require('aerospike')
     * var batchRecords = [
     *   { key: new Aerospike.Key('test', 'demo', 'key1'), bins: ['i', 's'] },
     *   { key: new Aerospike.Key('test', 'demo', 'key2'), read_all_bins: true },
     *   { key: new Aerospike.Key('test', 'demo', 'key3') }
     * ]
     * Aerospike.connect(function (error, client) {
     *   if (error) throw error
     *   client.batchRead(batchRecords, function (error, results) {
     *     if (error) throw error
     *     results.forEach(function (result) {
     *       console.log(result)
     *     })
     *   })
     * })
     */
    public batchRead(keys: Key[], callback: Client.BatchRecordsCallback): void;
    /**
     * Read multiple records for specified batch keys in one batch call.
     *
     * This method allows different namespaces/bins to be requested for each key in
     * the batch. This method requires Aerospike Server version >= 3.6.0.
     *
     * @param {object[]} records - List of keys and bins to retrieve.
     * @param {Client~BatchPolicy} policy - The Batch Policy to use for this operation.
     * @param {Client~BatchRecordsCallback} callback - The function to call when the operation completes, with the results of the batch operation.
     *
     * @since v2.0
     */
    public batchRead(keys: Key[], policy: Client.BatchPolicy, callback: Client.BatchRecordsCallback): void;

    /**
     * Reads a subset of bins for a batch of records from the database cluster.
     *
     * @param {Key[]} keys - An array of keys, used to locate the records in the cluster.
     * @param {string[]} bins - An array of bin names for the bins to be returned for the given keys.
     * @param {Client~BatchRecordCallback} callback - The function to call when the operation completes, with the results of the batch operation.
     *
     * @deprecated since v2.0 - use {@link Client#batchRead} instead.
     *
     * @example
     *
     * var keys = [
     *   new Key('test', 'demo', 'key1'),
     *   new Key('test', 'demo', 'key2'),
     *   new Key('test', 'demo', 'key3')
     * ]
     * var bins = ['s', 'i']
     *
     * client.batchSelect(keys, bins, function (error, results) {
     *   if (error) {
     *     // handle failure
     *   } else {
     *     results.forEach(function (result) {
     *       switch (result.status) {
     *         case status.AEROSPIKE_OK:
     *           // record found - selected bins are available in result.record.
     *           break
     *         case status.AEROSPIKE_ERR_RECORD_NOT_FOUND:
     *           // record not found
     *           break
     *         default:
     *           // error while reading record
     *           break
     *       }
     *     })
     *   }
     * })
     */
    public batchSelect(keys: Key[], bins: string[], callback: Client.BatchRecordsCallback): void;
    /**
     * Reads a subset of bins for a batch of records from the database cluster.
     *
     * @param {Key[]} keys - An array of keys, used to locate the records in the cluster.
     * @param {string[]} bins - An array of bin names for the bins to be returned for the given keys.
     * @param {Client~BatchPolicy} policy - The Batch Policy to use for this operation.
     * @param {Client~BatchRecordCallback} callback - The function to call when the operation completes, with the results of the batch operation.
     *
     * @deprecated since v2.0 - use {@link Client#batchRead} instead.
     */
    public batchSelect(keys: Key[], bins: string[], policy: Client.BatchPolicy, callback: Client.BatchRecordsCallback): void;

    /**
     * Closes the client connection to the cluster.
     *
     * @param {boolean} [releaseEventLoop=true] - Whether to release the event loop handle after the client is closed.
     *
     * @see module:aerospike.releaseEventLoop
     *
     * @example
     *
     * const Aerospike = require('aerospike')
     * Aerospike.connect(function (error, client) {
     *   if (error) throw error
     *   // client ready to receive commands
     *   client.close()
     * })
     */
    public close(releaseEventLoop?: boolean): void;

    /**
     * Establishes the connection to the cluster.
     *
     * Once the client is connected to at least one server node, it will start
     * polling each cluster node regularly to discover the current cluster status.
     * As new nodes are added to the cluster, or existing nodes are removed, the
     * client will establish or close down connections to these nodes. If the
     * client gets disconnected from the cluster, it will keep polling the last
     * known server endpoints, and will reconnect automatically if the connection
     * is reestablished.
     *
     * It is recommended that you use the {@link module:aerospike.connect} method
     * to connect to the cluster. You will receive the client instance in the
     * {@link Client~ConnectCallback|connect callback} once the cluster connection
     * has been established and the client is ready to accept commands.
     *
     * @param {Client~ConnectCallback} callback - The function to call once the
     * client connection has been established successfully.
     *
     * @return {Client} Client object which was used to connect to the cluster.
     *
     * @see {@link Config#connTimeoutMs} - Initial host connection timeout in milliseconds.
     *
     * @example
     *
     * const Aerospike = require('aerospike')
     *
     * var config = { ... }
     * var client = Aerospike.client(config)
     * client.connect((error) => {
     *   if (error) {
     *     console.error('Failed to connect to cluster: %s', error.message)
     *     process.exit()
     *   } else {
     *     // client is ready to accept commands
     *   }
     * })
     */
    public connect(callback: Client.ConnectCallback): this;

    /**
     * Creates a secondary index.
     *
     * Calling the <code>createIndex</code> method issues an
     * index create command to the Aerospike cluster and returns immediately. To
     * verify that the index has been created and populated with all the data use
     * the {@link IndexJob} instance returned by the callback.
     *
     * Aerospike currently supports indexing of strings, integers and geospatial
     * information in GeoJSON format.
     *
     * ##### String Indexes
     *
     * A string index allows for equality lookups. An equality lookup means that if
     * you query for an indexed bin with value "abc", then only records containing
     * bins with "abc" will be returned.
     *
     * ##### Integer Indexes
     *
     * An integer index allows for either equality or range lookups. An equality
     * lookup means that if you query for an indexed bin with value 123, then only
     * records containing bins with the value 123 will be returned. A range lookup
     * means that if you can query bins within a range. So, if your range is
     * (1...100), then all records containing a value in that range will be
     * returned.
     *
     * ##### Geo 2D Sphere Indexes
     *
     * A geo 2d sphere index allows either "contains" or "within" lookups. A
     * "contains" lookup means that if you query for an indexed bin with GeoJSON
     * point element, then only records containing bins with a GeoJSON element
     * containing that point will be returned. A "within" lookup means that if you
     * query for an indexed bin with a GeoJSON polygon element, then all records
     * containing bins with a GeoJSON element wholly contained within that polygon
     * will be returned.
     *
     * @param {Client~CreateIndexOptions} options - Options for creating the index.
     * @param {Client~JobCallback} callback - The function to call when the operation completes.
     *
     * @see {@link module:aerospike.indexType} for enumeration of supported index types.
     * @see {@link module:aerospike.indexDataType} for enumeration of supported data types.
     * @see {@link IndexJob}
     *
     * @since v2.0
     *
     * @example
     *
     * const Aerospike = require('aerospike')
     * Aerospike.connect((error, client) => {
     *   if (error) throw error
     *
     *   // create index over user's recent locations
     *   var namespace = 'test'
     *   var set = 'demo'
     *   var binName = 'rloc' // recent locations
     *   var indexName = 'recentLocationsIdx'
     *   var indexType = Aerospike.indexType.LIST
     *   var dataType = Aerospike.indexDataType.GEO2DSPHERE
     *   var options = { ns: namespace,
     *                   set: set,
     *                   bin: binName,
     *                   index: indexName,
     *                   type: indexType,
     *                   datatype: dataType }
     *
     *   client.createIndex(options, (error, job) => {
     *     if (error) throw error
     *
     *     // wait for index creation to complete
     *     var pollInterval = 100
     *     job.waitUntilDone(pollInterval, (error) => {
     *       if (error) throw error
     *       console.info('secondary index %s on %s was created successfully', indexName, binName)
     *       client.close()
     *     })
     *   })
     * })
     */
    public createIndex(options: Client.CreateIndexOptions, callback: Client.JobCallback): void;
    /**
     * Creates a secondary index.
     *
     * Calling the <code>createIndex</code> method issues an
     * index create command to the Aerospike cluster and returns immediately. To
     * verify that the index has been created and populated with all the data use
     * the {@link IndexJob} instance returned by the callback.
     *
     * Aerospike currently supports indexing of strings, integers and geospatial
     * information in GeoJSON format.
     *
     * ##### String Indexes
     *
     * A string index allows for equality lookups. An equality lookup means that if
     * you query for an indexed bin with value "abc", then only records containing
     * bins with "abc" will be returned.
     *
     * ##### Integer Indexes
     *
     * An integer index allows for either equality or range lookups. An equality
     * lookup means that if you query for an indexed bin with value 123, then only
     * records containing bins with the value 123 will be returned. A range lookup
     * means that if you can query bins within a range. So, if your range is
     * (1...100), then all records containing a value in that range will be
     * returned.
     *
     * ##### Geo 2D Sphere Indexes
     *
     * A geo 2d sphere index allows either "contains" or "within" lookups. A
     * "contains" lookup means that if you query for an indexed bin with GeoJSON
     * point element, then only records containing bins with a GeoJSON element
     * containing that point will be returned. A "within" lookup means that if you
     * query for an indexed bin with a GeoJSON polygon element, then all records
     * containing bins with a GeoJSON element wholly contained within that polygon
     * will be returned.
     *
     * @param {Client~CreateIndexOptions} options - Options for creating the index.
     * @param {Client~InfoPolicy} [policy] - The Info Policy to use for this operation.
     * @param {Client~JobCallback} callback - The function to call when the operation completes.
     *
     * @see {@link module:aerospike.indexType} for enumeration of supported index types.
     * @see {@link module:aerospike.indexDataType} for enumeration of supported data types.
     * @see {@link IndexJob}
     *
     * @since v2.0
     *
     * @example
     *
     * const Aerospike = require('aerospike')
     * Aerospike.connect((error, client) => {
     *   if (error) throw error
     *
     *   // create index over user's recent locations
     *   var namespace = 'test'
     *   var set = 'demo'
     *   var binName = 'rloc' // recent locations
     *   var indexName = 'recentLocationsIdx'
     *   var indexType = Aerospike.indexType.LIST
     *   var dataType = Aerospike.indexDataType.GEO2DSPHERE
     *   var options = { ns: namespace,
     *                   set: set,
     *                   bin: binName,
     *                   index: indexName,
     *                   type: indexType,
     *                   datatype: dataType }
     *   var policy = { timeout: 100 }
     *
     *   client.createIndex(options, policy, (error, job) => {
     *     if (error) throw error
     *
     *     // wait for index creation to complete
     *     var pollInterval = 100
     *     job.waitUntilDone(pollInterval, (error) => {
     *       if (error) throw error
     *       console.info('secondary index %s on %s was created successfully', indexName, binName)
     *       client.close()
     *     })
     *   })
     * })
     */
    public createIndex(options: Client.CreateIndexOptions, policy: Client.InfoPolicy, callback: Client.JobCallback): void;

    /**
     * Creates a secondary index of type Integer.
     *
     * This is a short-hand for calling {@link Client#createIndex}
     * with the <code>datatype</code> option set to <code>Aerospike.indexDataType.NUMERIC</code>.
     *
     * @param {CreateTypedIndexOptions} options - Options for creating the index.
     * @param {Client~JobCallback} callback - The function to call when the operation completes.
     *
     * @see {@link Client#indexCreate}
     *
     * @example
     *
     * const Aerospike = require('aerospike')
     * Aerospike.connect((error, client) => {
     *   if (error) throw error
     *
     *   var binName = 'age'
     *   var indexName = 'ageIndex'
     *   var options = { ns: 'test',
     *                   set: 'demo',
     *                   bin: binName,
     *                   index: indexName }
     *
     *   client.createIntegerIndex(options, function (error) {
     *     if (error) throw error
     *     console.info('secondary index %s on %s was created successfully', indexName, binName)
     *     client.close()
     *   })
     * })
     */
    public createIntegerIndex(options: Client.CreateTypedIndexOptions, callback: Client.JobCallback): void;
    /**
     * Creates a secondary index of type Integer.
     *
     * This is a short-hand for calling {@link Client#createIndex}
     * with the <code>datatype</code> option set to <code>Aerospike.indexDataType.NUMERIC</code>.
     *
     * @param {CreateTypedIndexOptions} options - Options for creating the index.
     * @param {Client~InfoPolicy} policy - The Info Policy to use for this operation.
     * @param {Client~JobCallback} callback - The function to call when the operation completes.
     *
     * @see {@link Client#indexCreate}
     */
    public createIntegerIndex(options: Client.CreateTypedIndexOptions, policy: Client.InfoPolicy, callback: Client.JobCallback): void;

    /**
     * Creates a secondary index of type String.
     *
     * This is a short-hand for calling {@link Client#createIndex}
     * with the <code>datatype</code> option set to <code>Aerospike.indexDataType.STRING</code>.
     *
     * @param {CreateTypedIndexOptions} options - Options for creating the index.
     * @param {Client~JobCallback} callback - The function to call when the operation completes.
     *
     * @see {@link Client#indexCreate}
     *
     * @example
     *
     * const Aerospike = require('aerospike')
     * Aerospike.connect((error, client) => {
     *   if (error) throw error
     *
     *   var binName = 'age'
     *   var indexName = 'ageIndex'
     *   var options = { ns: 'test',
     *                   set: 'demo',
     *                   bin: binName,
     *                   index: indexName }
     *
     *   client.createStringIndex(options, function (error) {
     *     if (error) throw error
     *     console.info('secondary index %s on %s was created successfully', indexName, binName)
     *     client.close()
     *   })
     * })
     */
    public createStringIndex(options: Client.CreateTypedIndexOptions, callback: Client.JobCallback): void;
    /**
     * Creates a secondary index of type String.
     *
     * This is a short-hand for calling {@link Client#createIndex}
     * with the <code>datatype</code> option set to <code>Aerospike.indexDataType.STRING</code>.
     *
     * @param {CreateTypedIndexOptions} options - Options for creating the index.
     * @param {Client~InfoPolicy} policy - The Info Policy to use for this operation.
     * @param {Client~JobCallback} callback - The function to call when the operation completes.
     *
     * @see {@link Client#indexCreate}
     */
    public createStringIndex(options: Client.CreateTypedIndexOptions, policy: Client.InfoPolicy, callback: Client.JobCallback): void;

    /**
     * Creates a secondary, geospatial index.
     *
     * This is a short-hand for calling {@link Client#createIndex}
     * with the <code>datatype</code> option set to <code>Aerospike.indexDataType.GEO2DSPHERE</code>.
     *
     * @param {CreateTypedIndexOptions} options - Options for creating the index.
     * @param {Client~JobCallback} callback - The function to call when the operation completes.
     *
     * @see {@link Client#indexCreate}
     *
     * @example
     *
     * const Aerospike = require('aerospike')
     * Aerospike.connect((error, client) => {
     *   if (error) throw error
     *
     *   var binName = 'age'
     *   var indexName = 'ageIndex'
     *   var options = { ns: 'test',
     *                   set: 'demo',
     *                   bin: binName,
     *                   index: indexName }
     *
     *   client.createGeo2DSphereIndex(options, function (error) {
     *     if (error) throw error
     *     console.info('secondary index %s on %s was created successfully', indexName, binName)
     *     client.close()
     *   })
     * })
     */
    public createGeo2DSphereIndex(options: Client.CreateTypedIndexOptions, callback: Client.JobCallback): void;
    /**
     * Creates a secondary, geospatial index.
     *
     * This is a short-hand for calling {@link Client#createIndex}
     * with the <code>datatype</code> option set to <code>Aerospike.indexDataType.GEO2DSPHERE</code>.
     *
     * @param {CreateTypedIndexOptions} options - Options for creating the index.
     * @param {Client~InfoPolicy} policy - The Info Policy to use for this operation.
     * @param {Client~JobCallback} callback - The function to call when the operation completes.
     *
     * @see {@link Client#indexCreate}
     */
    public createGeo2DSphereIndex(options: Client.CreateTypedIndexOptions, policy: Client.InfoPolicy, callback: Client.JobCallback): void;

    /**
     * Applies a User Defined Function (UDF) on a record in the database.
     *
     * @param {Key} key - The key, used to locate the record in the cluster.
     * @param {UdfArguments} udfArgs - Parameters used to specify which UDF function to execute.
     * @param {Client~RecordCallback} callback - The function to call when the operation has completed with the results of the operation.
     *
     * @since v2.0
     *
     * @see {@link Client#udfRegister}
     *
     * @example
     *
     * var key = new Key('test', 'demo', value')
     * var udfArgs = {module: 'my_udf_module', funcname: 'my_udf_function', args: ['abc', 123, 4.5]}
     *
     * client.apply(key, udfArgs, function (error, res, key) {
     *   if (error) {
     *     // handle failure
     *   } else {
     *     // handle success
     *   }
     * })
     */
    public apply<T>(key: Key, udfArgs: UdfArguments, callback: Client.RecordCallback<T>): void;
    /**
     * Applies a User Defined Function (UDF) on a record in the database.
     *
     * @param {Key} key - The key, used to locate the record in the cluster.
     * @param {UdfArguments} udfArgs - Parameters used to specify which UDF function to execute.
     * @param {Client~ApplyPolicy} policy - The Apply Policy to use for this operation.
     * @param {Client~RecordCallback} callback - The function to call when the operation has completed with the results of the operation.
     *
     * @since v2.0
     *
     * @see {@link Client#udfRegister}
     */
    public apply<T>(key: Key, udfArgs: UdfArguments, policy: Client.ApplyPolicy, callback: Client.RecordCallback<T>): void;

    /**
     * Alias for {@link Client#apply} for backwards compatibility.
     * Applies a User Defined Function (UDF) on a record in the database.
     *
     * @param {Key} key - The key, used to locate the record in the cluster.
     * @param {UdfArguments} udfArgs - Parameters used to specify which UDF function to execute.
     * @param {Client~RecordCallback} callback - The function to call when the operation has completed with the results of the operation.
     *
     * @see {@link Client#apply}
     */
    public execute<T>(key: Key, udfArgs: UdfArguments, callback: Client.RecordCallback<T>): void;
    /**
     * Alias for {@link Client#apply} for backwards compatibility.
     * Applies a User Defined Function (UDF) on a record in the database.
     *
     * @param {Key} key - The key, used to locate the record in the cluster.
     * @param {UdfArguments} udfArgs - Parameters used to specify which UDF function to execute.
     * @param {Client~ApplyPolicy} policy - The Apply Policy to use for this operation.
     * @param {Client~RecordCallback} callback - The function to call when the operation has completed with the results of the operation.
     *
     * @see {@link Client#apply}
     */
    public execute<T>(key: Key, udfArgs: UdfArguments, policy: Client.ApplyPolicy, callback: Client.RecordCallback<T>): void;

    /**
     * Checks the existance of a record in the database cluster.
     *
     * @param {Key} key - The key of the record to check for existance.
     * @param {Client~ExistsCallback} callback - The function to call when the operation completes with the results of the operation.
     *
     * @example
     *
     * var key = new Key('test', 'demo', 'key1')
     * client.exists(key, function (error, metadata, key) {
     *   if (error && error.code === Aerospike.status.AEROSPIKE_ERR_RECORD_NOT_FOUND) {
     *     // record does not exist
     *   } else if (error) {
     *     // handle error
     *   } else {
     *     // record exists
     *   }
     * })
     */
    public exists(key: Key, callback: Client.ExistsCallback): void;
    /**
     * Checks the existance of a record in the database cluster.
     *
     * @param {Key} key - The key of the record to check for existance.
     * @param {Client~ReadPolicy} policy - The Read Policy to use for this operation.
     * @param {Client~ExistsCallback} callback - The function to call when the operation completes with the results of the operation.
     */
    public exists(key: Key, policy: Client.ReadPolicy, callback: Client.ExistsCallback): void;

    /**
     * Using the key provided, reads a record from the database cluster.
     *
     * @param {Key} key - The key used to locate the record in the cluster.
     * @param {Client~RecordCallback} callback - The function to call when the operation completes with the results of the operation.
     *
     * @example
     *
     * var key = new Key('test', 'demo', 'key1')
     *
     * client.get(key, function (error, record, metadata) {
     *   if (error) {
     *     // handle failure
     *   } else {
     *     // handle success
     *   }
     * })
     */
    public get<T>(key: Key, callback: Client.RecordCallback<T>): void;
    /**
     * Using the key provided, reads a record from the database cluster.
     *
     * @param {Key} key - The key used to locate the record in the cluster.
     * @param {Client~ReadPolicy} policy - The Read Policy to use for this operation.
     * @param {Client~RecordCallback} callback - The function to call when the operation completes with the results of the operation.
     */
    public get<T>(key: Key, policy: Client.ReadPolicy, callback: Client.RecordCallback<T>): void;

    /**
     * Wait until an index create command succeeds in aerospike cluster.
     *
     * This function actively polls the Aerospike cluster until the
     * specified index is ready to be queried.
     *
     * This method has been deprecated in v2.0. Use the {@link
     * IndexJob#waitUntilDone} method on the {@link IndexJob} instance returned
     * by the {@link Client#createIndex} callback instead.
     *
     * @param {string} namespace - The namespace on which the index is created.
     * @param {string} index - The name of the index.
     * @param {number} pollInterval - The poll interval in milliseconds.
     * @param {DoneCallback} callback - The function to call when the operation completes which the result of the operation.
     *
     * @deprecated since v2.0 - use {@link IndexJob#waitUntilDone} instead.
     */
    public indexCreateWait(namespace: string, index: string, pollInterval: number, callback: DoneCallback): void;

    /**
     * Removes the specified index.
     *
     * @param {string} namespace - The namespace on which the index was created.
     * @param {string} index - The name of the index.
     * @param {Client~doneCallback} callback - The function to call when the operation completes with the result of the operation.
     *
     * @example
     *
     * client.indexRemove('test', 'index', function (error) {
     *   if (error) {
     *     // handle failure
     *   } else {
     *     // handle success
     *   }
     * });
     */
    public indexRemove(namespace: string, index: string, callback: DoneCallback): void;
    /**
     * Removes the specified index.
     *
     * @param {string} namespace - The namespace on which the index was created.
     * @param {string} index - The name of the index.
     * @param {Client~InfoPolicy} policy - The Info Policy to use for this operation.
     * @param {Client~doneCallback} callback - The function to call when the operation completes with the result of the operation.
     */
    public indexRemove(namespace: string, index: string, policy: Client.InfoPolicy, callback: DoneCallback): void;

    /**
     * Sends all available info query to all nodes in the cluster.
     *
     * The command queries each node in the cluster separately. The info callback
     * is called once for every cluster host that responds. The optional done callback
     * is called once all responses have been received.
     *
     * @param {Client~infoCallback} infoCb - The function to call when an info response from a cluster host is received.
     * @param {Client~doneCallback} [doneCb] - The function to call once all info responses have been received and the operation completes.
     *
     * @deprecated since v2.4 - use {@link Client#infoAll} instead.
     */
    public info(infoCb: Client.InfoCallback, doneCb?: DoneCallback): void;
    /**
     * Sends all available info query to all nodes in the cluster.
     *
     * The command queries each node in the cluster separately. The info callback
     * is called once for every cluster host that responds. The optional done callback
     * is called once all responses have been received.
     *
     * @param {Client~InfoPolicy} policy - The Info Policy to use for this operation.
     * @param {Client~infoCallback} infoCb - The function to call when an info response from a cluster host is received.
     * @param {Client~doneCallback} [doneCb] - The function to call once all info responses have been received and the operation completes.
     *
     * @deprecated since v2.4 - use {@link Client#infoAll} instead.
     */
    public info(policy: Client.InfoPolicy, infoCb: Client.InfoCallback, doneCb?: DoneCallback): void;
    /**
     * Sends an info query to all nodes in the cluster.
     *
     * The <code>request</code> parameter is a string representing an info request.
     *
     * The command queries each node in the cluster separately. The info callback
     * is called once for every cluster host that responds. The optional done callback
     * is called once all responses have been received.
     *
     * @param {string} request - The info request to send.
     * @param {Client~infoCallback} infoCb - The function to call when an info response from a cluster host is received.
     * @param {Client~doneCallback} [doneCb] - The function to call once all info responses have been received and the operation completes.
     *
     * @deprecated since v2.4 - use {@link Client#infoAll} instead.
     *
     * @example <caption>Sending info command to whole cluster</caption>
     *
     * client.info('statistics', function (error, response, host) {
     *   if (error) {
     *     // handle failure
     *   } else {
     *     // process info response from host
     *   }
     * }, function () {
     *   // all response have been processed
     * })
     */
    public info(request: string, infoCb: Client.InfoCallback, doneCb?: DoneCallback): void;
    /**
     * Sends an info query to all nodes in the cluster.
     *
     * The <code>request</code> parameter is a string representing an info request.
     *
     * The command queries each node in the cluster separately. The info callback
     * is called once for every cluster host that responds. The optional done callback
     * is called once all responses have been received.
     *
     * @param {string} request - The info request to send.
     * @param {Client~InfoPolicy} policy - The Info Policy to use for this operation.
     * @param {Client~infoCallback} infoCb - The function to call when an info response from a cluster host is received.
     * @param {Client~doneCallback} [doneCb] - The function to call once all info responses have been received and the operation completes.
     *
     * @deprecated since v2.4 - use {@link Client#infoAll} instead.
     */
    public info(request: string, policy: Client.InfoPolicy, infoCb: Client.InfoCallback, doneCb?: DoneCallback): void;

    /**
     * Sends an info query to a specific cluster node which will return all available info.
     *
     * @param {Object} host - The address of the cluster host to send the request to.
     * @param {Client~InfoCallback} infoCb - The function to call when an info response from a cluster host is received.
     */
    public info(host: Config.HostConfig, infoCb: Client.InfoCallback): void;
    /**
     * Sends an info query to a specific cluster node which will return all available info.
     *
     * @param {Object} host - The address of the cluster host to send the request to.
     * @param {Client~InfoPolicy} policy - The Info Policy to use for this operation.
     * @param {Client~InfoCallback} infoCb - The function to call when an info response from a cluster host is received.
     */
    public info(host: Config.HostConfig, policy: Client.InfoPolicy, infoCb: Client.InfoCallback): void;
    /**
     * Sends an info query to a specific cluster node.
     *
     * The <code>request</code> parameter is a string representing an info request.
     *
     * Please refer to the
     * <a href="http://www.aerospike.com/docs/reference/info">Info Command Reference</a>
     * for a list of all available info commands.
     *
     * @param {string} request - The info request to send.
     * @param {Object} host - The address of the cluster host to send the request to.
     * @param {Client~InfoCallback} infoCb - The function to call when an info response from a cluster host is received.
     *
     * @example <caption>Sending a 'statistics' info query to a specific host</caption>
     *
     * client.info('statistics', {addr: '127.0.0.1', port: 3000}, function (error, response) {
     *   if (error) {
     *     // handle failure
     *   } else {
     *     // handle success
     *   }
     * })
     */
    public info(request: string, host: Config.HostConfig, infoCb: Client.InfoCallback): void;
    /**
     * Sends an info query to a specific cluster node.
     *
     * The <code>request</code> parameter is a string representing an
     * info request. If it is not specified, the cluster host will send all
     * available info.
     *
     * Please refer to the
     * <a href="http://www.aerospike.com/docs/reference/info">Info Command Reference</a>
     * for a list of all available info commands.
     *
     * @param {string} request - The info request to send.
     * @param {Object} host - The address of the cluster host to send the request to.
     * @param {Client~InfoPolicy} policy - The Info Policy to use for this operation.
     * @param {Client~InfoCallback} infoCb - The function to call when an info response from a cluster host is received.
     */
    public info(request: string, host: Config.HostConfig, policy: Client.InfoPolicy, infoCb: Client.InfoCallback): void;

    /**
     * Sends an info query to a single, randomly selected cluster node which will 
     * respond with all available info.
     *
     * @param {Client~InfoCallback} callback - The function to call when an info
     * response from a cluster host is received.
     *
     * @since v2.4.0
     */
    public infoAny(callback: Client.InfoCallback): void;
    /**
     * Sends an info query to a single, randomly selected cluster node which will 
     * respond with all available info.
     *
     * @param {Client~InfoPolicy} policy - The Info Policy to use for this operation.
     * @param {Client~InfoCallback} callback - The function to call when an info
     * response from a cluster host is received.
     *
     * @since v2.4.0
     */
    public infoAny(policy: Client.InfoPolicy, callback: Client.InfoCallback): void;
    /**
     * Sends an info query to a single, randomly selected cluster node.
     * The <code>request</code> parameter is a string representing an info request.
     *
     * @param {string} request - The info request to send.
     * @param {Client~InfoCallback} callback - The function to call when an info
     * response from a cluster host is received.
     *
     * @since v2.4.0
     *
     * @example <caption>Sending 'statistics' info command to random cluster node</caption>
     *
     * client.infoAny('statistics', function (error, response) {
     *   if (error) {
     *     // handle failure
     *   } else {
     *     // handle success
     *   }
     * })
     */
    public infoAny(request: string, callback: Client.InfoCallback): void;
    /**
     * Sends an info query to a single, randomly selected cluster node.
     * The <code>request</code> parameter is a string representing an info request. 
     *
     * @param {string} request - The info request to send.
     * @param {Client~InfoPolicy} policy - The Info Policy to use for this operation.
     * @param {Client~InfoCallback} callback - The function to call when an info
     * response from a cluster host is received.
     *
     * @since v2.4.0
     */
    public infoAny(request: string, policy: Client.InfoPolicy, callback: Client.InfoCallback): void;

    /**
     * Sends an info query to all nodes in the cluster and collects all available info results.
     *
     * @param {Client~infoAllCallback} callback - The function to call when an info
     * response from all cluster hosts is received.
     *
     * @since v2.3.0
     */
    public infoAll(callback: Client.InfoCallback): void;
    /**
     * Sends an info query to all nodes in the cluster and collects all available info results.
     *
     * @param {Client~InfoPolicy} policy - The Info Policy to use for this operation.
     * @param {Client~infoAllCallback} callback - The function to call when an info
     * response from all cluster hosts is received.
     *
     * @since v2.3.0
     */
    public infoAll(policy: Client.InfoPolicy, callback: Client.InfoCallback): void;
    /**
     * Sends an info query to all nodes in the cluster and collects the results.
     * The <code>request</code> parameter is a string representing an info request.
     *
     * @param {string} request - The info request to send.
     * @param {Client~infoAllCallback} callback - The function to call when an info
     * response from all cluster hosts is received.
     *
     * @since v2.3.0
     *
     * @example <caption>Sending info command to whole cluster</caption>
     *
     * client.infoAll('statistics', function (error, responses) {
     *   if (error) {
     *     // handle failure
     *   } else {
     *     responses.forEach((function (info) {
     *       // handle response
     *     })
     *   }
     * })
     */
    public infoAll(request: string, callback: Client.InfoCallback): void;
    /**
     * Sends an info query to all nodes in the cluster and collects the results.
     * The <code>request</code> parameter is a string representing an info request.
     *
     * @param {string} request - The info request to send.
     * @param {Client~InfoPolicy} policy - The Info Policy to use for this operation.
     * @param {Client~infoAllCallback} callback - The function to call when an info
     * response from all cluster hosts is received.
     *
     * @since v2.3.0
     */
    public infoAll(request: string, policy: Client.InfoPolicy, callback: Client.InfoCallback): void;

    /**
     * Is client connected to any server nodes.
     *
     * @param {boolean} [checkTenderErrors=true] - Whether to consider a server
     * node connection that has had 5 consecutive info request failures during
     * cluster tender.
     *
     * @returns {boolean} <code>true</code> if the client is currently connected to any server nodes.
     *
     * @since v2.0
     */
    public isConnected(checkTenderErrors?: boolean): boolean;

    /**
     * Performs multiple operations on a single record.
     *
     * @param {Key} key - The key of the record.
     * @param {Operation[]} operations - List of operations to perform on the record.
     * @param {Client~RecordCallback} callback - The function to call when the operation completes with the results of the operation.
     *
     * @example
     *
     * const Aerospike = require('aerospike')
     * const op = Aerospike.operations
     *
     * var key = new Aerospike.Key('test', 'demo', 'mykey1')
     * var ops = [
     *   op.append('a', 'xyz'),
     *   op.incr('b', 10),
     *   op.read('b')
     * ]
     *
     * Aerospike.connect(function (error, client) {
     *   client.operate(key, ops, function (error, record) {
     *     if (error) {
     *       // handle failure
     *     } else {
     *       console.log('b', record['b']) // value of 'b' returned by the `read` operation
     *     }
     *   })
     *   client.close()
     * })
     */
    public operate(key: Key, operations: Operation[], callback: Client.RecordCallback<any>): void;
    /**
     * Performs multiple operations on a single record.
     *
     * @param {Key} key - The key of the record.
     * @param {Operation[]} operations - List of operations to perform on the record.
     * @param {Client~Metadata} metadata - Meta data.
     * @param {Client~RecordCallback} callback - The function to call when the operation completes with the results of the operation.
     */
    public operate(key: Key, operations: Operation[], metadata: Client.Metadata, callback: Client.RecordCallback<any>): void;
    /**
     * Performs multiple operations on a single record.
     *
     * @param {Key} key - The key of the record.
     * @param {Operation[]} operations - List of operations to perform on the record.
     * @param {Client~OperatePolicy} policy - The Operate Policy to use for this operation.
     * @param {Client~RecordCallback} callback - The function to call when the operation completes with the results of the operation.
     */
    public operate(key: Key, operations: Operation[], policy: Client.OperatePolicy, callback: Client.RecordCallback<any>): void;
    /**
     * Performs multiple operations on a single record.
     *
     * @param {Key} key - The key of the record.
     * @param {Operation[]} operations - List of operations to perform on the record.
     * @param {Client~Metadata} metadata - Meta data.
     * @param {Client~OperatePolicy} policy - The Operate Policy to use for this operation.
     * @param {Client~RecordCallback} callback - The function to call when the operation completes with the results of the operation.
     */
    public operate(key: Key, operations: Operation[], metadata: Client.Metadata, policy: Client.OperatePolicy, callback: Client.RecordCallback<any>): void;

    /**
     * Shortcut for applying the {@link module:aerospike/operations.append} operation to one or more record bins.
     *
     * @param {Key} key - The key of the record.
     * @param {Object} bins - The key-value mapping of bin names and the corresponding values to append to the bin value.
     * @param {Client~RecordCallback} callback - The function to call when the operation completes with the results of the operation.
     *
     * @see {@link Client#operate}
     * @see {@link module:aerospike/operations.append}
     */
    public append(key: Key, bins: Object, callback: Client.RecordCallback<any>): void;
    /**
     * Shortcut for applying the {@link module:aerospike/bins.append} operation to one or more record bins.
     *
     * @param {Key} key - The key of the record.
     * @param {Object} bins - The key-value mapping of bin names and the corresponding values to append to the bin value.
     * @param {Client~Metadata} metadata - Meta data.
     * @param {Client~RecordCallback} callback - The function to call when the operation completes with the results of the operation.
     *
     * @see {@link Client#operate}
     * @see {@link module:aerospike/operations.append}
     */
    public append(key: Key, bins: Object, metadata: Client.Metadata, callback: Client.RecordCallback<any>): void;
    /**
     * Shortcut for applying the {@link module:aerospike/bins.append} operation to one or more record bins.
     *
     * @param {Key} key - The key of the record.
     * @param {Object} bins - The key-value mapping of bin names and the corresponding values to append to the bin value.
     * @param {Client~OperatePolicy} policy - The Operate Policy to use for this operation.
     * @param {Client~RecordCallback} callback - The function to call when the operation completes with the results of the operation.
     *
     * @see {@link Client#operate}
     * @see {@link module:aerospike/operations.append}
     */
    public append(key: Key, bins: Object, policy: Client.OperatePolicy, callback: Client.RecordCallback<any>): void;
    /**
     * Shortcut for applying the {@link module:aerospike/bins.append} operation to one or more record bins.
     *
     * @param {Key} key - The key of the record.
     * @param {Object} bins - The key-value mapping of bin names and the corresponding values to append to the bin value.
     * @param {Client~Metadata} metadata - Meta data.
     * @param {Client~OperatePolicy} policy - The Operate Policy to use for this operation.
     * @param {Client~RecordCallback} callback - The function to call when the operation completes with the results of the operation.
     *
     * @see {@link Client#operate}
     * @see {@link module:aerospike/operations.append}
     */
    public append(key: Key, bins: Object, metadata: Client.Metadata, policy: Client.OperatePolicy, callback: Client.RecordCallback<any>): void;

    /**
     * Shortcut for applying the {@link module:aerospike/operations.prepend} operation to one or more record bins.
     *
     * @param {Key} key - The key of the record.
     * @param {Object} bins - The key-value mapping of bin names and the corresponding values to prepend to the bin value.
     * @param {Client~RecordCallback} callback - The function to call when the operation completes with the results of the operation.
     *
     * @see {@link Client#operate}
     * @see {@link module:aerospike/operations.prepend}
     */
    public prepend(key: Key, bins: Object, callback: Client.RecordCallback<any>): void;
    /**
     * Shortcut for applying the {@link module:aerospike/bins.prepend} operation to one or more record bins.
     *
     * @param {Key} key - The key of the record.
     * @param {Object} bins - The key-value mapping of bin names and the corresponding values to prepend to the bin value.
     * @param {Client~Metadata} metadata - Meta data.
     * @param {Client~RecordCallback} callback - The function to call when the operation completes with the results of the operation.
     *
     * @see {@link Client#operate}
     * @see {@link module:aerospike/operations.prepend}
     */
    public prepend(key: Key, bins: Object, metadata: Client.Metadata, callback: Client.RecordCallback<any>): void;
    /**
     * Shortcut for applying the {@link module:aerospike/bins.prepend} operation to one or more record bins.
     *
     * @param {Key} key - The key of the record.
     * @param {Object} bins - The key-value mapping of bin names and the corresponding values to prepend to the bin value.
     * @param {Client~OperatePolicy} policy - The Operate Policy to use for this operation.
     * @param {Client~RecordCallback} callback - The function to call when the operation completes with the results of the operation.
     *
     * @see {@link Client#operate}
     * @see {@link module:aerospike/operations.prepend}
     */
    public prepend(key: Key, bins: Object, policy: Client.OperatePolicy, callback: Client.RecordCallback<any>): void;
    /**
     * Shortcut for applying the {@link module:aerospike/bins.prepend} operation to one or more record bins.
     *
     * @param {Key} key - The key of the record.
     * @param {Object} bins - The key-value mapping of bin names and the corresponding values to prepend to the bin value.
     * @param {Client~Metadata} metadata - Meta data.
     * @param {Client~OperatePolicy} policy - The Operate Policy to use for this operation.
     * @param {Client~RecordCallback} callback - The function to call when the operation completes with the results of the operation.
     *
     * @see {@link Client#operate}
     * @see {@link module:aerospike/operations.prepend}
     */
    public prepend(key: Key, bins: Object, metadata: Client.Metadata, policy: Client.OperatePolicy, callback: Client.RecordCallback<any>): void;

    /**
     * Shortcut for applying the {@link module:aerospike/operations.incr} operation to one or more record bins.
     *
     * @param {Key} key - The key of the record.
     * @param {Object} bins - The key-value mapping of bin names and the corresponding values to increment to the bin values with.
     * @param {Client~RecordCallback} callback - The function to call when the operation completes with the results of the operation.
     *
     * @see {@link Client#operate}
     * @see {@link module:aerospike/operations.incr}
     */
    public incr(key: Key, bins: Object, callback: Client.RecordCallback<any>): void;
    /**
     * Shortcut for applying the {@link module:aerospike/bins.incr} operation to one or more record bins.
     *
     * @param {Key} key - The key of the record.
     * @param {Object} bins - The key-value mapping of bin names and the corresponding values to increment to the bin values with.
     * @param {Client~Metadata} metadata - Meta data.
     * @param {Client~RecordCallback} callback - The function to call when the operation completes with the results of the operation.
     *
     * @see {@link Client#operate}
     * @see {@link module:aerospike/operations.incr}
     */
    public incr(key: Key, bins: Object, metadata: Client.Metadata, callback: Client.RecordCallback<any>): void;
    /**
     * Shortcut for applying the {@link module:aerospike/bins.incr} operation to one or more record bins.
     *
     * @param {Key} key - The key of the record.
     * @param {Object} bins - The key-value mapping of bin names and the corresponding values to increment to the bin values with.
     * @param {Client~OperatePolicy} policy - The Operate Policy to use for this operation.
     * @param {Client~RecordCallback} callback - The function to call when the operation completes with the results of the operation.
     *
     * @see {@link Client#operate}
     * @see {@link module:aerospike/operations.incr}
     */
    public incr(key: Key, bins: Object, policy: Client.OperatePolicy, callback: Client.RecordCallback<any>): void;
    /**
     * Shortcut for applying the {@link module:aerospike/bins.incr} operation to one or more record bins.
     *
     * @param {Key} key - The key of the record.
     * @param {Object} bins - The key-value mapping of bin names and the corresponding values to increment to the bin values with.
     * @param {Client~Metadata} metadata - Meta data.
     * @param {Client~OperatePolicy} policy - The Operate Policy to use for this operation.
     * @param {Client~RecordCallback} callback - The function to call when the operation completes with the results of the operation.
     *
     * @see {@link Client#operate}
     * @see {@link module:aerospike/operations.incr}
     */
    public incr(key: Key, bins: Object, metadata: Client.Metadata, policy: Client.OperatePolicy, callback: Client.RecordCallback<any>): void;

    /**
     * Alias for {@link Client#incr} for backwards compatibility.
     *
     * @param {Key} key - The key of the record.
     * @param {Object} bins - The key-value mapping of bin names and the corresponding values to increment to the bin values with.
     * @param {Client~RecordCallback} callback - The function to call when the operation completes with the results of the operation.
     *
     * @deprecated since v2.0 - renamed to {@link Client#incr}.
     */
    public add(key: Key, bins: Object, callback: Client.RecordCallback<any>): void;
    /**
     * Alias for {@link Client#incr} for backwards compatibility.
     *
     * @param {Key} key - The key of the record.
     * @param {Object} bins - The key-value mapping of bin names and the corresponding values to increment to the bin values with.
     * @param {Client~Metadata} metadata - Meta data.
     * @param {Client~RecordCallback} callback - The function to call when the operation completes with the results of the operation.
     *
     * @deprecated since v2.0 - renamed to {@link Client#incr}.
     */
    public add(key: Key, bins: Object, metadata: Client.Metadata, callback: Client.RecordCallback<any>): void;
    /**
     * Alias for {@link Client#incr} for backwards compatibility.
     *
     * @param {Key} key - The key of the record.
     * @param {Object} bins - The key-value mapping of bin names and the corresponding values to increment to the bin values with.
     * @param {Client~OperatePolicy} policy - The Operate Policy to use for this operation.
     * @param {Client~RecordCallback} callback - The function to call when the operation completes with the results of the operation.
     *
     * @deprecated since v2.0 - renamed to {@link Client#incr}.
     */
    public add(key: Key, bins: Object, policy: Client.OperatePolicy, callback: Client.RecordCallback<any>): void;
    /**
     * Alias for {@link Client#incr} for backwards compatibility.
     *
     * @param {Key} key - The key of the record.
     * @param {Object} bins - The key-value mapping of bin names and the corresponding values to increment to the bin values with.
     * @param {Client~Metadata} metadata - Meta data.
     * @param {Client~OperatePolicy} policy - The Operate Policy to use for this operation.
     * @param {Client~RecordCallback} callback - The function to call when the operation completes with the results of the operation.
     *
     * @deprecated since v2.0 - renamed to {@link Client#incr}.
     */
    public add(key: Key, bins: Object, metadata: Client.Metadata, policy: Client.OperatePolicy, callback: Client.RecordCallback<any>): void;

    /**
     * Writes a record to the database cluster.
     *
     * If the record exists, it modifies the record with bins provided.
     * To remove a bin, set its value to <code>null</code>.
     *
     * __Note:__ The client does not perform any automatic data type conversions.
     * Attempting to write an unsupported data type (e.g. boolean) into a record
     * bin will cause an error to be returned. Setting an <code>undefined</code>
     * value will also cause an error.
     *
     * @param {Key} key - The key of the record.
     * @param {object} record - A record object used for specifying the fields to store.
     * @param {Client~WriteCallback} callback - The function to call when the operation completes with the result of the operation.
     *
     * @example
     *
     * const Key = Aerospike.Key
     *
     * var key = new Key('test', 'demo', 'key1')
     * var rec = {
     *   a: 'xyz',
     *   b: 123
     * }
     *
     * client.put(key, rec, function (error, key) {
     *   if (error) {
     *     // handle failure
     *   } else {
     *     // handle success
     *   }
     * })
     */
    public put<T>(key: Key, record: T, callback: Client.WriteCallback): void;
    /**
     * Writes a record to the database cluster.
     *
     * If the record exists, it modifies the record with bins provided.
     * To remove a bin, set its value to <code>null</code>.
     *
     * __Note:__ The client does not perform any automatic data type conversions.
     * Attempting to write an unsupported data type (e.g. boolean) into a record
     * bin will cause an error to be returned. Setting an <code>undefined</code>
     * value will also cause an error.
     *
     * @param {Key} key - The key of the record.
     * @param {object} record - A record object used for specifying the fields to store.
     * @param {Client~WritePolicy} policy - The Write Policy to use for this operation.
     * @param {Client~WriteCallback} callback - The function to call when the operation completes with the result of the operation.
     */
    public put<T>(key: Key, record: T, policy: Client.WritePolicy, callback: Client.WriteCallback): void;
    /**
     * Writes a record to the database cluster.
     *
     * If the record exists, it modifies the record with bins provided.
     * To remove a bin, set its value to <code>null</code>.
     *
     * __Note:__ The client does not perform any automatic data type conversions.
     * Attempting to write an unsupported data type (e.g. boolean) into a record
     * bin will cause an error to be returned. Setting an <code>undefined</code>
     * value will also cause an error.
     *
     * @param {Key} key - The key of the record.
     * @param {object} record - A record object used for specifying the fields to store.
     * @param {Client~Metadata} metadata - Meta data.
     * @param {Client~WriteCallback} callback - The function to call when the operation completes with the result of the operation.
     */
    public put<T>(key: Key, record: T, metadata: Client.Metadata, callback: Client.WriteCallback): void;
    /**
     * Writes a record to the database cluster.
     *
     * If the record exists, it modifies the record with bins provided.
     * To remove a bin, set its value to <code>null</code>.
     *
     * __Note:__ The client does not perform any automatic data type conversions.
     * Attempting to write an unsupported data type (e.g. boolean) into a record
     * bin will cause an error to be returned. Setting an <code>undefined</code>
     * value will also cause an error.
     *
     * @param {Key} key - The key of the record.
     * @param {object} record - A record object used for specifying the fields to store.
     * @param {Client~Metadata} metadata - Meta data.
     * @param {Client~WritePolicy} policy - The Write Policy to use for this operation.
     * @param {Client~WriteCallback} callback - The function to call when the operation completes with the result of the operation.
     */
    public put<T>(key: Key, record: T, metadata: Client.Metadata, policy: Client.WritePolicy, callback: Client.WriteCallback): void;

    /**
     * Creates a new {@link Query} instance, which is used to define query
     * in the database.
     *
     * @param {string} ns - The namespace to be queried.
     * @param {string} set - The set on which the query is to be executed.
     * @param {object} [options] - Query parameters. See {@link Query} constructor for details.
     *
     * @see {@link Query}
     *
     * @example
     *
     * const filter = Aerospike.filter
     *
     * var statement = {}
     * statment.filters: [filter.equal('color', 'blue')]
     *
     * var query = client.query(ns, set, statment)
     * var stream = query.execute()
     */
    public query(ns: string, set: string, options?: Query.QueryOptions): Query;

    /**
     * Removes a record with the specified key from the database cluster.
     *
     * @param {Key} key - The key of the record.
     * @param {Client~writeCallback} callback - The function to call when the operation completes with the results of the operation.
     *
     * @example
     *
     * const Key = Aerospike.Key
     * client.remove(new Key('test', 'demo', 'key1'), function (error, key) {
     *   if (error) {
     *     // handle failure
     *   } else {
     *     // handle success
     *   }
     * })
     */
    public remove(key: Key, callback: Client.WriteCallback): void;
    /**
     * Removes a record with the specified key from the database cluster.
     *
     * @param {Key} key - The key of the record.
     * @param {Client~RemovePolicy} policy - The Remove Policy to use for this operation.
     * @param {Client~writeCallback} callback - The function to call when the operation completes with the results of the operation.
     */
    public remove(key: Key, policy: Client.RemovePolicy, callback: Client.WriteCallback): void;

    /**
     * Creates a new {@link Scan} instance in order to execute a database
     * scan using the Scan API.
     *
     * @see {@link Scan} constructor for options that can be used to initialize a
     * new instance.
     *
     * @param {string} ns - The namescape.
     * @param {object} [options] - Scan parameters. See {@link Scan} constructor for details.
     *
     * @since v2.0
     */
    public scan(ns: string, options?: Scan.ScanOptions): Scan;
    /**
     * Creates a new {@link Scan} instance in order to execute a database
     * scan using the Scan API.
     *
     * @see {@link Scan} constructor for options that can be used to initialize a
     * new instance.
     *
     * @param {string} ns - The namescape.
     * @param {string} [set] - The name of a set.
     * @param {object} [options] - Scan parameters. See {@link Scan} constructor for details.
     *
     * @since v2.0
     */
    public scan(ns: string, set?: string, options?: Scan.ScanOptions): Scan;

    /**
     * Retrieves selected bins for a record of given key from the database cluster.
     *
     * @param {Key} key - The key of the record.
     * @param {string[]} bins - A list of bin names for the bins to be returned.
     * @param {Client~RecordCallback} callback - The function to call when the operation completes with the results of the operation.
     *
     * @example
     *
     * const Key = Aerospike.Key
     *
     * client.select(new Key('test', 'demo', 'key1'), ['name', 'age'], function (error, record, metadata, key) {
     *   if (error) {
     *     // handle failure
     *   } else {
     *     // handle success
     *   }
     * })
     */
    public select<T>(key: Key, bins: string[], callback: Client.RecordCallback<T>): void;
    /**
     * Retrieves selected bins for a record of given key from the database cluster.
     *
     * @param {Key} key - The key of the record.
     * @param {string[]} bins - A list of bin names for the bins to be returned.
     * @param {Client~ReadPolicy} policy - The Read Policy to use for this operation.
     * @param {Client~RecordCallback} callback - The function to call when the operation completes with the results of the operation.
     */
    public select<T>(key: Key, bins: string[], policy: Client.ReadPolicy, callback: Client.RecordCallback<T>): void;

    /**
     * Registers a UDF module with the database cluster.
     *
     * This method loads a Lua script from the local filesystem into
     * the Aerospike database cluster and registers it for use as a UDF module. The
     * client uploads the module to a single cluster node. It then gets distributed
     * within the whole cluster automatically. The callback function is called once
     * the initial upload into the cluster has completed (or if an error occurred
     * during the upload). To verify that the UDF module has been registered on
     * every cluster node you can use the {@link Client#udfRegisterWait} method.
     *
     * @param {string} path - The file path to the Lua script to load into the server.
     * and only supported scripting language for UDF modules at the moment; ref.
     * {@link module:aerospike.language}.
     * @param {Client~doneCallback} callback - The function to call when the
     * operation completes with the result of the operation.
     *
     * @see {@link Client#udfRegisterWait} for an example.
     */
    public udfRegister(path: string, callback: DoneCallback): void;
    /**
     * Registers a UDF module with the database cluster.
     *
     * This method loads a Lua script from the local filesystem into
     * the Aerospike database cluster and registers it for use as a UDF module. The
     * client uploads the module to a single cluster node. It then gets distributed
     * within the whole cluster automatically. The callback function is called once
     * the initial upload into the cluster has completed (or if an error occurred
     * during the upload). To verify that the UDF module has been registered on
     * every cluster node you can use the {@link Client#udfRegisterWait} method.
     *
     * @param {string} path - The file path to the Lua script to load into the server.
     * @param {number} udfType - Language of the UDF script. Lua is the default
     * and only supported scripting language for UDF modules at the moment; ref.
     * {@link module:aerospike.language}.
     * @param {Client~doneCallback} callback - The function to call when the
     * operation completes with the result of the operation.
     *
     * @see {@link Client#udfRegisterWait} for an example.
     */
    public udfRegister(path: string, udfType: number, callback: DoneCallback): void;
    /**
     * Registers a UDF module with the database cluster.
     *
     * This method loads a Lua script from the local filesystem into
     * the Aerospike database cluster and registers it for use as a UDF module. The
     * client uploads the module to a single cluster node. It then gets distributed
     * within the whole cluster automatically. The callback function is called once
     * the initial upload into the cluster has completed (or if an error occurred
     * during the upload). To verify that the UDF module has been registered on
     * every cluster node you can use the {@link Client#udfRegisterWait} method.
     *
     * @param {string} path - The file path to the Lua script to load into the server.
     * @param {number} [udfType] - Language of the UDF script. Lua is the default
     * and only supported scripting language for UDF modules at the moment; ref.
     * {@link module:aerospike.language}.
     * @param {Client~InfoPolicy} policy - The Info Policy to use for this operation.
     * @param {Client~doneCallback} callback - The function to call when the
     * operation completes with the result of the operation.
     *
     * @see {@link Client#udfRegisterWait} for an example.
     */
    public udfRegister(path: string, udfType: number, policy: Client.InfoPolicy, callback: DoneCallback): void;

    /**
     * Waits until a UDF module has been successfully registered on all
     * cluster nodes.
     *
     * This function periodically polls the cluster nodes to check for
     * the presence of a previously registered UDF module. It calls the provided
     * callback function once all nodes have successfully registered the module.
     *
     * @param {string} udfModule - The name of the UDF module; this is the basename
     * of the UDF file registered with {@link Client#udfRegister}, i.e. the
     * filename, optionally including the file extension, but without the directory
     * name.
     * @param {number} pollInterval - Poll interval in milliseconds used to check
     * the presence of the on the cluster nodes.
     * @param {DoneCallback} callback - The function to call when the
     * operation completes with the result of the operation.
     *
     * @example
     *
     * const Aerospike = require('aerospike')
     * const path = require('path')
     *
     * Aerospike.connect((error, client) => {
     *   if (error) throw error
     *
     *   var path = './udf/my_module.lua'
     *   client.udfRegister(path, (error) => {
     *     if (error) throw error
     *
     *     var module = path.basename(path)
     *     client.udfRegisterWait(module, 100, (error) => {
     *       if (error) throw error
     *
     *       // UDF module was successfully registered on all cluster nodes
     *
     *       client.close()
     *     })
     *   })
     * })
     */
    public udfRegisterWait(udfModule: string, pollInterval: number, callback: DoneCallback): void;
    /**
     * Waits until a UDF module has been successfully registered on all
     * cluster nodes.
     *
     * This function periodically polls the cluster nodes to check for
     * the presence of a previously registered UDF module. It calls the provided
     * callback function once all nodes have successfully registered the module.
     *
     * @param {string} udfModule - The name of the UDF module; this is the basename
     * of the UDF file registered with {@link Client#udfRegister}, i.e. the
     * filename, optionally including the file extension, but without the directory
     * name.
     * @param {number} pollInterval - Poll interval in milliseconds used to check
     * the presence of the on the cluster nodes.
     * @param {Client~InfoPolicy} policy - The Info Policy to use for this operation.
     * @param {DoneCallback} callback - The function to call when the
     * operation completes with the result of the operation.
     */
    public udfRegisterWait(udfModule: string, pollInterval: number, policy: Client.InfoCallback, callback: DoneCallback): void;

    /**
     * Removes a UDF module from the cluster.
     *
     * @param {string} udfModule - The filename of the UDF module.
     * @param {DoneCallback} callback - The function to call when the operation completes which the result of the operation.
     *
     * @example
     *
     * client.udfRemove('my_module', function (error) {
     *   if (error) {
     *     // handle failure
     *   } else {
     *     // UDF module was successfully removed from the cluster
     *   }
     * })
     */
    public udfRemove(udfModule: string, callback: DoneCallback): void;
    /**
     * Removes a UDF module from the cluster.
     *
     * @param {string} udfModule - The filename of the UDF module.
     * @param {Client~InfoPolicy} policy - The Info Policy to use for this operation.
     * @param {DoneCallback} callback - The function to call when the operation completes which the result of the operation.
     */
    public udfRemove(udfModule: string, policy: Client.InfoPolicy, callback: DoneCallback): void;

    /** Apply new logging configuration. */
    public updateLogging(logConfig: Config.LogConfig): void;
}

declare namespace Client {
    /**
     * @typedef {Object} Client~AdminPolicy
     *
     * A policy affecting the behavior of admin operations.
     *
     * @property {number} timeout - Maximum time in milliseconds to wait for the operation to complete.
     */

    /**
     * @callback Client~doneCallback
     *
     * @summary Callback function called when an operation has completed.
     *
     * @param {?AerospikeError} error - The error code and message or <code>null</code> if the operation was successful.
     */

    /**
     * @callback Client~infoAllCallback
     *
     * @summary The function called when all cluster nodes have responded to the
     * info request. Note that the error parameter in the callback will be
     * non-<code>null</code> if at least one of the cluster hosts responded with an
     * error to the info request. To check the status of the info requeset for each
     * individual cluster node, you need to check the list of responses returned in
     * the second parameter..
     *
     * @param {?AerospikeError} error - The error code and message or <code>null</code> if the operation was successful.
     * @param {Object[]} [responses] - The response string with the requested info.
     * @param {string} responses[].info - The response string with the requested info.
     * @param {?AerospikeError} responses[].error - The error code and message or <code>null</code> if the info request to this cluster host was successful.
     * @param {Object} responses[].host - The address of the host which send the response.
     * @param {string} responses[].host.addr - The ip address or host name of the host.
     * @param {number} responses[].host.port - The port number of the host.
     */

    /** options for creating the index. */
    export interface CreateIndexOptions extends CreateTypedIndexOptions {
        /**
         * The data type of the index to be created.
         * e.g. Numeric, String or Geo.
         */
        datatype: indexDataType;
    }

    /** options for creating typed index. */
    export interface CreateTypedIndexOptions {
        /** The namespace on which the index is to be created. */
        ns: string;
        /** The set on which the index is to be created. */
        set?: string;
        /** The name of the bin which values are to be indexed. */
        bin: string;
        /** The name of the index to be created. */
        index: string;
        /**
         * Type of index to be
         * created based on the type of values stored in the bin. This option needs to
         * be specified if the bin to be indexed contains list or map values and the
         * individual entries of the list or keys/values of the map should be indexed.
         */
        type?: indexType;
    }

    export interface Metadata {
        /**
         * Tracks record modification cycle. The number is returned to the application 
         * on reads, which can use it to ensure that the data being written has not been 
         * modified since the last read.
         */
        gen?: number;
        /**
         * Specifies record expiration. Aerospike automatically expires records based on 
         * their TTL. The TTL increments every time the record is written. For server version 
         * 3.10.1 and above, the client can set a policy to not update the TTL when updating 
         * the record. See respective client API docs for details.
         */
        ttl?: number;
        /**
         * Specifies the timestamp record was updated. This is a metadata internal to the database
         * and is not returned to the client.
         */
        lut?: number;
    }

    /**
     * A policy affecting the behavior of apply operations.
     * @see {@link module:aerospike.policy} for supported policy values.
     */
    export interface ApplyPolicy {
        /** Maximum time in milliseconds to wait for the operation to complete. */
        timeout?: number;
        /** Specifies the behavior for the key. */
        key?: number;
        /**
         * Specifies the number of replicas required to be committed successfully when 
         * writing before returning transaction succeeded.
         */
        commitLevel?: number;
        /** The time-to-live (expiration) of the record in seconds. */
        ttl?: number;
        /**
         * Specifies whether a {@link http://www.aerospike.com/docs/guide/durable_deletes.html|tombstone}
         * should be written in place of a record that gets deleted as a result of this
         * operation. Default: false
         */
        durableDelete?: number;
    }

    /** A policy affecting the behavior of query operations. */
    export interface QueryPolicy {
        /** Maximum time in milliseconds to wait for the operation to complete. */
        timeout?: number;
    }

    /**
     * A policy affecting the behavior of read operations.
     * @see {@link module:aerospike.policy} for supported policy values.
     */
    export interface ReadPolicy {
        /** Maximum time in milliseconds to wait for the operation to complete. */
        timeout?: number;
        /** Specifies the behavior for the key. */
        key?: number;
        /** Specifies the replica to be consulted for the read. */
        replica?: number;
        /** Specifies the number of replicas consulted when reading for the desired consistency guarantee. */
        concistencyLevel?: number;
    }

    /**
     * A policy affecting the behavior of write operations.
     * @see {@link module:aerospike.policy} for supported policy values.
     */
    export interface WritePolicy {
        /** Maximum time in milliseconds to wait for the operation to complete. */
        timeout?: number;
        /** Minimum record size beyond which it is compressed and sent to the server. */
        compressionThreshold?: number;
        /** Specifies the behavior for the key. */
        key?: number;
        /** Specifies the behavior for the generation value. */
        gen?: number;
        /** Specifies the behavior for the existence of the record. */
        exists?: number;
        /** 
         * Specifies the number of replicas required to be committed successfully
         *  when writing before returning transaction succeeded.*/
        commitLevel?: number;
        /**
         * Specifies whether a {@link http://www.aerospike.com/docs/guide/durable_deletes.html|tombstone}
         * should be written in place of a record that gets deleted as a result of this operation.
         */
        durableDelete?: boolean;
    }

    /**
     * A policy affecting the behavior of remove operations.
     * @see {@link module:aerospike.policy} for supported policy values.
     */
    export interface RemovePolicy {
        /** Maximum time in milliseconds to wait for the operation to complete. */
        timeout?: number;
        /** The generation of the record. */
        generation?: number;
        /** Specifies the behavior for the key. */
        key?: number;
        /** Specifies the behavior for the generation value. */
        gen?: number;
        /**
         * Specifies the number of replicas required to be committed successfully 
         * when writing before returning transaction succeeded.
         */
        commitLevel?: number;
        /**
         * Specifies whether a {@link http://www.aerospike.com/docs/guide/durable_deletes.html|tombstone}
         * should be written in place of a record that gets deleted as a result of this operation.
         * Default: false.
         */
        durableDelete?: boolean;
    }

    /** A policy affecting the behavior of info operations. */
    export interface InfoPolicy {
        /** Maximum time in milliseconds to wait for the operation to complete. */
        timeout?: number;
        /** Send request without any further processing. */
        sendAsIs?: boolean;
        /** Ensure the request is within allowable size limits. */
        checkBounds?: boolean;
    }

    /**
     * A policy affecting the behavior of operate operations.
     * @see {@link module:aerospike.policy} for supported policy values.
     */
    export interface OperatePolicy {
        /** Maximum time in milliseconds to wait for the operation to complete. */
        timeout?: number;
        /** Specifies the behavior for the key. */
        key?: number;
        /** Specifies the behavior for the generation value. */
        gen?: number;
        /** Specifies the replica to be consulted for the read. */
        replica?: number;
        /** Specifies the number of replicas consulted when reading for the desired consistency guarantee. */
        concistencyLevel?: number;
        /**
         * Specifies the number of replicas required to be committed successfully when writing 
         * before returning transaction succeeded.
         */
        commitLevel?: number;
        /**
         * Specifies whether a {@link http://www.aerospike.com/docs/guide/durable_deletes.html|tombstone}
         * should be written in place of a record that gets deleted as a result of this operation.
         * Default: false
         */
        durableDelete?: boolean;
    }

    /** A policy affecting the behavior of scan operations. */
    export interface ScanPolicy {
        /** Maximum time in milliseconds to wait for the operation to complete. */
        timeout?: number;
        /** Abort the scan if the cluster is not in a stable state. */
        failOnClusterChange?: boolean;
        /**
         * Specifies whether a {@link http://www.aerospike.com/docs/guide/durable_deletes.html|tombstone} should
         * be written in place of a record that gets deleted as a result of this operation.
         */
        durableDelete?: boolean;
    }

    /** A policy affecting the behavior of batch operations. */
    export interface BatchPolicy {
        /** Maximum time in milliseconds to wait for the operation to complete. */
        timeout?: number;
    }

    export interface BatchRecord {
        /** Key to retrieve. */
        key: Key;
        /** List of bins to retrieve. */
        bins?: string[];
        /**
         * Whether to retrieve all bins or just the meta data of the record. If true, 
         * ignore <code>bins</code> and read all bins; if false and <code>bins</code>
         * is specified, read specified bins; if false and <code>bins</code> is not specified, 
         * read only record meta data (generation, expiration, etc.)
         */
        read_all_bins?: boolean;
    }

    export interface BatchResult {
        /** The status of the record. */
        status: number;
        /** The key of the record. */
        key: Key;
        /** The record bins read from the cluster. */
        record: Object;
        /** The metadata of the record. */
        metadata: Metadata;
    }


    /**
     * The function called when the client has successfully connected to the server.
     *
     * Once you receive the connect callback the client instance
     * returned in the callback is ready to accept commands for the Aerospike
     * cluster.
     *
     * If an error occurred while connecting to the cluster, the
     * <code>client</code> parameter will be <code>undefined</code> and the
     * <code>error</code> parameter will include more information about the error.
     *
     * @param {?AerospikeError} error - The error code and message or <code>null</code> if the operation was successful.
     * @param {Client} [client] - Aerospike client instance.
     */
    export type ConnectCallback = ValueCallback<Client>;

    /**
     * Callback function returning one or more records from the cluster.
     *
     * If the operation was successful, <code>null</code> will be returned for the
     * error parameter. If there was an error, <code>results</code> will be
     * <code>undefined</code> and the <code>error</code> paramter will provide more
     * information about the error.
     *
     * @param {?AerospikeError} error - The error code and message or <code>null</code> if the operation was successful.
     * @param {BatchResult[]} [results] - The results of the operation. Depending on the
     * specific operation, the full record, a selection of bins or just the meta
     * data for the record will be included in the results.
     */
    export type BatchRecordsCallback = ValueCallback<BatchResult[]>;

    /**
     * Function called when a potentially long-running job has been started.
     *
     * @param {?AerospikeError} error - The error code and message or <code>null</code> if the operation was successful.
     * @param {Job} [job] - Handle on a potentially long-running job which can be used to check for job completion.
     */
    export type JobCallback = ValueCallback<Job>;

    /**
     * Callback function returning a single record from the cluster.
     *
     * If the operation was successful, <code>null</code> will be returned for the
     * error parameter. If there was an error, <code>record</code> will be
     * <code>undefined</code> and the <code>error</code> paramter will provide more
     * information about the error.
     *
     * @param {?AerospikeError} error - The error code and message or <code>null</code> if the operation was successful.
     * @param {Object} [record] - The record bins. Depending on the operation, the full record or a selection of bins will be returned.
     * @param {Object} [metadata] - The metadata of the record.
     * @param {Key} [key] - The key of the record.
     */
    export type RecordCallback<T> = (error: AerospikeError, record: T, metadata: Metadata, key: Key) => any;

    /** Callback function returning record metadata if record exists. */
    export type ExistsCallback = (error: AerospikeError, metadata: Metadata, key: Key) => any;

    /**
     * The function called when a cluster host responds to an info query.
     *
     * @param {?AerospikeError} error - The error code and message or <code>null</code> if the operation was successful.
     * @param {string} [response] - The response string with the requested info.
     * @param {Config~HostConfig} [host] - The address of the host which send the response.
     */
    export type InfoCallback = (error: AerospikeError, response: string, host: Config.HostConfig) => any;

    /**
     * Callback function called when a write operation on a single record has completed.
     *
     * @param {?AerospikeError} error - The error code and message or <code>null</code> if the operation was successful.
     * @param {Key} key - The key of the record.
     */
    export type WriteCallback = ValueCallback<Key>;
}

export = Client;