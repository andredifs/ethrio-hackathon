import React, { useCallback, useEffect, useState } from "react";

import { create } from "ipfs-http-client";


import { BigNumber, ethers } from "ethers";
import { useNavigate } from "react-router-dom";

import styles from './mint.module.css'

const client = create({ url: "https://ipfs.infura.io:5001/api/v0" });

function CreateItem(props) {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    image: "",
    price: BigNumber.from("0"),
  });
  const [preview, setPreview] = useState();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState();


  const fileSelectedHandler = async (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setImageFile(undefined);
      return;
    }
    setImageFile(event.target.files[0]);
  };

  useEffect(() => {
    if (!imageFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(imageFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const fileUploadHandler = async () => {
    setLoading(true);
    let imageCID = null;
    try {
      const added = await client.add(imageFile);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setPreview(url);
      imageCID = added.path;
      setLoading(false);
    } catch (error) {
      console.log("Error uploading file: ", error);
      setLoading(false);
    }
    return imageCID;
  };

  const handleChange = useCallback(
    ({ target }) =>
      setInputs((_state) => {
        if (target.name === "price") {
          return {
            ..._state,
            [target.name]: ethers.utils.parseEther(target.value),
          };
        } else {
          return {
            ..._state,
            [target.name]: target.value,
          };
        }
      }),
    []
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const imageCID = await fileUploadHandler();
    const tokenURI = JSON.stringify({
      name: inputs.name,
      description: inputs.description,
      image: imageCID,
    });
    const added = await client.add(tokenURI);
    // await createMarketSale(added.path);

    navigate("/");
  };

//   async function createMarketSale(tokenURI) {
//     const provider = await getProvider();
//     const signer = provider.getSigner();

//     const tokenContract = getTokenContract(signer);
//     let transaction = await tokenContract.createBoredHera(tokenURI);
//     let tx = await transaction.wait();

//     const tokenId = tx.events[0].args[2];
//     //const price = ethers.utils.parseUnits(inputs.price!, "ether");

//     const marketContract = getMarketContract(signer);
//     const listingCommision = await marketContract.getListingCommision();

//     transaction = await marketContract.createMarketItem(
//       tokenContract.address,
//       tokenId.toString(),
//       inputs.price,
//       {
//         value: listingCommision.toString(),
//       }
//     );

//     tx = await transaction.wait();
//     console.log(tx);
//   }

  return (
    <div className={styles.allContainer}>
      <h1 className={styles.title}>Crie uma <span className={styles.purpleText}>NFT</span></h1>
      <form onSubmit={handleSubmit} className={styles.formStyle}>
        <div className={styles.inputsWrapper}>
          <div>
            <label htmlFor="name" className={styles.labels}>
              Nome
            </label>
            <div className={styles.inputs}>
              <input
                placeholder="name"
                required
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                value={inputs.name}
                className=""
              />
            </div>
          </div>
          <div>
            <label htmlFor="description" className={styles.labels}>
              Descrição
            </label>
            <div className={styles.textareaClass}>
              <textarea
                placeholder="Brief description for your NFT."
                id="description"
                required
                name="description"
                onChange={handleChange}
                value={inputs.description}
                className=""
              />
            </div>
          </div>

          <div>
            <label className={styles.labels}>Imagem da NFT</label>

            <div className=" ">
              {loading ? (
                  <p>carregando</p>
              ) : preview ? (
                <>
                  <img className={styles.previewClass} src={preview} alt=''/>
                </>
              ) : (
                <div className={styles.uploaderWrapper}>
                    {" "}
                    <div className={styles.wrapper}>
                        <label htmlFor="image" className={styles.uploadImage}>
                            <input
                                id="image"
                                name="image"
                                type="file"
                                onChange={fileSelectedHandler}
                            />
                            Selecione uma imagem
                        </label>
                    </div>
                </div>

              )}
            </div>
            {preview && (
              <div className="mt-4">
                <label
                  htmlFor="image"
                  className={styles.uploadImage}
                >
                  Trocar Imagem
                  <input
                    id="image"
                    name="image"
                    type="file"
                    onChange={fileSelectedHandler}
                    className="sr-only"
                  />
                </label>
              </div>
            )}
          </div>

          <div className={styles.price}>
            <label htmlFor="price" className={styles.labels}>
              Preço(ONE)
            </label>
            <input
              required
              type="number"
              id="price"
              name="price"
              onChange={handleChange}
              value={ethers.utils.formatEther(inputs.price)}
              className="block w-full h-10 pr-16 bg-[#282c36] border-none rounded-lg focus:ring-primary sm:text-sm"
              placeholder="0.5"
              step=".1"
            />
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className={styles.button}
          >
            Criar
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateItem;