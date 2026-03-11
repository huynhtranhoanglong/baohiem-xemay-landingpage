# BBH Project 01 - Knowledge Base & Requirements

*This file serves as the Single Source of Truth (SSOT) for all project goals, requirements, constraints, and contextual information. Any AI assistant or agent working on this project MUST read and understand this document before proposing solutions or making changes.*

## 1. Project Overview
Project BBH 01 aims to sell compulsory and voluntary motorcycle insurance in Vietnam through targeted Facebook Ads. The system will initially focus on a primary sales funnel driving traffic to a custom Landing Page, collecting user data, and facilitating manual order fulfillment and digital policy issuance via Zalo/Email.

## 2. Core Business Logic & Goals
- **Product**: Compulsory motorcycle civil liability insurance + Voluntary motorcycle insurance (sold together for 86,000 VND).
- **Insurance Provider / Partner**: Global Care (intermediary) distributing policies from DBV.
- **Unit Economics**: Revenue per unit is 86,000 VND. Commission received is 50,400 VND per unit. The core optimization metric is to keep Customer Acquisition Cost (CAC / CPA) well below the 50,400 VND commission margin.
- **Target Audience**: Young demographic (familiar with online payments) with interests related to traffic laws, motorcycles, and related topics. The targeting strategy will heavily involve A/B testing different interests to optimize Conversion Rate (CR) and Cost Per Action (CPA).
- **Fulfillment**: E-certificates (links to PDF files) are sent to the customer via Email.

## 3. Technical Scope & Customer Funnel
**Phase 1 Software Scope**: Build a high-converting Landing Page (HTML/CSS/JS) hosted for free on Vercel/Netlify. Data collection will be routed directly to Google Sheets via an Apps Script Webhook.

**Customer Funnel (Phase 1):**
1. User clicks Facebook Ad.
2. User lands on the Landing Page.
3. User fills out an order form on the Landing Page.
4. Data is automatically submitted to a dedicated Google Sheet.
5. Admin checks Google Sheets, inputs data into the Global Care system.
6. Admin generates a payment QR Code and emails it to the customer.
7. Customer pays via QR Code.
8. Customer receives the final E-certificate PDF link via email.

## 4. Workflows & Specific Rules
- **Language**: All documentation, including this Knowledge Base, Skills, and Workflows, MUST be written in **English**. Communication with the user can remain in Vietnamese.
- **Anti-Hallucination (No Assumptions)**: Before capturing knowledge or making updates, the agent MUST explicitly ask the user for any missing, necessary context. The agent is strictly prohibited from inventing or assuming details ("hallucinating") to fill in gaps.
- **Active Knowledge Capture**: ONLY AFTER all necessary context is gathered and clear, the agent MUST proactively update this `PROJECT_KNOWLEDGE_BASE.md` whenever the user makes a decision, changes a requirement, or adds a constraint during conversations. 
- **Plan-First Execution**: The agent is STRICTLY PROHIBITED from executing changes or writing code immediately. For every request, the agent MUST first create an `implementation_plan.md` artifact and request user approval before proceeding to the execution phase.

---
**Changelog / History:**
- Created initial knowledge base structure.
- Added rules for English documentation, active knowledge capture, and Plan-First execution workflow.
- Added explicit Anti-Hallucination rule requiring prompt clarification of ambiguous/missing details before any KB updates.
- Updated Sections 1, 2, and 3 with the core business model, Global Care/DBV partnership details, the Facebook Ads -> LP -> Manual fulfillment funnel, and scoped Phase 1 to building the Landing Page.
- Updated Section 3: Confirmed data collection will use Google Sheets and hosting will use Vercel/Netlify.
