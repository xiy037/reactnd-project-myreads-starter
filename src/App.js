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
      allBooks: []
    }
  }

  addNewBook = (items) => {
    //add items to allBooks; search result will be local state in Search component.
    //only selected ones will be added as newBooks and save to server.
    console.log(items);
  }

  changeCategory = (book, shelf) => {
    //update category in the backend;
    //rendering books in different category is based on local state in Main component.
    console.log(book, shelf)
  }

  componentDidMount() {
    //getAll books to store in state.allBooks
    BooksAPI.getAll().then((data) => {
      this.setState((state) => {
        state.allBooks = data;
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
            <MyRead all={this.state.allBooks} changeStatus={this.changeCategory} />
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