import { useState } from 'react';
import Cards from './cards';
import styles from './Search.module.css';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const response = await fetch('/search-index.json');
      if (!response.ok) throw new Error('Failed to fetch search index');
      
      const searchData = await response.json();
      
      // Match the old search logic and ensure required properties exist
      const results = searchData
        .filter(item => {
          const searchableContent = [
            item.title,
            item.description,
            item.content,
            item.meta?.keywords,
            item.meta?.tags,
          ].filter(Boolean).join(' ').toLowerCase();
          
          return searchableContent.includes(searchTerm.toLowerCase());
        })
        .map(item => ({
          ...item,
          // Ensure required properties for Cards component
          folderName: item.path || '',
          type: 'page',
          isFolder: false,
          // Preserve other properties
          title: item.title || '',
          description: item.description || '',
          image: item.image || '',
          parent: item.parent || '',
          meta: item.meta || {}
        }));

      // Only set results if we have valid items
      if (results.length > 0) {
        console.log("Search results found");
        setSearchResults(results);
      } else {
        setSearchResults([]);
        setError('No results found. Try different keywords.');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Search failed. Please try again.');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // ...rest of the component remains the same...


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={styles.flexcenter}>
      <div className={styles.searchcontainer}>
        <div className={styles.textfield}>
          <input
            id="searchtext"
            type="text"
            placeholder="Search for, eg. Cheetah"
            className={styles.textsearch}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div className={styles.searchbutton}>
          <button 
            id="searchbutton" 
            className={styles.btn} 
            onClick={handleSearch}
            disabled={isSearching}
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {searchResults.length > 0 && (
        <div className={styles.searchcards}>
          <Cards 
            subfolders={searchResults}
            level={0}
            params={[]}
            defaultHeading="Search Results"
          />
        </div>
      )}
    </div>
  );
}