import React, { useEffect, useState } from 'react';

const NavbarAdmin = ({ adminName, adminImage }) => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = dateTime.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = dateTime.toLocaleTimeString();

  const navbarColor = "#000000"; // Black theme
  const dateColor = getContrastColor(navbarColor);

  function getContrastColor(color) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness >= 128 ? '#000' : '#fff';
  }

  return (
    <nav className="flex justify-between items-center p-2 h-16" style={{ backgroundColor: navbarColor }}>
      <div className="text-sm md:text-base lg:text-lg" style={{ color: dateColor }}>
        <div className="text-center">
          <div className="text-xs md:text-sm lg:text-base font-semibold">{formattedDate}</div>
          <div className="text-xl md:text-2xl lg:text-3xl font-bold">{formattedTime}</div>
        </div>
      </div>
      <div className="flex items-center">
        <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-500">KHAADI</span>
      </div>
      <div className="flex items-center space-x-2">
        <img
          src={adminImage}
          alt="Admin"
          className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full"
        />
        <span className="text-sm md:text-base lg:text-lg text-white">{adminName}</span>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
