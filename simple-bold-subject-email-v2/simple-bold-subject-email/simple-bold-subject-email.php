<?php
/**
 * Plugin Name: Brainyte Email Sender
 * Description: Simple WordPress admin email sender with Unicode-bold subjects, multiple recipients, and privacy-protected delivery.
 * Version: 2.0.1
 * Author: Brainyte for Wells interactive
 * License: GPL-2.0-or-later
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Convert Latin letters/digits to Mathematical Sans-Serif Bold Unicode.
 */
function sbse_unicode_bold($text) {
    $map = array();

    for ($i = 0; $i < 26; $i++) {
        $map[chr(65 + $i)] = mb_chr(0x1D5D4 + $i, 'UTF-8');
        $map[chr(97 + $i)] = mb_chr(0x1D5EE + $i, 'UTF-8');
    }

    for ($i = 0; $i < 10; $i++) {
        $map[(string) $i] = mb_chr(0x1D7EC + $i, 'UTF-8');
    }

    $chars = preg_split('//u', $text, -1, PREG_SPLIT_NO_EMPTY);
    $output = '';

    foreach ($chars as $char) {
        $output .= isset($map[$char]) ? $map[$char] : $char;
    }

    return $output;
}

/**
 * Parse multiple email addresses.
 * Accepts one per line, commas, semicolons, or spaces.
 */
function sbse_parse_recipients($raw) {
    $raw = str_replace(array("\r\n", "\r", ";"), "\n", $raw);
    $parts = preg_split('/[\s,]+/', trim($raw));
    $valid = array();
    $invalid = array();

    foreach ($parts as $email) {
        $email = sanitize_email($email);

        if ($email === '') {
            continue;
        }

        if (is_email($email)) {
            $valid[] = strtolower($email);
        } else {
            $invalid[] = $email;
        }
    }

    $valid = array_values(array_unique($valid));

    return array(
        'valid'   => $valid,
        'invalid' => $invalid,
    );
}

/**
 * Admin menu.
 */
add_action('admin_menu', function () {
    add_menu_page(
        'Brainyte Email Sender',
        'Brainyte Email Sender',
        'manage_options',
        'simple-bold-subject-email',
        'sbse_render_admin_page',
        'dashicons-email-alt',
        30
    );
});

/**
 * Process email submission.
 */
function sbse_process_email() {
    if (!isset($_POST['sbse_send_email'])) {
        return;
    }

    if (
        !isset($_POST['sbse_nonce']) ||
        !wp_verify_nonce(
            sanitize_text_field(wp_unslash($_POST['sbse_nonce'])),
            'sbse_send_email'
        )
    ) {
        add_settings_error('sbse_messages', 'invalid_nonce', 'Security check failed. Please try again.', 'error');
        return;
    }

    if (!current_user_can('manage_options')) {
        add_settings_error('sbse_messages', 'permission_denied', 'You do not have permission to send emails.', 'error');
        return;
    }

    $raw_recipients = isset($_POST['sbse_to'])
        ? wp_unslash($_POST['sbse_to'])
        : '';

    $parsed = sbse_parse_recipients($raw_recipients);
    $recipients = $parsed['valid'];
    $invalid = $parsed['invalid'];

    $subject = isset($_POST['sbse_subject'])
        ? sanitize_text_field(wp_unslash($_POST['sbse_subject']))
        : '';

    $message = isset($_POST['sbse_message'])
        ? wp_kses_post(wp_unslash($_POST['sbse_message']))
        : '';

    $bold_subject = !empty($_POST['sbse_bold_subject']);

    if (empty($recipients)) {
        add_settings_error('sbse_messages', 'no_recipients', 'Please enter at least one valid recipient email address.', 'error');
        return;
    }

    if ($subject === '') {
        add_settings_error('sbse_messages', 'empty_subject', 'Please enter an email subject.', 'error');
        return;
    }

    if (trim(wp_strip_all_tags($message)) === '') {
        add_settings_error('sbse_messages', 'empty_message', 'Please enter a message.', 'error');
        return;
    }

    if (!empty($invalid)) {
        add_settings_error(
            'sbse_messages',
            'invalid_recipients',
            'These addresses were skipped because they are invalid: ' . esc_html(implode(', ', $invalid)),
            'warning'
        );
    }

    $final_subject = $bold_subject ? sbse_unicode_bold($subject) : $subject;

    $html_message = '
    <!doctype html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>' . esc_html($subject) . '</title>
    </head>
    <body style="margin:0;padding:24px;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">
        <div style="max-width:700px;margin:0 auto;background:#ffffff;padding:28px;border:1px solid #e5e5e5;border-radius:8px;">
            <div style="font-size:15px;line-height:1.7;color:#222;">
                ' . wpautop($message) . '
            </div>
        </div>
    </body>
    </html>';

    $admin_email = sanitize_email(get_option('admin_email'));
    $site_name = wp_specialchars_decode(get_bloginfo('name'), ENT_QUOTES);

    /*
     * PRIVACY PROTECTION:
     * Each recipient receives a separate email. No recipient is placed
     * in To/CC/BCC alongside another recipient, so addresses are hidden.
     */
    $success = 0;
    $failed = 0;

    foreach ($recipients as $recipient) {
        $headers = array(
            'Content-Type: text/html; charset=UTF-8',
            'From: ' . $site_name . ' <' . $admin_email . '>',
            'Reply-To: ' . $admin_email,
        );

        $sent = wp_mail(
            $recipient,
            $final_subject,
            $html_message,
            $headers
        );

        if ($sent) {
            $success++;
        } else {
            $failed++;
        }
    }

    if ($failed === 0) {
        add_settings_error(
            'sbse_messages',
            'email_sent',
            sprintf(
                'Successfully sent %d email%s. ',
                $success,
                $success === 1 ? '' : 's'
            ),
            'updated'
        );
    } else {
        add_settings_error(
            'sbse_messages',
            'partial_failure',
            sprintf(
                'Sent: %d. Failed: %d. Recipients were kept private.',
                $success,
                $failed
            ),
            'warning'
        );
    }
}

