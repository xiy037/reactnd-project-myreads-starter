import React from 'react';
import Header from '../components/Header';
import Shelf from '../components/BookShelf';
import { Link } from 'react-router-dom';

class MyReads extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: [],
      toRead: [],
      read: [],
      none: []
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.all.length !== prevProps.all.length) {
      console.log(this.props);
      this.setState((state) => {
        const categorized = this.props.all.reduce((prev, curr) => {
          switch (curr.shelf) {
            case "currentlyReading":
              prev.current.push(curr);
              break;
            case "wantToRead":
              prev.toRead.push(curr);
              break;
            case "read":
              prev.read.push(curr);
              break;
            default:
              prev.none.push(curr);
          }
          return prev;
        }, {
          current: [],
          toRead: [],
          read: [],
          none: []
        });
        state = {...categorized};
        return state;
      });
    }
    
  }

  render() {
    const { current, toRead, read, none } = this.state;
    return (
      <div className="list-books">
        <Header />
        <Shelf list={current} head="Currently Reading" />
        <Shelf list={toRead} head="Want to Read" />
        <Shelf list={read} head="Read" />
        <Shelf list={none} head="Other" />
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