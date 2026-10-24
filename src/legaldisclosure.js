
import React, { useState } from "react";


export function LegalDisclosure() {
  return (
<div className="impressum-container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6', color: '#333', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
  <h1>Legal Disclosure</h1>

  <p><strong>Provider Information in accordance with § 5 DDG / § 18 MStV</strong></p>
  
  <p>
    Vincent-Paul Kieselowski<br />
    Oberer Singoldweg 9<br />
    86845 Großaitingen<br />
  </p>

  <h3>Contact:</h3>
  <p>
    E-Mail: vkieselowski@gmail.com
  </p>

  <p>
    <em>
        Note: This online service is intended exclusively for private, 
        non-commercial purposes. It does not provide any journalistic or editorial 
        content as defined in § 18(2) of the MStV.
    </em>
  </p>
</div>
  );
}




export function PrivacyPolicy() {
  return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6', color: '#333', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', overflowY: 'auto', maxHeight: '60vh' }}>
      <h1>Privacy Policy</h1>

      <h2>1. General Information and Mandatory Disclosures</h2>
      <h3>General Information</h3>
      <p>
        The following notices provide a simple overview of what happens to your personal data when you visit this website. Personal data is all data with which you can be personally identified.
      </p>

      <h3>Data Collection on this Website</h3>
      <p>
        <strong>Who is responsible for the data collection on this website?</strong><br />
        The data processing on this website is carried out by the website operator:
      </p>
      <p>
        Vincent-Paul Kieselowski<br />
        Oberer Singoldweg 9<br />
        86845 Großaitingen, Germany<br />
        E-Mail: vkieselowski@gmail.com
      </p>
      <p>
        <strong>How do we collect your data?</strong><br />
        Your data is automatically collected when you visit the website through our IT systems (the Nginx web server). 
        These are primarily technical data (e.g., internet browser, operating system or time of page access).
      </p>

      <h2>2. General Information and Mandatory Disclosures</h2>
      <h3>Privacy Policy</h3>
      <p>
        The operator of these pages takes the protection of your personal data very seriously. We treat your 
        personal data confidentially and in accordance with the legal data protection regulations as well as 
        this privacy policy. A transfer of this data to third parties (such as NASA or NOAA) does not take place 
        through the visit of this website, as data queries to external interfaces are processed exclusively 
        server-side via our backend.
      </p>
      <h3>Note Regarding the Responsible Party</h3>
      <p>The entity responsible for data processing on this website is the person named above.</p>

      <h2>3. Data Collection on this Website (Server-Logfiles)</h2>
      <p>
        The provider of this website automatically collects and stores information in so-called server log files, 
        which your browser automatically transmits to us. These include:
      </p>
      <ul>
        <li>Browser type and version</li>
        <li>Operating system used</li>
        <li>Referrer URL (the previously visited page)</li>
        <li>Date and time of the server request</li>
        <li>IP address of the accessing computer</li>
      </ul>
      <p>
        A consolidation of this data with other data sources will not be performed.
      </p>
      <p>
        <strong>Legal basis:</strong> The collection of this data is carried out on the basis of Article 6 Paragraph 1 lit. f DSGVO. 
        The website operator has a legitimate interest in the technically error-free representation and the 
        optimization of its website - for this purpose, the server log files must be collected in order to, for example, defend against attacks 
        on the system or analyze errors.
      </p>
    </div>
  );
}

export function PrivacyPolicyToggle() {
    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

    const togglePrivacyPolicy = () => {
        setShowPrivacyPolicy(!showPrivacyPolicy);
    };
    
    return (
        <div>
            <button onClick={togglePrivacyPolicy} className="privacy-policy-button">
                {showPrivacyPolicy ? "Hide Privacy Policy" : "Show Privacy Policy"}
            </button>
            {showPrivacyPolicy && <PrivacyPolicy />}
        </div>
    );
}