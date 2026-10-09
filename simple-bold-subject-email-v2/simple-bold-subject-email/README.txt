# Brainyte Bold Subject Line v2.0.1

A WordPress admin email sender with Unicode-bold subjects, multiple recipients, and privacy-protected delivery.

## Features
- Multiple recipients
- One email per line
- Comma/semicolon-separated addresses also accepted
- Invalid address validation
- Each recipient receives a separate email
- Recipients cannot see one another's addresses
- Optional Unicode-bold subject
- WordPress rich-text editor
- No duplicated subject in the email body
- WordPress nonce/capability security checks
- Send success/failure count
- Uses `wp_mail()`

## Install
1. WordPress Admin > Plugins > Add New > Upload Plugin.
2. Upload `simple-bold-subject-email-v2.zip`.
3. Activate the plugin.
4. Open **Email Sender**.

## Privacy
The plugin deliberately sends each recipient separately rather than placing everyone in To or CC. This is stronger privacy protection than simply using a shared BCC list.

## SMTP
For reliable delivery, configure WordPress SMTP. `wp_mail()` depends on the site's mail transport.
