const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai-controller');
const { validateText, validateOptions } = require('../utils/validators');

// AI Text Humanizer
router.post('/humanize', validateText, async (req, res) => {
    try {
        const result = await aiController.humanizeText(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// AI Paraphraser
router.post('/paraphrase', validateText, validateOptions, async (req, res) => {
    try {
        const result = await aiController.paraphraseText(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Grammar Checker
router.post('/grammar-check', validateText, async (req, res) => {
    try {
        const result = await aiController.checkGrammar(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Text Summarizer
router.post('/summarize', validateText, validateOptions, async (req, res) => {
    try {
        const result = await aiController.summarizeText(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Sentence Rewriter
router.post('/rewrite', validateText, validateOptions, async (req, res) => {
    try {
        const result = await aiController.rewriteText(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Tone Changer
router.post('/change-tone', validateText, validateOptions, async (req, res) => {
    try {
        const result = await aiController.changeTone(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// AI Detector
router.post('/detect-ai', validateText, async (req, res) => {
    try {
        const result = await aiController.detectAI(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Text Expander
router.post('/expand', validateText, validateOptions, async (req, res) => {
    try {
        const result = await aiController.expandText(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Title Generator
router.post('/generate-title', validateText, async (req, res) => {
    try {
        const result = await aiController.generateTitle(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Meta Description Generator
router.post('/generate-meta', validateText, async (req, res) => {
    try {
        const result = await aiController.generateMetaDescription(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Prompt Generator
router.post('/generate-prompt', validateText, async (req, res) => {
    try {
        const result = await aiController.generatePrompt(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Idea Generator
router.post('/generate-ideas', validateText, async (req, res) => {
    try {
        const result = await aiController.generateIdeas(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Email Subject Generator
router.post('/generate-subject', validateText, async (req, res) => {
    try {
        const result = await aiController.generateEmailSubject(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Blog Outline Generator
router.post('/generate-outline', validateText, async (req, res) => {
    try {
        const result = await aiController.generateOutline(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
