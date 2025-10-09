// ===================================
// Navigation Scroll Effect
// ===================================

const navbar = document.getElementById("navbar")
let lastScroll = 0

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }

  lastScroll = currentScroll
})

// ===================================
// Mobile Menu Toggle
// ===================================

const mobileMenuToggle = document.getElementById("mobileMenuToggle")
const navMenu = document.getElementById("navMenu")

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", () => {
    mobileMenuToggle.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenuToggle.classList.remove("active")
      navMenu.classList.remove("active")
    })
  })

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      mobileMenuToggle.classList.remove("active")
      navMenu.classList.remove("active")
    }
  })
}

// ===================================
// Scroll Animations
// ===================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Observe all elements with fade-in-scroll class
const fadeElements = document.querySelectorAll(".fade-in-scroll")
fadeElements.forEach((element) => {
  observer.observe(element)
})

// ===================================
// Contact Form Validation
// ===================================

const contactForm = document.getElementById("contactForm")

if (contactForm) {
  const nameInput = document.getElementById("name")
  const emailInput = document.getElementById("email")
  const phoneInput = document.getElementById("phone")
  const subjectInput = document.getElementById("subject")
  const messageInput = document.getElementById("message")

  // Validation functions
  const validateName = () => {
    const nameError = document.getElementById("nameError")
    const name = nameInput.value.trim()

    if (name === "") {
      nameError.textContent = "Name is required"
      nameInput.classList.add("error")
      return false
    } else if (name.length < 2) {
      nameError.textContent = "Name must be at least 2 characters"
      nameInput.classList.add("error")
      return false
    } else {
      nameError.textContent = ""
      nameInput.classList.remove("error")
      return true
    }
  }

  const validateEmail = () => {
    const emailError = document.getElementById("emailError")
    const email = emailInput.value.trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (email === "") {
      emailError.textContent = "Email is required"
      emailInput.classList.add("error")
      return false
    } else if (!emailRegex.test(email)) {
      emailError.textContent = "Please enter a valid email address"
      emailInput.classList.add("error")
      return false
    } else {
      emailError.textContent = ""
      emailInput.classList.remove("error")
      return true
    }
  }

  const validatePhone = () => {
    const phoneError = document.getElementById("phoneError")
    const phone = phoneInput.value.trim()

    // Phone is optional, but if provided, validate format
    if (phone !== "") {
      const phoneRegex = /^[\d\s\-+$$$$]+$/
      if (!phoneRegex.test(phone) || phone.length < 10) {
        phoneError.textContent = "Please enter a valid phone number"
        phoneInput.classList.add("error")
        return false
      }
    }

    phoneError.textContent = ""
    phoneInput.classList.remove("error")
    return true
  }

  const validateSubject = () => {
    const subjectError = document.getElementById("subjectError")
    const subject = subjectInput.value

    if (subject === "") {
      subjectError.textContent = "Please select a subject"
      subjectInput.classList.add("error")
      return false
    } else {
      subjectError.textContent = ""
      subjectInput.classList.remove("error")
      return true
    }
  }

  const validateMessage = () => {
    const messageError = document.getElementById("messageError")
    const message = messageInput.value.trim()

    if (message === "") {
      messageError.textContent = "Message is required"
      messageInput.classList.add("error")
      return false
    } else if (message.length < 10) {
      messageError.textContent = "Message must be at least 10 characters"
      messageInput.classList.add("error")
      return false
    } else {
      messageError.textContent = ""
      messageInput.classList.remove("error")
      return true
    }
  }

  // Real-time validation
  nameInput.addEventListener("blur", validateName)
  emailInput.addEventListener("blur", validateEmail)
  phoneInput.addEventListener("blur", validatePhone)
  subjectInput.addEventListener("change", validateSubject)
  messageInput.addEventListener("blur", validateMessage)

  // Form submission
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Validate all fields
    const isNameValid = validateName()
    const isEmailValid = validateEmail()
    const isPhoneValid = validatePhone()
    const isSubjectValid = validateSubject()
    const isMessageValid = validateMessage()

    // If all validations pass
    if (isNameValid && isEmailValid && isPhoneValid && isSubjectValid && isMessageValid) {
      // Show success message
      const formSuccess = document.getElementById("formSuccess")
      formSuccess.style.display = "block"

      // Reset form
      contactForm.reset()

      // Hide success message after 5 seconds
      setTimeout(() => {
        formSuccess.style.display = "none"
      }, 5000)

      // Scroll to success message
      formSuccess.scrollIntoView({ behavior: "smooth", block: "nearest" })

      console.log("Form submitted successfully!")
      console.log({
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        subject: subjectInput.value,
        message: messageInput.value,
      })
    } else {
      // Scroll to first error
      const firstError = contactForm.querySelector(".error")
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }
  })
}

// ===================================
// Smooth Scroll for Anchor Links
// ===================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href")

    // Only prevent default if it's not just "#"
    if (href !== "#") {
      e.preventDefault()
      const target = document.querySelector(href)

      if (target) {
        const offsetTop = target.offsetTop - 80 // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    }
  })
})

// ===================================
// Active Navigation Link
// ===================================

const currentPage = window.location.pathname.split("/").pop() || "index.html"
const navLinks = document.querySelectorAll(".nav-link")

navLinks.forEach((link) => {
  const linkPage = link.getAttribute("href")
  if (linkPage === currentPage) {
    link.classList.add("active")
  }
})

// ===================================
// Cookie Consent
// ===================================

const cookieConsent = document.getElementById("cookieConsent")
const acceptCookiesBtn = document.getElementById("acceptCookies")

// Check if user has already accepted cookies
const hasAcceptedCookies = localStorage.getItem("cookiesAccepted")

if (!hasAcceptedCookies) {
  // Show cookie consent popup
  cookieConsent.classList.add("show")
}

if (acceptCookiesBtn) {
  acceptCookiesBtn.addEventListener("click", () => {
    // Save acceptance to localStorage
    localStorage.setItem("cookiesAccepted", "true")
    // Hide the popup
    cookieConsent.classList.remove("show")
  })
}

// ===================================
// Initialize on Page Load
// ===================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("Lease Legal website loaded successfully!")

  // Add a small delay to ensure smooth initial animations
  setTimeout(() => {
    document.body.style.opacity = "1"
  }, 100)
})
