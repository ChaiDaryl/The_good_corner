import { AdCardProps } from "./AdCard"



export const AdDetail = ({id, title, imgUrl, price, description, link}: AdCardProps) => {
    return (
        <div className="ad-card-container">
        <a className="ad-card-link" href={link}>
            <img className="ad-card-image" src={imgUrl} />
            <div className="ad-card-text">                
                <div className="ad-card-title">{title}</div>
                <div className="description">détail : {description} </div>
                <div className="ad-card-price">{price} €</div>
            </div>
        </a>
    </div>
    
    )
    
    }