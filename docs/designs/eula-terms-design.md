# EULA / Terms of Use — Design

## Context
Apple App Store Guideline 3.1.2(c) rejection. Current terms.astro lacks explicit subscription/cancellation details required for auto-renewable IAP subscriptions.

## Decisions
- **Company:** Puresoft Limited (Hong Kong)
- **Contact:** m@puresoftltd.com
- **Location:** Replace src/pages/terms.astro
- **Pricing:** Monthly $9.9 / Yearly $79.99
- **GDPR:** Condensed, remove EU-US Privacy Shield
- **DMCA:** Remove (VPN is mere conduit, not content host)
- **Threat Protection:** Added DNS Filtering disclaimer (Section 4)

## Structure

### 1. Agreement to Terms
- Binding agreement by using the app
- 18+ age requirement
- Linked to Privacy Policy

### 2. Subscription Details (NEW — 3.1.2(c))
- Auto-renewable subscription via Apple In-App Purchase
- Plans: Monthly ($9.9/mo), Yearly ($79.99/yr)
- Billing: Charged to Apple ID at confirmation of purchase
- Auto-renews unless cancelled 24h before period end
- Account charged for renewal within 24h before end of current period
- Price managed by App Store, subject to change with notice
- Free trial: None currently offered (mention if added later)

### 3. Cancellation & Refunds (NEW — 3.1.2(c))
- Cancel via: Settings > [Your Name] > Subscriptions > Ferro VPN > Cancel
- Or use Apple support: https://support.apple.com/billing
- Refunds handled exclusively by Apple per their policy
- Cancellation takes effect at end of current billing period
- No partial refunds for unused portions

### 4. License Grant
- Limited, non-exclusive, revocable, personal, non-transferable
- No ownership transfer
- Retain all rights

### 5. Threat Protection Disclaimer (NEW)
- DNS-level filtering blocks known threats (malware, phishing, malicious domains)
- No guarantee of blocking all malicious sites
- Not responsible for content accessed by user
- Supplemental protection, not replacement for user security practices

### 6. Acceptable Use Policy (was 5)
Keep existing comprehensive list, condensed:
- Illegal activities (hacking, spam, fraud, DDoS)
- CSAM / child exploitation
- Copyright infringement
- Malware / viruses
- Military / weapons
- Bypassing security measures
- Network abuse
- Account sharing / reselling

### 7. No-Logs Commitment (ENHANCED — 3.1.2(c))
- Must match Privacy Policy exactly:
  - No browsing history logs
  - No traffic data / content logs
  - No DNS query logs
  - No original IP address logs
- Explicit cross-reference to Privacy Policy
- Account data (email/User ID for auth) stored separately, never linked to activity

### 8. Disclaimer of Warranties
- "As Is" with all faults
- No merchantability / fitness warranty
- No guarantee of uninterrupted service
- Less ALL CAPS than current version

### 9. Limitation of Liability
- Not liable for direct/indirect/consequential damages
- Hong Kong liability caps
- Does not exclude gross negligence where prohibited

### 10. GDPR Compliance (CONDENSED)
- User rights: access, correct, delete, portability
- Cross-border transfer: standard contractual clauses
- Breach notification: within GDPR timeframe
- DPO contact via m@puresoftltd.com
- Reference Privacy Policy for full details

### 11. Governing Law
- Hong Kong SAR
- Exclusive jurisdiction: Hong Kong courts

### 12. Contact
- Email: m@puresoftltd.com
- Website: https://puresoftltd.com/
- Address: RM C 7/F WORLD TRUST TWR, 50 STANLEY ST, CENTRAL, Hong Kong

## Implementation
- Single file: src/pages/terms.astro
- Keep existing layout (Layout, Navbar, Footer)
- Keep prose styling
- Update page title to "Terms of Use (EULA) - Ferro VPN"

## Validation Checklist
- [ ] Subscription terms explicitly state auto-renewable
- [ ] Cancellation instructions reference Apple ID Settings
- [ ] Refunds explicitly state Apple handles them
- [ ] AUP covers illegal activities, hacking, CSAM
- [ ] No-Logs matches Privacy Policy exactly
- [ ] Governing law: Hong Kong SAR
- [ ] Contact info matches company details
