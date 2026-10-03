const chunkText = (
    text,
    chunkSize = 1000,
    overlap = 200
) => {

    if (!text || !text.trim()) {
        return [];
    }

    const words = text
        .trim()
        .split(/\s+/);

    const chunks = [];

    let start = 0;

    while (start < words.length) {

        const end =
            Math.min(
                start + chunkSize,
                words.length
            );

        const chunk =
            words
                .slice(start, end)
                .join(" ");

        chunks.push({
            text: chunk,
            startIndex: start,
            endIndex: end
        });

        if (end >= words.length) {
            break;
        }

        start =
            end - overlap;
    }

    return chunks;
};


module.exports = {
    chunkText
};