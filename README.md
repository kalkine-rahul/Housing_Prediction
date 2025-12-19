Market Dashboard – Readme
📊 Market Dashboard (Next.js + Recharts)

A modern Real Estate Market Dashboard built with Next.js (App Router), React, Tailwind CSS, and Recharts. The dashboard visualizes property market data such as average prices by location, price trends over time, and overall market summaries using clean, responsive charts.

🚀 Features

📈 Price Trend Analysis using Recharts BarChart

🏙️ Average Price by Location

🔍 Filter by Minimum Average Price

📊 Market Summary Cards (Avg price per sqft, total listings)

⚡ Fast & Responsive UI (Tailwind + Recharts)

🔗 API-driven dashboard (FastAPI)

🛠️ Tech Stack
Frontend

Next.js 14 (App Router)

React 18

TypeScript

Tailwind CSS

Recharts 

Backend

FastAPI / Node.js REST API

Endpoint: GET /api/market-data


📦 Installation & Setup
App will be available at: http://localhost:3000

📊 Charts Used (Recharts)
Price Trend

BarChart

Average Price by Location

Horizontal BarChart

Responsive layout

Filtered dataset support

Handles scaling & responsiveness automatically

Prevents layout break issues caused by raw values


Ideal for enterprise dashboards
Client Components only where required ("use client")

TypeScript

Separation of data & presentation

Responsive charts using ResponsiveContainer

📥 CSV export
🐳 Dockerized frontend + backend

## System Design
Refer to system-design.md

