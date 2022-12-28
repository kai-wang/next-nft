import React from "react";

function NFTDropPage() {
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
        <header className="flex items-center justify-between">
          <h1 className="w-52 cursor-pointer text-xl font-extralight sm:w-80">
            The{" "}
            <span className="font-extrabold underline decoration-pink-600">
              NFT
            </span>{" "}
            Marketplace
          </h1>
          <button className="rounded-4 bg-rose-400 text-white py-2 text-xs font-bold lg:px-5 lg:py-3 lg:text-base">
            Sign In
          </button>
        </header>
        <hr className="my-2 border" />
        {/** content */}

        <div className="mt-10 flex flex-1 flex-col items-center space-y-3 text-center lg:space-y-0 lg:justify-center">
          <img className="w-80 object-cover pb-10 lg:h-40" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSItQxHkvWdVVRpXfkFQ4XuQFhmst8UgbRGKA&usqp=CAU" alt="" />

          <h1 className="text-3xl font-bold lg:text-5xl lg:font-extrabold">NFT Drop</h1>

          <p className="pt-2 text-xl text-green-500">13 / 21 NFT's claimed</p>
        </div>


        {/** mint button */}
        <button className="h-16 w-full bg-red-500 text-white rounded-full mt-10 font-boldgit remote add origin git@github.com:kai-wang/next-nft.git">
            Mint NFT (0.01 ETH)
        </button>
      </div>
    </div>
  );
}

export default NFTDropPage;
