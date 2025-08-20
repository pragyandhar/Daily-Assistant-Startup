# Supabase Email Configuration Guide

## Problem
Users signing up with email/password don't receive confirmation emails.

## Solution
You need to configure email settings in your Supabase dashboard.

### Step 1: Configure Email Templates
1. Go to your Supabase Dashboard
2. Navigate to **Authentication** → **Email Templates**
3. Configure the **Confirm signup** template:
   - Subject: `Confirm your Daily Assistant account`
   - Body: Include a confirmation link with `{{ .ConfirmationURL }}`

### Step 2: SMTP Configuration (Optional but Recommended)
1. Go to **Settings** → **Authentication**
2. Scroll to **SMTP Settings**
3. Configure your email provider (Gmail, SendGrid, etc.)
4. Test the configuration

### Step 3: Enable Email Confirmation
1. Go to **Authentication** → **Settings**
2. Ensure **Enable email confirmations** is turned ON
3. Set **Confirmation URL** to: `https://your-domain.com/app`

### Step 4: Development Setup
For development, you can:
1. Use Supabase's built-in email service (limited)
2. Check the Supabase logs for confirmation links
3. Or disable email confirmation temporarily

### Quick Fix for Development
If you want to disable email confirmation for development:
1. Go to **Authentication** → **Settings**
2. Turn OFF **Enable email confirmations**
3. Users will be auto-confirmed on signup

## Alternative: Use Google OAuth Only
Since Google OAuth is working perfectly, you could:
1. Hide the email/password form
2. Only show Google sign-in
3. This eliminates email confirmation issues entirely
