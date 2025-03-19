import React, { useState } from 'react';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import '../../../../../css/chietsanpham.css'

function YeuThichItem({ isFavorite, onClickAdd, onClickRemove, isLoading }) {
    const [hover, setHover] = useState(false);

    return (
        <>
            <div
                className={`yeuthich-item-from ${isLoading ? 'disabled' : ''}`}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={isLoading ? null : (isFavorite ? onClickRemove : onClickAdd)} // Vô hiệu hóa click khi đang loading
            >
                <p>
                    {isLoading ? '' : ''}
                    {hover
                        ? <FavoriteRoundedIcon className="fa-heart-o" />
                        : (isFavorite ? <FavoriteRoundedIcon className="fa-heart-o" /> : <FavoriteBorderRoundedIcon className="fa-heart-o" />)
                    }
                </p>
            </div>
        </>
    );
}

export default YeuThichItem;
