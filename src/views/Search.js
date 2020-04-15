import React from 'react';
import { Link } from 'react-router-dom';
import Book from '../components/Book';
import * as BooksAPI from '../BooksAPI';

const arrayContainsId = (array, id) => {
  return array.filter(el => el.id === id);
}

const compareArrayItem = (src, target) => {
    target = target.map(el => {
      const shelfBook = arrayContainsId(src, el.id);
      if (shelfBook.length > 0) {
        el.shelf = shelfBook[0].shelf;
      } else {
        el.shelf = "none";
      }
      return el;
    })
}

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      input: ''
    }
  }

  handleSearch = (e) => {
    const userInput = e.target.value.trim();
    const all = this.props.all;
    if (e.key === "Enter") {
      if (userInput !== "") {
        BooksAPI.search(userInput).then((data) => {
          if (data) {
            this.setState((state) => {
              state.result = data;
              compareArrayItem(all, state.result);
              state.input = userInput;
              console.log(state);
              return state;
            });
          }
        });
      } else {
        alert("Empty Input! Please search for valid keywords.");
        this.setState((state) => {
          state.result = [];
          return state;
        })
      }

    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author, press 'Enter' to search" onKeyPress={this.handleSearch} />
          </div>
        </div>
        <div className="search-books-results">
          {this.state.result.length > 0 && <ResultList result={this.state.result} addBook={this.props.addBook} changeShelf={this.props.changeShelf}/>}
          {this.state.result.error && <h1>No Results found for "{this.state.input}"</h1>}
        </div>
      </div>
    )
  }
}

function ResultList(props) {
  return (
    <ol className="books-grid">
      {props.result.map(el => <Book item={el} key={el.id} addBook={props.addBook} handleSelectChange={props.changeShelf}/>)}
    </ol>
  );
}

export default Search;