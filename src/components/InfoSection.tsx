import { Button } from './ui/button';

export default function InfoSection() {
  return (
    <div className="text-center p-5 flex flex-col justify-center items-center">
      <p className="my-6 max-w-7xl">
        <span>
          Let's consider the importance of colors in our lives. These bright
          shades not only decorate our surroundings but also affect our feelings
          and thoughts every day. From the calming effect of gentle blues to the
          energizing power of vibrant greens, colors impact how we experience
          and express ourselves. However, many of us find ourselves struggling
          to find matching colors, whether for our outfits or interior design,
          often leading to frustration and uncertainty in our choices.
        </span>
        <br />
        <span>
          The app is intended to serve as a personal consultant, helping users
          find harmonious color combinations for various purposes, including
          outfit coordination, interior design, website design, graphic design
          projects, and more.
        </span>
      </p>
      <Button>Get me some colours</Button>
    </div>
  );
}
