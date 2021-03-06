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

/**
 * @module aerospike/maps
 *
 * @description This module defines operations on the Sorted Map data type that
 * can be used with the {@link Client#operate} command. Operations on Sorted
 * Maps require Aerospike Server
 * <a href="http://www.aerospike.com/download/server/notes.html#3.8.4">&uArr;version 3.8.4</a>
 * or later.
 *
 * For more information, please refer to the
 * <a href="http://www.aerospike.com/docs/guide/cdt-map.html">&uArr;Maps</a>
 * documentation in the Aerospike Feature Guide.
 *
 * #### Sorted Maps
 *
 * The Map data type supports both unordered and ordered maps. Maps can be
 * ordered by key, or by key and value. By default, maps are unordered. The map
 * order is controlled through the map policy and can be set either when the
 * map is created through the {@link module:aerospike/maps.put|put} or {@link
 * module:aerospike/maps.putItems|putItems} operations or later on through the
 * {@link module:aerospike/maps.setPolicy|setPolicy} operation.
 *
 * All maps maintain an index and a rank. The index is the item offset from the
 * start of the map, for both unordered and ordered maps. The rank is the
 * sorted index of the value component. Map supports negative indexing for
 * index and rank.
 *
 * Index examples:
 *
 *  - Index 0: First item in map.
 *  - Index 4: Fifth item in map.
 *  - Index -1: Last item in map.
 *  - Index -3: Third to last item in map.
 *  - Index 1 Count 2: Second and third items in map.
 *  - Index -3 Count 3: Last three items in map.
 *  - Index -5 Count 4: Range between fifth to last item to second to last item inclusive.
 *
 * Rank examples:
 *
 *  - Rank 0: Item with lowest value rank in map.
 *  - Rank 4: Fifth lowest ranked item in map.
 *  - Rank -1: Item with highest ranked value in map.
 *  - Rank -3: Item with third highest ranked value in map.
 *  - Rank 1 Count 2: Second and third lowest ranked items in map.
 *  - Rank -3 Count 3: Top three ranked items in map.
 *
 * @see {@link Client#operate}
 *
 * @example
 *
 * const Aerospike = require('aerospike')
 * const maps = Aerospike.maps
 * const key = new Aerospike.Key('test', 'demo', 'key1')
 *
 * var keyOrderedPolicy = { order: maps.order.KEY_ORDERED }
 * var createOnlyPolicy = { writeMode: maps.writeMode.CREATE_ONLY }
 * var ops = [
 *   maps.put('map', 'e', 5, keyOrderedPolicy),                    // => { map: { e: 5 } }
 *   maps.putItems('map', { d: 4, b: 2, c: 3 }),                   // => { map: { b: 2, c: 3, d: 4, e: 5 } }
 *   maps.putItems('map', { c: 99, a: 1 }, createOnlyPolicy),      // => { map: { a: 1, b: 2, c: 3, d: 4, e: 5 } }
 *   maps.removeByValue('map', 3),                                 // => { map: { a: 1, b: 2, d: 4, e: 5 } }
 *   maps.removeByIndexRange('map', -2, 2, maps.returnType.KEY)    // => { map: { a: 1, b: 2 } }
 * ]
 *
 * Aerospike.connect((error, client) => {
 *   if (error) throw error
 *   client.operate(key, ops, (error, result) => {
 *     if (error) throw error
 *     console.log(result)                                         // => { map: ['d', 'e'] }
 *     client.get(key, (error, record) => {
 *       if (error) throw error
 *       console.log(record)                                       // => { map: { a: 1, b: 2 } }
 *       client.close()
 *     })
 *   })
 * })
 */
import { Operation } from "./operations";

export interface MapOperation extends Operation {
    op: number;
    bin: string;

    key?: any;
    value?: any;
    index?: number;
    count?: number;
    policy?: MapPolicy;
    items?: Object;
    incr?: number;
    decr?: number;
    begin?: any;
    end?: any;
    returnType?: returnType;
    rank?: number;
}

