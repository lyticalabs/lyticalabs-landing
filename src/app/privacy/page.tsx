'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useScrolled } from '@/hooks/useScrolled';

// Dynamic imports for background effects
const AnimatedGrid = dynamic(() => import('@/components/splash/AnimatedGrid').then(mod => ({ default: mod.AnimatedGrid })), { ssr: false });
const GlowingOrbs = dynamic(() => import('@/components/splash/GlowingOrbs').then(mod => ({ default: mod.GlowingOrbs })), { ssr: false });
const SplashHeader = dynamic(() => import('@/components/splash/SplashHeader').then(mod => ({ default: mod.SplashHeader })), { ssr: false });

export default function PrivacyPage() {
  const isScrolled = useScrolled(80);

  // Set document title and meta description for client-side SEO
  useEffect(() => {
    document.title = 'Privacy Policy | Lytica Labs';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Privacy policy for Lytica Labs - Learn how we collect, use, and protect your personal information.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Privacy policy for Lytica Labs - Learn how we collect, use, and protect your personal information.';
      document.head.appendChild(meta);
    }

    // Prevent overscroll behavior
    document.body.style.overscrollBehavior = 'none';
    document.documentElement.style.overscrollBehavior = 'none';

    return () => {
      // Cleanup on unmount
      document.body.style.overscrollBehavior = '';
      document.documentElement.style.overscrollBehavior = '';
    };
  }, []);

  return (
    <main className="min-h-screen bg-gray-950 text-white relative overflow-x-hidden w-full overscroll-none touch-pan-y">
      {/* Background Effects */}
      <div className="fixed inset-0 w-full h-full">
        <AnimatedGrid />
        <GlowingOrbs />
      </div>

      {/* Header with Logo and Buttons */}
      <SplashHeader />

      {/* Sticky Navigation - Shows when scrolled */}
      {isScrolled && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gray-950 border-b border-green-400/30 shadow-xl shadow-black/50 transition-all duration-300 min-h-[80px] w-full">
          <div className="bg-gray-950 w-full h-full">
            <SplashHeader />
          </div>
        </div>
      )}

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col min-h-screen w-full max-w-full overflow-x-hidden overscroll-none">
        {/* Content Section */}
        <section className="flex-1 flex flex-col px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-200 via-white to-green-200 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-lg">Last updated July 01, 2025</p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="space-y-8">
            
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
          </div>
        </div>

          {/* Back to Home */}
          <div className="mt-12 text-center">
            <a 
              href="/" 
              className="inline-flex items-center bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25"
            >
              ← Back to Home
            </a>
          </div>
        </div>
        </section>
      </div>
    </main>
  );
}