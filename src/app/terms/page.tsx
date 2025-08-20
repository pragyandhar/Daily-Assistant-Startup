import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link 
          href="/"
          className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to home</span>
        </Link>

        <div className="text-center mb-12">
          <FileText className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive terms and conditions governing use of Daily Assistant services.
          </p>
        </div>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance and Binding Agreement</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing, using, or registering for Daily Assistant services ("Service"), you ("User", "Customer", "You") enter into a legally binding contract with Daily Assistant ("Company", "We", "Us", "Our") governed by Indian law. This agreement is enforceable under the Indian Contract Act, 1872, and constitutes the entire agreement between parties. If you do not agree to all terms, discontinue use immediately. Continued use constitutes acceptance and waiver of any objections.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              These terms supersede all prior communications, agreements, or understandings. No modification is valid unless in writing and signed by authorized company representatives.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Service Description and Limitations</h2>
            <p className="text-muted-foreground leading-relaxed">
              Daily Assistant provides AI-powered conversation and image generation services through third-party providers. Services are:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Provided "AS IS" without warranties of any kind</li>
              <li>Subject to availability and third-party provider limitations</li>
              <li>Not guaranteed to meet specific user requirements</li>
              <li>May contain errors, inaccuracies, or inappropriate content</li>
              <li>Limited by AI training data and may not reflect current events</li>
              <li>Not suitable for critical decisions, medical, legal, or financial advice</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. User Eligibility and Account Responsibility</h2>
            <p className="text-muted-foreground leading-relaxed">
              Users must be:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>18 years or older, or have parental/guardian consent</li>
              <li>Legally capable of entering contracts under Indian law</li>
              <li>Residents of countries where our services are legally permitted</li>
              <li>Responsible for maintaining account security and confidentiality</li>
              <li>Liable for all activities under their account</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              False information, impersonation, or misrepresentation results in immediate termination and potential legal action under Section 420 of the Indian Penal Code.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Prohibited Uses and User Conduct</h2>
            <p className="text-muted-foreground leading-relaxed">
              Users are strictly prohibited from:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Generating illegal, harmful, abusive, or defamatory content</li>
              <li>Creating content that violates Indian laws including IT Act 2000, IPC 1860</li>
              <li>Attempting to circumvent security measures or usage limitations</li>
              <li>Reverse engineering, decompiling, or extracting service components</li>
              <li>Using automated systems, bots, or scrapers without authorization</li>
              <li>Sharing, reselling, or redistributing service access</li>
              <li>Creating content that infringes intellectual property rights</li>
              <li>Generating deepfakes, non-consensual intimate imagery, or misleading content</li>
              <li>Using services for commercial purposes without proper licensing</li>
              <li>Attempting to overwhelm or disrupt service infrastructure</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Violations result in immediate termination, forfeiture of payments, and potential legal action under applicable criminal and civil laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Payment Terms and Credit System</h2>
            <p className="text-muted-foreground leading-relaxed">
              All payments are:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Non-refundable once credits are delivered and available for use</li>
              <li>Final and not subject to chargebacks except for proven billing errors</li>
              <li>Inclusive of all applicable taxes, fees, and charges</li>
              <li>Processed through authorized payment gateways (Razorpay, PayPal)</li>
              <li>Subject to our refund policy which limits refund availability</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Credits expire per stated terms. Unused credits are forfeited upon account termination. Pricing may change with 30 days notice for new purchases.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              Service content, software, designs, trademarks, and related intellectual property remain our exclusive property or that of our licensors. Users receive limited, non-exclusive, non-transferable license for personal use only.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              AI-generated content ownership is subject to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Third-party AI provider terms (OpenAI, etc.)</li>
              <li>Indian Copyright Act, 1957 limitations on AI-generated works</li>
              <li>User responsibility for ensuring content legality</li>
              <li>No warranty against third-party intellectual property claims</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Privacy and Data Handling</h2>
            <p className="text-muted-foreground leading-relaxed">
              Users acknowledge and consent to data handling as described in our Privacy Policy. By using services, you agree that:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Data may be processed and stored outside India</li>
              <li>Third-party AI providers may process your content</li>
              <li>We may retain metadata for service improvement</li>
              <li>Law enforcement requests will be honored per Indian legal requirements</li>
              <li>Data breach notifications will be provided per legal minimums only</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Service Availability and Performance</h2>
            <p className="text-muted-foreground leading-relaxed">
              We do not guarantee:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Continuous service availability or uptime targets</li>
              <li>Error-free operation or bug-free experience</li>
              <li>Compatibility with all devices, browsers, or systems</li>
              <li>Specific response times or performance metrics</li>
              <li>Availability of specific AI models or features</li>
              <li>Immunity from third-party service disruptions</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Scheduled maintenance may occur without notice. Service interruptions do not entitle users to refunds or compensation unless specifically mandated by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Disclaimer of Warranties</h2>
            <p className="text-muted-foreground leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY INDIAN LAW, SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>MERCHANTABILITY OR FITNESS FOR PARTICULAR PURPOSE</li>
              <li>ACCURACY, RELIABILITY, OR COMPLETENESS OF INFORMATION</li>
              <li>NON-INFRINGEMENT OF THIRD-PARTY RIGHTS</li>
              <li>SECURITY OR PRIVACY PROTECTION</li>
              <li>CONTINUOUS OR ERROR-FREE OPERATION</li>
              <li>VIRUS-FREE OR MALWARE-FREE CONTENT</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Users assume all risks associated with service use. We disclaim all warranties to the fullest extent permissible under the Consumer Protection Act, 2019, and other applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              OUR TOTAL LIABILITY FOR ALL CLAIMS ARISING FROM OR RELATED TO SERVICES IS LIMITED TO:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>THE AMOUNT PAID BY USER IN THE 12 MONTHS PRECEDING THE CLAIM</li>
              <li>MAXIMUM LIABILITY CAP OF ₹10,000 PER USER PER INCIDENT</li>
              <li>NO LIABILITY FOR INDIRECT, CONSEQUENTIAL, OR PUNITIVE DAMAGES</li>
              <li>NO COMPENSATION FOR LOST PROFITS, DATA, OR BUSINESS OPPORTUNITIES</li>
              <li>NO LIABILITY FOR THIRD-PARTY ACTIONS OR CONTENT</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              These limitations apply regardless of legal theory and even if we were advised of damage possibility.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Indemnification by User</h2>
            <p className="text-muted-foreground leading-relaxed">
              Users agree to defend, indemnify, and hold harmless Daily Assistant, its officers, directors, employees, and agents from all claims, damages, costs, and expenses (including reasonable attorney fees) arising from:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>User's violation of these terms or applicable laws</li>
              <li>User-generated content or use of AI-generated content</li>
              <li>Intellectual property infringement claims</li>
              <li>Privacy violations or data misuse by user</li>
              <li>Any third-party claims related to user's service use</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Termination Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may terminate or suspend accounts immediately without notice for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Violation of these terms or applicable laws</li>
              <li>Suspected fraudulent or abusive activity</li>
              <li>Non-payment or chargeback initiation</li>
              <li>Any conduct we deem harmful to our business or users</li>
              <li>Extended period of inactivity (180+ days)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Upon termination, all rights cease immediately, and unused credits are forfeited without compensation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">13. Dispute Resolution and Arbitration</h2>
            <p className="text-muted-foreground leading-relaxed">
              ALL DISPUTES MUST BE RESOLVED THROUGH BINDING ARBITRATION under the Arbitration and Conciliation Act, 2015:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Arbitration venue: New Delhi, India</li>
              <li>Arbitration language: English or Hindi</li>
              <li>Single arbitrator appointed by Delhi High Court</li>
              <li>Indian law governs all proceedings</li>
              <li>No class action or collective arbitration permitted</li>
              <li>Arbitration costs borne by losing party</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Users waive rights to jury trial and court proceedings. Legal action in courts permitted only after arbitration completion or for emergency injunctive relief.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">14. Governing Law and Jurisdiction</h2>
            <p className="text-muted-foreground leading-relaxed">
              These terms are governed by Indian law including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Indian Contract Act, 1872</li>
              <li>Information Technology Act, 2000</li>
              <li>Consumer Protection Act, 2019</li>
              <li>Copyright Act, 1957</li>
              <li>Trade Marks Act, 1999</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Delhi High Court has exclusive jurisdiction for any legal proceedings that cannot be resolved through arbitration.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">15. Force Majeure</h2>
            <p className="text-muted-foreground leading-relaxed">
              We are not liable for performance delays or failures due to circumstances beyond reasonable control, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Natural disasters, pandemics, or acts of God</li>
              <li>Government actions, regulations, or internet shutdowns</li>
              <li>War, terrorism, or civil unrest</li>
              <li>Third-party service provider failures</li>
              <li>Cyber attacks or infrastructure failures</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">16. Severability and Enforceability</h2>
            <p className="text-muted-foreground leading-relaxed">
              If any provision is deemed invalid or unenforceable, remaining provisions continue in full force. Invalid provisions will be modified to be enforceable while preserving original intent. These terms survive account termination where applicable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">17. Modifications and Updates</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may modify these terms at any time without individual notice. Continued service use constitutes acceptance of modifications. Users are responsible for reviewing terms regularly. Material changes may be announced via email or service notifications.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">18. Contact Information and Legal Notices</h2>
            <p className="text-muted-foreground leading-relaxed">
              Legal notices and formal communications must be sent to: legal@dailyassistant.app
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Business address for legal service: [To be provided upon request through legal channels]
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Response to legal notices: Up to 30 business days. Electronic communications are acceptable for all non-legal matters.
            </p>
          </section>

          <div className="text-sm text-muted-foreground border-t border-border pt-8">
            <p>Last updated: August 18, 2025</p>
            <p>Effective Date: August 18, 2025</p>
            <p>These terms are governed by Indian law and subject to Delhi High Court jurisdiction.</p>
            <p>This agreement supersedes all previous versions and communications.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