/** A policy affecting the behavior of map operations.*/
export interface MapPolicy {
    /**
     * Sort order for the map. See {@link module:aerospike/maps.order} for possible 
     * values; default is <code>UNORDERED</code>.
     */
    order?: order;
    /**
     * Specifies the behavior when replacing or inserting map items. See 
     * {@link module:aerospike/maps.writeMode} for possible values; 
     * default is <code>UPDATE</code>.
     */
    writeMode?: writeMode;
}

/**
 * Map order. The order determine what kind of index the Aerospike server
 * maintains for the map.
 *
 * @property UNORDERED - Map is not ordered. This is the default.
 * @property KEY_ORDERED - Order map by key.
 * @property KEY_VALUE_ORDERED - Order map by key, then value.
 */
export enum order {
    /** Map is not ordered. This is the default. */
    UNORDERED,
    /** Order map by key. */
    KEY_ORDERED,
    /** Order map by key, then value. */
    KEY_VALUE_ORDERED
}

/**
 * Map write mode. The write mode determines whether a write operation
 * succeeds, depending on whether the map key(s) to be written already exist.
 * It also determines whether a new map will be created automatically if the
 * record bin, which the map operation is targeting, is currently empty.
 */
export enum writeMode {
    /**
     * If the key already exists, the item will be overwritten. If the key does 
     * not exist, a new item will be created. This is the default write mode.
     */
    UPDATE,
    /**
     * If the key already exists, the item will be overwritten. If the key does 
     * not exist, the write will fail.
     */
    UPDATE_ONLY,
    /**
     * If the key already exists, the write will fail. If the key does not exist, 
     * a new item will be created.
     */
    CREATE_ONLY
}

/**
 * Map return type. The return type determines what data of the selected
 * items the get and remove operations return in the result of the {@link
 * Client#operate} command. It is optional to specify the return type for
 * remove operations; default is <code>NONE</code>. For get operations the
 * return type parameter is required.
 */
export enum returnType {
    /** Do not return a result; this is the default. */
    NONE,
    /** Return key index order. (0 = first key, 1 = second key, ...) */
    INDEX,
    /** Return reverse key order. (0 = last key, -1 = second last key, ...) */
    REVERSE_INDEX,
    /** Return value order. (0 = smallest value, 1 = second smallest value, ...) */
    RANK,
    /** Return reverse value order. (0 = largest value, -1 = second largest value, ...) */
    REVERSE_RANK,
    /** Return count of items selected. */
    COUNT,
    /** Return key for single key read and key list for range read. */
    KEY,
    /** Return value for single key read and value list for range read. */
    VALUE,
    /** Return map items keys and values as an Array, i.e. [key1, value1, key2, value2, ...]. */
    KEY_VALUE
}

/**
 * Sets map policy attributes.
 * This operation does not return any result.
 *
 * @param {string} bin - The name of the bin. The bin must contain a Map value.
 * @param {module:aerospike/maps~MapPolicy} policy - The map policy.
 * @returns {MapOperation} Operation that can be passed to the {@link Client#operate} command.
 */
export function setPolicy(bin: string, policy: MapPolicy): MapOperation;

/**
 * Writes a key/value item to the map. Depending on the map policy and
 * whether an entry with the same key already exists in the map, a new key
 * will be added to the map or the existing entry with the same key will be
 * updated. If the bin does not yet contain a map value, a new map may be created.
 *
 * This operation returns the new size of the map.
 *
 * @param {string} bin - The name of the bin. If the bin exists, it must
 * contain a Map value; if it does not yet exist, a new Map may be created
 * depending on the map policy's write mode.
 * @param {any} key - Map key to write.
 * @param {any} value - Map value to write.
 * @param {module:aerospike/maps~MapPolicy} [policy] - The map policy.
 * @returns {MapOperation} Operation that can be passed to the {@link Client#operate} command.
 */
