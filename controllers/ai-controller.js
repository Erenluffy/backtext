const axios = require('axios');

class AIController {
    constructor() {
        this.apiKey = process.env.DEEPSEEK_API_KEY;
        this.apiUrl = process.env.DEEPSEEK_API_URL;
        this.model = 'deepseek-chat';
    }

    async callDeepSeekAPI(prompt, temperature = 0.7, maxTokens = 2000) {
        try {
            const response = await axios.post(
                this.apiUrl,
                {
                    model: this.model,
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a helpful AI writing assistant. Provide accurate, helpful responses.'
                        },
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    temperature: temperature,
                    max_tokens: maxTokens,
                    top_p: 0.9,
                    frequency_penalty: 0.3,
                    presence_penalty: 0.3
                },
                {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            return {
                success: true,
                text: response.data.choices[0].message.content,
                usage: response.data.usage
            };
        } catch (error) {
            console.error('DeepSeek API Error:', error.response?.data || error.message);
            throw new Error(error.response?.data?.error?.message || 'Failed to process request');
        }
    }

    async humanizeText({ text, tone = 'natural' }) {
        const prompt = `Humanize the following text to make it sound more natural and human-like, as if written by a native speaker. Maintain the original meaning but improve flow and authenticity:

Original text: "${text}"

Tone: ${tone}

Requirements:
- Make it sound natural and conversational
- Remove any robotic or AI-sounding patterns
- Keep the original meaning intact
- Use varied sentence structures
- Add natural transitions

Humanized version:`;

        return await this.callDeepSeekAPI(prompt, 0.8, 1500);
    }

    async paraphraseText({ text, style = 'standard', intensity = 'moderate' }) {
        const prompt = `Paraphrase the following text with ${intensity} intensity in a ${style} style:

Original: "${text}"

Requirements:
- Maintain the original meaning
- Use different vocabulary and sentence structures
- Keep the key information intact
- Ensure clarity and readability

Paraphrased version:`;

        return await this.callDeepSeekAPI(prompt, 0.8, 1500);
    }

    async checkGrammar({ text }) {
        const prompt = `Check the following text for grammar, spelling, and punctuation errors. Provide corrections and explanations:

Text: "${text}"

Return the response in this JSON format:
{
    "hasErrors": boolean,
    "errors": [
        {
            "type": "grammar|spelling|punctuation",
            "original": "incorrect text",
            "suggestion": "corrected text",
            "explanation": "why it's wrong",
            "position": {"start": number, "end": number}
        }
    ],
    "correctedText": "full corrected text",
    "summary": "brief summary of errors found"
}`;

        return await this.callDeepSeekAPI(prompt, 0.3, 2000);
    }

    async summarizeText({ text, length = 'medium', format = 'paragraph' }) {
        const prompt = `Summarize the following text in a ${length} length (${format} format):

Text: "${text}"

Requirements:
- Capture the main ideas and key points
- Maintain accuracy and coherence
- Remove unnecessary details
- Keep the original tone

Summary:`;

        return await this.callDeepSeekAPI(prompt, 0.5, 1000);
    }

    async rewriteText({ text, style = 'professional', tone = 'neutral' }) {
        const prompt = `Rewrite the following text in a ${style} style with a ${tone} tone:

Original: "${text}"

Requirements:
- Adapt the writing style to be more ${style}
- Adjust the tone to be more ${tone}
- Keep all key information
- Improve clarity and flow

Rewritten version:`;

        return await this.callDeepSeekAPI(prompt, 0.7, 1500);
    }

    async changeTone({ text, targetTone = 'professional', intensity = 'moderate' }) {
        const prompt = `Change the tone of the following text to be more ${targetTone} with ${intensity} intensity:

Original: "${text}"

Current tone analysis: (analyze current tone)
Target tone: ${targetTone}

Requirements:
- Adjust vocabulary, sentence structure, and formality
- Maintain the original message
- Make the tone consistently ${targetTone}
- Ensure natural flow

Text with new tone:`;

        return await this.callDeepSeekAPI(prompt, 0.7, 1500);
    }

    async detectAI({ text }) {
        const prompt = `Analyze the following text and determine if it was written by AI or a human. Provide detailed analysis:

Text: "${text}"

Return response in this JSON format:
{
    "isAI": boolean (probability > 70%),
    "confidence": number (0-100),
    "score": number (0-100, higher means more likely AI),
    "analysis": {
        "patterns": ["list of AI-like patterns found"],
        "humanTraits": ["list of human-like traits found"],
        "explanation": "detailed explanation of the analysis"
    },
    "suggestions": ["suggestions to make it more human-like if AI detected"]
}`;

        return await this.callDeepSeekAPI(prompt, 0.3, 1500);
    }

    async expandText({ text, targetLength = 'detailed', context = 'general' }) {
        const prompt = `Expand the following text into a more ${targetLength} version for ${context} context:

Original: "${text}"

Requirements:
- Add relevant details and examples
- Maintain the core message
- Improve depth and clarity
- Keep the original tone
- Add supporting points

Expanded version:`;

        return await this.callDeepSeekAPI(prompt, 0.8, 2000);
    }

    async generateTitle({ text, style = 'click-worthy', count = 5 }) {
        const prompt = `Generate ${count} ${style} titles for the following content:

Content: "${text}"

Requirements:
- Make titles engaging and relevant
- Vary the style and approach
- Include keywords naturally
- Optimize for reader interest
- Keep titles concise (under 70 characters)

Return as JSON array with titles and brief explanation for each.`;

        return await this.callDeepSeekAPI(prompt, 0.8, 1000);
    }

    async generateMetaDescription({ text, length = 160 }) {
        const prompt = `Create an SEO-optimized meta description (max ${length} characters) for:

Content: "${text}"

Requirements:
- Include primary keywords
- Be compelling and click-worthy
- Summarize the content accurately
- Stay within character limit
- Include a call-to-action if appropriate

Meta description:`;

        return await this.callDeepSeekAPI(prompt, 0.7, 500);
    }

    async generatePrompt({ text, context = 'general' }) {
        const prompt = `Generate an effective AI prompt based on:

Topic/Request: "${text}"
Context: ${context}

Requirements:
- Be specific and clear
- Include necessary constraints
- Define the desired output format
- Provide examples if helpful
- Include role-playing context if relevant

Generated prompt:`;

        return await this.callDeepSeekAPI(prompt, 0.8, 1000);
    }

    async generateIdeas({ text, count = 5, category = 'content' }) {
        const prompt = `Generate ${count} creative ${category} ideas based on:

Topic/Theme: "${text}"

Requirements:
- Be innovative and practical
- Vary the angles and approaches
- Include brief descriptions
- Consider target audience
- Suggest implementation tips

Return as JSON array with ideas and brief descriptions.`;

        return await this.callDeepSeekAPI(prompt, 0.9, 1500);
    }

    async generateEmailSubject({ text, purpose = 'marketing', style = 'professional' }) {
        const prompt = `Create ${purpose} email subject lines in ${style} style for:

Email content: "${text}"

Requirements:
- Be attention-grabbing
- Keep under 60 characters
- Include key message
- Avoid spam triggers
- Match the email's purpose

Generate 5 options with brief context for each.`;

        return await this.callDeepSeekAPI(prompt, 0.8, 800);
    }

    async generateOutline({ text, depth = 'detailed' }) {
        const prompt = `Create a ${depth} blog post outline for:

Topic: "${text}"

Requirements:
- Include H1, H2, H3 headings
- Cover main points and subtopics
- Include introduction and conclusion sections
- Suggest key points for each section
- Consider SEO and reader engagement

Return as structured outline with bullet points.`;

        return await this.callDeepSeekAPI(prompt, 0.7, 1500);
    }
}

module.exports = new AIController();
