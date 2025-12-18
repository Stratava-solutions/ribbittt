'use client'
import React, { useState } from 'react';
import { Shield, Lock, Users, Mail, Cookie, FileText, ChevronDown, ChevronUp, Baby, CheckCircle, AlertCircle } from 'lucide-react';

export default function PrivacyPolicy() {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (index:any) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const sections = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Information We Collect",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">We collect the following types of information to provide you with the best shopping experience:</p>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
            <p className="font-bold mb-4 flex items-center gap-2" style={{ color: '#00a63e' }}>
              <CheckCircle className="w-5 h-5" />
              Personal Information
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {['Name', 'Email Address', 'Phone Number', 'Shipping Address', 'Billing Address', 'Payment Details'].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#00a63e' }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-4 italic">
              * Payment details are processed securely through third-party payment gateways
            </p>
          </div>
        </div>
      )
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "How We Use Your Information",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed mb-4">Your information helps us provide a seamless shopping experience:</p>
          <div className="grid gap-3">
            {[
              { title: 'Order Processing', desc: 'To process and fulfill your orders efficiently' },
              { title: 'Website Enhancement', desc: 'To improve our website and user experience' },
              { title: 'Communication', desc: 'To send order updates and promotional emails (opt-out anytime)' },
              { title: 'Security', desc: 'To prevent fraudulent transactions and ensure security' },
              { title: 'Legal Compliance', desc: 'To comply with legal requirements' }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-green-200 transition-colors">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#00a63e20' }}>
                  <CheckCircle className="w-4 h-4" style={{ color: '#00a63e' }} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Sharing Your Information",
      content: (
        <div className="space-y-4">
          <div className="bg-green-50 border-l-4 p-5 rounded-lg" style={{ borderColor: '#00a63e' }}>
            <p className="font-bold text-gray-900 flex items-center gap-2">
              <Shield className="w-5 h-5" style={{ color: '#00a63e' }} />
              We do not sell, trade, or rent your personal information
            </p>
          </div>
          
          <p className="text-gray-700 leading-relaxed">However, we may share your data with trusted partners in limited circumstances:</p>
          
          <div className="space-y-3">
            <div className="bg-white p-5 rounded-xl border border-gray-100">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#00a63e20' }}>
                  <Users className="w-5 h-5" style={{ color: '#00a63e' }} />
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1">Service Providers</p>
                  <p className="text-gray-600 text-sm">Third-party vendors such as payment processors and shipping partners to facilitate your transactions</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl border border-gray-100">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#00a63e20' }}>
                  <AlertCircle className="w-5 h-5" style={{ color: '#00a63e' }} />
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1">Legal Compliance</p>
                  <p className="text-gray-600 text-sm">When required by law or to protect our rights and your safety</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Data Security",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-gray-50 to-green-50 p-6 rounded-2xl border border-gray-100">
            <Lock className="w-12 h-12 mb-4" style={{ color: '#00a63e' }} />
            <p className="text-gray-700 leading-relaxed mb-4">
              We take reasonable security measures to protect your personal information using industry-standard encryption and security protocols.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-gray-700 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <span>However, no online platform is completely secure. We encourage users to safeguard their account details and use strong passwords.</span>
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: <Cookie className="w-6 h-6" />,
      title: "Cookies and Tracking Technologies",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            We use cookies and similar technologies to enhance your browsing experience and understand how you interact with our website.
          </p>
          <div className="bg-white p-5 rounded-xl border border-gray-100">
            <p className="font-semibold text-gray-900 mb-3">What are cookies?</p>
            <p className="text-gray-600 text-sm mb-4">
              Cookies are small text files stored on your device that help us remember your preferences and improve your experience.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                You can modify your browser settings to disable cookies, but this may affect website functionality and your user experience.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Your Rights",
      content: (
        <div className="space-y-3">
          <p className="text-gray-700 leading-relaxed mb-4">You have full control over your personal information:</p>
          {[
            { title: 'Access & Update', desc: 'View and modify your personal information anytime' },
            { title: 'Delete Data', desc: 'Request deletion of your personal information' },
            { title: 'Opt-Out', desc: 'Unsubscribe from marketing emails with one click' },
            { title: 'Data Inquiry', desc: 'Request details on how we collect and use your data' }
          ].map((right, i) => (
            <div key={i} className="flex items-start gap-4 p-4 bg-gradient-to-r from-white to-green-50 rounded-xl border border-gray-100">
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#00a63e' }}>
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{right.title}</p>
                <p className="text-sm text-gray-600 mt-1">{right.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      icon: <Baby className="w-6 h-6" />,
      title: "Children's Privacy",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-2xl border border-pink-100">
            <Baby className="w-12 h-12 mb-4 text-pink-500" />
            <p className="text-gray-700 leading-relaxed mb-4">
              While we sell kids' wear and accessories, our website is designed for parents and guardians.
            </p>
            <div className="bg-white rounded-lg p-4 border border-pink-200">
              <p className="font-semibold text-gray-900 mb-2">Important Notice</p>
              <p className="text-sm text-gray-700">
                Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from minors.
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full -mr-32 -mt-32 opacity-50" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-teal-100 to-green-100 rounded-full -ml-24 -mb-24 opacity-50" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-6">
              <div className="p-5 rounded-2xl shadow-lg" style={{ backgroundColor: '#00a63e' }}>
                <Shield className="w-14 h-14 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-center mb-4" style={{ color: '#00a63e' }}>
              Privacy Policy
            </h1>
            <p className="text-center text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Your privacy is important to us. Learn how we collect, use, and protect your personal information when you shop at RIBBITT.
            </p>
          </div>
        </div>

        {/* Accordion Sections */}
        <div className="space-y-4">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100"
            >
              <button
                onClick={() => toggleSection(index)}
                className="w-full px-6 sm:px-8 py-6 flex items-center justify-between text-left hover:bg-gradient-to-r hover:from-green-50 hover:to-transparent transition-colors"
              >
                <div className="flex items-center space-x-4 sm:space-x-5">
                  <div className="p-3 sm:p-4 rounded-xl text-white shadow-md" style={{ backgroundColor: '#00a63e' }}>
                    {section.icon}
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                    {section.title}
                  </h2>
                </div>
                <div className="flex-shrink-0 ml-4">
                  {expandedSection === index ? (
                    <ChevronUp className="w-6 h-6 text-gray-400 transition-transform" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400 transition-transform" />
                  )}
                </div>
              </button>
              
              {expandedSection === index && (
                <div className="px-6 sm:px-8 pb-6 pt-2 border-t border-gray-100 animate-fadeIn">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Changes to Policy */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mt-8 border border-gray-100">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#00a63e20' }}>
              <FileText className="w-6 h-6" style={{ color: '#00a63e' }} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Changes to This Policy</h3>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. Changes will be posted on this page with a revised date. We encourage you to review this policy regularly.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="rounded-2xl shadow-2xl p-8 sm:p-10 mt-8 text-white relative overflow-hidden" style={{ backgroundColor: '#00a63e' }}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-8 h-8" />
              <h3 className="text-2xl sm:text-3xl font-bold">Get in Touch</h3>
            </div>
            <p className="text-lg mb-6 text-green-50">
              Have questions about your privacy or our data practices? We're here to help.
            </p>
            <a 
              href="mailto:RIBBITT@GMAIL.COM" 
              className="inline-flex items-center gap-3 text-xl font-bold bg-white px-8 py-4 rounded-xl transition-all hover:scale-105 hover:shadow-lg"
              style={{ color: '#00a63e' }}
            >
              <Mail className="w-6 h-6" />
              RIBBITT@GMAIL.COM
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-10 text-gray-500">
          <p className="text-sm">Last updated: December 2024</p>
          <p className="text-sm mt-2">© 2024 RIBBITT. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}