export function put(bin: string, key: any, value: any, policy?: MapPolicy): MapOperation;

/**
 * Writes each entry of the given map to the map bin on the server. Depending
 * on the map policy and whether an entry with the same key already exists in
 * the map, a new entry will be added to the map or the existing entry with
 * the same key will be updated. If the bin does not yet contain a map value,
 * a new map may be created.
 *
 * This operation returns the new size of the map.
 *
 * @param {string} bin - The name of the bin. If the bin exists, it must
 * contain a Map value; if it does not yet exist, a new Map may be created
 * depending on the map policy's write mode.
 * @param {object} items - One or more key value pairs to write to the map.
 * @param {module:aerospike/maps~MapPolicy} [policy] - The map policy.
 * @returns {MapOperation} Operation that can be passed to the {@link Client#operate} command.
 */
export function putItems(bin: string, items: Object, policy?: MapPolicy): MapOperation

/**
 * Increments the map entry identified by the given key by the value
 * <code>incr</code>. Valid only for numeric values.
 *
 * If a map entry with the given key does not exist, the map policy's write
 * mode determines whether a new entry will be created same as for the
 * {@link module:aerospike/maps.put|put} command. This operation may create a
 * new map if the map bin is currently empty.
 *
 * This operation returns the new value of the map entry.
 *
 * @param {string} bin - The name of the bin. If the bin exists, it must
 * contain a Map value; if it does not yet exist, a new Map may be created
 * depending on the map policy's write mode.
 * @param {any} key - The map key.
 * @param {number} incr - The value to increment the map entry by.
 * @param {module:aerospike/maps~MapPolicy} [policy] - The map policy.
 * @returns {MapOperation} Operation that can be passed to the {@link Client#operate} command.
 */
export function increment(bin: string, key: any, incr: number, policy?: MapPolicy): MapOperation;

/**
 * Decrements the map entry identified by the given key by the value
 * <code>decr</code>. Valid only for numeric values.
 *
 * If a map entry with the given key does not exist, the map policy's write
 * mode determines whether a new entry will be created same as for the
 * {@link module:aerospike/maps.put|put} command. This operation may create a
 * new map if the map bin is currently empty.
 *
 * This operation returns the new value of the map entry.
 *
 * @param {string} bin - The name of the bin. If the bin exists, it must
 * contain a Map value; if it does not yet exist, a new Map may be created
 * depending on the map policy's write mode.
 * @param {any} key - The map key.
 * @param {number} decr - The value to decrement the map entry by.
 * @param {module:aerospike/maps~MapPolicy} [policy] - The map policy.
 * @returns {MapOperation} Operation that can be passed to the {@link Client#operate} command.
 */
export function decrement(bin: string, key: any, decr: number, policy?: MapPolicy): MapOperation;

/**
 * Removes all items in the map.
 * This operation does not return any result.
 *
 * @param {string} bin - The name of the bin. If the bin exists, it must
 * contain a Map value; if it does not yet exist, a new Map may be created
 * depending on the map policy's write mode.
 * @returns {MapOperation} Operation that can be passed to the {@link Client#operate} command.
 */
export function clear(bin: string): MapOperation;

/**
 * Removes a single item identified by key from the map.
 * This operation returns the removed data specified by <code>returnType</code>.
 *
 * @param {string} bin - The name of the bin, which must contain a Map value.
 * @param {any} key - The map key.
 * @param {number} [returnType] - The return type indicating what data of the
 * removed item(s) to return (if any); see {@link module:aerospike/maps.returnType} for possible values.
 * @returns {MapOperation} Operation that can be passed to the {@link Client#operate} command.
 */
export function removeByKey(bin: string, key: any, returnType?: returnType): MapOperation;

