# Nextjs - Mini Billing System

## Next.js Developer Interview Assignment document is attached [here](https://github.com/gopitridentsqa/HIT-Assignment-Billing-System/blob/main/docs/Billing_System_Mini.pdf)

## Prerequisites

Before you begin, make sure you have the following tools installed:

- **nvm** (Node Version Manager)
- **git**

## Tech Stack

**Client:** Next JS, Typescript

**Server:** Next JS

**Database:** SQLite

## Run Locally

Clone the project

```bash
git clone https://github.com/gopitridentsqa/HIT-Assignment-Billing-System.git
```

Go to the project directory

```bash
cd HIT-Assignment-Billing-System
```

Install dependencies

```bash
npm i
```

Start the server in development mode

```bash
npm run dev
```

Application will now run in `http://localhost:3000`

## Application Walkthrough

Here is an overview of the application's main sections and features:

### 1. **Home**

1. Shows a list of invoices, with client name, total amount, created date, and delete option.
2. The Add Invoice button allows you to create a new invoice.
3. The Delete buttons next to each invoice allow you to remove invoice data.

### 2. **Add Invoice**

- Form Fields (Client Name, Description, Quantity, Unit Price and Total Amount[Read Only] )
-  Zod Package was added for form validation.

## Deployment

To deploy the project in a production environment:

1. Install production dependencies by running:

2. Build the project:

```bash
npm run build
```

3. Start the application:

```bash
npm run start
```# HIT-Assignment-Billing-System
