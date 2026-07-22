BRAINYTE UNIVERSAL PHONE COLLECTOR
BEGINNER'S USAGE GUIDE

==================================================

1. WHAT IS BRAINYTE UNIVERSAL PHONE COLLECTOR?
   ==================================================

The Brainyte Universal Phone Collector is a browser userscript that automatically detects international phone numbers displayed on webpages and saves them continuously.

It can detect phone numbers from different countries, for example:

Nigeria: +234805*****25
United Kingdom: +447911*****56
United States: +141555*****71
Ghana: +233241*****67
South Africa: +278212*****67

You can modify it for other formats.

You can collect numbers while manually browsing webpages and later export all collected numbers to a CSV file.

IMPORTANT:
Only collect and use phone numbers when you have a legitimate reason and are authorized to access and process the information. Always follow the website's terms of service and applicable privacy and data-protection laws.

==================================================
2. INSTALL TAMPERMONKEY
=======================

Tampermonkey is the browser extension that allows the Brainyte script to run.

For Google Chrome:

1. Open the Chrome Web Store.
2. Search for "Tampermonkey".
3. Install the official Tampermonkey extension.

For Microsoft Edge:

1. Open the Microsoft Edge Add-ons store.
2. Search for "Tampermonkey".
3. Install the extension.

For Firefox:

1. Open the Firefox Add-ons website.
2. Search for "Tampermonkey".
3. Install the extension.

After installation, you should see the Tampermonkey icon in your browser toolbar.

==================================================
3. CREATE A NEW USERSCRIPT
==========================

1. Click the Tampermonkey icon in your browser toolbar.
2. Select "Create a new script..."

A new script editor will open.

You may see default code similar to:

// ==UserScript==
// @name         New Userscript
// ==/UserScript==

==================================================
4. DELETE THE DEFAULT CODE
==========================

Select everything in the editor.

Press:

Ctrl + A

Then press:

Delete

The editor should now be empty.

==================================================
5. ADD THE BRAINYTE SCRIPT
==========================

Copy the complete Brainyte Universal Phone Collector script.

Make sure you copy the entire script, starting with:

// ==UserScript==

and ending with:

})();

Paste the complete script into the Tampermonkey editor.

==================================================
6. SAVE THE SCRIPT
==================

Press:

Ctrl + S

Or click the Save icon in Tampermonkey.

Make sure the script is enabled.

You should see something similar to:

Brainyte Universal Phone Collector
ON

==================================================
7. OPEN A WEBSITE
=================

Go to the website you want to use.

For example:

http://www.wellsint.site

The Brainyte Collector should automatically start running.

You should see a small panel in the top-right corner of the webpage:

📱 Brainyte Collector

Status: READY

## Current Number:

Total Saved: 0

📥 Export CSV
📋 Copy All
🗑 Clear All

==================================================
8. BROWSE THE WEBSITE NORMALLY
==============================

Simply browse the website normally.

For example, if you are reviewing applicant profiles, open the first profile.

If the page contains:

Mobile Number

+2348067519239

The script automatically detects it.

The panel will update to:

📱 Brainyte Collector

Status: NEW

Current Number:
+2348067519239

Total Saved: 1

The number has now been saved automatically.

==================================================
9. MOVE TO THE NEXT PROFILE
===========================

Open the next profile normally.

You do not need to click anything in the Brainyte Collector.

If the next page contains:

+23470*********

The panel automatically changes to:

Status: NEW

Current Number:
+23470*********

Total Saved: 2

Continue reviewing pages.

The numbers are saved automatically as you go.

==================================================
10. DUPLICATE NUMBERS
=====================

If you open a profile with a number that has already been collected, the script will not save it again.

The panel will show:

Status: DUPLICATE

Current Number:
+2348067519239

Total Saved: 2

The total remains 2.

This prevents duplicate phone numbers from appearing in your final list.

==================================================
11. CHECK YOUR TOTAL
====================

The "Total Saved" number tells you how many unique phone numbers have been collected.

For example:

Total Saved: 250

This means you have collected 250 unique phone numbers.

The numbers remain stored in your browser while you continue browsing.

==================================================
12. EXPORT YOUR NUMBERS
=======================

When you are finished collecting numbers, click:

📥 Export CSV

Your browser will download a file similar to:

brainyte_phone_numbers.csv

You can open the CSV file using:

* Microsoft Excel
* Google Sheets
* LibreOffice Calc
* WPS Office

The file will contain all the numbers.


==================================================
13. COPY ALL NUMBERS
====================

If you do not want to download a CSV file, click:

📋 Copy All

The script will copy all collected numbers to your clipboard.

You can then paste them into:

* Excel
* Google Sheets
* Notepad
* WPS Office
* Another application

==================================================
14. CLEAR YOUR COLLECTION
=========================

If you want to delete all collected numbers, click:

🗑 Clear All

You will see a confirmation message.

Click OK to permanently remove all numbers stored by the script.

IMPORTANT:

Make sure you have exported your numbers before clearing them.

==================================================
15. USING THE SCRIPT WITH DIFFERENT COUNTRIES
=============================================

You do not need to tell the script which country you are collecting from.

The script can detect international phone numbers.


==================================================
16. USING IT ON DIFFERENT WEBSITES
==================================

The script is designed to work across websites and contains:

// @match        *://*/*

This means the script is not restricted to one website.

You do not need to change the website domain every time.

You can browse:
Another directory website

The same Brainyte Collector can run on those pages.

==================================================
17. EVERYDAY USE
================

Open Website
↓
Open Profile/Page
↓
Phone Number Appears
↓
Brainyte Detects It
↓
Number Saved Automatically
↓
Open Next Profile
↓
Repeat
↓
Click Export CSV When Finished


==================================================
END OF GUIDE
============

