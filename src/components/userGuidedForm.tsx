import React, { useState } from 'react';

import { useColorGenerator } from '../hooks';

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
import { createGuidedColorPrompt } from '@/helpers/generators';

interface userGuidedFormProps {
  initialColor?: `#${string}`;
}
type AnyObject = { [key: string]: unknown };

// Check if the value is empty
const isEmptyValue = (value: unknown) => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string' && value.trim() === '') return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (typeof value === 'object' && Object.keys(value).length === 0) return true;
  return false;
};
// Return true if one or more values are empty
const hasEmptyValues = (obj: AnyObject): boolean => {
  return Object.values(obj).some(isEmptyValue);
};

const predefinedKeywords = [
  'Bright',
  'Dark',
  'Fresh',
  'Highlighted',
  'Realistic',
];

export default function UserGuidedForm({
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
    const { id, value } = event.target;

    switch (id) {
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

  const countOneWord = (event: React.ChangeEvent<HTMLInputElement>) => {
    return event.target.value.split(' ').length === 1;
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
                  placeholder="Website, poster... (max: 255 characters)"
                  maxLength={255}
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
                    placeholder="Add custom keywords..."
                    autoComplete="off"
                    value={keyword}
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
