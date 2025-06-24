import styles from './WhyUs.module.css';

export default function WhyUs() {
  const whyUsItems = [
    { title: 'Price guarantee', description: 'Our clients are guaranteed to pay a lower rate than making a direct booking.' },
    { title: 'Expert advice', description: 'Our well travelled safari experts provide clients with honest and reliable advice.' },
    { title: 'Tailor-made', description: 'Our holidays are uniquely designed and tailored to each client\'s requirements.' },
    { title: 'On Call 24hrs', description: 'Our support line is always open - 24 hours a day. So we are always here to assist!' }
  ];

  return (
    <div id="whyus">
      <div id="hiddenWhyus" className='hiddenH3div'>Why Us?</div>
      <div className={styles.areacontainer}>
        <div id="divWhyus" className={styles.area}>
          <div className={styles.coverimg}>
            <div className={styles.coverheading}>
              <div className='h3class center'>Why Us?</div>
            </div>
          </div>
          <div className={styles.gridContainer}>
            {whyUsItems.map((item, index) => (
              <>
                <div key={`header-${index}`} className={`${styles.gridItem} ${styles[`item${index + 6}`]} ${styles.steps}`}>
                  <div>
                    <div className={styles.gridHeader}>{item.title}</div>
                  </div>
                </div>
              </>
            ))}
            {whyUsItems.map((item, index) => (
              <div key={`desc-${index}`} className={`${styles.gridItem} ${styles[`item${index + 11}`]} ${styles.whyus}`}>
                <div>
                  <div>{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}