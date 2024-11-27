# Nextjs - Mini Billing System

## Interview prompt document is attached [here](https://github.com/Sathyanarayanan-Dhanuskodi/hit-assessment/blob/main/docs/Interview%20Prompt.docx)

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
git clone https://github.com/Sathyanarayanan-Dhanuskodi/hit-assessment
```

Go to the project directory

```bash
cd hit-assessment
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

- The home page features a placeholder screen with navigation links in the sidebar.

### 2. **Add Invoice**

- Displays a list of invoices with details such as their **Client Name**, **Total Ammount**, **Created Date** and **Delete** for each invoice.
- An **Add Invoice** button allows you to add new invoice.
- The **Delete** buttons next to each invoice allow you to remove invoice details.

## Deployment

To deploy the project in a production environment:

1. Set `NODE_ENV=production`
2. Install production dependencies by running:

```bash
npm ci --production
```

3. Build the project:

```bash
npm run build
```

4. Start the application in production mode:

```bash
npm run start
```# HIT-Assignment-Billing-System
