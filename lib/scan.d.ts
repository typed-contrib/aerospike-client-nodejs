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

import * as Client from "./client";
import * as RecordStream from "./record_stream";

/**
 * @class Scan
 * @classdesc The scan object created by calling {@link Client#scan} is used
 * for executing record scans on the specified namespace and set (optional).
 * Scans can return a set of records as a {@link RecordStream} or apply an
 * Aerospike UDF (user-defined function) on each of the records on the server.
 *
 * For more information, please refer to the section on
 * <a href="http://www.aerospike.com/docs/guide/scan.html">&uArr;Scans</a>
 * in the Aerospike technical documentation.
 *
 * #### Selecting Bins
 *
 * Using {@link Scan#select} it is possible to select a subset of bins which
 * should be returned by the query. If no bins are selected, then the whole
 * record will be returned. If the {@link Scan#nobins} property is set to
 * <code>true</code> the only the record meta data (ttl, generation, etc.) will
 * be returned.
 *
 * #### Executing a Scan
 *
 * A scan is executed using {@link Scan#foreach}. The method returns a {@link
 * RecordStream} which emits a <code>data</code> event for each record returned
 * by the scan. The scan can be aborted at any time by calling
 * {@link RecordStream#abort}.
 *
 * #### Executing Record UDFs using Background Scans
 *
 * Record UDFs perform operations on a single record such as updating records
 * based on a set of parameters. Using {@link Scan#background} you can run a
 * Record UDF on the result set of a scan. Scans using Records UDFs are run
 * in the background on the server and do not return the records to the client.
 *
 * For additional information please refer to the section on
 * <a href="http://www.aerospike.com/docs/guide/record_udf.html">&uArr;Record UDFs</a>
 * in the Aerospike technical documentation.
 *
 * @see {@link Client#scan} to create new instances of this class.
 *
 * @since v2.0
 *
 * @example
 *
 * const Aerospike = require('aerospike')
 *
 * Aerospike.connect((error, client) => {
 *   if (error) throw error
 *
 *   var scan = client.scan('test', 'demo')
 *   scan.priority = Aerospike.scanPriority.LOW
 *   scan.percent = 50 // scan only 50% of all records in the set
 *
 *   var recordsSeen = 0
 *   var stream = scan.foreach()
 *   stream.on('error', (error) => { throw error })
 *   stream.on('end', () => client.close())
 *   stream.on('data', (record) => {
 *     console.log(record)
 *     recordsSeen++
 *     if (recordsSeen > 100) stream.abort() // We've seen enough!
 *   })
 * })
 */
declare class Scan {
    public client: Client;
    /** Namespace to scan. */
    public ns: string;
    /** Name of the set to scan. */
    public set: string;
    /**
     * List of bin names to be selected by the scan. If a scan specifies bins to
     * be selected, then only those bins will be returned. If no bins are
     * selected, then all bins will be returned (unless {@link Scan#nobins} is
     * set to <code>true</code>).
     *
     * @see Use {@link Scan#select} to specify the bins to select.
     */
    public selected?: string[];
    /**
     * Priority level at which the scan will be executed.
     * @see {@link module:aerospike.scanPriority} for enumeration of allowed values.
     */
    public priority?: number;
    /** Percentage of records in the cluster to scan. */
    public percent?: number;
    /** If set to <code>true</code>, the scan will return only meta data, and exclude bins. */
    public nobins?: boolean;
    /** If set to <code>true</code>, all cluster nodes will be scanned in parallel. */
    public concurrent?: boolean;

    /**
     * Constructs a new Scan.
     * 
     * @param {Client} client - A client instance.
     * @param {string} ns - The namescape.
     * @param {string} [set] - The name of a set.
     * @param {object} [options] - Scan parameters.
     */
    constructor(client: Client, ns: string, options?: Scan.ScanOptions);
    /**
     * Constructs a new Scan.
     * 
     * @param {Client} client - A client instance.
     * @param {string} ns - The namescape.
     * @param {string} [set] - The name of a set.
     * @param {object} [options] - Scan parameters.
     */
    constructor(client: Client, ns: string, set?: string, options?: Scan.ScanOptions);

    /**
     * Specify the names of bins to be selected by the scan.
     *
     * If a scan specifies bins to be selected, then only those bins will be
     * returned. If no bins are selected, then all bins will be returned. (Unless
     * {@link Scan#nobins} is set to <code>true</code>.)
     *
     * @param {...string} bins - List of bin names to return.
     */
    public select(...bins: string[]): void;
    /**
     * Specify the names of bins to be selected by the scan.
     *
     * If a scan specifies bins to be selected, then only those bins will be
     * returned. If no bins are selected, then all bins will be returned. (Unless
     * {@link Scan#nobins} is set to <code>true</code>.)
     *
     * @param {string} bins - List of bin names to return.
     */
    public select(bins: string[]): void;

