# 📄 Dokazi - Next-Generation Document Management System

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)

## 🚀 Project Overview

Dokazi is an enterprise-grade document management system built with modern web technologies. It streamlines the creation, editing, and management of complex business documents while maintaining version control and real-time collaboration capabilities.

### 🌟 Key Features

- **Dynamic Document Creation**: Intuitive interface for creating and managing various document types
- **Smart Client Management**: Built-in client information tracking and relationship management
- **Service Scope Definition**: Structured approach to defining and managing service deliverables
- **Timeline Integration**: Visual project timeline management with milestone tracking
- **Dark Mode Support**: Thoughtfully designed dark mode for enhanced usability
- **Responsive Design**: Seamless experience across all device sizes

## 🏗 Technical Architecture

### Frontend Stack

- **Next.js 14**: Leveraging server components and app router for optimal performance
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

- [ ] AI-powered document suggestions
- [ ] Real-time collaboration features
- [ ] Advanced document analytics
- [ ] Integration with popular CRM systems
- [ ] Mobile application development

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Why This Project Stands Out

1. **Enterprise-Ready Architecture**: Built with scalability and maintainability in mind
2. **Modern Tech Stack**: Utilizing the latest features from Next.js 14 and React
3. **Performance-First Approach**: Optimized for speed and user experience
4. **Clean Code Principles**: Following SOLID principles and best practices
5. **Comprehensive Documentation**: Detailed documentation for easy onboarding

## 🔗 Connect With Me

- **Portfolio**: [Your Portfolio]
- **LinkedIn**: [Your LinkedIn]
- **Twitter**: [@YourTwitter]

---

Built with ❤️ by Preston Yongo
