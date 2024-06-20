const formidable = require('formidable');
const { db, admin, bucket } = require('../helper/firebaseConfig');

const registerUser = async (req, res) => {
    const { email, password, password_confirmation, username } = req.body;

    try {
        // Add function to validate require confimation password
        if (password !== password_confirmation) {
            return res.status(400).send({ message: 'Password and Confirm Password must be the same' });
        }

        // Create user
        const userRecord = await admin.auth().createUser({
            email: email,
            password: password,
            username: username
        });

        const token = await admin.auth().createCustomToken(userRecord.uid);

        // Store additional user data in Firestore
        const userData = {
            email: email,
            username: username,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            uid: userRecord.uid,
            points: 0
        };

        await db.collection('users').doc(userRecord.uid).set(userData);

        res.status(201).send({
            message: 'User created and data stored in Firestore successfully',
            userId: userRecord.uid,
            customToken: token
        });
    } catch (error) {
        res.status(400).send({ message: 'Error creating user or storing data', error: error.message });
    }
};

const getProfile = async (req, res) => {
    const profileId = req.params.id;
    try {
        const doc = await db.collection('users').doc(profileId).get();
        if (!doc.exists) {
            return res.status(404).send({
                message: 'Profile not found'
            });
        }

        const userData = doc.data();
        const points = userData.points;

        let badge;
        if (points <= 600) {
            badge = "Pemula";
        } else if (points <= 1800) {
            badge = "Menengah";
        } else if (points <= 2100) {
            badge = "Pintar";
        } else {
            badge = "Ahli";
        }

        res.status(200).send({
            message: "Get profile success",
            data: userData,
            badge: badge
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const updateProfile = async (req, res) => {
    const profileId = req.user.uid;
    const profileData = req.body;
    const form = formidable.formidable({ multiples: false })

    try {

        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(500).send({ message: 'Error updating profile', error: error.message });
            }

            if (files['photo']) {
                // path to image 
                const filePath = files['photo'][0].filepath;

                //set a preferred path on firebase storage
                const remoteFilePath = `users/${req.user.uid}-${files['photo'][0].originalFilename}`;

                await bucket.upload(filePath, { destination: remoteFilePath });


                let currentDate = new Date();
                let expireAt = currentDate.setFullYear(currentDate.getFullYear() + 1); // 1 year

                const options = {
                    action: 'read',
                    expires: expireAt
                }

                // The right hand side returns an array of signedUrl
                let signedUrl = await bucket.file(remoteFilePath).getSignedUrl(options);

                profileData.photo = signedUrl[0]; // save the signed Url to image_url
            }

            switch (true) {
                case !fields.username:
                    return res.status(401).send({ message: 'Username is required' })
                case !fields.email:
                    return res.status(401).send({ message: 'Email is required' })
                default:
                    profileData.username = fields.username[0]
                    profileData.email = fields.email[0]
                    break;
            }

            await admin.auth().updateUser(profileId, {
                email: fields.email[0]
            });

            await db.collection('users').doc(profileId).set(profileData, { merge: true });

            res.status(200).send({ message: 'Profile updated successfully', data: profileData });
        });
    } catch (error) {
        res.status(500).send({ message: 'Error delete profile', error: error.message });
    }
};

const deleteProfile = async (req, res) => {
    const profileId = req.params.id;
    try {
        await db.collection('users').doc(profileId).delete();
        res.status(200).send({ message: 'Profile deleted successfully', userId: profileId });
    } catch (error) {
        res.status(500).send({ message: 'Error delete profile', error: error.message });
    }
};

module.exports = { registerUser, getProfile, updateProfile, deleteProfile };