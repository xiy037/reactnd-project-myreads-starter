import React from 'react';
import Header from '../components/Header';
import Shelf from '../components/BookShelf';
import { Link } from 'react-router-dom';

class MyReads extends React.Component {

  render() {
    const shelves = {
      currentlyReading: this.props.currentlyReading,
      wantToRead: this.props.wantToRead,
      read: this.props.read
    }
    return (
      <div className="list-books">
        <Header />
        {Object.entries(shelves).map(([k, v]) => <Shelf key={k} list={v} head={k} handleSelect={this.props.changeShelf}/>)}
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