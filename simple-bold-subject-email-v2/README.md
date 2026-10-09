# ✉️ Brainyte Bold Subject Line v2.0.1

A simple, lightweight WordPress email sender designed to send professional HTML emails with **Unicode-bold subject lines**, **multiple recipients**, and **privacy-protected delivery**.

**Developed by Wells Interactive**

🌐 **Website:** [www.wellsint.site](http://www.wellsint.site)
🧠 **Brainyte:** [www.wellsint.site/brainyte](http://www.wellsint.site/brainyte)

---

## ✨ Features

### 📧 Multiple Recipients

Send the same email to multiple recipients at once.

Recipients can be entered:

* One email address per line
* Comma-separated
* Semicolon-separated

### **𝐁𝐨𝐥𝐝 𝐄𝐦𝐚𝐢𝐥 𝐒𝐮𝐛𝐣𝐞𝐜𝐭𝐬**

Optionally convert the actual email subject into Unicode-bold characters.

Example:

```text
Interview Invitation — Brainyte
```

becomes:

```text
𝐈𝐧𝐭𝐞𝐫𝐯𝐢𝐞𝐰 𝐈𝐧𝐯𝐢𝐭𝐚𝐭𝐢𝐨𝐧 — 𝐁𝐫𝐚𝐢𝐧𝐲𝐭𝐞
```

The bold subject is placed in the **actual email Subject field**. It is **not duplicated inside the email body**.

### 🔒 Privacy-Protected Delivery

Each recipient receives an **individual email**.

Recipients therefore **cannot see the email addresses of other recipients**.

This provides stronger privacy protection than simply putting everyone in a shared `BCC` field.

### 📝 Rich-Text Email Editor

Create professional emails using the standard WordPress editor.

You can use:

* **Bold**
* *Italic*
* Headings
* Paragraphs
* Lists
* Links
* Other supported WordPress formatting

### ✅ Email Validation

The plugin checks recipient addresses before sending and identifies invalid addresses.

### 📊 Delivery Results

After sending, the plugin reports:

* Number of emails successfully sent
* Number of failed emails
* Invalid addresses that were skipped

### 🛡️ WordPress Security

The plugin includes:

* WordPress nonce verification
* Administrator capability checks
* Input sanitization
* Email validation
* Safe HTML processing

### ⚙️ WordPress `wp_mail()`

The plugin uses WordPress's native `wp_mail()` function for email delivery.

---

## 🚀 Installation

### Method 1 — WordPress Admin

1. Log in to your **WordPress Dashboard**.
2. Go to **Plugins → Add New Plugin**.
3. Select **Upload Plugin**.
4. Upload the Brainyte Bold Subject Line ZIP file.
5. Click **Install Now**.
6. Click **Activate Plugin**.

After activation, open:

**WordPress Dashboard → Brainyte Email Sender**

---

## 📤 Sending an Email

Enter the recipient addresses:

```text
person1@example.com
person2@example.com
person3@example.com
```

Enter your subject:

```text
Interview Invitation — Brainyte
```

Enable:

```text
☑ Bold Subject
```

Then compose your message using the WordPress editor and click:

**Send Email to All Recipients**

Each recipient receives their own private copy.

---

## 🔐 Privacy

Brainyte Bold Subject Line does **not** place all recipients together in the `To:` or `CC:` fields.

Instead, it sends each recipient separately.

### Example

If you send to:

```text
alice@example.com
bob@example.com
charles@example.com
```

Alice receives an email addressed to Alice.

Bob receives an email addressed to Bob.

Charles receives an email addressed to Charles.

None of them can see the other recipients.

---

## 📮 SMTP Configuration

For reliable email delivery, it is recommended that your WordPress website use an **SMTP service**.

WordPress's `wp_mail()` function depends on the website's configured mail transport.

Without SMTP, some hosting providers may:

* Block outgoing mail
* Delay delivery
* Send messages to spam
* Fail to deliver messages entirely

For production use, configure a trusted WordPress SMTP solution.

---

## ⚠️ About Bold Subjects

The plugin uses **Unicode characters** to create the visual bold effect.

For example:

```text
Interview Invitation
```

becomes:

```text
𝐈𝐧𝐭𝐞𝐫𝐯𝐢𝐞𝐰 𝐈𝐧𝐯𝐢𝐭𝐚𝐭𝐢𝐨𝐧
```

This is different from HTML formatting.

HTML such as:

```html
<strong>Interview Invitation</strong>
```

cannot be used to format an email subject.

Unicode characters are therefore used directly in the Subject field.

> **Note:** Display of special Unicode characters can vary between email clients, fonts, and devices. Excessive use of unusua

## 🏢 About Wells Interactive & Brainyte

**Wells Interactive** develops practical digital solutions, software, technology services, and business tools.

**Brainyte** is a technology platform by Wells Interactive focused on building practical digital solutions for businesses and organizations.

### 🌐 Wells Interactive

[www.wellsint.site](http://www.wellsint.site)

### 🧠 Brainyte

[www.wellsint.site/brainyte](http://www.wellsint.site/brainyte)

---

## 📄 Version

**Version:** 2.0.1
**Plugin Name:** Brainyte Bold Subject Line
**Platform:** WordPress
**Requires:** WordPress with `wp_mail()` support
**License:** GPL-2.0-or-later

---


**Brainyte Bold Subject Line**

> Simple. Private. Professional.

**Wells Interactive**
🌐 [www.wellsint.site](http://www.wellsint.site)
🧠 [www.wellsint.site/brainyte](http://www.wellsint.site/brainyte)
