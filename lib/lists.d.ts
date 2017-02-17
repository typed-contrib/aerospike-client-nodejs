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

/**
 * @module aerospike/lists
 *
 * @description This module defines operations on the List data type. Create
 * list operations used by the {@link Client#operate} command.
 *
 * For more information, please refer to the
 * <a href="http://www.aerospike.com/docs/guide/cdt-list.html">&uArr;Lists</a>
 * documentation in the Aerospike Feature Guide.
 *
 * #### List Index
 *
 * List operations support negative indexing.  If the index is negative, the
 * resolved index starts backwards from end of list.
 *
 * Index/Range examples:
 *
 *  - Index 0: First item in list.
 *  - Index 4: Fifth item in list.
 *  - Index -1: Last item in list.
 *  - Index -3: Third to last item in list.
 *  - Index 1 Count 2: Second and third items in list.
 *  - Index -3 Count 3: Last three items in list.
 *  - Index -5 Count 4: Range between fifth to last item to second to last item inclusive.
 *
 * If an index is out of bounds, a parameter error will be returned. If a range
 * is partially out of bounds, the valid part of the range will be returned.
 *
 * @see {@link Client#operate}
 */

import { Operation } from "./operations";

export interface ListOperation extends Operation {
    op: number;
    bin: string;

    value?: any;
    list?: any[];
    index?: number;
    count?: number;
}

/**
 * Appends an element to the end of a list.
 *
 * @param {string} bin - The name of the bin. The bin must contain a List value.
 * @param {any} value - The value to be appended.
 * @returns {ListOperation} Operation that can be passed to the {@link Client#operate} command.
 *
 * @example
 *
 * const Aerospike = require('aerospike')
 * const op = Aerospike.operator
 * const lists = Aerospike.lists
 * const key = new Aerospike.Key('test', 'demo', 'mykey1')
 *
 * var ops = [
 *   lists.append('tags', 'orange'),
 *   op.read('tags')
 * ]
 *
 * Aerospike.client().connect((error, client) => {
 *   if (error) throw error
 *   client.put(key, { tags: ['blue', 'yellow', 'pink'] }, (error) => {
 *     if (error) throw error
 *     client.operate(key, ops, (error, result) => {
 *       if (error) throw error
 *       console.log(result.tags) // => [ 'blue', 'yellow', 'pink', 'orange' ]
 *       client.close()
 *     })
 *   })
 * })
 */
export function append(bin: string, value: any): ListOperation;

/**
 * Appends a list of elements to the end of a list.
 *
 * @param {string} bin - The name of the bin. The bin must contain a List value.
 * @param {Array<any>} list - Array of elements to be appended.
 * @returns {Object} Operation that can be passed to the {@link Client#operate} command.
 *
 * @example
 *
 * const Aerospike = require('aerospike')
 * const op = Aerospike.operator
 * const lists = Aerospike.lists
 * const key = new Aerospike.Key('test', 'demo', 'mykey1')
 *
 * var ops = [
 *   lists.appendItems('tags', ['orange', 'green']),
 *   op.read('tags')
 * ]
 *
 * Aerospike.client().connect((error, client) => {
 *   if (error) throw error
 *   client.put(key, { tags: ['blue', 'yellow', 'pink'] }, (error) => {
 *     if (error) throw error
 *     client.operate(key, ops, (error, result) => {
 *       if (error) throw error
 *       console.log(result.tags) // => [ 'blue', 'yellow', 'pink', 'orange', 'green' ]
 *       client.close()
 *     })
 *   })
 * })
 */
export function appendItems(bin: string, list: any[]): ListOperation;

/**
 * Inserts an element at the specified index.
 *
 * @param {string} bin - The name of the bin. The bin must contain a List value.
 * @param {number} index - List index at which the new element should be inserted.
 * @param {any} value - The value to be appended.
 * @returns {Object} Operation that can be passed to the {@link Client#operate} command.
 *
 * @example
 *
 * const Aerospike = require('aerospike')
 * const op = Aerospike.operator
 * const lists = Aerospike.lists
 * const key = new Aerospike.Key('test', 'demo', 'mykey1')
 *
 * var ops = [
 *   lists.insert('tags', 2, 'orange'),
 *   op.read('tags')
 * ]
 *
 * Aerospike.client().connect((error, client) => {
 *   if (error) throw error
 *   client.put(key, { tags: ['blue', 'yellow', 'pink'] }, (error) => {
 *     if (error) throw error
 *     client.operate(key, ops, (error, result) => {
 *       if (error) throw error
 *       console.log(result.tags) // => [ 'blue', 'yellow', 'orange', 'pink' ]
 *       client.close()
 *     })
 *   })
 * })
 */
