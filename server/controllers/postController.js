module.exports = {
    async createPost(req, res) {
        const db = req.app.get('db')
        const { title, price, condition, processor, graphicsCard, primaryStorage, secondaryStorage} = req.body
        const {user_id} = req.session.user
        const specId = await db.add_spec(processor, graphicsCard, primaryStorage, secondaryStorage, 0)
        
        db.add_post(price, title, specId[0].spec_id, user_id, condition).then(() => {
            res.status(200).send({message: 'Post Sucess!'})
        }).catch((err) => {
            console.log(err)
            res.status(500).send({message: 'Post Failure!'})
        })


    },
    async getPosts(req, res) {
        const db = req.app.get('db')
        const {offset} = req.query
        const posts = await db.get_ten(offset)
        if (posts) {
            res.status(200).send(posts)
        } else {
            res.sendStatus(204)
        }
    },
    async singlePost(req, res) {
        const db = req.app.get('db')
        const {id} = req.query
        const post = await db.single_post(id)
        console.log(post)
        if (post) {
            res.status(200).send(post)
        } else {
            res.sendStatus(204)
        }
    }
}