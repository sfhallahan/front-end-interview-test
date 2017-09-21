### Remine Front End Interview Test

1. Obtain the list of locations from [front-end-interview-test-api](https://github.com/remineapp/front-end-interview-test-api) using the included `API.js` in **_this_** project
2. Populate the `RemineTable` component inside of `CHANGEME.js` with the locations obtained above.
3. Build out the `CHANGEME.js` view to allow a user to filter the `RemineTable` contents based on whether the location has:
    * a number of beds in a user specified **range**
    * a number of baths in a user specified **range**
    * the same building type as the one specified by the user (they can select from a list of building types, the allowable types are: `['multiFamily', 'condo', 'business', 'office', 'singleFamily']`

    If a user has not specified a bound in a range or a type for the building type, default to show all.  If no filters are active or being
    applied, all locations should be shown in the `RemineTable`.
