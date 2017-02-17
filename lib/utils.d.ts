import * as AerospikeError from "./aerospike_error";

/**
 * Callback function called when a something has completed.
 * @param {?AerospikeError} error - The error code and message or <code>null</code> if the operation was successful.
 */
export type DoneCallback = (error: AerospikeError) => any;

export type ValueCallback<T> = (error: AerospikeError, value: T) => any;

export interface UdfArguments {
    /** The name of the UDF module that was registered with the cluster. */
    module: string;
    /** The name of the UDF function within the module. */
    funcname: string;
    /** List of arguments to pass to the UDF function. */
    args: Array<string | number>;
}
