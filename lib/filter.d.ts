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

import * as GeoJSON from "./geojson";
import { indexType, indexDataType } from "./aerospike";

/**
 * @module aerospike/filter
 *
 * @description This module provides function to specify filter predicates for
 * use in query operations via the {@link Client#query} command.
 *
 * **Note:** Currently, queries only support a single filter predicate. To do
 * more advanced filtering, you can use a UDF to process the result set on the
 * server.
 *
 * @see {@link Query}
 */

/**
 * Filter predicate to limit the scope of a {@link Query}.
 *
 * Filter predicates must be instantiated using the methods in the {@link
 * module:aerospike/filter} module.
 */
export interface FilterPredicate {
    predicate: number;
    bin: string;
    datatype: indexDataType;
    type: indexType
}

export interface EqualPredicate<T extends string | number> extends FilterPredicate {
    val: T;
}

export interface RangePredicate extends FilterPredicate {
    min: number;
    max: number;
}

export interface GeoPredicate extends FilterPredicate {
    val: string;
}

/**
 * String/integer equality filter. The filter matches records with a bin that
 * matches a specified string or integer value.
 *
 * @param {string} bin - The name of the bin.
 * @param {string|integer} value - The filter value.
 * @returns {FilterPredicate} Filter predicate that can be passed to the {@link Client#query} command.
 */
export function equal<T extends string | number>(bin: string, value: T): EqualPredicate<T>;

/**
 * Filter for list/map membership. The filter matches records with a bin that
 * has a list or map value that contain the given string or integer.
 *
 * @param {string} bin - The name of the bin.
 * @param {(string|integer)} value - The value that should be a member of the
 * list or map in the bin.
 * @param {number} indexType - One of {@link module:aerospike.indexType},
 * i.e. LIST, MAPVALUES or MAPKEYS.
 * @returns {FilterPredicate} Filter predicate that can be passed to the {@link Client#query} command.
 *
 * @since v2.0
 */
export function contains<T extends string | number>(bin: string, value: T, indexType: indexType): EqualPredicate<T>;

/**
 * Integer range filter. The filter matches records with a bin value in the
 * given integer range. The filter can also be used to match for integer
 * values within the given range that are contained with a list or map by
 * specifying the appropriate index type.
 *
 * @param {string} bin - The name of the bin.
 * @param {number} min - Lower end of the range (inclusive).
 * @param {number} max - Upper end of the range (inclusive).
 * @param {number} [indexType=Aerospike.indexType.DEFAULT] - One of {@link module:aerospike.indexType}, i.e. LIST or MAPVALUES.
 * @returns {FilterPredicate} Filter predicate that can be passed to the {@link Client#query} command.
 */
export function range(bin: string, min: number, max: number, indexType?: indexType): RangePredicate;

/**
 * @deprecated since v2.0 - use geoWithinGeoJSONRegion() instead.
 */
export function geoWithin(bin: string, value: Object | GeoJSON, indexType?: indexType): GeoPredicate;

/**
 * Geospatial filter that matches points within a given GeoJSON region.
 * Depending on the index type, the filter will match GeoJSON values
 * contained in list or map values as well (requires Aerospike server
 * version >= 3.8).
 *
 * @param {string} bin - The name of the bin.
 * @param {GeoJSON} value - GeoJSON region value.
 * @param {number} [indexType=Aerospike.indexType.DEFAULT] - One of {@link module:aerospike.indexType}, i.e. LIST or MAPVALUES.
 * @returns {FilterPredicate} Filter predicate that can be passed to the {@link Client#query} command.
 *
 * @since v2.0
 */
export function geoWithinGeoJSONRegion(bin: string, value: GeoJSON, indexType?: indexType): GeoPredicate;

/**
 * Geospatial filter that matches points within a radius from a given point.
 * Depending on the index type, the filter will match GeoJSON values
 * contained in list or map values as well (requires Aerospike server
 * version >= 3.8).
 *
 * @param {string} bin - The name of the bin.
 * @param {number} lng - Longitude of the center point.
 * @param {number} lat - Latitude of the center point.
 * @param {number} radius - Radius in meters.
 * @param {number} [indexType=Aerospike.indexType.DEFAULT] - One of {@link module:aerospike.indexType}, i.e. LIST or MAPVALUES.
 * @returns {FilterPredicate} Filter predicate that can be passed to the {@link Client#query} command.
 *
 * @since v2.0
 */
export function geoWithinRadius(bin: string, lon: number, lat: number, radius: number, indexType?: indexType): GeoPredicate;

/**
 * @deprecated since v2.0 - use geoWithinGeoJSONRegion() instead.
 */
export function geoContains(bin: string, value: GeoJSON, indexType?: indexType): GeoPredicate;

/**
 * Geospatial filter that matches regions that contain a given GeoJSON point.
 * Depending on the index type, the filter will match GeoJSON regions within
 * list or map values as well (requires Aerospike server version >= 3.8).
 *
 * @param {string} bin - The name of the bin.
 * @param {GeoJSON} value - GeoJSON point value.
 * @param {number} [indexType=Aerospike.indexType.DEFAULT] - One of {@link module:aerospike.indexType}, i.e. LIST or MAPVALUES.
 * @returns {FilterPredicate} Filter predicate that can be passed to the {@link Client#query} command.
 *
 * @since v2.0
 */
export function geoContainsGeoJSONPoint(bin: string, value: GeoJSON, indexType?: indexType): GeoPredicate;

/**
 * Geospatial filter that matches regions that contain a given lng/lat
 * coordinate. Depending on the index type, the filter will match GeoJSON
 * regions within list or map values as well (requires Aerospike server
 * version >= 3.8).
 *
 * @param {string} bin - The name of the bin.
 * @param {number} lng - Longitude of the point.
 * @param {number} lat - Latitude of the point.
 * @param {number} [indexType=Aerospike.indexType.DEFAULT] - One of {@link module:aerospike.indexType}, i.e. LIST or MAPVALUES.
 * @returns {FilterPredicate} Filter predicate that can be passed to the {@link Client#query} command.
 *
 * @since v2.0
 */
export function geoContainsPoint(bin: string, lon: number, lat: number, indexType?: indexType): GeoPredicate;
