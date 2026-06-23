import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import Image from "next/image";

const privacySections = [
    { id: "who-we-are", title: "1. Who We Are" },
    { id: "information-we-collect", title: "2. Information We Collect" },
    { id: "how-we-use-your-information", title: "3. Use of Information" },
    { id: "cookies-and-tracking-technologies", title: "4. Cookies & Tracking" },
    { id: "how-we-share-information", title: "5. Sharing Information" },
    { id: "data-security", title: "6. Data Security" },
    { id: "data-retention", title: "7. Data Retention" },
    { id: "client-confidentiality", title: "8. Client Confidentiality" },
    { id: "intellectual-property", title: "9. Intellectual Property" },
    { id: "third-party-links", title: "10. Third-Party Links" },
    { id: "your-rights", title: "11. Your Rights" },
    { id: "marketing-communications", title: "12. Marketing Communications" },
    { id: "childrens-privacy", title: "13. Children's Privacy" },
    { id: "international-data-processing", title: "14. International Processing" },
    { id: "limitation-of-liability", title: "15. Limitation of Liability" },
    { id: "changes-to-this-privacy-policy", title: "16. Policy Changes" },
    { id: "contact-information", title: "17. Contact Information" },
    { id: "consent", title: "18. Consent" }
];

export default function PrivacyPolicyPage() {
    return (
        <LegalPageLayout
            title="Privacy Policy"
            description="Clear information on how The MergeX Company handles data, usage and platform responsibilities."
            effectiveDate="15 May 2026"
            lastUpdated="15 May 2026"
            readingTime="6 min read"
            sections={privacySections}
        >
            <p className="lead italic">
                Welcome to The MergeX Company.
            </p>
            <p>
                The MergeX Company ("The MergeX Company", "MergeX", “we”, “our”, or “us”) respects your privacy and is committed to protecting the personal information you share with us through our websites, brands, services, forms, consultations, communications, and digital platforms.
            </p>
            <p>
                This Privacy Policy explains how we collect, use, store, process, and protect your information when you interact with MergeX.
            </p>
            <p>
                By using our website or services, you agree to the terms outlined in this Privacy Policy.
            </p>

            <hr />

            <section id="who-we-are" className="scroll-mt-32">
                <h2>1. Who We Are</h2>
                <p>
                    The MergeX Company is a parent company operating multiple brands and business divisions focused on scaling businesses through unified systems, technology, branding, marketing, sales, research, products, talent, and education.
                </p>
                <p>MergeX is one of the primary brands operated under The MergeX Company.</p>
                <p>Current and future brands under The MergeX Company may include:</p>
                <ul>
                    <li>MergeX</li>
                    <li>MergeX Systems</li>
                    <li>OVRN Studios</li>
                    <li>MergeX Academy</li>
                </ul>
                <p>The MergeX Company provides services across:</p>
                <ul>
                    <li>Business Diagnosis</li>
                    <li>Technology</li>
                    <li>AI Automations</li>
                    <li>Branding</li>
                    <li>Marketing</li>
                    <li>Sales Systems</li>
                    <li>Operational Systems</li>
                    <li>Workforce and Talent Solutions</li>
                    <li>Research and Development</li>
                    <li>Education and Knowledge Services</li>
                </ul>
            </section>

            <hr />

            <section id="information-we-collect" className="scroll-mt-32">
                <h2>2. Information We Collect</h2>
                <p>We may collect the following types of information:</p>

                <h3>2.1 Personal Information</h3>
                <p>Information you voluntarily provide, including:</p>
                <ul>
                    <li>Full name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Company name</li>
                    <li>Job title</li>
                    <li>Billing information</li>
                    <li>Business details</li>
                    <li>Social media profiles</li>
                    <li>Documents or files submitted to MergeX</li>
                </ul>

                <h3>2.2 Business Information</h3>
                <p>When engaging with MergeX services, we may collect:</p>
                <ul>
                    <li>Revenue information</li>
                    <li>Team structure</li>
                    <li>Sales and marketing data</li>
                    <li>Operational workflows</li>
                    <li>Technology stack information</li>
                    <li>Brand assets and internal business documents</li>
                </ul>

                <h3>2.3 Technical Information</h3>
                <p>When you use our website, we may automatically collect:</p>
                <ul>
                    <li>IP address</li>
                    <li>Browser type</li>
                    <li>Device information</li>
                    <li>Operating system</li>
                    <li>Pages visited</li>
                    <li>Time spent on pages</li>
                    <li>Referral source</li>
                    <li>Cookies and analytics data</li>
                </ul>

                <h3>2.4 Communication Information</h3>
                <p>We may store:</p>
                <ul>
                    <li>Emails</li>
                    <li>Consultation notes</li>
                    <li>Call summaries</li>
                    <li>Meeting recordings</li>
                    <li>Chat or support conversations</li>
                </ul>
            </section>

            <hr />

            <section id="how-we-use-your-information" className="scroll-mt-32">
                <h2>3. Use of Information</h2>
                <p>The MergeX Company uses collected information to:</p>
                <ul>
                    <li>Provide and improve our services</li>
                    <li>Diagnose business constraints and operational issues</li>
                    <li>Build and deliver client solutions</li>
                    <li>Communicate with clients and prospects</li>
                    <li>Send proposals, invoices, reports, and updates</li>
                    <li>Improve website performance and user experience</li>
                    <li>Conduct internal research and analytics</li>
                    <li>Maintain security and prevent fraud</li>
                    <li>Comply with legal obligations</li>
                    <li>Develop case studies and business insights (with permission where applicable)</li>
                </ul>
            </section>

            <hr />

            <section id="cookies-and-tracking-technologies" className="scroll-mt-32">
                <h2>4. Cookies & Tracking</h2>
                <p>The MergeX Company may use cookies and similar technologies to:</p>
                <ul>
                    <li>Improve website functionality</li>
                    <li>Understand visitor behavior</li>
                    <li>Analyze traffic and engagement</li>
                    <li>Personalize website experience</li>
                    <li>Support marketing and remarketing campaigns</li>
                </ul>
                <p>
                    You may disable cookies through your browser settings. However, some website functionality may be affected.
                </p>
            </section>

            <hr />

            <section id="how-we-share-information" className="scroll-mt-32">
                <h2>5. Sharing Information</h2>
                <p>The MergeX Company does not sell personal information.</p>
                <p>We may share information only in the following situations:</p>

                <h3>5.1 Service Providers</h3>
                <p>We may work with trusted third-party providers for:</p>
                <ul>
                    <li>Website hosting</li>
                    <li>Payment processing</li>
                    <li>CRM systems</li>
                    <li>Analytics tools</li>
                    <li>Email communication</li>
                    <li>Cloud storage</li>
                    <li>Automation infrastructure</li>
                </ul>
                <p>These providers only receive the information necessary to perform their services.</p>

                <h3>5.2 Legal Requirements</h3>
                <p>We may disclose information if required to:</p>
                <ul>
                    <li>Comply with applicable law</li>
                    <li>Respond to legal requests</li>
                    <li>Protect MergeX rights and property</li>
                    <li>Prevent fraud, abuse, or security threats</li>
                </ul>

                <h3>5.3 Business Transfers</h3>
                <p>If MergeX undergoes a merger, acquisition, restructuring, or asset transfer, information may be transferred as part of that process.</p>
            </section>

            <hr />

            <section id="data-security" className="scroll-mt-32">
                <h2>6. Data Security</h2>
                <p>The MergeX Company implements reasonable technical, administrative, and organizational measures to protect information from:</p>
                <ul>
                    <li>Unauthorized access</li>
                    <li>Loss</li>
                    <li>Misuse</li>
                    <li>Disclosure</li>
                    <li>Alteration</li>
                    <li>Destruction</li>
                </ul>
                <p>
                    However, no digital system can guarantee absolute security. Users share information at their own risk.
                </p>
            </section>

            <hr />

            <section id="data-retention" className="scroll-mt-32">
                <h2>7. Data Retention</h2>
                <p>The MergeX Company retains information only for as long as necessary to:</p>
                <ul>
                    <li>Deliver services</li>
                    <li>Maintain business records</li>
                    <li>Resolve disputes</li>
                    <li>Enforce agreements</li>
                    <li>Comply with legal obligations</li>
                </ul>
                <p>We may securely delete or anonymize information when it is no longer required.</p>
            </section>

            <hr />

            <section id="client-confidentiality" className="scroll-mt-32">
                <h2>8. Client Confidentiality</h2>
                <p>The MergeX Company respects the confidentiality of all client information.</p>
                <p>Unless explicitly authorized by the client or legally required:</p>
                <ul>
                    <li>Client business information will not be publicly disclosed</li>
                    <li>Internal systems and documents remain confidential</li>
                    <li>Sensitive operational information is protected</li>
                    <li>Strategic data is not shared with third parties</li>
                </ul>
                <p>Separate Non-Disclosure Agreements (NDAs) may apply to specific engagements.</p>
            </section>

            <hr />

            <section id="intellectual-property" className="scroll-mt-32">
                <h2>9. Intellectual Property</h2>
                <p>All proprietary methodologies, frameworks, systems, branding assets, documents, and materials created by The MergeX Company remain the intellectual property of The MergeX Company unless otherwise stated in a signed agreement.</p>
                <p>This includes, but is not limited to:</p>
                <ul>
                    <li>S.C.A.L.E Method™</li>
                    <li>Internal frameworks and methodologies</li>
                    <li>Operational systems</li>
                    <li>Brand assets</li>
                    <li>Educational materials</li>
                    <li>Research documents</li>
                    <li>Automation systems</li>
                    <li>Strategic processes</li>
                    <li>Internal tools and templates</li>
                </ul>
                <p>Client-owned materials remain the property of the respective client.</p>
            </section>

            <hr />

            <section id="third-party-links" className="scroll-mt-32">
                <h2>10. Third-Party Links</h2>
                <p>Our websites and brand platforms may contain links to external websites or third-party platforms.</p>
                <p>MergeX is not responsible for:</p>
                <ul>
                    <li>Third-party privacy practices</li>
                    <li>External website content</li>
                    <li>External data collection policies</li>
                </ul>
                <p>Users should review the privacy policies of those third-party services separately.</p>
            </section>

            <hr />

            <section id="your-rights" className="scroll-mt-32">
                <h2>11. Your Rights</h2>
                <p>Depending on your location and applicable laws, you may have the right to:</p>
                <ul>
                    <li>Access your personal information</li>
                    <li>Correct inaccurate information</li>
                    <li>Request deletion of your information</li>
                    <li>Withdraw consent</li>
                    <li>Restrict processing</li>
                    <li>Request data portability</li>
                    <li>Opt out of marketing communications</li>
                </ul>
                <p>To make a request, contact MergeX using the details below.</p>
            </section>

            <hr />

            <section id="marketing-communications" className="scroll-mt-32">
                <h2>12. Marketing Communications</h2>
                <p>The MergeX Company may send:</p>
                <ul>
                    <li>Business updates</li>
                    <li>Insights</li>
                    <li>Newsletters</li>
                    <li>Service information</li>
                    <li>Educational content</li>
                    <li>Marketing communications</li>
                </ul>
                <p>You may unsubscribe at any time using the unsubscribe link or by contacting us directly.</p>
            </section>

            <hr />

            <section id="childrens-privacy" className="scroll-mt-32">
                <h2>13. Children's Privacy</h2>
                <p>The MergeX Company services are not intended for individuals under the age of 18.</p>
                <p>We do not knowingly collect personal information from minors.</p>
            </section>

            <hr />

            <section id="international-data-processing" className="scroll-mt-32">
                <h2>14. International Processing</h2>
                <p>
                    Your information may be processed and stored in locations outside your country depending on the platforms and service providers used by The MergeX Company.
                </p>
                <p>By using our services, you consent to such processing where legally permitted.</p>
            </section>

            <hr />

            <section id="limitation-of-liability" className="scroll-mt-32">
                <h2>15. Limitation of Liability</h2>
                <p>While The MergeX Company takes reasonable measures to protect information, we are not liable for:</p>
                <ul>
                    <li>Unauthorized third-party access</li>
                    <li>Cyberattacks beyond reasonable control</li>
                    <li>Technical failures</li>
                    <li>Internet infrastructure vulnerabilities</li>
                    <li>User negligence or credential sharing</li>
                </ul>
            </section>

            <hr />

            <section id="changes-to-this-privacy-policy" className="scroll-mt-32">
                <h2>16. Policy Changes</h2>
                <p>The MergeX Company may update this Privacy Policy periodically.</p>
                <p>Updated versions will be published on this page with a revised “Last Updated” date.</p>
                <p>Continued use of our website or services after updates constitutes acceptance of the revised policy.</p>
            </section>

            <hr />

            <section id="contact-information" className="scroll-mt-32">
                <h2>17. Contact Information</h2>
                <p>For privacy-related questions, requests, or concerns, please contact:</p>
                <p>
                    <strong>The MergeX Company</strong><br />
                    Email: <a href="mailto:hello@mergex.in">hello@mergex.in</a><br />
                    Website: <a href="https://www.mergex.in" target="_blank" rel="noopener noreferrer">https://www.mergex.in</a>
                </p>
            </section>

            <hr />

            <section id="consent" className="scroll-mt-32">
                <h2>18. Consent</h2>
                <p>
                    By accessing or using The MergeX Company websites, brands, platforms, systems, or services, you acknowledge that you have read, understood, and agreed to this Privacy Policy.
                </p>
                <div className="mt-2 flex flex-col items-start">
                    <div className="-ml-8 -mb-6 md:-mb-10">
                        <Image
                            src="/logo/mergex-logo.png"
                            alt="MergeX Logo"
                            width={200}
                            height={200}
                            className="object-contain w-auto h-24 md:h-36"
                        />
                    </div>
                    <p className="mt-0 font-medium italic text-[#2C2C2C]">
                        The MergeX Company<br />
                        <strong className="text-[#111111]">One System, Zero Friction.</strong>
                    </p>
                    
                    <div className="flex flex-col gap-2 mt-4">
                        <h3 className="text-xl font-bold text-[#111111] tracking-tight m-0">Copyright</h3>
                        <p className="text-[#2C2C2C] text-[15px] m-0">
                            Copyright © 2025-2026 The MergeX Company. All rights reserved.
                        </p>
                    </div>
                </div>
            </section>
        </LegalPageLayout>
    );
}
