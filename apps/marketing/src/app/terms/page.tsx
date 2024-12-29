import Footer from '@/components/footer'
import Header from '@/components/header'

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Header />
      <div className="mx-auto max-w-4xl px-4 py-8 font-sans text-white">
        <h1 className="mb-4 text-3xl font-bold">
          ByteSlice, LLC – DeepDish Privacy Policy
        </h1>
        <p className="mb-8 text-sm text-gray-500">
          Last Updated: December 29th 2024
        </p>

        <p className="mb-6">
          This Privacy Policy (the <strong>“Policy”</strong>) describes how
          ByteSlice, LLC (<strong>“ByteSlice”</strong>, <strong>“we”</strong>,{' '}
          <strong>“us”</strong>, or <strong>“our”</strong>) collects, uses,
          discloses, and protects information in connection with our data
          management framework SaaS product, DeepDish (the{' '}
          <strong>“Service”</strong>). By accessing or using the Service, you
          agree to the collection and use of information as described in this
          Policy. If you do not agree with our practices, please do not use the
          Service.
        </p>

        <h2 className="mb-2 text-xl font-semibold">
          1. Information We Collect
        </h2>
        <div className="mb-6 space-y-3">
          <p>
            <strong>1.1 Personal Information.</strong> We may collect personal
            information that you voluntarily provide to us, such as your name,
            email address, billing information, and other data you provide when
            creating an account or using our Service.
          </p>
          <p>
            <strong>1.2 Usage Data and Metrics.</strong> We automatically
            collect usage information such as pages visited, features used, the
            amount of time spent on certain features, click data, and other
            metrics related to your interaction with the Service. This data
            helps us understand how users are engaging with DeepDish so we can
            improve our product and better serve our customers.
          </p>
          <p>
            <strong>1.3 Device Information.</strong> We may collect information
            about the device you use to access our Service, including IP
            address, operating system, browser type, and unique device
            identifiers.
          </p>
          <p>
            <strong>1.4 Cookies and Similar Technologies.</strong> We may use
            cookies, beacons, and other tracking technologies to collect
            information about your browsing behavior and identify you over
            multiple sessions. You can learn more in Section 5 below.
          </p>
        </div>

        <h2 className="mb-2 text-xl font-semibold">
          2. How We Use Your Information
        </h2>
        <div className="mb-6 space-y-3">
          <p>
            <strong>2.1 To Provide and Improve the Service.</strong> We use the
            collected information to operate, maintain, and enhance our Service,
            diagnose technical issues, and improve user experience.
          </p>
          <p>
            <strong>2.2 To Personalize Your Experience.</strong> We may analyze
            usage and metrics data to provide personalized content or
            recommendations tailored to your preferences and usage patterns.
          </p>
          <p>
            <strong>2.3 To Communicate with You.</strong> We may use your
            contact information to respond to inquiries, provide updates, or
            send marketing and promotional communications. You can opt out of
            marketing communications by following the unsubscribe instructions
            in our emails or by contacting us directly.
          </p>
          <p>
            <strong>2.4 For Billing and Account Management.</strong> We use
            payment information to process transactions and manage your account.
          </p>
          <p>
            <strong>2.5 To Enforce Our Terms and Policies.</strong> We may use
            the collected information to investigate suspected violations of our
            Terms of Service or this Policy, or as otherwise required by law.
          </p>
        </div>

        <h2 className="mb-2 text-xl font-semibold">
          3. How We Share Your Information
        </h2>
        <div className="mb-6 space-y-3">
          <p>
            <strong>3.1 Service Providers.</strong> We may share your
            information with third-party vendors, consultants, or service
            providers who need access to such information to perform tasks on
            our behalf. These service providers are authorized to use your
            information only to provide services to us.
          </p>
          <p>
            <strong>3.2 Business Transfers.</strong> If ByteSlice is involved in
            a merger, acquisition, sale of assets, or other business
            transaction, your information may be transferred as part of that
            transaction. We will notify you via email or a prominent notice on
            our website if a transaction affects the processing of your personal
            information.
          </p>
          <p>
            <strong>3.3 Legal Requirements.</strong> We may disclose your
            information to comply with applicable laws or regulations, or to
            respond to lawful requests, court orders, or legal process. We may
            also disclose information when we believe it is necessary to protect
            our rights, your safety, or the safety of others, or to investigate
            fraud or any violation of our Terms of Service.
          </p>
        </div>

        <h2 className="mb-2 text-xl font-semibold">4. Data Retention</h2>
        <p className="mb-6">
          We retain your personal information for as long as necessary to
          fulfill the purposes outlined in this Policy, unless a longer
          retention period is required or permitted by law. Usage data and
          metrics may be retained for internal analysis; this data typically
          does not contain personally identifiable information and is retained
          to improve our Service’s performance over time.
        </p>

        <h2 className="mb-2 text-xl font-semibold">
          5. Cookies and Tracking Technologies
        </h2>
        <p className="mb-6">
          We use cookies, web beacons, and similar technologies to collect
          information about how you interact with our Service. This helps us
          provide a better user experience and tailor our services to your
          interests. Most browsers allow you to refuse or delete cookies. If you
          choose to do so, some features of the Service may not function
          properly.
        </p>

        <h2 className="mb-2 text-xl font-semibold">6. Data Security</h2>
        <p className="mb-6">
          We implement reasonable technical and organizational measures to
          protect your personal information from loss, theft, misuse, and
          unauthorized access or disclosure. However, no electronic transmission
          or storage of information can be guaranteed to be 100% secure. You
          also have a responsibility to maintain the confidentiality of your
          account and password.
        </p>

        <h2 className="mb-2 text-xl font-semibold">7. Children’s Privacy</h2>
        <p className="mb-6">
          The Service is not intended for use by children under the age of 13
          (or the age of majority in your jurisdiction). We do not knowingly
          collect personal information from children. If you believe we have
          inadvertently collected such information, please contact us so we can
          promptly remove it.
        </p>

        <h2 className="mb-2 text-xl font-semibold">
          8. Your Rights and Choices
        </h2>
        <div className="mb-6 space-y-3">
          <p>
            <strong>8.1 Access and Correction.</strong> You may access and
            update your personal information by logging into your account or
            contacting us directly.
          </p>
          <p>
            <strong>8.2 Opt-Out of Marketing.</strong> You can opt out of
            marketing-related emails by following the unsubscribe instructions
            in those communications or by contacting us. Even if you opt out of
            marketing emails, we may still send you non-promotional messages
            such as updates about your account or changes to our policies.
          </p>
          <p>
            <strong>8.3 Do Not Track.</strong> Currently, we do not respond to
            “Do Not Track” signals in browsers. You can control cookies and
            other tracking technologies through your browser settings.
          </p>
        </div>

        <h2 className="mb-2 text-xl font-semibold">
          9. International Data Transfers
        </h2>
        <p className="mb-6">
          If you access or use our Service from outside the United States,
          information you provide may be transferred to and processed in the
          United States or other jurisdictions where our servers or third-party
          service providers are located. These countries may have data
          protection laws that are different from the laws of your country.
        </p>

        <h2 className="mb-2 text-xl font-semibold">
          10. Changes to This Policy
        </h2>
        <p className="mb-6">
          We may update this Privacy Policy to reflect changes in our practices
          or the law. If we make material changes, we will notify you by posting
          the updated Policy on our website or via email. Your continued use of
          the Service after such changes constitute your acceptance of the
          revised Policy.
        </p>

        <h2 className="mb-2 text-xl font-semibold">11. Contact Us</h2>
        <p className="mb-6">
          If you have questions about this Privacy Policy or our data practices,
          please contact us at:
        </p>
        <p className="mb-6">
          <strong>ByteSlice, LLC</strong>
          <br />
          Email:{' '}
          <a href="mailto:security@byteslice.co" className="text-orange-500">
            security@byteslice.co
          </a>
        </p>
      </div>
      <Footer />
    </div>
  )
}
