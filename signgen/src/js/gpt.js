const OpenAIApi = require('openai');

const openai = new OpenAIApi({
    apiKey: "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",
    dangerouslyAllowBrowser: true
});

class gpt {

    async gptApi() {
        var val = document.getElementById('aiPrompt').value.trim();
        const chatCompletion = await openai.chat.completions.create({
          messages: [{ role: 'user', content: 'Generate a sign based on the following prompt, it should be in the format of word1, word2 and subtitle:' + val}],
          model: 'gpt-3.5-turbo',
        });
        var output = chatCompletion.choices[0].message.content.split("\n");
        console.log(output);
        return output;
    }
}