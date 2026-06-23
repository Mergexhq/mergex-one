import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import Image from "next/image";

const termsSections = [
    { id: "about", title: "1. About The MergeX Company" },
    { id: "eligibility", title: "2. Eligibility" },
    { id: "scope-of-services", title: "3. Scope of Services" },
    { id: "no-guaranteed-results", title: "4. No Guaranteed Results" },
    { id: "diagnosis-and-recommendations", title: "5. Diagnosis and Recommendations" },
    { id: "intellectual-property", title: "6. Intellectual Property" },
    { id: "website-usage-rules", title: "7. Website Usage Rules" },
    { id: "selective-engagement", title: "8. Selective Engagement" },
    { id: "payments", title: "9. Payments and Terms" },
    { id: "third-party-services", title: "10. Third-Party Platforms" },
    { id: "confidentiality", title: "11. Confidentiality" },
    { id: "limitation-of-liability", title: "12. Limitation of Liability" },
    { id: "independent-business", title: "13. Independent Business" },
    { id: "educational-content", title: "14. Educational Content" },
    { id: "user-submissions", title: "15. User Submissions" },
    { id: "future-products", title: "16. Future Products" },
    { id: "termination", title: "17. Termination" },
    { id: "changes-to-terms", title: "18. Changes to These Terms" },
    { id: "governing-law", title: "19. Governing Law" },
    { id: "contact-information", title: "20. Contact Information" },
    { id: "acceptance", title: "21. Acceptance" }
];

