/**
 * pickFields: copies ONLY the allowed properties from a request body.
 * This blocks clients from sneaking in fields we do not want them to set
 * (for example "_id", "created" or "updated").
 */
const pickFields = (source, allowedFields) => {
  const safeSource = source ?? {}; // Express 5: req.body is undefined when no body was sent
  const picked = {};
  allowedFields.forEach((fieldName) => {
    if (safeSource[fieldName] !== undefined) {
      picked[fieldName] = safeSource[fieldName];
    }
  });
  return picked;
};

export default pickFields;
