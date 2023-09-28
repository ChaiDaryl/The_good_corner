import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { AdType } from "../../components/AdCard";
import { AdDetail } from "@/components/AdDetail";

const AdDetailComponent = () => {
  const router = useRouter();
  const adId = router.query.id;
  const [ad, setAd] = useState<AdType | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedAd, setEditedAd] = useState<AdType | null>(null);

  async function fetchAd() {
    try {
      const result = await axios.get<AdType>(`http://localhost:5000/ads/${adId}`);
      setAd(result.data);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'annonce :", error);
    }
  }

  useEffect(() => {
    if (adId !== undefined) {
      fetchAd();
    }
  }, [adId]);

  function startEditing() {
    setIsEditing(true);
    // Copiez l'annonce dans l'état de l'annonce en cours d'édition
    if (ad) {
      setEditedAd({ ...ad });
    }
  }

  function cancelEditing() {
    setIsEditing(false);
  }

  async function patchAd() {
    try {
      if (editedAd) {
        const result = await axios.patch<AdType>(
          `http://localhost:5000/ads/${adId}`,
          {
            // Incluez uniquement les champs que vous souhaitez mettre à jour
            title: editedAd.title,
            description: editedAd.description,
            imgUrl: editedAd.imgUrl,
            price: editedAd.price,
          }
        );
        setAd(result.data);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour partielle de l'annonce :", error);
    }
  }

  return (
    <>
      <p>Display details of ad with id {router.query.id}</p>

      {!isEditing && ad && (
        <>
          <AdDetail
            key={ad.id}
            imgUrl={ad.imgUrl}
            link={ad.link}
            price={ad.price}
            title={ad.title}
            description={ad.description}
            id={ad.id}
          />
          <button onClick={startEditing}>Modifier</button>
        </>
      )}

      {isEditing && editedAd && (
        <>
          {/* Ajoutez des champs de saisie pour la modification */}
          <input
           className="text-field"
            type="text"
            value={editedAd.title}
            onChange={(e) => setEditedAd({ ...editedAd, title: e.target.value })}
          /><br /><br />

          <input
          className="text-field"
            type="text"
            value={editedAd.imgUrl}
            onChange={(e) => setEditedAd({ ...editedAd, imgUrl: e.target.value })}
          /><br /><br />
          <input
          className="text-field"
            type="text"
            value={editedAd.description}
            onChange={(e) =>
              setEditedAd({ ...editedAd, description: e.target.value })
            }
          /><br /><br />
          <input
          className="text-field"
            type="number"
            value={editedAd.price}
            onChange={(e) =>
              setEditedAd({ ...editedAd, price: Number(e.target.value) })
            }
          /><br /><br />

          <button onClick={patchAd}>Enregistrer les modifications partielles</button><br /><br />
          <button onClick={cancelEditing}>Annuler</button>
        </>
      )}
    </>
  );
};

export default AdDetailComponent;


