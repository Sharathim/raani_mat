import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BrandHeader } from '../components/common/BrandHeader';
import { Footer } from '../components/common/Footer';
import { SectionHeader } from '../components/common/DecorativeElements';
import { BRAND, SUCCESS_STORIES, FAQS } from '../utils/constants';
import heroBg from '../assets/hero-bg.jpg';
import {
  HeartHandshake,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
  Scroll,
  FileCheck2,
  Clock,
  Heart,
  Award,
  CheckCircle2,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Quote,
  ArrowRight
} from 'lucide-react';

export function HomePage() {
  const [openFaq, setOpenFaq] = useState(0);

  const serviceFeatures = [
    {
      icon: Users,
      title: 'Matrimonial Profile Registration',
      desc: 'Comprehensive profile registration with complete personal, family, education, and career details for all communities.'
    },
    {
      icon: Scroll,
      title: 'Horoscope & Birth Star Matching',
      desc: 'Accurate horoscope compatibility assistance including Nakshatra, Rasi, Lagnam, and Dosham analysis.'
    },
    {
      icon: FileCheck2,
      title: 'Family Background Verification',
      desc: 'Reliable details regarding parents, siblings, family values, and native background for complete peace of mind.'
    },
    {
      icon: Award,
      title: 'Education & Career Preference',
      desc: 'Curated matches matching your preferred qualifications, government or private employment, and income criteria.'
    },
    {
      icon: ShieldCheck,
      title: 'Privacy & Confidentiality',
      desc: 'Candidate photos and contact details are handled with strict privacy and shared only with verified prospects.'
    },
    {
      icon: Heart,
      title: 'Personalized Match Assistance',
      desc: 'One-on-one consultation and direct guidance from our experienced team at our Nerkundram service center.'
    }
  ];

  const whyChooseUs = [
    {
      number: '01',
      title: 'Traditional & Trusted Service',
      desc: 'Serving families for years with high trust, goodwill, and thousands of successful matrimonial alliances.'
    },
    {
      number: '02',
      title: 'Serving All Communities',
      desc: 'Respecting traditional customs and cultural preferences to identify ideal bride and groom alliances across all communities.'
    },
    {
      number: '03',
      title: 'Quick & Simple Online Registration',
      desc: 'Seamlessly submit candidate details in a clean, step-by-step form from any smartphone or computer in just a few minutes.'
    },
    {
      number: '04',
      title: 'Dedicated Helpline & Service Center',
      desc: 'Our team directly follows up with registered families via phone calls and in-person consultations to ensure active matching.'
    }
  ];

  const processSteps = [
    {
      step: '1',
      title: 'Submit Profile Online',
      desc: 'Fill in basic candidate information, family background, horoscope, education, and partner preferences.'
    },
    {
      step: '2',
      title: 'Profile Verification',
      desc: 'Our matrimonial service center reviews and verifies the submitted details to begin active matchmaking.'
    },
    {
      step: '3',
      title: 'Curated Match Introductions',
      desc: 'We identify compatible prospective matches and facilitate initial introductions via phone and WhatsApp.'
    },
    {
      step: '4',
      title: 'Auspicious Marriage Union',
      desc: 'Mutual family consultations and horoscope matching lead to a blessed, happy matrimonial journey.'
    }
  ];

  return (
    <div className="site-shell home-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <BrandHeader />

      <main style={{ flex: 1 }}>
        {/* =========================================================================
            HERO SECTION
            ========================================================================= */}
        <section
          className="home-section hero-section"
          style={{
            position: 'relative',
            borderBottom: '2px solid var(--border)',
            overflow: 'hidden',
            backgroundColor: '#fffdf8'
          }}
        >
          {/* Background Artwork Layer */}
          <div
            className="hero-bg-layer"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${heroBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              zIndex: 1
            }}
          />

          {/* Vignette Layer */}
          <div
            className="hero-vignette-layer"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 2,
              pointerEvents: 'none'
            }}
          />

          <div className="container" style={{ position: 'relative', zIndex: 3 }}>
            {/* Desktop Hero Content */}
            <div className="hero-desktop-content">
              <div
                className="hero-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '3rem',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        background: 'rgba(25, 6, 10, 0.85)',
                        color: '#ffd269',
                        border: '1px solid rgba(227, 189, 99, 0.65)',
                        borderRadius: 'var(--radius-pill)',
                        padding: '0.35rem 0.95rem',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        letterSpacing: '0.5px',
                        backdropFilter: 'blur(8px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.35)'
                      }}
                    >
                      <span style={{ color: '#ffd700' }}>❖</span> {BRAND.tagline} <span style={{ color: '#ffd700' }}>❖</span>
                    </span>
                  </div>

                  <h1
                    className="font-tamil-serif"
                    style={{
                      color: '#ffffff',
                      fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                      lineHeight: 1.2,
                      marginBottom: '0.5rem',
                      fontWeight: 800,
                      textShadow: '0 2px 14px rgba(0, 0, 0, 0.9), 0 4px 28px rgba(0, 0, 0, 0.75)'
                    }}
                  >
                    {BRAND.tamilName}
                  </h1>

                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      color: '#ffd56b',
                      fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
                      fontWeight: 800,
                      letterSpacing: '0.5px',
                      marginBottom: '1.25rem',
                      textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)'
                    }}
                  >
                    {BRAND.englishName}
                  </div>

                  <div
                    style={{
                      fontSize: '1.15rem',
                      fontWeight: 600,
                      color: '#fff1c5',
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.85)'
                    }}
                  >
                    <span>{BRAND.subTagline}</span>
                  </div>

                  <p
                    style={{
                      color: '#f8f8fa',
                      fontSize: '1.05rem',
                      lineHeight: 1.7,
                      marginBottom: '2rem',
                      maxWidth: '540px',
                      fontWeight: 500,
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.95)'
                    }}
                  >
                    Find compatible matches tailored to your family's expectations, values, and traditions. Register your matrimonial profile today with Chennai's trusted matrimonial service center.
                  </p>

                  {/* Desktop Hero CTAs */}
                  <div className="hero-actions" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                    <Link
                      to="/register"
                      className="btn btn-primary btn-lg"
                      style={{
                        background: 'linear-gradient(135deg, #8a0c20 0%, #5a0715 100%)',
                        color: '#ffffff',
                        border: '1.5px solid #e3bd63',
                        boxShadow: '0 6px 20px rgba(0,0,0,0.5)'
                      }}
                    >
                      <HeartHandshake size={22} color="#ffe082" />
                      <div style={{ textAlign: 'left', lineHeight: 1.1 }}>
                        <div style={{ fontWeight: 700 }}>Register Profile</div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 400, opacity: 0.95, color: '#fceed1' }}>Quick 7-Step Online Form</span>
                      </div>
                    </Link>

                    <a
                      href={`tel:${BRAND.phones[0]}`}
                      className="btn btn-secondary btn-lg"
                      style={{
                        backgroundColor: '#ffffff',
                        color: '#5a0715',
                        border: '1.5px solid #e3bd63',
                        boxShadow: '0 6px 20px rgba(0,0,0,0.35)'
                      }}
                    >
                      <Phone size={20} color="#5a0715" />
                      <div style={{ textAlign: 'left', lineHeight: 1.1 }}>
                        <div style={{ fontWeight: 700, color: '#5a0715' }}>Call Helpline</div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#5a0715', opacity: 0.85 }}>Direct Service Center</span>
                      </div>
                    </a>
                  </div>

                  {/* Quick Trust Badges */}
                  <div
                    className="hero-trust-list"
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '1.5rem',
                      marginTop: '2.5rem',
                      paddingTop: '1.5rem',
                      borderTop: '1px solid rgba(255, 255, 255, 0.25)',
                      fontSize: '0.85rem',
                      color: '#ffffff',
                      textShadow: '0 2px 6px rgba(0,0,0,0.9)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                      <CheckCircle2 size={16} color="#4ade80" />
                      <span>Verified Profiles</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                      <CheckCircle2 size={16} color="#4ade80" />
                      <span>Direct Center Guidance</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                      <CheckCircle2 size={16} color="#4ade80" />
                      <span>100% Confidentiality</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Hero Content */}
            <div className="hero-mobile-content">
              {/* Pill Badge */}
              <div className="hero-mobile-badge-wrap">
                <span className="hero-mobile-badge">
                  <span className="badge-star">❖</span>
                  <span>{BRAND.tagline}</span>
                  <span className="badge-star">❖</span>
                </span>
              </div>

              {/* Tamil Title */}
              <h1 className="hero-mobile-title font-tamil-serif">
                {BRAND.tamilName}
              </h1>

              {/* English Subtitle */}
              <div className="hero-mobile-subtitle">
                {BRAND.englishName}
              </div>

              {/* Decorative Accent Divider Line */}
              <div className="hero-mobile-line-accent" />

              {/* Sub-tagline */}
              <div className="hero-mobile-tagline">
                {BRAND.subTagline}
              </div>

              {/* Description */}
              <p className="hero-mobile-desc">
                Find a meaningful match that fits your family's values and traditions.
              </p>

              {/* Mobile CTA Cards */}
              <div className="hero-mobile-actions">
                {/* Button 1: Register Profile */}
                <Link to="/register" className="hero-mobile-btn-primary">
                  <div className="btn-icon-wrap">
                    <Heart size={22} color="#f4eee3" strokeWidth={1.8} />
                  </div>
                  <div className="btn-text-wrap">
                    <div className="btn-main-text">Register Profile</div>
                    <div className="btn-sub-text">Quick 7-Step Online Form</div>
                  </div>
                  <div className="btn-arrow-wrap">
                    <ArrowRight size={20} color="#f4eee3" strokeWidth={2.2} />
                  </div>
                </Link>

                {/* Button 2: Call Helpline */}
                <a href={`tel:${BRAND.phones[0]}`} className="hero-mobile-btn-secondary">
                  <div className="btn-icon-wrap">
                    <Phone size={20} color="#5a0715" strokeWidth={1.8} />
                  </div>
                  <div className="btn-text-wrap">
                    <div className="btn-main-text">Call Helpline</div>
                    <div className="btn-sub-text">Direct Service Center</div>
                  </div>
                  <div className="btn-arrow-wrap">
                    <ArrowRight size={20} color="#5a0715" strokeWidth={2.2} />
                  </div>
                </a>
              </div>

              {/* Bottom Carousel / Pagination Dots */}
              <div className="hero-mobile-dots">
                <span className="dot active" />
                <span className="dot" />
                <span className="dot" />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SERVICES / HIGHLIGHTS SECTION
            ========================================================================= */}
        <section id="services" className="home-section services-section">
          <div className="container">
            {/* Desktop Section Header */}
            <div className="services-header-desktop">
              <SectionHeader
                title="Our Matrimonial Services"
                subtitle="Personalized assistance, verified profiles, and traditional matching for all communities."
              />
            </div>

            {/* Mobile Section Header */}
            <div className="services-header-mobile">
              <div className="services-mobile-overline">
                <span className="overline-line" />
                <span className="overline-text">OUR SERVICES</span>
                <span className="overline-line" />
              </div>
              <h2 className="services-mobile-title">Everything You Need for a Better Tomorrow</h2>
              <p className="services-mobile-subtitle">Trusted support at every step of your matrimonial journey.</p>
            </div>

            <div className="services-grid">
              {serviceFeatures.map((svc, idx) => {
                const Icon = svc.icon;
                return (
                  <div key={idx} className="card-ornate service-card">
                    <div className="service-icon-box">
                      <Icon className="service-icon" />
                    </div>

                    <div className="service-card-body">
                      <h3 className="service-card-title">
                        {svc.title}
                      </h3>
                      <p className="service-card-desc">
                        {svc.desc}
                      </p>
                    </div>

                    <Link to="/register" className="service-card-arrow" aria-label={`Register for ${svc.title}`}>
                      <ArrowRight size={15} strokeWidth={2.2} />
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Mobile Bottom CTA */}
            <div className="services-mobile-bottom">
              <Link to="/register" className="services-mobile-cta">
                <Heart size={18} fill="currentColor" strokeWidth={1.5} />
                <span>Register Your Profile</span>
                <ArrowRight size={18} strokeWidth={2} />
              </Link>
              <div className="services-mobile-footer-tag">
                <span className="footer-line" />
                <span>BEGIN YOUR JOURNEY TODAY</span>
                <span className="footer-line" />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            WHY CHOOSE US & PROCESS SECTION
            ========================================================================= */}
        <section id="about" className="home-section" style={{ padding: '4.5rem 1.25rem', backgroundColor: 'var(--cream)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div className="container">
            <SectionHeader
              title="Why Choose Rani Matrimony?"
              subtitle="A trusted blend of traditional family values, personal attention, and transparent matchmaking."
            />

            <div
              className="benefits-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                marginBottom: '4rem'
              }}
            >
              {whyChooseUs.map((item, idx) => (
                <div
                  key={idx}
                  className="card-ornate"
                  style={{
                    padding: '1.75rem 1.5rem',
                    backgroundColor: 'var(--paper)',
                    position: 'relative'
                  }}
                >
                  <div
                    style={{
                      fontSize: '2rem',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 800,
                      color: 'var(--gold-500)',
                      opacity: 0.7,
                      lineHeight: 1,
                      marginBottom: '0.75rem'
                    }}
                  >
                    {item.number}
                  </div>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--maroon-950)', marginBottom: '0.5rem', fontWeight: 700 }}>
                    {item.title}
                  </h3>
                  <p style={{ color: 'var(--ink)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Step-by-Step Registration Process */}
            <div
              className="card-ornate process-card"
              style={{
                padding: '2.5rem 2rem',
                backgroundColor: 'var(--paper)',
                border: '1.5px solid var(--gold-500)'
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
                <span className="pill-title">
                  <span>❖</span> Simple 4-Step Process <span>❖</span>
                </span>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--maroon-950)', marginTop: '0.5rem', fontWeight: 800 }}>
                  How It Works
                </h3>
              </div>

              <div
                className="process-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '1.5rem'
                }}
              >
                {processSteps.map((p, idx) => (
                  <div key={idx} className="process-step" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--maroon-900)',
                        color: 'var(--gold-100)',
                        border: '2px solid var(--gold-500)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '1.1rem',
                        marginBottom: '1rem',
                        boxShadow: 'var(--shadow-gold)'
                      }}
                    >
                      {p.step}
                    </div>
                    <div style={{ fontWeight: 700, color: 'var(--maroon-950)', fontSize: '1rem', marginBottom: '0.35rem' }}>
                      {p.title}
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.5, margin: 0 }}>
                      {p.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                <Link to="/register" className="btn btn-primary btn-lg">
                  <HeartHandshake size={20} />
                  <span>Register Profile Now</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            HAPPY COUPLES & SUCCESS STORIES SECTION
            ========================================================================= */}
        <section id="stories" className="home-section" style={{ padding: '4.5rem 1.25rem', backgroundColor: 'var(--ivory)' }}>
          <div className="container">
            <SectionHeader
              title="Happy Couples & Success Stories"
              subtitle="Heartwarming experiences of families who found their blessed match through our service."
            />

            <div
              className="stories-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.75rem'
              }}
            >
              {SUCCESS_STORIES.map((story, idx) => (
                <div
                  key={idx}
                  className="card-ornate"
                  style={{
                    padding: '1.75rem 1.5rem',
                    backgroundColor: 'var(--paper)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold-700)', marginBottom: '0.75rem' }}>
                      <Quote size={24} />
                      <div style={{ display: 'flex', gap: '2px', color: '#e3bd63' }}>
                        {'★'.repeat(5)}
                      </div>
                    </div>
                    <p style={{ color: 'var(--ink)', fontSize: '0.92rem', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '1.25rem' }}>
                      "{story.quote}"
                    </p>
                  </div>

                  <div style={{ borderTop: '1px solid var(--line)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--maroon-900)', fontSize: '1rem' }}>
                        {story.couple}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
                        {story.location}
                      </div>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--gold-800)', fontWeight: 600, background: 'var(--cream)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border)' }}>
                      {story.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            FAQS SECTION
            ========================================================================= */}
        <section className="home-section faq-section" style={{ padding: '4.5rem 1.25rem', backgroundColor: 'var(--cream)', borderTop: '1px solid var(--border)' }}>
          <div className="container-narrow">
            <SectionHeader
              title="Frequently Asked Questions (FAQs)"
              subtitle="Clear information regarding profile registration, verification, and match assistance."
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="card-ornate"
                    style={{
                      backgroundColor: 'var(--paper)',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden'
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      style={{
                        width: '100%',
                        padding: '1.2rem 1.5rem',
                        background: 'none',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        textAlign: 'left',
                        cursor: 'pointer',
                        gap: '1rem'
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--maroon-950)' }}>
                          {faq.q}
                        </div>
                      </div>
                      <span style={{ color: 'var(--maroon-800)', flexShrink: 0 }}>
                        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </span>
                    </button>

                    {isOpen && (
                      <div style={{ padding: '0 1.5rem 1.25rem', color: 'var(--ink)', fontSize: '0.92rem', lineHeight: 1.6, borderTop: '1px solid var(--line)', paddingTop: '0.85rem' }}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            CONTACT SECTION
            ========================================================================= */}
        {/* =========================================================================
            CONTACT SECTION
            ========================================================================= */}
        <section id="contact" className="home-section contact-section" style={{ padding: '4.5rem 1.25rem', backgroundColor: 'var(--ivory)' }}>
          <div className="container">
            <SectionHeader
              title="Contact Our Service Center"
              subtitle="Visit our service center in Nerkundram, Chennai, or reach out to our team directly."
            />

            {/* Desktop View: Ornate Card with 2 Columns */}
            <div className="contact-desktop-wrapper">
              <div
                className="card-ornate"
                style={{
                  backgroundColor: 'var(--paper)',
                  padding: '2.5rem 2rem',
                  maxWidth: '900px',
                  margin: '0 auto',
                  border: '2px solid var(--border)'
                }}
              >
                <div
                  className="contact-grid"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '2rem'
                  }}
                >
                  {/* Contact Card 1: Phones */}
                  <div style={{ background: 'var(--cream)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--maroon-900)' }}>
                      <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'var(--paper)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}>
                        <Phone size={20} color="var(--maroon-800)" />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1.1rem', margin: 0, fontWeight: 700 }}>
                          Phone Numbers
                        </h4>
                        <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Direct Service Center Lines</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '1rem' }}>
                      <a href="tel:9092177888" style={{ color: 'var(--maroon-900)', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span>📞</span> +91 9092177888
                      </a>
                      <a href="tel:9003192733" style={{ color: 'var(--maroon-900)', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span>📞</span> +91 9003192733
                      </a>
                      <a href="tel:04446621102" style={{ color: 'var(--maroon-900)', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span>☎</span> 044 4662 1102 (Landline)
                      </a>
                    </div>
                  </div>

                  {/* Contact Card 2: Email & Address */}
                  <div style={{ background: 'var(--cream)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--maroon-900)' }}>
                      <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'var(--paper)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}>
                        <MapPin size={20} color="var(--maroon-800)" />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1.1rem', margin: 0, fontWeight: 700 }}>
                          Office Address & Timings
                        </h4>
                        <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Chennai Service Center</div>
                      </div>
                    </div>

                    <p style={{ color: 'var(--ink)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                      {BRAND.address}
                    </p>
                    <div style={{ fontSize: '0.85rem', color: 'var(--maroon-800)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <span>🕒</span> {BRAND.hours}
                    </div>
                    <div style={{ marginTop: '0.5rem' }}>
                      <a href={`mailto:${BRAND.email}`} style={{ color: 'var(--maroon-700)', fontSize: '0.85rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <span>✉</span> {BRAND.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile View: 2 Standalone White Cards */}
            <div className="contact-mobile-wrapper">
              {/* Card 1: Phone Number */}
              <div className="contact-mobile-card">
                <div className="contact-mobile-header">
                  <div className="contact-mobile-icon-circle">
                    <Phone size={24} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h4 className="contact-mobile-title">Phone Number</h4>
                    <div className="contact-mobile-subtitle">Direct Service Center Helpline</div>
                  </div>
                </div>

                <div className="contact-mobile-divider" />

                <a href={`tel:${BRAND.phones[0]}`} className="contact-mobile-phone-val">
                  {BRAND.displayPhones}
                </a>
              </div>

              {/* Card 2: Office Address & Timings */}
              <div className="contact-mobile-card" style={{ marginTop: '1rem' }}>
                <div className="contact-mobile-header">
                  <div className="contact-mobile-icon-circle">
                    <MapPin size={24} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h4 className="contact-mobile-title">Office Address & Timings</h4>
                    <div className="contact-mobile-subtitle">Chennai Service Center</div>
                  </div>
                </div>

                <div className="contact-mobile-inset">
                  <div className="contact-mobile-inset-item">
                    <MapPin size={18} className="contact-mobile-inset-icon" />
                    <span>{BRAND.address}</span>
                  </div>

                  <div className="contact-mobile-inset-divider" />

                  <div className="contact-mobile-inset-item">
                    <Clock size={18} className="contact-mobile-inset-icon" />
                    <span>{BRAND.hours}</span>
                  </div>

                  <div className="contact-mobile-inset-divider" />

                  <div className="contact-mobile-inset-item">
                    <Mail size={18} className="contact-mobile-inset-icon" />
                    <a href={`mailto:${BRAND.email}`} className="contact-mobile-email-link">
                      {BRAND.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Quick Helpline Action on Bottom Right */}
      <div
        className="floating-contact-actions"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}
      >
        <a
          href={`https://wa.me/91${BRAND.whatsapp}?text=${encodeURIComponent('Hello, I would like to inquire about matrimonial profile registration at Rani Thirumana Sevai Maiyam.')}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            backgroundColor: '#25D366',
            color: '#ffffff',
            borderRadius: '50%',
            width: '52px',
            height: '52px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
            textDecoration: 'none'
          }}
          title="Chat with us on WhatsApp"
        >
          <MessageCircle size={28} />
        </a>
        <a
          href={`tel:${BRAND.phones[0]}`}
          style={{
            backgroundColor: 'var(--maroon-900)',
            color: 'var(--gold-100)',
            borderRadius: '50%',
            width: '52px',
            height: '52px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
            border: '2px solid var(--gold-500)',
            textDecoration: 'none'
          }}
          title="Direct Phone Call"
        >
          <Phone size={24} />
        </a>
      </div>

      <Footer />
    </div>
  );
}