export function insert(bin: string, index: number, value: any): ListOperation;

/**
 * Inserts a list of element at the specified index.
 *
 * @param {string} bin - The name of the bin. The bin must contain a List value.
 * @param {number} index - List index at which the new element should be inserted.
 * @param {Array<any>} list - Array of elements to be appended.
 * @returns {Object} Operation that can be passed to the {@link Client#operate} command.
 *
 * @example
 *
 * const Aerospike = require('aerospike')
 * const op = Aerospike.operator
 * const lists = Aerospike.lists
 * const key = new Aerospike.Key('test', 'demo', 'mykey1')
 *
 * var ops = [
 *   lists.insertItems('tags', 2, ['orange', 'green']),
 *   op.read('tags')
 * ]
 *
 * Aerospike.client().connect((error, client) => {
 *   if (error) throw error
 *   client.put(key, { tags: ['blue', 'yellow', 'pink'] }, (error) => {
 *     if (error) throw error
 *     client.operate(key, ops, (error, result) => {
 *       if (error) throw error
 *       console.log(result.tags) // => [ 'blue', 'yellow', 'orange', 'green', 'pink' ]
 *       client.close()
 *     })
 *   })
 * })
 */
export function insertItems(bin: string, index: number, list: any[]): ListOperation;

/**
 * Removes and returns the list element at the specified index.
 *
 * @param {string} bin - The name of the bin. The bin must contain a List value.
 * @param {number} index - List index of the element to be removed.
 * @returns {Object} Operation that can be passed to the {@link Client#operate} command.
 *
 * @example
 *
 * const Aerospike = require('aerospike')
 * const op = Aerospike.operator
 * const key = new Aerospike.Key('test', 'demo', 'mykey1')
 *
 * var ops = [
 *   lists.pop('tags', 1)
 * ]
 *
 * Aerospike.client().connect((error, client) => {
 *   if (error) throw error
 *   client.put(key, { tags: ['blue', 'yellow', 'pink'] }, (error) => {
 *     if (error) throw error
 *     client.operate(key, ops, (error, result) => {
 *       if (error) throw error
 *       console.log(result.tags) // => [ 'yellow' ]
 *       client.get(key, (error, record) => {
 *         if (error) throw error
 *         console.log(record) // => { tags: [ 'blue', 'pink' ] }
 *         client.close()
 *       })
 *     })
 *   })
 * })
 */
export function pop(bin: string, index: number): ListOperation;

/**
 * Removes and returns the list elements at the specified range.
 *
 * @param {string} bin - The name of the bin. The bin must contain a List value.
 * @param {number} index - Index of the first element in the range.
 * @param {number} [count] - Number of elements in the range; if not specified, the range extends to the end of the list.
 * @returns {Object} Operation that can be passed to the {@link Client#operate} command.
 *
 * @example
 *
 * const Aerospike = require('aerospike')
 * const lists = Aerospike.lists
 * const key = new Aerospike.Key('test', 'demo', 'mykey1')
 *
 * var ops = [
 *   lists.popRange('tags', 0, 2)
 * ]
 *
 * Aerospike.client().connect((error, client) => {
 *   if (error) throw error
 *   client.put(key, { tags: ['blue', 'yellow', 'pink'] }, (error) => {
 *     if (error) throw error
 *     client.operate(key, ops, (error, result) => {
 *       if (error) throw error
 *       console.log(result.tags) // => [ 'blue', 'yellow' ]
 *       client.get(key, (error, record) => {
 *         if (error) throw error
 *         console.log(record) // => { tags: [ 'pink' ] }
 *         client.close()
 *       })
 *     })
 *   })
 * })
 */
export function popRange(bin: string, index: number, count?: number): ListOperation;

