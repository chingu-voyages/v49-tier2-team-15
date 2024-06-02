import { useContext, useReducer, useState } from 'react';
import { FiX as DeleteIcon } from 'react-icons/fi';

import { formReducer } from './formReducer';
import handleChange from './handleChange';
import { handleAddCustomKeyword, handleDeleteKeyword } from './handleKeywords';
import submitForm from './submitForm';
import type { InitialFormValues } from './types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ColorContext } from '@/context/ColorContext';

const initialFormValues: InitialFormValues = {
  usage: '',
  audience: '',
  mood: '',
  keywords: '',
  keywordsError: '',
};

export default function GuidedForm() {
  const [state, dispatch] = useReducer(formReducer, initialFormValues);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const { accentColor, updatePrompt } = useContext(ColorContext);

  return (
    <>
      <Card
        className="w-full max-w-lg p-6 mx-auto bg-transparent border-2 rounded-md shadow-none lg:max-w-full"
        style={{ borderColor: accentColor }}
      >
        <CardContent className="p-0">
          <form
            className="grid gap-4 lg:grid-cols-2"
            onSubmit={(e) =>
              submitForm(e, state, selectedKeywords, updatePrompt)
            }
          >
            <Label className="space-y-2">
              <span style={{ color: accentColor }}>
                I need my color scheme for...
              </span>
              <Input
                className="font-normal placeholder:text-gray-400 bg-zinc-50"
                name="usage"
                placeholder="Website, poster... "
                autoComplete="off"
                value={state.usage}
                onChange={(e) => handleChange(e, dispatch)}
                required
              />
            </Label>

            <Label className="space-y-2">
              <span style={{ color: accentColor }}>My audience is...</span>
              <Input
                className="font-normal placeholder:text-gray-400 bg-zinc-50"
                name="audience"
                placeholder="Describe audience"
                autoComplete="off"
                value={state.audience}
                onChange={(e) => handleChange(e, dispatch)}
                required
              />
            </Label>

            <Label className="space-y-2">
              <span style={{ color: accentColor }}>
                Pick <b className="underline underline-offset-1">one</b> mood
                for colors...
              </span>
              <Input
                className="font-normal placeholder:text-gray-400 bg-zinc-50"
                name="mood"
                placeholder="Happy, sad, love..."
                autoComplete="off"
                value={state.mood}
                onChange={(e) => handleChange(e, dispatch)}
                required
              />
            </Label>

            <div className="space-y-2">
              <Label className="space-y-2">
                <span style={{ color: accentColor }}>
                  Please also use these keywords...
                </span>
                <div className="flex gap-2">
                  <Input
                    className="font-normal placeholder:text-gray-400 bg-zinc-50"
                    name="keywords"
                    placeholder="Add custom keywords..."
                    autoComplete="off"
                    value={state.keywords}
                    onChange={(e) => handleChange(e, dispatch)}
                  />

                  <Button
                    type="button"
                    style={{ color: accentColor, borderColor: accentColor }}
                    onClick={() =>
                      handleAddCustomKeyword(
                        state,
                        selectedKeywords,
                        setSelectedKeywords,
                        dispatch,
                      )
                    }
                  >
                    Add
                  </Button>
                </div>
              </Label>

              <div className="flex flex-wrap gap-2 text-sm">
                {selectedKeywords.map((keyword, index) => (
                  <div
                    key={keyword + index}
                    className="border rounded-sm px-2.5 bg-secondary py-1.5"
                  >
                    <Button
                      type="button"
                      className="flex items-center h-auto p-0 border-none gap-1.5"
                      onClick={() =>
                        handleDeleteKeyword(
                          keyword,
                          selectedKeywords,
                          setSelectedKeywords,
                          dispatch,
                        )
                      }
                    >
                      <span className="rounded">{keyword}</span>
                      <DeleteIcon />
                    </Button>
                  </div>
                ))}

                <span className="text-sm text-red-700">
                  {state.keywordsError}
                </span>
              </div>
            </div>

            <Button
              className="lg:col-start-2"
              style={{ color: accentColor, borderColor: accentColor }}
              type="submit"
            >
              See my colour palette!
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
