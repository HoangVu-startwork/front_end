import React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const RatingStars = ({ rating }) => {
    const fullStars = Math.floor(rating); // Số sao đầy
    const halfStar = rating % 1 >= 0.5 ? true : false; // Nếu phần thập phân >= 0.5, thì có sao khuyết
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Số sao rỗng
  
    return (
      <div style={{ display: 'flex' }}>
        {/* Render các sao đầy */}
        {Array(fullStars).fill().map((_, i) => (
          <FaStar key={i} color="#FFD700" />
        ))}
  
        {/* Render sao khuyết nếu có */}
        {halfStar && <FaStarHalfAlt color="#FFD700" />}
  
        {/* Render các sao rỗng */}
        {Array(emptyStars).fill().map((_, i) => (
          <FaRegStar key={i} color="#FFD700" />
        ))}
      </div>
    );
}

export default RatingStars;