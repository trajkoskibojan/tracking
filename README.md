Please folow this steps in order to run the app:

npm run server - It will run fake server created on port 3005 (feel free to change port if necessery inside package.json);
npm start - To Start the app , make sure server is running on the terminal as well;

In this app is squeeze as much is possible of ReactJS tools (Context(this time made as a hook so can be reused and is adjust to act as Redux - not neccessery), Higer order Component, Hooks, Utility functions, etc)

Entire data is located in db.json file

NOTE: Unfortunately Json Server fake API does not support nested routes, therefore no request can be send to the server, in our case to project array property of the object part of projects array. However most likely is the same logic i use into Main component, so should not be big deal, there is a work around implemented.

In case you need inital state data afer you make some changes:

{
"projects": [
{
"id": 1,
"name": "Posto Giusto Projects",
"description": "Web store, static web site build with JQuery",
"project": [
{
"id": 11,
"description": "Building Navbar",
"amount": 10
},
{
"id": 12,
"description": "Adding chat functionality",
"amount": 6
},
{
"id": 13,
"description": "Making slider",
"amount": 10
}
]
},
{
"id": 2,
"name": "Helmut Project",
"description": "Creating video and audio in one place",
"project": [
{
"id": 14,
"description": "Pop up window",
"amount": 2
},
{
"id": 15,
"description": "Cookies create",
"amount": 12
},
{
"id": 16,
"description": "Multy language",
"amount": 4
}
]
},
{
"id": 3,
"name": "Periodic system of elements",
"description": "All elements with detail explanation",
"project": [
{
"id": 17,
"description": "Sounds exect on hover",
"amount": 3
},
{
"id": 18,
"description": "Single page for every element",
"amount": 5
},
{
"id": 19,
"description": "FIlters",
"amount": 9
}
]
}
]
}
