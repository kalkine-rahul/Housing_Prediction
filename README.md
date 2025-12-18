Market Dashboard – Readme
📊 Market Dashboard (Next.js + Recharts)

A modern Real Estate Market Dashboard built with Next.js (App Router), React, Tailwind CSS, and Recharts. The dashboard visualizes property market data such as average prices by location, price trends over time, and overall market summaries using clean, responsive charts.

🚀 Features

📈 Price Trend Analysis using Recharts BarChart

🏙️ Average Price by Location (Horizontal Bar Chart)

🔍 Filter by Minimum Average Price

📊 Market Summary Cards (Avg price per sqft, total listings)

⚡ Fast & Responsive UI (Tailwind + Recharts)

🔗 API-driven dashboard (FastAPI / Node backend compatible)

🛠️ Tech Stack
Frontend

Next.js 14 (App Router)

React 18

TypeScript

Tailwind CSS

Recharts (Data Visualization)

Backend (Expected)

FastAPI / Node.js REST API

Endpoint: GET /api/market-data


📦 Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/your-username/market-dashboard.git
cd market-dashboard
2️⃣ Install Dependencies
npm install
3️⃣ Install Recharts
npm install recharts
4️⃣ Run Development Server
npm run dev

App will be available at: 👉 http://localhost:3000

📊 Charts Used (Recharts)
Price Trend

BarChart



Tooltip with INR formatting

Average Price by Location

Horizontal BarChart

Responsive layout

Filtered dataset support

🎯 Why Recharts?

Handles scaling & responsiveness automatically

Prevents layout break issues caused by raw values

Declarative, React-friendly API

Ideal for enterprise dashboards

🧠 Best Practices Followed

Client Components only where required ("use client")

Strong typing with TypeScript

Separation of data & presentation

Responsive charts using ResponsiveContainer

🧪 Future Enhancements

📉 Line charts for YoY growth

🌙 Dark mode support

📥 CSV / Excel export

🔐 Authentication & role-based access

🐳 Dockerized frontend + backend


