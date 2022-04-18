# List Users (https://reqres.in/api/list-users) API testing

reqres.in is a 24\*7 online suite of APIs that developers can use to test their front end. It exposes a list-users API endpoint that returns a list of users with details - first name, last name, email, avatar and a numeric Id. It supports pagination using query params.

## Features

- Pagination of data using query params
- Always available
- Real looking data

## How to use?

- Create a GET request to https://reqres.in/api/list-users
- Set query params for pagination: `per_page` and `page`.
- `page` param sets the page number of the data
- `per_page` sets the size of the page
- Default `page` is 1 and `per_page` value is 6
- 12 users available with id, first_name, last_name, email and avatar fields

## Sample Response

```javascript
{
    "page": 2,
    "per_page": 6,
    "total": 12,
    "total_pages": 2,
    "data": [
        {
            "id": 7,
            "email": "michael.lawson@reqres.in",
            "first_name": "Michael",
            "last_name": "Lawson",
            "avatar": "https://reqres.in/img/faces/7-image.jpg"
        },
        .
        .
        .
    ],
    "support": {
        "url": "https://reqres.in/#support-heading",
        "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
    }
}
```

# Tests

The repository has tests written for this API using Jest and Axios. After cloning the repo, run the following command to install required dependencies:

```javascript
npm install
```

Or with Yarn

```javascript
yarn install
```

The tests require a `BASE_URL` environment variable which is set using `dotenv` module from a `.env` file

Create a .env file in the root of the repository and add the following:

```
BASE_URL=https://reqres.in/api
```

To run the tests,

```javascript
npm test
```

Or with Yarm

```javascript
yarn test
```

Tests can also be ran in watch mode using:

```javascript
npm run watch:test
```

Or with Yarn

```javascript
yarn watch:test
```

# Formatting

The project uses prettier to format the files. To format all files, run

```javascript
npm run format
```

Or with Yarn

```javascript
yarn format
```

# Code Quality

This repository is tested for code quality using [SonarQube]. To run Sonar tests, configure Sonar locally and run sonar-scanner CLI tool in the root of the repo

# Technologies Used

- [Node.JS] - Node.js is a free, open-sourced, cross-platform JavaScript run-time environment that lets developers write command line tools and server-side scripts outside of a browser.
- [Axios] - Promise based HTTP client for the browser and node.js
- [Jest] - Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
- [SonarQube] - SonarQube empowers all developers to write cleaner and safer code.

  [sonarqube]: https://www.sonarqube.org/
  [node.js]: http://nodejs.org
  [axios]: https://www.npmjs.com/package/axios
  [jest]: https://jestjs.io/
