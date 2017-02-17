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
 * @class AerospikeError
 * @extends Error
 * 
 * Error status returned by the server.
 *
 * @example
 *
 * const Aerospike = require('aerospike')
 * var key = new Aerospike.Key('test', 'key', 'does_not_exist')
 * Aerospike.connect((error, client) => {
 *   if (error) throw error
 *   client.get(key, (error, record) => {
 *     console.log(error) // => { [AerospikeError: AEROSPIKE_ERR_RECORD_NOT_FOUND]
 *                        //      code: 2,
 *                        //      message: 'AEROSPIKE_ERR_RECORD_NOT_FOUND',
 *                        //      func: 'as_event_command_parse_result',
 *                        //      file: 'src/main/aerospike/as_event.c',
 *                        //      line: 614,
 *                        //      name: 'AerospikeError' }
 *   })
 *   client.close()
 * })
 */
declare class AerospikeError extends Error {
    /**
     * Error name
     * @readonly
     */
    public readonly name: "AerospikeError";

    /**
     * Error message
     * @readonly
     */
    public readonly message: string;

    /**
     * Status code.
     * @readonly
     *
     * @see List of status codes defined at {@link module:aerospike.status}
     */
    public readonly code: number;

    /**
     * C/C++ function name where the error occurred.
     * @readonly
     */
    public readonly func: string;

    /**
     * File name of the C/C++ source file in which the error occurred.
     * @readonly
     */
    public readonly file: string;

    /**
     * Line number in the C/C++ source file in which the error occurred.
     * @readonly
     */
    public readonly line: string;

    /**
     * @summary Construct a new AerospikeError instance.
     *
     * @param {number} code - The status code of the error.
     * @param {string} [message] - A message describing the status code.
     * @param {string} [func] - The name of the function in which the error occurred.
     * @param {string} [file] - The file name in which the error occurred.
     * @param {string} [line] - The line number on which the error occurred.
     * 
     * @see <code>Aerospike.status</code> contains the full list of possible status codes.
     */
    constructor(code: number, message?: string, func?: string, file?: string, line?: string);

    static fromAsError(err: AerospikeError.AsError): AerospikeError;
}

declare namespace AerospikeError {
    export interface AsError {
        code: number;
        message?: string;
        func?: string;
        file?: string;
        line?: string;
    }
}

export = AerospikeError;
