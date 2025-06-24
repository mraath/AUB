import React from 'react';
import Link from 'next/link';
import Image from 'next/legacy/image';

import "../../app/globals.css";
//import styles from "./styles.steps.css";
//{styles.footer}

const Steps = () => {
  return (
    <>
	<div  id="hiddenSteps" className="hiddenH3div">Ready, Steady, Go!</div>
	<div  className="areacontainer areacontainer-steps">
		<div  id="divSteps" className="area">
			<div  className="grid-container-steps">
				<div  className="grid-item-steps item1">
					<div  className="coverheading coverheading-steps">
						<div  className="h3class center">Ready, Steady, Go!</div>
					</div>
				</div>
				<div  className="gridcontainer">
					<div  className="grid">
						<div  className="griditem itemHead1">
              <Image
                src="/content/stepmouse.png"
                alt="Panning your trip step one mouse"
                width={32}
                height={32}
              />
            </div>
            <div  className="griditem itemText1 textmargin"> 1. Click on Let&apos;s Plan. </div>
            <div  className="griditem itemHead2">
            <Image
                src="/content/stepnotebook.png"
                alt="Panning your trip step two notebook"
                width={32}
                height={32}
              />
            </div>
            <div  className="griditem itemText2 textmargin"> 2. A travel expert will curate a bespoke holiday. </div>
            <div  className="griditem itemHead3">
              <Image
                src="/content/stepsuitecase.png"
                alt="Panning your trip step three suitecase"
                width={32}
                height={32}
              />

              </div>
              <div  className="griditem itemText3 textmargin"> 3. Book &amp; start packing. </div>
            </div>
          </div>
          <div  className="btncontainer">
            <Link  href="/contact-us/">
              <button  aria-label="Lets plan" className="btn pink round-steps"> Let&apos;s Plan </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Steps;