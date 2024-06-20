const { db } = require('../helper/firebaseConfig');

const getAllCategories = async (req, res) => {
    try {
        const categoriesCollection = db.collection('categories');

        const snapshot = await categoriesCollection.get();
        const kategori = [];

        snapshot.forEach(doc => {
            const kategoriData = doc.data();
            kategori.push({
                id: doc.id,
                kategori: kategoriData.kategori,
                keterangan: kategoriData.keterangan
            });
        });

        res.status(200).json(kategori);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).send(error);
    }
}

const getAllHuruf = async (req, res) => {
    try {
        const hurufCollection = db.collection('letters');

        const snapshot = await hurufCollection.get();
        const huruf = [];

        snapshot.forEach(doc => {
            const hurufData = doc.data();
            huruf.push({
                id: doc.id,
                image: hurufData.image,
                penjelasan: hurufData.penjelasan
            });
        });

        // Mengurutkan array huruf berdasarkan penjelasan secara ascending
        huruf.sort((a, b) => {
            if (a.penjelasan < b.penjelasan) return -1;
            if (a.penjelasan > b.penjelasan) return 1;
            return 0;
        });

        res.status(200).json(huruf);
    } catch (error) {
        res.status(500).send(error);
    }
}


const getHurufById = async (req, res) => {
    const hurufId = req.params.id;
    try {
        const doc = await db.collection('letters').doc(hurufId).get();

        if (doc.exists) {
            const hurufData = doc.data();
            return res.status(200).json(hurufData);
        } else {
            return res.status(404).json({ message: 'Isyarat Tidak Ditemukan' });
        }

    } catch (error) {
        res.status(500).send(error);
    };
};

const getAllSalam = async (req, res) => {
    try {
        const salamCollection = db.collection('salam');

        const snapshot = await salamCollection.get();
        const salam = [];

        snapshot.forEach(doc => {
            const salamData = doc.data();
            salam.push({
                id: doc.id,
                video: salamData.video,
                penjelasan: salamData.penjelasan
            });
        });

        res.status(200).json(salam);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getSalamById = async (req, res) => {
    const salamId = req.params.id;
    try {
        const doc = await db.collection('salam').doc(salamId).get();

        if (doc.exists) {
            const salamData = doc.data();
            return res.status(200).json(salamData);
        } else {
            return res.status(404).json({ message: 'Isyarat Tidak Ditemukan' });
        }

    } catch (error) {
        res.status(500).send(error);
    };
};

const getAllHubungan = async (req, res) => {
    try {
        const hubunganCollection = db.collection('hubungan');

        const snapshot = await hubunganCollection.get();
        const hubungan = [];

        snapshot.forEach(doc => {
            const hubunganData = doc.data();
            hubungan.push({
                id: doc.id,
                video: hubunganData.video,
                penjelasan: hubunganData.penjelasan
            });
        });

        res.status(200).json(hubungan);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getHubunganById = async (req, res) => {
    const hubunganId = req.params.id;
    try {
        const doc = await db.collection('hubungan').doc(hubunganId).get();

        if (doc.exists) {
            const hubunganData = doc.data();
            return res.status(200).json(hubunganData);
        } else {
            return res.status(404).json({ message: 'Isyarat Tidak Ditemukan' });
        }

    } catch (error) {
        res.status(500).send(error);
    };
};

const getAllMakanan = async (req, res) => {
    try {
        const makananCollection = db.collection('makanan');

        const snapshot = await makananCollection.get();
        const makanan = [];

        snapshot.forEach(doc => {
            const makananData = doc.data();
            makanan.push({
                id: doc.id,
                video: makananData.video,
                penjelasan: makananData.penjelasan
            });
        });

        res.status(200).json(makanan);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getMakananById = async (req, res) => {
    const makananId = req.params.id;
    try {
        const doc = await db.collection('makanan').doc(makananId).get();

        if (doc.exists) {
            const makananData = doc.data();
            return res.status(200).json(makananData);
        } else {
            return res.status(404).json({ message: 'Isyarat Tidak Ditemukan' });
        }

    } catch (error) {
        res.status(500).send(error);
    };
};

const getAllKesehatan = async (req, res) => {
    try {
        const kesehatanCollection = db.collection('kesehatan');

        const snapshot = await kesehatanCollection.get();
        const kesehatan = [];

        snapshot.forEach(doc => {
            const kesehatanData = doc.data();
            kesehatan.push({
                id: doc.id,
                video: kesehatanData.video,
                penjelasan: kesehatanData.penjelasan
            });
        });

        res.status(200).json(kesehatan);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getKesehatanById = async (req, res) => {
    const kesehatanId = req.params.id;
    try {
        const doc = await db.collection('kesehatan').doc(kesehatanId).get();

        if (doc.exists) {
            const kesehatanData = doc.data();
            return res.status(200).json(kesehatanData);
        } else {
            return res.status(404).json({ message: 'Isyarat Tidak Ditemukan' });
        }

    } catch (error) {
        res.status(500).send(error);
    };
};

const getAllFrasa = async (req, res) => {
    try {
        const frasaCollection = db.collection('frasa');

        const snapshot = await frasaCollection.get();
        const frasa = [];

        snapshot.forEach(doc => {
            const frasaData = doc.data();
            frasa.push({
                id: doc.id,
                video: frasaData.video,
                penjelasan: frasaData.penjelasan
            });
        });

        res.status(200).json(frasa);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getFrasaById = async (req, res) => {
    const frasaId = req.params.id;
    try {
        const doc = await db.collection('frasa').doc(frasaId).get();

        if (doc.exists) {
            const frasaData = doc.data();
            return res.status(200).json(frasaData);
        } else {
            return res.status(404).json({ message: 'Isyarat Tidak Ditemukan' });
        }

    } catch (error) {
        res.status(500).send(error);
    };
};

module.exports = { 
    getAllCategories, 
    getAllHuruf, 
    getHurufById,
    getAllSalam,
    getSalamById,
    getAllHubungan,
    getHubunganById,
    getAllMakanan,
    getMakananById,
    getAllKesehatan,
    getKesehatanById,
    getAllFrasa,
    getFrasaById };