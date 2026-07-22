// ==UserScript==
// @name         Brainyte Phone Num Collector
// @namespace    http://www.wellsint.site/
// @version      6.0
// @description  Automatically collects international phone numbers from webpages
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    /*************************************************
     * CONFIGURATION
     *************************************************/

    const STORAGE_KEY = "brainyte_phone_numbers";

    // How often to check the page
    const CHECK_INTERVAL = 1000;

    // Minimum and maximum digits allowed
    // after removing spaces, brackets, hyphens, etc.
    const MIN_DIGITS = 8;
    const MAX_DIGITS = 15;


    /*************************************************
     * STATE
     *************************************************/

    let lastDetectedNumbers = "";


    /*************************************************
     * STORAGE
     *************************************************/

    function getNumbers() {

        try {

            return JSON.parse(
                localStorage.getItem(STORAGE_KEY) || "[]"
            );

        } catch (error) {

            console.error(
                "Brainyte Collector storage error:",
                error
            );

            return [];

        }

    }


    function saveNumbers(numbers) {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(numbers)
        );

    }


    /*************************************************
     * PHONE NORMALIZATION
     *************************************************/

    function normalizePhone(phone) {

        // Keep only numbers and leading +
        phone = phone
            .replace(/[^\d+]/g, "");

        // Make sure + is only at the beginning
        if (phone.includes("+")) {

            phone =
                "+" +
                phone
                    .replace(/\+/g, "")
                    .replace(/\D/g, "");

        }

        return phone;

    }


    /*************************************************
     * FIND INTERNATIONAL PHONE NUMBERS
     *************************************************/

    function findPhones() {

        const text =
            document.body.innerText || "";

        /*
         * Looks for international numbers beginning
         * with a + country calling code.
         *
         * Examples:
         *
         * +2348055980525
         * +1 415 555 2671
         * +44 7911 123456
         * +233 24 123 4567
         * +27 82 123 4567
         *
         */

        const regex =
            /\+\d[\d\s().-]{7,25}\d/g;

        const matches =
            text.match(regex) || [];


        const numbers = [];


        matches.forEach(match => {

            const normalized =
                normalizePhone(match);


            const digitCount =
                normalized
                    .replace(/\D/g, "")
                    .length;


            /*
             * International phone numbers
             * generally contain between 8 and
             * 15 digits according to E.164.
             */

            if (
                digitCount >= MIN_DIGITS &&
                digitCount <= MAX_DIGITS
            ) {

                if (
                    !numbers.includes(normalized)
                ) {

                    numbers.push(normalized);

                }

            }

        });


        return numbers;

    }


    /*************************************************
     * PANEL
     *************************************************/

    function getPanel() {

        let panel =
            document.getElementById(
                "brainyteUniversalCollector"
            );


        if (panel)
            return panel;


        panel =
            document.createElement("div");


        panel.id =
            "brainyteUniversalCollector";


        panel.style.cssText = `
            position: fixed;
            top: 15px;
            right: 15px;
            width: 290px;
            background: #1e293b;
            color: white;
            padding: 15px;
            border-radius: 12px;
            z-index: 2147483647;
            font-family: Arial, sans-serif;
            font-size: 14px;
            box-shadow: 0 5px 25px rgba(0,0,0,.4);
        `;


        document.body.appendChild(panel);


        return panel;

    }


    /*************************************************
     * REFRESH PANEL
     *************************************************/

    function refreshPanel(
        status,
        phone = ""
    ) {

        const numbers =
            getNumbers();


        const total =
            numbers.length;


        const panel =
            getPanel();


        let statusColor =
            "#ffffff";


        if (status === "NEW")
            statusColor = "#00ff99";


        if (status === "DUPLICATE")
            statusColor = "#ffb020";


        if (status === "FOUND")
            statusColor = "#00bfff";


        if (status === "READY")
            statusColor = "#ffffff";


        panel.innerHTML = `

            <div style="
                font-size:18px;
                font-weight:bold;
                margin-bottom:12px;
            ">
                📱 Brainyte Collector
            </div>


            <div style="
                margin-bottom:8px;
            ">
                Status:

                <b style="
                    color:${statusColor};
                ">
                    ${status}
                </b>
            </div>


            <div style="
                margin-bottom:4px;
            ">
                Current Number:
            </div>


            <div style="
                color:#00ff99;
                word-break:break-all;
                margin-bottom:12px;
                font-size:15px;
            ">
                ${phone || "-"}
            </div>


            <div style="
                font-size:22px;
                font-weight:bold;
                margin-bottom:15px;
            ">
                Total Saved: ${total}
            </div>


            <button
                id="bcExport"
                style="
                    width:100%;
                    padding:9px;
                    margin-bottom:7px;
                    cursor:pointer;
                "
            >
                📥 Export CSV
            </button>


            <button
                id="bcCopy"
                style="
                    width:100%;
                    padding:9px;
                    margin-bottom:7px;
                    cursor:pointer;
                "
            >
                📋 Copy All
            </button>


            <button
                id="bcClear"
                style="
                    width:100%;
                    padding:9px;
                    background:#dc3545;
                    color:white;
                    border:none;
                    cursor:pointer;
                "
            >
                🗑 Clear All
            </button>

        `;


        document
            .getElementById("bcExport")
            .onclick = exportCSV;


        document
            .getElementById("bcCopy")
            .onclick = copyAll;


        document
            .getElementById("bcClear")
            .onclick = clearAll;

    }


    /*************************************************
     * EXPORT CSV
     *************************************************/

    function exportCSV() {

        const numbers =
            getNumbers();


        if (!numbers.length) {

            alert(
                "No phone numbers have been collected yet."
            );

            return;

        }


        const csv =
            "Phone Number\n" +
            numbers.join("\n");


        const blob =
            new Blob(
                [csv],
                {
                    type: "text/csv;charset=utf-8;"
                }
            );


        const url =
            URL.createObjectURL(blob);


        const a =
            document.createElement("a");


        a.href =
            url;


        a.download =
            "brainyte_phone_numbers.csv";


        document.body.appendChild(a);


        a.click();


        a.remove();


        setTimeout(() => {

            URL.revokeObjectURL(url);

        }, 1000);

    }


    /*************************************************
     * COPY ALL
     *************************************************/

    async function copyAll() {

        const numbers =
            getNumbers();


        if (!numbers.length) {

            alert(
                "No phone numbers have been collected yet."
            );

            return;

        }


        try {

            await navigator.clipboard.writeText(
                numbers.join("\n")
            );


            alert(
                "Copied " +
                numbers.length +
                " phone numbers."
            );


        } catch (error) {

            alert(
                "Unable to copy numbers automatically."
            );

            console.error(error);

        }

    }


    /*************************************************
     * CLEAR ALL
     *************************************************/

    function clearAll() {

        const numbers =
            getNumbers();


        if (!numbers.length) {

            alert(
                "There are no saved numbers."
            );

            return;

        }


        const confirmed =
            confirm(
                "Delete all " +
                numbers.length +
                " collected phone numbers?"
            );


        if (!confirmed)
            return;


        localStorage.removeItem(
            STORAGE_KEY
        );


        lastDetectedNumbers = "";


        refreshPanel(
            "CLEARED",
            ""
        );

    }


    /*************************************************
     * COLLECT NUMBERS
     *************************************************/

    function collect() {

        const phones =
            findPhones();


        if (!phones.length)
            return;


        /*
         * Create a signature of the numbers
         * currently visible on the page.
         *
         * This prevents the script from
         * repeatedly processing the same page.
         */

        const signature =
            phones
                .slice()
                .sort()
                .join("|");


        if (
            signature ===
            lastDetectedNumbers
        ) {

            return;

        }


        lastDetectedNumbers =
            signature;


        let numbers =
            getNumbers();


        let newNumber =
            null;


        let duplicateFound =
            false;


        phones.forEach(phone => {

            if (
                numbers.includes(phone)
            ) {

                duplicateFound =
                    true;

                return;

            }


            numbers.push(phone);


            newNumber =
                phone;

        });


        /*
         * Save only when something new
         * was actually discovered.
         */

        if (newNumber) {

            saveNumbers(numbers);


            refreshPanel(
                "NEW",
                newNumber
            );


            console.log(
                "Brainyte Collector - Saved:",
                newNumber
            );


            return;

        }


        /*
         * If the page contains numbers but
         * they're already in storage.
         */

        if (duplicateFound) {

            refreshPanel(
                "DUPLICATE",
                phones[0]
            );

        }

    }


    /*************************************************
     * START
     *************************************************/

    refreshPanel(
        "READY",
        ""
    );


    /*
     * Lightweight polling.
     *
     * No MutationObserver.
     *
     * This avoids browser freezing
     * caused by continuously changing
     * the DOM from inside the observer.
     */

    setInterval(
        collect,
        CHECK_INTERVAL
    );


    /*
     * Initial scan.
     */

    setTimeout(
        collect,
        1000
    );


})();
