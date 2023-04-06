import React, { useState } from 'react';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import useStyles from './SearchBarStyle';

interface SearchBarProps {
  // height?: number;
  // borderWidth?: number;
  // borderColor?: string;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  // height = 40,
  // borderWidth = 1,
  // borderColor = '#ccc',
  onSearch,
}) => {
  const {classes} = useStyles();
  const [query, setQuery] = useState('');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search"
          className={classes.inputInput}
          inputProps={{ style: {fontWeight:"400",fontSize:"12px",lineHeight:"18px",color:"#838383"} }}
          value={query}
          onChange={handleQueryChange}
        />
      </div>
    </form>
  );
};

export default SearchBar;