/**
 * Removes one or more items identified by key from the map.
 * This operation returns the removed data specified by <code>returnType</code>.
 *
 * @param {string} bin - The name of the bin, which must contain a Map value.
 * @param {Array<any>} keys - An array of map keys.
 * @param {number} [returnType] - The return type indicating what data of the
 * removed item(s) to return (if any); see {@link module:aerospike/maps.returnType} for possible values.
 * @returns {MapOperation} Operation that can be passed to the {@link Client#operate} command.
 */
export function removeByKeyList(bin: string, keys: any[], returnType?: returnType): MapOperation;

/**
 * Removes one or more items identified by a range of keys from the map.
 * This operation returns the removed data specified by <code>returnType</code>.
 *
 * @param {string} bin - The name of the bin, which must contain a Map value.
 * @param {?any} begin - Start key in the range (inclusive). If set to
 * <code>null</code>, the range includes all keys less than the
 * <code>end</code> key.
 * @param {?any} end - End key in the range (exclusive). If set to
 * <code>null</code>, the range includes all keys greater than or equal to the
 * <code>begin</code> key.
 * @param {number} [returnType] - The return type indicating what data of the
 * removed item(s) to return (if any); see {@link module:aerospike/maps.returnType} for possible values.
 * @returns {MapOperation} Operation that can be passed to the {@link Client#operate} command.
 */
export function removeByKeyRange(bin: string, begin?: any, end?: any, returnType?: returnType): MapOperation;

/**
 * Removes one or more items identified by a single value from the map.
 * This operation returns the removed data specified by <code>returnType</code>.
 *
 * @param {string} bin - The name of the bin, which must contain a Map value.
 * @param {any} value - The map value.
 * @param {number} [returnType] - The return type indicating what data of the
 * removed item(s) to return (if any); see {@link module:aerospike/maps.returnType} for possible values.
 * @returns {MapOperation} Operation that can be passed to the {@link Client#operate} command.
 */
export function removeByValue(bin: string, value: any, returnType?: returnType): MapOperation;

/**
 * Removes one or more items identified by a list of values from the map.
 * This operation returns the removed data specified by <code>returnType</code>.
 *
 * @param {string} bin - The name of the bin, which must contain a Map value.
 * @param {Array<any>} values - An array of map values.
 * @param {number} [returnType] - The return type indicating what data of the
 * removed item(s) to return (if any); see {@link module:aerospike/maps.returnType} for possible values.
 * @returns {MapOperation} Operation that can be passed to the {@link Client#operate} command.
 */
export function removeByValueList(bin: string, values: any[], returnType?: returnType): MapOperation;

/**
 * Removes one or more items identified by a range of values from the map.
 * This operation returns the removed data specified by <code>returnType</code>.
 *
 * @param {string} bin - The name of the bin, which must contain a Map value.
 * @param {?any} begin - Start values in the range (inclusive). If set to
 * <code>null</code>, the range includes all values less than the
 * <code>end</code> value.
 * @param {?any} end - End value in the range (exclusive). If set to
 * <code>null</code>, the range includes all values greater than or equal to the
 * <code>begin</code> value.
 * @param {number} [returnType] - The return type indicating what data of the
 * removed item(s) to return (if any); see {@link module:aerospike/maps.returnType} for possible values.
 * @returns {MapOperation} Operation that can be passed to the {@link Client#operate} command.
 */
export function removeByValueRange(bin: string, begin?: any, end?: any, returnType?: returnType): MapOperation;

/**
 * Removes a single item identified by it's index value from the map.
 * This operation returns the removed data specified by <code>returnType</code>.
 *
 * @param {string} bin - The name of the bin, which must contain a Map value.
 * @param {number} index - Index of the entry to remove.
 * @param {number} [returnType] - The return type indicating what data of the
 * removed item(s) to return (if any); see {@link module:aerospike/maps.returnType} for possible values.
 * @returns {MapOperation} Operation that can be passed to the {@link Client#operate} command.
 */
