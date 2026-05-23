"use client";

import { FormEvent, useState } from "react";

const images = {
  hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuDK8DrEfZROQjSSAdWtZj7GTq3pTppvYtLu47tIALGU_XsME5olTvs9XuI5X8HAPk6xuqph5SBaOfD9-KOWEqdTC67ZGIWk6hn5WwdeiuoXprFDeUrxLCADMLF34edN4dfVrdUxx4UExN_viKnON-xbAobp58OzbIcAWa4z49I58ql7tqVzpglwAWv4FUD11m5rd2JwTQYYtaUkGmaAwbUV73iJxDI6uPq_vVmXVFc4IBlNfM1cY1MVRpZffR2lBhVm56LFXMK-j0k",
  dentistA: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXn1bXqb1uOCWPX5uUrK7XD7y2aqhALn4Is3j-C7cQsXZzUUIZUDIYhlrZVjGhXtpIPLNF5ZYtBWfEobge-6Yu1uqYC6qCHv4e0wyJ-WrOhYGZ-4JHF2tOOFfFF7oKOP4Zw6OgJrjXaMl93yhp1cmSgOK_DLPTAzXvB_g9VwAUccleq_R-KiAelwI8D8X_RBjhaBiWWAj1B78J_d5oeHOzRGFcixMmIxNslart0lqnUdK1KPqQo-YzP7r0Q5tqAJ2IMKMUl2x-8L4",
  dentistB: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVDrQjmyyvkv5ZpR0G771SW3IkFtf6eoHsVg_U36lhNGYE3xsBbw-ii6du-B8lZ8__IV3FqVyceeO6gxzIvow6cc1GdOk9EzD1g5n0WCuSCfjrNRWtiYbSc1iVmumE_eY-yWB6TA3LRzFoYauXbiy3W727pRybcqGFLPI90ewynlH1iX_-INETggM9fQ7U5U32ZEwjIUx390u_TULANKEpjDwutuCTRFo9oH6T_kY6WZmPpQo5eR00NCk00o0Zdhh6nyBVtIeSUGU",
  tech: "https://lh3.googleusercontent.com/aida-public/AB6AXuDq4emcY62b55gydj7rYCEk0uwADr8_LfRRMWpaRNwneFuHV7TlofkWfUAL-m4xbBIL3LVfBLMZHoeMwE9kZdbE98-8JFotk9JUlnnpACGbrFo8GPGQFHaZK4fmb1nok1CojaLcbhb4aQmsjQkfYLXdTP9L66CG29WOVhTMTY46CKkIWKX1D_9RwEuTLEwox25bJGxFrFE6oPcUZ36oC2PIVN58HQQ378aFpZnr4TU3_apBYP1GdwVPi_yL7UtW3__yIqmJ00-5cFc",
  lead: "https://lh3.googleusercontent.com/aida-public/AB6AXuAeC4iCoNjIFkiqSwQZG7kLdynPSou8XYiZAF5zDJFKTYexvJ_G69Bfzbj7-zT0yOt8cZiw94FVzWUqy0NhCMUg-jL4usSFeAAcp46-kQBSl8A0iKGgFI5TQ-JkZYYFZOC8W0Np-xqNYJ6NA6HFKw4mv50NlZNoYXwRuBqouMcTAVjcwK-cDJbP4sV8GLRNigTARxFr0_DxyxuiRKuygtuc6DfoFH_YMJ1ul8dkJYJ1bkB4dQUGUn4p_ClNIlp44WtpPScblOP5umI",
  ortho: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-nbciJUgGyfgkohYcn621s5lfuwbeZ8T3K9MljM_UP00kmG0HkvFKYoVpoYqatTZlfXBxw3m9pcE2zbe-XAXA462CG9LWb2MaaDI0XaGk17pYwuIotC3dX3aeULo2dGq3weyXUkYJGG4xuMyvrZkU3t_724HzW2nw-11XsGYZVv9pvl493_dczqOLtbp5q0wnC8ewQj8ddUkqkzR2We5fbs3APk7wwCctm2LpX5Uhiw3KQ_V6TOGQLfZJ2ZpASk2pvVadXGVSBMs",
  hygienist: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHgfPRPAi1QAdgeYkUU8TFzPmILnR_OWU5IEhJJHplHQfaxxlGgXuolpPdtRdvvmSuk4EWCWimcyytm0GkuUC4R3OR5hJvBykddXQOBPJHDS7OX7I-BRjzcZXb2U0mtXeARv98vyWNxRh5er7wel5s2uk12iWDMQjotlu2jcmCVXcz-OGgGOEDYsr8wtQV17UEh15RX824fQb1uF4hT1Xu4JgxSxE7hKYBdt4dhmMFshbEaqIO3vhhh-FRkF9W2-J2LK804ons3Og",
  map: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNccKIn36-B2bC8iQJNpA5F4KtwdS8YYZ1_ca52VvXK_FwvgddwRDINuErl6igOc0PyvJ9-R1IDlXWCVisRCEp4NGzf6K98mS8tpKAeu8BfOBazK13bSA-7gP-3KlM4yeby4nvNTQNPhaNvAMybXfnk9kFQwm9pb8fGXkX_owBkE7KwkJ_M1ZBBzswvOQSSbUpmGwXK936g05TnAtWswUPqyOLY_2GQvTY13q1ATDypQGeOBcGirf2IZ4i9nRXO_q_CBhz19WHELs",
};

