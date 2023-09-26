const express = require('express');
const router = express.Router();

const connection = require('../config/db.js');
const { body, validationResult } = require('express-validator');

router.get('/', function (req, res){
    connection.query('select * from ktp order by nik desc', function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server failed',
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'data mahasiswa',
                data: rows
            })
        }
    })
});

router.post('/tambahdata',[
    body('nik').notEmpty(),
    body('nama_lengkap').notEmpty(),
    body('jenis_kelamin').notEmpty(),
    body('tempat_lahir').notEmpty(),
    body('tgl_lahir').notEmpty(),
    body('agama').notEmpty(),
    body('pendidikan').notEmpty(),
    body('jenis_pekerjaan').notEmpty(),
    body('golongan_darah').notEmpty(),
    body('kewarganegaraan').notEmpty()
],(req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(442).json({
            error: error.array()
        });
    }
    let Data = {
        nik: req.body.nik,
        nama_lengkap: req.body.nama_lengkap,
        jenis_kelamin: req.body.jenis_kelamin,
        tempat_lahir: req.body.tempat_lahir,
        tgl_lahir: req.body.tgl_lahir,
        agama: req.body.agama,
        pendidikan: req.body.pendidikan,
        jenis_pekerjaan: req.body.jenis_pekerjaan,
        golongan_darah: req.body.golongan_darah,
        kewarganegaraan: req.body.kewarganegaraan
    }
    connection.query('insert into ktp set ?', Data, function(err, rows){
        if(err){
            return res.status(500).json({
                staus: false,
                message: 'Server eror',
            })
        }else{
            return res.status(201).json({
                status: true,
                message: 'Sukses',
                data: rows[0]
            })
        }
    })
})

router.patch('/ubahdata/:nik',[
    body('nik').notEmpty(),
    body('nama_lengkap').notEmpty(),
    body('jenis_kelamin').notEmpty(),
    body('tempat_lahir').notEmpty(),
    body('tgl_lahir').notEmpty(),
    body('agama').notEmpty(),
    body('pendidikan').notEmpty(),
    body('jenis_pekerjaan').notEmpty(),
    body('golongan_darah').notEmpty(),
    body('kewarganegaraan').notEmpty()
],(req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(442).json({
            error: error.array()
        });
    }
    let nik = req.params.nik;
    let Data = {
        nik: req.body.nik,
        nama_lengkap: req.body.nama_lengkap,
        jenis_kelamin: req.body.jenis_kelamin,
        tempat_lahir: req.body.tempat_lahir,
        tgl_lahir: req.body.tgl_lahir,
        agama: req.body.agama,
        pendidikan: req.body.pendidikan,
        jenis_pekerjaan: req.body.jenis_pekerjaan,
        golongan_darah: req.body.golongan_darah,
        kewarganegaraan: req.body.kewarganegaraan
    }
    connection.query(`update ktp set ? where nik = ${nik}`, Data, function(err, rows){
        if(err){
            return res.status(500).json({
                staus: false,
                message: 'Server eror',
            })
        }else{
            return res.status(201).json({
                status: true,
                message: 'Sukses',
                data: rows[0]
            })
        }
    })
})

router.delete('/delete/:nik', function(req,res){
    let nik = req.params.nik;
    connection.query(`delete from ktp where nik = ${nik}`, function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server failed', 
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'Data Berhasil Dihapus',
            })
        }
    })
})

module.exports = router;