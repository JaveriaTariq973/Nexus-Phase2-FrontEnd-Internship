# Nexus – Investor & Entrepreneur Collaboration Platform

## Overview
Nexus is a collaboration platform that connects entrepreneurs and investors, enabling profile discovery, collaboration requests, meeting scheduling, and deal documentation. This repository is a fork of the base Nexus project, extended as part of an advanced frontend internship (Phase 2).

## Tech Stack
- **React** (with TypeScript)
- **Vite** – build tool and dev server
- **Tailwind CSS** – styling and theming
- **React Router DOM** – client-side routing
- **react-calendar** – meeting scheduling calendar
- **react-signature-canvas** – e-signature for document chamber

## Project Structure
Nexus/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI elements (Button, Card, Badge, Input)
│   │   ├── layout/          # DashboardLayout and navigation shell
│   │   ├── collaboration/   # Collaboration request cards
│   │   ├── entrepreneur/    # Entrepreneur-specific cards
│   │   ├── investor/        # Investor-specific cards
│   │   └── MeetingCalendar.tsx   # Meeting scheduling calendar component
│   ├── pages/
│   │   ├── auth/             # Login & Register pages
│   │   ├── dashboard/        # Role-based dashboards (Entrepreneur / Investor)
│   │   ├── profile/          # User profile pages
│   │   ├── investors/        # Browse investors
│   │   ├── entrepreneurs/    # Browse entrepreneurs/startups
│   │   ├── messages/         # Messaging
│   │   ├── notifications/    # Notifications
│   │   ├── documents/        # Document Processing Chamber
│   │   ├── deals/            # Deals page
│   │   ├── settings/         # Settings
│   │   └── help/              # Help & Support
│   ├── context/               # AuthContext (authentication state)
│   ├── data/                  # Mock data (users, collaboration requests)
│   ├── types/                 # TypeScript type definitions
│   └── App.tsx                 # Route definitions
├── public/
└── package.json

## Architecture Notes
- **Routing**: Handled centrally in `App.tsx` using `react-router-dom`. All authenticated pages are wrapped inside a shared `DashboardLayout`, which provides the sidebar and top navigation.
- **Role-based dashboards**: Entrepreneurs and Investors have separate dashboard components (`EntrepreneurDashboard.tsx`, `InvestorDashboard.tsx`) rendered based on the logged-in user's role.
- **Component reuse**: Shared UI primitives (`Button`, `Card`, `Badge`, `Input`) live in `components/ui/` and are reused across all pages for visual consistency.
- **State management**: Local component state (`useState`, `useEffect`) is used for feature-level data; authentication state is handled globally via `AuthContext`.

## UI Theme
The existing Tailwind CSS theme (primary, secondary, and accent color palettes defined in `tailwind.config.js`) has been reused across all newly added features to maintain visual consistency with the base platform. No new design tokens were introduced.

## Features Added (Phase 2)

### Milestone 2 – Meeting Scheduling Calendar
- Integrated using `react-calendar`.
- Entrepreneurs and Investors can request meetings on a selected date.
- Meeting requests can be accepted or declined.
- Confirmed meetings are reflected on the dashboard.


## Getting Started
```bash
npm install
npm run dev
```
Visit `http://localhost:5173` 

## Deployment

