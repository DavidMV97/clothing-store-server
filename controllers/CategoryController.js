export const getCategories = (req, res) => {
    const categories = ['Casual', 'Formal', 'Sporty', 'Urban', 'Elegant', 'Vintage'];
    res.json(categories);
};