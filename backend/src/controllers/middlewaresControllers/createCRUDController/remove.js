const remove = async (Model, req, res) => {
  
  let updates = {
    removed: true,
  };
  
  const result = await Model.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: updates },
    {
      new: true, 
    }
  ).exec();
  
  if (!result) {
    return res.status(404).json({
      success: false,
      result: null,
      message: 'No document found ',
    });
  } else {
    return res.status(200).json({
      success: true,
      result,
      message: 'Successfully Deleted the document ',
    });
  }
};

module.exports = remove;
