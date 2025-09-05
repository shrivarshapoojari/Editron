import Link from "next/link";
import { Github, Twitter, Linkedin, Mail, Code2 } from "lucide-react";

export function Footer() {
  const socialLinks = [
    {
      href: "https://github.com",
      icon: <Github className="w-5 h-5" />,
      label: "GitHub"
    },
    {
      href: "https://twitter.com",
      icon: <Twitter className="w-5 h-5" />,
      label: "Twitter"
    },
    {
      href: "https://linkedin.com",
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn"
    },
    {
      href: "mailto:contact@editron.dev",
      icon: <Mail className="w-5 h-5" />,
      label: "Email"
    }
  ];

  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "/features" },
        { name: "Pricing", href: "/pricing" },
        { name: "API", href: "/api" },
        { name: "Docs", href: "/docs" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Community", href: "/community" },
        { name: "Support", href: "/support" },
        { name: "Status", href: "/status" },
        { name: "Changelog", href: "/changelog" }
      ]
    }
  ];

  return (
    <footer className="relative border-t border-gray-800/50 bg-gradient-to-b from-gray-950/50 to-black">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-2xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Editron
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              The future of coding is here. Experience AI-powered development with intelligent completions, 
              real-time collaboration, and seamless workflow integration.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all duration-300"
                  aria-label={link.label}
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Editron. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
