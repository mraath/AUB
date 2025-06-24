import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import styles from './ContactForm.module.css'; // Import CSS Modules
import Image from 'next/image';

// --- Interfaces ---
interface FormData {
  destinations: string[];
  adults: number;
  children: number;
  notsurepeople: boolean;
  arrival: string;
  departure: string;
  unsuretravel: boolean;
  travelstyle: string;
  name: string;
  surname: string;
  email: string;
  emailconfirm: string;
  phone: string;
  verify: string;
  message: string;
}

interface Errors {
  [key: string]: string | null;
}

// --- Component ---
const ContactForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    destinations: [],
    adults: 2,
    children: 0,
    notsurepeople: false,
    arrival: '',
    departure: '',
    unsuretravel: false,
    travelstyle: 'stylish', // Default value
    name: '',
    surname: '',
    email: '',
    emailconfirm: '',
    phone: '',
    verify: '',
    message: '',
  });
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [verificationImage, setVerificationImage] = useState<string>('');
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [submissionResult, setSubmissionResult] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const [userClickedSubmit, setUserClickedSubmit] = useState<boolean>(false); // Track if submit was attempted

  const destinationsList = [
    'Botswana', 'South Africa', 'Zimbabwe', 'Zambia', 'Namibia', 'Tanzania',
    'Kenya', 'Rwanda', 'Malawi', 'Uganda', 'Mauritius', 'Mozambique',
    'Seychelles', 'Maldives', 'Zanzibar', 'Madagascar', 'Not sure'
  ];

  // --- Effects ---
  useEffect(() => {
    // Generate verification code and image on mount
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setVerificationCode(code);
    setVerificationImage(generateVerificationImage(code));
  }, []);

  // --- Handlers ---
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      if (name === 'destinations') {
        const targetValue = (e.target as HTMLInputElement).value; // Get value from checkbox
        setFormData(prev => ({
          ...prev,
          destinations: checked
            ? [...prev.destinations, targetValue]
            : prev.destinations.filter(dest => dest !== targetValue),
        }));
         // Clear destinations error if a selection is made
         if (checked && errors.destinations) {
            setErrors(prev => ({ ...prev, destinations: null }));
         }
      } else {
        setFormData(prev => ({ ...prev, [name]: checked }));
         // Clear related errors when checkboxes are toggled
         if (name === 'notsurepeople' && errors.adults) {
             setErrors(prev => ({ ...prev, adults: null }));
         }
         if (name === 'unsuretravel' && errors.dates) {
             setErrors(prev => ({ ...prev, dates: null }));
         }
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    // Clear specific error when user starts typing in corresponding input
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
    if (name === 'emailconfirm' && errors.emailconfirm) {
       setErrors(prev => ({ ...prev, emailconfirm: null }));
    }
     if (name === 'verify' && errors.verify) {
       setErrors(prev => ({ ...prev, verify: null }));
    }
     if ((name === 'arrival' || name === 'departure') && errors.dates) {
        setErrors(prev => ({ ...prev, dates: null }));
     }
  };


  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, travelstyle: e.target.value }));
  };

  const generateVerificationImage = (code: string): string => {
    // Basic SVG generation - can be enhanced for better anti-bot features
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="40" viewBox="0 0 100 40">
        <rect width="100%" height="100%" fill="#f0f0f0"/>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="#333" style="letter-spacing: 5px; font-weight: bold;">
          ${code}
        </text>
        {/* Add some noise lines */}
        <line x1="0" y1="${Math.random() * 40}" x2="100" y2="${Math.random() * 40}" stroke="#bbb" stroke-width="1"/>
        <line x1="0" y1="${Math.random() * 40}" x2="100" y2="${Math.random() * 40}" stroke="#bbb" stroke-width="1"/>
      </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Errors = {};
    let isValid = true;

    if (step === 1 && formData.destinations.length === 0) {
      newErrors.destinations = 'Please select at least one destination.';
      isValid = false;
    }
    if (step === 2 && !formData.notsurepeople && formData.adults < 1) {
        newErrors.adults = 'Please specify at least one adult.';
        isValid = false;
    }
    if (step === 3 && !formData.unsuretravel && (!formData.arrival || !formData.departure)) {
        newErrors.dates = 'Please select arrival and departure dates, or check "Not sure".';
        isValid = false;
    }
     if (step === 3 && !formData.unsuretravel && formData.arrival && formData.departure && formData.arrival >= formData.departure) {
        newErrors.dates = 'Departure date must be after arrival date.';
        isValid = false;
    }
    // Step 4 (Travel Style) always valid as it has a default

    if (step === 5) {
      if (!formData.name || formData.name.length < 2) {
        newErrors.name = 'Name is required (min 2 chars).';
        isValid = false;
      }
      if (!formData.surname || formData.surname.length < 2) {
        newErrors.surname = 'Surname is required (min 2 chars).';
        isValid = false;
      }
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!formData.email || !emailRegex.test(formData.email)) {
        newErrors.email = 'Valid email is required.';
        isValid = false;
      }
       if (!formData.emailconfirm || formData.email.toLowerCase() !== formData.emailconfirm.toLowerCase()) {
        newErrors.emailconfirm = 'Emails do not match.';
        isValid = false;
      }
      if (!formData.verify) {
        newErrors.verify = 'Verification code is required.';
        isValid = false;
      } else if (formData.verify !== verificationCode) {
        newErrors.verify = 'Verification code is incorrect.';
        // Regenerate code on incorrect attempt
        const newCode = Math.floor(1000 + Math.random() * 9000).toString();
        setVerificationCode(newCode);
        setVerificationImage(generateVerificationImage(newCode));
        isValid = false;
      }
       // Phone is optional
       // Message is optional
    }

    setErrors(newErrors);
    return isValid;
  };


  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 5) {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setUserClickedSubmit(true); // Mark that user attempted submission

    if (!validateStep(5)) {
      console.log("Validation failed", errors);
      return; // Stop submission if validation fails
    }

    setIsSubmitting(true);
    setSubmissionResult('');

    const params = new URLSearchParams();
    params.append('name', formData.name);
    params.append('surname', formData.surname);
    params.append('email', formData.email);
    params.append('phone', formData.phone);
    params.append('message', formData.message);
    params.append('verify', formData.verify);
    params.append('num', verificationCode); // Send the original code for server-side check if needed
    params.append('destinations', formData.destinations.join(', '));
    params.append('adults', formData.adults.toString());
    params.append('children', formData.children.toString());
    params.append('notsurepeople', formData.notsurepeople.toString());
    params.append('arrival', formData.arrival);
    params.append('departure', formData.departure);
    params.append('unsuretravel', formData.unsuretravel.toString());
    params.append('travelstyle', formData.travelstyle);

    const url = `https://services.africaunwind.com/contact2.php?${params.toString()}`;

    try {
      const response = await fetch(url);
      const textResponse = await response.text(); // Read response as text first

      if (!response.ok) {
        // Attempt to parse error if JSON, otherwise use text
        let errorData = textResponse;
        try {
            const jsonError = JSON.parse(textResponse);
            errorData = jsonError.message || JSON.stringify(jsonError);
        } catch (parseError) { // eslint-disable-line @typescript-eslint/no-unused-vars
            // Keep textResponse if it's not JSON, ignore parse error
        }
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData}`);
      }

      // --- Success Handling ---
      // If response.ok was true, we treat it as a success.
      let messageFromServer = '';
      try {
          // Attempt to parse as JSON first, expecting { "data": "..." }
          const jsonData = JSON.parse(textResponse);
          if (jsonData && typeof jsonData.data === 'string') {
              messageFromServer = jsonData.data;
          } else {
              // If JSON parsing works but no 'data' field, use raw text
              messageFromServer = textResponse;
          }
      } catch (jsonParseError) { // eslint-disable-line @typescript-eslint/no-unused-vars
          // If JSON parsing fails, assume plain text response
          messageFromServer = textResponse;
      }

      // Format the message received from the server
      const formattedMessage = messageFromServer
                                  .replace(/\\n/g, '<br/>')
                                  .replace(/\\r/g, '')
                                  .replace(/\\"/g, '"') // Handle escaped quotes
                                  .replace(/^"|"$/g, ''); // Remove potential surrounding quotes

      setSubmissionResult(formattedMessage);
      setFormSubmitted(true); // Mark form as submitted successfully

    } catch (error: unknown) { // This catch handles fetch errors (network, non-2xx status)
      console.error('Submission error:', error);
      let errorMessage = 'An error occurred. Please try again.';
      if (error instanceof Error) {
        errorMessage = `An error occurred: ${error.message}`;
      } else if (typeof error === 'string') {
        errorMessage = `An error occurred: ${error}`;
      }
      setSubmissionResult(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Render Logic ---
  const renderStep = () => {
    switch (currentStep) {
      case 1: // Destinations
        return (
          <div className={`${styles.destinations} ${styles.section}`}>
            <h4 className={styles.h4class}>Choose...&nbsp;Your travel destination(s).</h4>
            {errors.destinations && <p className={styles.errorMessage}>{errors.destinations}</p>}
            <div className={styles.row}>
              <div className={`${styles.row} ${styles.flexrow} ${styles.noselect}`}>
                {destinationsList.map((dest) => {
                  const destId = dest.toLowerCase().replace(/\s+/g, '');
                  return (
                    <div key={destId}>
                      <input
                        type="checkbox"
                        hidden
                        value={destId} // Use consistent ID/value
                        id={destId}
                        name="destinations"
                        checked={formData.destinations.includes(destId)}
                        onChange={handleInputChange}
                      />
                      <label htmlFor={destId}>{dest}</label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      case 2: // Travelers
        return (
          <div className={styles.section}>
            <h4 className={styles.h4class}>Choose...&nbsp;The number of adults & children.</h4>
            {errors.adults && <p className={styles.errorMessage}>{errors.adults}</p>}
            <div className={styles.row}>
              <div className={`${styles.colleft} ${styles.peoplelabel}`}>Adults</div>
              <div className={styles.colright}>
                <div
                  className={`${styles.btnsmall} ${styles.noselect} ${styles.noleftmargin}`}
                  onClick={() => !formData.notsurepeople && setFormData(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))}
                  style={{ cursor: formData.notsurepeople ? 'not-allowed' : 'pointer', opacity: formData.notsurepeople ? 0.5 : 1 }}
                > - </div>
                <div className={styles.numberwidth}>{formData.notsurepeople ? '-' : formData.adults}</div>
                <div
                  className={`${styles.btnsmall} ${styles.btnmore} ${styles.noselect}`}
                  onClick={() => !formData.notsurepeople && setFormData(prev => ({ ...prev, adults: prev.adults + 1 }))}
                   style={{ cursor: formData.notsurepeople ? 'not-allowed' : 'pointer', opacity: formData.notsurepeople ? 0.5 : 1 }}
                > + </div>
              </div>
            </div>
            <div className={styles.row}>
              <div className={`${styles.colleft} ${styles.peoplelabel}`}>Children under 12</div>
              <div className={styles.colright}>
                <div
                  className={`${styles.btnsmall} ${styles.noselect} ${styles.noleftmargin}`}
                  onClick={() => !formData.notsurepeople && setFormData(prev => ({ ...prev, children: Math.max(0, prev.children - 1) }))}
                   style={{ cursor: formData.notsurepeople ? 'not-allowed' : 'pointer', opacity: formData.notsurepeople ? 0.5 : 1 }}
                > - </div>
                <div className={styles.numberwidth}>{formData.notsurepeople ? '-' : formData.children}</div>
                <div
                  className={`${styles.btnsmall} ${styles.btnmore} ${styles.noselect}`}
                  onClick={() => !formData.notsurepeople && setFormData(prev => ({ ...prev, children: prev.children + 1 }))}
                   style={{ cursor: formData.notsurepeople ? 'not-allowed' : 'pointer', opacity: formData.notsurepeople ? 0.5 : 1 }}
                > + </div>
              </div>
            </div>
            <div className={`${styles.row} ${styles.flexrow} ${styles.noselect}`}> {/* Not Sure */}
              <div>
                <input
                  type="checkbox"
                  hidden
                  id="notsurepeople"
                  name="notsurepeople"
                  checked={formData.notsurepeople}
                  onChange={handleInputChange}
                />
                <label htmlFor="notsurepeople">Not sure</label>
              </div>
            </div>
          </div>
        );
      case 3: // --- Step 3: Dates ---
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        return (
          <div className={styles.section}>
            <h4 className={styles.h4class}>Choose...&nbsp;Your travel dates.</h4>
             {errors.dates && <p className={styles.errorMessage}>{errors.dates}</p>}
            <div className={`${styles.row} ${styles.daterow}`}>
              <div className={`${styles.colleft} ${styles.travellabel}`}>Arrival</div>
              <div className={styles.colright}>
                <div>
                  <input
                    type="date"
                    id="arrival"
                    name="arrival"
                    aria-label="Arrival date"
                    min={today} // Prevent selecting past dates
                    value={formData.arrival}
                    onChange={handleInputChange}
                    className={`${styles.date} ${errors.dates ? styles.errorline : ''}`}
                    disabled={formData.unsuretravel}
                    style={{ opacity: formData.unsuretravel ? 0.5 : 1 }}
                  />
                </div>
              </div>
            </div>
            <div className={`${styles.row} ${styles.daterow}`}>
              <div className={`${styles.colleft} ${styles.travellabel}`}>Departure</div>
              <div className={styles.colright}>
                <div>
                  <input
                    type="date"
                    id="departure"
                    name="departure"
                    aria-label="Departure date"
                    min={formData.arrival || today} // Departure must be after arrival or today
                    value={formData.departure}
                    onChange={handleInputChange}
                    className={`${styles.date} ${errors.dates ? styles.errorline : ''}`}
                     disabled={formData.unsuretravel || !formData.arrival} // Also disable if arrival is not set
                     style={{ opacity: formData.unsuretravel || !formData.arrival ? 0.5 : 1 }}
                  />
                </div>
              </div>
            </div>
            
            <div className={`${styles.row} ${styles.flexrow} ${styles.noselect}`}>
              <div>
                <input
                  type="checkbox"
                  hidden
                  id="unsuretravel"
                  name="unsuretravel"
                  checked={formData.unsuretravel}
                  onChange={handleInputChange}
                />
                <label htmlFor="unsuretravel">Not sure</label>
              </div>
            </div>
          </div>
        );
      case 4: // --- Step 4: Style ---
        return (
          <div className={styles.section}>
            <h4 className={styles.h4class}>Choose...&nbsp;Your travel style.</h4>
            <div className={`${styles.row} ${styles.stylerow}`}>
              <div className={styles.colleft} id="style-charming-label">
                <div className={styles.styleHeading}>Charming</div>
                <div className={styles.stylePrice}>USD $3,000 - USD $6,000</div>
                <div className={styles.stylePP}>per person</div>
              </div>
              <div className={styles.colright}>
                  <label className={styles.radiocontainer}>
                    <input
                      type="radio"
                      id="charming"
                      name="travelstyle"
                      value="charming"
                      aria-labelledby="style-charming-label style-charming-desc"
                      checked={formData.travelstyle === 'charming'}
                      onChange={handleRadioChange}
                    />
                    <span className={styles.radiocheckmark}></span>
                     <span id="style-charming-desc" className={styles.styleDescription}> I appreciate good value, but don&apos;t want to compromise on experience. </span>
                  </label>
              </div>
            </div>
            <div className={`${styles.row} ${styles.stylerow}`}>
              <div className={styles.colleft} id="style-stylish-label">
                <div className={styles.styleHeading}>Stylish</div>
                <div className={styles.stylePrice}>USD $6,000 - USD $12,000</div>
                <div className={styles.stylePP}>per person</div>
              </div>
              <div className={styles.colright}>
                  <label className={styles.radiocontainer}>
                    <input
                      type="radio"
                      id="stylish"
                      name="travelstyle"
                      value="stylish"
                      aria-labelledby="style-stylish-label style-stylish-desc"
                      checked={formData.travelstyle === 'stylish'}
                      onChange={handleRadioChange}
                    />
                    <span className={styles.radiocheckmark}></span>
                     <span id="style-stylish-desc" className={styles.styleDescription}>I love stylish interiors & amazing experiences.</span>
                  </label>
              </div>
            </div>
            <div className={`${styles.row} ${styles.stylerow}`}>
              <div className={styles.colleft} id="style-exclusive-label">
                <div className={styles.styleHeading}>Exclusive</div>
                <div className={styles.stylePrice}>USD $12,000 +</div>
                <div className={styles.stylePP}>per person</div>
              </div>
              <div className={styles.colright}>
                  <label className={styles.radiocontainer}>
                    <input
                      type="radio"
                      id="exclusive"
                      name="travelstyle"
                      value="exclusive"
                      aria-labelledby="style-exclusive-label style-exclusive-desc"
                      checked={formData.travelstyle === 'exclusive'}
                      onChange={handleRadioChange}
                    />
                    <span className={styles.radiocheckmark}></span>
                     <span id="style-exclusive-desc" className={styles.styleDescription}> I prefer accommodation of the highest standard & usually opt for exclusive experiences. </span>
                  </label>
              </div>
            </div>
          </div>
        );
      case 5: // --- Step 5: Contact & Verify ---
        return (
          <div className={`${styles.section} ${styles.contact} ${currentStep === 5 ? styles.sectionlast : ''}`}>
            <h4 className={styles.h4class}>Choose...&nbsp;How we can reach you.</h4>
            <div className={`${styles.row} ${styles.contactrow}`}>
              <div className={`${styles.colleft} ${styles.colleftrow}`}> Name<span className={styles.required}>*</span></div>
              <div className={styles.colright}>
                <input
                  type="text"
                  name="name"
                  autoComplete="given-name"
                  id="name"
                  required
                  placeholder="Mary"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`${styles.contacttext} ${errors.name ? styles.errorline : ''}`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
              </div>
               {errors.name && <p id="name-error" className={styles.errorMessage}>{errors.name}</p>}
            </div>
            <div className={`${styles.row} ${styles.contactrow}`}>
              <div className={`${styles.colleft} ${styles.colleftrow}`}> Surname<span className={styles.required}>*</span></div>
              <div className={styles.colright}>
                <input
                  type="text"
                  name="surname"
                  autoComplete="family-name"
                  id="surname"
                  required
                  placeholder="Jones"
                  value={formData.surname}
                  onChange={handleInputChange}
                  className={`${styles.contacttext} ${errors.surname ? styles.errorline : ''}`}
                   aria-invalid={!!errors.surname}
                  aria-describedby={errors.surname ? "surname-error" : undefined}
                />
              </div>
               {errors.surname && <p id="surname-error" className={styles.errorMessage}>{errors.surname}</p>}
            </div>
            <div className={`${styles.row} ${styles.contactrow}`}>
              <div className={`${styles.colleft} ${styles.colleftrow}`}> Email<span className={styles.required}>*</span></div>
              <div className={styles.colright}>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  id="email"
                  required
                  placeholder="mary.jones@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`${styles.contacttext} ${errors.email ? styles.errorline : ''}`}
                   aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
              </div>
               {errors.email && <p id="email-error" className={styles.errorMessage}>{errors.email}</p>}
            </div>
             <div className={`${styles.row} ${styles.contactrow}`}>
              <div className={`${styles.colleft} ${styles.colleftrow}`}> Confirm Email<span className={styles.required}>*</span></div>
              <div className={styles.colright}>
                <input
                  type="email"
                  name="emailconfirm"
                  autoComplete="email"
                  id="emailconfirm"
                  required
                  placeholder="Confirm your email"
                  value={formData.emailconfirm}
                  onChange={handleInputChange}
                  className={`${styles.contacttext} ${errors.emailconfirm ? styles.errorline : ''}`}
                   aria-invalid={!!errors.emailconfirm}
                  aria-describedby={errors.emailconfirm ? "emailconfirm-error" : undefined}
                />
              </div>
               {errors.emailconfirm && <p id="emailconfirm-error" className={styles.errorMessage}>{errors.emailconfirm}</p>}
            </div>
            <div className={`${styles.row} ${styles.contactrow}`}>
              <div className={`${styles.colleft} ${styles.colleftrow}`}> Phone </div>
              <div className={styles.colright}>
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  id="phone"
                  placeholder="+1 234 567 890"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
             <div className={`${styles.row} ${styles.contactrow} ${styles.verify}`}>
              <div className={`${styles.colleft} ${styles.colleftrow}`}> Verify<span className={styles.required}>*</span></div>
              <div className={`${styles.colright} ${styles.verificationContainer}`}> {/* Added container */}
                <input
                  type="text"
                  name="verify"
                  autoComplete="off"
                  id="verify"
                  required
                  placeholder="Enter code"
                  value={formData.verify}
                  onChange={handleInputChange}
                  className={`${styles.contacttext} ${errors.verify ? styles.errorline : ''}`}
                   aria-invalid={!!errors.verify}
                  aria-describedby={errors.verify ? "verify-error" : undefined}
                />
                <span className={styles.typecode}>Type code</span>
                {verificationImage && (
                  <Image fill src={verificationImage} alt="Verification Code" className={styles.verificationImage} />
                )}
                
              </div>
               
            </div>
            {errors.verify && (
            <div id="verify-error" className={`${styles.row}`}>
              <div className={`${styles.colleft} ${styles.colleftrow}`}></div>
              <div id="verify-error" 
               className={`${styles.colright} ${styles.errorMessage} ${styles.errorverify}`}>{errors.verify}</div>
            </div>)}

            <div className={`${styles.row} ${styles.contactrow} ${styles.tellmore}`}>
              <div className={`${styles.colleft} ${styles.colleftrow}`}> Tell us more </div>
              <div className={styles.colright}>
                <textarea
                  name="message"
                  id="message"
                  rows={3}
                  placeholder="Any specific interests or requirements?"
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (formSubmitted) {
    return (
      <div className={styles.container}>
        <div className={`${styles.section} ${styles.contact}`}>
          <div className={`${styles.messageContent} ${
            submissionResult.includes("failed") || submissionResult.includes("error")
              ? styles.submissionError 
              : styles.submissionSuccess
          }`}>
            <h4 className={styles.h4class}>Enquiry Sent</h4>
            <div
              dangerouslySetInnerHTML={{ 
                __html: submissionResult
                  .split(/\n\n+/) // Split on double or more newlines
                  .map(paragraph => 
                    paragraph
                      .trim()
                      .replace(/\n/g, ' ') // Replace single newlines with spaces
                  )
                  .join('<br /><br />') // Join paragraphs with double breaks
              }} 
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <form className={styles.contactusform} onSubmit={handleSubmit} noValidate>
        {renderStep()}

        {/* Navigation */}
        <div className={styles.navigationButtons}>
          {currentStep >= 1 && (
            <button type="button" onClick={handlePrevStep} className={`${styles.btnsmall} ${styles.prevButton}`}>
              {'< Prev'}
            </button>
          )}
          {currentStep < 5 && (
            <button type="button" onClick={handleNextStep} className={`${styles.btnsmall} ${styles.btnmore} ${styles.nextButton}`} style={{ marginLeft: 'auto' }}>
              {'Next >'}
            </button>
          )}
          {currentStep === 5 && (
            <button type="submit" disabled={isSubmitting} className={styles.submitButton} style={{ marginLeft: 'auto' }}>
              {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
            </button>
          )}
        </div>

        {/* Progress Indicator */}
        <div className={styles.rowend}>
          <div className={styles.progress}>{currentStep} of 5</div>
        </div>

         {/* General Submission Error Area (if not success) */}
         {userClickedSubmit && !formSubmitted && submissionResult && !submissionResult.includes("Thank you") && (
             <div
                 className={`${styles.submissionResult} ${styles.submissionError}`}
                 dangerouslySetInnerHTML={{ __html: submissionResult }}
             />
         )}
      </form>
    </div>
  );
};

export default ContactForm;