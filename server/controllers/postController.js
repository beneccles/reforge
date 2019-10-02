module.exports = {
    async createPost(req, res) {
        const db = req.app.get('db')
        const { title, price, condition, processor, graphicsCard, primaryStorage, secondaryStorage} = req.body
        const {userId} = req.session.user
        

    }
}