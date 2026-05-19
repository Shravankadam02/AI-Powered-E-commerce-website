import React from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";

import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

const Contact = () => {
  const navigate = useNavigate();

  const contactCards = [
    {
      icon: <FaEnvelope />,
      title: "Email Us",
      value: "support@snapcart.com",
    },
    {
      icon: <FaPhoneAlt />,
      title: "Call Us",
      value: "+91 98765 43210",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Location",
      value: "Mumbai, India",
    },
    {
      icon: <FaClock />,
      title: "Support Hours",
      value: "24/7 Available",
    },
  ];

  const faqs = [
    {
      question: "How long does delivery take?",
      answer:
        "Orders are typically delivered within 3-7 business days depending on your location.",
    },
    {
      question: "Can I return products?",
      answer:
        "Yes, we offer easy returns within 7 days of delivery for eligible items.",
    },
    {
      question: "Are payments secure?",
      answer:
        "Absolutely. All payments are encrypted and secured with trusted gateways.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order ships, you’ll receive tracking details via email and SMS.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#141414] to-[#0c2025] text-white overflow-hidden">
      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <section className="relative pt-36 pb-24 px-6 lg:px-10">
        {/* GLOW */}
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-white/5 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-white/40 mb-5">
            Contact SnapCart
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            We’d Love to
            <span className="block text-white/60 mt-2">
              Hear From You
            </span>
          </h1>

          <p className="text-white/50 max-w-2xl mx-auto mt-8 text-sm sm:text-base leading-relaxed">
            Have questions, feedback, or need support?
            Our team is always ready to help you with your
            SnapCart experience.
          </p>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="px-6 lg:px-10 pb-10">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactCards.map((card, index) => (
            <div
              key={index}
              className="
                bg-white/5
                border border-white/10
                rounded-2xl
                p-7
                backdrop-blur-md

                hover:bg-white/10
                hover:-translate-y-1

                transition-all duration-300
              "
            >
              {/* ICON */}
              <div
                className="
                  w-14 h-14
                  rounded-2xl
                  bg-white/10

                  flex items-center justify-center

                  text-2xl
                  mb-5
                "
              >
                {card.icon}
              </div>

              <h3 className="text-lg font-semibold mb-2">
                {card.title}
              </h3>

              <p className="text-white/50 text-sm leading-relaxed">
                {card.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="px-6 lg:px-10 py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">

          {/* LEFT CONTENT */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">
              Get In Touch
            </p>

            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
              Let’s Start a
              <span className="block text-white/60">
                Conversation
              </span>
            </h2>

            <p className="text-white/50 leading-relaxed max-w-lg">
              Whether you have a question about orders,
              payments, collaborations, or support —
              feel free to reach out anytime.
            </p>
          </div>

          {/* FORM */}
          <div
            className="
              bg-white/5
              border border-white/10
              rounded-3xl
              p-8
              backdrop-blur-md
            "
          >
            <form className="flex flex-col gap-5">

              {/* NAME */}
              <input
                type="text"
                placeholder="Your Name"
                className="
                  w-full
                  bg-white/5
                  border border-white/10
                  rounded-xl
                  px-4 py-4

                  text-white
                  placeholder:text-white/40

                  outline-none
                  focus:border-white/30

                  transition
                "
              />

              {/* EMAIL */}
              <input
                type="email"
                placeholder="Your Email"
                className="
                  w-full
                  bg-white/5
                  border border-white/10
                  rounded-xl
                  px-4 py-4

                  text-white
                  placeholder:text-white/40

                  outline-none
                  focus:border-white/30

                  transition
                "
              />

              {/* SUBJECT */}
              <input
                type="text"
                placeholder="Subject"
                className="
                  w-full
                  bg-white/5
                  border border-white/10
                  rounded-xl
                  px-4 py-4

                  text-white
                  placeholder:text-white/40

                  outline-none
                  focus:border-white/30

                  transition
                "
              />

              {/* MESSAGE */}
              <textarea
                rows="6"
                placeholder="Your Message..."
                className="
                  w-full
                  bg-white/5
                  border border-white/10
                  rounded-xl
                  px-4 py-4

                  text-white
                  placeholder:text-white/40

                  outline-none
                  resize-none
                  focus:border-white/30

                  transition
                "
              ></textarea>

              {/* BUTTON */}
              <button
                type="submit"
                className="
                  bg-white
                  text-black
                  py-4
                  rounded-xl
                  font-medium

                  hover:bg-gray-200
                  transition
                  active:scale-95
                "
              >
                Send Message
              </button>

            </form>
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="px-6 lg:px-10 py-10">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">
              FAQs
            </p>

            <h2 className="text-3xl md:text-5xl font-bold">
              Frequently Asked
              <span className="block text-white/60">
                Questions
              </span>
            </h2>
          </div>

          {/* FAQ GRID */}
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="
                  bg-white/5
                  border border-white/10
                  rounded-2xl
                  p-7
                  backdrop-blur-md

                  hover:bg-white/10
                  transition
                "
              >
                <h3 className="text-lg font-semibold mb-4">
                  {faq.question}
                </h3>

                <p className="text-white/50 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-10 py-24">
        <div
          className="
            max-w-7xl
            mx-auto

            bg-white/5
            border border-white/10
            rounded-3xl

            p-10 md:p-16
            text-center

            backdrop-blur-md
            relative overflow-hidden
          "
        >
          {/* GLOW */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/[0.03] to-transparent"></div>

          <div className="relative">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-5">
              Explore More
            </p>

            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Discover Premium
              <span className="block text-white/60">
                Fashion Collections
              </span>
            </h2>

            <p className="text-white/50 mt-6 max-w-2xl mx-auto leading-relaxed">
              Browse curated collections designed for every style,
              season, and occasion.
            </p>

            <button
              onClick={() => navigate("/collections")}
              className="
                mt-10
                bg-white
                text-black
                px-8 py-4
                rounded-xl
                font-medium

                hover:bg-gray-200
                transition
                active:scale-95
              "
            >
              Browse Collections
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Contact;