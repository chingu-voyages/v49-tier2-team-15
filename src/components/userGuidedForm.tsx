import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const errorMessage = 'Please use only one word, no spaces.';

export default function UserGuidedForm() {
  const [purpose, setPurpose] = useState<string>('');
  const [purposeError, setPurposeError] = useState<boolean>(false);

  const [mood, setMood] = useState<string>('');
  const [moodError, setMoodError] = useState<boolean>(false);

  const [audience, setAudience] = useState<string>('');

  const [keywords, setKeywords] = useState<string>('');
  const [keywordsError, setKeywordsError] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    switch (id) {
      case 'purpose':
        setPurpose(value);
        countOneWord(event) ? setPurposeError(false) : setPurposeError(true);
        break;
      case 'audience':
        setAudience(value);
        break;
      case 'mood':
        setMood(value);
        countOneWord(event) ? setMoodError(false) : setMoodError(true);
        break;
      case 'keywords':
        setKeywords(value);
        countFiveWords(event)
          ? setKeywordsError(false)
          : setKeywordsError(true);
        break;
      default:
        break;
    }
  };

  const countOneWord = (event: React.ChangeEvent<HTMLInputElement>) => {
    return event.target.value.split(' ').length === 1;
  };

  const countFiveWords = (event: React.ChangeEvent<HTMLInputElement>) => {
    return event.target.value.split(' ').length <= 5;
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-[640px]">
        <CardHeader>
          <CardTitle>Get help if you don't know where to start:</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid md:grid-cols-2 gap-x-4 gap-y-2">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="purpose">I need my color scheme for...</Label>
                <Input
                  id="purpose"
                  placeholder="Website, poster, outfit..."
                  autoComplete="off"
                  value={purpose}
                  onChange={handleChange}
                />
                <span className="text-red-700 p-0 text-sm min-h-5">
                  {purposeError && errorMessage}
                </span>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="audience">My audience is...</Label>
                <Input
                  id="audience"
                  placeholder="Describe audience (max: 255 characters)"
                  autoComplete="off"
                  maxLength={255}
                  value={audience}
                  onChange={handleChange}
                />
                <span className="text-red-700 p-0 text-sm min-h-5"></span>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="mood">Choose a mood for colors...</Label>
                <Input
                  id="mood"
                  placeholder="Happy, sad, love..."
                  autoComplete="off"
                  value={mood}
                  onChange={handleChange}
                />
                <span className="text-red-700 p-0 text-sm min-h-5">
                  {moodError && errorMessage}
                </span>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="keywords">
                  Please also use these keywords...
                </Label>
                <Input
                  id="keywords"
                  placeholder="Additional keywords (max: 5)"
                  autoComplete="off"
                  value={keywords}
                  onChange={handleChange}
                />
                <span className="text-red-700 p-0 text-sm min-h-5">
                  {keywordsError &&
                    'Maximum length exceeded. Only 5 keywords are allowed'}
                </span>
              </div>
            </div>

            <div className="pt-4 flex justify-center items-center">
              <Button type="submit" className="md:px-24 py-6">
                See my colour palette
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
