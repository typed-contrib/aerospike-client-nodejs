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
 * @module aerospike
 *
 * The Aerospike module is the main entry point for the Aerospike
 * Node.js Client API. It provides methods for creating new client instances
 * that connect to a specific Aerospike server cluster.
 *
 * # Data Model
 *
 * ## Record
 *
 * A record is how the data is represented and stored in the database. A record
 * is represented as an object. The keys of the object are the names of the fields
 * (bins) of a record. The values for each field can either be Number, String,
 * Array, Buffer or an Object itself. Aerospike supports integer, double,
 * string, bytes, array and map data types.
 *
 * Note: Array can contain an array or an object as a value in it. Similarly
 * the object can contain an array or an object as a value in it. Essentially
 * nesting of arrays in an object, and nesting of objects in an array is
 * allowed.
 *
 * Example of a record with 5 fields:
 *
 * ```js
 * var record = {
 *   int_bin: 123,
 *   str_bin: 'xyz',
 *   buff_bin: new Buffer('hello world!'),
 *   arr_bin: [1, 2, 3],
 *   obj_bin: {num: 123, str: 'abc', buff: new Buffer([0xa, 0xb, 0xc])}
 * }
 * ```
 *
 * ### Unsupported Data Types
 *
 * Aerospike does currently not support a boolean data type. To store boolean
 * values in the database the application needs to convert them to a supported
 * data type as the client does not do any automatica data type conversions.
 * Attempting to store a boolean value in a record bin will lead to a parameter
 * error being returned by the client.
 *
 * ## Metadata
 *
 * Some operations allow you to provide metadata with a record, including:
 *
 * - `gen` – (optional) The generation (version) of the record. Must be an Integer.
 * - `ttl` – (optional) The time-to-live in seconds (expiration) of the record.
 *   Must be an Integer. There are a few "special" TTL values which are defined
 *   under the {@link module:aerospike.ttl|ttl} property on the aerospike module.
 *
 * Example:
 *
 * ```js
 * var metadata = {
 *   gen: 1,
 *   ttl: 6000
 * }
 * ```
 *
 * @example
 *
 * const Aerospike = require('aerospike')
 * const Key = Aerospike.Key
 *
 * const config = {
 *   hosts: '192.168.0.1:3000',
 *   policies: {
 *     timeout: 50
 *   }
 * }
 *
 * Aerospike.connect(config, (error, client) => {
 *   if (error) throw error
 *   var key = new Key('test', 'demo', 'key1')
 *   client.get(key, (error, record, meta) => {
 *     if (error) {
 *       switch (error.code) {
 *         case Aerospike.status.AEROSPIKE_ERR_RECORD_NOT_FOUND:
 *           console.error('record ' + key.key + ' does not exist')
 *           break;
 *         default:
 *           throw error
 *       }
 *     } else {
 *       console.log(record, meta)
 *     }
 *     client.close()
 *   })
 * })
 */
import * as Config from "./config";

import * as C from "./client";
export import Client = C;

import * as AE from "./aerospike_error";
export import AerospikeError = AE;

import * as D from "./double";
export import Double = D;

import * as G from "./geojson";
export import GeoJSON = G;

import * as K from "./key";
export import Key = K;

import * as f from "./filter";
export import filter = f;

import * as i from "./info";
export import info = i;

import * as l from "./lists";
export import lists = l;

import * as m from "./maps";
export import maps = m;

import * as o from "./operations";
export import operations = o;

/** @deprecated backward compatibility. */
export const operator: Object;

export type ConfigOptions = Config.ConfigOptions;
export type Metadata = Client.Metadata;

/**
 * Creates a new {@link Client} instance.
 *
 * @param {ConfigOptions} config - The configuration for the client.
 */
export function client(config: ConfigOptions): Client;

/**
 * Creates a new {@link Client} instance and connects to the Aerospike cluster.
 *
 * @param {ConfigOptions} [config] - The configuration for the client.
 * @param {Client~ConnectCallback} callback - The funcation to call, once the client is connected to the cluster successfully.
 */
export function connect(config: ConfigOptions, callback: Client.ConnectCallback): Client;

