import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type category = {
  id: number;
  name: string;
};

type Inputs = {
  title: string;
  description: string;
  imgUrl: string;
  price: number;
  category: string;
};

const NewAd = () => {
  const [categories, setCategories] = useState<category[]>([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {    
    console.log(data);

    axios
      .post("http://localhost:5000/ads", data)
      .then((response) => {
        console.log(response.data);
        const adId = response.data.id;
        setIsFormSubmitted(true); 
        setIsRedirecting(true);

        setTimeout(() => {
          router.push(`/ad/${adId}`);
          }, 2000);
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi du formulaire :", error);
      });
  };

  useEffect(() => {
    const getCate = async () => {
      try {
        const result = await axios.get<category[]>("http://localhost:5000/categories");
        setCategories(result.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    getCate();
  }, []);

  return (
    <div>
      {isFormSubmitted ? (
        <p>L'annonce a été crées avec succès !</p>
      ) : (
        <form className="form-ad" onSubmit={handleSubmit(onSubmit)}>
           <label>
        Créez votre annonce: <br />
        <input className="text-field form-ad" {...register("title")} type="text" placeholder="Titre de l'annonce" /><br /><br />
        <input className="text-field form-ad" {...register("description")} type="text" placeholder="Description de l'annonce" /><br /><br />
        <input className="text-field form-ad" {...register("imgUrl")} type="text" placeholder="Image de l'annonce" /><br /><br />
        <input className="text-field form-ad" {...register("price")} type="number" placeholder="Prix" /><br /><br />
        <select className="button" {...register("category")}>
          {categories.map((el) => (
            <option value={el.id} key={el.id}>
              {el.name}
            </option>
          ))}
        </select>
        <br /><br />
      </label>
          <button className="button button-primary" type="submit">Poster</button>
        </form>
      )}

    {isRedirecting && <p>Redirection en cours...</p>}
    </div>
  );
};

export default NewAd;








