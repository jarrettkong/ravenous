import React from 'react';
import './SearchBar.css';

const sortByOptions = {
  'Best Match': 'best_match',
  'Highest Rated': 'rating',
  'Most Reviewed': 'review_count'
}

function getSortByClass(sortByOption) {
  if (this.state.sortBy === sortByOption) {
    return 'active';
  } else {
    return '';
  }
  // return this.state.sortBy === sortByOption ? 'active' : '';
}

function handleSortByChange(sortByOption) {
  this.setState({
    term: '',
    location: '',
    sortBy: sortByOption
  });
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      location: '',
      sortBy: 'best_match'
    };
  }

  renderSortByOptions() {
    return Object.keys(sortByOptions).map(sortByOption => {
      const sortByOptionValue = sortByOptions[sortByOption];
      return <li key={sortByOptionValue} className={getSortByClass(sortByOptionValue)} onClick={handleSortByChange.bind(this, sortByOptionValue)}>{sortByOption}</li>;
    });
  }

  render() {
    return (
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>
            {this.renderSortByOptions()}
          </ul>
        </div>
        <div className="SearchBar-fields">
          <input placeholder="Search Businesses" />
          <input placeholder="Where?" />
        </div>
        <div className="SearchBar-submit">
          <a>Let's Go</a>
        </div>
      </div>
    );
  }
}

export default SearchBar;
