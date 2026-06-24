# Product Catalog 

A backend service built with Node.js, Express, MySQL and TiDB Cloud that supports browsing a large catalog of products with efficient filtering and cursor-based pagination.

## Overview

This project was developed as part of the CodeVector Internship Take-Home Assignment.

The system generates and stores 200,000 products and provides APIs to:

- Browse products sorted by newest first
- Filter products by category
- Paginate efficiently through large datasets in Batches of 20 Products
- Handle continuously changing data without showing duplicate or missing products

---

## Tech Stack

- React.js
- Vite
- Tailwind.css

---

## Local Setup

### Clone Repository

```bash
git clone <https://github.com/Harsh-Kumar-Mishra2006/CodeVector_assignment>
cd CodeVector_assignment
```

### Install Dependencies

```bash
npm install
```

### Run Dependencies

```bash
npm run dev
```