/**
 * Admin page.
 */
function sbse_render_admin_page() {
    sbse_process_email();
    ?>
    <div class="wrap">
        <h1>Brainyte Email Sender <span style="font-size:13px;color:#777;">v2.0.1</span></h1>

        <?php settings_errors('sbse_messages'); ?>

        <div style="max-width:850px;background:#fff;border:1px solid #dcdcde;border-radius:8px;padding:24px;margin-top:20px;">

            <div style="background:#f0f6fc;border-left:4px solid #2271b1;padding:12px 15px;margin-bottom:20px;">
                <strong>Privacy protected:</strong>
                Each recipient receives an individual email. Recipients cannot see the other email addresses.
            </div>

            <form method="post">
                <?php wp_nonce_field('sbse_send_email', 'sbse_nonce'); ?>

                <table class="form-table" role="presentation">
                    <tr>
                        <th scope="row">
                            <label for="sbse_to">Recipients</label>
                        </th>
                        <td>
                            <textarea
                                id="sbse_to"
                                name="sbse_to"
                                class="large-text"
                                rows="7"
                                placeholder="recepient1@gmail.com&#10;recepient2@gmail.com&#10;recepient3@gmail.com"
                                required
                            ></textarea>

                            <p class="description">
                                Enter one email per line. Commas and semicolons are also supported.
                                Each recipient is sent a separate private email.
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <th scope="row">
                            <label for="sbse_subject">Subject</label>
                        </th>
                        <td>
                            <input
                                type="text"
                                id="sbse_subject"
                                name="sbse_subject"
                                class="large-text"
                                placeholder="Enter your email subject here"
                                required
                            >

                            <p>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="sbse_bold_subject"
                                        value="1"
                                    >
                                    <strong>Bold Subject</strong>
                                </label>
                            </p>

                            <p class="description">
                                Converts the actual email subject to Unicode bold characters.
                                It is not duplicated inside the email body.
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <th scope="row">
                            <label for="sbse_message">Message</label>
                        </th>
                        <td>
                            <?php
                            wp_editor(
                                '',
                                'sbse_message',
                                array(
                                    'textarea_name' => 'sbse_message',
                                    'media_buttons' => false,
                                    'textarea_rows' => 14,
                                    'teeny'         => false,
                                    'quicktags'     => true,
                                )
                            );
                            ?>
                        </td>
                    </tr>
                </table>

                <?php submit_button('Send Email to All Recipients', 'primary', 'sbse_send_email'); ?>
            </form>
        </div>
    </div>
    <?php
}
