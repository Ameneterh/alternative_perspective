import { Link } from "react-router-dom";
import {
  FaTwitter,
  FaFacebook,
  FaLinkedin,
  FaInstagramSquare,
} from "react-icons/fa";
import logoImage from "../assets/alter_persp_logo.png";
import {
  MdAddCall,
  MdAlternateEmail,
  MdLocationOn,
  MdOutlineMarkEmailRead,
  MdOutlinePhoneInTalk,
  MdWhatsapp,
} from "react-icons/md";

export default function FooterComponent() {
  return (
    <footer className="mt-10 py-10 px-4 bg-gray-950 flex flex-col items-center font-extralight text-white">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10">
        <div className="w-full flex flex-col justify-between text-sm font-extralight gap-5">
          <div className="flex flex-col md:flex-row gap-2">
            <img
              src={logoImage}
              className="w-10 md:w-20 bg-white p-1 rounded-md"
            />
            <p className="text-xs font-bold mt-2">
              Our Mission:
              <span className="block font-extralight">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
                vel repellat reprehenderit.
              </span>
            </p>
          </div>
          <div>
            <Link
              to="/privacy-terms"
              className="hover:text-blue-600 hover:underline underline-offset-2"
            >
              Privacy Policy | Terms of Use
            </Link>
          </div>
        </div>

        {/* mid section */}
        <div className="w-full flex flex-col my-5 md:my-0">
          <h3 className="text-orange-700 font-bold">Useful Links</h3>
          <ul className="text-sm list-none -ml-5">
            <li className="">
              <Link
                to="/faqs"
                className="hover:underline hover:font-semibold underline-offset-2"
              >
                FAQs
              </Link>
            </li>
            <li className="mt-2">
              <Link
                to="/subscribe"
                className="hover:underline hover:font-semibold underline-offset-2"
              >
                Subscribe
              </Link>
            </li>
            <li className="mt-2">
              <p className="flex items-center gap-2">
                <span className="text-orange-600">Follow us:</span>
                <Link
                  to="/twitter"
                  className="hover:underline hover:font-semibold underline-offset-2"
                >
                  <FaTwitter size={20} className="hover:text-blue-700" />
                </Link>
                <Link
                  to="/facebook"
                  className="hover:underline hover:font-semibold underline-offset-2"
                >
                  <FaFacebook size={20} className="hover:text-blue-700" />
                </Link>
                <Link
                  to="/linkedin"
                  className="hover:underline hover:font-semibold underline-offset-2"
                >
                  <FaInstagramSquare
                    size={20}
                    className="hover:text-blue-700"
                  />
                </Link>
                <Link
                  to="/linkedin"
                  className="hover:underline hover:font-semibold underline-offset-2"
                >
                  <FaLinkedin size={20} className="hover:text-blue-700" />
                </Link>
              </p>
            </li>
          </ul>
        </div>

        {/* right side */}
        <div className="w-full flex flex-col">
          <h3 className="text-orange-700 font-bold">Contact Us:</h3>
          <ul className="text-sm list-none -ml-5">
            <li className="flex gap-2 items-center">
              <MdAddCall size={16} />
              <Link to="tel:+2349030902396">+2349030902396</Link>
            </li>
            <li className="mt-2 flex gap-2 items-center">
              <MdAlternateEmail size={16} />
              <Link to="mailto:bagudumohammed15197@gmail.com">
                bagudumohammed15197@gmail.com
              </Link>
            </li>
            <li className="mt-2 flex gap-2 items-start">
              <MdLocationOn size={16} />
              No 25, actual location address, <br />
              Goes here if there is one available
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center text-sm border-t border-t-slate-800 w-full pt-5">
        All Rights Reserved{" "}
        <span className="block md:inline">
          &copy; {new Date().getFullYear()} Alternative Perspectives
        </span>
      </div>
    </footer>
  );
}
