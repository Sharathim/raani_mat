import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BrandHeader } from '../components/common/BrandHeader';
import { Footer } from '../components/common/Footer';
import { LogoMark } from '../components/common/LogoMark';
import { GoldDivider, SectionHeader, OrnateCorner } from '../components/common/DecorativeElements';
import { BRAND, SUCCESS_STORIES, FAQS } from '../utils/constants';
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
  CalendarCheck,
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
      icon: HeartHandshake,
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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <BrandHeader />

      <main style={{ flex: 1 }}>
        {/* =========================================================================
            HERO SECTION
            ========================================================================= */}
        <section
          style={{
            position: 'relative',
            backgroundColor: 'var(--paper)',
            borderBottom: '2px solid var(--border)',
            padding: '4rem 1.25rem',
            overflow: 'hidden'
          }}
        >
          {/* Subtle Radial Gradient */}
          <div
            style={{
              position: 'absolute',
              top: '-150px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '850px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(227, 189, 99, 0.18) 0%, rgba(255, 250, 240, 0) 70%)',
              pointerEvents: 'none'
            }}
          />

          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '3rem',
                alignItems: 'center'
              }}
            >
              {/* Hero Left Column: Brand & CTAs */}
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <span className="pill-title-gold">
                    <span>❖</span> {BRAND.tagline} <span>❖</span>
                  </span>
                </div>

                <h1
                  className="font-tamil-serif"
                  style={{
                    color: 'var(--maroon-950)',
                    fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                    lineHeight: 1.2,
                    marginBottom: '0.5rem'
                  }}
                >
                  {BRAND.tamilName}
                </h1>

                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--gold-800)',
                    fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
                    fontWeight: 700,
                    letterSpacing: '0.5px',
                    marginBottom: '1.25rem'
                  }}
                >
                  {BRAND.englishName}
                </div>

                <div
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 600,
                    color: 'var(--maroon-700)',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <span>{BRAND.subTagline}</span>
                </div>

                <p style={{ color: 'var(--ink)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '540px' }}>
                  Find compatible matches tailored to your family's expectations, values, and traditions. Register your matrimonial profile today with Chennai's trusted matrimonial service center.
                </p>

                {/* Hero CTAs */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                  <Link
                    to="/register"
                    className="btn btn-primary btn-lg"
                    style={{
                      boxShadow: 'var(--shadow-hover)'
                    }}
                  >
                    <HeartHandshake size={22} />
                    <div style={{ textAlign: 'left', lineHeight: 1.1 }}>
                      <div style={{ fontWeight: 700 }}>Register Profile</div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 400, opacity: 0.9 }}>Quick 7-Step Online Form</span>
                    </div>
                  </Link>

                  <a
                    href={`tel:${BRAND.phones[0]}`}
                    className="btn btn-secondary btn-lg"
                    style={{
                      border: '1.5px solid var(--maroon-800)'
                    }}
                  >
                    <Phone size={20} color="var(--maroon-800)" />
                    <div style={{ textAlign: 'left', lineHeight: 1.1 }}>
                      <div style={{ fontWeight: 700 }}>Call Helpline</div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--muted)' }}>Direct Service Center</span>
                    </div>
                  </a>
                </div>

                {/* Quick Trust Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--line)', fontSize: '0.85rem', color: 'var(--maroon-900)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                    <CheckCircle2 size={16} color="var(--success)" />
                    <span>Verified Profiles</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                    <CheckCircle2 size={16} color="var(--success)" />
                    <span>Direct Center Guidance</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                    <CheckCircle2 size={16} color="var(--success)" />
                    <span>100% Confidentiality</span>
                  </div>
                </div>
              </div>

              {/* Hero Right Column: Traditional Card Motif Frame */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div
                  className="card-ornate"
                  style={{
                    width: '100%',
                    maxWidth: '440px',
                    padding: '2.5rem 2rem',
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #fffdf8 0%, #fdf5e6 100%)',
                    border: '2px solid var(--gold-500)',
                    boxShadow: 'var(--shadow-hover)'
                  }}
                >
                  <OrnateCorner position="top-left" />
                  <OrnateCorner position="top-right" />
                  <OrnateCorner position="bottom-left" />
                  <OrnateCorner position="bottom-right" />

                  <LogoMark size={90} className="mx-auto" />

                  <div style={{ marginTop: '1.25rem' }}>
                    <div className="font-tamil-serif" style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--maroon-950)' }}>
                      {BRAND.tamilName}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--gold-800)', fontWeight: 600, fontFamily: 'var(--font-heading)' }}>
                      CHENNAI
                    </div>
                  </div>

                  <GoldDivider />

                  <div style={{ background: 'var(--cream)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', marginBottom: '1.5rem', textAlign: 'left', fontSize: '0.9rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--maroon-900)', fontWeight: 700, marginBottom: '0.5rem' }}>
                      <CalendarCheck size={16} />
                      <span>Registration Overview:</span>
                    </div>
                    <ul style={{ paddingLeft: '1.25rem', color: 'var(--ink)', lineHeight: 1.6, fontSize: '0.85rem', margin: 0 }}>
                      <li>Candidate & Family Details</li>
                      <li>Birth Star, Zodiac & Horoscope</li>
                      <li>Education, Career & Income</li>
                      <li>Photo Upload & Partner Expectations</li>
                    </ul>
                  </div>

                  <Link
                    to="/register"
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <HeartHandshake size={18} />
                    <span>Start Online Registration</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SERVICES / HIGHLIGHTS SECTION
            ========================================================================= */}
        <section id="services" style={{ padding: '4.5rem 1.25rem', backgroundColor: 'var(--ivory)' }}>
          <div className="container">
            <SectionHeader
              title="Our Matrimonial Services"
              subtitle="Personalized assistance, verified profiles, and traditional matching for all communities."
            />

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.75rem'
              }}
            >
              {serviceFeatures.map((svc, idx) => {
                const Icon = svc.icon;
                return (
                  <div
                    key={idx}
                    className="card-ornate"
                    style={{
                      padding: '1.75rem 1.5rem',
                      backgroundColor: 'var(--paper)',
                      transition: 'all var(--transition-normal)'
                    }}
                  >
                    <div
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--cream)',
                        border: '1.5px solid var(--border)',
                        color: 'var(--maroon-800)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1.25rem'
                      }}
                    >
                      <Icon size={26} />
                    </div>

                    <h3 style={{ fontSize: '1.15rem', color: 'var(--maroon-950)', marginBottom: '0.5rem', fontWeight: 700 }}>
                      {svc.title}
                    </h3>
                    <p style={{ color: 'var(--ink)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                      {svc.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            WHY CHOOSE US & PROCESS SECTION
            ========================================================================= */}
        <section id="about" style={{ padding: '4.5rem 1.25rem', backgroundColor: 'var(--cream)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div className="container">
            <SectionHeader
              title="Why Choose Rani Matrimony?"
              subtitle="A trusted blend of traditional family values, personal attention, and transparent matchmaking."
            />

            <div
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
              className="card-ornate"
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
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '1.5rem'
                }}
              >
                {processSteps.map((p, idx) => (
                  <div key={idx} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
        <section style={{ padding: '4.5rem 1.25rem', backgroundColor: 'var(--ivory)' }}>
          <div className="container">
            <SectionHeader
              title="Happy Couples & Success Stories"
              subtitle="Heartwarming experiences of families who found their blessed match through our service."
            />

            <div
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
        <section style={{ padding: '4.5rem 1.25rem', backgroundColor: 'var(--cream)', borderTop: '1px solid var(--border)' }}>
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
        <section id="contact" style={{ padding: '4.5rem 1.25rem', backgroundColor: 'var(--ivory)' }}>
          <div className="container">
            <SectionHeader
              title="Contact Our Service Center"
              subtitle="Visit our service center in Nerkundram, Chennai, or reach out to our team directly."
            />

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

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.95rem' }}>
                    <a href={`tel:${BRAND.phones[0]}`} style={{ color: 'var(--maroon-900)', fontWeight: 700, textDecoration: 'none' }}>
                      📞 +91 {BRAND.phones[0]}
                    </a>
                    <a href={`tel:${BRAND.phones[1]}`} style={{ color: 'var(--maroon-900)', fontWeight: 700, textDecoration: 'none' }}>
                      📞 +91 {BRAND.phones[1]}
                    </a>
                    <a href={`tel:${BRAND.phones[2]}`} style={{ color: 'var(--maroon-800)', fontWeight: 600, textDecoration: 'none' }}>
                      ☎ {BRAND.landline} (Landline)
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
                  <div style={{ fontSize: '0.85rem', color: 'var(--maroon-800)', fontWeight: 600 }}>
                    🕒 {BRAND.hours}
                  </div>
                  <div style={{ marginTop: '0.5rem' }}>
                    <a href={`mailto:${BRAND.email}`} style={{ color: 'var(--maroon-700)', fontSize: '0.85rem', textDecoration: 'none' }}>
                      ✉ {BRAND.email}
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
