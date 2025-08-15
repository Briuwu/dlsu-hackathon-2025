# Initial Project Proposal

## Project Title

**PulsePH**

## Theme

- Convenience; hacking everyday hassles for better communities

## Participant Information

- **Team Name:** Untitled Document
- **Team Members:**
  - Ian Vergara
  - Brian Millonte
  - Ashley Nicole Santos
  - Michael Santos
- **Contact Email of Team Members:**
  - iamvergsuu@gmail.com
  - millontebry@gmail.com
  - ashleynicole.dsantos@gmail.com
  - mmakelsantoss@gmail.com

---

## Project Overview

### 1. Problem Statement

Local Government Units (LGUs) across the Philippines release critical information such as class suspensions, disaster warnings, scholarship announcements, and community advisories. However, these updates are often posted solely on Facebook pages or municipal websites, where they are easily buried by unrelated content. Citizens are left refreshing multiple pages or relying on secondhand word-of-mouth updates, which frequently results in delayed awareness or even missed opportunities.

This gap impacts safety, access to resources, and public trust. Students show up to canceled classes, parents miss scholarship deadlines, and communities are unprepared for emergencies.

**Goal:** Local information must become instant, centralized, and easy to access for everyone.

---

### 2. Solution Description

**PulsePH** is a lightweight mobile/web platform that automatically scrapes and aggregates LGU announcements, delivering them instantly to subscribed users based on location.

For the Hackercup demo, focus is on **real-time class suspension notifications**, but the platform is designed to scale into a full LGU communication hub.

#### Core Features

- **Smart Scraping Engine** – Scans official LGU websites and Facebook pages for keywords.
- **Location-Based Subscription** – Manual selection or GPS auto-detection.
- **Instant Alerts via SMS & Push Notifications** – Accessible even without constant internet.
- **Clean Interface** – Quick onboarding in under 1 minute.
- **Scalable Scope** – Expandable to scholarships, job fairs, vaccination schedules, and disaster warnings.

_Tagline:_

> Feel the heartbeat of your local community — LGU announcements right at your fingertips.

---

## Implementation Plan

### 3. Target Audience

**Primary Users:**

- Students & Parents – Receive alerts for class suspensions and school advisories.
- Ordinary Citizens – Stay updated on programs, disaster warnings, and services.

**Secondary Users (Future):**

- LGUs – Broadcast verified announcements directly.
- Schools & Universities – Integrate for official advisories.

---

### 4. Key Metrics for Success

- **Speed:** < 5 minutes from LGU posting to user notification.
- **Adoption Rate:** % of target users subscribed in first 30 days.
- **Engagement:** Ratio of delivered to opened notifications.
- **Coverage:** Number of LGUs in the system.
- **Scalability:** Expand services with minimal code changes.

---

## Technical Details

### 5. Technology Stack

_(Not specified in document)_

---

### 6. Data Requirements

**Organizer-Provided Data:** None. Uses public LGU posts/websites.  
**User-Generated Data:**

- Location (manual or GPS)
- Contact info (for SMS alerts)

**Future Data:**

- LGU-provided RSS feeds
- DepEd/CHED feeds for verification

---

## Additional Information

### 7. Challenges and Risks

1. **Data Accuracy & Noise**

   - Risk: Irrelevant posts scraped.
   - Mitigation: Keyword refinement, human moderation.

2. **Data Privacy**

   - Risk: Compliance with Philippine Data Privacy Act for mobile numbers.
   - Mitigation: Explicit opt-in consent.

3. **Scraping Reliability**

   - Risk: Format changes or blocked scraping.
   - Mitigation: Modular scrapers, manual feed fallback.

4. **Scalability of Notifications**

   - Risk: SMS costs grow with adoption.
   - Mitigation: Push notifications for most cases; SMS for urgent updates.

5. **LGU Non-Cooperation**
   - Risk: Some LGUs may not engage.
   - Mitigation: Build user base first, then approach LGUs.

---

## Table of Contents

1. Initial Project Proposal
2. Theme
3. Participant Information
4. Project Overview
   - 1. Problem Statement
   - 2. Solution Description
5. Implementation Plan
   - 3. Target Audience
   - 4. Key Metrics for Success
6. Technical Details
   - 5. Technology Stack
7. Additional Information
   - 7. Challenges and Risks
