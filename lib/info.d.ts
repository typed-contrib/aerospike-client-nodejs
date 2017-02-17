// *****************************************************************************
// Copyright 2013-2017 Aerospike, Inc.
//
// Licensed under the Apache License, Version 2.0 (the 'License')
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// *****************************************************************************
//
// Typings by SomaticIT <https://github.com/SomaticIT>
// Typings hosted on : https://github.com/typed-contrib/aerospike-client-nodejs

/**
 * @module aerospike/info
 * Utility methods for dealing with info data returned by Aerospike cluster nodes.
 *
 * @see {@link Client#info}
 *
 * @example
 *
 * const Aerospike = require('aerospike')
 * Aerospike.connect((error, client) => {
 *   if (error) throw error
 *
 *   var infoCb = function (error, infoStr) {
 *     if (error) {
 *       console.error('error retrieving info: %s', error.message)
 *     } else {
 *       var info = Aerospike.info.parseInfo(infoStr)
 *       console.log(info) // => { features:
 *                         //      [ 'cdt-list',
 *                         //        'pipelining',
 *                         //        'geo',
 *                         //        ...,
 *                         //        'udf' ] }
 *     }
 *   }
 *   client.info('features', infoCb, () => client.close())
 * })
 */

/**
 * Parses the info string returned from a cluster node into key-value pairs.
 *
 * @param {string} info - The info string returned by the cluster node.
 * @returns {Object} key-value pairs
 */
export function parseInfo(info: string): Object;