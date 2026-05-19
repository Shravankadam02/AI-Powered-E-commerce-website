import React from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";

import {
  FaShippingFast,
  FaShieldAlt,
  FaTags,
  FaHeadset,
} from "react-icons/fa";

const About = () => {
  const navigate = useNavigate();

  const stats = [
    {
      number: "10K+",
      label: "Happy Customers",
    },
    {
      number: "500+",
      label: "Premium Products",
    },
    {
      number: "99%",
      label: "Customer Satisfaction",
    },
    {
      number: "24/7",
      label: "Customer Support",
    },
  ];

  const features = [
    {
      icon: <FaTags />,
      title: "Premium Collections",
      desc: "Carefully curated fashion pieces crafted for every style and season.",
    },
    {
      icon: <FaShippingFast />,
      title: "Fast Delivery",
      desc: "Lightning-fast shipping experience with secure packaging nationwide.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Payments",
      desc: "Your transactions are encrypted and protected with advanced security.",
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      desc: "Dedicated support team always ready to assist you anytime.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#141414] to-[#0c2025] text-white overflow-hidden">
      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-36 pb-24 px-6 lg:px-10">
        {/* BACKGROUND GLOW */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-white/40 mb-5">
            About SnapCart
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl mx-auto">
            Redefining Modern Fashion
            <span className="block text-white/60 mt-2">
              with Premium Ecommerce
            </span>
          </h1>

          <p className="text-white/50 max-w-2xl mx-auto mt-8 text-sm sm:text-base leading-relaxed">
            SnapCart is built for the new generation of fashion lovers —
            delivering premium collections, seamless shopping experiences,
            and trend-forward styles all in one place.
          </p>

          <button
            onClick={() => navigate("/collections")}
            className="
              mt-10
              bg-white
              text-black
              px-8
              py-4
              rounded-xl
              font-medium
              hover:bg-gray-200
              transition
              active:scale-95
            "
          >
            Explore Collections
          </button>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="px-6 lg:px-10 py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          {/* IMAGE */}
          <div
            className="
              relative
              overflow-hidden
              rounded-3xl
              border border-white/10
              bg-white/5
              backdrop-blur-md
            "
          >
            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200&auto=format&fit=crop"
              alt="Fashion"
              className="w-full h-[500px] object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>

          {/* CONTENT */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">
              Our Story
            </p>

            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
              Fashion Should Feel
              <span className="block text-white/60">
                Effortless & Premium
              </span>
            </h2>

            <p className="text-white/50 leading-relaxed mb-6">
              SnapCart started with one simple vision — to make premium
              fashion accessible to everyone without compromising quality,
              style, or experience.
            </p>

            <p className="text-white/50 leading-relaxed mb-6">
              We combine modern ecommerce technology with carefully curated
              collections to deliver a shopping experience that feels smooth,
              stylish, and trustworthy.
            </p>

            <p className="text-white/50 leading-relaxed">
              Every product on SnapCart is selected to help you express your
              style confidently — whether it’s everyday essentials or standout
              statement pieces.
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="px-6 lg:px-10 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="
                bg-white/5
                border border-white/10
                rounded-2xl
                p-8
                backdrop-blur-md
                hover:bg-white/10
                transition
                text-center
              "
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-3">
                {item.number}
              </h3>

              <p className="text-white/50 text-sm">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="px-6 lg:px-10 py-24">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">
              Why Choose Us
            </p>

            <h2 className="text-3xl md:text-5xl font-bold">
              Built for Modern
              <span className="block text-white/60">
                Fashion Enthusiasts
              </span>
            </h2>
          </div>

          {/* GRID */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="
                  group
                  bg-white/5
                  border border-white/10
                  rounded-2xl
                  p-8
                  backdrop-blur-md

                  hover:bg-white/10
                  hover:-translate-y-2

                  transition-all
                  duration-300
                "
              >
                {/* ICON */}
                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-white/10
                    flex
                    items-center
                    justify-center
                    text-2xl
                    mb-6
                    group-hover:bg-white
                    group-hover:text-black
                    transition
                  "
                >
                  {feature.icon}
                </div>

                <h3 className="text-xl font-semibold mb-4">
                  {feature.title}
                </h3>

                <p className="text-white/50 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-10 pb-24">
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
            relative
            overflow-hidden
          "
        >
          {/* GLOW */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/[0.03] to-transparent"></div>

          <div className="relative">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-5">
              Start Shopping
            </p>

            <h2 className="text-3xl md:text-5xl font-bold max-w-3xl mx-auto leading-tight">
              Explore Our Latest
              <span className="block text-white/60">
                Fashion Collections
              </span>
            </h2>

            <p className="text-white/50 mt-6 max-w-2xl mx-auto leading-relaxed">
              Discover premium fashion pieces tailored for modern lifestyles.
              Upgrade your wardrobe with SnapCart today.
            </p>

            <button
              onClick={() => navigate("/collections")}
              className="
                mt-10
                bg-white
                text-black
                px-8
                py-4
                rounded-xl
                font-medium
                hover:bg-gray-200
                transition
                active:scale-95
              "
            >
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default About;