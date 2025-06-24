import { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';

interface SearchResult {
  title: string;
  excerpt: string;
  url: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searchIndex, setSearchIndex] = useState<SearchResult[]>([]);

  useEffect(() => {
    // Load search index on client side
    fetch('/search-index.json')
      .then(res => res.json())
      .then(data => setSearchIndex(data));
  }, []);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const searchResults = searchIndex.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setResults(searchResults);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search..."
      />
      <div>
        {results.map((result, index) => (
          <div key={index}>
            <h3>{result.title}</h3>
            <p>{result.excerpt}</p>
            <a href={result.url}>Read more</a>
          </div>
        ))}
      </div>
    </div>
  );
}

// Generate search index at build time
export const getStaticProps: GetStaticProps = async () => {
  // Create search index from your content
  const contentDir = path.join(process.cwd(), 'public/content');
  const searchIndex: SearchResult[] = [];

  // Recursive function to get all md files
  const getFiles = (dir: string): void => {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        getFiles(filePath);
      } else if (file.endsWith('.md')) {
        const content = fs.readFileSync(filePath, 'utf-8');
        // Parse your markdown content and extract necessary information
        // Add to searchIndex array
        searchIndex.push({
          title: 'Your title extraction logic',
          excerpt: 'Your excerpt extraction logic',
          url: `/${path.relative(contentDir, filePath).replace('.md', '')}`
        });
      }
    });
  };

  getFiles(contentDir);

  // Write search index to public folder
  fs.writeFileSync(
    path.join(process.cwd(), 'public', 'search-index.json'),
    JSON.stringify(searchIndex)
  );

  return {
    props: {}
  };
};