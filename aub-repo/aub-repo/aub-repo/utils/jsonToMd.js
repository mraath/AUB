const fs = require('fs/promises');
const path = require('path');

async function convertJsonToMd(jsonPath, mdPath) {
  try {
    const jsonData = await fs.readFile(jsonPath, 'utf8');
    const data = JSON.parse(jsonData);

    let mdContent = "";

    // Determine folder names
    const currentFolder = path.basename(path.dirname(jsonPath));
    const parentFolder = path.basename(path.dirname(path.dirname(jsonPath)));

    // Set H1, H2, H3 if they are "h1", "h2", "h3" or blank
    if (!data.data.h1 || data.data.h1 === "h1") {
      data.data.h1 = currentFolder;
    }
    if (!data.data.h2 || data.data.h2 === "h2") {
      data.data.h2 = parentFolder;
    }
    if (!data.data.h3 || data.data.h3 === "h3") {
      data.data.h3 = data.data.h1; // Use H1 value if H3 is blank or "h3"
    }

    const frontmatter = generateFrontmatter(data.data);
    mdContent += frontmatter ? `---\n${frontmatter}\n---\n\n` : '';

    if (data.data.h1) {
      mdContent += `# ${data.data.h1}\n`;
    }
    if (data.data.h2) {
      mdContent += `## ${data.data.h2}\n`;
    }
    if (data.data.h3) {
      mdContent += `### ${data.data.h3}\n`;
    }
    if (data.data.h1 || data.data.h2 || data.data.h3) {
      mdContent += '\n';
    }

    if (data.data.other) {
      mdContent += `${data.data.other}\n\n`;
    }

    if (data.data.reason) {
      const reasonContent = data.data.reason.split('\n').map(line => {
        if (line.trim().toUpperCase() === line.trim()) {
          return `#### ${line.trim()}\n`;
        } else {
          return line.trim() + '\n';
        }
      }).join('');
      mdContent += reasonContent + '\n';
    }

    if (data.data.experience) {
      mdContent += `#### Experience\n${data.data.experience}\n\n`;
    }

    if (data.data.stay) {
      mdContent += `#### Stay\n${data.data.stay}\n\n`;
    }

    if (data.data.activities) {
      mdContent += `#### Activities\n${data.data.activities}\n\n`;
    }

    if (data.data.when) {
      mdContent += `#### When to travel\n${data.data.when}\n\n`;
    }

    if (data.data && data.data.html && data.data.html.toLowerCase() !== "html") {
      const htmlWithoutHeadings = removeHeadings(data.data.html);
      mdContent += convertHtmlToMd(htmlWithoutHeadings);
    }

    if (data.data.why) {
      mdContent += `\n## What we love\n${data.data.why}\n`;
    }

    if (data.data.overview) {
      mdContent += `\n## Overview\n${data.data.overview}\n`;
    }

    if (data.data.summary) {
      mdContent += `\n## Summary\n${data.data.summary}\n`;
    }

    await fs.writeFile(mdPath, mdContent.trim(), 'utf8');
    console.log(`Converted ${jsonPath} to ${mdPath}`);
  } catch (err) {
    console.error(`Error converting ${jsonPath}: ${err}`);
  }
}

function removeHeadings(html) {
  return html ? html.replace(/<h[1-3]\s*[^>]*>(.*?)<\/h[1-3]>/gi, '') : "";
}

function generateFrontmatter(data) {
  let frontmatter = '';
  const ignoredFields = [
    "foldername", "images", "url", "alt1", "alt2", "alt3", "alt4", "alt5", "alt6", "alt7", "alt8",
    "html", "h1", "h2", "h3", "why", "reason", "schema", "experience", "stay", "activities", "when", "other", "overview", "summary"
  ];

  for (const key in data) {
    if (ignoredFields.includes(key)) {
      continue;
    }

    let value = data[key];

    if ((key === 'lodges' || key === 'inclusions' || key === 'exclusions') && typeof value === 'string') {
      // Handle multiline lodges, inclusions, and exclusions fields
      const lines = value.split('\n').map(line => line.trim()).filter(line => line);
      if (lines.length > 1) {
        frontmatter += `${key}: |\n`;
        for (const line of lines) {
          frontmatter += `  ${line.replace(/&/g, '&amp;').replace(/:/g, '&#58;')}\n`;
        }
        continue;
      }
    }

    if ((key === 'areas' || key === 'title') && typeof value === 'string') {
      // Handle areas and title fields as single lines
      value = value.replace(/\\n/g, ' ').trim();
    }

    if (key.startsWith('alt')) {
      const imageIndex = parseInt(key.slice(3));
      value = data.images && data.images.length >= imageIndex ? data.images[imageIndex - 1] : "";
    } else if (typeof value === 'object') {
      value = JSON.stringify(value);
    } else if (typeof value === 'boolean') {
      value = value.toString();
    } else if (typeof value === 'string') {
      value = value.replace(/&/g, '&amp;');
      value = value.replace(/:/g, '&#58;');
      value = value.replace(/\n/g, '\\n');
      value = value.replace(/\r\n/g, '\n'); // Convert \r\n to \n here
    }

    if (typeof value === 'string' && value.includes('\n')) {  // Multiline string check
      frontmatter += `${key}: |\n`;
      const lines = value.split('\n');
      for (const line of lines) {
        frontmatter += `  ${line}\n`; // Indentation is crucial
      }
    } else {
      if (
        value !== key &&
        !(
          (key === "modified" && value === "date") ||
          (key === "created" && value === "date") ||
          (key === "pageTitle" && value === "pagetitle")
        )
      ) {
        frontmatter += `"${key}": ${value}\n`;
      }
    }
  }
  return frontmatter;
}

function convertHtmlToMd(html) {
  return html ? convertHtml(html) : "";
}

function convertHtml(html) {
  let md = html;

  md = md.replace(/<h4>(.*?)<\/h4>/gi, '#### $1\n');
  md = md.replace(/<h5>(.*?)<\/h5>/gi, '##### $1\n');
  md = md.replace(/<h6>(.*?)<\/h6>/gi, '###### $1\n');

  md = md.replace(/<p>(.*?)<\/p>/gi, '$1\n');

  md = md.replace(/<strong>(.*?)<\/strong>/gi, '**$1**');
  md = md.replace(/<b>(.*?)<\/b>/gi, '**$1**');

  md = md.replace(/<em>(.*?)<\/em>/gi, '*$1*');
  md = md.replace(/<i>(.*?)<\/i>/gi, '*$1*');

  md = md.replace(/<ul>(.*?)<\/ul>/gi, (match) => {
    return match.replace(/<li>(.*?)<\/li>/gi, '- $1\n');
  });

  md = md.replace(/<ol>(.*?)<\/ol>/gi, (match) => {
    let i = 1;
    return match.replace(/<li>(.*?)<\/li>/gi, () => `${i++}. $1\n`);
  });

  md = md.replace(/<.*?>/gi, '');

  return md.trim();
}

module.exports = { convertJsonToMd };