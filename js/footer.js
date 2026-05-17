
(function () {
  const footerHTML = `
  <footer id="siteFooter">
    <div class="footer-top">
      <div class="container">
        <div class="row gy-4">

          <!-- Brand -->
          <div class="col-lg-4 col-md-12">
            <div class="footer-brand">
              <div class="brand-logo">
                <i class="bi bi-houses-fill"></i>
                <span>RoamVillas</span>
              </div>
              <p class="brand-tagline">
                Discover extraordinary villas curated for unforgettable stays.
                Every property, a story.
              </p>
              <div class="social-links">
                <a href="#" title="Facebook"><i class="bi bi-facebook"></i></a>
                <a href="#" title="Instagram"><i class="bi bi-instagram"></i></a>
                <a href="#" title="Twitter"><i class="bi bi-twitter-x"></i></a>
                <a href="#" title="LinkedIn"><i class="bi bi-linkedin"></i></a>
              </div>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="col-lg-2 col-sm-6">
            <p class="footer-heading">Explore</p>
            <ul class="footer-links">
              <li><a href="#"><i class="bi bi-chevron-right"></i>All Villas</a></li>
              <li><a href="#"><i class="bi bi-chevron-right"></i>Top Rated</a></li>
              <li><a href="#"><i class="bi bi-chevron-right"></i>New Arrivals</a></li>
              <li><a href="#"><i class="bi bi-chevron-right"></i>Special Offers</a></li>
            </ul>
          </div>

          <!-- Company -->
          <div class="col-lg-2 col-sm-6">
            <p class="footer-heading">Company</p>
            <ul class="footer-links">
              <li><a href="#"><i class="bi bi-chevron-right"></i>About Us</a></li>
              <li><a href="#"><i class="bi bi-chevron-right"></i>Careers</a></li>
              <li><a href="#"><i class="bi bi-chevron-right"></i>Blog</a></li>
              <li><a href="#"><i class="bi bi-chevron-right"></i>Contact</a></li>
            </ul>
          </div>

          <!-- Contact -->
          <div class="col-lg-4 col-md-12">
            <p class="footer-heading">Get In Touch</p>
            <ul class="footer-contact">
              <li>
                <i class="bi bi-geo-alt-fill"></i>
                <span>123 Palm Grove Avenue, Miami, FL 33101</span>
              </li>
              <li>
                <i class="bi bi-telephone-fill"></i>
                <span>+1 (800) 555-VILLA</span>
              </li>
              <li>
                <i class="bi bi-envelope-fill"></i>
                <span>hello@villastay.com</span>
              </li>
            </ul>
            <!-- Newsletter -->
            <div class="newsletter">
              <input type="email" placeholder="Your email address" />
              <button type="button"><i class="bi bi-send-fill"></i></button>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="footer-bottom">
      <div class="container">
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <span>&copy; ${new Date().getFullYear()} VillaStay. All rights reserved.</span>
          <div class="footer-legal">
            <a href="#">Privacy Policy</a>
            <span class="divider">|</span>
            <a href="#">Terms of Service</a>
            <span class="divider">|</span>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
  `;

  const styles = `
  <style>
    #siteFooter {
      background: linear-gradient(160deg, #1b4332 0%, #2d6a4f 60%, #1b4332 100%);
      color: #d8f3dc;
      margin-top: 4rem;
      font-family: 'Inter', sans-serif;
    }

    /* ── Top section ── */
    #siteFooter .footer-top {
      padding: 3.5rem 0 2.5rem;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }

    /* Brand */
    #siteFooter .brand-logo {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 1rem;
    }
    #siteFooter .brand-logo i {
      font-size: 2rem;
      color: #52b788;
    }
    #siteFooter .brand-logo span {
      font-size: 1.5rem;
      font-weight: 700;
      color: #fff;
      font-family: 'Playfair Display', serif;
      letter-spacing: 0.5px;
    }
    #siteFooter .brand-tagline {
      color: #b7e4c7;
      font-size: 0.875rem;
      line-height: 1.7;
      margin-bottom: 1.25rem;
      max-width: 300px;
    }

    /* Social */
    #siteFooter .social-links {
      display: flex;
      gap: 10px;
    }
    #siteFooter .social-links a {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #d8f3dc;
      font-size: 1rem;
      text-decoration: none;
      transition: background 0.2s, color 0.2s, transform 0.2s;
    }
    #siteFooter .social-links a:hover {
      background: #52b788;
      color: #fff;
      transform: translateY(-3px);
      border-color: #52b788;
    }

    /* Headings */
    #siteFooter .footer-heading {
      color: #fff;
      font-weight: 600;
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 1.1rem;
    }

    /* Links */
    #siteFooter .footer-links {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    #siteFooter .footer-links li {
      margin-bottom: 0.6rem;
    }
    #siteFooter .footer-links a {
      color: #b7e4c7;
      text-decoration: none;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: color 0.2s, gap 0.2s;
    }
    #siteFooter .footer-links a i {
      font-size: 0.7rem;
      color: #52b788;
      transition: transform 0.2s;
    }
    #siteFooter .footer-links a:hover {
      color: #fff;
      gap: 10px;
    }
    #siteFooter .footer-links a:hover i {
      transform: translateX(3px);
    }

    /* Contact */
    #siteFooter .footer-contact {
      list-style: none;
      padding: 0;
      margin: 0 0 1.25rem;
    }
    #siteFooter .footer-contact li {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      margin-bottom: 0.75rem;
      font-size: 0.875rem;
      color: #b7e4c7;
      line-height: 1.5;
    }
    #siteFooter .footer-contact li i {
      color: #52b788;
      font-size: 1rem;
      margin-top: 2px;
      flex-shrink: 0;
    }

    /* Newsletter */
    #siteFooter .newsletter {
      display: flex;
      border-radius: 10px;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,0.15);
    }
    #siteFooter .newsletter input {
      flex: 1;
      background: rgba(255,255,255,0.08);
      border: none;
      padding: 0.55rem 0.9rem;
      color: #fff;
      font-size: 0.875rem;
      outline: none;
    }
    #siteFooter .newsletter input::placeholder { color: #95d5b2; }
    #siteFooter .newsletter button {
      background: #52b788;
      border: none;
      padding: 0 1rem;
      color: #fff;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.2s;
    }
    #siteFooter .newsletter button:hover { background: #40916c; }

    /* ── Bottom bar ── */
    #siteFooter .footer-bottom {
      padding: 1rem 0;
      font-size: 0.82rem;
      color: #95d5b2;
    }
    #siteFooter .footer-legal {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    #siteFooter .footer-legal a {
      color: #95d5b2;
      text-decoration: none;
      transition: color 0.2s;
    }
    #siteFooter .footer-legal a:hover { color: #fff; }
    #siteFooter .footer-legal .divider { opacity: 0.4; }
  </style>
  `;

  // Inject styles into <head>
  document.head.insertAdjacentHTML("beforeend", styles);

  // Inject footer before </body>
  document.body.insertAdjacentHTML("beforeend", footerHTML);
})();