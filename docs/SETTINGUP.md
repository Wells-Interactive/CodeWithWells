# Setting Up a PHP Environment

Welcome to PHP development with **CodeWithWells**.

Before we write our first PHP program, we need to prepare a computer that can run PHP code.

---

## 🎯 What You Will Learn

By the end of this guide, you will know how to:

* Install PHP.
* Check whether PHP is installed.
* Create a PHP project.
* Run PHP from the terminal.
* Open a PHP project in VS Code.
* Run your first PHP program.

---

# 1. What Is PHP?

PHP is a programming language commonly used to build websites and web applications.

Unlike HTML, which the browser can display directly, PHP is normally processed by a **PHP server environment** before the result is sent to the browser.

For example:

```php
<?php

echo "Hello, World!";
```

PHP processes the code and the browser receives the resulting output:

```text
Hello, World!
```

---

# 2. What Do We Need?

For our beginner PHP projects, we need:

1. A computer.
2. PHP.
3. A code editor.
4. A web browser.
5. A terminal.

We recommend:

* **Ubuntu/Linux**
* **VS Code**
* **PHP**
* **Firefox or Chrome**

You can use Windows or macOS as well, but the installation commands will be different.

---

# 3. Check Whether PHP Is Already Installed

Open your terminal.

Run:

```bash
php --version
```

If PHP is installed, you should see something similar to:

```text
PHP 8.x.x (cli)
```

The exact version may be different.

You can also run:

```bash
which php
```

This shows where PHP is installed.

---

# 4. Installing PHP on Ubuntu

Open Terminal and update the package list:

```bash
sudo apt update
```

Then install PHP:

```bash
sudo apt install php
```

Check the installation:

```bash
php --version
```

You should now see the installed PHP version.

---

# 5. Install Useful PHP Packages

For our future CodeWithWells projects, install some commonly used PHP packages:

```bash
sudo apt install php-cli php-mbstring php-xml php-curl php-mysql
```

These provide support for:

* `php-cli` — running PHP from the terminal.
* `php-mbstring` — working with text and different character sets.
* `php-xml` — XML functionality.
* `php-curl` — communicating with external services.
* `php-mysql` — connecting PHP applications to MySQL databases.

Check PHP again:

```bash
php --version
```

---

# 6. Install VS Code

If you already have VS Code installed, you can skip this section.

VS Code will be our main code editor.

After installing VS Code, open a terminal and check:

```bash
code --version
```

If the command works, VS Code is ready.

---

# 7. Create Your First PHP Project

Create a folder for your CodeWithWells PHP projects:

```bash
mkdir -p ~/CodeWithWells/php
```

Move into the folder:

```bash
cd ~/CodeWithWells/php
```

Create our first project:

```bash
mkdir 01_hello_world
```

Enter the project:

```bash
cd 01_hello_world
```

---

# 8. Create `index.php`

Create the PHP file:

```bash
touch index.php
```

Open the project in VS Code:

```bash
code .
```

Put the following code into `index.php`:

```php
<?php

echo "Hello, World!";
```

Save the file.

---

# 9. Run PHP From the Terminal

PHP includes a small development web server.

From inside the project folder, run:

```bash
php -S localhost:8000
```

You should see something similar to:

```text
Development Server (http://localhost:8000) started
```

Open your browser and visit:

```text
http://localhost:8000
```

You should see:

```text
Hello, World!
```

Congratulations!

You have just run your first PHP application.

---

# 10. Understanding What Happened

When you opened:

```text
http://localhost:8000
```

the browser requested the page from your computer.

The PHP development server received the request.

PHP then processed:

```php
<?php

echo "Hello, World!";
```

The server sent the result back to the browser.

The browser displayed:

```text
Hello, World!
```

The important idea is:

```text
Browser
   ↓
PHP Development Server
   ↓
PHP Code
   ↓
Generated Output
   ↓
Browser
```

---

# 11. PHP Is Not HTML

Consider this HTML:

```html
<h1>Hello, World!</h1>
```

The browser can understand HTML directly.

PHP is different:

