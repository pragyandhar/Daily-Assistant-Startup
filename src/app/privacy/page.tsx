import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link 
          href="/"
          className="inline-flex items-content space-x-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to home</span>
        </Link>

        <div className="text-center mb-12">
          <Shield className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive data protection and privacy practices under Indian law.
          </p>
        </div>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Legal Framework and Compliance</h2>
            <p className="text-muted-foreground leading-relaxed">
              This Privacy Policy is designed to comply with Indian data protection laws including the Information Technology Act, 2000, Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and the proposed Digital Personal Data Protection Act. By using Daily Assistant services, you consent to data practices described herein and waive certain privacy rights to the extent permitted by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Data Controller and Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              Daily Assistant acts as the data controller for personal information collected through our services. For data protection inquiries, contact: privacy@dailyassistant.app. Response time may be up to 30 business days. We are not required to respond to repetitive, unreasonable, or legally invalid requests.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed">
              We collect and process the following categories of information:
            </p>
            <h3 className="text-lg font-semibold mb-2">Personal Information:</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Email addresses and authentication tokens from Google OAuth</li>
              <li>Payment information through third-party processors (Razorpay, PayPal)</li>
              <li>User preferences, settings, and service usage patterns</li>
              <li>Technical identifiers including IP addresses, device information, browser data</li>
              <li>Location data (general geographic region based on IP address)</li>
            </ul>
            <h3 className="text-lg font-semibold mb-2 mt-4">Service Usage Data:</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Conversation prompts, AI responses, and generated content</li>
              <li>Image generation requests and parameters</li>
              <li>Usage frequency, feature preferences, and performance metrics</li>
              <li>Error logs, diagnostic information, and system interactions</li>
            </ul>
            <h3 className="text-lg font-semibold mb-2 mt-4">Technical Data:</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Cookies, local storage, and session data</li>
              <li>Network information and connection quality metrics</li>
              <li>Security logs and abuse prevention data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Legal Basis for Processing</h2>
            <p className="text-muted-foreground leading-relaxed">
              We process personal data based on:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Contractual necessity:</strong> To provide services you have requested</li>
              <li><strong>Legitimate business interests:</strong> Service improvement, fraud prevention, analytics</li>
              <li><strong>Legal compliance:</strong> Tax obligations, law enforcement requests</li>
              <li><strong>Consent:</strong> Where explicitly provided and not withdrawn</li>
              <li><strong>Vital interests:</strong> To protect life, health, or safety where applicable</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Consent withdrawal may limit service availability. Some processing is mandatory for service provision.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Data Sharing and Third-Party Disclosure</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your information may be shared with:
            </p>
            <h3 className="text-lg font-semibold mb-2">AI Service Providers:</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>OpenAI (GPT models) - Subject to their data usage policies</li>
              <li>Other AI providers we may engage - Terms vary by provider</li>
              <li>Your conversation content is transmitted to generate responses</li>
            </ul>
            <h3 className="text-lg font-semibold mb-2 mt-4">Business Partners:</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Payment processors (Razorpay, PayPal) - For transaction processing</li>
              <li>Authentication providers (Google) - For account verification</li>
              <li>Analytics services - For usage insights and improvement</li>
              <li>Customer support tools - For service assistance</li>
            </ul>
            <h3 className="text-lg font-semibold mb-2 mt-4">Legal and Regulatory:</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Government authorities when legally required</li>
              <li>Law enforcement for criminal investigations</li>
              <li>Courts pursuant to valid legal orders</li>
              <li>Regulatory bodies for compliance verification</li>
            </ul>
            <h3 className="text-lg font-semibold mb-2 mt-4">Business Transfers:</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Acquirers in merger, acquisition, or sale transactions</li>
              <li>Investors for due diligence purposes</li>
              <li>Successors in business restructuring</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. International Data Transfers</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your data may be transferred to and processed in countries outside India, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>United States (OpenAI servers, cloud infrastructure)</li>
              <li>European Union (backup servers, CDN networks)</li>
              <li>Other jurisdictions where our service providers operate</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              These transfers are necessary for service provision. Data protection laws in destination countries may differ from Indian laws. By using our services, you consent to these transfers and acknowledge potential variations in legal protections.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Data Retention and Deletion</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain data for the following periods:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Account data:</strong> Until account deletion plus 2 years for legal compliance</li>
              <li><strong>Payment records:</strong> 7 years as required by Indian tax laws</li>
              <li><strong>Usage logs:</strong> 2 years for service improvement and security</li>
              <li><strong>Conversation content:</strong> Locally stored by user, transmitted to AI providers per their policies</li>
              <li><strong>Support communications:</strong> 3 years for quality assurance</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Deletion requests may be refused if retention is legally required. Some data may persist in backups for up to 90 additional days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Security Measures and Limitations</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement industry-standard security measures including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>HTTPS/TLS encryption for data transmission</li>
              <li>Secure API key storage and rotation</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Access controls and authentication requirements</li>
              <li>Monitoring for unusual activities and potential breaches</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              However, we cannot guarantee absolute security. Users acknowledge that data transmission over the internet carries inherent risks. We are not liable for security breaches beyond our reasonable control or resulting from user negligence.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. User Rights and Limitations</h2>
            <p className="text-muted-foreground leading-relaxed">
              Subject to legal limitations, you may request:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Access:</strong> Information about data we hold (response within 30 days)</li>
              <li><strong>Correction:</strong> Updates to inaccurate personal information</li>
              <li><strong>Deletion:</strong> Removal of data where legally permissible</li>
              <li><strong>Portability:</strong> Data export in machine-readable format</li>
              <li><strong>Consent withdrawal:</strong> For processing based on consent</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Rights may be limited by legal requirements, operational necessities, or technical constraints. Requests may be refused or delayed if deemed excessive, repetitive, or legally invalid. Verification of identity required for all requests.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Cookies and Tracking Technologies</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use various tracking technologies:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Essential cookies:</strong> Required for service functionality</li>
              <li><strong>Analytics cookies:</strong> To understand usage patterns and improve services</li>
              <li><strong>Authentication tokens:</strong> To maintain login sessions</li>
              <li><strong>Local storage:</strong> To store user preferences and conversation history</li>
              <li><strong>Third-party tracking:</strong> May be used by integrated services</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Disabling cookies may limit service functionality. Some tracking is essential for security and cannot be disabled.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our services are not intended for children under 18. We do not knowingly collect personal information from minors. If we discover such collection, we will delete the information promptly. Parents/guardians who believe we have collected their child's information should contact us immediately.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Users under 18 may use services only with parental consent and supervision. Parents are responsible for monitoring their children's internet usage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Data Breach Notification</h2>
            <p className="text-muted-foreground leading-relaxed">
              In event of data breaches affecting personal information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>We will assess impact and notify authorities within 72 hours if legally required</li>
              <li>User notification will be provided if high risk to rights and freedoms</li>
              <li>Notification timing and method at our discretion based on circumstances</li>
              <li>No liability for breaches beyond our reasonable control</li>
              <li>Users acknowledge inherent risks in digital services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">13. Automated Decision Making and Profiling</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may use automated processing for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Fraud detection and abuse prevention</li>
              <li>Service personalization and recommendations</li>
              <li>Usage pattern analysis for improvements</li>
              <li>Risk assessment for account security</li>
              <li>Content moderation and safety filtering</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Users may request human review of automated decisions affecting them significantly. However, such requests may be refused if they interfere with security measures or operational requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">14. Third-Party Services and Links</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our services integrate with third-party providers whose privacy practices may differ:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>OpenAI (GPT models) - <a href="https://openai.com/privacy" className="text-primary hover:underline">Privacy Policy</a></li>
              <li>Google (Authentication) - <a href="https://policies.google.com/privacy" className="text-primary hover:underline">Privacy Policy</a></li>
              <li>Razorpay (Payments) - <a href="https://razorpay.com/privacy/" className="text-primary hover:underline">Privacy Policy</a></li>
              <li>PayPal (Payments) - <a href="https://www.paypal.com/privacy" className="text-primary hover:underline">Privacy Policy</a></li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              We are not responsible for third-party privacy practices. Users should review applicable third-party policies independently.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">15. Changes to Privacy Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              This policy may be updated without individual notice. Changes become effective immediately upon posting. Material changes may be communicated via email or service notifications. Continued use constitutes acceptance of modifications.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Users are responsible for regularly reviewing policy updates. Objections to changes should be communicated before continued service use.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">16. Limitation of Privacy Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              Privacy rights may be limited by:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Legal obligations and regulatory requirements</li>
              <li>National security and law enforcement needs</li>
              <li>Contractual necessities for service provision</li>
              <li>Technical constraints and operational requirements</li>
              <li>Third-party rights and legitimate interests</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Users acknowledge these limitations and agree that privacy is not absolute in digital services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">17. Dispute Resolution for Privacy Matters</h2>
            <p className="text-muted-foreground leading-relaxed">
              Privacy-related disputes are subject to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Initial resolution through our support channels</li>
              <li>Escalation to designated privacy officer if necessary</li>
              <li>Binding arbitration under our Terms of Service</li>
              <li>Delhi High Court jurisdiction for unresolved matters</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Users waive rights to class action proceedings for privacy claims.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              For privacy-related inquiries, contact: privacy@dailyassistant.app
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Data Protection Officer: dpo@dailyassistant.app
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Please allow up to 30 business days for responses. Include relevant details and verification information with all requests.
            </p>
          </section>

          <div className="text-sm text-muted-foreground border-t border-border pt-8">
            <p>Last updated: August 18, 2025</p>
            <p>Effective Date: August 18, 2025</p>
            <p>This policy is governed by Indian data protection laws and subject to Delhi High Court jurisdiction.</p>
            <p>This policy supersedes all previous versions.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