/**
 * Creates a new {@link Key} instance.
 *
 * Provided for backward compatibility. Use the {@link Key} class
 * constructor instead.
 *
 * @param {string} ns - The Namespace to which the key belongs.
 * @param {string} set - The Set to which the key belongs.
 * @param {(string|number|Buffer)} value - The unique key value. Keys can be
 * strings, integers or an instance of the Buffer class.
 *
 * @deprecated in v2.0
 */
export function key(ns: string, set: string, value: string | number | Buffer): Key;

/** Enumeration of UDF types. */
export enum language {
    /** Lua (only supported UDF type at the moment) */
    LAU
}

/**
 * Enumeration of log levels.
 *
 * @example
 *
 * const Aerospike = require('aerospike')
 *
 * var config = {
 *   log: { level: Aerospike.log.INFO }
 * }
 * Aerospike.connect(config, (error, client) => {
 *   if (error) throw error
 *
 *   var key = new Aerospike.Key('test', 'demo', 'k1')
 *   client.get(key, (error, record) => {
 *     if (error) throw error
 *     console.info(record)
 *     client.close()
 *   })
 * })
 */
export enum log {
    OFF, INFO, ERROR, WARN, DEBUG, DETAIL
}

/**
 * Enumeration of policy values.
 *
 * @example
 *
 * const Aerospike = require('aerospike')
 *
 * // global policy, applied to all commands that do not override it
 * var config = {
 *   policies: {
 *     timeout: 100,
 *     retry: Aerospike.policy.retry.ONCE
 *   }
 * }
 *
 * Aerospike.connect(config, (error, client) => {
 *   if (error) throw error
 *
 *   var key = new Aerospike.Key('test', 'demo', 'k1')
 *   var record = {i: 1234}
 *
 *   // override policy for put command
 *   var policy = {
 *     exists: Aerospike.policy.exists.CREATE,
 *     key: Aerospike.policy.key.SEND
 *   }
 *
 *   client.put(key, record, {}, policy, (error) => {
 *     if (error && error.code === Aerospike.status.AEROSPIKE_ERR_RECORD_EXISTS) {
 *       console.info('record already exists')
 *     } else if (error) {
 *       throw error
 *     }
 *     client.close()
 *   })
 * })
 *
 */
export namespace policy {
    /**
     * Retry Policy - Specifies the behavior of failed
     * operations. **Important**: Single key read/write commands, the
     * batch read command and query/scan commands **do not follow** the retry
     * policy. Retry policy is deprecated in v2.4 and will be removed
     * in a future version.
     */
    export enum retry {
        /** Only attempt an operation once. */
        NONE,
        /** If an operation fails, attempt the operation one more time. */
        ONCE
    }

    /**
     * Generation Policy - Specifies the behavior of record modifications 
     * with regard to the generation value.
     */
    export enum gen {
        /** Write a record, regardless of generation. */
        IGNORE,
        /** Write a record, ONLY if generations are equal. */
        EQ,
        /** Write a record, ONLY if local generation is greater than remote generation. */
        GT
    }

    /**
     * Key Policy - Specifies the behavior for whether keys or digests should be sent to 
     * the cluster.
     */
    export enum key {
        /**
         * Send the digest value of the key. This is the recommended mode of operation.
         * This calculates the digest and sends the digest to the server. The digest is
         * only calculated on the client, and not the server.
         */
        DIGEST,
        /**
         * Send the key, in addition to the digest value. If you
         * want keys to be returned when scanning or querying, the keys must be
         * stored on the server. This policy causes a write operation to store the
         * key. Once the key is stored, the server will keep it - there is no need to
         * use this policy on subsequent updates of the record. If this policy is
         * used on read or delete operations, or on subsequent updates of a record
         * with a stored key, the key sent will be compared with the key stored on
         * the server. A mismatch will cause
         * <code>AEROSPIKE_ERR_RECORD_KEY_MISMATCH</code> to be returned.
         */
        SEND
    }

