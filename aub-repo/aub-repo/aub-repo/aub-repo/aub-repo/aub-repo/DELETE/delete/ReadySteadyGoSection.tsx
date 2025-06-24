import React from 'react';
import styles from '../Pages/Post.module.css';

const ReadySteadyGoSection = () => {
  return (
    <div>
      {/* <h2 className="text-4xl md:text-5xl text-center mb-16 font-['Dancing_Script']">
        Ready Steady Go!
      </h2> */}
      <h4 className={`${styles.readySteadyGoTitle} font-cursive text-center`}>Ready steady go</h4>
      
      <div className="space-y-12">
        <div className="flex flex-col items-center text-center">
          <div className="w-8 h-8 mb-4">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l-4 4l6 6l4-16l-18 7l4 2l2 6l3-4" />
            </svg>
          </div>
          <p className="text-gray-600">
            1. Click on Let&apos;s Plan.
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="w-8 h-8 mb-4">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-gray-600">
            2. A travel expert will curate a bespoke holiday.
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="w-8 h-8 mb-4">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-gray-600">
            3. Book & start packing.
          </p>
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <button className="bg-coral-500 text-white px-8 py-3 rounded-full uppercase tracking-wide font-medium hover:bg-coral-600 transition-colors">
          Let&apos;s Plan
        </button>
      </div>
    </div>
  );
};

export default ReadySteadyGoSection;