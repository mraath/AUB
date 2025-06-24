# AU

## HELPFULL TOOLS

- node check-static-pages.js > page_check_results.txt
- fix-git-case
- clean_content_files.sh


## BUILD?

"build": "next build && next export && cp image-mappings.json out/",

## Helpful

Next steps:
- Clean up CONTENT with no spaces, special characters, etc
- Ensure current AU paths exists
- 

## Netlify hashes

Download from Netlify:

    Go to Deploys > Select the latest deploy > Deploy files (or download the deploy artifact).
    Find image-hashes.json in the build output (likely in the root directory, as per hashesFilePath in the script).

Commit to Repo:

    Copy the updated image-hashes.json to your local repo.




## Trying to fix Search

The old search work perfectly.
C:\Personal\AU\components\legacy\search-old.js
It would call the api:
C:\Personal\AU\api\search.js

The new search doesnt work:
C:\Personal\AU\components\legacy\Search.js
It would search json file that was created by the following script:
C:\Personal\AU\scripts\generate-search-index-new.js

So, I like the static search idea, but I think the file that creates the json lacks a lot of information saved to json... also the new search might not search correctly.

PLEASE compare with the old files and fix the NEW files.

## Generate Static JSON test for search

npm run prebuild
npm run dev

### Before each build

npm run lint

### To Build


To build all the static pages in a Next.js app, you should run:

```bash
npm run build
```

This command triggers Next.js to generate optimized static assets for your application, including static pages, using Static Site Generation (SSG) for pages that use `getStaticProps` or `getStaticPaths`. It creates a production-ready build in the `.next` directory.

Just running `npm run` without specifying a script will list available scripts in your `package.json` but won’t execute the build. If you want to confirm the build works locally, you can follow up with:

```bash
npm run start
```

This serves the built app. If you only want to generate the static files for hosting elsewhere, you can use:

```bash
next export
```

after `npm run build`, which outputs static HTML to an `out` directory (though `next export` is optional and not always needed for static sites since Next.js 12). Check your `next.config.js` to ensure static generation is configured correctly for your needs.


### Other


- Moved old files to public/legacy-page
- changed some href
- I then ran this query, and it worked! "OK, the index.html is a static scully page, which was written in angular. Please convert it to a simple html page without losing any functionality and styling."
- convert this to jsx now and test
- https://www.youtube.com/watch?v=eHB6hMiv0lw&t=182s
- break out components and test
- Redo for eg. Safaris (copy it as index.html)
- Rince repeat
- 
- HTML: Scully made pretty
- https://codebeautify.org/htmlviewer
- https://transform.tools/html-to-jsx 
- CSS: Scully made pretty 2
- https://codebeautify.org/css-beautify-minify

HTML to MD
-  https://codebeautify.org/html-to-markdown#:~:text=How%20to%20convert%20to%20Markdown%20from%20HTML%3F%201,the%20converted%20markdown%20data%20or%20save%20and%20share.
-  


     "dev": "next dev --config next.dev.config.js",
{
        source: '/legacy-route',
        destination: '/legacy-page/index.html'
      },

## Special adjustments

Header
  imgOffset="b45"
  "main-img": /optimized-images/Our-Story/9OurStory.webp

AUArticle
  "p1-margin-bottom": 1
Slug-js
  "no-gallery": 1
  "no-cards": 1
  "all-destinations": 1
Cards
  "cards-header": Travel Journal


## TESTS

- Special characters: http://localhost:3000/safaris/south-africa/kruger-national-park/sabi-sand-private-game-reserve
- 

## TODO

- When adding back image optimization, first fix folder and image names...
- CARDS: Show peers when no cards
- BACK: Also show peers
- BACK: Only when 2 levels down


- Delete incorrect folders...
  - 
- Add the card.json files
- Before adding back SCHEMA.... first get basic static files to show


It is the first time that it picked up ALL my pages. I think the MD files are now working correctly. NOW I need to resolve the following errors:




1) Please add this schema field as metadata in each md file. PLEASE NOTE that this schema has a lot of strange formatting, which will need to be considered or converted to a normal "schema" type string and then be changed into a multiline metadata element.


- BASIC BUILD STATIC PAGES DONE

- Remove ALL blank schema elements from txt
- Add only essential schema elements back via obsidian

"postbuild": "node scripts/renameFolders.js && node scripts/renameFilesToIndex.js"


## Next steps

- Copy components from old site
  - Nav
  - 

## The Cline description

HEREWITH an OVerview of what we are building. You dont have to do this now. I will guide you as to what I want next. So just wait for my question each time. Then do you thing till that one thing is done, then I will ask the next question.

SO herewith just some info on the website we are working towards.

We will be writing a travel website, which mainly focus on 5 star luxury, custom taylored trips. Mostly to Botswana Safari, Kruger Safari, Indian ocean Islands and some cities within Africa.

The site I refer to is africaunwind.com
Please make use of the colour schemes found in that website.


I have an existing webpage, which I wrote in angular, however, adding new blog posts or changing data or images takes forever to push to my live site. My wife would type up TXT files, I would then use php to convert these to JSON files. I then used SCULLY to read these json files's values to build static pages.

