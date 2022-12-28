import React, { useEffect, useState } from "react";
import { useAddress, useDisconnect, useMetamask, useContract, useNFTDrop} from "@thirdweb-dev/react";
import { GetServerSideProps } from "next";
import { sanityClient, urlFor } from "../../sanity";
import { Collection } from "../../typings";
import Link from "next/link";
import { BigNumber } from "ethers";

interface Props {
  collection: Collection;
}

function NFTDropPage({ collection }: Props) {
  const [claimedSupply, setClaimedSupply] = useState<number>(0);
  const [totalSupply, setTotalSupply] = useState<BigNumber>();
  const [loading, setLoading] = useState<boolean>(true);
  const nftDrop = useContract(collection.address, 'nft-drop').contract;

  // Auth
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const disconnect = useDisconnect();
  // --

  useEffect(() => {
    if(!nftDrop) return;

    const fetchNFTDropData = async () => {

      setLoading(true);
      const claimed = await nftDrop.getAllClaimed();
      const total = await nftDrop.totalSupply();

      setClaimedSupply(claimed.length);
      setTotalSupply(total);
      setLoading(false);

    };

    fetchNFTDropData();

  }, [nftDrop])

  return (
    <div className="flex h-screen flex-col lg:grid lg:grid-cols-10">
      {/** left side */}
      <div className="bg-gradient-to-br from-cyan-800 to-rose-500 lg:col-span-4">
        <div className="flex flex-col items-center justify-center py-2 lg:min-h-screen">
          <div className="bg-gradient-to-br from-yellow-400 to-purple-600 p-2 rounded-xl">
            <img
              className="w-44 rounded-xl object-cover lg:h-96 lg:w-72"
              src="https://cdn.pixabay.com/photo/2022/01/17/17/20/bored-6945309__480.png"
              alt=""
            />
          </div>
          <div className="p-5 text-center">
            <h1 className="text-4xl font-bold text-white">NFT</h1>
            <h2 className="text-xl text-gray-300">A collection of NFT</h2>
          </div>
        </div>
      </div>

      {/** right side */}
      <div className="flex flex-col flex-1 lg:col-span-6 p-12">
        {/** header */}

        <Link href={"/"}>
          <header className="flex items-center justify-between">
            <h1 className="w-52 cursor-pointer text-xl font-extralight sm:w-80">
              The{" "}
              <span className="font-extrabold underline decoration-pink-600">
                NFT
              </span>{" "}
              Marketplace
            </h1>
            <button
              className="rounded-4 bg-rose-400 text-white py-2 text-xs font-bold lg:px-5 lg:py-3 lg:text-base"
              onClick={() => (address ? disconnect() : connectWithMetamask())}
            >
              {address ? "Sign Out" : "Sign In"}
            </button>
          </header>
        </Link>

        <hr className="my-2 border" />
        {address && (
          <p className="text-center text-sm text-rose-400">
            You are logged in with wallet address {address.substring(0, 5)}...
            {address.substring(address.length - 5)}
          </p>
        )}
        {/** content */}

        <div className="mt-10 flex flex-1 flex-col items-center space-y-3 text-center lg:space-y-0 lg:justify-center">
          <img
            className="w-80 object-cover pb-10 lg:h-40"
            src={urlFor(collection.mainImage).url()}
            alt=""
          />

          <h1 className="text-3xl font-bold lg:text-5xl lg:font-extrabold">
            {collection.title}
          </h1>

          {loading ? (
            <p className="animate-pulse pt-2 text-xl text-green-500">
              Loading Supply Count
            </p>
          ) : (
            <p className="pt-2 text-xl text-green-500"> {claimedSupply} / {totalSupply?.toString()} NFT's claimed</p>
          )}

          {loading && (
            <img className="h-80 w-80 object-contain" src='https://media.tenor.com/6gHLhmwO87sAAAAi/gg.gif' alt="" />
          )}
        </div>

        {/** mint button */}
        <button className="h-16 w-full bg-red-500 text-white rounded-full mt-10 font-bold">
          Mint NFT (0.01 ETH)
        </button>
      </div>
    </div>
  );
}

export default NFTDropPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query = `*[_type == "collection" && slug.current == $id][0] {
        _id,
        title,
          address,
          description,
          nftCollectionName,
          mainImage {
          asset
          },
      previewImage {
        asset
      },
      slug {
        current
      },
      creator -> {
        _id,
        name,
        address,
        slug {
          current
        }
      }
    }
      `;

  const collection = await sanityClient.fetch(query, {
    id: params?.id,
  });

  if (!collection) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      collection,
    },
  };
};
