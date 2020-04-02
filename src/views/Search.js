import React from 'react';
import { Link } from 'react-router-dom';
import Book from '../components/Book';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: []
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
            <input type="text" placeholder="Search by title or author" />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.result.map(el => <Book item={el} key={el.id}/>)}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search;