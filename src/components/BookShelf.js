import React from 'react';
import Book from './Book';

//add event on select new category
class BookShelf extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.head}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.list.map(el => <Book item={el} key={el.id}/>)}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf;