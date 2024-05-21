import { Button } from './ui/button';

const InfoSection = () => {
  return (
    <div className="text-center p-5 flex flex-col justify-center items-center">
      <p className="m-2 max-w-2xl">
        Our application is designed to serve as a personal consultant, helping
        users to find harmonious color combinations using OpenAI for a variety
        of purposes, including outfit selection, interior design, website
        design, graphic design projects and more.
      </p>
      <Button className="m-12">Get me some colours</Button>
    </div>
  );
};

export default InfoSection;
