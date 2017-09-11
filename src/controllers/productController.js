'use strict'// ele força o js ser mais criterioso
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/productRepository');
exports.get = (req, res, next) => {
   repository.get()
        .then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(400).send(error);
        });
}
exports.getBySlug = (req, res, next) => {
   repository.getBySlug(req.param.slug)
        .then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(400).send(error);
        });
}
exports.getById = (req, res, next) => {
  repository.getById(req.param.id)
        .then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(400).send(error);
        });
}
exports.getByTags = (req, res, next) => {
    Product
        .find({
            tags: req.param.tags,
            active: true
        }, 'title description price slug tags')
        .then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(400).send(error);
        });
}
exports.post = (req, res, next) => {

    let contract = new ValidationContract();

    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'O título deve conter pelo menos 3 caracteres');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    Product
        .save()
        .then(result => {
            res.status(201).send({
                message: 'Produto cadastrado com sucesso!'
            });
        }).catch(error => {
            res.status(400).send({
                message: 'Falha ao cadastrar o produto!',
                data: error
            });
        });
};

exports.put = (req, res, next) => {
    Product
        .findByIdAndUpdate(req.param.id, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                slug: req.body.slug
            }
        }).then(result => {
            res.status(200).send({
                message: 'Produto atualizado com sucesso!'
            });
        }).catch(error => {
            res.status(400).send({
                message: 'Falha ao atualizar o produto!',
                data: error
            });
        });
};

exports.delete = (req, res, next) => {
    Product
        .findByIdAndRemove(req.param.id)
        .then(result => {
            res.status(200).send({
                message: 'Produto excluido com sucesso!'
            });
        }).catch(error => {
            res.status(400).send({
                message: 'Falha ao excluir o produto!',
                data: error
            });
        });
};