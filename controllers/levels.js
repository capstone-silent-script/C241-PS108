const tf = require('@tensorflow/tfjs-node');
const crypto = require('crypto');
const { db } = require('../helper/firebaseConfig');

const levels = Array.from({ length: 26 }, (_, i) => ({
    levelId: i + 1,
    level: String.fromCharCode(65 + i)
}));

const getLevels = async (req, res) => {
    try {
        const hurufCollection = db.collection('letters');
        const snapshot = await hurufCollection.get();

        if (snapshot.empty) {
            res.status(200).json(levels);
            return;
        }

        const huruf = [];
        snapshot.forEach(doc => {
            const hurufData = doc.data();
            huruf.push({
                id: parseInt(doc.id, 10),
                image: hurufData.image,
                penjelasan: hurufData.penjelasan
            });
        });

        huruf.sort((a, b) => a.id - b.id);

        const mergedData = levels.map(level => {
            const correspondingHuruf = huruf.find(h => h.id === level.levelId);
            return {
                ...level,
                image: correspondingHuruf ? correspondingHuruf.image : null
            };
        });

        res.status(200).json(mergedData);
    } catch (error) {
        res.status(500).send(error);
    }
};


const updateUserPoints = async (uid, points) => {
    const userRef = db.collection('users').doc(uid);

    await db.runTransaction(async (transaction) => {
        const userDoc = await transaction.get(userRef);
        if (!userDoc.exists) {
            throw new Error('User does not exist!');
        }
        const newPoints = (userDoc.data().points || 0) + points;
        transaction.update(userRef, { points: newPoints });
    });
};

const getClassification = async (model, image) => {
    try {
        const tensor = tf.node
            .decodeJpeg(image.buffer)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat();

        const classes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        const prediction = model.predict(tensor);

        const classResult = tf.argMax(prediction, 1).dataSync()[0];
        const label = classes[classResult];

        return { label };
    } catch (error) {
        throw new Error(`Terjadi kesalahan input: ${error.message}`);
    }
};

const postPredictions = async (req, res) => {
    try {
        const { file } = req;
        const { model } = req.app.locals;
        const { uid } = req.user;
        const { id: levelId } = req.params;

        if (!file) {
            return res.status(400).json({ status: 'error', message: 'Data gambar diperlukan' });
        }

        if (!uid) { 
            return res.status(400).json({ status: 'error', message: 'User ID (uid) diperlukan' });
        }

        const { label } = await getClassification(model, file);

        const expectedLabels = {
            '1': 'A',
            '2': 'B',
            '3': 'C',
            '4': 'D',
            '5': 'E',
            '6': 'F',
            '7': 'G',
            '8': 'H',
            '9': 'I',
            '10': 'J',
            '11': 'K',
            '12': 'L',
            '13': 'M',
            '14': 'N',
            '15': 'O',
            '16': 'P',
            '17': 'Q',
            '18': 'R',
            '19': 'S',
            '20': 'T',
            '21': 'U',
            '22': 'V',
            '23': 'W',
            '24': 'X',
            '25': 'Y',
            '26': 'Z'
        };

        if (!expectedLabels.hasOwnProperty(levelId)) {
            return res.status(400).json({ status: 'error', message: 'Level ID tidak valid' });
        }

        const PredictId = crypto.randomUUID();
        const createdAt = new Date().toISOString();

        if (label !== expectedLabels[levelId]) {
            const data = {
                id: PredictId,
                status: 'Gagal',
                result: label,
                points: 0,
                uid,
                level: levelId,
                createdAt
            };

            await storeData(PredictId, data);
            return res.status(200).json({
                message: 'Maaf bentuknya masih belum sama',
                data
            });
        }

        const data = {
            id: PredictId,
            status: 'Sukses',
            result: label,
            points: 100,
            uid,
            level: levelId,
            createdAt
        };

        await updateUserPoints(uid, 100);
        await storeData(PredictId, data);
        res.status(201).json({
            message: 'Selamat kamu mendapatkan +100',
            data
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};


const storeData = async (PredictId, data) => {
    const predictCollection = db.collection('predictions');
    return predictCollection.doc(PredictId).set(data);
};

module.exports = { getLevels, postPredictions };