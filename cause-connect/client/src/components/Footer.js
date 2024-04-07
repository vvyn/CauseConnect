import "../styles/Footer.css";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";

export default function Footer() {
  return (
    <div className="Footer flex justify-center items-center">
      <div>
        <img
          className="h-10 absolute left-10"
          src="../CauseConnect-logo.png"
          alt="logo"
        />
      </div>
      <div className="flex flex-col">
        <ul className="flex items-center justify-center p-5">
          <li className="p-5">About Us</li>
          <li className="p-5">Contribute</li>
          <li className="p-5">Contact Us</li>
        </ul>
        <span className="text-center">© 2024 CauseConnect</span>
      </div>
      <div className="flex absolute right-20">
        <FacebookIcon className="mr-5" />
        <LinkedInIcon className="mr-5" />
        <TwitterIcon className="mr-5" />
        <InstagramIcon className="mr-5" />
      </div>
    </div>
  );
}
