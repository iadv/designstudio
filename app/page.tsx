"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [bookingStatus, setBookingStatus] = useState<"idle" | "sending" | "success">("idle");
  const [activeService, setActiveService] = useState<number | null>(null);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStatus("sending");
    setTimeout(() => {
      setBookingStatus("success");
    }, 1500);
  };

  const services = [
    { 
      title: "Digital Diagnostics", 
      desc: "Full computer scanning using the latest state-of-the-art diagnostic tools.", 
      img: "/original/diagnostics.jpg",
      icon: "💻"
    },
    { 
      title: "Expert Engine Repair", 
      desc: "Foreign and domestic engines handled by certified technicians.", 
      img: "/original/repair.jpg",
      icon: "⚙️"
    },
    { 
      title: "Precision Tune-Ups", 
      desc: "Maintenance plans to optimize fuel efficiency and performance.", 
      img: "/original/tuneup.jpg",
      icon: "🔧"
    },
    { 
      title: "Elite Maintenance", 
      desc: "Comprehensive 50-point inspection and fluid replacement.", 
      img: "/hero.png", // Using the high-tech one as a "premium" service
      icon: "✨"
    }
  ];

  return (
    <div className={styles.main}>
      {/* Navigation */}
      <nav className={styles.navbar}>
        <div className="container">
          <div className={styles.logoContainer}>
            <Image src="/original/logo.jpg" alt="Bothell Way Garage" width={110} height={110} style={{ borderRadius: '14px', objectFit: 'contain' }} />
            <span className="font-display">Bothell Way Garage</span>
          </div>
          <div className={styles.links}>
            <a href="#services" className={styles.navLink}>Services</a>
            <a href="#about" className={styles.navLink}>About</a>
            <a href="#booking" className={`${styles.btnPrimaryNav}`}>Book Now</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className="animate-slide-up">
              <h1 className={styles.title}>
                <span className={styles.accentText}>Modern</span> Care for Your <br/>
                <span className="gradient-text">Trusted Vehicle.</span>
              </h1>
              <p className={styles.subtitle}>
                Latest Technology. Diagnostics, Performance Tuning, & Expert Repair.
              </p>
              <div className={styles.heroActions}>
                <button onClick={() => window.scrollTo({ top: document.getElementById('booking')?.offsetTop, behavior: 'smooth' })} className="btn-primary" style={{ color: '#ffffff' }}>
                  Schedule Your Inspection
                </button>
                <button onClick={() => window.scrollTo({ top: document.getElementById('services')?.offsetTop, behavior: 'smooth' })} className={styles.btnSecondary}>
                  View Services
                </button>
              </div>
            </div>
            <div className={styles.heroImageWrapper}>
              <div className={styles.heroGlow}></div>
              <Image 
                src="/hero.png" 
                alt="Modern Garage" 
                width={600}
                height={400}
                className={styles.heroImage}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className={styles.services}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className="font-display">Our Specializations</h2>
            <p>From vintage classics to modern performance vehicles.</p>
          </div>
          <div className={styles.grid}>
            {services.map((s, i) => (
              <div 
                key={i} 
                className="glass-card" 
                onMouseEnter={() => setActiveService(i)}
                onMouseLeave={() => setActiveService(null)}
              >
                <div className={styles.cardImage}>
                  <Image src={s.img} alt={s.title} fill style={{ objectFit: 'cover' }} />
                  <div className={styles.cardIcon}>{s.icon}</div>
                </div>
                <div className={styles.cardContent}>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <button className={styles.cardLink}>Explore Details →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className={styles.booking}>
        <div className="container">
          <div className={styles.bookingCard}>
            <div className={styles.bookingInfo}>
              <h2 className="font-display">Ready for a <span style={{ color: 'var(--accent)' }}>New Level</span> of Service?</h2>
              <p>Skip the wait. Book your spot in our workshop instantly.</p>
              <ul className={styles.checkList}>
                <li>Certified Technicians</li>
                <li>Same-Day Diagnostics</li>
                <li>Transparent Estimates</li>
              </ul>
            </div>
            <div className={styles.bookingForm}>
              {bookingStatus === "success" ? (
                <div className={styles.successMessage}>
                  <h3>✨ Request Sent!</h3>
                  <p>Our team will call you within 30 minutes to confirm.</p>
                  <button onClick={() => setBookingStatus("idle")} className="btn-primary">New Booking</button>
                </div>
              ) : (
                <form onSubmit={handleBooking}>
                  <div className={styles.formRow}>
                    <div className={styles.inputGroup}>
                      <label>Your Name</label>
                      <input type="text" required placeholder="John Doe" />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Phone Number</label>
                      <input type="tel" required placeholder="(425) 000-0000" />
                    </div>
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Vehicle Year, Make & Model</label>
                    <input type="text" required placeholder="2022 BMW X5" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Service Needed</label>
                    <select>
                      <option>Oil Change & Maintenance</option>
                      <option>Check Engine Light / Diagnostics</option>
                      <option>Brake Service</option>
                      <option>Major Engine/Transmission Repair</option>
                    </select>
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem', justifyContent: 'center' }}>
                    {bookingStatus === "sending" ? "Processing..." : "Secure My Spot"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerGrid}>
            <div>
              <h3>Bothell Way Garage</h3>
              <p>Setting the standard in Bothell since 2000.</p>
            </div>
            <div>
              <h4>Location</h4>
              <p>17210 Bothell Way Northeast</p>
              <p>Bothell, Washington 98011</p>
            </div>
            <div>
              <h4>Hours</h4>
              <p>Mon - Fri: 8 AM - 6 PM</p>
              <p>Sat - Sun: Closed</p>
            </div>
            <div>
              <h4>Direct Line</h4>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent)' }}>425.949.7627</p>
            </div>
          </div>
          <div className={styles.copyright}>
            © Bothell Way Garage. Built for the future of auto care.
          </div>
        </div>
      </footer>
    </div>
  );
}
