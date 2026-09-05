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
  Quote
} from 'lucide-react';

export function HomePage() {
  const [openFaq, setOpenFaq] = useState(0);

  const serviceFeatures = [
    {
      icon: Users,
      titleTa: 'மணமக்கள் பதிவு மையம்',
      titleEn: 'Matrimonial Profile Registration',
      desc: 'அனைத்து சமூகத்தினருக்கும் விரிவான மற்றும் துல்லியமான மணமக்கள் சுயவிவரப் பதிவு.'
    },
    {
      icon: Scroll,
      titleTa: 'ஜாதகம் & பிறப்பு விவரம்',
      titleEn: 'Birth Star & Horoscope Matching',
      desc: 'நட்சத்திரம், ராசி, லக்கினம் மற்றும் தோஷ விவரங்களுடன் துல்லியமான பொருத்த உதவி.'
    },
    {
      icon: FileCheck2,
      titleTa: 'குடும்ப பின்னணி சரிபார்ப்பு',
      titleEn: 'Family Background Verification',
      desc: 'பெற்றோர், உடன்பிறப்புகள் மற்றும் குடும்ப மதிப்பீடுகள் குறித்த நம்பகமான தகவல்கள்.'
    },
    {
      icon: Award,
      titleTa: 'கல்வி & தொழில் பொருத்தம்',
      titleEn: 'Education & Career Preference',
      desc: 'பட்டப்படிப்பு, அரசு/தனியார் வேலைவாய்ப்பு மற்றும் வருமான விருப்பத்திற்கு ஏற்ப நல்வரன்கள்.'
    },
    {
      icon: ShieldCheck,
      titleTa: 'பாதுகாப்பான தகவல் முறை',
      titleEn: 'Privacy & Confidentiality',
      desc: 'மணமக்கள் விவரங்கள் மற்றும் புகைப்படங்கள் முழு பாதுகாப்புடன் கையாளப்படுகின்றன.'
    },
    {
      icon: HeartHandshake,
      titleTa: 'நேரடி ஆலோசனை சேவை',
      titleEn: 'Personalized Match Assistance',
      desc: 'எங்கள் நெற்குன்றம் மையத்தில் நேரடி ஆலோசனை மற்றும் சுபகாரிய வழிகாட்டுதல்.'
    }
  ];

  const whyChooseUs = [
    {
      number: '01',
      titleTa: 'பாரம்பரியமும் நம்பிக்கையும்',
      titleEn: 'Traditional & Trusted Service',
      desc: 'பல வருடங்களாக திருப்திகரமான குடும்பங்களின் நல்வாழ்த்துகளுடன் இயங்கி வரும் நம்பகமான திருமண சேவை மையம்.'
    },
    {
      number: '02',
      titleTa: 'அனைத்து சமூகத்தினருக்கும்',
      titleEn: 'For All Communities',
      desc: 'அனைத்து சமூகத்தினரின் குடும்ப சம்பிரதாயங்களையும் மதித்து சிறந்த வரன்களை அடையாளம் காண உதவுகிறோம்.'
    },
    {
      number: '03',
      titleTa: 'எளிதான ஆன்லைன் பதிவு',
      titleEn: 'Simple & Quick Registration',
      desc: 'உங்கள் மொபைல் அல்லது கணினியிலேயே சில நிமிடங்களில் முழு விவரங்களையும் எளிய முறையில் பதிவு செய்யலாம்.'
    },
    {
      number: '04',
      titleTa: 'நேரடி உதவி மையம்',
      titleEn: 'Direct Service Center Assistance',
      desc: 'பதிவு செய்த பின்னர் எங்கள் குழுவினர் உங்களை தொலைபேசி அல்லது நேரடி சந்திப்பில் தொடர்பு கொண்டு வழிகாட்டுவர்.'
    }
  ];

  const processSteps = [
    {
      step: '1',
      titleTa: 'சுயவிவரப் பதிவு',
      titleEn: 'Fill Registration Form',
      desc: 'மணமக்கள் அடிப்படை, குடும்ப, கல்வி மற்றும் ஜாதக விவரங்களை ஆன்லைனில் உள்ளிடவும்.'
    },
    {
      step: '2',
      titleTa: 'மையத்தின் சரிபார்ப்பு',
      titleEn: 'Verification by Center',
      desc: 'எங்கள் சேவை மையம் விவரங்களை சரிபார்த்து வரன் தேடலை துவங்கும்.'
    },
    {
      step: '3',
      titleTa: 'வரன் அறிமுகம்',
      titleEn: 'Match Introductions',
      desc: 'உங்கள் எதிர்பார்ப்புகளுக்கு ஏற்ற தகுதியான வரன்களை தொலைபேசி வாயிலாக அறிமுகப்படுத்துவோம்.'
    },
    {
      step: '4',
      titleTa: 'சுபமுகூர்த்த நன்னாட்கள்',
      titleEn: 'Auspicious Union',
      desc: 'இரு குடும்பங்களின் விருப்பத்துடன் மனநிறைவான இனிய திருமண பந்தம் உருவாகிறது.'
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
          {/* Subtle Traditional Arch Accent */}
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
                    fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    marginBottom: '1.25rem'
                  }}
                >
                  {BRAND.englishName}
                </div>

                <div
                  className="font-tamil-serif"
                  style={{
                    fontSize: '1.35rem',
                    fontWeight: 700,
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
                  உங்கள் குடும்பத்தின் எதிர்பார்ப்புகளுக்கு ஏற்ற நல்வரன்களை அடையாளம் காணவும், பாரம்பரிய முறைப்படி சுபகாரியங்களை இனிதே தொடங்கவும் ராணி திருமண சேவை மையத்தில் உங்கள் மணமக்கள் சுயவிவரத்தை உடனே பதிவு செய்யுங்கள்.
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
                      <div>மணமக்கள் பதிவு செய்க</div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 400, opacity: 0.9 }}>Register Profile Online</span>
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
                      <div>நேரடி தொடர்புக்கு</div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--muted)' }}>Call Us Directly</span>
                    </div>
                  </a>
                </div>

                {/* Quick Trust Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--line)', fontSize: '0.85rem', color: 'var(--maroon-900)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                    <CheckCircle2 size={16} color="var(--success)" />
                    <span>நம்பகமான சரிபார்ப்பு</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                    <CheckCircle2 size={16} color="var(--success)" />
                    <span>நேரடி சேவை மையம்</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                    <CheckCircle2 size={16} color="var(--success)" />
                    <span>முழுமையான ரகசியத்தன்மை</span>
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--maroon-900)', fontWeight: 700, marginBottom: '0.35rem' }}>
                      <CalendarCheck size={16} />
                      <span>மணமக்கள் பதிவு நடைமுறை:</span>
                    </div>
                    <ul style={{ paddingLeft: '1.25rem', color: 'var(--ink)', lineHeight: 1.6, fontSize: '0.85rem' }}>
                      <li>அடிப்படை & குடும்ப விவரங்கள்</li>
                      <li>நட்சத்திரம், ராசி, லக்கினம் விவரம்</li>
                      <li>கல்வி, தொழில் & வருமானம்</li>
                      <li>புகைப்படம் & உங்கள் எதிர்பார்ப்புகள்</li>
                    </ul>
                  </div>

                  <Link
                    to="/register"
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                  >
                    <HeartHandshake size={18} />
                    <span>பதிவை தொடங்கவும் (Start Registration)</span>
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
              titleTa="எங்களின் சிறப்பான சேவைகள்"
              titleEn="Our Matrimonial Services"
              subtitle="ராணி திருமண சேவை மையம் மூலம் நீங்கள் பெறும் விரிவான நன்மைகள் மற்றும் வழிகாட்டுதல்கள்."
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

                    <h3 className="font-tamil-serif" style={{ fontSize: '1.15rem', color: 'var(--maroon-950)', marginBottom: '0.3rem' }}>
                      {svc.titleTa}
                    </h3>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--gold-800)', marginBottom: '0.75rem' }}>
                      {svc.titleEn}
                    </div>
                    <p style={{ color: 'var(--ink)', fontSize: '0.9rem', lineHeight: 1.6 }}>
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
              titleTa="ஏன் ராணி திருமண சேவை மையம்?"
              titleEn="Why Choose Rani Matrimony?"
              subtitle="நம்பகத்தன்மையும், குடும்ப பாரம்பரியமும் நிறைந்த எங்களின் தனித்துவமான அணுகுமுறை."
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
                      opacity: 0.6,
                      lineHeight: 1,
                      marginBottom: '0.75rem'
                    }}
                  >
                    {item.number}
                  </div>
                  <h3 className="font-tamil-serif" style={{ fontSize: '1.1rem', color: 'var(--maroon-950)', marginBottom: '0.25rem' }}>
                    {item.titleTa}
                  </h3>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--gold-800)', marginBottom: '0.65rem' }}>
                    {item.titleEn}
                  </div>
                  <p style={{ color: 'var(--ink)', fontSize: '0.875rem', lineHeight: 1.6 }}>
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
                  <span>❖</span> எளிய 4-படி நடைமுறை (Simple Process) <span>❖</span>
                </span>
                <h3 className="font-tamil-serif" style={{ fontSize: '1.4rem', color: 'var(--maroon-950)', marginTop: '0.5rem' }}>
                  வரன் தேடும் எளிய வழிமுறைகள்
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
                    <div className="font-tamil-sans" style={{ fontWeight: 700, color: 'var(--maroon-950)', fontSize: '1rem', marginBottom: '0.2rem' }}>
                      {p.titleTa}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--gold-800)', fontWeight: 600, marginBottom: '0.5rem' }}>
                      {p.titleEn}
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.5 }}>
                      {p.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                <Link to="/register" className="btn btn-primary btn-lg">
                  <HeartHandshake size={20} />
                  <span>மணமக்கள் விவரங்களை பதிவு செய்க (Register Now)</span>
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
              titleTa="திருமண வாழ்த்துக்கள் & மகிழ்ச்சியான தம்பதியர்"
              titleEn="Happy Couples & Matrimonial Success Stories"
              subtitle="ராணி திருமண சேவை மையம் மூலம் நல்வரன் அமைந்த குடும்பங்களின் மனமார்ந்த அனுபவங்கள்."
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
                      <div className="font-tamil-serif" style={{ fontWeight: 700, color: 'var(--maroon-900)', fontSize: '1rem' }}>
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
              titleTa="அடிக்கடி கேட்கப்படும் கேள்விகள்"
              titleEn="Frequently Asked Questions (FAQs)"
              subtitle="மணமக்கள் பதிவு மற்றும் சேவை நடைமுறைகள் குறித்த தெளிவான விளக்கங்கள்."
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
                        <div className="font-tamil-sans" style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--maroon-950)' }}>
                          {faq.qTa}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '2px' }}>
                          {faq.qEn}
                        </div>
                      </div>
                      <span style={{ color: 'var(--maroon-800)', flexShrink: 0 }}>
                        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </span>
                    </button>

                    {isOpen && (
                      <div style={{ padding: '0 1.5rem 1.25rem', color: 'var(--ink)', fontSize: '0.92rem', lineHeight: 1.6, borderTop: '1px solid var(--line)', paddingTop: '0.85rem' }}>
                        {faq.aTa}
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
              titleTa="எங்களை தொடர்பு கொள்ள"
              titleEn="Contact Our Service Center"
              subtitle="சென்னை நெற்குன்றத்தில் அமைந்துள்ள எங்கள் சேவை மையத்திற்கு நேரிலோ அல்லது தொலைபேசியிலோ தொடர்பு கொள்ளலாம்."
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
                      <h4 className="font-tamil-serif" style={{ fontSize: '1.1rem', margin: 0 }}>
                        தொலைபேசி எண்கள்
                      </h4>
                      <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Phone Numbers</div>
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
                      <h4 className="font-tamil-serif" style={{ fontSize: '1.1rem', margin: 0 }}>
                        முகவரி & நேரம்
                      </h4>
                      <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Address & Office Timings</div>
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
          href={`https://wa.me/91${BRAND.whatsapp}?text=${encodeURIComponent('வணக்கம், ராணி திருமண சேவை மையம் பற்றி அறிய விரும்புகிறேன்.')}`}
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
