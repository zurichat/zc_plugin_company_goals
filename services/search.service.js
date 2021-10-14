const { findAll } = require('../db/databaseHelper');
const AppError = require('../utils/appError');

const BASE = `https://goals.zuri.chat`;

/**
 * Build and append URL of single resource to each resource object.
 * @param {[{}]} data List of search results
 * @param {string} searchID Collection to search through
 * @param {string} orgID User's organization id
 */
const buildURL = (data, searchID, orgID) => {
  const payload = data.map((ele) => {
    const url = `${BASE}/${searchID}/room/${orgID}`;
    return { ...ele, url };
  });

  return payload;
};

/**
 * Filter unfilteredData using key.
 * @param {[{}]} unfilteredData Data to be filtered
 * @param {string} key String to use for filtering
 */
const filterResults = (unfilteredData, key) => {
  const lowerKey = key.toLowerCase();

  const filteredData = unfilteredData.filter((obj) => {
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

  return filteredData;
};

/**
 * Get search results
 * @param {string} orgID User's organization ID
 * @param {string} memberID User's current member ID
 * @param {string} key String to search for
 * @param {string} searchID Filter paramater to categorize search
 */
exports.getResults = async (orgID, memberID, key, searchID, pageStr = 1, limitStr = 20) => {
  const page = Number.parseInt(pageStr, 10);
  const limit = Number.parseInt(limitStr, 10);

  // Base Data transfer object
  const searchDTO = {
    pagination: {
      current_page: page,
      per_page: limit,
      page_count: 1,
      first_page: 1,
      last_page: 1,
      total_count: 0,
    },
    query: key || '',
    plugin: 'Goals',
    data: [
      {
        title: 'name of resource item',
        email: `can be empty if it doesn't apply`,
        description: '',
        image_url: 'if any',
        created_at: '',
        url: 'resource item redirect url',
      },
    ],
    filter_suggestions: { in: [searchID || 'All'], from: [key || ''] },
  };

  if (!orgID || !memberID) {
    return new AppError('No organization ID was provided', 500);
  }

  if (!key && !searchID) {
    return new AppError('No search key or ID was provided', 500);
  }

  if (!key && searchID) {
    try {
      // Query all data from given collection
      const {
        data: { data },
      } = await findAll(searchID, orgID);

      // Return default dto if no response
      if (!data || data.length === 0) {
        return searchDTO;
      }

      // Paginate response
      const upper = page <= 1 ? 0 : (page - 1) * limit;
      const lower = page * limit;

      const finalDTO = buildURL(data, searchID, orgID);

      searchDTO.pagination.total_count = data.length;
      searchDTO.data = finalDTO.slice(upper, lower);
      searchDTO.pagination.last_page = data.length > limit ? Math.ceil(data.length / limit) : 1;

      return searchDTO;
    } catch (error) {
      return error;
    }
  }

  if (key && searchID) {
    try {
      // Call zccore with keyword filter
      const {
        data: { data },
      } = await findAll(searchID, orgID);

      // Return default if no data
      if (!data || data.length === 0) {
        return searchDTO;
      }

      // Paginate response
      const upper = page <= 1 ? 0 : (page - 1) * limit;
      const lower = page * limit;

      const filteredData = filterResults(data, key);

      const finalDTO = buildURL(filteredData, searchID, orgID);

      searchDTO.pagination.total_count = filteredData.length;
      searchDTO.data = finalDTO.slice(upper, lower);
      searchDTO.pagination.last_page = filteredData.length > limit ? Math.ceil(filteredData.length / limit) : 1;

      return searchDTO;
    } catch (error) {
      return error;
    }
  }
};
