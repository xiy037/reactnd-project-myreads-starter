import React from 'react';

function Item(props) {
  const item = props.item;
  const changeReadStatus = (e) => {
    if (item.shelf !== e.target.value) {
      const old = item.shelf;
      item.shelf = e.target.value;
      if (old !== "none") {
        props.handleSelectChange(old, item);
      } else {
        props.addBook(item);
      }
    }
  };

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${item.imageLinks && item.imageLinks.smallThumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select 
            value={item.shelf ? item.shelf : "none"}
            onChange={changeReadStatus}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none" disabled>None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{item.title}</div>
        <div className="book-authors">{item.authors ? item.authors[0] : "author"}</div>
      </div>
    </li>
  )
}

export default Item;