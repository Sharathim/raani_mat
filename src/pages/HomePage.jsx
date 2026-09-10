import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BrandHeader } from '../components/common/BrandHeader';
import { Footer } from '../components/common/Footer';
import { SectionHeader } from '../components/common/DecorativeElements';
import { BRAND, SUCCESS_STORIES, FAQS } from '../utils/constants';
import heroBg from '../assets/hero-bg.png';
import heroVideo from '../assets/hero.mp4';
import heroBrandLogo from '../assets/hero-brand-logo.png';
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
  Send,
  UserRound,
  ChevronDown,
  ChevronUp,
  Quote,
  ArrowRight
} from 'lucide-react';

export function HomePage() {
  const videoRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [contactForm, setContactForm] = useState({ name: '', phone: '', query: '' });
  const [contactErrors, setContactErrors] = useState({});

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Silently retry playback on first user touch/scroll if browser low-power mode restricts initial autoplay
        const startPlayback = () => {
          video.play().catch(() => { });
          ['touchstart', 'touchend', 'scroll', 'click'].forEach((evt) => {
            window.removeEventListener(evt, startPlayback);
          });
        };
        ['touchstart', 'touchend', 'scroll', 'click'].forEach((evt) => {
          window.addEventListener(evt, startPlayback, { once: true, passive: true });
        });
      });
    }
  }, []);

  const handleContactChange = (event) => {
    const { name, value } = event.target;
    setContactForm((current) => ({ ...current, [name]: value }));
    setContactErrors((current) => ({ ...current, [name]: '' }));
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    const phoneDigits = contactForm.phone.replace(/\D/g, '');

    if (!contactForm.name.trim()) nextErrors.name = 'Please enter your name.';
    if (phoneDigits.length !== 10) nextErrors.phone = 'Please enter a valid 10-digit phone number.';
    if (!contactForm.query.trim()) nextErrors.query = 'Please enter your query or message.';

    if (Object.keys(nextErrors).length) {
      setContactErrors(nextErrors);
      return;
    }

    const message = `Hello Rani Matrimony,\n\nName: ${contactForm.name.trim()}\nPhone: ${contactForm.phone.trim()}\n\nQuery:\n${contactForm.query.trim()}\n\nI would like to know more about your matrimonial services.`;
    window.open(`https://wa.me/91${BRAND.whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

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
          {/* Background Fallback Image (behind video) */}
          <div
            className="hero-bg-layer"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url(${heroBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 0,
              pointerEvents: 'none'
            }}
            aria-hidden="true"
          />

          {/* Background Video Layer */}
          <video
            ref={videoRef}
            className="hero-video-layer"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            webkit-playsinline="true"
            tabIndex={-1}
            disablePictureInPicture
            disableRemotePlayback
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 1,
              pointerEvents: 'none'
            }}
          >
            <source src={heroVideo} type="video/mp4" />
          </video>

          {/* Vignette Layer */}
          <div
            className="hero-vignette-layer"
            style={{
              position: 'absolute',
              inset: 0,
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

                  {/* Accessible Heading for SEO & Screen Readers */}
                  <h1 className="sr-only">
                    ராணி திருமண சேவை மையம் — Rani Thirumana Sevai Maiyam — {BRAND.subTagline}
                  </h1>

                  {/* Brand Identity Graphic matching the exact design */}
                  <div
                    className="hero-brand-display"
                    style={{
                      marginBottom: '0.85rem',
                      maxWidth: '380px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start'
                    }}
                  >
                    <img
                      src={heroBrandLogo}
                      alt="ராணி திருமண சேவை மையம் — அனைத்து சமூகத்தினருக்கும்."
                      className="hero-brand-logo-img"
                      style={{
                        width: '100%',
                        maxWidth: '360px',
                        height: 'auto',
                        display: 'block',
                        filter: 'drop-shadow(0 3px 12px rgba(80, 5, 15, 0.15))'
                      }}
                    />
                  </div>

                  <p
                    style={{
                      color: '#3d0611',
                      fontSize: '0.925rem',
                      lineHeight: 1.55,
                      marginBottom: '1.25rem',
                      maxWidth: '460px',
                      fontWeight: 500,
                      textShadow: '0 1px 2px rgba(255, 255, 255, 0.95)'
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
                        boxShadow: '0 6px 20px rgba(0,0,0,0.3)'
                      }}
                    >
                      <HeartHandshake size={20} color="#ffe082" />
                      <div style={{ textAlign: 'left', lineHeight: 1.1 }}>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Register Profile</div>
                        <span style={{ fontSize: '0.725rem', fontWeight: 400, opacity: 0.95, color: '#fceed1' }}>Quick 7-Step Online Form</span>
                      </div>
                    </Link>

                    <a
                      href={`tel:${BRAND.phones[0]}`}
                      className="btn btn-secondary btn-lg"
                      style={{
                        backgroundColor: '#ffffff',
                        color: '#5a0715',
                        border: '1.5px solid #e3bd63',
                        boxShadow: '0 6px 20px rgba(0,0,0,0.2)'
                      }}
                    >
                      <Phone size={18} color="#5a0715" />
                      <div style={{ textAlign: 'left', lineHeight: 1.1 }}>
                        <div style={{ fontWeight: 700, color: '#5a0715', fontSize: '0.95rem' }}>Call Helpline</div>
                        <span style={{ fontSize: '0.725rem', fontWeight: 500, color: '#5a0715', opacity: 0.85 }}>Direct Service Center</span>
                      </div>
                    </a>
                  </div>

                  {/* Quick Trust Badges */}
                  <div
                    className="hero-trust-list"
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '1.25rem',
                      marginTop: '1.75rem',
                      paddingTop: '1.25rem',
                      borderTop: '1px solid rgba(110, 10, 27, 0.18)',
                      fontSize: '0.825rem',
                      color: '#420612',
                      textShadow: '0 1px 2px rgba(255, 255, 255, 0.95)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                      <CheckCircle2 size={16} color="#15803d" />
                      <span>Verified Profiles</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                      <CheckCircle2 size={16} color="#15803d" />
                      <span>Direct Center Guidance</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                      <CheckCircle2 size={16} color="#15803d" />
                      <span>100% Confidentiality</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Hero Content */}
            <div className="hero-mobile-content">
              <div className="hero-mobile-text-group">
                {/* Accessible Title */}
                <h1 className="sr-only">
                  ராணி திருமண சேவை மையம் — Rani Thirumana Sevai Maiyam — {BRAND.subTagline}
                </h1>

                {/* Brand Identity Graphic matching the exact design */}
                <div
                  className="hero-mobile-brand-display"
                  style={{
                    width: '100%',
                    maxWidth: '240px',
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <img
                    src={heroBrandLogo}
                    alt="ராணி திருமண சேவை மையம் — அனைத்து சமூகத்தினருக்கும்."
                    style={{
                      width: '100%',
                      maxWidth: '230px',
                      height: 'auto',
                      display: 'block',
                      margin: 0,
                      filter: 'drop-shadow(0 2px 8px rgba(80, 5, 15, 0.18))'
                    }}
                  />
                </div>
              </div>

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
        <section className="home-section faq-section" style={{ padding: '4.75rem 1.25rem', backgroundColor: 'var(--cream)', borderTop: '1px solid var(--border)' }}>
          <div className="container-narrow">
            <SectionHeader
              title="Frequently Asked Questions"
              subtitle="Helpful answers about registration, profile review, match introductions, and visiting our service center."
            />

            <div className="faq-list">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className={`faq-card ${isOpen ? 'is-open' : ''}`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="faq-trigger"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${idx}`}
                    >
                      <span className="faq-question">{faq.q}</span>
                      <span className="faq-icon" aria-hidden="true">
                        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </span>
                    </button>

                    <div id={`faq-answer-${idx}`} className="faq-answer" aria-hidden={!isOpen}>
                      <div className="faq-answer-inner">
                        <p>{faq.a}</p>
                      </div>
                    </div>
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
              title="Talk to Our Matrimony Team"
              subtitle="Send an inquiry on WhatsApp, call us, or visit our Nerkundram service center."
            />

            <div className="contact-experience">
              <form className="contact-inquiry-form" onSubmit={handleContactSubmit} noValidate>
                <div className="contact-panel-heading">
                  <span className="contact-panel-icon"><UserRound size={20} /></span>
                  <div>
                    <p className="contact-panel-eyebrow">Quick inquiry</p>
                    <h3>How can we help?</h3>
                  </div>
                </div>
                <p className="contact-panel-copy">Share your details and your message will open directly in WhatsApp for our team.</p>

                <div className="contact-field">
                  <label htmlFor="contact-name">Name</label>
                  <input id="contact-name" className={contactErrors.name ? 'has-error' : ''} name="name" value={contactForm.name} onChange={handleContactChange} autoComplete="name" />
                  {contactErrors.name && <span className="contact-field-error">{contactErrors.name}</span>}
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-phone">Phone Number</label>
                  <input id="contact-phone" className={contactErrors.phone ? 'has-error' : ''} name="phone" value={contactForm.phone} onChange={handleContactChange} inputMode="tel" autoComplete="tel" />
                  {contactErrors.phone && <span className="contact-field-error">{contactErrors.phone}</span>}
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-query">Query / Message</label>
                  <textarea id="contact-query" className={contactErrors.query ? 'has-error' : ''} name="query" value={contactForm.query} onChange={handleContactChange} rows="5" />
                  {contactErrors.query && <span className="contact-field-error">{contactErrors.query}</span>}
                </div>
                <button type="submit" className="contact-whatsapp-button">
                  <MessageCircle size={20} />
                  <span>Send Message on WhatsApp</span>
                  <Send size={17} />
                </button>
              </form>

              <aside className="contact-info-panel" aria-label="Rani Matrimony contact information">
                <div className="contact-panel-heading">
                  <span className="contact-panel-icon"><HeartHandshake size={20} /></span>
                  <div>
                    <p className="contact-panel-eyebrow">Service center</p>
                    <h3>Rani Matrimony</h3>
                  </div>
                </div>
                <p className="contact-panel-copy">We are here to support families at every stage of their matrimonial journey.</p>

                <div className="contact-info-list">
                  <div className="contact-info-item">
                    <span className="contact-info-icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '38px', height: '38px', minWidth: '38px', minHeight: '38px', flexShrink: 0 }}>
                      <MapPin size={19} style={{ display: 'block', margin: 'auto' }} />
                    </span>
                    <div><strong>Office Address</strong><span>{BRAND.address}</span></div>
                  </div>
                  <div className="contact-info-item">
                    <span className="contact-info-icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '38px', height: '38px', minWidth: '38px', minHeight: '38px', flexShrink: 0 }}>
                      <Clock size={19} style={{ display: 'block', margin: 'auto' }} />
                    </span>
                    <div><strong>Office Hours</strong><span>{BRAND.hours}</span></div>
                  </div>
                  <div className="contact-info-item">
                    <span className="contact-info-icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '38px', height: '38px', minWidth: '38px', minHeight: '38px', flexShrink: 0 }}>
                      <MessageCircle size={19} style={{ display: 'block', margin: 'auto' }} />
                    </span>
                    <div><strong>WhatsApp</strong><a href={`https://wa.me/91${BRAND.whatsapp}`} target="_blank" rel="noopener noreferrer">{BRAND.displayPhones}</a></div>
                  </div>
                  <div className="contact-info-item">
                    <span className="contact-info-icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '38px', height: '38px', minWidth: '38px', minHeight: '38px', flexShrink: 0 }}>
                      <Mail size={19} style={{ display: 'block', margin: 'auto' }} />
                    </span>
                    <div><strong>Email</strong><a href={`mailto:${BRAND.email}`}>{BRAND.email}</a></div>
                  </div>
                </div>
                <a href={`tel:${BRAND.phones[0]}`} className="contact-call-link"><Phone size={18} /> Call {BRAND.displayPhones}</a>
              </aside>
            </div>

            {/* Replaced by the responsive inquiry experience above. */}
            <div className="legacy-contact-wrapper contact-desktop-wrapper">
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
                      <a href={`tel:${BRAND.phones[0]}`} style={{ color: 'var(--maroon-900)', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span>📞</span> {BRAND.displayPhones}
                      </a>
                      <a href={`tel:${BRAND.phones[0]}`} style={{ color: 'var(--maroon-900)', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span>📞</span> {BRAND.displayPhones}
                      </a>
                      <a href={`tel:${BRAND.phones[0]}`} style={{ color: 'var(--maroon-900)', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span>☎</span> {BRAND.displayPhones}
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
            <div className="legacy-contact-wrapper contact-mobile-wrapper">
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

      {/* Floating Quick Helpline & Location Actions on Bottom Right */}
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
        {/* Google Maps Location Button */}
        <a
          href={BRAND.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            backgroundColor: '#ea4335',
            color: '#ffffff',
            borderRadius: '50%',
            width: '52px',
            height: '52px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 16px rgba(234, 67, 53, 0.35)',
            textDecoration: 'none'
          }}
          title="Find Us on Google Maps"
          aria-label="Find our service center on Google Maps"
        >
          <MapPin size={24} />
        </a>

        {/* WhatsApp Button */}
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
            boxShadow: '0 6px 16px rgba(37, 211, 102, 0.35)',
            textDecoration: 'none'
          }}
          title="Chat with us on WhatsApp"
          aria-label="Chat with us on WhatsApp"
        >
          <MessageCircle size={28} />
        </a>

        {/* Phone Call Button */}
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
          aria-label="Call direct helpline"
        >
          <Phone size={24} />
        </a>
      </div>

      <Footer />
    </div>
  );
}
