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
 * @class Config
 * @classdesc Configuration for an Aerospike client instance.
 *
 * @example
 *
 * const Aerospike = require('aerospike')
 * const config = {
 *   user: process.env.DATABASE_USER,
 *   password: process.env.DATABASE_PASSWORD,
 *   hosts: '192.168.1.42:3000',
 *   log: {
 *     level: Aerospike.log.INFO,
 *     file: 2 // log to stderr
 *   }
 * }
 * Aerospike.connect(config, function (error, client) {
 *   if (error) {
 *     console.error('Failed to connect to cluster: %s', error.message)
 *     process.exit()
 *   }
 *   // client is ready to accept commands
 *   client.close()
 * })
 */
declare class Config {
    constructor(config: Config.ConfigOptions);

    /**
     * The user name to use when authenticating to the cluster.
     * Leave empty for clusters running without access management.
     * (Security features are available in the Aerospike Database Enterprise
     * Edition.)
     */
    public user?: string;

    /**
     * The password to use when authenticating to the cluster.
     */
    public password?: string;

    /**
     * Expected Cluster Name.
     * If not <code>null</code>, server nodes must return this
     * cluster name in order to join the client's view of the cluster. Should
     * only be set when connecting to servers that support the "cluster-name"
     * info command.
     */
    public clusterName: string;

    /**
     * List of hosts with which the client should attempt to connect.
     * If not specified, the client attempts to read the host list
     * from the <code>AEROSPIKE_HOSTS</code> environment variable or else falls
     * back to use a default value of "localhost".
     * @type {(Object[] | string)}
     *
     * @example <caption>Setting <code>hosts</code> using a String</caption>
     *
     * const Aerospike = require('aerospike')
     *
     * var hosts = '192.168.0.1:3000,192.168.0.2:3000'
     * Aerospike.connect({hosts: hosts}, (err, client) => {
     *   if (err) throw err
     *   // ...
     *   client.close()
     * })
     *
     * @example <caption>Setting <code>hosts</code> using an array of hostname/port tuples</caption>
     *
     * const Aerospike = require('aerospike')
     *
     * var hosts = [
     *   { addr: '192.168.0.1', port: 3000 },
     *   { addr: '192.168.0.2', port: 3000 }
     * ]
     * Aerospike.connect({hosts: hosts}, (err, client) => {
     *   if (err) throw err
     *   // ...
     *   client.close()
     * })
     */
    public hosts?: string | Config.HostConfig[];

    /**
     * Default port to use for any host address, that does not
     * explicitly specify a port number. Default is 3000.
     */
    public port?: number;

    /**
     * @summaries Global client policies.
     * @description A policy is a set of values which modify the behavior of an
     * operation, like timeouts or how an operation handles data. The policies
     * defined in the configuration are used as global defaults, which can be
     * overridden by individual operations as needed.
     *
     * @example <caption>Setting a default timeout value</caption>
     *
     * const Aerospike = require('aerospike')
     *
     * var config = {
     *   policies: {
     *     timeout: 100
     *   }
     * }
     * Aerospike.connect(config, (err, client) => {
     *   if (err) throw err
     *   var key = new Aerospike.Key('test', 'demo', 123)
     *
     *   // use default timeout policy
     *   client.put(key, {x: 42}, (err) => {
     *     if (err) throw err
     *
     *     // override global timeout policy
     *     client.get(key, { timeout: 200 }, (err, record) => {
     *       if (err) throw err
     *       console.log(record)
     *       client.close()
     *     })
     *   })
     * })
     */
    public policies?: Config.PoliciesConfig;

    /**
     * Configuration for logging done by the client.
     * 
     * @example <caption>Enabling debug logging to a separate log file</caption>
     *
     * const Aerospike = require('aerospike')
     * const fs = require('fs')
     *
     * var debuglog = fs.openSync('./debug.log')
     * var config = {
     *   log: {
     *     level: Aerospike.log.DEBUG,
     *     file: debuglog
     *   }
     * }
     * Aerospike.connect(config, (err, client) => {
     *   if (err) throw err
     *   // ...
     *   client.close()
     * })
     */
    public log?: Config.LogConfig;

    /**
     * Initial host connection timeout in milliseconds.
     * The client observes this timeout when opening a connection to
     * the cluster for the first time. Default is 1,000 milliseconds.
     */
    public connTimeoutMs?: number;

