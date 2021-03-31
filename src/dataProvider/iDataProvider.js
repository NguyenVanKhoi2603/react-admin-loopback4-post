import { stringify } from 'query-string'
import fetchJson from './fetch'
import { isEmpty, isArray } from 'lodash'
import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    UPDATE_MANY,
    DELETE,
    DELETE_MANY,
} from 'react-admin'

export * from './authProvider'
export { default as storage } from './storage'

// const types = ['REMOTE', 'CREATE', 'UPDATE']
// const resources = {
// Rooms: {
// fields: [
// { name: 'images', isMulti: true },
// ]
// },
// RoomContracts: {
// fields: [
// { name: 'images', isMulti: true },
// ]
// },
// Users: {
// fields: [
// { name: 'avatar' },
// ]
// },
// Tags: {
// fields: [
// { name: 'imgS' },
// { name: 'imgM' },
// { name: 'imgL' },
// ]
// },
// Blogs: {
// fields: [
// { name: 'thumbnail' },
// { name: 'cover' },
// { name: 'images', isMulti: true },
// ]
// },
// Testimonials: {
// fields: [
// { name: 'avatar' },
// ]
// },
// Banners: {
// fields: [
// { name: 'background' },
// ]
// },
// }

export const filterFromParams = params => {
    const { page, perPage } = params.pagination || {}
    let filter
    if (params.filter && params.filter.where) {
        filter = { ...params.filter, where: { ...params.filter.where } }
    } else {
        const where = { ...params.filter }
        for (const key in where) {
            if (where[key] === null) {
                delete where[key]
            }
        }
        filter = { where }
    }

    if (filter.where.q) {
        filter.where.$text = {
            search: filter.where.q,
        }
        delete filter.where.q
    }

    filter.limit = perPage
    filter.skip = (page - 1) * perPage
    const paramSorts = []
    let { sort } = params
    if (!isArray(sort)) {
        sort = [sort]

    }

    if (sort) {
        for (let i = 0; i < sort.length; i++) {
            const paramSort = sort[i]
            const { order, field } = paramSort
            if (order && field) {
                const strOrder = field + ' ' + order
                paramSorts.push(strOrder)
            }
        }
    }

    if (paramSorts.length > 0) {
        filter.order = paramSorts
    }

    const rootQuery = {}

    if (filter && filter.where) {

        for (const key in filter.where) {

            if (key.startsWith('../') || key.startsWith('__/')) {
                const newKey = key.substr(3)
                filter[newKey] = filter.where[key]
                delete filter.where[key]
                console.log("-=========", filter.where[key]);
            }

            if (key.startsWith('/')) {
                const newKey = key.substr(1)
                rootQuery[newKey] = filter.where[key]
            }

            if (key.endsWith('_gte')) {
                const value = filter.where[key]
                const newKey = key.substring(0, key.indexOf('_gte'))

                if (!filter.where[newKey]) {
                    filter.where[newKey] = { ...filter.where[newKey], gte: value }
                } else {
                    filter.where.and = [{ [newKey]: { ...filter.where[newKey] } }, { [newKey]: { gte: value } }]
                    delete filter.where[newKey]
                }
                delete filter.where[key]
            }

            if (key.endsWith('_lte')) {
                const value = filter.where[key]
                const newKey = key.substring(0, key.indexOf('_lte'))

                if (!filter.where[newKey]) {
                    filter.where[newKey] = { ...filter.where[newKey], lte: value }
                } else {
                    filter.where.and = [{ [newKey]: { ...filter.where[newKey] } }, { [newKey]: { lte: value } }]
                    delete filter.where[newKey]
                }
                delete filter.where[key]
            }

            if (key.endsWith('_like')) {
                const value = filter.where[key]
                const newKey = key.substring(0, key.indexOf('_like'))

                if (!filter.where[newKey]) {
                    filter.where[newKey] = { like: `%${value}%` }
                } else {
                    filter.where.and = [{ [newKey]: { like: `%${value}%` } }]
                    delete filter.where[newKey]
                }
                delete filter.where[key]
            }
        }
    }

    return [filter, rootQuery]
}

