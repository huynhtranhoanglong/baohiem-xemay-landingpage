# Changelog

All notable changes to this project will be documented in this file.

## [2026-03-11]
### Changed
- **Landing Page (`index.html`)**: Removed hardcoded mentions of "DBV" in the hero subtitle, trust indicators, and footer. Replaced with provider-agnostic copy ("các đối tác bảo hiểm uy tín", "Hệ thống Global Care") to align with the flexible manual workflow for maximizing commissions.
- **Knowledge Base (`PROJECT_KNOWLEDGE_BASE.md`)**: Updated Sections 2 and 3 to clarify the manual workflow of inputting data into the Global Care app and the rationale for choosing DBV (highest commission among available providers).
- **Project Structure**: Centralized changelog history from `PROJECT_KNOWLEDGE_BASE.md` into this dedicated `CHANGELOG.md` file.

## [Previous History - Initial Setup]
### Added / Changed
- Created initial knowledge base structure.
- Added rules for English documentation, active knowledge capture, and Plan-First execution workflow.
- Added explicit Anti-Hallucination rule requiring prompt clarification of ambiguous/missing details before any KB updates.
- Updated Sections 1, 2, and 3 with the core business model, Global Care/DBV partnership details, the Facebook Ads -> LP -> Manual fulfillment funnel, and scoped Phase 1 to building the Landing Page.
- Updated Section 3: Confirmed data collection will use Google Sheets and hosting will use Vercel/Netlify.
- Added Section 5: Copywriting & Legal Terminology to enforce the use of standard Vietnamese legal terms for compulsory insurance based on updated legal documents.
- Updated Section 3 to mark the Google Sheets integration as Complete.
- Added a new rule in Section 4 requiring explicit user approval before committing and pushing changes to GitHub.
