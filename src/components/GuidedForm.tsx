import { useReducer, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useColorGenerator } from '@/hooks';
import { formReducer } from '@/utils/GuidedFormFunctions/formReducer';
import handleChange from '@/utils/GuidedFormFunctions/handleChange';
import {
  handleAddCustomKeyword,
  handleDeleteKeyword,
} from '@/utils/GuidedFormFunctions/handleKeywords';
import submitForm from '@/utils/GuidedFormFunctions/submitForm';

export default function GuidedForm() {
  const initialFormValues = {
    usage: '',
    audience: '',
    mood: '',
    keywords: '',
    keywordsError: '',
  };
  const [state, dispatch] = useReducer(formReducer, initialFormValues);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const { updatePrompt } = useColorGenerator();

  return (
    <div className="flex justify-center items-center">
      <Card className="w-[640px] border-none bg-transparent">
        <CardHeader className="px-0 py-3 md:py-6 text-neonGreen">
          <CardTitle>
            <span className="hidden md:block text-4xl font-normal">
              Or get help here if you don&apos;t know where to start...
            </span>
            <span className="md:hidden text-xl flex justify-center">
              Guided Exprerience
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <form
            onSubmit={(e) =>
              submitForm(e, state, selectedKeywords, updatePrompt)
            }
          >
            <div className="grid md:grid-cols-2 gap-x-4 gap-y-2 border-4 border-neonGreen rounded-md  p-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="usage">
                  <span className="bold">*</span> I need my color scheme for...
                </Label>
                <Input
                  id="usage"
                  name="usage"
                  placeholder="Website, poster... "
                  autoComplete="off"
                  value={state.usage}
                  onChange={(e) => handleChange(e, dispatch)}
                  className="bg-white"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="audience">
                  <span className="bold">*</span> My audience is...
                </Label>
                <Input
                  id="audience"
                  name="audience"
                  placeholder="Describe audience"
                  autoComplete="off"
                  value={state.audience}
                  onChange={(e) => handleChange(e, dispatch)}
                  className="bg-white"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="mood">
                  <span className="bold">*</span> Choose{' '}
                  <b className=" underline underline-offset-1">one</b> mood for
                  colors...
                </Label>
                <Input
                  id="mood"
                  name="mood"
                  placeholder="Happy, sad, love..."
                  autoComplete="off"
                  value={state.mood}
                  onChange={(e) => handleChange(e, dispatch)}
                  className="bg-white"
                  required
                />
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
                    value={state.keywords}
                    onChange={(e) => handleChange(e, dispatch)}
                    className="bg-white"
                  />

                  <Button
                    type="button"
                    onClick={() =>
                      handleAddCustomKeyword(
                        state,
                        selectedKeywords,
                        setSelectedKeywords,
                        dispatch,
                      )
                    }
                    className="bg-transparent border-4 text-neonGreen border-neonGreen  hover:bg-neonGreen hover:text-white transition-colors duration-500"
                  >
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
                        onClick={() =>
                          handleDeleteKeyword(
                            keyword,
                            selectedKeywords,
                            setSelectedKeywords,
                            dispatch,
                          )
                        }
                      >
                        X
                      </Button>
                    </div>
                  ))}
                </div>
                <span className="text-red-700 p-0 text-sm min-h-5">
                  {state.keywordsError}
                </span>
              </div>
            </div>

            <div className="pt-4 flex justify-center md:justify-end items-center">
              <Button
                type="submit"
                className="md:px-8 px-12 py-6 bg-transparent border-4 text-neonGreen border-neonGreen text-lg hover:bg-neonGreen hover:text-white transition-colors duration-500"
              >
                See my colour palette
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
