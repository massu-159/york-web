"use client";

import { MapPin, Phone, Mail } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="relative py-20 overflow-hidden">
      <div className="absolute w-96 h-96 bg-pink-500/10 rounded-full -top-60 -right-60 animate-ripple"></div>
      <div className="absolute w-96 h-96 bg-pink-500/10 rounded-full -top-60 -right-60 animate-ripple [animation-delay:2s]"></div>
      <div className="absolute w-96 h-96 bg-pink-500/10 rounded-full -top-60 -right-60 animate-ripple [animation-delay:4s]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-2">Get In Touch</h2>
        <p className="text-muted-foreground text-center mb-12">
          For project consultations and quote requests, please contact us here. We'll be happy to discuss your digital needs.
        </p>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 group">
                <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center 
                  [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] transition-all duration-500
                  group-hover:bg-pink-400 dark:group-hover:bg-pink-600">
                  <MapPin className="w-5 h-5 text-pink-500 group-hover:text-white transition-colors duration-500" />
                </div>
                <div>
                  <p className="font-medium">Our Location</p>
                  <p className="text-muted-foreground">123 Creative St, Digital Valley, NY</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 group">
                <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center 
                  [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] transition-all duration-500
                  group-hover:bg-pink-400 dark:group-hover:bg-pink-600">
                  <Phone className="w-5 h-5 text-pink-500 group-hover:text-white transition-colors duration-500" />
                </div>
                <div>
                  <p className="font-medium">Call Us</p>
                  <p className="text-muted-foreground">+1 234 5678</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 group">
                <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center 
                  [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] transition-all duration-500
                  group-hover:bg-pink-400 dark:group-hover:bg-pink-600">
                  <Mail className="w-5 h-5 text-pink-500 group-hover:text-white transition-colors duration-500" />
                </div>
                <div>
                  <p className="font-medium">Email Us</p>
                  <p className="text-muted-foreground">hello@yorkweb.com</p>
                </div>
              </div>
            </div>
          </div>
          <form className="space-y-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-pink-500"
            ></textarea>
            <button className="bg-pink-500 text-white px-8 py-3 rounded-full hover:bg-pink-600 transition-colors w-full">
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}