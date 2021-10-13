const { findAll } = require('../db/databaseHelper');
const AppError = require('../utils/appError');

const BASE = `https://www.zuri.chat.goals/api/v1/`;

/**
 * Get search results
 * @param {string} orgID User's organization ID
 * @param {string} memberID User's current member ID
 * @param {string} key String to search for
 * @param {string} searchID Filter paramater to categorize search
 */
exports.getResults = async (orgID, memberID, key, searchID, page = 1, limit = 20) => {
  let prev;
  let next;

  const payload = {
    page,
    limit,
    total_count: 0,
    next: '',
    prev: '',
    results: [],
  };

  if (!orgID || !memberID) {
    throw new AppError('No organization ID was provided', 500);
  }

  if (!key && !searchID) {
    throw new AppError('No search key or ID was provided', 500);
  }

  if (!key && searchID) {
    const {
      data: { data },
    } = await findAll('searchID', orgID);

    if (!data || data.length === 0) {
      return payload;
    }

    // if (data instanceof String) {
    //   payload.results.push(data);
    //   payload.total_count += 1;
    //   return payload;
    // }

    const upper = (page - 1) * (limit + 1);
    const lower = page * (limit + 1);

    if (page > 1) {
      prev = `${BASE}/org/${orgID}/member/${memberID}/search?key=${key}&id=${searchID}&page=${page - 1}`;
    }

    if (data.length <= lower) {
      next = '';
    } else {
      next = `${BASE}/org/${orgID}/member/${memberID}/search?key=${key}&id=${searchID}&page=${page + 1}`;
    }

    payload.prev = prev;
    payload.next = next;
    payload.results = data;
    payload.total_count = data.length;
    payload.results = data.slice(upper, lower);

    return payload;
  }
};

// exports.appendURL = (payload, searchID) => {};

/**
 * {
    total_count
    page
    next
    previous
    results: [
        {
            “url”:”<link to access this item on the UI>”,
            ….
            ….
            (the rest can be customizable per plugin)
},
{
            “url”:”<link to access this item on the UI>”,
            ….
            ….
            (the rest can be customizable per plugin)
},
]
}

 */
