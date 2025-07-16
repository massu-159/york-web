"use client";

import { MapPin, Phone, Mail } from "lucide-react";
import { useFocusManagement, announceToScreenReader } from "@/hooks/use-focus-management";
import { useState } from "react";

export function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const { elementRef } = useFocusManagement({ autoFocus: false });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    announceToScreenReader('メッセージを送信中です', 'assertive');
    
    setTimeout(() => {
      setFormStatus('success');
      announceToScreenReader('メッセージが正常に送信されました', 'assertive');
    }, 2000);
  };

  return (
    <section id="contact" className="relative py-20 overflow-hidden" role="region" aria-labelledby="contact-heading">
      <div className="absolute w-96 h-96 bg-pink-500/10 rounded-full -top-60 -right-60 animate-ripple"></div>
      <div className="absolute w-96 h-96 bg-pink-500/10 rounded-full -top-60 -right-60 animate-ripple [animation-delay:2s]"></div>
      <div className="absolute w-96 h-96 bg-pink-500/10 rounded-full -top-60 -right-60 animate-ripple [animation-delay:4s]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="contact-heading" className="text-3xl font-bold text-center mb-2">Get In Touch</h2>
        <p className="text-muted-foreground text-center mb-12">
          For project consultations and quote requests, please contact us here. We'll be happy to discuss your digital needs.
        </p>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-6" id="contact-info-heading">Contact Information</h3>
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
          <form 
            ref={elementRef}
            className="space-y-6" 
            role="form" 
            aria-labelledby="contact-form-heading"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="contact-name" className="sr-only">お名前</label>
              <input
                id="contact-name"
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-pink-500"
                aria-required="true"
                aria-describedby="name-description"
              />
              <span id="name-description" className="sr-only">お名前を入力してください</span>
            </div>
            <div>
              <label htmlFor="contact-email" className="sr-only">メールアドレス</label>
              <input
                id="contact-email"
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-pink-500"
                aria-required="true"
                aria-describedby="email-description"
              />
              <span id="email-description" className="sr-only">メールアドレスを入力してください</span>
            </div>
            <div>
              <label htmlFor="contact-message" className="sr-only">メッセージ</label>
              <textarea
                id="contact-message"
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-pink-500"
                aria-required="true"
                aria-describedby="message-description"
              ></textarea>
              <span id="message-description" className="sr-only">メッセージ内容を入力してください</span>
            </div>
            <button 
              type="submit"
              className="bg-pink-600 text-white px-8 py-3 rounded-full hover:bg-pink-700 transition-colors w-full focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2"
              aria-label="メッセージを送信する"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}