```php
<?php

echo "Hello, World!";
```

PHP needs to be processed before the browser receives the result.

This is why we need a PHP environment.

---

# 12. Mixing PHP and HTML

PHP can also generate HTML.

Create:

```php
<?php

$name = "CodeWithWells";

?>

<!DOCTYPE html>
<html>
<head>
    <title>My First PHP Page</title>
</head>
<body>

    <h1>Hello, <?php echo $name; ?>!</h1>

</body>
</html>
```

The browser will display:

```text
Hello, CodeWithWells!
```

This is where PHP starts becoming useful for building websites.

---

# 13. Stopping the PHP Server

When you run:

```bash
php -S localhost:8000
```

the terminal stays occupied by the PHP server.

To stop it, press:

```text
Ctrl + C
```

---

# 14. Running Another Project

Suppose you have:

```text
php/
├── 01_hello_world/
├── 02_variables/
└── 03_calculator/
```

Enter the project you want to run:

```bash
cd ~/CodeWithWells/php/02_variables
```

Then start PHP:

```bash
php -S localhost:8000
```

Open:

```text
http://localhost:8000
```

---

# 15. Common Mistakes

## Mistake 1 — `php: command not found`

If you see:

```text
php: command not found
```

PHP is probably not installed or is not available in your PATH.

Try:

```bash
sudo apt update
sudo apt install php
```

Then:

```bash
php --version
```

---

## Mistake 2 — Running the wrong folder

Make sure your terminal is inside the project containing `index.php`.

Check:

```bash
pwd
```

Then:

```bash
ls
```

You should see:

```text
index.php
```

---

## Mistake 3 — Opening the PHP file directly

Do not normally open:

```text
file:///home/student/project/index.php
```

Instead, start the PHP server:

```bash
php -S localhost:8000
```

Then visit:

```text
http://localhost:8000
```

---

## Mistake 4 — Forgetting the `.php` extension

This:

```text
index.html
```

is an HTML file.

This:

```text
index.php
```

is a PHP file.

---

# 16. Check Your Environment

Run these commands:

```bash
php --version
```

```bash
which php
```

```bash
php -m
```

If these commands work, your PHP environment is ready.

---

# 🧪 Student Exercise

Complete the following tasks without copying the answer.

### Exercise 1

Create:

```text
hello.php
```

Make PHP display:

```text
Hello from CodeWithWells!
```

### Exercise 2

Make PHP display your name.

### Exercise 3

Display three separate lines:

```text
My name is __________.
I am learning PHP.
I am a CodeWithWells student.
```

### Exercise 4

Change the project so the browser displays:

```text
Welcome to my first PHP application!
```

---

# 🏆 Student Challenge

Create a file called:

```text
student_profile.php
```

Your program should display:

```text
========================
     STUDENT PROFILE
========================

Name: Your Name
Course: PHP Programming
School: CodeWithWells
Goal: Become a Software Developer
```

You should use PHP to generate the information.

Do not simply create the entire page as plain HTML.

---

# ⭐ Bonus Challenge

Create variables for the student's information:

```php
$name = "Your Name";
$course = "PHP Programming";
$school = "CodeWithWells";
```

Then use PHP to display them.

This prepares you for the next lesson:

**PHP Variables.**

---

# What Comes Next?

After completing this setup, continue with:

```text
01 — Hello World
02 — PHP Variables
03 — PHP Data Types
04 — PHP Operators
05 — PHP Conditions
06 — PHP Loops
07 — PHP Functions
08 — PHP Arrays
09 — PHP Forms
10 — PHP + MySQL
```

The goal is to move from simple PHP statements to building complete web applications.

---

## Final Check

Before moving on, you should be able to answer these questions:

* What is PHP?
* Why does PHP need to be processed by a server?
* How do you check whether PHP is installed?
* How do you create a PHP file?
* How do you start the PHP development server?
* What does `echo` do?
* What is the difference between `.html` and `.php`?
* What URL do we use for our local PHP server?

If you can answer these questions and successfully run `Hello, World!`, your PHP environment is ready.
