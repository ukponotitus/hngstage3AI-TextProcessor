import Head from "next/head"; 
import PreAppBar from "../components/layout/appbar";
import React from "react";


export default function UserLayout(props) {
  const { title, description, children } = props;

  return (
    <>
      <Head>
          {/* Registration for Translator API */}
        <meta httpEquiv="origin-trial" 
        content="Aoeg49e8gXziww8aMaciOT3ocfAg14TCdd6srBr0/ENCVaog72otR4Or4Q
        jz9qByZNGl2mbK/pxvft9j0jf8sw0AAABReyJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJmZWF0dXJl
        IjoiVHJhbnNsYXRpb25BUEkiLCJleHBpcnkiOjE3NTMxNDI0MDB9" />


          {/*Registration for Language Detector API */}
        <meta httpEquiv="origin-trial" 
        content="AlvnQOgXEaDkm1KTvW3ZasTnP5EAdLCnhbhfTzwAE2D5V1t2jyJ3+jjnQWgXOtgO40FeJ2rt7V69DIsxHW/
        7uA4AAABXeyJvcmlnaW4iOiJodHRwOi8vbG9jY
        Wxob3N0OjMwMDAiLCJmZWF0dXJlIjoiTGFuZ3VhZ2VEZXRlY3Rpb25BUEkiLCJleHBpcnkiOjE3NDk1OTk5OTl9" />


          {/* Registration for Summarization API */}
        <meta httpEquiv="origin-trial" 
        content="ApywZEcawPu3bp6OLLTdoGZKtPjN5sKcNOYQ7FrAJbcOp/vfx7SNIZu8Zxj9gqcIPXzkGd5/KiS1H
        pvUvKee5gwAAABVeyJvcmlnaW4iOiJodHRwOi8vbG9j
        YWxob3N0OjMwMDAiLCJmZWF0dXJlIjoiQUlTdW1tYXJpemF0aW9uQVBJIiwiZXhwaXJ5IjoxNzUzMTQyNDAwfQ==" />
      </Head>

      <div className="h-screen bg-[#f1f1f1] lg:px-[10rem] pb-10 sm:px-10">
        <div className="md:max-w-[1440px] 2xl:max-w-[2440px] mx-auto w-full flex">
          <div className="bg-[#f1f1f1] text-gray-900 flex flex-col gap-y-1 w-full">
            <PreAppBar  display={false} title={title} description={description} />
            <div className="flex-col  bg-[#f1f1f1] flex gap-y-1 w-full p-5 md:p-7">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
