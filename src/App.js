import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import MyRead from './views/MyRead';
import Search from './views/Search';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allBooks: [],
      currentlyReading: [],
      wantToRead: [],
      read: []
    }
  }

  addNewBook = (items) => {
    //add items to allBooks; search result will be local state in Search component.
    //only selected ones will be added as newBooks and save to server.
    console.log(items);
  }

  changeCategoryInAll = (old, item) => {
    this.setState((state) => {
      state[old] = state[old].filter(el => el.id !== item.id);
      state[item.shelf].push(item);
      //update category in the backend; "none" is not supported shelf in backend, so "none" option is deleted in Book;
      BooksAPI.update(item, item.shelf);
      return state;
    });
  }

  componentDidMount() {
    //getAll books to store in state.allBooks
    BooksAPI.getAll().then((data) => {
      this.setState((state) => {
        state.allBooks = data;
        const categorized = state.allBooks.reduce((prev, curr) => {
          prev[curr.shelf].push(curr);
          return prev;
        }, {
          currentlyReading: [],
          wantToRead: [],
          read: []
        });
        Object.assign(state, categorized);
        return state;
      });
    })
  }

  render() {
    return (
      <Router>
        <div id="root">
          <div className="app">
            <Route exact path="/">
              <MyRead {...this.state} changeShelf={this.changeCategoryInAll} />
            </Route>
            <Route path="/search">
              <Search addBook={this.addNewBook} />
            </Route>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;