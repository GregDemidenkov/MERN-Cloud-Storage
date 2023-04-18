const Router = require("express")

const { check } = require("express-validator")

const authMiddleware = require("../middleware/auth.middleware")
const userController = require("../controllers/userController")

const router = new Router()

router.post('/registration',
    [
        check("email", "Uncorrect email").isEmail(),
        check("password", "Uncorrect passsword").isLength({min: 3, max: 24})
    ],
    userController.registration
)
router.post('/login', userController.login)

router.get('/auth', authMiddleware, userController.checkAuth)

module.exports = router