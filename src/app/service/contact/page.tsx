"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { toast } from "react-hot-toast";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Email is invalid"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
  attachmentUrl: z.string().url().optional().nullable(),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "" },
  });

  async function onSubmit(data: ContactForm) {
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json?.message || "Failed to send message");
        return;
      }
      toast.success("Message sent — we will reply within 24 hours");
      reset();
    } catch (err) {
      console.error(err);
      toast.error("Network error, please try later");
    }
  }

  return (
    <div className="bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-400 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-2 font-semibold text-gray-900">
                        Full Name <span className="text-green-600">*</span>
                      </label>
                      <input
                        {...register("name")}
                        placeholder="John Doe"
                        className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 border-gray-900 ${
                          errors.name ? "border-red-500" : ""
                        }`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-2 font-semibold text-gray-900">
                        Email Address <span className="text-green-600">*</span>
                      </label>
                      <input
                        {...register("email")}
                        placeholder="john@example.com"
                        className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 border-gray-900 ${
                          errors.email ? "border-red-500" : ""
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold text-gray-900">
                      Phone Number (Optional)
                    </label>
                    <input
                      {...register("phone")}
                      placeholder="+1 (555) 123-4567"
                      className="w-full border border-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold text-gray-900">
                      Subject <span className="text-green-600">*</span>
                    </label>
                    <select
                      {...register("subject")}
                      className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 border-gray-900 ${
                        errors.subject ? "border-red-500" : ""
                      }`}
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="order">Order Status</option>
                      <option value="return">Returns & Exchanges</option>
                      <option value="product">Product Question</option>
                      <option value="sizing">Sizing Help</option>
                      <option value="wholesale">Wholesale Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold text-gray-900">
                      Message <span className="text-green-600">*</span>
                    </label>
                    <textarea
                      {...register("message")}
                      rows={6}
                      placeholder="Tell us how we can help you..."
                      className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 border-gray-900 resize-none ${
                        errors.message ? "border-red-500" : ""
                      }`}
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-green-500 to-green-400 text-white py-4 rounded-xl hover:scale-[1.02] transform transition font-semibold text-lg flex items-center justify-center gap-2 shadow-md"
                  >
                    <Send size={20} />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info / Quick Links */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  {[
                    {
                      icon: <Mail size={24} />,
                      title: "Email",
                      lines: [
                        "ribbitttians@gmail.com",
                        "We reply within 24 hours",
                      ],
                    },
                    {
                      icon: <Phone size={24} />,
                      title: "Phone",
                      lines: ["+91 9901992861", "Mon-Fri 9AM-6PM EST"],
                    },
                    {
                      icon: <MapPin size={24} />,
                      title: "Address",
                      lines: ["Udupi", "Karnataka", "India"],
                    },
                    {
                      icon: <Clock size={24} />,
                      title: "Business Hours",
                      lines: [
                        "Mon-Fri: 9AM - 6PM",
                        "Sat: 10AM - 4PM",
                        "Sun: Closed",
                      ],
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        {item.lines.map((line, idx) => (
                          <p key={idx} className="text-gray-700 text-sm">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold mb-4">Quick Help</h3>
                <ul className="space-y-3">
                  <li>
                    <a className="text-green-600 hover:underline">
                      → Track Your Order
                    </a>
                  </li>
                  <li>
                    <a className="text-green-600 hover:underline">
                      → Shipping Information
                    </a>
                  </li>
                  <li>
                    <a className="text-green-600 hover:underline">
                      → Return Policy
                    </a>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-green-600 to-green-400 text-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  <button className="w-10 h-10 bg-white text-green-600 rounded-full font-bold">
                    f
                  </button>
                  <button className="w-10 h-10 bg-white text-green-600 rounded-full font-bold">
                    𝕏
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="bg-gray-200 h-96 rounded-2xl flex items-center justify-center shadow-inner">
            <p className="text-gray-500 text-xl">
              Map Location (Google Maps Integration)
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
