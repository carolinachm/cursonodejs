'use strict';
const Product = app.locals.db.product;

exports.get = async () => {
    const res = await Product
        .find({
            active: true
        }, 'title price slug');
    return res;
}

exports.getBySlug = async (slug) => {
    const res = await Product
        .findOne({
            slug: req.param.slug,
            active: true
        }, 'title description price slug tags');
    return res;
}

exports.getById = async (id) => {
    const res = await Product
        .findById({
            id: req.param.id,
        });
    return res;
}

exports.getByTag = async (tag) => {
    const res = await Product
        .find({
            tags: tags,
            active: true
        }, 'title description price slug tags');
    return res;
}

exports.create = async (data) => {
    var product = new Product(data);
    await product.save();
}
exports.update = async (id, data) => {
    await Product
        .findByIdAndUpdate(req.param.id, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                slug: req.body.slug
            }
        });
}


exports.delete = async (id) => {
    await Product
        .findByIdAndRemove(id);
}