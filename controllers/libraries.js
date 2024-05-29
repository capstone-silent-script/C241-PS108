const { Storage } = require('@google-cloud/storage');
const { Firestore } = require('@google-cloud/firestore');

// Get All Data
const getSignLibraries = async (req, res) => {
    try {
        const db = new Firestore();
        const isyaratCollection = db.collection('isyarat');

        const snapshot = await isyaratCollection.get();
        const isyarat = [];

        snapshot.forEach(doc => {
            const isyaratData = doc.data();
            isyarat.push({
                id: doc.id,
                url: isyaratData.url,
                penjelasan: isyaratData.penjelasan
            });
        });

        res.status(200).json(isyarat);
    } catch (error) {
        res.status(500).send(error);
    }
}

// Get Data By Id
const getSignById = async (req, res) => {
    const signId = req.params.id;
    try {
        const db = new Firestore();
        const doc = await db.collection('isyarat').doc(signId).get();

        if (doc.exists) {
            const signData = doc.data();
            return res.status(200).json(signData);
        } else {
            return res.status(404).json({ message: 'Isyarat Tidak Ditemukan' });
        }

    } catch (error) {
        res.status(500).send(error);
    };
};

module.exports = { getSignLibraries, getSignById };