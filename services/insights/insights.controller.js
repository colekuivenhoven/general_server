//const Insight = require('./insights.model');
const openai = require('openai');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config()

/**
 * * Get an openai insight based on a give prompt and data
 * @param {*} req 
 * @param {*} res
 * @returns {Object}
 */
exports.getInsight = async (req, res) => {
    console.log('/insights/getInsight');
    const api_key = process.env.OPEN_AI_KEY;
    console.log(' > api key', api_key);
    const file_name = req.body.data_category+"-"+Date.now()+".json";

    // Write JSON to file
    const JSONToFile = (obj, filename) => {
        try {
            return fs.writeFileSync(filename, JSON.stringify(obj, null, 2));
        }
        catch (error) {
            return res.json({ message: 'File Error', data: error });
        }
    }

    try {
        let return_data = {};

        // If the prompt, data, and data_category are not provided, return an error
        console.log(' > Checking for prompt, data, and data_category')
        if (!req?.body?.prompt || !req?.body?.data || !req?.body?.data_category) {
            return res.json({ message: 'Error', data: 'Prompt, data, and data_category are required' });
        }

        console.log(' > Creating body')
        const body = {
            prompt: req?.body?.prompt,
            file: JSONToFile(req.body.data, file_name),
            data_type: "JSON",
            data_category: req?.body?.data_category || "",
        };

        // Create openai instance and create request
        console.log(' > Creating openai instance')
        let openai_instance;
        try {
            openai_instance = new openai(api_key);
        }
        catch (error) {
            return res.json({ message: 'OpenAI Create Error', data: error });
        }

        // Upload a file with an "assistants" purpose
        console.log(' > Uploading file')
        let file;
        try {
            file = await openai_instance.files.create({
                file: fs.createReadStream(file_name),
                purpose: "assistants",
            });
        }
        catch (error) {
            return res.json({ message: 'File Error', data: error });
        }
        
        console.log(' > Creating instructions')
        const instructions_array = [
            `You are a data analyst working for a B2B company.`,
            `You have been given a ${body.data_category} dataset in ${body.data_type} format to analyze.`,
            `You need to very briefly provide insights based on the data by understanding data distributions, patterns, and anomalies.`,
            `Be able to identify relationships and correlations among variables.`,
            `Never address specific data points using id numbers or indices, but rather using names if available.`,
            `Never ask for more data than what is provided in the dataset.`,
            `Never ask any questions.`,
            `Do not include any introductory or concluding statements.`,
            `Remember to NEVER ask for more data than what is provided in the dataset or ask any questions. Just try your best to provide insights based on the data provided.`
        ];
        const instructions = instructions_array.join(' ');
        
        // Create an assistant with the file
        console.log(' > Creating assistant')
        let assistant;
        try {
            assistant = await openai_instance.beta.assistants.create({
                instructions: instructions,
                model: "gpt-4o",
                tools: [{"type": "code_interpreter"}],
                tool_resources: {
                    "code_interpreter": {
                        "file_ids": [file.id]
                    }
                }
            });
        }
        catch (error) {
            return res.json({ message: 'Assistant Error', data: error });
        }

        // Create a thread
        console.log(' > Creating thread')
        let thread;
        try {
            thread = await openai_instance.beta.threads.create({
                messages: [
                    {
                        role: "user",
                        content: body.prompt,
                        attachments: [
                            {
                                file_id: file.id,
                                tools: [{type: "code_interpreter"}],
                            },
                        ],
                    },
                ],
            });
        }
        catch (error) {
            return res.json({ message: 'Thread Error', data: error });
        }

        // Create a run
        console.log(' > Creating run')
        let run;
        try {
            run = await openai_instance.beta.threads.runs.create(
                thread.id,
                {assistant_id: assistant.id}
            );
        }
        catch (error) {
            return res.json({ message: 'Run Error', data: error });
        }

        // Get the messages from the thread
        console.log(' > Getting messages 1')
        while (run.status !== 'completed') {
            run = await openai_instance.beta.threads.runs.retrieve(thread.id, run.id);
            //console.log('\nrun', run.status);
        }

        // Get the messages from the thread
        console.log(' > Getting messages 2')
        let messages;
        try {
            messages = await openai_instance.beta.threads.messages.list(thread.id);
            for (const message of messages.data.reverse()) {
                return_data.result = `${message.content[0].text.value}`
            }
        }
        catch (error) {
            return res.json({ message: 'Messages Error', data: error });
        }

        // Delete the file
        console.log(' > Deleting file')
        fs.unlinkSync(file_name);

        return res.json({ message: 'completed', data: return_data });
    } catch (error) {
        res.json({ message: 'Error', data: error });

        // Delete the file
        fs.unlinkSync(file_name);
    }
};