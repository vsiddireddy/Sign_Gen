const OpenAIApi = require('openai');
const fs = require('fs').promises;

var key = '';
// Read the contents of the file 'myfile.txt'
fs.readFile('./gpt.txt', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    // The data variable now contains the contents of the file
    console.log(data.toString());
    key = data.toString();
  }
});
console.log(key)

var openai = new OpenAIApi({
    apiKey: key,
    dangerouslyAllowBrowser: true
});

console.log(openai)

class gpt {

    async load() {
        const readKey = await fs.readFile('./gpt.txt', "binary");
        return Buffer.from(readKey.toString())
    }

    async gptApi() {
        var key = await this.load();
        openai.apiKey = key;
        console.log(openai)
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