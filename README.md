# Moviebuff
A React application using `react hooks`, `react-router`, `react-redux`, `redux-saga`, `Rest API` and `web storage`.

## Features
- Search for a movie title
- Create a favorite list
- Create to-watch list
- Pagination

## Getting started
First of all you need to install `react`. This project uses `create-react-app`. You will not be able to run this project on your computer if you do not install the `create-react-app` environment.
```
npm install -g create-react-app
```
And then install other tools this project needs
```
npm install react-router-dom redux react-redux redux-saga
```

Since I use [themoviedb.org](https://www.themoviedb.org/documentation/api) API to retrieve the movie list, you need to get your own "API KEY" from this website and replace it in `globals.js`:
```
const API_KEY = "YOUR_OWN_API_KEY";
```

## Run the project
To run the project, In the project directory, run:
```
npm start
```

Go to this address and enjoy the app!
```
http://localhost:3000/
```

## Live Demo
Coming soon..