const whatsappUrl =
  "https://wa.me/2347037579358?text=Hello%20Remdent%2C%20I%27d%20like%20to%20book%20a%20dental%20appointment.";

const services = [
  {
    icon: "dentistry",
    title: "General Dentistry",
    label: "Routine Care",
    copy: "Checkups, scaling, polishing, fillings, and practical care plans for everyday dental health.",
  },
  {
    icon: "auto_awesome",
    title: "Cosmetic Dentistry",
    label: "Smile Upgrade",
    copy: "Whitening, veneers, bonding, and polishing designed to look clean, natural, and confident.",
    featured: true,
  },
  {
    icon: "straighten",
    title: "Orthodontics",
    label: "Alignment",
    copy: "Braces, retainers, and alignment guidance with clear expectations from consultation to follow-up.",
  },
];

const testimonials = [
  {
    name: "Tomi A.",
    label: "Whitening patient",
    quote:
      "The visit was calm from start to finish. I knew the cost, the steps, and what to expect before treatment began.",
  },
  {
    name: "Nnamdi O.",
    label: "Orthodontic patient",
    quote:
      "They explained my braces plan clearly and made every follow-up easy to manage around work.",
  },
  {
    name: "Aisha B.",
    label: "Family appointment",
    quote:
      "My son was nervous before we arrived, but the team handled him with patience. We are definitely coming back.",
  },
];

const address =
  "Harmony Garden Estate Saliu Ogunlana Cres, Beside Nipco Filling Station, Eko Akete Abijo GRA, Lagos.";

function Icon({ name }: { name: string }) {
  return <span className="material-symbols-outlined" aria-hidden="true">{name}</span>;
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path d="M16.04 3.2c-7.02 0-12.72 5.64-12.72 12.6 0 2.26.61 4.46 1.76 6.38L3.2 29l7-1.82a12.9 12.9 0 0 0 5.84 1.4c7.02 0 12.72-5.64 12.72-12.6S23.06 3.2 16.04 3.2Zm0 23.24c-1.84 0-3.64-.48-5.22-1.4l-.38-.22-4.16 1.08 1.1-4.02-.26-.42a10.36 10.36 0 0 1-1.58-5.48c0-5.78 4.72-10.48 10.5-10.48 5.8 0 10.5 4.7 10.5 10.48s-4.7 10.46-10.5 10.46Zm5.76-7.84c-.32-.16-1.86-.92-2.14-1.02-.28-.1-.5-.16-.7.16-.2.3-.8 1.02-.98 1.22-.18.2-.36.22-.68.08-.32-.16-1.34-.5-2.56-1.58-.94-.84-1.58-1.88-1.76-2.2-.18-.3-.02-.48.14-.64.14-.14.32-.36.48-.54.16-.18.2-.3.32-.52.1-.2.06-.38-.02-.54-.08-.16-.7-1.68-.96-2.3-.26-.6-.52-.52-.7-.54h-.6c-.2 0-.54.08-.82.38-.28.3-1.08 1.06-1.08 2.58s1.1 2.98 1.26 3.18c.16.2 2.18 3.32 5.28 4.66.74.32 1.32.5 1.76.64.74.24 1.42.2 1.96.12.6-.1 1.86-.76 2.12-1.5.26-.72.26-1.36.18-1.5-.08-.12-.28-.2-.6-.36Z" />
    </svg>
  );
}

