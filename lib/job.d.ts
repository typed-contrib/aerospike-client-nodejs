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

import * as AerospikeError from "./aerospike_error";
import * as Client from "./client";

import { DoneCallback } from "./utils";

/**
 * @class Job
 * @classdesc Potentially long-running background job.
 *
 * @see {@link Scan#background}
 * @see {@link Query#background}
 */
declare class Job {
    public client: Client;
    public jobID: string;
    public module: string;

    constructor(client: Client, jobID: string, module: string);

    /**
     * Check the progress of a background job running on the database.
     *
     * @param {Job~infoCallback} callback - The function to call with the job info response.
     *
     * @example
     *
     * const Aerospike = require('aerospike')
     *
     * Aerospike.connect((error, client) => {
     *   if (error) throw error
     *
     *   var scan = client.scan('test', 'demo')
     *   scan.background('myUdfModule', 'myUdfFunction', (error, job) => {
     *     if (error) throw error
     *     var timer = setInterval(() => {
     *       job.info((error, info) => {
     *         if (error) throw error
     *         console.info('scan status: %d (%d%% complete, %d records scanned)', info.status, info.progressPct, info.recordsRead)
     *         if (info.status === Aerospike.jobStatus.COMPLETED) {
     *           console.info('scan completed!')
     *           clearInterval(timer)
     *           client.close()
     *         }
     *       })
     *     }, 1000)
     *   })
     * })
     */
    public info(callback: Job.InfoCallback): void;
    /**
     * Check the progress of a background job running on the database.
     *
     * @param {Client~InfoPolicy} policy - The Info Policy to use for this operation.
     * @param {Job~infoCallback} callback - The function to call with the job info response.
     */
    public info(policy: Client.InfoPolicy, callback: Job.InfoCallback): void;

    /**
     * Wait until the task has been completed.
     *
     * @param {DoneCallback} callback - The function to call when the task has completed.
     */
    public waitUntilDone(callback: DoneCallback): void;
    /**
     * Wait until the task has been completed.
     *
     * @param {number} [pollInterval=1000] - Interval in milliseconds to use when polling the cluster nodes.
     * @param {DoneCallback} callback - The function to call when the task has completed.
     */
    public waitUntilDone(pollInterval: number, callback: DoneCallback): void;
}

declare namespace Job {
    /** The job info. */
    export interface JobInfo {
        /** Status of the job. See {@link module:aerospike.jobStatus}. */
        status: number;
        /** Progress estimate for the job, as percentage. */
        progressPct: number;
        /** How many records have been processed. */
        recordsRead: number;
    }

    export type InfoCallback = (error: AerospikeError, info: JobInfo) => any;
}

export = Job;