export function removeByIndex(bin: string, index: number, returnType?: returnType): MapOperation;

/**
 * Removes one or more items in the specified index range from the map.
 * This operation returns the removed data specified by <code>returnType</code>.
 *
 * @param {string} bin - The name of the bin, which must contain a Map value.
 * @param {number} index - Starting index.
 * @param {?number} count - Number of items to delete; if not specified, the
 * range includes all items starting from <code>index</code>.
 * @param {number} [returnType] - The return type indicating what data of the
 * removed item(s) to return (if any); see {@link module:aerospike/maps.returnType} for possible values.
 * @returns {MapOperation} Operation that can be passed to the {@link Client#operate} command.
 */
export function removeByIndexRange(bin: string, index: number, count?: number, returnType?: returnType): MapOperation;

/**
 * Removes a single item identified by it's rank value from the map.
 * This operation returns the removed data specified by <code>returnType</code>.
 *
 * @param {string} bin - The name of the bin, which must contain a Map value.
 * @param {number} rank - Rank of the entry to remove.
 * @param {number} [returnType] - The return type indicating what data of the
 * removed item(s) to return (if any); see {@link module:aerospike/maps.returnType} for possible values.
 * @returns {MapOperation} Operation that can be passed to the {@link Client#operate} command.
 */
export function removeByRank(bin: string, rank: number, returnType?: returnType): MapOperation;

/**
 * Removes one or more items in the specified rank range from the map.
 * This operation returns the removed data specified by <code>returnType</code>.
 *
 * @param {string} bin - The name of the bin, which must contain a Map value.
 * @param {number} index - Starting rank.
 * @param {?number} count - Number of items to delete; if not specified, the
 * range includes all items starting from <code>rank</code>.
 * @param {number} [returnType] - The return type indicating what data of the
 * removed item(s) to return (if any); see {@link module:aerospike/maps.returnType} for possible values.
 * @returns {MapOperation} Operation that can be passed to the {@link Client#operate} command.
 */
export function removeByRankRange(bin: string, rank: number, count?: number, returnType?: returnType): MapOperation

/**
 * Returns the size of the map.
 *
 * @param {string} bin - The name of the bin, which must contain a Map value.
 * @returns {MapOperation} Operation that can be passed to the {@link Client#operate} command.
 */
export function size(bin: string): MapOperation;

/**
 * Retrieves a single item identified by key from the map.
 * This operation returns the data specified by <code>returnType</code>.
 *
 * @param {string} bin - The name of the bin, which must contain a Map value.
 * @param {any} key - The map key.
 * @param {number} returnType - The return type indicating what data of the
 * removed item(s) to return (if any); see {@link module:aerospike/maps.returnType} for possible values.
 * @returns {MapOperation} Operation that can be passed to the {@link Client#operate} command.
 */
export function getByKey(bin: string, key: any, returnType?: returnType): MapOperation;

/**
 *
 * This operation returns the data specified by <code>returnType</code>.
 *
 * @param {string} bin - The name of the bin, which must contain a Map value.
 * @param {?any} begin - Start key in the range (inclusive). If set to
 * <code>null</code>, the range includes all keys less than the
 * <code>end</code> key.
 * @param {?any} end - End key in the range (exclusive). If set to
 * <code>null</code>, the range includes all keys greater than or equal to the
 * <code>begin</code> key.
 * @param {number} returnType - The return type indicating what data of the
 * removed item(s) to return (if any); see {@link module:aerospike/maps.returnType} for possible values.
 * @returns {MapOperation} Operation that can be passed to the {@link Client#operate} command.
 */
export function getByKeyRange(bin: string, begin?: any, end?: any, returnType?: returnType): MapOperation;

