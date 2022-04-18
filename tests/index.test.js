// Require the dotenv module to load the env variables
require('dotenv').config();
// Require the default module from Axios to make API calls
const axios = require('axios').default;
// Get the API's Base URL from an env variable
const BASE_URL = process.env.BASE_URL;

// Describe block for testing the list-users API from reqres.in
describe('Testing list-users APIs', () => {
  let totalNumberOfUsers;
  it('should return a list of 6 users if no page and per_page params are passed', async () => {
    // Make the API call without any query params
    const response = await axios.get(`${BASE_URL}/users`);
    // Get the data and status from the response
    const { data, status } = response;
    // Set the total number of users available to a local variable for later use
    totalNumberOfUsers = data.total;
    expect(status).toBe(200);
    expect(data.per_page).toBe(6);
    expect(data.page).toBe(1);
    expect(data.data.length).toBe(6);
    // Validate user fields
    validateUsersData(data.data);
  });
  it('should return a list of 6 users from page 1 if page is set to 0', async () => {
    // Make the API call without any query params
    const response = await axios.get(`${BASE_URL}/users?page=1`);
    // Get the data and status from the response
    const { data, status } = response;
    // Set the total number of users available to a local variable for later use
    totalNumberOfUsers = data.total;
    expect(status).toBe(200);
    expect(data.per_page).toBe(6);
    expect(data.page).toBe(1);
    expect(data.data.length).toBe(6);
    // Validate user fields
    validateUsersData(data.data);
  });
  it('should return a list of 10 users if per_page param is set to 10', async () => {
    // Make the API call with per_page query param set to 10
    const response = await axios.get(`${BASE_URL}/users?per_page=10`);
    // Get the data and status from the response
    const { data, status } = response;
    expect(status).toBe(200);
    expect(data.per_page).toBe(10);
    expect(data.page).toBe(1);
    expect(data.data.length).toBe(10);
    // Validate user fields
    validateUsersData(data.data);
  });
  it('should return a list of 6 users from page 2 when page param is set to 2', async () => {
    // Make the API call with page query param set to 2
    const response = await axios.get(`${BASE_URL}/users?page=2`);
    // Get the data and status from the response
    const { data, status } = response;
    expect(status).toBe(200);
    expect(data.per_page).toBe(6);
    expect(data.page).toBe(2);
    expect(data.data.length).toBe(6);
    // Validate user fields
    validateUsersData(data.data);
  });
  it('should return a list of 12 users when per_page param is set to the total available users', async () => {
    // Make the API call with per_page query param set to total number of users received from the API
    const response = await axios.get(
      `${BASE_URL}/users?per_page=${totalNumberOfUsers}`
    );
    // Get the data and status from the response
    const { data, status } = response;
    expect(status).toBe(200);
    expect(data.per_page).toBe(totalNumberOfUsers);
    expect(data.page).toBe(1);
    expect(data.data.length).toBe(totalNumberOfUsers);
    // Validate user fields
    validateUsersData(data.data);
  });
  it('should return a list of 12 users only when per_page param is set to more than the total available users', async () => {
    // Make the API call with per_page query param set to total number of users received from the API plus one
    const response = await axios.get(
      `${BASE_URL}/users?per_page=${totalNumberOfUsers + 1}`
    );
    // Get the data and status from the response
    const { data, status } = response;
    expect(status).toBe(200);
    expect(data.per_page).toBe(totalNumberOfUsers + 1);
    expect(data.page).toBe(1);
    expect(data.data.length).toBe(totalNumberOfUsers);
    // Validate user fields
    validateUsersData(data.data);
  });
  it('should not return any users when per_page is set to 12 and page param is set to 2', async () => {
    // Make the API call with per_page query param set to total number of users received from the API and page param set to 2
    const response = await axios.get(
      `${BASE_URL}/users?per_page=${totalNumberOfUsers}&page=2`
    );
    // Get the data and status from the response
    const { data, status } = response;
    expect(status).toBe(200);
    expect(data.per_page).toBe(totalNumberOfUsers);
    expect(data.page).toBe(2);
    expect(data.data.length).toBe(0);
  });
});

/**
 * @description Validates if all the users received in the array have all the required fields with the right types
 * @param {Array<{
 * id:number, email:string, first_name:string, last_name:string, avatar:string
 * }>} users Array of all users
 */
const validateUsersData = (users) => {
  // Regular expression to validate an email Id
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Regular Expression to validate an HTTPS URL
  const URLRegex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

  // Loop through the list of users using a for-of loop
  for (const user of users) {
    // Get the id, email, first_name, last_name and avatar from the user Object
    const { id, email, first_name, last_name, avatar } = user;
    // Expect fields of user object to match expected types
    expect(id).toBeDefined();
    expect(email).toMatch(emailRegex);
    expect(first_name).toBeDefined();
    expect(last_name).toBeDefined();
    expect(avatar).toMatch(URLRegex);
  }
};
