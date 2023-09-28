import { useState, useEffect } from "react";
import axios from "axios";
import { AdCard, AdCardProps } from "./AdCard";
import Link from "next/link";

export const RecentAds = () => {
  const [total, setTotal] = useState(0);
  const [ads, setAds] = useState<AdCardProps[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = (adId: number) => { // Prenez l'ID de l'annonce comme argument
    setIsDeleting(true);
    axios
      .delete(`http://localhost:5000/ads/${adId}`)
      .then(() => {
        setIsDeleting(false); 
        setAds((prevAds) => prevAds.filter((ad) => ad.id !== adId)); 
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression :", error);
      });
  };

  useEffect(() => {
    const getAds = async () => {
      try {
        const result = await axios.get<AdCardProps[]>("http://localhost:5000/ads");
        setAds(result.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    getAds();
  }, []);

  useEffect(() => {
    console.log(ads);
  }, [ads]);

  return (
    <>
      <h2>Annonces récentes</h2>
      <p>Total price: {total} €</p>
      <section className="recent-ads">
        {ads.map((ad) => (
          <div key={ad.id}>
            <AdCard
              id={ad.id}
              imgUrl={ad.imgUrl}
              link={ad.link}
              price={ad.price}
              title={ad.title}
              description={ad.description}
            />
            <button
              onClick={() => {
                setTotal(total + ad.price);
              }}
              className="button"
            >
              Add price to total
            </button>
            <Link className="button" href={`/ad/${ad.id}`} as={`/ad/${ad.id}`}>
                Voir l'annonce
            </Link>
            <button
              className="button button-primary"
              onClick={() => handleDelete(ad.id)} // Appel de la fonction handleDelete avec l'ID de l'annonce
            >
              Supprimer
            </button>
          </div>
        ))}
      </section>
    </>
  );
};