export default function TermsOfUsePage() {
    return (
        <LegalPageLayout
            title="Terms of Use"
            description="Welcome to The MergeX Company."
            effectiveDate="15 May 2026"
            lastUpdated="15 May 2026"
            readingTime="8 min read"
            sections={termsSections}
        >
            <p className="text-xl italic font-medium text-[#2C2C2C] mb-8 leading-relaxed">
                These Terms of Use (“Terms”) govern your access to and use of the websites, platforms, services, content, systems, communications, and digital properties operated by The MergeX Company and its associated brands, including MergeX (“Company”, “The MergeX Company”, “MergeX”, “we”, “our”, or “us”).
            </p>
            <p>
                By accessing or using our website, services, or platforms, you agree to comply with these Terms.
            </p>
            <p>
                If you do not agree with these Terms, you must not use our website or services.
            </p>

            <hr />

            <section id="about" className="scroll-mt-32">
                <h2>1. About The MergeX Company</h2>
                <p>
                    The MergeX Company is a parent company operating multiple brands and business divisions focused on scaling businesses through unified systems, technology, branding, marketing, sales, research, products, talent, and education.
                </p>
                <p>Current and future brands under The MergeX Company may include:</p>
                <ul>
                    <li>MergeX</li>
                    <li>MergeX Systems</li>
                    <li>OVRN Studios</li>
                    <li>MergeX Academy</li>
                </ul>
                <p>
                    The MergeX Company reserves the right to add, remove, modify, restructure, or discontinue any brand, service, platform, or offering at any time.
                </p>
            </section>

            <hr />

            <section id="eligibility" className="scroll-mt-32">
                <h2>2. Eligibility</h2>
                <p>By using our website or services, you confirm that:</p>
                <ul>
                    <li>You are at least 18 years old</li>
                    <li>You have the legal authority to enter into agreements</li>
                    <li>You are using the platform lawfully</li>
                    <li>The information you provide is accurate and truthful</li>
                </ul>
                <p>
                    The MergeX Company reserves the right to deny access or service to any individual or organization at its discretion.
                </p>
            </section>

            <hr />

            <section id="scope-of-services" className="scroll-mt-32">
                <h2>3. Scope of Services</h2>
                <p>The MergeX Company may provide services including, but not limited to:</p>
                <ul>
                    <li>Business diagnosis and scaling systems</li>
                    <li>Technology solutions</li>
                    <li>Software development</li>
                    <li>AI automations</li>
                    <li>Branding and strategy</li>
                    <li>Marketing systems</li>
                    <li>Sales systems</li>
                    <li>Operational systems</li>
                    <li>Talent and workforce solutions</li>
                    <li>Educational and consulting services</li>
                    <li>Research and development initiatives</li>
                </ul>
                <p>
                    All services are subject to separate proposals, agreements, Statements of Work (SOW), contracts, or engagement documents where applicable.
                </p>
            </section>

            <hr />

            <section id="no-guaranteed-results" className="scroll-mt-32">
                <h2>4. No Guaranteed Results</h2>
                <p>While The MergeX Company aims to improve business performance, growth, operations, and scalability, we do not guarantee:</p>
                <ul>
                    <li>Revenue growth</li>
                    <li>Profitability</li>
                    <li>Business success</li>
                    <li>Lead generation outcomes</li>
                    <li>Marketing performance</li>
                    <li>Sales conversion results</li>
                    <li>Investment returns</li>
                    <li>Operational outcomes</li>
                </ul>
                <p>
                    Business performance depends on multiple external and internal factors beyond our control, including execution quality, market conditions, leadership decisions, competition, economic conditions, and client participation.
                </p>
                <p>
                    Any case studies, projections, examples, estimates, or forecasts shared by The MergeX Company are illustrative only and should not be interpreted as guarantees.
                </p>
            </section>

            <hr />

            <section id="diagnosis-and-recommendations" className="scroll-mt-32">
                <h2>5. Diagnosis and Recommendations</h2>
                <p>The MergeX Company operates using a diagnosis-first methodology, including frameworks such as the S.C.A.L.E Method™.</p>
                <p>Recommendations, strategies, and systems provided are based on:</p>
                <ul>
                    <li>Information shared by the client</li>
                    <li>Observed operational conditions</li>
                    <li>Strategic analysis</li>
                    <li>Industry assumptions</li>
                    <li>Available data at the time of engagement</li>
                </ul>
                <p>
                    Clients remain fully responsible for final business decisions and implementation outcomes.
                </p>
            </section>

            <hr />

            <section id="intellectual-property" className="scroll-mt-32">
                <h2>6. Intellectual Property</h2>
                <p>
                    All intellectual property owned, developed, created, published, or used by The MergeX Company remains the exclusive property of The MergeX Company unless otherwise agreed in writing.
                </p>
                <p>This includes but is not limited to:</p>
                <ul>
                    <li>Frameworks</li>
                    <li>Methodologies</li>
                    <li>Systems</li>
                    <li>Branding assets</li>
                    <li>Designs</li>
                    <li>Documents</li>
                    <li>Processes</li>
                    <li>Strategies</li>
                    <li>Templates</li>
                    <li>Research</li>
                    <li>Educational materials</li>
                    <li>S.C.A.L.E Method™</li>
                    <li>Website content</li>
                    <li>Visual assets</li>
                    <li>Written content</li>
                    <li>Internal tools</li>
                    <li>Operational structures</li>
                </ul>
                <p>Users may not:</p>
                <ul>
                    <li>Copy</li>
                    <li>Reproduce</li>
                    <li>Resell</li>
                    <li>Redistribute</li>
                    <li>Modify</li>
                    <li>Reverse engineer</li>
                    <li>Republish</li>
                    <li>Train AI systems using</li>
                    <li>Commercially exploit</li>
                </ul>
                <p>…any MergeX intellectual property without written permission.</p>
                <p>Client-owned materials remain the property of the respective client.</p>
            </section>

            <hr />

            <section id="website-usage-rules" className="scroll-mt-32">
                <h2>7. Website Usage Rules</h2>
                <p>Users agree not to:</p>
                <ul>
                    <li>Use the website unlawfully</li>
                    <li>Attempt unauthorized access</li>
                    <li>Disrupt website operations</li>
                    <li>Introduce malware or malicious code</li>
                    <li>Scrape or harvest website data</li>
                    <li>Misrepresent identity or affiliation</li>
                    <li>Violate intellectual property rights</li>
                    <li>Use content for unauthorized commercial purposes</li>
                    <li>Attempt to replicate MergeX systems or methodologies</li>
                </ul>
                <p>The MergeX Company reserves the right to restrict or terminate access for violations.</p>
            </section>

            <hr />

            <section id="selective-engagement" className="scroll-mt-32">
                <h2>8. Selective Engagement</h2>
                <p>The MergeX Company is selective about the businesses and clients it works with.</p>
                <p>Submitting an inquiry, application, form, or request does not guarantee acceptance as a client.</p>
                <p>We reserve the right to:</p>
                <ul>
                    <li>Reject projects</li>
                    <li>Decline inquiries</li>
                    <li>Refuse engagements</li>
                    <li>Discontinue discussions</li>
                    <li>End partnerships</li>
                </ul>
                <p>…without obligation to provide detailed reasoning.</p>
            </section>

            <hr />

            <section id="payments" className="scroll-mt-32">
                <h2>9. Payments and Terms</h2>
                <p>All pricing, payments, retainers, invoices, deposits, and commercial structures are governed by separate agreements or proposals.</p>
                <p>Unless otherwise stated:</p>
                <ul>
                    <li>Payments are non-refundable once work begins</li>
                    <li>Delayed payments may pause work</li>
                    <li>Deliverables may be withheld for unpaid invoices</li>
                    <li>Late fees may apply where legally permitted</li>
                </ul>
                <p>The MergeX Company reserves the right to revise pricing structures at any time for future engagements.</p>
            </section>

            <hr />

            <section id="third-party-services" className="scroll-mt-32">
                <h2>10. Third-Party Platforms</h2>
                <p>The MergeX Company may use or recommend third-party platforms, software, tools, APIs, hosting providers, payment gateways, automation systems, or integrations.</p>
                <p>We are not responsible for:</p>
                <ul>
                    <li>Third-party outages</li>
                    <li>Platform limitations</li>
                    <li>Security breaches on external systems</li>
                    <li>Third-party pricing changes</li>
                    <li>Data loss caused by external providers</li>
                    <li>Third-party policy changes</li>
                </ul>
                <p>Users remain subject to the terms and policies of those third-party services.</p>
            </section>

            <hr />

            <section id="confidentiality" className="scroll-mt-32">
                <h2>11. Confidentiality</h2>
                <p>The MergeX Company respects client confidentiality and handles shared business information responsibly.</p>
                <p>However, unless protected by a separate signed NDA or agreement:</p>
                <ul>
                    <li>Information shared voluntarily may not automatically be considered confidential</li>
                    <li>Users should avoid sharing highly sensitive information unnecessarily through unsecured channels</li>
                </ul>
                <p>Both parties agree not to misuse confidential information obtained during engagements.</p>
            </section>

            <hr />

            <section id="limitation-of-liability" className="scroll-mt-32">
                <h2>12. Limitation of Liability</h2>
                <p>To the maximum extent permitted by law, The MergeX Company shall not be liable for:</p>
                <ul>
                    <li>Indirect damages</li>
                    <li>Consequential losses</li>
                    <li>Business interruption</li>
                    <li>Revenue loss</li>
                    <li>Profit loss</li>
                    <li>Reputation damage</li>
                    <li>Data loss</li>
                    <li>Operational disruptions</li>
                    <li>Missed opportunities</li>
                    <li>Third-party failures</li>
                </ul>
                <p>
                    Total liability, if any, shall not exceed the amount paid by the client to The MergeX Company for the specific service directly related to the claim.
                </p>
            </section>

            <hr />

            <section id="independent-business" className="scroll-mt-32">
                <h2>13. Independent Business</h2>
                <p>Nothing in these Terms creates:</p>
                <ul>
                    <li>Employment relationships</li>
                    <li>Joint ventures</li>
                    <li>Partnerships</li>
                    <li>Agency relationships</li>
                    <li>Equity ownership</li>
                    <li>Fiduciary obligations</li>
                </ul>
                <p>Clients and The MergeX Company remain independent entities.</p>
            </section>

            <hr />

            <section id="educational-content" className="scroll-mt-32">
                <h2>14. Educational Content</h2>
                <p>Any content published by The MergeX Company, including:</p>
                <ul>
                    <li>Blogs</li>
                    <li>Insights</li>
                    <li>Videos</li>
                    <li>Case studies</li>
                    <li>Educational materials</li>
                    <li>Social media content</li>
                    <li>Workshops</li>
                    <li>Frameworks</li>
                    <li>Public resources</li>
                </ul>
                <p>…is intended for informational and educational purposes only and should not be considered legal, financial, investment, tax, or professional advice.</p>
                <p>Users should consult appropriate professionals before making business or financial decisions.</p>
            </section>

            <hr />

            <section id="user-submissions" className="scroll-mt-32">
                <h2>15. User Submissions</h2>
                <p>By submitting forms, files, feedback, ideas, suggestions, or communications to The MergeX Company, you confirm that:</p>
                <ul>
                    <li>You have the right to share such information</li>
                    <li>The content does not violate laws or third-party rights</li>
                    <li>The information is accurate to your knowledge</li>
                </ul>
                <p>Unless otherwise agreed, feedback and suggestions may be used internally to improve services and systems.</p>
            </section>

            <hr />

            <section id="future-products" className="scroll-mt-32">
                <h2>16. Future Products</h2>
                <p>The MergeX Company may launch experimental products, beta systems, AI tools, research initiatives, educational platforms, or pilot programs under any of its brands.</p>
                <p>Such offerings may:</p>
                <ul>
                    <li>Change without notice</li>
                    <li>Contain limitations</li>
                    <li>Be discontinued</li>
                    <li>Operate in testing environments</li>
                </ul>
                <p>Users participate in such programs at their own discretion.</p>
            </section>

            <hr />

            <section id="termination" className="scroll-mt-32">
                <h2>17. Termination</h2>
                <p>The MergeX Company reserves the right to suspend or terminate access to any platform, service, or engagement if:</p>
                <ul>
                    <li>Terms are violated</li>
                    <li>Payments are not completed</li>
                    <li>Misconduct occurs</li>
                    <li>Abuse or harassment occurs</li>
                    <li>Fraudulent behavior is identified</li>
                    <li>Cooperation becomes impossible</li>
                </ul>
                <p>Termination does not remove outstanding payment obligations.</p>
            </section>

            <hr />

            <section id="changes-to-terms" className="scroll-mt-32">
                <h2>18. Changes to These Terms</h2>
                <p>The MergeX Company may update these Terms periodically.</p>
                <p>Updated versions will be posted on this page with a revised “Last Updated” date.</p>
                <p>Continued use of our website or services after changes constitutes acceptance of the revised Terms.</p>
            </section>

            <hr />

            <section id="governing-law" className="scroll-mt-32">
                <h2>19. Governing Law</h2>
                <p>These Terms shall be governed by and interpreted under the laws of India.</p>
                <p>Any disputes arising from these Terms shall be subject to the jurisdiction of the appropriate courts in Chennai, Tamil Nadu, India.</p>
            </section>

            <hr />

            <section id="contact-information" className="scroll-mt-32">
                <h2>20. Contact Information</h2>
                <p>For questions regarding these Terms, please contact:</p>
                <p>
                    <strong>The MergeX Company</strong><br />
                    Email: <a href="mailto:hello@mergex.in">hello@mergex.in</a><br />
                    Website: <a href="https://www.mergex.in">https://www.mergex.in</a>
                </p>
            </section>

            <hr />

            <section id="acceptance" className="scroll-mt-32">
                <h2>21. Acceptance</h2>
                <p>By accessing or using The MergeX Company websites, brands, services, systems, or platforms, you acknowledge that you have read, understood, and agreed to these Terms of Use.</p>
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
