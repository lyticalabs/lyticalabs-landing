'use client';

/* eslint-disable react/no-unescaped-entities */
import { LegalPageLayout } from '@/components/marketing/LegalPageLayout';

export default function PrivacyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="July 01, 2025">
            
            {/* Introduction */}
            <section>
              <p className="text-gray-300 leading-relaxed">
                This Privacy Notice for <strong className="text-white">Lytica Inc.</strong> ("<strong>we</strong>," "<strong>us</strong>," or "<strong>our</strong>") describes how and why we might access, collect, store, use, and/or share ("<strong>process</strong>") your personal information when you use our services ("<strong>Services</strong>"), including when you:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 text-gray-300">
                <li>Visit our website at <a href="https://www.lyticalabs.ai" className="text-green-400 hover:text-green-300 transition-colors">https://www.lyticalabs.ai</a> or any website of ours that links to this Privacy Notice</li>
                <li>Use <strong className="text-white">Lytica</strong>. An AI business intelligence and data visualization platform that provides drive deeper insights.</li>
                <li>Engage with us in other related ways, including any sales, marketing, or events</li>
              </ul>
              <p className="text-gray-300 mt-4">
                <strong className="text-white">Questions or concerns?</strong> Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at <a href="mailto:privacy@lyticalabs.ai" className="text-green-400 hover:text-green-300 transition-colors">privacy@lyticalabs.ai</a>.
              </p>
            </section>

            {/* Summary of Key Points */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-green-400">Summary of Key Points</h2>
              <p className="text-gray-300 mb-4">
                <em><strong>This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents below to find the section you are looking for.</strong></em>
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">What personal information do we process?</h3>
                  <p className="text-gray-300">When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Do we process any sensitive personal information?</h3>
                  <p className="text-gray-300">Some of the information may be considered "special" or "sensitive" in certain jurisdictions, for example your racial or ethnic origins, sexual orientation, and religious beliefs. We do not process sensitive personal information.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Do we collect any information from third parties?</h3>
                  <p className="text-gray-300">We do not collect any information from third parties.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">How do we process your information?</h3>
                  <p className="text-gray-300">We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">How do we keep your information safe?</h3>
                  <p className="text-gray-300">We have adequate organizational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure.</p>
                </div>
              </div>
            </section>

            {/* Table of Contents */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-green-400">Table of Contents</h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-300">
                <li><a href="#information-collect" className="text-green-400 hover:text-green-300 transition-colors">What Information Do We Collect?</a></li>
                <li><a href="#information-process" className="text-green-400 hover:text-green-300 transition-colors">How Do We Process Your Information?</a></li>
                <li><a href="#legal-bases" className="text-green-400 hover:text-green-300 transition-colors">What Legal Bases Do We Rely On To Process Your Personal Information?</a></li>
                <li><a href="#information-share" className="text-green-400 hover:text-green-300 transition-colors">When And With Whom Do We Share Your Personal Information?</a></li>
                <li><a href="#cookies" className="text-green-400 hover:text-green-300 transition-colors">Do We Use Cookies And Other Tracking Technologies?</a></li>
                <li><a href="#ai-products" className="text-green-400 hover:text-green-300 transition-colors">Do We Offer Artificial Intelligence-Based Products?</a></li>
                <li><a href="#social-logins" className="text-green-400 hover:text-green-300 transition-colors">How Do We Handle Your Social Logins?</a></li>
                <li><a href="#information-retention" className="text-green-400 hover:text-green-300 transition-colors">How Long Do We Keep Your Information?</a></li>
                <li><a href="#information-safety" className="text-green-400 hover:text-green-300 transition-colors">How Do We Keep Your Information Safe?</a></li>
                <li><a href="#minors" className="text-green-400 hover:text-green-300 transition-colors">Do We Collect Information From Minors?</a></li>
                <li><a href="#privacy-rights" className="text-green-400 hover:text-green-300 transition-colors">What Are Your Privacy Rights?</a></li>
                <li><a href="#do-not-track" className="text-green-400 hover:text-green-300 transition-colors">Controls For Do-Not-Track Features</a></li>
                <li><a href="#us-laws" className="text-green-400 hover:text-green-300 transition-colors">Do United States Residents Have Specific Privacy Rights?</a></li>
                <li><a href="#policy-updates" className="text-green-400 hover:text-green-300 transition-colors">Do We Make Updates To This Notice?</a></li>
                <li><a href="#contact" className="text-green-400 hover:text-green-300 transition-colors">How Can You Contact Us About This Notice?</a></li>
                <li><a href="#review-data" className="text-green-400 hover:text-green-300 transition-colors">How Can You Review, Update, Or Delete The Data We Collect From You?</a></li>
              </ol>
            </section>

            {/* 1. What Information Do We Collect */}
            <section id="information-collect">
              <h2 className="text-2xl font-bold mb-6 text-green-400">1. What Information Do We Collect?</h2>
              
              <h3 className="text-xl font-semibold mb-4 text-white">Personal information you disclose to us</h3>
              <p className="text-gray-300 mb-4">
                <em><strong>In Short:</strong> We collect personal information that you provide to us.</em>
              </p>
              <p className="text-gray-300 mb-4">
                We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
              </p>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Personal Information Provided by You</h4>
                <p className="text-gray-300 mb-3">The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  <li>names</li>
                  <li>phone numbers</li>
                  <li>email addresses</li>
                  <li>mailing addresses</li>
                  <li>job titles</li>
                  <li>usernames</li>
                  <li>billing addresses</li>
                  <li>contact or authentication data</li>
                  <li>contact preferences</li>
                  <li>passwords</li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Sensitive Information</h4>
                <p className="text-gray-300">We do not process sensitive information.</p>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Social Media Login Data</h4>
                <p className="text-gray-300">We may provide you with the option to register with us using your existing social media account details, like your Facebook, X, or other social media account. If you choose to register in this way, we will collect certain profile information about you from the social media provider.</p>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Cookies and Tracking Technologies</h4>
                <p className="text-gray-300">Like many businesses, we also collect information through cookies and similar technologies. For detailed information about our use of cookies, please see our <a href="/cookie-policy/" className="text-green-400 hover:text-green-300 transition-colors">Cookie Policy</a>.</p>
              </div>
            </section>

            {/* Contact Information */}
            <section id="contact" className="border-t border-gray-700 pt-8">
              <h2 className="text-2xl font-bold mb-6 text-green-400">How Can You Contact Us About This Notice?</h2>
              <p className="text-gray-300 mb-4">
                If you have questions or comments about this notice, you may contact us by email at:
              </p>
              <p className="text-white font-semibold">
                <a href="mailto:privacy@lyticalabs.ai" className="text-green-400 hover:text-green-300 transition-colors">privacy@lyticalabs.ai</a>
              </p>
            </section>

            {/* Data Request */}
            <section id="review-data">
              <h2 className="text-2xl font-bold mb-6 text-green-400">How Can You Review, Update, Or Delete The Data We Collect From You?</h2>
              <p className="text-gray-300 mb-4">
                Based on the applicable laws of your country or state of residence in the US, you may have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information.
              </p>
              <p className="text-gray-300">
                To submit a data access, portability, correction, or deletion request, please visit: <a href="http://www.lyticalabs.ai/data-request" className="text-green-400 hover:text-green-300 transition-colors">http://www.lyticalabs.ai/data-request</a> or contact us at <a href="mailto:privacy@lyticalabs.ai" className="text-green-400 hover:text-green-300 transition-colors">privacy@lyticalabs.ai</a>.
              </p>
            </section>
    </LegalPageLayout>
  );
}