/**
 * Removes the list element at the specified index.
 *
 * @param {string} bin - The name of the bin. The bin must contain a List value.
 * @param {number} index - Index of the element to be removed
 * @returns {Object} Operation that can be passed to the {@link Client#operate} command.
 *
 * @example
 *
 * const Aerospike = require('aerospike')
 * const lists = Aerospike.lists
 * const key = new Aerospike.Key('test', 'demo', 'mykey1')
 *
 * var ops = [
 *   lists.remove('tags', 1)
 * ]
 *
 * Aerospike.client().connect((error, client) => {
 *   if (error) throw error
 *   client.put(key, { tags: ['blue', 'yellow', 'pink'] }, (error) => {
 *     if (error) throw error
 *     client.operate(key, ops, (error) => {
 *       if (error) throw error
 *       client.get(key, (error, record) => {
 *         if (error) throw error
 *         console.log(record) // => { tags: [ 'blue', 'pink' ] }
 *         client.close()
 *       })
 *     })
 *   })
 * })
 */
export function remove(bin: string, index: number): ListOperation;

/**
 * Removes the list elements at the specified range.
 *
 * @param {string} bin - The name of the bin. The bin must contain a List value.
 * @param {number} index - Index of the first element in the range.
 * @param {number} [count] - Number of elements in the range; if not specified, the range extends to the end of the list.
 * @returns {Object} Operation that can be passed to the {@link Client#operate} command.
 *
 * @example
 *
 * const Aerospike = require('aerospike')
 * const lists = Aerospike.lists
 * const key = new Aerospike.Key('test', 'demo', 'mykey1')
 *
 * var ops = [
 *   lists.removeRange('tags', 0, 2)
 * ]
 *
 * Aerospike.client().connect((error, client) => {
 *   if (error) throw error
 *   client.put(key, { tags: ['blue', 'yellow', 'pink'] }, (error) => {
 *     if (error) throw error
 *     client.operate(key, ops, (error) => {
 *       if (error) throw error
 *       client.get(key, (error, record) => {
 *         if (error) throw error
 *         console.log(record) // => { tags: [ 'pink' ] }
 *         client.close()
 *       })
 *     })
 *   })
 * })
 */
export function removeRange(bin: string, index: number, count?: number): ListOperation;

/**
 * Removes all the elements from the list.
 *
 * @param {string} bin - The name of the bin. The bin must contain a List value.
 * @returns {Object} Operation that can be passed to the {@link Client#operate} command.
 *
 * @example
 *
 * const Aerospike = require('aerospike')
 * const lists = Aerospike.lists
 * const key = new Aerospike.Key('test', 'demo', 'mykey1')
 *
 * var ops = [
 *   lists.clear('tags')
 * ]
 *
 * Aerospike.client().connect((error, client) => {
 *   if (error) throw error
 *   client.put(key, { tags: ['blue', 'yellow', 'pink'] }, (error) => {
 *     if (error) throw error
 *     client.operate(key, ops, (error) => {
 *       if (error) throw error
 *       client.get(key, (error, record) => {
 *         if (error) throw error
 *         console.log(record) // => { tags: [ ] }
 *         client.close()
 *       })
 *     })
 *   })
 * })
 */
export function clear(bin: string): ListOperation;

/**
 * Sets the list element at the specified index to a new value.
 *
 * @param {string} bin - The name of the bin. The bin must contain a List value.
 * @param {number} index - Index of the element to be replaced.
 * @param {any} value - The new value to assigned to the list element.
 * @returns {Object} Operation that can be passed to the {@link Client#operate} command.
 *
 * @example
 *
 * const Aerospike = require('aerospike')
 * const lists = Aerospike.lists
 * const key = new Aerospike.Key('test', 'demo', 'mykey1')
 *
 * var ops = [
 *   lists.set('tags', 1, 'green')
 * ]
 *
 * Aerospike.client().connect((error, client) => {
 *   if (error) throw error
 *   client.put(key, { tags: ['blue', 'yellow', 'pink'] }, (error) => {
 *     if (error) throw error
 *     client.operate(key, ops, (error) => {
 *       if (error) throw error
 *       client.get(key, (error, record) => {
 *         if (error) throw error
 *         console.log(record) // => { tags: [ 'blue', 'green', 'pink' ] }
 *         client.close()
 *       })
 *     })
 *   })
 * })
 */
export function set(bin: string, index: number, value: any): ListOperation;

