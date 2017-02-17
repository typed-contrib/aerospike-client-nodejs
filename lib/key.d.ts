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
 * @class Key
 *
 * @summary A key uniquely identifies a record in the Aerospike database within a given namespace.
 *
 * @description
 *
 * ###### Key Digests
 * In your application, you must specify the namespace, set and the key itself
 * to read and write records. When a key is sent to the database, the key value
 * and its set are hashed into a 160-bit digest. When a database operation
 * returns a key (e.g. Query or Scan operations) it might contain either the
 * set and key value, or just the digest.
 *
 * @param {string} ns - The Namespace to which the key belongs.
 * @param {string} set - The Set to which the key belongs.
 * @param {(string|number|Buffer)} key - The unique key value. Keys can be
 * strings, integers or an instance of the Buffer class.
 *
 * @example <caption>Creating a new {@link Key} instance</caption>
 *
 * const Aerospike = require('aerospike')
 * const Key = Aerospike.Key
 *
 * var key1 = new Key('test', 'demo', 12345)
 * var key2 = new Key('test', 'demo', 'abcde')
 * var key3 = new Key('test', 'demo', Buffer.from([0x62,0x75,0x66,0x66,0x65,0x72]))
 */
declare class Key {
    public ns: string;
    public set: string;
    public key: string | number | Buffer;
    /** The 160-bit digest used by the Aerospike server to uniquely identify a record within a namespace. */
    public digest?: Buffer;

    /**
     * Key constructor
     * 
     * @param {string} ns - The Namespace to which the key belongs.
     * @param {string} set - The Set to which the key belongs.
     * @param {(string|number|Buffer)} key - The unique key value. Keys can be
     *                                       strings, integers or an instance of the Buffer class.
     */
    constructor(ns: string, set: string, key: Key.KeyTypes, digest?: Buffer);
}

declare namespace Key {
    export type KeyTypes = string | number | Buffer;
}

export = Key