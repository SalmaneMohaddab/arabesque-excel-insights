
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">تحليل إكسل</h3>
            <p className="text-gray-600">
              أداة بسيطة وفعالة لتحليل ملفات إكسل وتحويلها إلى تقارير PDF احترافية
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary transition-colors">
                  عن البرنامج
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary transition-colors">
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">تواصل معنا</h3>
            <p className="text-gray-600">
              نسعد بتواصلكم معنا عبر البريد الإلكتروني
            </p>
            <a href="mailto:info@example.com" className="text-primary hover:underline mt-2 inline-block">
              info@example.com
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-100 mt-8 pt-8 text-center text-gray-600">
          <p>© {new Date().getFullYear()} تحليل إكسل. جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
