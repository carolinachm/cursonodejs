'use strict';
const Product = app.locals.db.product;

exports.get = () => {
    return Product
    .find({
        active:true
    }, 'title price slug')
}

exports.getBySlug = (slug) => {
    return Product
        .findOne({
            slug: req.param.slug,
            active: true
        }, 'title description price slug tags')
}

exports.getById = async(id) => {
      return Product
        .findById({
            id: req.param.id,
        })
}

exports.getByTag = async(tag) => {
    const res = Product
        .find({
            tags: tag,
            active: true
        }, 'title description price slug tags');
    return res;
}

exports.create = async(data) => {
    var product = new Product(data);
    await product.save();
}

exports.update = async(id, data) => {
    await Product
        .findByIdAndUpdate(id, {
            $set: {
                title: data.title,
                description: data.description,
                price: data.price,
                slug: data.slug
            }
        });
}

exports.delete = async(id) => {
    await Product
        .findOneAndRemove(id);
}