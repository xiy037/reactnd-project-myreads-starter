import React from 'react';
import { Link } from 'react-router-dom';
import Book from '../components/Book';
import * as BooksAPI from '../BooksAPI';

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
    if (e.key === "Enter" && userInput !== "") {
      BooksAPI.search(userInput).then((data) => {
        console.log(data);
        if (data) {
          this.setState((state) => {
            state.result = data;
            state.input = userInput;
            console.log(state);
            return state;
          });
        }
      });
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
            <input type="text" placeholder="Search by title or author" onKeyPress={this.handleSearch} />
          </div>
        </div>
        <div className="search-books-results">
          {this.state.result.length > 0 && <ResultList result={this.state.result} />}
          {this.state.result.error && <h1>No Results found for "{this.state.input}"</h1>}
        </div>
      </div>
    )
  }
}

function ResultList(props) {
  return (
    <ol className="books-grid">
      {props.result.map(el => <Book item={el} key={el.id} />)}
    </ol>
  );
}

export default Search;