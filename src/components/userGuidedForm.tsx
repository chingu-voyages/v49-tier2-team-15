import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';

const errorMessage = 'Please use only one word, no spaces.';
const predefinedKeywords = [
  'Bright',
  'Dark',
  'Highlighted',
  'Realistic',
  'Fresh',
];

export default function UserGuidedForm() {
  const [purpose, setPurpose] = useState<string>('');
  const [purposeError, setPurposeError] = useState<boolean>(false);

  const [mood, setMood] = useState<string>('');
  const [moodError, setMoodError] = useState<boolean>(false);

  const [audience, setAudience] = useState<string>('');
  const [audienceError, setAudienceError] = useState<boolean>(false);

  const [keywords, setKeywords] = useState<string>('');
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [keywordsError, setKeywordsError] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    switch (id) {
      case 'purpose':
        setPurpose(value);
        setPurposeError(!countOneWord(event));
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
        setKeywordsError(!countFiveWords(event));
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

  const countChars = (event: React.ChangeEvent<HTMLInputElement>) => {
    return event.target.value.length <= 255;
  };

  const handleSelectChange = (value: string) => {
    if (!selectedKeywords.includes(value) && selectedKeywords.length < 5) {
      setSelectedKeywords([...selectedKeywords, value]);
    }
  };

  const handleAddCustomKeyword = () => {
    if (
      keywords &&
      !selectedKeywords.includes(keywords) &&
      selectedKeywords.length < 5
    ) {
      setSelectedKeywords([...selectedKeywords, keywords]);
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

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const allErrors = {
      purpose: purposeError,
      mood: moodError,
      audience: audienceError,
      keywords: keywordsError,
    };

    if (Object.values(allErrors).includes(true)) {
      return;
    }

    //! Handle the submit, because all errors are false
    // Should send to the API:
    // While Don't have errors and the fields are not empty
    // 1: the purpose
    // 2: the mood
    // 3: the audience
    // 4: the keywords
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
                <span className="text-red-700 p-0 text-sm min-h-5">
                  {audienceError && 'Too many characters (Max: 255)'}
                </span>
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
                <div className="flex gap-1">
                  <Input
                    id="keywords"
                    placeholder="Add custom keywords..."
                    autoComplete="off"
                    value={keywords}
                    onChange={handleChange}
                  />
                  <Select onValueChange={handleSelectChange}>
                    <SelectTrigger className="w-12" />
                    <SelectContent>
                      {predefinedKeywords.map((keyword, index) => (
                        <SelectItem key={index} value={keyword}>
                          {keyword}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button type="button" onClick={handleAddCustomKeyword}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2 text-sm">
                  {selectedKeywords.map((keyword, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-gray-200 px-2 py-1 rounded"
                    >
                      <span key={index} className="bg-gray-200 px-2 rounded">
                        {keyword}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteKeyword(keyword)}
                        className="px-2"
                      >
                        X
                      </button>
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
