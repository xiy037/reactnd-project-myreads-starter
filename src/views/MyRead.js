import React from 'react';
import Header from '../components/Header';
import Shelf from '../components/BookShelf';
import { Link } from 'react-router-dom';

class MyReads extends React.Component {

  render() {
    const { currentlyReading, wantToRead, read } = this.props;
    return (
      <div className="list-books">
        <Header />
        <Shelf list={currentlyReading} head="Currently Reading" handleSelect={this.props.changeShelf}/>
        <Shelf list={wantToRead} head="Want to Read" handleSelect={this.props.changeShelf}/>
        <Shelf list={read} head="Read" handleSelect={this.props.changeShelf}/>
        <Link to="/search">
          <div className="open-search">
            <button>Add a book</button>
          </div>
        </Link>
      </div>
    )
  }
}

export default MyReads;