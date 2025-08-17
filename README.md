# 📄 Dokazi - Next-Generation Document Management System

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)

## 🚀 Project Overview

Dokazi is a smart document creation platform built specifically for freelancers. It empowers independent professionals to craft professional client-facing documents with ease, leveraging AI to improve content quality. With one click, freelancers can generate shareable public links to their documents, streamlining client communication and proposal delivery.

### Key Features

- **AI-Powered Document Creation**: Smart suggestions and improvements for your professional documents
- **One-Click Sharing**: Instantly generate public links for client-ready documents
- **Professional Templates**: Pre-built templates for proposals, contracts, and scope documents
- **Service Scope Builder**: Interactive tools to define and present your service offerings
- **Timeline & Milestone Planning**: Comprehensive breakdown of project timelines and milestones for clear client communication
- **Dark Mode Support**: Eye-friendly interface for long document editing sessions

## 🏗 Technical Architecture

### Frontend Stack

- **Next.js 15**: Leveraging server components and app router for optimal performance
- **TypeScript**: 100% type coverage for robust code quality
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Zustand**: Lightweight state management with hooks
- **Shadcn/ui**: Modern component library with accessibility built-in

### Performance Optimizations

- Server-side rendering for improved SEO and initial page load
- Dynamic imports for code splitting
- Optimized asset delivery through next/image
- Efficient state management with Zustand stores

## 🛠 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/preston176/dokazi-app.git
   cd dokazi-app
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

4. **Run the development server**

   ```bash
   bun dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
dokazi/
├── app/                    # Next.js app directory
│   ├── (landingpage)      # Landing page routes
│   ├── dashboard/         # Protected dashboard routes
│   ├── documents/         # Document management
│   └── actions/           # Server actions
├── components/            # Reusable UI components
├── lib/                   # Utility functions
├── store/                # Zustand state management
└── public/               # Static assets
```

## 🧪 Quality Assurance

- **TypeScript**: Strict type checking
- **ESLint**: Code quality enforcement
- **Prettier**: Code formatting
- **Husky**: Pre-commit hooks
- **Jest & Testing Library**: Unit and integration testing

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📈 Future Roadmap

- [ ] Subscription management for premium features
- [ ] Advanced AI writing assistant for professional tone and clarity
- [ ] Automated pricing suggestions based on scope
- [ ] Client feedback and revision tracking system
- [ ] Signature integration for contracts
- [ ] Analytics dashboard for proposal success rates

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Why This Project Stands Out

1. **Freelancer-First Design**: Built specifically for the needs of independent professionals
2. **AI-Enhanced Writing**: Smart suggestions help craft more professional documents
3. **Instant Sharing**: One-click public links generation for client access
4. **Modern & Fast**: Built with Next.js 15 for optimal performance

## 🔗 Connect With Me

- **Portfolio**: [Preston Mayieka](https://preston176.vercel.app/)
- **LinkedIn**: [Preston Mayieka](https://www.linkedin.com/in/preston-mayieka/)

---

Built with ❤️ by Preston