    /**
     * Polling interval in milliseconds for cluster tender. Default is
     * 1,000 milliseconds.
     */
    public tenderInterval?: number;

    /**
     * Maximum number of asynchronous connections allowed for each node.
     * New transactions will be rejected with an
     * <code>AEROSPIKE_ERR_NO_MORE_CONNECTIONS</code> error if the limit would be
     * exceeded. Default is 300.
     */
    public maxConnsPerNode?: number;

    /** Configuration values for the mod-lua system and user paths. */
    public modlua?: Config.ModLuaConfig;

    /**
     * This allows multiple client instances running in separate
     * processes on the same machine to share cluster status, including nodes and
     * data partion maps.
     * 
     * @example <caption>Using shared memory in a clustered setup</caption>
     *
     * const Aerospike = require('aerospike')
     * const cluster = require('cluster')
     *
     * const config = {
     *   sharedMemory: {
     *     key: 0xa5000000
     *   }
     * }
     * const client = Aerospike.client(config)
     * const noWorkers = 4
     *
     * if (cluster.isMaster) {
     *   // spawn new worker processes
     *   for (var i = 0; i < noWorkers; i++) {
     *     cluster.fork()
     *   }
     * } else {
     *   // connect to Aerospike cluster in each worker process
     *   client.connect((err) => { if (err) throw err })
     *
     *   // handle incoming HTTP requests, etc.
     *   // http.createServer((request, response) => { ... })
     *
     *   // close DB connection on shutdown
     *   client.close()
     * }
     */
    public sharedMemory?: Config.SharedMemoryConfig;
}

declare namespace Config {

    export interface ConfigOptions {
        /**
         * The user name to use when authenticating to the cluster.
         * Leave empty for clusters running without access management.
         * (Security features are available in the Aerospike Database Enterprise
         * Edition.)
         */
        user?: string;
        /** The password to use when authenticating to the cluster. */
        password?: string;

        /**
         * @summary Expected Cluster Name.
         * @description If not <code>null</code>, server nodes must return this
         * cluster name in order to join the client's view of the cluster. Should
         * only be set when connecting to servers that support the "cluster-name"
         * info command.
         */
        clusterName?: string;
        /**
         * List of hosts with which the client should attempt to connect.
         * If not specified, the client attempts to read the host list
         * from the <code>AEROSPIKE_HOSTS</code> environment variable or else falls
         * back to use a default value of "localhost".
         * @type {(Object[] | string)}
         *
         * @example <caption>Setting <code>hosts</code> using a String</caption>
         *
         * const Aerospike = require('aerospike')
         *
         * var hosts = '192.168.0.1:3000,192.168.0.2:3000'
         * Aerospike.connect({hosts: hosts}, (err, client) => {
         *   if (err) throw err
         *   // ...
         *   client.close()
         * })
         *
         * @example <caption>Setting <code>hosts</code> using an array of hostname/port tuples</caption>
         *
         * const Aerospike = require('aerospike')
         *
         * var hosts = [
         *   { addr: '192.168.0.1', port: 3000 },
         *   { addr: '192.168.0.2', port: 3000 }
         * ]
         * Aerospike.connect({hosts: hosts}, (err, client) => {
         *   if (err) throw err
         *   // ...
         *   client.close()
         * })
         */
        hosts?: string | HostConfig[];

        /**
         * Default port to use for any host address, that does not
         * explicitly specify a port number. Default is 3000.
         */
        port?: number;

        /**
         * A policy is a set of values which modify the behavior of an
         * operation, like timeouts or how an operation handles data. The policies
         * defined in the configuration are used as global defaults, which can be
         * overridden by individual operations as needed.
         *
         * @example <caption>Setting a default timeout value</caption>
         *
         * const Aerospike = require('aerospike')
         *
         * var config = {
         *   policies: {
         *     timeout: 100
         *   }
         * }
         * Aerospike.connect(config, (err, client) => {
         *   if (err) throw err
         *   var key = new Aerospike.Key('test', 'demo', 123)
         *
         *   // use default timeout policy
         *   client.put(key, {x: 42}, (err) => {
         *     if (err) throw err
         *
         *     // override global timeout policy
         *     client.get(key, { timeout: 200 }, (err, record) => {
         *       if (err) throw err
         *       console.log(record)
         *       client.close()
         *     })
         *   })
         * })
         */
        policies?: PoliciesConfig;

