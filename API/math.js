export default function handler(req, res) {
    const { q } = req.query;

    if (!q) {
        return res.status(400).json({ error: "No expression provided" });
    }

    let expr = q
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/\^/g, "**")
        .replace(/√(\d+)/g, "Math.sqrt($1)")
        .replace(/(\d+)%/g, "($1/100)");

    try {
        const result = eval(expr);
        res.status(200).json({ answer: result });
    } catch {
        res.status(400).json({ error: "Invalid math expression" });
    }
}