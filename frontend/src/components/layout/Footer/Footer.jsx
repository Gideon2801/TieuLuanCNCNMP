import React from "react";
import FooterContent from "./FooterContent";
import logo from "../../../assets/logo.png";
const Footer = ({ jsonData }) => {
  const footerData = jsonData[0];
  const heading = footerData.heading[0];

  return (
    <div className="bg-primaryBlue w-[100%] top-full">
      <div className="flex sm:flex-col lg:justify-center md:flex-row py-8 px-8">
        <div className="md:w-1/5 sm:w-full flex items-center justify-center">
          <img className="md:w-[80%] sm:w-[20%]" src={logo} alt="logo" />
        </div>

        <div className=" md:w-1/4 p-10">
          <h1 className="text-primaryBlue font-semibold uppercase tracking-widest">
            {heading.aboutus}
          </h1>
          <p className="mt-5 text-lightGray text-justify my-5 ">
            {footerData.aboutCompany}
          </p>
        </div>

        <div className="md:w-1/5 p-10">
          <FooterContent
            title={heading.policy}
            data={footerData.policy}
            disabled
          />
        </div>

        <div className="md:w-1/5 p-10">
          <FooterContent
            title={heading.information}
            data={footerData.infoData}
          />
        </div>

        <div className="md:w-1/5 p-10">
          <FooterContent
            title={heading.account}
            data={footerData.accountInfo}
          />
        </div>
      </div>
      <div className="bg-primaryDarkBlue py-5 px-8 md:px-24 flex flex-col md:flex-row items-center justify-center">
        <div>
          <p className="text-lightGray tracking-wider text-sm text-center">
          ĐT: 035 261 0224 - Email: groupcnpmmernstack@gmail.com
          
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