/**
 * Retrieves one or more items identified by a single value from the map.
 * This operation returns the data specified by <code>returnType</code>.
 *
 * @param {string} bin - The name of the bin, which must contain a Map value.
 * @param {any} value - The map value.
 * @param {number} returnType - The return type indicating what data of the
 * removed item(s) to return (if any); see {@link module:aerospike/maps.returnType} for possible values.
 * @returns {MapOperation} Operation that can be passed to the {@link Client#operate} command.
 */
export function getByValue(bin: string, value: any, returnType?: returnType): MapOperation;

/**
 * Retrieves one or more items identified by a range of values from the map.
 * This operation returns the data specified by <code>returnType</code>.
 *
 * @param {string} bin - The name of the bin, which must contain a Map value.
 * @param {?any} begin - Start values in the range (inclusive). If set to
 * <code>null</code>, the range includes all values less than the
 * <code>end</code> value.
 * @param {?any} end - End value in the range (exclusive). If set to
 * <code>null</code>, the range includes all values greater than or equal to the
 * <code>begin</code> value.
 * @param {number} returnType - The return type indicating what data of the
 * removed item(s) to return (if any); see {@link module:aerospike/maps.returnType} for possible values.
 * @returns {MapOperation} Operation that can be passed to the {@link Client#operate} command.
 */
export function getByValueRange(bin: string, begin?: any, end?: any, returnType?: returnType): MapOperation;

/**
 * Retrieves a single item identified by it's index value from the map.
 *
 * This operation returns the data specified by <code>returnType</code>.
 *
 * @param {string} bin - The name of the bin, which must contain a Map value.
 * @param {number} index - Index of the entry to remove.
 * @param {number} returnType - The return type indicating what data of the
 * removed item(s) to return (if any); see {@link module:aerospike/maps.returnType} for possible values.
 * @returns {MapOperation} Operation that can be passed to the {@link Client#operate} command.
 */
export function getByIndex(bin: string, index: number, returnType?: returnType): MapOperation;

/**
 * Retrieves one or more items in the specified index range from the map.
 * This operation returns the data specified by <code>returnType</code>.
 *
 * @param {string} bin - The name of the bin, which must contain a Map value.
 * @param {number} index - Starting index.
 * @param {?number} count - Number of items to delete; if not specified, the
 * range includes all items starting from <code>index</code>.
 * @param {number} returnType - The return type indicating what data of the
 * removed item(s) to return (if any); see {@link module:aerospike/maps.returnType} for possible values.
 * @returns {MapOperation} Operation that can be passed to the {@link Client#operate} command.
 */
export function getByIndexRange(bin: string, index: number, count?: number, returnType?: returnType): MapOperation;

/**
 * Retrieves a single item identified by it's rank value from the map.
 * This operation returns the data specified by <code>returnType</code>.
 *
 * @param {string} bin - The name of the bin, which must contain a Map value.
 * @param {number} rank - Rank of the entry to remove.
 * @param {number} returnType - The return type indicating what data of the
 * removed item(s) to return (if any); see {@link module:aerospike/maps.returnType} for possible values.
 * @returns {MapOperation} Operation that can be passed to the {@link Client#operate} command.
 */
export function getByRank(bin: string, rank: number, returnType?: returnType): MapOperation;

/**
 * Retrieves one or more items in the specified rank range from the map.
 * This operation returns the data specified by <code>returnType</code>.
 *
 * @param {string} bin - The name of the bin, which must contain a Map value.
 * @param {number} rank - Starting rank.
 * @param {?number} count - Number of items to delete; if not specified, the
 * range includes all items starting from <code>rank</code>.
 * @param {number} returnType - The return type indicating what data of the
 * removed item(s) to return (if any); see {@link module:aerospike/maps.returnType} for possible values.
 * @returns {MapOperation} Operation that can be passed to the {@link Client#operate} command.
 */
export function getByRankRange(bin: string, rank: number, count?: number, returnType?: returnType): MapOperation;

export function kvlistToMap(kvList: any[], MapConstructor: any): any;