function SocialIcon({ name }: { name: "linkedin" | "instagram" | "facebook" | "youtube" | "x" }) {
  if (name === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M6.94 8.98H3.55v10.83h3.39V8.98Zm.23-3.35a1.96 1.96 0 1 0-3.92 0 1.96 1.96 0 0 0 3.92 0Zm13.58 8.02c0-3.1-1.65-4.54-3.85-4.54a3.32 3.32 0 0 0-3 1.65h-.05V8.98h-3.25v10.83h3.39v-5.36c0-1.41.27-2.78 2.02-2.78 1.72 0 1.74 1.61 1.74 2.87v5.27h3.39v-5.94c0-.08 0-.15-.01-.22Z" />
      </svg>
    );
  }

  if (name === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M7.7 2.75h8.6a4.96 4.96 0 0 1 4.95 4.95v8.6a4.96 4.96 0 0 1-4.95 4.95H7.7a4.96 4.96 0 0 1-4.95-4.95V7.7A4.96 4.96 0 0 1 7.7 2.75Zm0 1.8A3.15 3.15 0 0 0 4.55 7.7v8.6a3.15 3.15 0 0 0 3.15 3.15h8.6a3.15 3.15 0 0 0 3.15-3.15V7.7a3.15 3.15 0 0 0-3.15-3.15H7.7Zm4.3 3.15a4.3 4.3 0 1 1 0 8.6 4.3 4.3 0 0 1 0-8.6Zm0 1.8a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm5.2-2.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" />
      </svg>
    );
  }

  if (name === "facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M13.4 21.5v-8.65h2.9l.44-3.37H13.4V7.33c0-.97.27-1.63 1.66-1.63h1.78V2.69a23.9 23.9 0 0 0-2.6-.14c-2.57 0-4.33 1.57-4.33 4.45v2.48H7v3.37h2.91v8.65h3.49Z" />
      </svg>
    );
  }

  if (name === "youtube") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M21.58 7.18a2.8 2.8 0 0 0-1.97-1.98C17.87 4.75 12 4.75 12 4.75s-5.87 0-7.61.45a2.8 2.8 0 0 0-1.97 1.98A29.14 29.14 0 0 0 2 12a29.14 29.14 0 0 0 .42 4.82 2.8 2.8 0 0 0 1.97 1.98c1.74.45 7.61.45 7.61.45s5.87 0 7.61-.45a2.8 2.8 0 0 0 1.97-1.98A29.14 29.14 0 0 0 22 12a29.14 29.14 0 0 0-.42-4.82Zm-11.72 8.07v-6.5L15.4 12l-5.54 3.25Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M13.9 10.47 21.35 2h-1.76l-6.47 7.35L7.96 2H2l7.81 11.1L2 22h1.76l6.83-7.76L16.04 22H22l-8.1-11.53Zm-2.42 2.75-.79-1.1-6.3-8.82h2.72l5.08 7.12.79 1.1 6.61 9.25h-2.72l-5.39-7.55Z" />
    </svg>
  );
}

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  function submitAppointment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 3200);
    event.currentTarget.reset();
  }

  return (
    <main className={`page ${menuOpen ? "mobile-menu-active" : ""}`}>
      <nav className="nav" aria-label="Primary navigation">
        <div className="container nav-inner">
          <a className="brand logo-brand" href="#home" aria-label="Remdent home">
            <img src="/remdent-logo.png" alt="Remdent" />
          </a>
          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#team">Meet the Team</a>
            <a href="#reviews">Reviews</a>
            <a href="#contact">Contact</a>
          </div>
          <a className="button primary nav-cta" href="#book">
            <Icon name="calendar_month" />
            <span>Book Now</span>
          </a>
        </div>
      </nav>

      <header className="mobile-topbar" aria-label="Mobile navigation">
        <button
          className="mobile-menu"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu-panel"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <a className="mobile-brand logo-brand" href="#home" aria-label="Remdent home">
          <img src="/remdent-logo.png" alt="Remdent" />
        </a>
      </header>

      <div className="mobile-menu-panel" id="mobile-menu-panel" aria-hidden={!menuOpen}>
        <div className="mobile-menu-panel-top">
          <button
            className="mobile-menu-close"
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <span />
            <span />
          </button>
          <a className="mobile-menu-logo logo-brand" href="#home" aria-label="Remdent home" onClick={() => setMenuOpen(false)}>
            <img src="/remdent-logo.png" alt="Remdent" />
          </a>
        </div>
        <nav className="mobile-menu-links" aria-label="Mobile menu">
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#reviews" onClick={() => setMenuOpen(false)}>Reviews</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <a href="#book" onClick={() => setMenuOpen(false)}>Book Appointment</a>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>WhatsApp</a>
        </nav>
      </div>

      <a
        className="whatsapp-float"
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Remdent on WhatsApp"
      >
        <WhatsAppIcon />
        <span className="whatsapp-copy">
          <strong>WhatsApp</strong>
          <small>Book directly</small>
        </span>
      </a>

      <section className="hero" id="home">
        <div className="container hero-inner">
          <div className="hero-content">
            <h1>
              All smiles are <br />
              welcome
            </h1>
            <p className="hero-subtitle">People-first dental care in Lagos</p>
            <p>
              Whether it is treating yourself to a fresh whitening or finally sorting out that cavity, at Remdent every smile matters. We make dental care feel clear, comfortable, and easy to start.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#services">View Our Services</a>
              <a className="button secondary" href="#book">Book Appointment</a>
            </div>
          </div>
          <div className="desktop-mosaic" aria-label="Smile gallery">
            <img className="tile tile-a" src="/hero-teeth/smile-1.avif" alt="Close-up of a bright smile" />
            <img className="tile tile-b" src="/hero-teeth/smile-2.avif" alt="Happy dental patient smiling" />
            <img className="tile tile-c" src="/hero-teeth/smile-3.avif" alt="Child brushing teeth" />
            <img className="tile tile-d" src="/hero-teeth/smile-5.avif" alt="Close-up of healthy teeth" />
            <img className="tile tile-e" src="/hero-teeth/smile-6.avif" alt="Smiling dental patient" />
            <img className="tile tile-f" src="/hero-teeth/smile-4.avif" alt="Patient with braces smiling" />
          </div>
        </div>
      </section>

      <section className="mobile-home" id="mobile-home">
        <div className="mobile-mosaic" aria-label="Smile gallery">
          <img className="tile tile-a" src="/hero-teeth/smile-1.avif" alt="Close-up of a bright smile" />
          <img className="tile tile-b" src="/hero-teeth/smile-2.avif" alt="Happy dental patient smiling" />
          <img className="tile tile-c" src="/hero-teeth/smile-3.avif" alt="Child brushing teeth" />
          <img className="tile tile-d" src="/hero-teeth/smile-5.avif" alt="Close-up of healthy teeth" />
          <img className="tile tile-e" src="/hero-teeth/smile-6.avif" alt="Smiling dental patient" />
          <img className="tile tile-f" src="/hero-teeth/smile-4.avif" alt="Patient with braces smiling" />
        </div>

        <div className="mobile-hero-copy">
          <h1>All smiles are welcome</h1>
          <p className="mobile-subtitle">People-first dental care in Lagos</p>
          <div className="mobile-hero-buttons">
            <a className="mobile-primary" href="#services">View Our Services</a>
            <a className="mobile-secondary" href="#book">Book Appointment</a>
          </div>
          <p className="mobile-intro">
            Whether you need a checkup, whitening, braces, or help with a toothache, Remdent makes dental care feel clear, comfortable, and easy to start.
          </p>
        </div>
      </section>

      <section className="section" id="services">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Care Menu</span>
            <h2>Modern dental care without the clinic anxiety.</h2>
            <p>Choose the treatment path you need, then book a visit or ask the team what makes sense first.</p>
          </div>
          <div className="service-grid">
            {services.map((service, index) => (
              <article className={`card service-card ${service.featured ? "featured-card" : ""}`} key={service.title}>
                <div className="service-topline">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div className="icon-box"><Icon name={service.icon} /></div>
                </div>
                <p className="service-label">{service.label}</p>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
                <a className="learn-link" href="#book">Book this service <Icon name="arrow_forward" /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container split">
          <div className="image-stage">
            <img src={images.tech} alt="A dentist using modern digital scanning technology in a clean treatment room" />
            <div className="floating-badge">
              <div className="icon-box"><Icon name="verified" /></div>
              <div>
                <strong>Clear from day one</strong>
                <br />
                <span>No confusing treatment talk</span>
              </div>
            </div>
          </div>
          <div className="why-copy">
            <span className="eyebrow">Why Remdent</span>
            <h2>Professional care that still feels personal.</h2>
            <div className="why-list">
              <div className="why-item">
                <div className="icon-box"><Icon name="precision_manufacturing" /></div>
                <div>
                  <h3>Clear diagnosis</h3>
                  <p>You get a plain explanation of the issue, the cost, and the treatment options before anything begins.</p>
                </div>
              </div>
              <div className="why-item">
                <div className="icon-box"><Icon name="groups" /></div>
                <div>
                  <h3>Comfort-led appointments</h3>
                  <p>The team moves at a pace patients can handle, with practical advice and calm communication.</p>
                </div>
              </div>
              <div className="why-item">
                <div className="icon-box"><Icon name="sentiment_satisfied" /></div>
                <div>
                  <h3>Simple booking</h3>
                  <p>Reach the clinic quickly on WhatsApp, request a visit, and get the right next step without friction.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="team">
        <div className="container proof-wrap">
          <div className="proof-heading">
            <h2><span>5000+</span> happy patients cared for with calm, modern dentistry.</h2>
          </div>
          <div className="proof-layout">
            <div className="proof-side proof-side-left">
              <div className="proof-stat">
                <strong>5000+</strong>
                <span>Happy patients this year</span>
              </div>
              <article className="proof-quote">
                <div className="stars" aria-label="Five star review">
                  <Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" />
                </div>
                <h3>Tomi A.</h3>
                <p>The visit was calm from start to finish. I knew the cost, the steps, and what to expect before treatment began.</p>
              </article>
            </div>
            <div className="proof-photo">
              <img src="/hero-teeth/smile-1.avif" alt="Happy Remdent patient smiling" />
            </div>
            <div className="proof-side proof-side-right">
              <div className="proof-stat">
                <strong>1</strong>
                <span>Clinic in Abijo GRA, Lagos</span>
              </div>
              <article className="proof-quote">
                <div className="stars" aria-label="Five star review">
                  <Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" />
                </div>
                <h3>Aisha B.</h3>
                <p>My son was nervous before we arrived, but the team handled him with patience. We are definitely coming back.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section alt" id="book">
        <div className="container appointment-wrap">
          <div className="card appointment-form">
            <div className="appointment-copy">
              <h2>Request an Appointment</h2>
              <p>Send your details and the clinic will confirm the best available slot. For the fastest response, use WhatsApp.</p>
            </div>
            <form onSubmit={submitAppointment}>
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="name">Full Name</label>
                  <input id="name" name="name" placeholder="John Doe" required />
                </div>
                <div className="field">
                  <label htmlFor="email">Email Address</label>
                  <input id="email" name="email" type="email" placeholder="john@example.com" required />
                </div>
                <div className="field">
                  <label htmlFor="phone">Phone Number</label>
                  <input id="phone" name="phone" type="tel" placeholder="+234 000 000 0000" required />
                </div>
                <div className="field">
                  <label htmlFor="service">Preferred Service</label>
                  <select id="service" name="service" required defaultValue="">
                    <option value="" disabled>Select a service</option>
                    <option>General Dentistry</option>
                    <option>Cosmetic Dentistry</option>
                    <option>Orthodontics</option>
                    <option>Dental Hygiene</option>
                    <option>Emergency Care</option>
                  </select>
                </div>
                <div className="field full">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows={4} placeholder="Tell us about your dental concerns..." />
                </div>
              </div>
              <label className="form-note">
                <input required type="checkbox" />
                <span>I agree to receive appointment communication from Remdent.</span>
              </label>
              <button className="button primary" type="submit">
                {submitted ? <><Icon name="check_circle" /> Request Received</> : <><Icon name="send" /> Submit Request</>}
              </button>
            </form>
          </div>

          <aside className="info-panel" id="contact">
            <div className="map-card card">
              <img src={images.map} alt="Map style illustration of the Remdent clinic location" />
              <div className="map-label"><Icon name="location_on" /> Abijo GRA, Lagos</div>
            </div>
            <div className="card info-card">
              <div className="icon-box"><Icon name="pin_drop" /></div>
              <p><strong>Our Location</strong><br />{address}</p>
            </div>
            <div className="card info-card">
              <div className="icon-box"><Icon name="contact_support" /></div>
              <p>
                <strong>Contact Us</strong><br />
                +234 703 757 9358<br />
                care@remdent.com<br />
                <a className="inline-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer">Message on WhatsApp</a>
              </p>
            </div>
            <div className="hours-card">
              <h3><Icon name="schedule" /> Opening Hours</h3>
              <div className="hours-row"><span>Mon - Fri</span><strong>8:00 AM - 7:00 PM</strong></div>
              <div className="hours-row"><span>Saturday</span><strong>9:00 AM - 4:00 PM</strong></div>
              <div className="hours-row"><span>Sunday</span><strong>Closed</strong></div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section" id="reviews">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Patient Notes</span>
            <h2>The experience should feel as good as the result looks.</h2>
          </div>
          <div className="testimonials">
            {testimonials.map((item) => (
              <article className="card testimonial" key={item.name}>
                <div className="stars" aria-label="Five star review">
                  <Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" />
                </div>
                <p className="quote">"{item.quote}"</p>
                <p><strong>{item.name}</strong><br /><span>{item.label}</span></p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta">
            <span className="eyebrow">Start here</span>
            <h2>Ask a question before you commit.</h2>
            <p>Tell Remdent what is bothering you, what you want improved, or when you are free to visit.</p>
            <div className="cta-actions">
              <a className="button secondary" href="#book">Book Appointment</a>
              <a className="button primary" href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp the clinic</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-mega">
          <div className="footer-columns">
            <div>
              <h4>Services</h4>
              <div className="footer-links">
                <a href="#services">All services</a>
                <a href="#services">General dentistry</a>
                <a href="#services">Cosmetic dentistry</a>
                <a href="#services">Orthodontics</a>
                <a href="#book">Appointments</a>
              </div>
            </div>
            <div>
              <h4>About</h4>
              <div className="footer-links">
                <a href="#team">Patient stories</a>
                <a href="#contact">Location</a>
                <a href="#reviews">Reviews</a>
                <a href="#book">Book a visit</a>
              </div>
            </div>
            <div>
              <h4>Media</h4>
              <div className="footer-links">
                <a href="https://www.instagram.com/remdent_dental?igsh=MXVyMWR1cnF0czZkNg==" target="_blank" rel="noreferrer">Instagram</a>
                <a href="#reviews">Testimonials</a>
                <a href="#services">Smile care</a>
                <a href="#contact">FAQs</a>
              </div>
            </div>
            <div>
              <h4>Contact</h4>
              <div className="footer-links">
                <a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a>
                <a href="tel:+2347037579358">+234 703 757 9358</a>
                <a href="mailto:care@remdent.com">care@remdent.com</a>
                <span>{address}</span>
              </div>
            </div>
            <div className="footer-social-block">
              <h4>Follow</h4>
              <div className="social-row" aria-label="Social links">
                <a href="https://www.instagram.com/remdent_dental?igsh=MXVyMWR1cnF0czZkNg==" target="_blank" rel="noreferrer" aria-label="Remdent on Instagram"><SocialIcon name="instagram" /></a>
                <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Remdent on Facebook"><SocialIcon name="facebook" /></a>
                <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="Remdent on YouTube"><SocialIcon name="youtube" /></a>
                <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="Remdent on LinkedIn"><SocialIcon name="linkedin" /></a>
                <a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="Remdent on X"><SocialIcon name="x" /></a>
              </div>
            </div>
          </div>
          <div className="footer-signature">
            <h2>Dentistry, The Remdent Way<sup>TM</sup></h2>
            <p>Copyright 2026 © Remdent • Proudly Nigerian <span className="nigeria-mark" aria-hidden="true" /></p>
          </div>
        </div>
      </footer>
    </main>
  );
}
