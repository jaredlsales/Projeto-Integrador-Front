import React from "react";
import "./RestaurantCard.css";

const RestaurantCard = () => {
    return (
        <>
        <div className="card">
            <div className="image-container">
                <img src="https://scc10.com.br/wp-content/uploads/2022/01/hamburguer.jpg" alt="Foto de um Hambúrguer " />
            </div>

            <div className="card-info">
                <h3>Bauru Lanches</h3>
                <p className="description">Os melhores lanches artesanais da região! Hambúrgueres, hot dogs e muito mais.</p>
            </div>

            <div className="card-footer">
                <span className="rating">⭐ 4.8</span>
                <span className="time">🕒 20-30 min</span>
                <span className="price">Min. R$ 15,00</span>
            </div>
        </div>
        </>
    )
}

export default RestaurantCard;