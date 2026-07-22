BRAINYTE UNIVERSAL PHONE COLLECTOR
DEVELOPER CONSOLE – QUICK GUIDE

==================================================

1. OPEN THE WEBSITE
   ==================================================

Open the website where you want to collect phone numbers.

Example: https://www.wellsint.site and number format must be +23480********.

==================================================
2. OPEN DEVELOPER TOOLS
=======================

Press:

F12

Or:

Ctrl + Shift + I

You can also right-click the page and select:

Inspect

Then click:

Console

==================================================
3. PASTE THE SCRIPT
===================

Copy the Brainyte Universal Phone Collector JavaScript code.

IMPORTANT:

When using Developer Console, do NOT copy the Tampermonkey header:

// ==UserScript==
// @name
// @namespace
// @version
// @description
// @match
// @grant

Only copy the actual JavaScript code starting with:

(function () {

and ending with:

})();

Paste the code into the Console and press:

Enter

If your browser displays a warning about pasting code, follow the instructions shown by the browser.

==================================================
4. START COLLECTING
===================

A panel will appear in the top-right corner:

📱 Brainyte Collector

Status: READY

Total Saved: 0

Now browse the website normally.

When the page displays a phone number such as:

+2348055980525

The script automatically saves it.

The counter will update:

Status: NEW

Total Saved: 1

Continue opening profiles or pages. New numbers will be saved automatically.

Duplicate numbers are not saved twice.

==================================================
5. EXPORT YOUR NUMBERS
======================

When finished, click:

📥 Export CSV

Your numbers will be downloaded as:

brainyte_phone_numbers.csv

You can open the file with Excel, Google Sheets, WPS Office, or LibreOffice.

==================================================
6. COPY ALL NUMBERS
===================

Click:

📋 Copy All

All collected numbers will be copied to your clipboard.

==================================================
7. CLEAR NUMBERS
================

Click:

🗑 Clear All

Confirm the deletion.

IMPORTANT:

Export your numbers before clearing them if you want to keep a copy.

==================================================
8. IMPORTANT
============

The Developer Console method runs on the current webpage.

If you:

* Refresh the page
* Close the tab
* Navigate to a completely new page

you may need to paste and run the script again.

The collected numbers should remain stored in your browser's local storage.

==================================================
QUICK START
===========

Open Website
↓
Press F12
↓
Click Console
↓
Paste Brainyte JavaScript
↓
Press Enter
↓
Browse Profiles
↓
Numbers Automatically Saved
↓
Click Export CSV
↓
Open the CSV File

==================================================
RECOMMENDATION
==============

Use Developer Console for quick testing.