        /**
         * Configuration for logging done by the client.
         * 
         * @example <caption>Enabling debug logging to a separate log file</caption>
         *
         * const Aerospike = require('aerospike')
         * const fs = require('fs')
         *
         * var debuglog = fs.openSync('./debug.log')
         * var config = {
         *   log: {
         *     level: Aerospike.log.DEBUG,
         *     file: debuglog
         *   }
         * }
         * Aerospike.connect(config, (err, client) => {
         *   if (err) throw err
         *   // ...
         *   client.close()
         * })
         */
        log?: LogConfig;

        /**
         * Initial host connection timeout in milliseconds.
         * The client observes this timeout when opening a connection to
         * the cluster for the first time. Default is 1,000 milliseconds.
         */
        connTimeoutMs?: number;

        /**
         * Polling interval in milliseconds for cluster tender. Default is
         * 1,000 milliseconds.
         */
        tenderInterval?: number;

        /**
         * Maximum number of asynchronous connections allowed for each node.
         * New transactions will be rejected with an
         * <code>AEROSPIKE_ERR_NO_MORE_CONNECTIONS</code> error if the limit would be
         * exceeded. Default is 300.
         */
        maxConnsPerNode?: number;

        /** Configuration values for the mod-lua system and user paths. */
        modlua?: Config.ModLuaConfig;

        /**
         * This allows multiple client instances running in separate
         * processes on the same machine to share cluster status, including nodes and
         * data partion maps.
         * 
         * @example <caption>Using shared memory in a clustered setup</caption>
         *
         * const Aerospike = require('aerospike')
         * const cluster = require('cluster')
         *
         * const config = {
         *   sharedMemory: {
         *     key: 0xa5000000
         *   }
         * }
         * const client = Aerospike.client(config)
         * const noWorkers = 4
         *
         * if (cluster.isMaster) {
         *   // spawn new worker processes
         *   for (var i = 0; i < noWorkers; i++) {
         *     cluster.fork()
         *   }
         * } else {
         *   // connect to Aerospike cluster in each worker process
         *   client.connect((err) => { if (err) throw err })
         *
         *   // handle incoming HTTP requests, etc.
         *   // http.createServer((request, response) => { ... })
         *
         *   // close DB connection on shutdown
         *   client.close()
         * }
         */
        sharedMemory?: Config.SharedMemoryConfig;
    }

    export interface HostConfig {
        addr: string;
        port?: number;
    }

    export interface PolicyConfig {
        timeout?: number;
    }

    export type PoliciesConfig = { [key: string]: PolicyConfig; };

    export interface LogConfig {
        /** Log level; see {@link module:aerospike.log} for details. */
        level: number;
        /** File descriptor opened using fs.open(); specify 1 for stdout and 2 for stdin. */
        file: number;
    }

    export interface ModLuaConfig {
        /** Path to system Lua scripts. */
        systemPath?: string;
        /** Path to user Lua scripts. */
        userPath?: string;
    }

    export interface SharedMemoryConfig {
        /*
         * Whether to enable/disable usage of shared memory.
         * Default: true.
         */
        enable?: boolean;
        /*
         * Key used to identify the shared memory segment; 
         * the same key needs to be used on all client instances.
         */
        key?: number;
        /*
         * Sets the max. number of server nodes in the cluster - this value is required 
         * to size the shared memory segment.
         * Ensure that you leave a cushion between actual server node cound and 
         * <code>maxNodes</code> so that you can add new nodes without rebooting the client.
         * Default: 16.
         */
        maxNodes?: number;
        /*
         * Sets the max. number of namespaces used in the cluster - this value is 
         * required to size the shared memory segment.
         * Ensure that you leave a cushion between actual namespace count and 
         * <code>maxNamespaces</code> so that you can add new namespaces
         * without rebooting the client.
         * Default: 8.
         */
        maxNamespaces?: number;
        /*
         * Expiration time in seconds for the lock on the shared memory segment; if the 
         * cluster status has not been updated after this many seconds another client 
         * instance will take over the shared memory cluster tending.
         * Default: 30.
         */
        takeoverThresholdSeconds?: number;
    }
}

export = Config;