const provider = (apiUrl, httpClient = fetchJson) => {
    /**
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Object} { url, options } The HTTP request parameters
     */
    const convertDataRequestToHTTP = (type, resource, params) => {
        let url = ''
        let urls
        const options = {}
        const specialParams = new Set(['pagination', 'sort', 'filter'])
        switch (type) {
            case GET_LIST: {
                // const { page, perPage } = params.pagination;
                // const { field, order } = params.sort;
                // const query = {};
                // query['where'] = {...params.filter};
                // if (field) query['order'] = [field + ' ' + order];
                // if (perPage >= 0) query['limit'] = perPage;
                // if ((perPage > 0) && (page >= 0)) query['skip'] = (page - 1) * perPage;
                const [query, rootQuery = {}] = filterFromParams(params)

                Object.keys(params).forEach(key => {
                    if (!specialParams.has(key) && params[key] !== undefined)
                        query[key] = params[key]
                })
                urls = [
                    `${apiUrl}/${resource}?${stringify({ filter: JSON.stringify(query), ...rootQuery })}`,
                    `${apiUrl}/${resource}/count?${stringify({ where: JSON.stringify(query.where), ...rootQuery })}`,
                ]
                break
            }
            case GET_ONE: {
                url = `${apiUrl}/${resource}/${params.id}`
                const query = params.filter
                if (!isEmpty(query)) {
                    url += `?${stringify({ filter: JSON.stringify(query) })}`
                }
                break
            }
            case GET_MANY: {
                let query = ''
                if (params.ids.length > 0) {
                    const filter = {
                        where: { id: { inq: params.ids } },
                    }
                    query = `?${stringify({ filter: JSON.stringify(filter) })}`
                }
                url = `${apiUrl}/${resource}${query}`
                break
            }
            case GET_MANY_REFERENCE: {
                // const { page, perPage } = params.pagination;
                // const { field, order } = params.sort;
                // const query = {};
                // query['where'] = {...params.filter};
                // query['where'][params.target] = params.id;
                // if (field) query['order'] = [field + ' ' + order];
                // if (perPage >= 0) query['limit'] = perPage;
                // if ((perPage > 0) && (page >= 0)) query['skip'] = (page - 1) * perPage;
                const [filter, rootQuery = {}] = filterFromParams(params)
                filter.where[params.target] = params.id

                // Object.keys(params).forEach(key => {
                // if (!specialParams.has(key) && params[key] !== undefined)
                // query[key] = params[key];
                // });

                urls = [
                    `${apiUrl}/${resource}?${stringify({ filter: JSON.stringify(filter), ...rootQuery })}`,
                    `${apiUrl}/${resource}/count?${stringify({ filter: JSON.stringify(filter.where), ...rootQuery })}`,
                ]
                break
            }
            case UPDATE:
                url = `${apiUrl}/${resource}/${params.id}`
                options.method = 'PATCH'
                options.body = JSON.stringify(params.data)
                break
            case CREATE:
                url = `${apiUrl}/${resource}`
                options.method = 'POST'
                options.body = JSON.stringify(params.data)
                break
            case DELETE:
                url = `${apiUrl}/${resource}/${params.id}`
                options.method = 'DELETE'
                break
            case 'REMOTE': {
                url = `${apiUrl}/${resource}/${params.method}`
                options.method = params.requestMethod || 'POST'
                switch (options.method) {
                    case 'GET': {
                        if (params.data && typeof params.data === 'object') {
                            const pairs = []
                            for (const key in params.data) {
                                let value = params.data[key]
                                if (Array.isArray(value)) {
                                    let strParam = ''
                                    for (let i = 0; i < value.length; i++) {
                                        strParam = strParam.concat(i === 0 ? value[i] : `&${key}=${value[i]}`)
                                    }
                                    value = strParam
                                }

                                if (typeof value === 'object') {
                                    value = JSON.stringify(value)
                                }

                                pairs.push(`${key}=${encodeURI(value)}`)
                            }
                            if (pairs.length > 0) {
                                url += '?' + pairs.join('&')
                            }
                        }
                        if (params.filter) {
                            const [filter, rootQuery = {}] = filterFromParams(params.filter)
                            filter.where[params.target] = params.id
                            url += '?' + `${stringify({ filter: JSON.stringify(filter), ...rootQuery })}`
                        }
                        break
                    }
                    case 'POST': {
                        options.body = JSON.stringify(params.data)
                        break
                    }
                    case 'PATCH': {
                        options.body = JSON.stringify(params.data)
                        break
                    }
                    case 'PUT': {
                        options.body = JSON.stringify(params.data)
                        break
                    }
                    default:
                        break
                }
                break
            }
            default:
                throw new Error(`Unsupported fetch action type ${type}`)
        }
        return { urls, url, options }
    }

    const convertWithCountHTTPResponse = (response, type, resource, params, count = 0) => {
        switch (type) {
            case GET_LIST:
            case GET_MANY_REFERENCE:
                return {
                    data: response.data,
                    total: count,
                }
        }
    }

    /**
     * @param {Object} response HTTP response from fetch()
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Object} Data response
     */
    const convertHTTPResponse = (response, type, resource, params, count = 0) => {
        const { json } = response
        switch (type) {
            /*
              case GET_LIST:
              case GET_MANY_REFERENCE:
                // if (!headers.has('content-range')) {
                  // throw new Error(
                    // 'The Content-Range header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare Content-Range in the Access-Control-Expose-Headers header?'
                  // );
                // }
                return {
                  data: json,
                  total: count, 
                  // total: parseInt(
                    // headers
                      // .get('content-range')
                      // .split('/')
                      // .pop(),
                      // 10
                  // ),
                };
                */
            case CREATE:
                return { data: { ...params.data, id: json.id } }
            case DELETE:
                return { data: { ...json, id: params.id } }
            default:
                return { data: json }
        }
    }

    /**
     * @param {string} type Request type, e.g GET_LIST
     * @param {string} resource Resource name, e.g. "posts"
     * @param {Object} payload Request parameters. Depends on the request type
     * @returns {Promise} the Promise for a data response
     */
    const ret = (type, resource, params) => {
        // simple-rest doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
        if (type === UPDATE_MANY) {
            return Promise.all(
                params.ids.map(id =>
                    httpClient(`${apiUrl}/${resource}/${id}`, {
                        method: 'PUT',
                        body: JSON.stringify(params.data),
                    })
                )
            ).then(responses => ({
                data: responses.map(response => response.json),
            })
                .catch(e => {
                    console.log('Error ', e)
                }))
        }
        // simple-rest doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
        if (type === DELETE_MANY) {
            return Promise.all(
                params.ids.map(id =>
                    httpClient(`${apiUrl}/${resource}/${id}`, {
                        method: 'DELETE',
                    })
                )
            ).then(responses => ({
                data: responses.map(response => response.json),
            }))
        }

        const { urls, url, options } = convertDataRequestToHTTP(
            type,
            resource,
            params
        )

        if (!urls) {
            return httpClient(url, options).then(response =>
                convertHTTPResponse(response, type, resource, params)
            )
        } else {
            return Promise.all(urls.map(url =>
                httpClient(url, options).then(response =>
                    convertHTTPResponse(response, type, resource, params)
                )
            )).then((responses) => {
                return convertWithCountHTTPResponse(responses[0], type, resource, params, responses[1].data.count)
            })
        }
    }

    // return uploadFile({ types, resources })(ret)
    return ret
}

// const dataProvider = uploadFile({ types, resources })(provider)
//const baseUrl = document.API_URL !== '$api_url' ? document.API_URL : process.env.REACT_APP_API_URL || 'http://localhost:3000/'

const baseUrl = 'http://localhost:3000';
const restProvider = provider(baseUrl)

export const dataProvider = (type, resource, params) => new Promise(resolve => resolve(restProvider(type, resource, params)))