I have started to convert the json files to md files in the project you are currently looking at. The only json field not yet converted to md metadata is the "schema" field within the "data" field. All these json files are in the content folder.

1) Please add this schema field as metadata in each md file. PLEASE NOTE that this schema has a lot of strange formatting, which will need to be considered or converted to a normal "schema" type string and then be changed into a multiline metadata element.

My wife will use obisidian to add and edit info and images. Within the content folder each folder and subfolder is a seperate page. Each folder has eg. the md file, with the text, needed to build the page. Each folder also has images. These images have been optimised into the public folder. For each folder we need to read the md file. We then need to create a page making use of this. The metadata will be considered later to add more info on the page... eg. the "schema" mentioned earlier will be used to add SEO page header info to rank higher in SEO. We also need to use the first image as the main image, which should cover the screen. On top of this image with a bit of a shadow, we should display the H1 and H2. 

Under the H2, there will be a "Get in touch" button. I will add the styling and href later.

The "What we love" H2 header, with its lines, should be displayed in the bottom left corner on top of the cover image. Each line will be a bullet list. IF the screen size goes smaller, lets say a tablet size, it will move down below the cover image.

The H3 will only become visible as you scroll down.

Below H3 the rest of the MD article will be displayed. This should be displayed as an article. The first letter of the first line should stretch over 2 lines. The article should have 3 columns and should adjust according to screen size. I think when it is tablet size, maybe make it 2 columns, on a phone only 1 column.

Below this add a H4 with "Gallery" as topic. This will display all 8 images found within the folder. It will have 3 rows in the grid. Row 1 will have 3 images, row 2 only 2 images, row 3 will have 3 images. As you move over each image it should have a very subtle zoom in, but it should stay within its cell. The grid should have a padding of about 5px (or the em equavalent) between cells.

Below this is an H4 "Cards" which I will later flesh out. Basically it should show a card stack with all the subfolder's md info. Each card will have the main image, H1 and then a short description. They are stack one over the other and can scroll to the left. IF you hover over one, it pops up a little bit. IF you click on it, it will then open that page.

Below this is an H4 "Back", which will only appear if you are 2 or more subfolders down. It will show the parent md card as well as the parents' peer folders. It must only show the main image and the H1. If you click on it, it will go to that page.

Under this is an H4 with "Ready steady go" Make this a place holder.

Under this is an H4 with "Instagram". It will display in a 3 x 3 grid our latest instagram images.

Under this is an Footer, which I will later enhance on.

On top of the Cover image, Way on the top is a meny, which I will enhance on later.

Once all of this works I will like to use something to convert it all into static page. This will not happen now, however, I would like to do it at some point soon.

This travel site must rank HIGH for SEO. Also lazy load images. I also take each image and generate different sizes with an image convertion tool, then load the smallest image that would still look good on that screen, to speed things up.

More explanation, what I mentioned above should take more priority than what is mentioned below. The below is just to explain a bit more.
Basically I have a main folder, which is my home screen. Under this I have subfolders, eg. Safaris, Islands, Cities, which would be my 3 main areas. (There are also others eg. blogs, who we are, etc). Under eg. Safaris I would have subfolders for areas. Under this I might have countries, under this might have areas, under this might have lodges.
Each folder has the MD file, which is used for the text on the screen. This folder will also have 8 images. I then convert the MD file to an html. The top of the screen will have the first image in this folder as an images that covers the whole screen. H1 will be displayed on this, about halfway down the page, but it will resize according to the screensize. H2 will just be below this. I also have 6 main points on each page why to go to this place. As you scroll down it will then show a heading for the article. The article's FIRST letter of the first word will be bigger, about two lines. The article will have headings, links to other pages etc.
Under this I might have a section for eg. our top picks or typical places to go (it is all fed from subfolders) Our favourite trips, it is calles and I think it only displays when you are on the Safaris, Islands and Cities pages.
Under this I will show an image gallery, which consists of the 8 images in this folder. Based of the screen size I will load the correct image sizes. I display 3 in the first row, 2 in the second and 3 again in the 3rd. IF you click on the image you see it in a modal, filling the whole screen and then you have a left and right arrow to go through all of them. Under the images you will then have cards in a card strip layout. I could add an image later of how it looks. It will have a card for each sub-folder. The will display the first image on top and then the H1 and then the first few words from the article. IF you click on that you go to that "page".
Under this you will see Ready, steady, go! Section briefly explaining how things work.
Under this we show our latest 9 instagram images in an "Instagram" section. 3 by 3.
At the bottom we have our footer with some links.
On top we have a floating menu, which scrolls out of view as you scroll down. IT has our company icon on the left, then the main menu item (which all collapse into an hamburger bar for mobile).
I think this is enough to start with.
The MAIN Landing page looks quit different, but the same building block I guess.
Could you help me develop all of this.
Speed, SEO is very important to me. I have all the existing information needed for the pages and also has the currently built static pages available.
Also if we could re-use the styling and colour scheme going forward, but for now if we can just get it going.

## OTher 
th