    /**
     * Perform a read-write background scan and apply a Lua user-defined
     * function (UDF) to each record.
     *
     * When a background scan is initiated, the client will not wait
     * for results from the database. Instead a {@link Job} instance will be
     * returned, which can be used to query the scan status on the database.
     *
     * @param {string} udfModule - UDF module name.
     * @param {string} udfFunction - UDF function name.
     * @param {Client~JobCallback} callback - The function to call when the operation completes.
     */
    public background(udfModule: string, udfFunction: string, callback: Client.JobCallback): void;
    /**
     * Perform a read-write background scan and apply a Lua user-defined
     * function (UDF) to each record.
     *
     * When a background scan is initiated, the client will not wait
     * for results from the database. Instead a {@link Job} instance will be
     * returned, which can be used to query the scan status on the database.
     *
     * @param {string} udfModule - UDF module name.
     * @param {string} udfFunction - UDF function name.
     * @param {Array<*>} [udfArgs] - Arguments for the function.
     * @param {Client~JobCallback} callback - The function to call when the operation completes.
     */
    public background(udfModule: string, udfFunction: string, udfArgs: any[], callback: Client.JobCallback): void;
    /**
     * Perform a read-write background scan and apply a Lua user-defined
     * function (UDF) to each record.
     *
     * When a background scan is initiated, the client will not wait
     * for results from the database. Instead a {@link Job} instance will be
     * returned, which can be used to query the scan status on the database.
     *
     * @param {string} udfModule - UDF module name.
     * @param {string} udfFunction - UDF function name.
     * @param {Array<*>} [udfArgs] - Arguments for the function.
     * @param {Client~ScanPolicy} [policy] - The Scan Policy to use for this operation.
     * @param {Client~JobCallback} callback - The function to call when the operation completes.
     */
    public background(udfModule: string, udfFunction: string, udfArgs: any[], policy: Client.ScanPolicy, callback: Client.JobCallback): void;
    /**
     * Perform a read-write background scan and apply a Lua user-defined
     * function (UDF) to each record.
     *
     * When a background scan is initiated, the client will not wait
     * for results from the database. Instead a {@link Job} instance will be
     * returned, which can be used to query the scan status on the database.
     *
     * @param {string} udfModule - UDF module name.
     * @param {string} udfFunction - UDF function name.
     * @param {Array<*>} [udfArgs] - Arguments for the function.
     * @param {Client~ScanPolicy} [policy] - The Scan Policy to use for this operation.
     * @param {number} [scanID] - Job ID to use for the scan; will be assigned
     * randomly if zero or undefined.
     * @param {Client~JobCallback} callback - The function to call when the operation completes.
     */
    public background(udfModule: string, udfFunction: string, udfArgs: any[], policy: Client.ScanPolicy, scanID: number, callback: Client.JobCallback): void;

    /**
     * Performs a read-only scan on each node in the cluster. As the scan
     * iterates through each partition, it returns the current version of each
     * record to the client.
     *
     * @param {Client~ScanPolicy} [policy] - The Scan Policy to use for this operation.
     *
     * @returns {RecordStream}
     */
    public forEach(policy?: Client.ScanPolicy, dataCb?: RecordStream.DataListener, errorCb?: RecordStream.ErrorListener, endCb?: RecordStream.EndListener): RecordStream;
    public execute(policy?: Client.ScanPolicy, dataCb?: RecordStream.DataListener, errorCb?: RecordStream.ErrorListener, endCb?: RecordStream.EndListener): RecordStream;
}

declare namespace Scan {
    /** Scan parameters. */
    export interface ScanOptions {
        /** List of bin names to select. See {@link Scan#select}. */
        select?: string[];
        /** Priority level at which the scan will be executed. See {@link Scan#priority}. */
        priority?: number;
        /** Percentage of records to scan. See {@link Scan#percent}. (Default: 100) */
        percent?: number;
        /** Whether only meta data should be returned. See {@link Scan#nobins}. (Default: false)*/
        nobins?: boolean;
        /**
         * Whether all cluster nodes should be scanned concurrently.
         * See {@link Scan#concurrent}. (Default: false)
        */
        concurrent?: boolean;
    }
}

export = Scan;