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

import * as Key from "./key";
import * as AerospikeError from "./aerospike_error";

import { PolicyConfig } from "./config";

/**
 * @class LargeList
 *
 * @classdesc Create and Manage a list within a single bin.
 *
 * For more information, please refer to the section on
 * <a href="http://www.aerospike.com/docs/guide/ldt_guide.html" title="Aerospike Large Data Types">&uArr;Large Data Types (LDT)</a>
 * in the Aerospike technical documentation.
 *
 * ### Large Data Types (LDT) Are Deprecated
 *
 * The Large Data Types (LDT) functionality is deprecated and
 * should no longer be used. All code that uses these interfaces should
 * transition to the List and SortedMaps APIs. Most applications can use a
 * variety of techniques such as bucketing to provide higher performance and
 * reliability using the new APIs. Please check out the
 * <a href="http://www.aerospike.com/docs/guide/ldt_guide.html">&uArr;technical documentation</a>
 * for detailed information on LDT alternatives.
 *
 * The discontinuation of support for the Large Data Type (LDT) feature was
 * announced on November 14, 2016 via the following blog post:
 * <a href="http://www.aerospike.com/blog/aerospike-ldt/">http://www.aerospike.com/blog/aerospike-ldt/</a>.
 *
 * @param {Key} key - The key used to locate the record in the cluster.
 * @param {string} binName - Name of the LDT bin.
 * @param {Client~ApplyPolicy} [policy] - The Apply Policy to use for this operation.
 * @param {string} [createModule] - The LUA function name that initializes the
 * list configuration parameters; pass <code>null</code> for default list.
 *
 * @deprecated since v2.4.4
 *
 * @example
 *
 * const Aerospike = require('aerospike')
 * Aerospike.connect((error, client) => {
 *   if (error) throw error
 *   var key          = new Aerospike.Key('test', 'demo', 'llistKey')
 *   var binName      = 'LDTbin'
 *   var policy       = { timeout: 1000 }
 *   var createModule = 'ListInitializer'
 *   var llist = client.LargeList(key, binName, policy, createModule)
 *   // operate on large list
 *   client.close()
 * })
 *
 */
declare class LargeList {
    public key: Key;
    public bindName: string;
    public writePolicy?: PolicyConfig;
    public createModule?: string;
    public module: string;

    constructor(client, key: Key, binName: string, writePolicy?: PolicyConfig, createModule?: string);

    /**
     * Generic function to execute any LDT function.
     * Invokes udf execute with the corresponding LDT function name, file name as
     * llist - file in which all the LDT functions are implemented. Some function
     * applies an UDF/Filter on values returned by LDT. Those values are passed
     * as {module:" ", funcname:" ", args: " "} object. Parse the above object
     * format and populate UDFArgs accordingly. Position of the UDF arguments is
     * passed to parse effectively.
     */
    public execute(ldtFunc: string, ldtargs: Array<string | LargeList.LDTArgs>, arglength: number, udfPosition?: number)

    /**
     * Adds a single value or an array of values to an existing Large
     * List.
     *
     * The operation fails if the value's key exists and the list is configured for
     * unique keys.
     *
     * If the value is a map, the key is identified by the <code>key</code> entry.
     * Otherwise, the value is the key. If the large list does not exist, create it
     * using the specified <code>userModule</code> configuration.
     *
     * @param {(*|Array.<*>)} value - Value(s) to add
     * @param {LargeList~ValueCallback} callback - The function to call when the operation completes with the result of the operation.
     *
     * @deprecated since v2.4.4
     *
     * @example <caption>Adding a single value</caption>
     *
     * llist.add({'key': 'ldt_key', 'value': 'ldtvalue'}, (error, response) => {
     *   if (error) throw error
     *   // handle success
     * })
     *
     * @example <caption>Adding a list of values</caption>
     *
     * var valArray = [{'key': 'ldt_key', 'value': 'ldtvalue'}, {'key': 'ldt_array', 'value': 'ldtarrayvalue'}]
     * llist.add(valArray, (error, response) => {
     *   if (error) throw error
     *   // handle success
     * })
     */
    public add(value: any[] | any, callback: LargeList.ValueCallback): void;


