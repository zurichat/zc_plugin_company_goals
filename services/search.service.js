/* eslint-disable camelcase */
const { findAll } = require('../db/databaseHelper');
const AppError = require('../utils/appError');

const BASE = `https://goals.zuri.chat`;
const BASE2 = `https://www.zuri.chat/goals`;

/**
 * Build and append URL of single resource to each resource object.
 * @param {[{}]} data List of search results
 * @param {string} searchID Collection to search through
 * @param {string} orgID User's organization id
 */
const buildResult = (data, searchID, orgID) => {
  return data.map((ele) => {
    const url = `${BASE2}/room/${orgID}`;
    const { _id, goal_type: type, goal_name: title, description: content, created_at } = ele;
    return { _id, type, title, content, created_at, destination_url: url, images_url: '', created_by: '' };
  });
};

/**
 * Filter unfilteredData using key.
 * @param {[{}]} unfilteredData Data to be filtered
 * @param {string} key String to use for filtering
 */
const filterResults = (unfilteredData, key) => {
  const lowerKey = key.toLowerCase();

  return unfilteredData.filter((obj) => {
    const name = obj.goal_name || '';
    const desc = obj.description || '';
    const category = obj.category || '';
    const type = obj.goal_type || '';

    return (
      name.toLowerCase().includes(lowerKey) ||
      desc.toLowerCase().includes(lowerKey) ||
      category.toLowerCase().includes(lowerKey) ||
      type.toLowerCase().includes(lowerKey)
    );
  });
};

/**
 * Get search results
 * @param {string} orgID User's organization ID
 * @param {string} memberID User's current member ID
 * @param {string} key String to search for
 * @param {string} filter Filter parameter to categorize search
 * @param {string} pageStr Page to be displayed
 * @param {string} limitStr Number of items to display per page
 */

exports.getResults = async (orgID, memberID, key, filter, pageStr = '1', limitStr = '20') => {
  const page = Number.parseInt(pageStr, 10);
  const limit = Number.parseInt(limitStr, 10);

  // Base Data transfer object
  const searchDTO = {
    title: key ? `Search results for {${key}}` : 'Search results',
    description: key
      ? `Showing search results for keyword: ${key} within the goals plugin.`
      : 'Showing search results within the goals plugin.',
    pagination: {
      current_page: page,
      page_size: limit,
      first_page: 1,
      last_page: 1,
      total_results: 0,
      next: '',
      previous: '',
    },
    search_parameters: {
      query: key || '',
      filters: filter ? [filter] : [],
      plugin: 'Goals',
    },
    results: {
      entity: 'others',
      data: [],
    },
  };

  if (!orgID || !memberID) {
    return new AppError('No organization ID or member ID was provided', 500);
  }

  if (!key && !filter) {
    return new AppError('No search key or ID was provided', 500);
  }

  if (!key && filter) {
    try {
      // Query all data from given collection
      const {
        data: { data },
      } = await findAll('goals', orgID);

      // Return default dto if no response
      if (!data || data.length === 0) {
        return searchDTO;
      }

      // Paginate response
      const upper = page <= 1 ? 0 : (page - 1) * limit;
      const lower = page * limit;
      const lastPage = data.length > limit ? Math.ceil(data.length / limit) : 1;

      const finalDTO = buildResult(data, filter, orgID);

      searchDTO.pagination.total_results = data.length;
      searchDTO.results.data = finalDTO.slice(upper, lower);
      searchDTO.pagination.last_page = lastPage;

      searchDTO.pagination.next =
        lastPage !== page ? `${BASE}/api/v1/search/${orgID}/${memberID}?page=${page + 1}&limit=${limit}` : '';
      searchDTO.pagination.previous =
        page > 1 ? `${BASE}/api/v1/search/${orgID}/${memberID}?page=${page - 1}&limit=${limit}` : '';

      return searchDTO;
    } catch (error) {
      return error;
    }
  }

  if (key) {
    const searchStr = filter || 'goals';
    try {
      // Call zccore with keyword filter
      const {
        data: { data },
      } = await findAll('goals', orgID);

      // Return default if no data
      if (!data || data.length === 0) {
        return searchDTO;
      }

      // Paginate response
      const upper = page <= 1 ? 0 : (page - 1) * limit;
      const lower = page * limit;

      const filteredData = filterResults(data, key);

      const lastPage = filteredData.length > limit ? Math.ceil(filteredData.length / limit) : 1;

      const finalDTO = buildResult(filteredData, searchStr, orgID);

      searchDTO.pagination.total_results = filteredData.length;
      searchDTO.results.data = finalDTO.slice(upper, lower);
      searchDTO.pagination.last_page = lastPage;
      searchDTO.pagination.next =
        lastPage !== page ? `${BASE}/api/v1/search/${orgID}/${memberID}?q=${key}&page=${page + 1}&limit=${limit}` : '';
      searchDTO.pagination.previous =
        page > 1 ? `${BASE}/api/v1/search/${orgID}/${memberID}?q=${key}&page=${page - 1}&limit=${limit}` : '';

      return searchDTO;
    } catch (error) {
      return error;
    }
  }
};
