# Home Library Service

## Steps to run and check service locally

1. Clone repository `git clone https://github.com/rss-maksim/nodejs2022Q2-service.git`
2. Fetch feature branch `feat/basic-rest-service` by `git fetch origin feat/basic-rest-service`
3. Switch to feature branch by `git checkout feat/basic-rest-service`
4. Install dependencies `npm i`
5. Run service locally by `npm start`
6. Open `Open API` documentation in the browser [http://localhost:4000/doc](http://localhost:4000/doc/)
7. Send the following requests using Swagger or Postman (to simplify process you might import the collection in Postman which is placed in repo in the folder named `collections`)
8. To make sure everything's ok you can run tests `npm run test`

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
