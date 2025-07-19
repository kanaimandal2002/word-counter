function analyzeText() {
    const text = document.getElementById('inputText').value;
    const resultsDiv = document.getElementById('results');
    
    // Basic counts
    const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const charCount = text.length;
    const charCountNoSpaces = text.replace(/\s+/g, '').length;
    const sentenceCount = text.split(/[.!?]+/).filter(Boolean).length;
    const paragraphCount = text.trim() === '' ? 0 : text.replace(/\n\s*\n/g, '\n').split('\n').filter(p => p.trim().length > 0).length;
    
    // Keyword density analysis
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const wordFreq = {};
    words.forEach(word => {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
    });
    
    // Sort by frequency
    const sortedWords = Object.keys(wordFreq).sort((a, b) => wordFreq[b] - wordFreq[a]);
    
    // Prepare keyword density results (top 20)
    let keywordHTML = '';
    if (sortedWords.length > 0) {
        keywordHTML = '<h3>Keyword Density (Top 20)</h3><table><tr><th>Word</th><th>Count</th><th>Percentage</th></tr>';
        
        const topWords = sortedWords.slice(0, 20);
        topWords.forEach(word => {
            const percentage = ((wordFreq[word] / words.length) * 100).toFixed(2);
            keywordHTML += `<tr><td>${word}</td><td>${wordFreq[word]}</td><td>${percentage}%</td></tr>`;
        });
        
        keywordHTML += '</table>';
    }
    
    // Display results
    resultsDiv.innerHTML = `
        <h2>Text Analysis Results</h2>
        <div class="basic-stats">
            <p><strong>Word Count:</strong> ${wordCount}</p>
            <p><strong>Character Count (with spaces):</strong> ${charCount}</p>
            <p><strong>Character Count (without spaces):</strong> ${charCountNoSpaces}</p>
            <p><strong>Sentence Count:</strong> ${sentenceCount}</p>
            <p><strong>Paragraph Count:</strong> ${paragraphCount}</p>
        </div>
        ${keywordHTML}
    `;
}
