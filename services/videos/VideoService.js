const News = require("../../mongooseSchema/News");
const Video = require("../../mongooseSchema/Video");
const Scene = require("../../mongooseSchema/Scene");
const Character = require("../../mongooseSchema/Character");
const Dialogue = require("../../mongooseSchema/Dialogue");
const Asset = require("../../mongooseSchema/Asset");
const SceneCharacter = require("../../mongooseSchema/SceneCharacter");
const SceneAsset = require("../../mongooseSchema/SceneAsset");
const { TokenTextSplitter } = require("langchain/text_splitter");
const { Document } = require("langchain/document");
const { traceable } = require("langsmith/traceable");
const { ChatOpenAI } = require("@langchain/openai");
const { loadSummarizationChain } = require("langchain/chains");
const { PromptTemplate } = require("@langchain/core/prompts");
const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const { Pinecone } = require("@pinecone-database/pinecone");

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});
const axios = require("axios");

class VideoService {
  async getSummary(newsId) {
    // await Video.deleteMany()
    await Character.deleteMany();
    await SceneCharacter.deleteMany();
    await Asset.deleteMany();
    await SceneAsset.deleteMany();
    await Dialogue.deleteMany();
    await Scene.deleteMany();
    // return
    try {
      //   const news = await News.findById(newsId).populate("language");
      //   const relevantNews = await this.gettingRelevantContexts(
      //     "sachai-prod",
      //     news.fullContent,
      //     news.language.name
      //   );
      //   let finalContent = "";
      //   const newsIds = [];
      //   for (const article of relevantNews) {
      //     if (article.score >= 0.9) {
      //       newsIds.push(article.id);
      //       finalContent += article.metadata.fullContent + "\n";
      //     }
      //   }
      //   const docs = [new Document({ pageContent: finalContent })];
      //   const splitter = new TokenTextSplitter({
      //     chunkSize: 10000,
      //     chunkOverlap: 250,
      //   });
      //   const docsSummary = await splitter.splitDocuments(docs);
      //   let summary_logs;
      //   const llmSummary = new ChatOpenAI({
      //     modelName: "gpt-4-turbo",
      //     temperature: 0,
      //     callbacks: [
      //       {
      //         async handleLLMEnd(output) {
      //           summary_logs = output;
      //         },
      //       },
      //     ],
      //   });
      //   const summaryTemplate = `
      //     You are an expert in summarizing News Articles.
      //     Your goal is to create a summary of these articles. Ensure that the summary covers all significant individuals, figures, occurrences, and relevant statistics mentioned across the articles
      //     Below you find the content of a article:
      //     --------
      //     {text}
      //     --------

      //     Total output will be a summary of the article.

      //     SUMMARY:
      //     `;
      //   const SUMMARY_PROMPT = PromptTemplate.fromTemplate(summaryTemplate);
      //   const summaryRefineTemplate = `
      //     You are an expert in summarizing News Articles.
      //     Your goal is to create a summary of these articles. Ensure that the summary covers all significant individuals, figures, occurrences, and relevant statistics mentioned across the articles
      //     We have provided an existing summary up to a certain point: {existing_answer}

      //     Below you find the content of a article:
      //     --------
      //     {text}
      //     --------

      //     Given the new context, refine the summary.
      //     If the context isn't useful, return the original summary.
      //     Total output will be a summary of the article.

      //     SUMMARY
      //     `;
      //   let summary = "";
      //   const SUMMARY_REFINE_PROMPT = PromptTemplate.fromTemplate(
      //     summaryRefineTemplate
      //   );

      //   const llm_summariser = traceable(async function callOpenAi(
      //     llm,
      //     summary_prompt,
      //     summary_refine_prompt
      //   ) {
      //     const summarizeChain = loadSummarizationChain(llm, {
      //       type: "refine",
      //       verbose: true,
      //       questionPrompt: summary_prompt,
      //       refinePrompt: summary_refine_prompt,
      //     });
      //     summary = await summarizeChain.run(docsSummary);
      //   });
      //   await llm_summariser(llmSummary, SUMMARY_PROMPT, SUMMARY_REFINE_PROMPT);
      //   const scriptInfo = await this.createScript(summary);
      //   const scriptContent = JSON.parse(scriptInfo.choices[0].message.content);
      //   // const characterNamesWithDescription = scriptContent.characterInfo.map((character) => {
      //   //     return character.characterName
      //   // })

      const dummyScript = [
        {
          setting:
            "A dimly lit courtroom, with sunrays peeping through the tall windows, casting long shadows on the wooden benches.",
          description:
            "This scene opens the story, setting the stage for the legal battle.",
          characters: [
            {
              characterName: "Judge",
              presence: "speaking",
            },
            {
              characterName: "Arvind Kejriwal",
              presence: "speaking",
            },
            {
              characterName: "Prosecutor",
              presence: "speaking",
            },
          ],
          dialogues: [
            {
              characterName: "Judge",
              dialogue:
                "Mr. Kejriwal, you stand accused of money laundering in connection with the Delhi excise policy. How do you plead?",
            },
            {
              characterName: "Arvind Kejriwal",
              dialogue:
                "Your Honor, these charges are purely politically motivated to tarnish my image before the elections.",
            },
            {
              characterName: "Prosecutor",
              dialogue:
                "Your Honor, the evidence against Mr. Kejriwal, including multiple summonses ignored by him, justifies his continued custody.",
            },
          ],
          assets: [
            {
              assetName: "Courtroom",
              type: "background description",
              description:
                "An imposing courtroom setup indicative of serious judicial proceedings.",
              usage: "Sets the scene for the legal battle.",
            },
          ],
        },
        {
          setting:
            "Outside the courtroom, crowded with journalists and cameras flashing. It's a chaotic afternoon.",
          description:
            "The media frenzy captures the political clash surrounding the case.",
          characters: [
            {
              characterName: "Journalist",
              presence: "speaking",
            },
            {
              characterName: "BJP Leader",
              presence: "speaking",
            },
            {
              characterName: "AAP Supporter",
              presence: "speaking",
            },
          ],
          dialogues: [
            {
              characterName: "Journalist",
              dialogue:
                "Sir, how do you respond to AAP's allegations that this is a political witch-hunt?",
            },
            {
              characterName: "BJP Leader",
              dialogue:
                "It's not politics—it's about justice. Corruption cannot be overlooked just because elections are near.",
            },
            {
              characterName: "AAP Supporter",
              dialogue:
                "This is nothing but an attempt to derail our leader and our campaign!",
            },
          ],
          assets: [
            {
              assetName: "Press media",
              type: "prop",
              description:
                "A crowd of reporters and media personnel, with cameras and microphones.",
              usage: "Visualize the public and media interest in the case.",
            },
          ],
        },
        {
          setting:
            "A dark office room, the wall clock showing late night. Papers are scattered, and a desk lamp offers the only light.",
          description:
            "ED officials are preparing documents and evidence for the case.",
          characters: [
            {
              characterName: "ED Official",
              presence: "speaking",
            },
            {
              characterName: "Assistant",
              presence: "speaking",
            },
          ],
          dialogues: [
            {
              characterName: "ED Official",
              dialogue:
                "Make sure every piece of evidence is accounted for. We can't afford any slip-ups.",
            },
            {
              characterName: "Assistant",
              dialogue:
                "Yes sir, all summonses and court notices are prepared for Mr. Kejriwal's hearing schedule.",
            },
          ],
          assets: [
            {
              assetName: "Office clutter",
              type: "prop",
              description:
                "A realistic office environment showing the stress and urgency of the situation.",
              usage: "Helps convey the intense preparation by the ED.",
            },
          ],
        },
        {
          setting:
            "A serene park, early morning, joggers and early birds around. Arvind Kejriwal is seen discussing with his legal advisor.",
          description:
            "Kejriwal seeks legal advice in a calm environment, away from the chaos.",
          characters: [
            {
              characterName: "Arvind Kejriwal",
              presence: "speaking",
            },
            {
              characterName: "Legal Advisor",
              presence: "speaking",
            },
          ],
          dialogues: [
            {
              characterName: "Arvind Kejriwal",
              dialogue:
                "They've granted me interim bail for the election, but I'm barred from official duties. How should we frame our next move?",
            },
            {
              characterName: "Legal Advisor",
              dialogue:
                "We need to focus on clearing your name while ensuring the campaign's integrity. Let’s strategize effectively.",
            },
          ],
          assets: [
            {
              assetName: "Park morning",
              type: "background description",
              description:
                "A peaceful park setting to contrast the intense courtroom and office scenes.",
              usage:
                "Visualize the personal strain and public life intersection.",
            },
          ],
        },
        {
          setting:
            "The interior of a dim and moody bar, evening. A group of conspirators is whispering over drinks.",
          description:
            "Conspiratorial whispers among those involved in the scandal.",
          characters: [
            {
              characterName: "Corrupt Official",
              presence: "speaking",
            },
            {
              characterName: "Liquor Trader",
              presence: "speaking",
            },
          ],
          dialogues: [
            {
              characterName: "Corrupt Official",
              dialogue:
                "We must ensure our tracks are covered. The new policy must look clean.",
            },
            {
              characterName: "Liquor Trader",
              dialogue:
                "Absolutely, let's keep the transactions untraceable. We can’t get caught in this political storm.",
            },
          ],
          assets: [
            {
              assetName: "Moody bar",
              type: "background description",
              description:
                "A secretive, unsettling bar environment that adds to the mood of conspiracy.",
              usage:
                "Enhances the secretive, underhanded dealings of the involved parties.",
            },
          ],
        },
      ];
      const characterDescriptions = await this.getCharacterDescription(
        dummyScript
      );
      //   const videoObj = {
      //     summary: summary,
      //     news: newsIds,
      //     script: scriptContent.script,
      //     script_logs: scriptInfo,
      //     summary_logs: summary_logs,
      //     characterDescriptionLogs: characterDescriptions,
      //     title: scriptContent.title,
      //   };
      //   // if (characterDescriptions.gpt != "") {
      //   //     videoObj.characterDescriptionLogs = characterDescriptions.gpt
      //   // }
      //   const newSummary = new Video(videoObj);
      //   const finalScript = await newSummary.save();
      const finalCharacterDescriptions = JSON.parse(
        characterDescriptions.choices[0].message.content
      ).characterInfo;
      // const finalCharacterDescriptions =
      //     characterDescriptions.charactersArray
      let existingCharacters = await Character.find();
      existingCharacters = existingCharacters.map((character) => {
        return character.name;
      });
      for (let i = 0; i < finalCharacterDescriptions.length; i++) {
        const character = finalCharacterDescriptions[i];
        if (!existingCharacters.includes(character.characterName)) {
          const newCharacter = new Character({
            name: character.characterName,
            role: character.role,
            description: character.description,
            scriptId: "666016889f3ae9aafc5e7352",
          });
          await newCharacter.save();
          await this.createImagePrompts(newCharacter, "character");
        }
      }
      for (let i = 0; i < dummyScript.length; i++) {
        const scene = dummyScript[i];
        let finalScene = new Scene({
          scriptId: "666016889f3ae9aafc5e7352",
          setting: scene.setting,
          description: scene.description,
          sceneNumber: i + 1
        });
				const sceneObj = {
					characterNames: [],
					characterDescriptions: [],
					characterRoles: [],
					assetNames: [],
					assetDescriptions: []
				}
        await finalScene.save();
				Object.assign(finalScene, sceneObj);
        for (const character of scene.characters) {
          const characterInDB = await Character.findOne({
            name: character.characterName,
          });
          if (characterInDB) {
            const sceneCharacter = new SceneCharacter({
              sceneId: finalScene._id,
              characterId: characterInDB._id,
              presence: character.presence,
            });
            await sceneCharacter.save();
            finalScene.characterNames.push(character.characterName);
            finalScene.characterDescriptions.push(characterInDB.description);
            finalScene.characterRoles.push(characterInDB.role);
          } else {
            console.log("No Character found in DB - Characters");
          }
        }
        for (const dialogue of scene.dialogues) {
          const characterInDB = await Character.findOne({
            name: dialogue.characterName,
          });
          if (characterInDB) {
            const dialogueObj = new Dialogue({
              sceneId: finalScene._id,
              characterId: characterInDB._id,
              text: dialogue.dialogue,
            });
            await dialogueObj.save();
          } else {
            console.log("No Character found in DB - Dialogue");
          }
        }
        for (const asset of scene.assets) {
          let existingAssets = await Asset.find();
          existingAssets = existingAssets.map((asset) => {
            return asset.name;
          });
          let newAsset;
          if (!existingAssets.includes(asset.assetName)) {
            newAsset = new Asset({
              name: asset.assetName,
              type: asset.type,
              description: asset.description,
              scriptId: "666016889f3ae9aafc5e7352",
            });
            await newAsset.save();
          } else {
            newAsset = await Asset.findOne({
              name: asset.assetName,
            });
          }
          finalScene.assetDescriptions.push(asset.description);
          finalScene.assetNames.push(asset.assetName);
          const sceneAsset = new SceneAsset({
            sceneId: finalScene._id,
            assetId: newAsset._id,
            usage: asset.usage,
          });
          await sceneAsset.save();
          await this.createImagePrompts(newAsset, "asset");
        }
        await this.createSceneImages(finalScene);
      }
      return {
        script: dummyScript,
        characters: finalCharacterDescriptions,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getCharacterDescription(script) {
    // All descriptions from here TOMORROW
    const characterNames = [
      ...new Set(
        script.flatMap((obj) =>
          obj.characters.map((character) => character.characterName)
        )
      ),
    ];
    // const characterDescriptionsNames = characterDescriptions.map((character) => {
    //     return character.characterName
    // })
    // console.log(characterNames)
    // console.log(characterDescriptionsNames)
    // if(characterDescriptionsNames.length < characterNames.length) {

    // }
    // const finalCharacterNames = characterNames.filter(
    //     (value) => !characterDescriptionsNames.includes(value)
    // )
    // console.log(finalCharacterNames)
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant that specializes in creating a detailed description for the given characters involved in the script. Provide a clear name for the character and mention the relation (if any) with other characters. For example, if there is a character named "John" and another character who plays the role of "John's" mother and if her name is not provided in the script, name her "John's Mother" and not just "Mother". For the character description, make sure to provide a detailed cartoonish/animated description, like hair color, hair style, face structure, face color, clothes, any iconic things that the character wears or does, etc.`,
        },
        {
          role: "user",
          content: `This is the script:
                        Script: ${script}
                        Characters: ${characterNames}
                        The final response should be in this JSON format:
                        {
                            "characterInfo": [
                                {
                                    "characterName": name of character,
                                    "description": detailed description of the character like personality traits, appearance like hair, face, clothes, etc.,
                                    "role": role of character in the script (antagonist, protagonist, supporting character, background character, etc.)
                                }
                            ]
                        }`,
        },
      ],
      model: "gpt-4-turbo",
      response_format: {
        type: "json_object",
      },
    });
    // const finalCharacterArray = JSON.parse(
    //     completion.choices[0].message.content
    // ).characterInfo
    // characterDescriptions.push(...finalCharacterArray)
    // return {
    //     gpt: completion,
    //     charactersArray: characterDescriptions
    // }
    return completion;
    // return {
    //     gpt: '',
    //     charactersArray: characterDescriptions
    // }
  }

  async createScript(summary) {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant that specializes in creating a short video script from the summary of news articles provided. Make sure the script contains atleast 10 scenes and each scene contains atleast 2-3 dialogues. Make the script a bit funny and entertaining but make sure to list all the facts and that they remain unchanged. Also, make sure to incorporate all the statistics and numbers in the final script. Make every scene as decriptive as possible. Create dialogues stating the important facts and statistics of the summary for all the main characters involved in the summary and assume all the characters are animated versions of their real life personalities. For every scene in the script, give a description of the scene's settings like location, time of day, etc and also give a brief description of what happens in that scene, the dialogues created, the presence of all the characters involved in the scene (whether the character is speaking or in the background doing something) and the assets (prop, sound effect, background descriptions like a park or a court room or dinner table, etc) involved in every scene. Provide a title for the summary provided.`,
        },
        {
          role: "user",
          content: `This is the summary of multiple news articles combined into one summary:
                    Summary: ${summary}
                    The final response should be in this JSON format:
                    {
                        "script": [
                            {
                                "setting": detailed description of scene setting like time of day, location, lighting, camera angle, etc.,
                                "description": brief description of what happens in the scene,
                                "characters": [
                                    {
                                        "characterName": name of the character,
                                        "presence": the character's presence in the scene (speaking or in background)
                                    },
                                    more such objects follow.......
                                ]
                                "dialogues": [
                                    {
                                        "characterName": name of character,
                                        "dialogue": dialogue of the character
                                    },
                                    atleast 2 more such objects follow......
                                ],
                                "assets": [
                                    {
                                        "assetName": name of asset (background description, prop, sound effect),
                                        "type": background description, prop or sound effect
                                        "description": brief description of what the asset is
                                        "usage": how the asset is used in the scene
                                    },
                                    more such objects follow.......
                                ]
                            },
                            atleast 9 more such objects follow.......
                        ],
                        "title": title for the script
                    }`,
        },
      ],
      model: "gpt-4-turbo",
      response_format: {
        type: "json_object",
      },
    });
    return completion;
  }

  async gettingRelevantContexts(index_name, newsFullContent, language) {
    try {
      console.log("Getting Relevant Contexts", index_name);
      const index = pinecone.index(index_name);
      let response = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: newsFullContent,
      });
      const xq = response.data[0].embedding;
      // console.log(xq)
      response = await index.namespace(language).query({
        vector: xq,
        topK: 500,
        includeMetadata: true,
        // includeValues: true
      });
      return response.matches;
    } catch (error) {
      console.log(error);
    }
  }

  async createImagePrompts(obj, type) {
    let finalPrompt;
    if (type == "character") {
      finalPrompt = `Animated character concept on a white background, ${obj.name}, ${obj.description}, multiple poses and expressions, pixar styled animation`;
    } else if (type == "asset") {
      finalPrompt = `Animated asset concept, ${obj.description}, the Simpsons styled animation`;
    } else if (type == "scenes") {
      finalPrompt = `Animated scene concept.
      Scene Description: ${obj.description},
      Scene Setting: ${obj.setting}. Following are the character names and descriptions.`;
      for (let i = 0; i < obj.characterNames.length; i++) {
        const characterName = obj.characterNames[i];
        const characterDescription = obj.characterDescriptions[i];
        const characterRole = obj.characterRoles[i];
        finalPrompt += `\nCharacter Name: ${characterName}, 
        Character (${characterName}) Description: ${characterDescription},
        Character (${characterName}) Role: ${characterRole}`;
      }
      finalPrompt += `Following are the assets used and their descriptions.`;
      for (let i = 0; i < obj.assetNames.length; i++) {
        const assetName = obj.assetNames[i];
        const assetDescription = obj.assetDescriptions[i];
        finalPrompt += `\nAsset Name: ${assetName},
        Asset (${assetName}) Description: ${assetDescription}`;
      }
			finalPrompt = await this.formatScenePrompt(finalPrompt);
			// finalPrompt += `\nCombine all the characters and assets mentioned above into the final scene image`
    }
    await this.getMidjourneyImages(finalPrompt, obj);
  }

	async formatScenePrompt (prompt) {
		const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that analyses the given prompt and returns a nice midjourney prompt for generating the image. Include all the assets and characters in the final prompt.",
        },
        {
          role: "user",
          content: `This is the prompt
            Prompt: ${prompt}
            Return only the final midjoruney prompt, nothing else extra`,
        },
        {
          role: "assistant",
          content: "Answer: ",
        },
      ],
      model: "gpt-4o",
    });
    return response.choices[0].message.content;
	}

  async createObjInDB(obj) {
    const characterInDB = await Character.findOne({
      midJourneyId: obj.payload.id,
    });
    let finalObj = characterInDB;
    if (!finalObj) {
      const assetInDB = await Asset.findOne({
        midJourneyId: obj.payload.id,
      });
      finalObj = assetInDB;
      if (!finalObj) {
        const sceneInDB = await Scene.findOne({
          midJourneyId: obj.payload.id,
        });
        finalObj = sceneInDB;
      }
    }
    finalObj.mainUrl = obj.payload.url;
    finalObj.urls = obj.payload.upscaled_urls;
    finalObj.logs = obj;
    await finalObj.save();
  }

  async getMidjourneyImages(prompt, objInfo) {
    try {
      const response = await axios.post(
        "https://cl.imagineapi.dev/items/images",
        JSON.stringify({
          prompt: prompt,
        }),
        {
          headers: {
            Authorization: `Bearer ${process.env.IMAGINE_API_TOKEN}`, // <<<< TODO: remember to change this
            "Content-Type": "application/json",
          },
        }
      );
      const promptResponseData = await response.data;
      console.log(promptResponseData);
      objInfo.midJourneyId = promptResponseData.data.id;
      await objInfo.save();
    } catch (error) {
      console.log(error);
    }
  }

  async createSceneImages(sceneObj) {
    console.log(sceneObj);
    await this.createImagePrompts(sceneObj, "scenes");
  }
}

module.exports = new VideoService();
