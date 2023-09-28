export type AdType = {
    id: number;
    link: string;
    description: string;
    imgUrl: string;
    title: string;
    location: string;
    owner: string;
    price: number;
    dateAtCreated: Date;
  };
  
  export type AdCardProps = AdType;
export const AdCard = ({id, title, imgUrl, price, description, link, location, owner, dateAtCreated}: AdCardProps) => {
return (
    <div className="ad-card-container">
    <a className="ad-card-link" href={link}>
        <img className="ad-card-image" src={imgUrl} />
        <div className="ad-card-text">
            <div className="ad-card-title">{title}</div>
            <div className="ad-card-price">{price} €</div>
        </div>
    </a>
</div>

)

}