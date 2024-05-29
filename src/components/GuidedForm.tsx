import React, { useState } from 'react';

import { useColorGenerator } from '../hooks';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
// } from '@/components/ui/select';
import { createGuidedColorPrompt } from '@/helpers/generators';
import hasEmptyValues from '@/utils/GuidedFormFunctions/checkEmptyValues';
import countChars from '@/utils/GuidedFormFunctions/countChars';
import countOneWord from '@/utils/GuidedFormFunctions/countOneWord';

interface userGuidedFormProps {
  initialColor?: `#${string}`;
}

export default function GuidedForm({
  initialColor = '#anyColor',
}: userGuidedFormProps) {
  const [purpose, setPurpose] = useState<string>('');
  const [purposeError, setPurposeError] = useState<boolean>(false);

  const [mood, setMood] = useState<string>('');
  const [moodError, setMoodError] = useState<boolean>(false);

  const [audience, setAudience] = useState<string>('');
  const [audienceError, setAudienceError] = useState<boolean>(false);

  const [keyword, setKeywords] = useState<string>('');
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [keywordsError, setKeywordsError] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'purpose':
        setPurpose(value);
        setPurposeError(!countChars(event));
        break;
      case 'audience':
        setAudience(value);
        setAudienceError(!countChars(event));
        break;
      case 'mood':
        setMood(value);
        setMoodError(!countOneWord(event));
        break;
      case 'keywords':
        setKeywords(value);
        break;
      default:
        break;
    }
  };

  const handleAddCustomKeyword = () => {
    if (
      keyword &&
      !selectedKeywords.includes(keyword) &&
      selectedKeywords.length < 5
    ) {
      setSelectedKeywords([...selectedKeywords, keyword]);
      setKeywords('');
    } else if (selectedKeywords.length >= 5) {
      setKeywordsError(true);
    } else {
      setKeywordsError(false);
    }
  };

  const handleDeleteKeyword = (keyword: string) => {
    setSelectedKeywords(selectedKeywords.filter((word) => word !== keyword));
    setKeywordsError(false);
  };

  const { updatePrompt } = useColorGenerator();

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const promptValues = {
      initialColor: initialColor,
      usage: purpose,
      audience: audience,
      keywords: selectedKeywords,
      mood: mood,
    };

    const allErrors = {
      purpose: purposeError,
      mood: moodError,
      audience: audienceError,
      keywords: keywordsError,
    };

    if (
      Object.values(allErrors).includes(true) ||
      hasEmptyValues(promptValues)
    ) {
      return;
    }

    const GUIDED = createGuidedColorPrompt(promptValues);
    updatePrompt(GUIDED);
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-[640px]">
        <CardHeader className="hidden md:block">
          <CardTitle className="text-3xl">
            Or get help here if you don’t know where to start...
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={submitForm}>
            <div className="grid md:grid-cols-2 gap-x-4 gap-y-2">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="purpose">I need my color scheme for...</Label>
                <Input
                  id="purpose"
                  name="purpose"
                  placeholder="Website, poster... "
                  autoComplete="off"
                  value={purpose}
                  onChange={handleChange}
                />
                <span className="text-red-700 p-0 text-sm min-h-5">
                  {purposeError && 'Too many characters (Max: 255)'}
                </span>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="audience">My audience is...</Label>
                <Input
                  id="audience"
                  name="audience"
                  placeholder="Describe audience"
                  autoComplete="off"
                  value={audience}
                  onChange={handleChange}
                />
                <span className="text-red-700 p-0 text-sm min-h-5">
                  {audienceError && 'Too many characters (Max: 255)'}
                </span>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="mood">Choose a mood for colors...</Label>
                <Input
                  id="mood"
                  name="mood"
                  placeholder="Happy, sad, love..."
                  autoComplete="off"
                  value={mood}
                  onChange={handleChange}
                />
                <span className="text-red-700 p-0 text-sm min-h-5">
                  {moodError && 'Please use only one word, no spaces.'}
                </span>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="keywords">
                  Please also use these keywords...
                </Label>
                <div className="flex gap-1">
                  <Input
                    id="keywords"
                    name="keywords"
                    placeholder="Add custom keywords..."
                    autoComplete="off"
                    value={keyword}
                    onChange={handleChange}
                  />

                  <Button type="button" onClick={handleAddCustomKeyword}>
                    Add
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 mt-2 text-sm">
                  {selectedKeywords.map((keyword, index) => (
                    <div key={index} className="bg-gray-200 px-1 rounded">
                      <span key={index} className="bg-gray-200 px-2 rounded">
                        {keyword}
                      </span>
                      <Button
                        type="button"
                        className="p-0 size-6 bg-transparent shadow-none text-black hover:bg-transparent hover:underline font-semibold px-1"
                        onClick={() => handleDeleteKeyword(keyword)}
                      >
                        X
                      </Button>
                    </div>
                  ))}
                </div>
                <span className="text-red-700 p-0 text-sm min-h-5">
                  {keywordsError &&
                    'Maximum number of keywords exceeded. Only 5 keywords are allowed.'}
                </span>
              </div>
            </div>

            <div className="pt-4 flex justify-center md:justify-end items-center">
              <Button type="submit" className="md:px-24 px-16 py-6">
                See my colour palette
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