/**
 * Removes all list elements **not** within the specified range.
 *
 * @param {string} bin - The name of the bin. The bin must contain a List value.
 * @param {number} index - Index of the first element in the range.
 * @param {number} [count] - Number of elements in the range; if not specified, the range extends to the end of the list.
 * @returns {Object} Operation that can be passed to the {@link Client#operate} command.
 *
 * @example
 *
 * const Aerospike = require('aerospike')
 * const lists = Aerospike.lists
 * const key = new Aerospike.Key('test', 'demo', 'mykey1')
 *
 * var ops = [
 *   lists.trim('tags', 1, 1)
 * ]
 *
 * Aerospike.client().connect((error, client) => {
 *   if (error) throw error
 *   client.put(key, { tags: ['blue', 'yellow', 'pink'] }, (error) => {
 *     if (error) throw error
 *     client.operate(key, ops, (error) => {
 *       if (error) throw error
 *       client.get(key, (error, record) => {
 *         if (error) throw error
 *         console.log(record) // => { tags: [ 'yellow' ] }
 *         client.close()
 *       })
 *     })
 *   })
 * })
 */
export function trim(bin: string, index: number, count?: number): ListOperation;

/**
 * Returns the list element at the specified index.
 *
 * @param {string} bin - The name of the bin. The bin must contain a List value.
 * @param {number} index - Index of the element to be returned.
 * @returns {Object} Operation that can be passed to the {@link Client#operate} command.
 *
 * @example
 *
 * const Aerospike = require('aerospike')
 * const lists = Aerospike.lists
 * const key = new Aerospike.Key('test', 'demo', 'mykey1')
 *
 * var ops = [
 *   lists.get('tags', 0)
 * ]
 *
 * Aerospike.client().connect((error, client) => {
 *   if (error) throw error
 *   client.put(key, { tags: ['blue', 'yellow', 'pink'] }, (error) => {
 *     if (error) throw error
 *     client.operate(key, ops, (error) => {
 *       if (error) throw error
 *       client.get(key, (error, record) => {
 *         if (error) throw error
 *         console.log(record) // => { tags: 'blue' }
 *         client.close()
 *       })
 *     })
 *   })
 * })
 */
export function get(bin: string, index: number): ListOperation;

/**
 * Returns the list element at the specified range.
 *
 * @param {string} bin - The name of the bin. The bin must contain a List value.
 * @param {number} index - Index of the first element in the range.
 * @param {number} [count] - Number of elements in the range; if not specified, the range extends to the end of the list.
 * @returns {Object} Operation that can be passed to the {@link Client#operate} command.
 *
 * @example
 *
 * const Aerospike = require('aerospike')
 * const lists = Aerospike.lists
 * const key = new Aerospike.Key('test', 'demo', 'mykey1')
 *
 * var ops = [
 *   lists.getRange('tags', 1)
 * ]
 *
 * Aerospike.client().connect((error, client) => {
 *   if (error) throw error
 *   client.put(key, { tags: ['blue', 'yellow', 'pink'] }, (error) => {
 *     if (error) throw error
 *     client.operate(key, ops, (error) => {
 *       if (error) throw error
 *       client.get(key, (error, record) => {
 *         if (error) throw error
 *         console.log(record) // => { tags: [ 'yellow', 'pink' ] }
 *         client.close()
 *       })
 *     })
 *   })
 * })
 */
export function getRange(bin: string, index: number, count?: number): ListOperation;

/**
 * Returns the element count of the list
 *
 * @param {string} bin - The name of the bin. The bin must contain a List value.
 * @returns {Object} Operation that can be passed to the {@link Client#operate} command.
 *
 * @example
 *
 * const Aerospike = require('aerospike')
 * const lists = Aerospike.lists
 * const key = new Aerospike.Key('test', 'demo', 'mykey1')
 *
 * var ops = [
 *   lists.size('tags')
 * ]
 *
 * Aerospike.client().connect((error, client) => {
 *   if (error) throw error
 *   client.put(key, { tags: ['blue', 'yellow', 'pink'] }, (error) => {
 *     if (error) throw error
 *     client.operate(key, ops, (error) => {
 *       if (error) throw error
 *       console.log(record) // => { tags: 3 }
 *       client.close()
 *     })
 *   })
 * })
 */
export function size(bin: string): ListOperation;