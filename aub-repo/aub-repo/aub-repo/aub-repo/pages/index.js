// components/Header.js
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import Link from 'next/link';


import { useState, useEffect } from 'react';
import MenuNav from '../components/legacy/menunav';
import AUHeader from "../components/layout/AUHeader";
import Areas from '../components/legacy/Areas';
import AUArticle from "../components/layout/AUArticle";
import Destinations from '../components/legacy/Destinations';
import WhyUs from '../components/legacy/WhyUs';
import Trips from '../components/legacy/Trips';
import Steps from '../components/legacy/steps';
import Instagram from '../components/legacy/instagram';
import FooterNav from '../components/legacy/footernav';

import styles from './Post.module.css';

export default function Header({ 
  //frontmatter, 
  content, 
  //h2Title, 
  h3Title, 
  whatWeLoveItems, 
  //firstParagraph 
}) {
  const [loaded, setLoaded] = useState(false);

  // Simulate loading state
  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  const isIndex = true;
  const homeImage = "content/home.jpg";
  const homeTitle = "Africa Unwind";
  const homeSubTitle = "Your African Safari Experts";
  //const whatWeLoveItems = [];

  return (
    <>
      <MenuNav />
      {/* TOP Image and Titles */}
      <div>
        <AUHeader 
          coverImage={homeImage}
          title={homeTitle}
          subtitle={homeSubTitle}
          whatWeLoveItems={whatWeLoveItems}
          isIndex={isIndex}
          imgOffset="b45"
        />
      </div>
      <Areas />

      <div className={`${styles.backgroundgrey}`}>
        <div id="article">
          <AUArticle 
            h3Title={h3Title}
            content={content}
            level={0}
            params={{ slug: [] }}
          />

          <div className={`${styles.w100} ${styles.pt15} ${styles.pb45}`}>
            <Link  href='/what-to-expect'>
              <button  aria-label='What To Expect' className={`${styles.btn} btn ${styles.pink}`}>What To Expect</button>
            </Link>
          </div>
        </div>
      </div>
      <Destinations />
      <WhyUs />
      <Trips />
      <Steps />
      <Instagram />
      <FooterNav />
    </>
    
  );
}

export async function getStaticProps() {
  // Use process.cwd() to get the absolute path to project root
  const contentDir = path.join(process.cwd(), 'public/content');
  const cardPath = path.join(contentDir, 'card.md');
  
  console.log('Content directory:', contentDir);
  console.log('Card path:', cardPath);

  let frontmatter = {
    title: '',
    subtitle: '',
    article_title: ''
  };

  let content = '';
  //let h2Title = '';
  let h3Title = '';
  let whatWeLoveItems = [];
  let firstParagraph = '';

  try {
    
      // Check if file exists before reading
    const fileExists = await fs.access(cardPath)
      .then(() => true)
      .catch(() => false);

    if (!fileExists) {
      console.error('card.md not found at:', cardPath);
      return {
        props: {
          frontmatter,
          content: '',
          //h2Title: '',
          h3Title: '',
          whatWeLoveItems: [],
          firstParagraph: ''
        }
      };
    }


    const fileContent = await fs.readFile(cardPath, 'utf-8');
    const parsedMatter = matter(fileContent);
    frontmatter = {
      ...frontmatter,
      ...parsedMatter.data
    };

    // Get raw content
    const rawContent = parsedMatter.content;

    // Extract H2 from content
    //const h2Match = rawContent.match(/^## (.*$)/m);
    //h2Title = h2Match ? h2Match[1] : '';

    // Extract H3 from content
    const h3Match = rawContent.match(/^### (.*$)/m);
    h3Title = h3Match ? h3Match[1] : '';

    // Extract What we love items
    whatWeLoveItems = [];
    const lines = rawContent.split('\n');
    let isWhatWeLoveSection = false;

    for (let line of lines) {
      line = line.trim();
      
      if (line === '#### What we love') {
        isWhatWeLoveSection = true;
        continue;
      } else if (line.startsWith('####') && isWhatWeLoveSection) {
        isWhatWeLoveSection = false;
      } else if (isWhatWeLoveSection && line) {
        line = line.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&');
        if (line) {
          whatWeLoveItems.push(line);
        }
      }
    }

    // Process content for display
    let processedContent = rawContent
      .replace(/^# .*$/m, '')
      .replace(/^## .*$/m, '')
      .replace(/^### .*$/m, '')
      .replace(/#### What we love[\s\S]*?(?=####|$)/, '')
      .trim();

    // Split content into sections
    const sections = processedContent.split(/(#### .*\n)/);
    let remainingContent = '';

    if (sections.length > 0) {
      const firstSectionLines = sections[0].split('\n').filter(line => line.trim());
      firstParagraph = firstSectionLines.find(line => 
        line.trim() && !line.startsWith('#')
      ) || '';

      if (firstParagraph) {
        sections[0] = sections[0]
          .replace(firstParagraph, '')
          .trim();
      }

      remainingContent = sections
        .map(section => section.trim())
        .filter(section => section)
        .join('\n\n');
    }

    const reorderedContent = `${firstParagraph}\n\n${remainingContent}`.trim();
    content = marked(reorderedContent, {
      breaks: true,
      gfm: true
    });

  } catch (error) {
    console.error('Error reading or parsing root card.md:', error);
  }

  return {
    props: {
      //frontmatter,
      content,
      //h2Title: h2Title || '',
      h3Title: h3Title || '',
      whatWeLoveItems: whatWeLoveItems || [],
      //firstParagraph
    },
  };
}