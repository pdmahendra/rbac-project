const profile = async (req, res) => {
    // res.send("User Profile")
    // console.log(req.user)
    const person = req.user
    res.render('profile', { person })
}

export { profile }