# Slops OS — Context Layer

## Current Focus

Project: Slops Saloon (Phase 0 → Phase 1 Transition)
---

## Current Task List (Priority Order)

1. **System Validation**

   * Verify legacy SSFFMVP logic (Yahoo OAuth, Stripe skeleton)
   * Confirm what is reusable vs must be rebuilt under Clean Slate Protocol

2. **Core Engine Development**

   * Yahoo roster aggregation layer
   * MVP decision engine (Start/Sit/Waiver optimization)
   * VORP-based player valuation system

3. **Frontend Foundation**

   * Landing page (mythological + institutional tone)
   * Authentication (The Gatehouse)
   * Protected dashboard (The Hall of Records)

4. **Security & Production Readiness**

   * Replace test keys with live environment variables
   * Implement rate limiting and request validation
   * Logging (Winston/Morgan)
   * Apply Zero Trust principles across services

5. **DevOps & Deployment**

   * Docker containerization
   * GitHub Actions CI/CD pipeline
   * Oracle Cloud deployment (Nginx, SSL, reverse proxy)

---

## Workflow Protocol

### Execution Model

* Build in **modular units** (services, controllers, routes)
* No placeholder features allowed in production
* If incomplete → hide, not display

### Development Flow

1. Write code locally
2. Validate functionality
3. Commit clean unit to Git
4. Push to GitHub
5. Trigger automated deployment

### Infrastructure Standard

* All infrastructure must be reproducible via script or config
* No manual-only configurations

---

## Constraints

### Financial

* Zero-budget growth enforced
* No paid APIs or tools without CEO approval

### Technical

* React + Vite + Tailwind frontend
* Node.js backend
* Supabase database
* Dockerized services

### Security

* Follow CompTIA Security+ (SY0-701) principles:

  * Least Privilege
  * Secure headers
  * Encrypted secrets
  * Input validation
  * Rate limiting

---

## Active Directive

* Clean Slate Protocol is enforced:
  → Do NOT patch legacy code
  → Extract logic only
  → Rebuild as modular services

  All deliverables must meet AAA Framework standards before completion