# Backend API Specifications for Crypto Payment

This document outlines the API endpoints required to support the Crypto Payment Frontend implemented in the Ferro VPN Pricing page.

## Overview

The frontend provides a UI for users to:
1. Select a Plan (Basic, Pro, Ultimate)
2. Select a Crypto Currency (BTC, USDT)
3. View a Payment Address and QR Code
4. Confirm Payment

To make this functional, the Backend needs to provide the following endpoints.

## 1. Create Payment Order

**Endpoint:** `POST /api/v1/payment/create`

**Description:** Called when the user selects a coin type to generate a payment address and order ID.

**Request Body:**
```json
{
  "plan_id": "pro_monthly",  // or "pro_yearly", "basic_monthly", etc.
  "currency": "USDT",        // or "BTC"
  "network": "TRC20"         // Optional, if multiple networks supported
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "order_id": "ORD-123456789",
    "amount": 9.99,          // Amount in Fiat (USD)
    "crypto_amount": 9.99,   // Amount in Crypto (e.g., 9.99 USDT)
    "currency": "USDT",
    "wallet_address": "TQn9...", // The receiving wallet address (unique per order or reused with strict checking)
    "qr_code_url": "https://api.qrserver.com/...", // Or backend generates QR
    "expires_at": 1715420000 // Timestamp when rate/address expires
  }
}
```

## 2. Check Transaction Status

**Endpoint:** `GET /api/v1/payment/status/{order_id}`

**Description:** Polled by the frontend (every 5-10s) while user is on the "Verifying Transaction" step.

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "pending", // pending, detecting, confirmed, expired, failed
    "confirmations": 0,  // Current confirmations (optional)
    "required_confirmations": 1
  }
}
```

## 3. Webhook (Internal)

**Endpoint:** `POST /api/v1/webhooks/crypto`

**Description:** Your crypto payment provider (e.g., Coinbase Commerce, BTCPay Server) will call this.

**Payload:**
- Transaction Hash
- Amount Received
- Currency

**Logic:**
1. Match payload to `order_id` in database.
2. If `amount_received` >= `crypto_amount`, mark Order as `PAID`.
3. Trigger VPN Account Creation.
4. Email credentials to user.

## Notes for Backend Team
- **Rate Limiting:** Ensure `/create` endpoint is rate-limited to prevent address exhaustion.
- **Precision:** Handle crypto floating point precision carefully (use strings or specialized libraries).
- **Security:** Do not trust frontend amount; always calculate price on backend based on `plan_id`.
