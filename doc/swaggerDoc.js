/**
 * @swagger
 * /register:
 *   post:
 *     description: Sign up/Register a new user
 *     parameters:
 *       - name: email
 *         in: req body
 *         required: true
 *         type: string
 *       - name: phone
 *         in: req body
 *         required: true
 *         type: string
 *       - name: NRC
 *         in: req body
 *         required: true
 *         type: string
 *       - name: password
 *         in: req body
 *         required: true
 *         type: string
 *     responses:
 *       400:
 *         description: String - error message
 *       200:
 *         description: returns success status
 */

/**
 * @swagger
 * /login:
 *   post:
 *     description: User login route
 *     parameters:
 *       - name: email
 *         in: req body
 *         required: true
 *         type: string
 *       - name: password
 *         in: req body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: return {access_token, refresh_token} - token
 *       400:
 *         description: String - error
 *       500:
 *         description: String - error
 */

/**
 * @swagger
 * /refresh:
 *   post:
 *     description: Get new access token
 *     parameters:
 *       - name: token
 *         description: Refresh token
 *         in: req body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: return String - new access token
 *       400:
 *         description: String - error
 *       500:
 *         description: String - error
 */

/**
 * @swagger
 * /logout:
 *   post:
 *     description: Logs out user and destroys refresh token
 *     parameters:
 *       - name: token
 *         description: Access token
 *         in: req header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: return String - successful
 *       400:
 *         description: String - error
 *       500:
 *         description: String - error
 */

/**
 * Route #7
 * @swagger
 * /sendotp:
 *   post:
 *     description: Reset Password OTP sent to mail
 *     parameters:
 *       - name: email
 *         description: Email of the user
 *         in: req body
 *         required: true
 *         type: String
 *     responses:
 *       400:
 *         description: returns String - user not found error message
 *       500:
 *         description: returns {msg:String} - error message
 *       200:
 *         description: returns {status:'sent', email:String} - email where otp was sent
 */

/**
 * Route #8
 * @swagger
 * /verifyotp:
 *   post:
 *     description: Reset Password OTP verification
 *     parameters:
 *       - name: email
 *         description: Email of the user
 *         in: req body
 *         required: true
 *         type: String
 *       - name: otp
 *         description: otp sent by user to verify
 *         in: req body
 *         required: true
 *         type: Number
 *     responses:
 *       400:
 *         description: returns String - otp missmatch or user not found
 *       500:
 *         description: returns {msg:String} - error message
 *       200:
 *         description: returns {status:'success', user:Object} - owner of the account
 */

/**
 * Route #9
 * @swagger
 * /resetpassword:
 *   post:
 *     description: Reset Password with verified OTP
 *     parameters:
 *       - name: email
 *         description: Email of the user
 *         in: req body
 *         required: true
 *         type: String
 *       - name: otp
 *         description: otp sent by user to verify
 *         in: req body
 *         required: true
 *         type: Number
 *       - name: passoword
 *         description: New password
 *         in: req body
 *         required: true
 *         type: String
 *     responses:
 *       400:
 *         description: returns String - Error
 *       500:
 *         description: returns {msg:String} - error message
 *       200:
 *         description: returns {status:'success', email:String} - owner of the account
 */

/**
 * Route #9
 * @swagger
 * /changepassword:
 *   post:
 *     description: Change Password
 *     parameters:
 *       - name: oldpassword
 *         description: Old Password
 *         in: req body
 *         required: true
 *         type: String
 *       - name: password
 *         description: New Password
 *         in: req body
 *         required: true
 *         type: Number
 *       - name: token
 *         description: New Password
 *         in: req header
 *         required: true
 *         type: Number
 *       - name: password
 *         description: New password
 *         in: req body
 *         required: true
 *         type: String
 *     responses:
 *       400:
 *         description: returns String - Error
 *       500:
 *         description: returns {msg:String} - error message
 *       200:
 *         description: returns {status:'success', email:String} - owner of the account
 */
