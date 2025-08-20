import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";

export default function RefundPolicyPage() {
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
          <RefreshCw className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Return & Refund Policy</h1>
          <p className="text-xl text-muted-foreground">
            Our comprehensive return and refund policy for digital services.
          </p>
        </div>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Digital Goods and Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              Daily Assistant provides digital services including AI conversation prompts and image generation credits. Under Indian Consumer Protection Act, 2019, and Information Technology Act, 2000, once digital credits are delivered and utilized, they cannot be returned. By purchasing our services, you acknowledge and agree to this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">No Refund Policy - Legal Basis</h2>
            <p className="text-muted-foreground leading-relaxed">
              In accordance with Section 2(7) of the Consumer Protection Act, 2019, and established precedents in Indian courts including the Delhi High Court ruling in <em>Microsoft Corporation (India) Pvt. Ltd. v. Mr. Deepak Raval & Anr.</em>, digital goods and services that are:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Delivered electronically and immediately consumed</li>
              <li>Non-returnable by their very nature</li>
              <li>Customized or personalized to user requirements</li>
              <li>Performance-based services (AI responses)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Are explicitly excluded from return and refund obligations. Our services fall under all these categories.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Technical Service Disruptions</h2>
            <p className="text-muted-foreground leading-relaxed">
              While we strive for 99.9% uptime, technical disruptions may occur due to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Third-party AI provider outages (OpenAI, etc.)</li>
              <li>Internet connectivity issues</li>
              <li>Scheduled maintenance windows</li>
              <li>Force majeure events as defined under Section 56 of the Indian Contract Act, 1872</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              No refunds will be provided for temporary service disruptions lasting less than 48 continuous hours. For extended outages exceeding 72 hours, service credits may be provided at our sole discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Credit Usage and Consumption</h2>
            <p className="text-muted-foreground leading-relaxed">
              Credits are considered "consumed" and non-refundable when:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>AI response is generated (even if user is dissatisfied with quality)</li>
              <li>Image generation process is initiated (regardless of output satisfaction)</li>
              <li>API call is successfully made to third-party providers</li>
              <li>Processing begins on user's request</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              User satisfaction with AI-generated content is subjective and cannot form the basis of refund claims under Indian law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Fraudulent Transactions and Chargebacks</h2>
            <p className="text-muted-foreground leading-relaxed">
              Any attempt to initiate chargebacks or dispute legitimate transactions will result in:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Immediate account suspension and service termination</li>
              <li>Legal action under Section 420 of the Indian Penal Code (fraud)</li>
              <li>Recovery of chargeback fees and legal costs</li>
              <li>Permanent ban from all services</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Legitimate payment disputes must be raised within 7 days of purchase through our support system.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Service Credits vs. Monetary Refunds</h2>
            <p className="text-muted-foreground leading-relaxed">
              In exceptional circumstances involving proven service failures or billing errors, compensation may be provided as:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Service credits (preferred method)</li>
              <li>Extended service periods</li>
              <li>Bonus credits in future purchases</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Monetary refunds to original payment methods will not be processed except where mandated by specific court orders from competent Indian courts.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Consumer Rights Under Indian Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              This policy is compliant with Indian consumer protection laws including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Consumer Protection Act, 2019 - Section 2(7) excludes digital goods</li>
              <li>Information Technology Act, 2000 - Digital service provisions</li>
              <li>Indian Contract Act, 1872 - Specific performance of contracts</li>
              <li>Sale of Goods Act, 1930 - Excludes services and digital goods</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Users are advised to understand their legal rights before making purchases. Ignorance of policy terms is not grounds for refund claims.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Dispute Resolution Process</h2>
            <p className="text-muted-foreground leading-relaxed">
              All disputes must follow this mandatory sequence:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
              <li>Initial complaint via support email within 7 days of purchase</li>
              <li>Internal review process (up to 14 business days)</li>
              <li>Mandatory mediation through authorized mediator</li>
              <li>Arbitration under Arbitration and Conciliation Act, 2015 (if required)</li>
              <li>Legal proceedings only in Delhi courts (if arbitration fails)</li>
            </ol>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Failure to follow this process will result in forfeiture of all refund claims.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Account Termination and Outstanding Credits</h2>
            <p className="text-muted-foreground leading-relaxed">
              Upon account termination (voluntary or involuntary):
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>All unused credits are forfeited immediately</li>
              <li>No compensation for unused services</li>
              <li>No pro-rata refunds for partial usage periods</li>
              <li>All outstanding payments become immediately due</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Limitation of Liability for Refunds</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our maximum liability for any refund claims is strictly limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>50% of the transaction amount in question</li>
              <li>Maximum liability cap of ₹5,000 per user per financial year</li>
              <li>No liability for consequential or indirect losses</li>
              <li>No compensation for time, effort, or opportunity costs</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Force Majeure and Service Interruptions</h2>
            <p className="text-muted-foreground leading-relaxed">
              We shall not be liable for refunds due to service interruptions caused by:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Acts of God, natural disasters, pandemics</li>
              <li>Government regulations or internet shutdowns</li>
              <li>Third-party provider failures (OpenAI, payment gateways)</li>
              <li>Cyber attacks, security breaches, or technical failures</li>
              <li>Labor strikes, political instability, or war</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Modification of Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              This refund policy may be modified at any time without prior notice. Continued use of services constitutes acceptance of modified terms. Users are responsible for regularly reviewing policy updates.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact for Refund Requests</h2>
            <p className="text-muted-foreground leading-relaxed">
              All refund requests must be submitted to: refunds@dailyassistant.app
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Include: Transaction ID, purchase date, detailed reason, and supporting documentation.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Response time: Up to 21 business days. No response should be considered as denial of refund request.
            </p>
          </section>

          <div className="text-sm text-muted-foreground border-t border-border pt-8">
            <p>Last updated: August 18, 2025</p>
            <p>This policy is governed by Indian laws and Delhi High Court jurisdiction.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
