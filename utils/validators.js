const validateText = (req, res, next) => {
    const { text } = req.body;
    
    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }
    
    if (typeof text !== 'string') {
        return res.status(400).json({ error: 'Text must be a string' });
    }
    
    if (text.length > 50000) {
        return res.status(400).json({ error: 'Text too long (max 50000 characters)' });
    }
    
    next();
};

const validateOptions = (req, res, next) => {
    const { style, tone, intensity, length } = req.body;
    
    const validStyles = ['standard', 'creative', 'professional', 'academic', 'simple'];
    const validTones = ['neutral', 'formal', 'casual', 'friendly', 'professional'];
    const validIntensities = ['light', 'moderate', 'aggressive'];
    const validLengths = ['short', 'medium', 'detailed'];
    
    if (style && !validStyles.includes(style)) {
        return res.status(400).json({ error: 'Invalid style option' });
    }
    
    if (tone && !validTones.includes(tone)) {
        return res.status(400).json({ error: 'Invalid tone option' });
    }
    
    if (intensity && !validIntensities.includes(intensity)) {
        return res.status(400).json({ error: 'Invalid intensity option' });
    }
    
    if (length && !validLengths.includes(length)) {
        return res.status(400).json({ error: 'Invalid length option' });
    }
    
    next();
};

module.exports = {
    validateText,
    validateOptions
};
