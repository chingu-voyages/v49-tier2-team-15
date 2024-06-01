import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Button } from './ui/button';
import { ColorContext } from '@/context/ColorContext';

export default function InfoSection() {
  const { accentColor } = useContext(ColorContext);

  return (
    <div className="flex flex-col items-center justify-center p-5 text-center">
      <p className="my-6 max-w-4xl dark:bg-foreground dark:text-secondary p-8 rounded-lg">
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

      <Link to="generator">
        <Button style={{ color: accentColor, borderColor: accentColor }}>
          Get me some colours
        </Button>
      </Link>
    </div>
  );
}
