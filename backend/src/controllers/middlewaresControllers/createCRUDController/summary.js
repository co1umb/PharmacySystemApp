const summary = async (Model, req, res) => {
  
  const countPromise = Model.countDocuments({
    removed: false,
  });

  const resultsPromise = await Model.countDocuments({
    removed: false,
  })
    .where(req.query.filter)
    .equals(req.query.equal)
    .exec();
  
  const [countFilter, countAllDocs] = await Promise.all([resultsPromise, countPromise]);

  if (countAllDocs.length > 0) {
    return res.status(200).json({
      success: true,
      result: { countFilter, countAllDocs },
      message: 'Successfully count all documents',
    });
  } else {
    return res.status(203).json({
      success: false,
      result: [],
      message: 'Collection is Empty',
    });
  }
};

module.exports = summary;
