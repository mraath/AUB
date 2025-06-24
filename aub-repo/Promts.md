## ALL FULL THING FOR CLINE

We will be writing a travel website, which mainly focus on 5 star luxury, custom taylored trips. Mostly to Botswana Safari, Kruger Safari, Indian ocean Islands and some cities within Africa.

The site I refer to is africaunwind.com
Please make use of the colour schemes found in that website.

I have an existing webpage, which I wrote in angular, however, adding new blog posts or changing data or images takes forever to push to my live site. My wife would type up TXT files, I would then use php to convert these to JSON files. I then used SCULLY to read these json files's values to build static pages.

I have started to convert the json files to md files in the project you are currently looking at. The only json field not yet converted to md metadata is the "schema" field, within the "data" field, which I will do at another time. Not now. All these json files are in the content folder.



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

## Menu specific

On top we have a floating menu, which scrolls out of view as you scroll down. 
Most on the left is the company name, clickable to go to the home screen.
In the middle we have the following menu items.
- Safaris, clicking on the item goes to /safaris
- Islands, clicking on the item goes to /islands
- Cities, clicking on the item goes to /cities
- Destinations, clicking on the item goes to /destinations
  - Hovering over Destinations opens a dropdown menu, inside of this menu we see:
    - 3 sections
      - Section 1 has a heading that goes across 2 columns: "Top Destinations"
        - Items under column 1:
          - "Botswana", clicking goes to /safaris/botswana
          - "Sabi Sand Reserve", clicking goes to /safaris/south-africa/kruger-national-park/sabi-sand-private-game-reserve
          - "Victoria Falls", clicking goes to /safaris/zimbabwe/victoria-falls
          - "South Africa", clicking goes to /safaris/south-africa
          - "Namibia", clicking goes to /safaris/namibia
        - Items under column 2:
          - Kruger National Park, click on this goes to /safaris/south-africa/kruger-national-park
          - Okavango Delta, click on this goes to /safaris/botswana/okavango-delta
          - Cape Town, clicking on this goes to /cities/cape-town
          - Serengeti, clicking on this goes to /safaris/tanzania/serengeti-national-park

      - Section 2, had two columns.
        - Heading for column 1 is: "Southern Africa"
          - Items:
            - Botswana, clicking here goes to /safaris/botswana
            - South Africa, clicking here goes to /safaris/south-africa
            - Zimbabwe, clicking here goes to /safaris/zimbabwe
            - Zambia, clicking here goes to /safaris/zambia
            - Namibia, clicking here goes to /safaris/namibia
            - Malawi, clicking here goes to /safaris/malawi
        - Heading for column 2 is: "Indian Ocean Islands"
          - Items:
            - Mauritius, clicking this goes to /islands/mauritius
            - Mozambique, clicking this goes to /islands/mozambique
            - Seychelles, clicking this  goes to /islands/seychelles
            - Maldives, clicking this goes to /islands/maldives
            - Zanzibar, clicking this goes to /islands/zanzibar
            - Madagascar, clicking this goes to /islands/madagascar

      - Section 3, has a heading that goes across 2 columns: "East Africa"
        - Items under column 1:
          - Tanzania, clicking on this goes to /safaris/tanzania
          - Rwanda, clicking on this goes to /safaris/rwanda
        - Items under column 2:
          - Kenya, clicking on this goes to /safaris/kenya
          - Uganda, clicking on this goes to /safaris/uganda
- Our Story, clicking on this goes to /our-story
- Blog, clicking on this goes to /blog
Most to the right is a call to action. A circle that says "Let's plan". Clicking goes to /contact-us

The main menu item (which all collapse into an hamburger bar for mobile).


## More notes

What To Expect
Top Destinations
BotswanaBotswana
Kruger National ParkKruger National Park
Sabi Sand ReserveSabi Sand Reserve
Okavango DeltaOkavango Delta
Victoria FallsVictoria Falls
Cape TownCape Town
South AfricaSouth Africa
SerengetiSerengeti
NamibiaNamibia
All Destinations
Why Us?
Price guarantee
Expert advice
Tailor-made
On Call 24hrs
Our clients are guaranteed to pay a lower rate than making a direct booking.
Our well travelled safari experts provide clients with honest and reliable advice.
Our holidays are uniquely designed and tailored to each client's requirements.
Our support line is always open - 24 hours a day. So we are always here to assist!
Our Favourite Trips
CharmingCharming
StylishStylish
ExclusiveExclusive
More Trips
Ready, Steady, Go!

1. Click on Let's Plan.

2. A travel expert will curate a bespoke holiday.

3. Book & start packing.
Let's Plan
Instagram
tree-house-safari
outside-bath-safari
island
lion-safari
cape-town-south-africa
hot-air-balloon
gorilla-trekking-safari
tented-safari
tented-outdoor-sala-safari
Explore
Safaris
Islands
Cities
Top Destinations
All Destinations
Experience
The Bucket List
Honeymoons
Family Travel
Our Favourite Trips
What To Expect
Contact
Africa Unwind
+27 21 300 1579
info@africaunwind.com
Our Story
Let's Plan
SATSA
Africa Unwind © 2021
