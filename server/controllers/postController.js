module.exports = {
    async createPost(req, res) {
        const db = req.app.get('db')
        const { title, price, condition, processor, graphicsCard, primaryStorage, secondaryStorage, url} = req.body
        const {user_id} = req.session.user
        const specId = await db.add_spec(processor, graphicsCard, primaryStorage, secondaryStorage, 0)
        
        db.add_post(price, title, specId[0].spec_id, user_id, condition, url).then(() => {
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
    },
    async deletePost(req, res) {
        const db = req.app.get('db')
        const {postId, author_id} = req.query
        console.log(req.session.user)
        const {user_id} = req.session.user
        // Only allow the post to be deleted if user id matches
        // the original author id.
        console.log(user_id, author_id)
        if (parseInt(author_id) === user_id) {
            const spec_id = await db.delete_post(postId)
            await db.delete_spec(spec_id[0].spec_id)
            console.log('deleted!')
            res.sendStatus(200)
        } else {
            res.sendStatus(401)
        }
    },
    async updatePost(req, res) {
        const db = req.app.get('db')
        const {post_id, title, price, condition, url, processor, gpu, storage_prime, storage_2nd} = req.body
        try {
            const spec_id = await db.update_post(price, title, condition, url, post_id)
            await db.update_spec(processor, gpu, storage_prime, storage_2nd, 0, spec_id[0].spec_id)
            res.status(200).send({message: 'Post Updated!'})
        }
        catch(error) {
            console.log(error)
            res.status(500).send({errorMessage: 'Post Update Failed. :('})
        }
    },
    async getMyPosts(req, res) {
        const db = req.app.get('db')
        const {user_id} = req.session.user
        const posts = await db.my_posts(user_id)

        if (posts) {
            res.status(200).send(posts)
        } else {
            res.sendStatus(204)
        }
    }
}