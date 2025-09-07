
# 🚀 Deployment Guide – Angular SPA on AWS (S3 + CloudFront + Route 53 + ACM)

This guide documents the full setup we did for **nextgenerationmart.com**, and includes a quick **Runbook** for future deployments.

---

## 1. Full Deployment Setup (One-Time)

### 🔹 Build the Angular App
```bash
ng build --configuration production
```
- Output generated under `dist/nxt-gen-aio/browser`.

---

### 🔹 Host Static Files in S3
- Created an S3 bucket named after the domain: `nextgenerationmart.com`.
- Uploaded build files:
```bash
aws s3 sync ./dist/nxt-gen-aio/browser s3://nextgenerationmart.com --delete
```
- Enabled CloudFront Origin Access Control (OAC) instead of public read.

---

### 🔹 CloudFront Setup
- Created distribution with origin = S3 bucket.
- Enabled **OAC** so only CloudFront can access S3.
- Configured **custom error responses** for Angular SPA routing:
  - 403 → `/index.html` → 200
  - 404 → `/index.html` → 200

---

### 🔹 TLS/SSL Certificates (ACM)
- Requested a certificate in **us-east-1**.
- Added domains:
  - `nextgenerationmart.com`
  - `www.nextgenerationmart.com`
- Validated via **DNS** (CNAMEs in Route 53).
- Certificate status = **Issued**.

---

### 🔹 Route 53 DNS Setup
- Created public hosted zone `nextgenerationmart.com`.
- Updated GoDaddy nameservers → Route 53 NS values.
- Added records:
  - **A (Alias)** root → CloudFront
  - **CNAME** www → CloudFront
  - ACM validation CNAMEs
  - Any MX/TXT (email) records if needed

---

### 🔹 CloudFront Domain & SSL
- Added Alternate domain names:
  - `nextgenerationmart.com`
  - `www.nextgenerationmart.com`
- Attached the new ACM certificate.

---

### 🔹 Validation
- Invalidated CloudFront cache:
```bash
aws cloudfront create-invalidation --distribution-id <DIST_ID> --paths "/*"
```
- Verified both:
  - https://nextgenerationmart.com
  - https://www.nextgenerationmart.com

✅ Both domains serve the Angular app securely.

---

## 2. Runbook (Repeat for Each Deployment)

### 🔹 Step 1: Build
```bash
ng build --configuration production
```

### 🔹 Step 2: Upload to S3
```bash
aws s3 sync ./dist/nxt-gen-aio/browser s3://nextgenerationmart.com --delete
```

### 🔹 Step 3: Invalidate CloudFront Cache
```bash
aws cloudfront create-invalidation --distribution-id <DIST_ID> --paths "/*"
```

### 🔹 Step 4: Verify
- Open https://nextgenerationmart.com and https://www.nextgenerationmart.com
- Ensure:
  - App loads ✅
  - HTTPS ✅
  - SPA routing ✅

---

## ⚡ Notes
- No need to touch ACM/Route 53/CloudFront unless changing domains.
- If adding a new domain → request new ACM cert + update CloudFront + Route 53.
- If recreating CloudFront → update Route 53 A + CNAME records.

---

# ✅ Quick Deployment (Summary)
```bash
ng build --configuration production
aws s3 sync ./dist/nxt-gen-aio/browser s3://nextgenerationmart.com --delete
aws cloudfront create-invalidation --distribution-id <DIST_ID> --paths "/*"
```
