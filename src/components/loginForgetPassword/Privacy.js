import React from 'react'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    header_main: {
        borderBottom:'1px solid lightgrey',
        boxShadow:'0px 0px 12.3px 1.1px rgba(0,0,0,0.1)'
    },
    header_content:{
        width:'92%',
        // margin:'0 auto',
        display:'flex',
        //  justifyContent:'left',
        // alignItems:'center'
    },
}));
function Privacy() {
    const classes = useStyles();
    React.useEffect(()=>{
        document.title = "Terms And Privacy Policy"
    })
  return (
    <div>
          <AppBar className={classes.header_main} color="transparent" position="static">
            <Toolbar className={classes.header_content}>
                {/* <img 
      src={process.env.PUBLIC_URL + "/greenmarketinglogo.png"}
      alt="logo"
    />
                */}
                <Typography variant="h6">
                    Greenmarketing
                </Typography>
               
            </Toolbar>
            </AppBar>
            <div className={classes.privacy_head}>
            <Typography style={{margin:'40px 0 15px 0'}} align='center' variant="h3">
            Terms And Privacy Policy
            </Typography>
            <Typography style={{margin:'10px 0 50px 0'}} align='center'>
            LAST UPDATED: 6/15/2021
            </Typography> 
            <div style={{width:'90%',margin:'0 auto'}}>
            <Typography align='left' paragraph={true}>
            Please review our Privacy Policy which constitutes the Agreement between you and Green Marketing LLC. The Privacy Policy describes how we collect and handle information that the Company gathers on or through the Services or its websites. By visiting our websites, accessing or using the Service, including browsing the website, and all other communications means with us, the user expressly consents to the collection, use, storage, processing, and disclosure of its information in accordance with our Privacy Policy. For purposes of this Privacy Policy, unless otherwise defined herein, capitalized terms used in this Privacy Policy shall have the same meaning as defined in the Terms and Conditions
            </Typography>
            <Typography style={{margin:'40px 0 15px 0'}} align='left' variant="h6">
            1. Introduction
            </Typography>
            <Typography align='left' paragraph={true}>
            Green Marketing LLC Privacy Policy contains information about collecting Customers, Visitors and other data subjects (such as Agents or/and End-users) Personal Data and other information, Services offered or performed by Green Marketing LLC and the manner of its processing. We respect the right to privacy of our software users and take reasonable steps for the Visitors, End-Users and Customers to be familiar with the manner in which rendered accessible information via the following websites www.greenmarketing.us and applications are processed. Due to the implementation of comprehensive security regulations, Personal Data provided by our Services, websites and applications is of highest security standards.
            </Typography>
            <Typography align='left' paragraph={true}>
            Green Marketing LLC complies with the Regulation (EU) 2016/679 of the European Parliament and of the Council of April 27, 2016 on the protection of natural persons with regard to the processing of personal data and on the free movement of such data and repealing Directive 95/46/EC (The General Data Protection Regulation – GDPR). We are as well committed to subjecting all Personal Data received (as well as from European Union (EU) member countries, EEA (European Economic Area) and Switzerland, in reliance on the GDPR as mentioned above.
           </Typography>
           <Typography align='left' paragraph={true}>
           Notwithstanding ​​the ruling of the Court of Justice of the European Union issued on July 16, 2020 regarding the recognition of the EU-U.S. Privacy Shield as an inadequate mechanism for the transfers of data to the United States, Green Marketing LLC is subject to the regulatory enforcement powers of the U.S. Federal Trade Commission and remains committed to comply with the Privacy Shield Framework requirements, enforceable under the U.S. that does not relieve participants in the EU-U.S. Privacy Shield program of their obligations under the EU-U.S. Privacy Shield Framework and Swiss-U.S. Privacy Shield Framework as set forth by the U.S. Department of Commerce regarding the collection, use, and retention of personal information transferred from the European Union to the United States and Switzerland in particular to the Privacy Shield Principles of:
           <ol>
               <li>Notice,</li>
               <li>Choice,</li>
               <li>Accountability for Onward Transfer,</li>
               <li>Security,</li>
               <li>Data Integrity and Purpose Limitation,</li>
               <li>Access,</li>
               <li>Recourse, Enforcement and Liability.</li>
           </ol>







Green Marketing LLC has certified to the U.S. Department of Commerce that it adheres to the Privacy Shield Principles mentioned above. If there is any conflict between the policies in this Privacy Policy and the Privacy Shield Principles, the Privacy Shield Principles shall govern. To learn more about the Privacy Shield program, and to view our certification page, please visit<a href="https://www.privacyshield.gov/">https://www.privacyshield.gov/</a> .
           </Typography>

           <Typography style={{margin:'40px 0 15px 0'}} align='left' variant="h6">
           2. Scope of Privacy Policy
            </Typography>
            <Typography align='left' paragraph={true}>
            This Privacy Policy is effective to all information collected by Green Marketing LLC from which an individual can be identified (Personal Data). This Privacy Policy applies to all users (including Customers, Agents, End-Users and users browsing Green Marketing, Inc’s. websites) regardless of the country or territory they are using Services or websites.
           </Typography>

            <Typography style={{margin:'40px 0 15px 0'}} align='left' variant="h6">
            3. Notice
            </Typography>
            <Typography align='left' paragraph={true}>
            Green Marketing LLC is responsible for the processing of Personal Data it receives under this Privacy Policy regarding providing the Service and subsequently transfers Personal Data to a Third Party Service Provider (including Sub-processors). Green Marketing LLC also enables its users to be compliant with the GDPR (including for onward transfers of Personal Data from the EU, EEA and Switzerland). With respect to Personal Data received or transferred pursuant to the Privacy Shield Framework, we are subject to the regulatory enforcement powers of the U.S. Federal Trade Commission. In certain situations Green Marketing LLC may be required to disclose Personal Data in response to lawful requests made by public authorities, including to meet national security or law enforcement requirements. Please be aware we may disclose Personal Data to respond to subpoenas, court orders or legal process, or to establish or exercise our legal rights or defend against legal claims. We may also disclose Personal Data if it is necessary in order to prevent, investigate or take action regarding any illegal activities, or as otherwise required by law.
To learn more about the Privacy Shield Framework, visit the U.S. Department of Commerce’s Privacy Shield website: <a href="https://www.privacyshield.gov/">https://www.privacyshield.gov/</a> A list of Privacy Shield participants is maintained by the Department of Commerce and is available at:<a href="https://www.privacyshield.gov/list">https://www.privacyshield.gov/list</a>. To view our certification page, please visit the aforementioned website. Under certain conditions, more fully described on the Privacy Shield website, https://www.privacyshield.gov/ you may invoke binding arbitration when other dispute resolution (referred to below) procedures have been exhausted.
           </Typography>
            <Typography style={{margin:'40px 0 15px 0'}} align='left' variant="h6">
        4. Questions and concerns

            </Typography>
            <Typography align='left' paragraph={true}>
            If you have any questions or concerns, or if you wish to access, update, amend, correct or delete, any of your Personal Data we store and process, please contact us at <a href="mailto:questions@greenmarketing.us">questions@greenmarketing.us</a> (or via support e-mail of the Service you use) or by postal mail at: Green Marketing LLC Attn: 31 N ANNAPOLIS AVE, C6, ATLANTIC CITY, NJ 08401, United States of America. 
           </Typography>
            <Typography style={{margin:'40px 0 15px 0'}} align='left' variant="h6">
            5. What information we collect
            </Typography>
            <Typography align='left' paragraph={true}>
           <ol>
               <li>Provided data</li>
               <ol type='a'>
                   <li>The purpose of gathering and processing Personal Data and other information by Green Marketing LLC is:
                    </li>
                    <ol type='a'>
                        <li>
                        to provide, maintain and facilitate the Services as well as to ensure safe and guaranteed Service performance, upgrade and improve the functionality of the Services,

                        </li>
                        <li>
                        to provide Customer with access to its Personal Data and maintain this access via standard API methods for the duration of paid usage of Services (active subscription) as well as after the subscription is expired (inactive subscription), until the Service is fully terminated by a written request (in accordance with the Agreement),

                        </li>
                        <li>
                        to secure (establish, investigate or defend) Customer’s, as well as Company’s claims that may arise due to the Services,

                        </li>
                        <li>
                        to stay connected with the Customer to present an up-to-date offer of Services and instructions or tips related to the Service.
                        </li>
                    </ol>
                    <li>Personal Data and other Customers’ information collected by Green Marketing LLC is used in order to complete registration (create an Account/ License) and at the same time to ensure Customers’ access to Green Marketing LLC ’s Services. While registering on website www.greenmarketing.us, we request that you provide us with such information as first name, last name, company name, address, website address, e-mail address in the event when a Customer continues to use our Services. Some of the provided information such as an IP address, domain, browser type, operating system type, etc. may be automatically acquired when a user visits our websites. When contacting Green Marketing LLC the Customer may be requested to render accessible analogical data to those provided while registering on our website. We may also collect information (including Personal Data) provided by Customer and related to Customer’s Agents (people employed to operate the Service), and End-users Personal Data provided in a Pre-chat survey. We also store the chat content. Please note that as you insert data (including Personal Data) through the Service to the system, you are fully responsible for lawfully obtaining such data in accordance with the applicable law, as well as a lawful processing of such data to Green Marketing LLC Details of your liability for the aforementioned data you can find in Terms and Conditions.</li>
                    <li>
                    Personal Data provided in connection with the correspondence between the Customer or Visitor and Green Marketing LLC shall be used strictly to reply to inquiries or to transfer information. We use the information you provide us (including Personal Data) in order to provide you with customer service, allowing you to view moves made by you or your Agents. When using the support section of our websites we may collect the email address, name or openID account for the purpose of allowing contact with our support team. We do it regardless if you are a Visitor, End-User or a Customer. When using our Services we may collect device information such as device type, operating system type and application version. We use this information in order to provide an optimized version of our applications for your device type. Please be aware we also collect and process data related to the use of our software and Services by our Customers and their customers (End-Users). We use such data for statistics purposes. We may use it also to improve our Services or to create and improve new services. We collect and process such data collectively and anonymously.

                    </li>
                    <li>
                    Categories of data subjects. Data subjects include Customers, Customer’s representatives and End-Users, as well as employees, Agents, contractors, collaborators. Data subjects may also include individuals attempting to communicate or transfer personal information to Customers. The data subjects exclusively determine the content of data submitted to the Company’s Service.
                    </li>
                    <li>
                    Types of Personal Data. The Personal Data processed by the Company includes email address, first name and last name, address, title, contact details, username, chat history, and other data in an electronic form provided to the system in the context of the Services.
                    </li>
                    <li>
                    Consent for processing and transferring Personal Data. The Customer hereby agrees and warrants that the processing, including the transfer of its Personal Data (including the Personal Data provided to the Company’s system through the Customer’s Account), has been and will continue to be carried out in accordance with the relevant provisions of the applicable Data Protection Laws (and, where applicable, has been notified to the relevant authorities of the Member State where the Company is established or has its representative) and does not violate the relevant provisions of that Member State.
                    </li>
                    <li>
                    Profiling Personal Data. By using our Services the Customer gives its consent to the profiling of Personal Data that was given to the Provider, for the purpose of proper maintenance and providing the Service to the Customer. The Customer agrees that the profiling of the Personal Data shall serve, in particular, the purpose of providing the Customer with content that is accurate and consistent with the scope of the Service used by the Customer. The Customer acknowledges that it has the right not to be profiled. In such cases the request can be made at any time at <a href="mailto:questions@greenmarketing.us">questions@greenmarketing.us</a>. The Parties undertake reasonable steps and efforts to eliminate profiling however in case of withdrawing the consent, the Customer is aware and acknowledges that it is tantamount to the lack of possibility to provide the Services. Withdrawing the consent is tantamount to the termination of the Agreement.
                    </li>
                    <li>
                    Data profiling consists, among others, in:
                        <ol type='a'>
                            <li>providing the user with materials such as the newsletter in accordance with the user’s location (other newsletters are sent e.g. to Europe and other to Asia),</li>
                            <li>providing the Customer with the right content, depending on whether the Customer uses the trial or paid version of the Service.</li>
                        </ol>
                    </li>
                    <li>Return or destruction of Personal Data. At Customer’s election, made by written request to the Company, the Company will and shall procure that all Sub-processors:</li>
                        <ol type ='a'>
                            <li>return a complete copy of all Customers Personal Data to the Customer,</li>
                            <li>or delete and procure the deletion of the Customers Personal Data Processed by the Company or any Sub-processor. The Company will comply with such a written request within 30 days, unless it is unworkable due to the purposes of processing or due to technical issues.</li>
                        </ol>
                    <li>
                    Retention of Copies. The Company may retain Personal Data to the extent required by applicable law and only to the extent and for such period as required by such laws and always provided that the Company shall ensure the confidentiality of all such Customer Personal Data and shall ensure that such Personal Data is only processed as necessary for the purpose(s) specified in such law requiring its storage and for no other purpose. The Customer agrees that after the termination or expiration of the Agreement its data may be stored as a backup for the time needed to secure (establish, investigate or defend) Customer’s and Company’s claims that may arise due to the performance of the Services (for the time it takes for the claims to be barred).
                    </li>
                    <li>
                    Data Protection Officer is Maciej Malesa Green Marketing LLC 31 N Annapolis Ave, C6, Atlantic City, NJ, 08401 United States of America, email: <a href="mailto:questions@greenmarketing.us">questions@greenmarketing.us</a>
                    </li>
               </ol>
               <li>
               Geo-Location data. Please be aware Green Marketing LLC may have access to your geo-location data as we collect and process IP addresses of all devices you use Green Marketing LLC’s software on. Collecting and processing your geo-location data refers to mobile devices as well as computers. It happens regardless you are a Visitor or a Customer.
               </li>
               <li>
               Communication. We will occasionally send you push notifications in order to make you aware of any outages of Service. You may opt-out of receiving these types of communications by turning off push notifications at the device level. We may also send you some emails from our blog. If you wish not to receive such notification you have an option to ‘unsubscribe’ this type of communication anytime. We will also send you notifications related to some important updates of our Services. The purpose of sending you such emails or messages is to keep you informed of the latest improvements, features and other developments. From time to time in specific situations, we may also send you some other messages, notifications or text messages. Users who leave their contact details while accessing particular sections of our website might receive additional messages not described above.

               </li>
               <li>
               Customer gives Green Marketing LLC and its affiliates royalty-free and unlimited in time consent to use the Customer’s company name, logos and other identifying information for marketing and promotional purposes in internal or external media (including but not limited to displaying on the Company’s websites) and other purposes connected with presenting up-to-date offers.

               </li>
               <li>
               Third-party Personal Data:
               </li>
               <ol type ='a'>
                   <li>
                   We allow our Customers’ to provide us with third-party Personal Data.; we mean End-Users data (Customers’ visitors/customers, people who use Services to contact the Customer) and Agents data. The information (including Personal Data) that we may collect is a first name, last name, e-mail address and other contact information. We do it in order to allow the Customer to add Agents to the Account and provide services to the End-Users. We will not use this information (including Personal Data) for any purpose which is not compliant with our Privacy Policy. Please be aware we process Personal Data of Customers’ End-users and Agents. We may also collect other information (e.g., profile picture, network, username, user ID, age range, language, country) depending on Customers’ product and Customers’ privacy settings. There are other instances where we may receive information from third parties.

                   </li>
                   <li>
                   You may separately provide registration and purchasing information to websites, apps, product or service providers through which we provide access to registration for our Service. Depending on the particular promotion, when you register for the Service through such a promotional partner of ours, that partner may provide us with a user/member name that you already use with that partner’s products or services or that you or it have otherwise pre-selected as part of the promotion. For example, when you use an external social network (like your Facebook account) to log in to the Service or to interact with us in another way, we may collect your name and other details from your social network profile and account (please see your social network’s privacy policy or support documents for more information about sharing of information with connected accounts).

                   </li>
               </ol>
               <li>
               Children personal data. We do not knowingly collect Personal Data from anyone under the age of 16. If you notice we collect and process Personal Data of anyone under the age of 16 incorrectly, please contact us at <a href="mailto:questions@greenmarketing.us">questions@greenmarketing.us</a> (or via support e-mail of the Service you use). We encourage parents and legal guardians to monitor their children’s Internet usage and to help enforce this Privacy Policy by instructing their children never to provide Personal Data through the websites or Services.

               </li>
               <li>
               Using ‘cookies’. The so-called ‘cookies’ are used while using the Services or products rendered by Green Marketing LLC or browsing any of the websites where our Services are installed. These are pieces of information sent by the server, stored on a user’s computer for the purpose of automatic identification of a particular user when using our Services. ‘Cookies’ enable us to quickly confirm users’ identity and owing to them the use of our Services becomes much easier and more widely available. ‘Cookies’ are used by Green Marketing LLC solely with the purpose of personalizing a particular user. ‘Cookies’ can be used on condition that they are accepted by a browser and that they shall not be removed from the storage media. Users who removed ‘cookies’ from their storage media or have not accepted them on their browser may not have access to the Services rendered by Green Marketing LLC The use of third-party cookies is not covered by our Privacy Policy. We do not have access or control over these cookies.

               </li>
               <li>
               Social media (features) and widget. Our websites include social media features, such as the ‘Facebook Like’ button and widgets, such as the ‘Share This’ button or interactive mini-programs that run on our sites. These features may collect your IP address, which page you are visiting on our sites, and may set a cookie to enable the feature to function properly. Social media features and widgets are either hosted by a third party or hosted directly on our sites. Your interactions with these features are governed by the privacy policy of the company providing it.

               </li>
               <li>Facebook Connect and other OpenID providers. Depending on the Service you use you may have the possibility to log in to our live chat customer support feature using sign-in services such as Facebook Connect and other OpenID providers. These services will authenticate your identity and provide you with the option to share certain Personal Data with us, such as your name and email address to pre-populate our chat form. Services like Facebook Connect give you the option to post information about your activities on this website to your profile page to share with others within your network.
</li>
           </ol>
           </Typography>
            <Typography style={{margin:'40px 0 15px 0'}} align='left' variant="h6">
            6. Data disclosure
            </Typography>
            <Typography align='left' paragraph={true}>
                <ol>
                    <li>
                    Green Marketing LLC’s main purpose of gathering Personal Data and other information is to maintain Services, ensure safe and guaranteed Services performance for its Customers, upgrade and improve functionality of its Services. Owing to the above process we exceed our Customers’ expectations, we provide a constant development of our Services the use of which becomes much easier and more convenient. In order to ensure orderly and safety functioning our Services we cooperate and use software of other entities providing services (described below). We do not sell or lease your Personal Data to any third party. We will never share, sell, rent or trade your registration and Personal Information with any marketing or promotional partners without your consent. The following are exceptions, with respect to whom we may share your Personal Data:

                    </li>
                    <ol type='a'>
                        <li>Green Marketing LLC reserves the right to disclose Personal Data to any of its parent, subsidiary, affiliated or successor company.</li>
                        <li>
                        Green Marketing LLC reserves the right to disclose and the Customer hereby agrees for the disclosure and transfer its Personal Data and other information relating to the Customer to Third Party Service Provider (including Sub-processors) such as hosting, credit card processing, customer/support services, e-mail, text messages, push notifications providers and others. On your request we can provide you with a list of entities which may have access to your Personal Data. We ensure these entities have access only to the minimum part of the Personal Data which is necessary for the proper Service provision. Green Marketing LLC shall observe due diligence to make sure the processing of data disclosed to any entities is in compliance with its Privacy Policy.

                        </li>
                        <li>
                        Personal Data can be disclosed to entities into which our company is merged, or to which our assets, site or operations have been transferred. Mentioned entities will be able to use your Personal Information under the terms of this Privacy Policy. We will notify you if any of these events occur by updating this Privacy Policy and, if practically possible, via other means.

                        </li>
                        <li>
                        You should also be aware that courts of equity, such as U.S. Bankruptcy Courts, or governmental authorities may have the authority under certain circumstances to permit your Personal Information to be shared or transferred to third parties (other than Third Party Service Provider) without your permission.

                        </li>
                    </ol>
                    <li>
                    Personal Data and other information provided by Customer shall not be disclosed to third parties unless the obligation to disclose the information to third parties results from the currently effective provisions of law, such as to comply with a subpoena, or similar legal process, when we believe in good faith that disclosure is necessary to protect our rights, protect your safety or the safety of others, investigate fraud, or respond to a government request, or if it is necessary for the Green Marketing LLC’s security and the protection of its rights, including the protection against the claims submitted by the third parties. The provided Customer’s information (including Personal Data) may be utilized in the event of breach of Terms and Conditions for the use of Services, misuse of funds, the necessity to take action against all Customer’s unlawful actions. Green Marketing LLC shall transfer no information or Personal Data to any third parties for marketing purposes. Green Marketing LLC reserves the right to use the provided Personal Data for the marketing purposes and other purposes connected with presenting an up-to-date offer of Services and instructions or tips related to Services in direct contacts with the Customer. You may opt-out from such emails at any time by following the unsubscribe instructions located at the bottom of each communication or by emailing us at <a href="mailto:questions@greenmarketing.us">questions@greenmarketing.us</a> (or via support e-mail of the Service you use).
                    </li>
                </ol>
           </Typography>
            <Typography style={{margin:'40px 0 15px 0'}} align='left' variant="h6">
            7. Sub-processors (third party service providers)
            </Typography>
            <Typography align='left' paragraph={true}>
            If Green Marketing LLC needs to use a Sub-processor in order to provide and support the features of its Services, it may share Personal Data for that purpose. Advertising partners. The Company may partner with some third parties to display advertising on its websites or to manage and serve our advertising on other sites and may share Personal Data with them for this purpose. All third parties with which the Personal Data are shared are required to process Personal Data in a manner that is consistent with this Privacy Policy. Green Marketing LLC and its Sub-processors may use cookies and other similar tracking technologies, such as (but not limited to) pixels and web beacons, to gather information about users (including Customers, Agents, End Users, Visitors) activities on Green Marketing LLC’s websites and other sites in order to provide with targeted advertising based on user’s browsing activities and interests. We will provide an individual opt-out or opt-in choice before we share data with third parties other than our Third Party Service Providers we use while providing Services, or before we use it for a purpose other than which it was originally collected or subsequently authorized. To limit the use and disclosure of your Personal Data, please submit a written request by emailing at <a href="mailto:questions@greenmarketing.us">questions@greenmarketing.us</a> (or via support e-mail of the Service you use).
           </Typography>
            <Typography style={{margin:'40px 0 15px 0'}} align='left' variant="h6">
            8. Security
            </Typography>
            <Typography align='left' paragraph={true}>
            We guarantee that we take reasonable and appropriate technical and operational measures to protect your Personal Data we collect and hold them from loss, misuse and unauthorized access, disclosure, alteration, and destruction. While processing Personal Data we take into due account the risk involved in the processing and the nature of the Personal Data.
           </Typography>
            <Typography style={{margin:'40px 0 15px 0'}} align='left' variant="h6">
            9. Data Integrity and Purpose Limitation
            </Typography>
            <Typography align='left' paragraph={true}>
            Green Marketing LLC will only collect and retain Personal Data which is relevant to the purposes for which the Personal Data is collected, and will not use it in a way that is incompatible with such purposes unless such use has been subsequently authorized by the Customer. Green Marketing LLC will take reasonable steps to ensure that Personal Data is reliable for its intended use, accurate, complete, and current. We may occasionally contact you to determine that your Personal Data is still accurate and current.
           </Typography>
            <Typography style={{margin:'40px 0 15px 0'}} align='left' variant="h6">
            10. Surveys
            </Typography>
            <Typography align='left' paragraph={true}>
            From time-to-time, we may provide you with the opportunity to participate in a survey within our applications or via email. If you participate, we may require your name, last name, email address or other data. Participation in these surveys is completely voluntary and you, therefore, have a choice whether or not to disclose this information.
           </Typography>
            <Typography style={{margin:'40px 0 15px 0'}} align='left' variant="h6">
            11. Add-ons
            </Typography>
            <Typography align='left' paragraph={true}>
            We allow Customers to integrate their Services with third-party add-ons. Please be aware that Green Marketing LLC is not responsible for any information or Personal Data that may be collected through such third-party add-ons.
           </Typography>
            <Typography style={{margin:'40px 0 15px 0'}} align='left' variant="h6">
            12. Personal Data protection
            </Typography>
            <Typography align='left' paragraph={true}>
            Green Marketing LLC applies technical safety measures of the highest standards to protect the provided Personal Data against loss, destruction, misuse, unauthorized access or disclosure. The used measures and technology ensure complete safety of the Personal Data provided by the Customer or other data subject. The Personal Data is available solely to the Customer or to a person indicated by the Customer and provided that authorized access has been granted to such person. The Customer controls who is allowed to access. Green Marketing LLC follows generally accepted industry standards to protect the Personal Data both during transmission and once received by the Company. No method of data transmission over the Internet, or method of electronic storage, is 100% secure. Therefore the absolute security can not be guaranteed. No data transmission via the Internet, however, can guarantee 100% safety. However Green Marketing LLC takes all necessary steps and measures to update and modernize its data protection system. The transmission of most information is encrypted by using secure socket layer technology (SSL).
           </Typography>
            <Typography style={{margin:'40px 0 15px 0'}} align='left' variant="h6">
            13. Privacy Policy modification
            </Typography>
            <Typography align='left' paragraph={true}>
            Green Marketing LLC may update this Privacy Policy from time to time to reflect changes to its information practices and standards and only this currently visible on our website is up to date, supersedes all prior versions, and is effective and binding immediately after posting on an applicable website. If there are any significant material changes Green Marketing LLC shall notify its Customers by email (sent to the email address specified in the ‘owner’s account’) or by means of a notice on the website prior to the change becoming effective. We encourage you to periodically review this website for the latest information on our privacy practices.
           </Typography>

            <Typography style={{margin:'40px 0 15px 0'}} align='left' variant="h6">
            14. Data gathering entity
            </Typography>
            <Typography align='left' paragraph={true}>
            Conducting its activity, under the business name of Green Marketing LLC with its office 31 N Annapolis Ave, C6, Atlantic City, NJ, 08401 United States of America, shall be the entity gathering Personal Data and other information.
            </Typography>
            <Typography style={{margin:'40px 0 15px 0'}} align='left' variant="h6">
            15. Testimonials
            </Typography>
            <Typography align='left' paragraph={true}>
            We may post Customers’ testimonials on our websites which may contain Personal Data. We use the ‘Twitter social plugin’ to display our Customers’ comments on our websites. In any other scenario, we do obtain the Customer’s consent prior to posting the testimonial to post their names along with their testimonials.
           </Typography>

            <Typography style={{margin:'40px 0 15px 0'}} align='left' variant="h6">
            16. Community forum
            </Typography>

            <Typography align='left' paragraph={true}>
            Our websites may offer publicly accessible forums. Please be aware that any information provided in these areas may be read, collected, and used by others who access them.
           </Typography>
            </div>
             
            
            </div>

    </div>
  )
}

export default Privacy