    /**
     * Update/add a single value or array of values depending on if the key exists or not.
     *
     * If the value is a map, the key is identified by the <code>key</code> entry.
     * Otherwise, the value is the key. If the large list does not exist, create it
     * using the specified <code>userModule</code> configuration.
     *
     * @param {(*|Array.<*>)} value - Value(s) to update
     * @param {LargeList~ValueCallback} callback - The function to call when the operation completes with the result of the operation.
     *
     * @deprecated since v2.4.4
     *
     * @example <caption>Updating a single value</caption>
     *
     * llist.update({'key': 'ldt_key', 'value': 'ldtupdatedvalue'}, (error, response) => {
     *   if (error) throw error
     *   // handle success
     * })
     *
     * @example <caption>Updating a list of values</caption>
     *
     * var valArray = [{'key': 'ldt_key', 'value': 'ldtupdatevalue'}, {'key': 'ldt_array', 'value': 'ldtarrayupdatedvalue'}]
     * llist.update(valArray, (error, response) => {
     *   if (error) throw error
     *   // handle success
     * })
     */
    public update(value: any[] | any, callback: LargeList.ValueCallback): void;

    /**
     * @function LargeList#remove
     *
     * @summary Deletes a single value or a list of values from the Large list.
     *
     * @param {(*|Array.<*>)} value - Value(s) to delete.
     * @param {LargeList~ValueCallback} callback - The function to call when the operation completes with the result of the operation.
     *
     * @deprecated since v2.4.4
     *
     * @example <caption>Removing a single value</caption>
     *
     * llist.remove({'key': 'ldt_key'}, (error, response) => {
     *   if (error) throw error
     *   // handle success
     * })
     *
     * @example <caption>Removing a list of values</caption>
     *
     * var valArray = [{'key': 'ldt_key'}, {'key': 'ldt_array'}]
     * llist.remove(valArray, (error, response) => {
     *   if (error) throw error
     *   // handle success
     * })
     */
    public remove(value: any[] | any, callback: LargeList.ValueCallback): void;


    /**
     * Removes values from the list between a given start and end value.
     *
     * @param {*} valBegin - Low value of the range (inclusive)
     * @param {*} valEnd - High value of the range (inclusive)
     * @param {LargeList~ValueCallback} callback - The function to call when the operation completes with the result of the operation.
     *
     * @deprecated since v2.4.4
     *
     * @example
     *
     * llist.remove('begin', 'end', (error, response) => {
     *   if (error) throw error
     *   // handle success
     * })
     */
    public removeRange(valBegin: any, valEnd: any, callback: LargeList.ValueCallback): void;

    /**
     * Select values from the list.
     *
     * @param {*} value - Value to select
     * @param {LargeList~ListCallback} callback - The function to call when the operation completes with the result of the operation.
     *
     * @deprecated since v2.4.4
     *
     * @example <caption>Selecting a single value</caption>
     *
     * llist.find('search_key', (error, response) => {
     *   if (error) throw error
     *   // handle success
     * })
     */
    public find(value: any, callback: LargeList.ListCallback): void;
    /**
     * Select values from the list.
     *
     * @param {*} value - Value to select
     * @param {Object} filterArgs - UDF arguments for specifying LUA file, function and function arguments.
     * @param {LargeList~ListCallback} callback - The function to call when the operation completes with the result of the operation.
     *
     * @deprecated since v2.4.4
     *
     * @example <caption>Selecting a single value</caption>
     *
     * llist.find('search_key', (error, response) => {
     *   if (error) throw error
     *   // handle success
     * })
     */
    public find(value: any, filterArgs: LargeList.FilterArgs, callback: LargeList.ListCallback): void;