    /**
     * Existence Policy - Specifies the behavior for
     * writing the record depending whether or not it exists.
     */
    export enum exists {
        /** Write the record, regardless of existence. (I.e. create or update.) */
        IGNORE,
        /** Create a record, ONLY if it doesn't exist. */
        CREATE,
        /** Update a record, ONLY if it exists. */
        UPDATE,
        /** Completely replace a record, ONLY if it exists. */
        REPLACE,
        /** Completely replace a record if it exists, otherwise create it. */
        CREATE_OR_REPLACE
    }

    /** Specifies which partition replica to read from. */
    export enum replica {
        /** Read from the partition master replica node. */
        MASTER,
        /**
         * Distribute reads across nodes containing key's
         * master and replicated partition in round-robin fashion. Currently
         * restricted to master and one prole.
         */
        ANY
    }

    /**
     * Specifies the number of replicas to be consulted in a read operation 
     * to provide the desired consistency guarantee.
     */
    export enum consistencyLevel {
        /** Involve a single replica in the operation. */
        ONE,
        /** Involve all replicas in the operation. */
        ALL
    }

    /**
     * Specifies the number of replicas required to be successfully committed 
     * before returning success in a write operation to provide the desired consistency 
     * guarantee.
     */
    export enum commitLevel {
        /** Return success only after successfully committing all replicas. */
        ALL,
        /** Return success after successfully committing the master replica. */
        MASTER
    }
}

/**
 * Enumertion of special TTL (time-to-live) values.
 * 
 * Instead of specifying a TTL in seconds, you can set the TTL
 * to one of these special values when creating or updating a record.
 */
export enum ttl {
    /** Use the default TTL value for the namespace of the record. */
    NAMESPACE_DEFAULT,
    /** Never expire the record. */
    NEVER_EXPIRE,
    /** 
     * Update the record without changing the record's.
     * TTL value. Requires Aerospike Server version 3.10.1 or later.
     */
    DONT_UPDATE
}

/** Enumeration of predicate types. */
export enum predicate {
    EQUAL, RANGE
}

/**
 * Enumeration of job status codes.
 * @see {@link Job#infoCallback} returns the job status.
 */
export enum jobStatus {
    /** The job status is undefined. This is likely due to the status not being properly checked. */
    UNDEF,
    /** The job is currently running. */
    INPROGRESS,
    /** The job completed successfully. */
    COMPLETED
}
/**
 * Enumeration of priority levels for a scan operation.
 * @see {@link Scan#priority}
 */
export enum scanPriority {
    /** The cluster will auto adjust the scan priority. */
    AUTO,
    /** Low scan priority. */
    LOW,
    /** Medium scan priority. */
    MEDIUM,
    /** High scan priority. */
    HIGH
}

/** Enumeration of secondary index types. */
export enum indexType {
    /** Default secondary index type for bins containing scalar values (i.e. integer, string). */
    DEFAULT,
    /**
     * Secondary index for bins containing
     * <a href="http://www.aerospike.com/docs/guide/cdt-list.html" title="Aerospike List Data Type">&uArr;Lists</a>;
     * the index will be build over the individual entries of the list.
     */
    LIST,
    /**
     * Secondary index for bins containing
     * <a href="http://www.aerospike.com/docs/guide/cdt-map.html" title="Aerospike Maps Data Type">&uArr;Maps</a>;
     * the index will be build over the individual keys of the map entries.
     */
    MAPKEYS,
    /**
     * Secondary index for bins containing
     * <a href="http://www.aerospike.com/docs/guide/cdt-map.html" title="Aerospike Maps Data Type">&uArr;Maps</a>;
     * the index will be build over the individual values of the map entries.
     */
    MAPVALUES
}

/** Enumeration of secondary index data types. */
export enum indexDataType {
    /** Values contained in the secondary index are strings. */
    STRING,
    /** Values contained in the secondary index are integers. */
    NUMERIC,
    /** Values contained in the secondary index are GeoJSON values (points or polygons). */
    GEO2DSPHERE
}

/**
 * Enumeration of error status codes.
 * @see {@link AerospikeError#code}
 */
export enum status {
    /** Node invalid or could not be found. */
    AEROSPIKE_ERR_INVALID_NODE,
    /** Asynchronous connection error. */
    AEROSPIKE_ERR_NO_MORE_CONNECTIONS,
    /** Asynchronous connection error. */
    AEROSPIKE_ERR_ASYNC_CONNECTION,
    /** Query or scan was aborted in user's callback. */
    AEROSPIKE_ERR_CLIENT_ABORT,
    /** Host name could not be found in DNS lookup. */
    AEROSPIKE_ERR_INVALID_HOST,
    /** No more records available when parsing batch, scan or query records. */
    AEROSPIKE_NO_MORE_RECORDS,
    /** Invalid client API parameter. */
    AEROSPIKE_ERR_PARAM,
    /** Generic client API usage error. */
    AEROSPIKE_ERR_CLIENT,
    /** Generic client error (deprecated). */
    AEROSPIKE_ERR,
    /** Generic success. */
    AEROSPIKE_OK,
    /** Generic error returned by the server. */
    AEROSPIKE_ERR_SERVER,
    /** Record does not exist in database. May be returned by read, or write with policy <code>exists: Aerospike.policy.exists.UPDATE</code> */
    AEROSPIKE_ERR_RECORD_NOT_FOUND,
    /** Generation of record in database does not satisfy write policy. */
    AEROSPIKE_ERR_RECORD_GENERATION,
    /** Request protocol invalid, or invalid protocol field. */
    AEROSPIKE_ERR_REQUEST_INVALID,
    /** Record already exists. May be returned by write with policy <code>exists: Aerospike.policy.exists.CREATE</code>. */
    AEROSPIKE_ERR_RECORD_EXISTS,
    /** Bin already exists. */
    AEROSPIKE_ERR_BIN_EXISTS,
    /** A cluster state change occurred during the request. */
    AEROSPIKE_ERR_CLUSTER_CHANGE,
    /** The server node is running out of memory and/or storage device space reserved for the specified namespace. */
    AEROSPIKE_ERR_SERVER_FULL,
    /** Request timed out. Can be triggered by client or server. */
    AEROSPIKE_ERR_TIMEOUT,
    /** XDR not available for the cluster. */
    AEROSPIKE_ERR_NO_XDR,
    /** Generic cluster discovery & connection error. */
    AEROSPIKE_ERR_CLUSTER,
    /** Bin modification operation cannot be done on an existing bin due to its value type. */
    AEROSPIKE_ERR_BIN_INCOMPATIBLE_TYPE,
    /** Record being (re-)written cannot fit in a storage write block. */
    AEROSPIKE_ERR_RECORD_TOO_BIG,
    /** Too many concurrent requests for one record - a "hot key" situation. */
    AEROSPIKE_ERR_RECORD_BUSY,
    /** Scan aborted by user. */
    AEROSPIKE_ERR_SCAN_ABORTED,
    /** Sometimes our doc, or our customers' wishes, get ahead of us. We may have processed something that the server is not ready for (unsupported feature). */
    AEROSPIKE_ERR_UNSUPPORTED_FEATURE,
    /** Bin-level replace-only supported on server but not on client. */
    AEROSPIKE_ERR_BIN_NOT_FOUND,
    /** The server node's storage device(s) can't keep up with the write load. */
    AEROSPIKE_ERR_DEVICE_OVERLOAD,
    /** Record key sent with transaction did not match key stored on server. */
    AEROSPIKE_ERR_RECORD_KEY_MISMATCH,
    /** Namespace in request not found on server. */
    AEROSPIKE_ERR_NAMESPACE_NOT_FOUND,
    /** Sent too-long bin name or exceeded namespace's bin name quota. */
    AEROSPIKE_ERR_BIN_NAME,
    /** Operation not allowed at this time. */
    AEROSPIKE_ERR_FAIL_FORBIDDEN,
    /** There are no more records left for query. */
    AEROSPIKE_QUERY_END,
    /** Security functionality not supported by connected server. */
    AEROSPIKE_SECURITY_NOT_SUPPORTED,
    /** Security functionality not enabled by connected server. */
    AEROSPIKE_SECURITY_NOT_ENABLED,
    /** Security type not supported by connected server. */
    AEROSPIKE_SECURITY_SCHEME_NOT_SUPPORTED,
    /** Administration command is invalid. */
    AEROSPIKE_INVALID_COMMAND,
    /** Administration field is invalid. */
    AEROSPIKE_INVALID_FIELD,
    /** Security protocol not followed. */
    AEROSPIKE_ILLEGAL_STATE,
    /** User name is invalid. */
    AEROSPIKE_INVALID_USER,
    /** User was previously created. */
    AEROSPIKE_USER_ALREADY_EXISTS,
    /** Password is invalid. */
    AEROSPIKE_INVALID_PASSWORD,
    /** Password has expired. */
    AEROSPIKE_EXPIRED_PASSWORD,
    /** Forbidden password (e.g. recently used). */
    AEROSPIKE_FORBIDDEN_PASSWORD,
    /** Security credential is invalid. */
    AEROSPIKE_INVALID_CREDENTIAL,
    /** Role name is invalid. */
    AEROSPIKE_INVALID_ROLE,
    /** Role name already exists. */
    AEROSPIKE_ROLE_ALREADY_EXISTS,
    /** Privilege is invalid. */
    AEROSPIKE_INVALID_PRIVILEGE,
    /** User must be authenticated before performing database operations. */
    AEROSPIKE_NOT_AUTHENTICATED,
    /** User does not possess the required role to perform the database operation. */
    AEROSPIKE_ROLE_VIOLATION,
    /** Generic UDF error. */
    AEROSPIKE_ERR_UDF,
    /** The requested item in a large collection was not found. */
    AEROSPIKE_ERR_LARGE_ITEM_NOT_FOUND,
    /** Batch functionality has been disabled. */
    AEROSPIKE_ERR_BATCH_DISABLED,
    /** Batch max. requests have been exceeded. */
    AEROSPIKE_ERR_BATCH_MAX_REQUESTS_EXCEEDED,
    /** All batch queues are full. */
    AEROSPIKE_ERR_BATCH_QUEUES_FULL,
    /** Invalid/unsupported GeoJSON. */
    AEROSPIKE_ERR_GEO_INVALID_GEOJSON,
    /** Index found. */
    AEROSPIKE_ERR_INDEX_FOUND,
    /** Index not found. */
    AEROSPIKE_ERR_INDEX_NOT_FOUND,
    /** Index is out of memory. */
    AEROSPIKE_ERR_INDEX_OOM,
    /** Unable to read the index. */
    AEROSPIKE_ERR_INDEX_NOT_READABLE,
    /** Generic secondary index error. */
    AEROSPIKE_ERR_INDEX,
    /** Index name is too long. */
    AEROSPIKE_ERR_INDEX_NAME_MAXLEN,
    /** System alrady has maximum allowed indeces. */
    AEROSPIKE_ERR_INDEX_MAXCOUNT,
    /** Query was aborted. */
    AEROSPIKE_ERR_QUERY_ABORTED,
    /** Query processing queue is full. */
    AEROSPIKE_ERR_QUERY_QUEUE_FULL,
    /** Secondary index query timed out on server. */
    AEROSPIKE_ERR_QUERY_TIMEOUT,
    /** Generic query error. */
    AEROSPIKE_ERR_QUERY,
    /** UDF does not exist. */
    AEROSPIKE_ERR_UDF_NOT_FOUND,
    /** LUA file does not exist. */
    AEROSPIKE_ERR_LUA_FILE_NOT_FOUND,
    /** Internal LDT error. */
    AEROSPIKE_ERR_LDT_INTERNAL,
    /** LDT item not found. */
    AEROSPIKE_ERR_LDT_NOT_FOUND,
    /** Unique key violation: Duplicated item inserted when 'unique key' was set. */
    AEROSPIKE_ERR_LDT_UNIQUE_KEY,
    /** General error during insert operation. */
    AEROSPIKE_ERR_LDT_INSERT,
    /** General error during search operation. */
    AEROSPIKE_ERR_LDT_SEARCH,
    /** General error during delete operation. */
    AEROSPIKE_ERR_LDT_DELETE,
    /** General input parameter error. */
    AEROSPIKE_ERR_LDT_INPUT_PARM,
    /** LDT type mismatch for this bin. */
    AEROSPIKE_ERR_LDT_TYPE_MISMATCH,
    /** The supplied LDT bin name is null. */
    AEROSPIKE_ERR_LDT_NULL_BIN_NAME,
    /** The supplied LDT bin name must be a string. */
    AEROSPIKE_ERR_LDT_BIN_NAME_NOT_STRING,
    /** The supplied LDT bin name exceeded the 14 char limit. */
    AEROSPIKE_ERR_LDT_BIN_NAME_TOO_LONG,
    /** Internal Error: too many open records at one time. */
    AEROSPIKE_ERR_LDT_TOO_MANY_OPEN_SUBRECS,
    /** Internal Error: Top Record not found. */
    AEROSPIKE_ERR_LDT_TOP_REC_NOT_FOUND,
    /** Internal Error: Sub Record not found. */
    AEROSPIKE_ERR_LDT_SUB_REC_NOT_FOUND,
    /** LDT Bin does not exist. */
    AEROSPIKE_ERR_LDT_BIN_DOES_NOT_EXIST,
    /** Collision: LDT Bin already exists. */
    AEROSPIKE_ERR_LDT_BIN_ALREADY_EXISTS,
    /** LDT control structures in the Top Record are damanged. Cannot proceed. */
    AEROSPIKE_ERR_LDT_BIN_DAMAGED,
    /** Internal Error: LDT Subrecord pool is damanged. */
    AEROSPIKE_ERR_LDT_SUBREC_POOL_DAMAGED,
    /** LDT control structure in the Sub Record are damaged. Cannot proceed. */
    AEROSPIKE_ERR_LDT_SUBREC_DAMAGED,
    /** Error encountered while opening a Sub Record. */
    AEROSPIKE_ERR_LDT_SUBREC_OPEN,
    /** Error encountered while updating a Sub Record. */
    AEROSPIKE_ERR_LDT_SUBREC_UPDATE,
    /** Error encountered while creating a Sub Record. */
    AEROSPIKE_ERR_LDT_SUBREC_CREATE,
    /** Error encountered while deleting a Sub Record. */
    AEROSPIKE_ERR_LDT_SUBREC_DELETE,
    /** Error encountered while closing a Sub Record. */
    AEROSPIKE_ERR_LDT_SUBREC_CLOSE,
    /** Error encountered while updating a TOP Record. */
    AEROSPIKE_ERR_LDT_TOPREC_UPDATE,
    /** Error encountered while creating a TOP Record. */
    AEROSPIKE_ERR_LDT_TOPREC_CREATE,
    /** The filter function name was invalid. */
    AEROSPIKE_ERR_LDT_FILTER_FUNCTION_BAD,
    /** The filter function was not found. */
    AEROSPIKE_ERR_LDT_FILTER_FUNCTION_NOT_FOUND,
    /** The function to extract the Unique Value from a complex object was invalid. */
    AEROSPIKE_ERR_LDT_KEY_FUNCTION_BAD,
    /** The function to extract the Unique Value from a complex object was not found. */
    AEROSPIKE_ERR_LDT_KEY_FUNCTION_NOT_FOUND,
    /** The function to transform an object into a binary form was invalid. */
    AEROSPIKE_ERR_LDT_TRANS_FUNCTION_BAD,
    /** The function to transform an object into a binary form was not found. */
    AEROSPIKE_ERR_LDT_TRANS_FUNCTION_NOT_FOUND,
    /** The function to untransform an object from binary form to live form was invalid. */
    AEROSPIKE_ERR_LDT_UNTRANS_FUNCTION_BAD,
    /** The function to untransform an object from binary form to live form was not found. */
    AEROSPIKE_ERR_LDT_UNTRANS_FUNCTION_NOT_FOUND,
    /** The UDF user module name for LDT Overrides was invalid. */
    AEROSPIKE_ERR_LDT_USER_MODULE_BAD,
    /** The UDF user module name for LDT Overrides was not found. */
    AEROSPIKE_ERR_LDT_USER_MODULE_NOT_FOUND
}