    /**
     * Select values from the list and apply specified LUA filter.
     *
     * @param {Object} filterArgs - UDF arguments for specifying LUA file, function and function arguments.
     * @param {LargeList~ListCallback} callback - The function to call when the operation completes with the result of the operation.
     *
     * @deprecated since v2.4.4
     *
     * @example
     *
     * var udfargs = {module: 'udf_module', funcname: 'udf_function', args: ['abc', 123, 4.5]}
     * llist.filter((error, response) => {
     *   if (error) throw error
     *   // handle success
     * })
     */
    public filter(filterArgs: LargeList.FilterArgs, callback: LargeList.ListCallback): void;

    /**
     * Select a range of values from the Large List.
     *
     * @param {*} valBegin - Low value of the range (inclusive)
     * @param {*} valEnd - High value of the range (inclusive)
     * @param {LargeList~ValueCallback} callback - The function to call when the operation completes with the result of the operation.
     *
     * @deprecated since v2.4.4
     *
     * @example <caption>Finding a range of values</caption>
     *
     * llist.findRange('begin', 'end', (error, response) => {
     *   if (error) throw error
     *   // handle success
     * })
     */
    public findRange(valBegin: any, valEnd: any, callback: LargeList.ValueCallback): void;

    /**
     * Select a range of values from the Large List.
     *
     * @param {*} valBegin - Low value of the range (inclusive)
     * @param {*} valEnd - High value of the range (inclusive)
     * @param {Object} filterArgs - UDF arguments for specifying LUA file, function and function arguments.
     * @param {LargeList~ValueCallback} callback - The function to call when the operation completes with the result of the operation.
     *
     * @deprecated since v2.4.4
     *
     * @example <caption>Finding a range of values then applying a filter on it</caption>
     *
     * var filter = {module: 'udf_module', funcname: 'udf_function', args: ['abc', 123, 4.5]}
     * llist.findRange('begin', 'end', filter, (error, response) => {
     *   if (error) throw error
     *   // handle success
     * })
     */
    public findRange(valBegin: any, valEnd: any, filterArgs: LargeList.FilterArgs, callback: LargeList.ValueCallback): void;

    /**
     * Select all the objects in the list.
     *
     * @param {LargeList~ListCallback} callback - The function to call when the operation completes with the result of the operation.
     *
     * @deprecated since v2.4.4
     *
     * @example
     *
     * llist.scan((error, response) => {
     *   if (error) throw error
     *   // handle success
     * })
     */
    public scan(callback: LargeList.ListCallback): void;

    /**
     * Destroy the bin containing the Large List.
     *
     * @param {LargeList~DoneCallback} callback - The function to call when the operation completes with the result of the operation.
     *
     * @deprecated since v2.4.4
     *
     * @example
     *
     * llist.destroy((error, response) => {
     *   if (error) throw error
     *   // handle success
     * })
     */
    public destroy(callback: LargeList.DoneCallback): void;

    /**
     * Retrieves the size of the list.
     *
     * @param {LargeList~ValueCallback} callback - The function to call when the operation completes with the result of the operation.
     *
     * @deprecated since v2.4.4
     *
     * @example
     *
     * llist.size((error, response) => {
     *   if (error) throw error
     *   // handle success
     * })
     */
    public size(callback: LargeList.ValueCallback): void;

    /**
     * @function LargeList#getConfig
     *
     * @summary Retrieves the list configuration parameters.
     *
     * @param {LargeList~ValueCallback} callback - The function to call when the operation completes with the result of the operation.
     *
     * @deprecated since v2.4.4
     *
     * @example
     *
     * llist.getConfig((error, response) => {
     *   if (error) throw error
     *   // handle success
     * })
     */
    public getConfig(callback: LargeList.ValueCallback): void;
}

declare namespace LargeList {
    /** Callback function called when an operation has completed. */
    export type DoneCallback = (err: AerospikeError) => any;
    /** Callback function called when an operation has completed. */
    export type ValueCallback = (err: AerospikeError, response: any) => any;
    /** Callback function called when an operation has completed. */
    export type ListCallback = (err: AerospikeError, list: any[]) => any;

    export interface FilterArgs {
        module: string;
        funcname: string;
        args: string | string[];
    }

    export interface LDTArgs {
        module: string;
        funcname: string;
        args: string;
    }
}

export = LargeList;